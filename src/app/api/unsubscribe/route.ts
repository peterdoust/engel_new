import { NextRequest, NextResponse } from 'next/server'
import type { Db } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import { SEO_DB_NAME } from '@/lib/seo'
import { UNSUBSCRIBES_COLLECTION, normalizeEmail } from '@/lib/unsubscribes'

// Function to get IP address from request
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip') // Cloudflare

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  if (cfConnectingIP) {
    return cfConnectingIP
  }

  return request.ip || 'Unknown'
}

/**
 * Best-effort throttle so the endpoint cannot be used to flood the collection.
 * In-process only — it resets on redeploy and does not span instances, which is
 * enough for a public form with no downstream cost beyond a single upsert.
 */
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const attempts = new Map<string, { count: number; resetAt: number }>()

function rateLimited(ip: string): boolean {
  if (ip === 'Unknown') return false
  const now = Date.now()
  const entry = attempts.get(ip)

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > RATE_LIMIT_MAX
}

/**
 * The upsert is keyed on email, so without a unique index two simultaneous
 * requests for the same address can both miss and both insert. Created once per
 * process rather than per request.
 */
let indexReady: Promise<unknown> | null = null

async function ensureEmailIndex(db: Db) {
  if (!indexReady) {
    indexReady = db
      .collection(UNSUBSCRIBES_COLLECTION)
      .createIndex({ email: 1 }, { unique: true })
      .catch((error: unknown) => {
        // A failed index must not take the form down — the upsert still works,
        // it just loses its race guard. Reset so the next request retries.
        console.error('Failed to create unsubscribes email index:', error)
        indexReady = null
      })
  }
  return indexReady
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    }

    // Honeypot: a real person never fills a hidden field. Answer as if it worked
    // so a bot gets no signal about why nothing happened.
    if (typeof body.company === 'string' && body.company.trim() !== '') {
      return NextResponse.json({ success: true })
    }

    const email = normalizeEmail(body.email)
    if (!email) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    if (!process.env.MONGODB_URI) {
      console.error('Unsubscribe request received but MONGODB_URI is not configured')
      return NextResponse.json({ error: 'Unable to process the request right now.' }, { status: 500 })
    }

    const ip = getClientIP(request)
    if (rateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 })
    }

    const client = await clientPromise
    const db = client.db(SEO_DB_NAME)
    await ensureEmailIndex(db)

    const now = new Date()

    /**
     * Status resets to 'new' on every request, including for an address that was
     * already exported. Someone unsubscribing a second time is saying the removal
     * did not take, and a sticky 'exported' would hide exactly that case.
     */
    await db.collection(UNSUBSCRIBES_COLLECTION).updateOne(
      { email },
      {
        $set: {
          email,
          status: 'new',
          exportedAt: null,
          lastRequestedAt: now,
          ipAddress: ip,
          userAgent: request.headers.get('user-agent') || 'Unknown',
          source: body.source === 'mailer' ? 'mailer' : 'manual',
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true }
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    // Duplicate key means a concurrent request already recorded this address —
    // the caller asked to be unsubscribed and they are, so report success.
    if (error?.code === 11000) {
      return NextResponse.json({ success: true })
    }
    console.error('Error recording unsubscribe request:', error)
    return NextResponse.json({ error: 'Unable to process the request right now.' }, { status: 500 })
  }
}
