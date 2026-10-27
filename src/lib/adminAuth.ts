import { NextRequest, NextResponse } from 'next/server'
import type { Db, WithId, Document } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import { SEO_DB_NAME } from '@/lib/seo'
import { hasPermission, isAdmin, type Action, type SectionKey } from '@/lib/permissions'

export const ADMIN_COLLECTION = 'raffle_admin'

export type AdminUser = WithId<Document> & {
  email: string
  role?: string
  permissions?: unknown
  sessionToken?: string
}

export type AuthContext = { db: Db; user: AdminUser }

/**
 * Resolves the caller from the x-admin-key session token.
 *
 * The database is named explicitly rather than relying on the URI default: several
 * routes historically used client.db() and would silently 401 against a different
 * database than api/raffle/login writes the token into.
 */
export async function authenticate(request: NextRequest): Promise<AuthContext | null> {
  const token = request.headers.get('x-admin-key')
  if (!token || !process.env.MONGODB_URI) return null

  const client = await clientPromise
  const db = client.db(SEO_DB_NAME)
  const user = (await db.collection(ADMIN_COLLECTION).findOne({ sessionToken: token })) as AdminUser | null
  if (!user) return null

  return { db, user }
}

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
const forbidden = () => NextResponse.json({ error: 'Forbidden' }, { status: 403 })

/**
 * Gate a route on a section permission.
 *
 * Returns either a ready-to-return error response or the authenticated context.
 * 401 means "not signed in", 403 means "signed in but not granted" — keeping them
 * distinct stops the admin UI from bouncing a valid session back to the login page.
 */
export async function requirePermission(
  request: NextRequest,
  section: SectionKey,
  action: Action
): Promise<{ error: NextResponse; auth?: never } | { error?: never; auth: AuthContext }> {
  const auth = await authenticate(request)
  if (!auth) return { error: unauthorized() }
  if (!hasPermission(auth.user, section, action)) return { error: forbidden() }
  return { auth }
}

/** Gate a route on being an admin — used by the user-management endpoints. */
export async function requireAdmin(
  request: NextRequest
): Promise<{ error: NextResponse; auth?: never } | { error?: never; auth: AuthContext }> {
  const auth = await authenticate(request)
  if (!auth) return { error: unauthorized() }
  if (!isAdmin(auth.user)) return { error: forbidden() }
  return { auth }
}
