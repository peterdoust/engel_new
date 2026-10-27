import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { requirePermission } from '@/lib/adminAuth'
import { UNSUBSCRIBES_COLLECTION, normalizeEmail } from '@/lib/unsubscribes'

export async function GET(request: NextRequest) {
  const gate = await requirePermission(request, 'unsubscribes', 'view')
  if (gate.error) return gate.error

  try {
    const db = gate.auth.db

    const entries = await db
      .collection(UNSUBSCRIBES_COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({ success: true, entries, total: entries.length })
  } catch (error) {
    console.error('Error fetching unsubscribe requests:', error)
    return NextResponse.json({ error: 'Failed to fetch unsubscribe requests' }, { status: 500 })
  }
}

/**
 * Adds an address by hand — for the people who reply "take me off the list"
 * instead of using the link.
 *
 * Same upsert rule as the public form: an address that was already exported goes
 * back to 'new', because a second request means the first removal did not take.
 * The response says which of those happened so the UI can be specific about it.
 */
export async function POST(request: NextRequest) {
  const gate = await requirePermission(request, 'unsubscribes', 'edit')
  if (gate.error) return gate.error

  try {
    const body = await request.json().catch(() => null)
    const email = normalizeEmail(body?.email)

    if (!email) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const collection = gate.auth.db.collection(UNSUBSCRIBES_COLLECTION)
    const existing = await collection.findOne({ email })
    const now = new Date()

    await collection.updateOne(
      { email },
      {
        $set: {
          email,
          status: 'new',
          exportedAt: null,
          lastRequestedAt: now,
          source: 'admin',
          addedBy: gate.auth.user.email,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true }
    )

    return NextResponse.json({
      success: true,
      email,
      existed: Boolean(existing),
      wasExported: existing?.status === 'exported',
    })
  } catch (error) {
    console.error('Error adding unsubscribe request:', error)
    return NextResponse.json({ error: 'Failed to add the address' }, { status: 500 })
  }
}

/**
 * Marks the rows that just went into a CSV as exported.
 *
 * The client downloads the file first and only then calls this, with the exact ids
 * it wrote. If this fails the rows stay 'new': re-exporting an address is harmless,
 * but a row silently marked exported that never reached the mail tool means that
 * person keeps receiving the mailer.
 */
export async function PATCH(request: NextRequest) {
  const gate = await requirePermission(request, 'unsubscribes', 'edit')
  if (gate.error) return gate.error

  try {
    const body = await request.json().catch(() => null)
    const ids = Array.isArray(body?.ids) ? body.ids : null

    if (!ids || ids.length === 0) {
      return NextResponse.json({ error: 'No entries supplied' }, { status: 400 })
    }

    const objectIds = ids
      .filter((id: unknown): id is string => typeof id === 'string' && ObjectId.isValid(id))
      .map((id: string) => new ObjectId(id))

    if (objectIds.length === 0) {
      return NextResponse.json({ error: 'No valid entry ids supplied' }, { status: 400 })
    }

    const result = await gate.auth.db.collection(UNSUBSCRIBES_COLLECTION).updateMany(
      { _id: { $in: objectIds } },
      { $set: { status: 'exported', exportedAt: new Date() } }
    )

    return NextResponse.json({ success: true, updated: result.modifiedCount })
  } catch (error) {
    console.error('Error marking unsubscribe requests as exported:', error)
    return NextResponse.json({ error: 'Failed to update unsubscribe requests' }, { status: 500 })
  }
}
