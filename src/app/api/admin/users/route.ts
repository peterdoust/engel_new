import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import crypto from 'crypto'
import { z } from 'zod'
import { requireAdmin, ADMIN_COLLECTION } from '@/lib/adminAuth'
import { sanitizePermissions } from '@/lib/permissions'

export const dynamic = 'force-dynamic'

const MIN_PASSWORD_LENGTH = 12

/** Matches api/raffle/login and scripts/seed-admin.js — all three must agree. */
const hashPassword = (password: string) =>
  crypto.createHash('sha256').update(password).digest('hex')

const permissionsSchema = z.record(z.string(), z.object({
  view: z.boolean().optional(),
  edit: z.boolean().optional(),
  delete: z.boolean().optional(),
})).optional()

const createSchema = z.object({
  email: z.string().email(),
  name: z.string().max(120).optional().default(''),
  password: z.string().min(MIN_PASSWORD_LENGTH),
  role: z.enum(['admin', 'user']).optional().default('user'),
  permissions: permissionsSchema,
})

const updateSchema = z.object({
  id: z.string().min(1),
  name: z.string().max(120).optional(),
  // Optional on update: an empty/absent password means "leave it unchanged".
  password: z.string().min(MIN_PASSWORD_LENGTH).optional(),
  role: z.enum(['admin', 'user']).optional(),
  permissions: permissionsSchema,
})

/** Never let a password hash or live session token reach the client. */
function toSafeUser(doc: any) {
  return {
    id: String(doc._id),
    email: doc.email,
    name: doc.name || '',
    role: doc.role === 'admin' ? 'admin' : 'user',
    permissions: doc.role === 'admin' ? {} : sanitizePermissions(doc.permissions),
    createdAt: doc.createdAt || null,
    updatedAt: doc.updatedAt || null,
    lastLogin: doc.lastLogin || null,
  }
}

function parseId(id: string): ObjectId | null {
  return ObjectId.isValid(id) ? new ObjectId(id) : null
}

export async function GET(request: NextRequest) {
  const gate = await requireAdmin(request)
  if (gate.error) return gate.error

  try {
    const users = await gate.auth.db
      .collection(ADMIN_COLLECTION)
      .find({}, { projection: { password: 0, sessionToken: 0, resetToken: 0, resetTokenExpiry: 0 } })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({
      success: true,
      users: users.map(toSafeUser),
      total: users.length,
      currentUserId: String(gate.auth.user._id),
    })
  } catch (error) {
    console.error('Error listing users:', error)
    return NextResponse.json({ error: 'Failed to list users' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const gate = await requireAdmin(request)
  if (gate.error) return gate.error

  try {
    const parsed = createSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid payload', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const email = parsed.data.email.trim().toLowerCase()
    const collection = gate.auth.db.collection(ADMIN_COLLECTION)

    if (await collection.findOne({ email })) {
      return NextResponse.json({ error: 'A user with that email already exists' }, { status: 409 })
    }

    const role = parsed.data.role
    const now = new Date().toISOString()
    const result = await collection.insertOne({
      email,
      name: parsed.data.name.trim(),
      password: hashPassword(parsed.data.password),
      role,
      // Admins derive access from their role, so an explicit map would be dead weight.
      permissions: role === 'admin' ? {} : sanitizePermissions(parsed.data.permissions),
      createdAt: now,
      updatedAt: now,
    })

    const created = await collection.findOne(
      { _id: result.insertedId },
      { projection: { password: 0, sessionToken: 0 } }
    )
    return NextResponse.json({ success: true, user: toSafeUser(created) }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const gate = await requireAdmin(request)
  if (gate.error) return gate.error

  try {
    const parsed = updateSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid payload', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const _id = parseId(parsed.data.id)
    if (!_id) return NextResponse.json({ error: 'Invalid user id' }, { status: 400 })

    const collection = gate.auth.db.collection(ADMIN_COLLECTION)
    const target = await collection.findOne({ _id })
    if (!target) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const isSelf = String(target._id) === String(gate.auth.user._id)
    const update: Record<string, unknown> = { updatedAt: new Date().toISOString() }

    if (parsed.data.name !== undefined) update.name = parsed.data.name.trim()
    if (parsed.data.password) update.password = hashPassword(parsed.data.password)

    // Demoting yourself would leave you unable to undo the change on the next request.
    if (parsed.data.role !== undefined && parsed.data.role !== target.role) {
      if (isSelf) {
        return NextResponse.json({ error: 'You cannot change your own role' }, { status: 400 })
      }
      if (target.role === 'admin' && parsed.data.role === 'user') {
        const admins = await collection.countDocuments({ role: 'admin' })
        if (admins <= 1) {
          return NextResponse.json(
            { error: 'Cannot demote the last remaining admin' },
            { status: 400 }
          )
        }
      }
      update.role = parsed.data.role
    }

    const effectiveRole = (update.role as string) ?? target.role
    if (parsed.data.permissions !== undefined || update.role !== undefined) {
      update.permissions =
        effectiveRole === 'admin' ? {} : sanitizePermissions(parsed.data.permissions ?? target.permissions)
    }

    await collection.updateOne({ _id }, { $set: update })

    // A password change must not leave old sessions authenticated.
    if (update.password) {
      await collection.updateOne({ _id }, { $unset: { sessionToken: '' } })
    }

    const updated = await collection.findOne(
      { _id },
      { projection: { password: 0, sessionToken: 0 } }
    )
    return NextResponse.json({ success: true, user: toSafeUser(updated) })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const gate = await requireAdmin(request)
  if (gate.error) return gate.error

  try {
    const id = request.nextUrl.searchParams.get('id')
    const _id = id ? parseId(id) : null
    if (!_id) return NextResponse.json({ error: 'Invalid user id' }, { status: 400 })

    const collection = gate.auth.db.collection(ADMIN_COLLECTION)
    const target = await collection.findOne({ _id })
    if (!target) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    if (String(target._id) === String(gate.auth.user._id)) {
      return NextResponse.json({ error: 'You cannot delete your own account' }, { status: 400 })
    }

    // Losing the last admin would make user management permanently unreachable.
    if (target.role === 'admin') {
      const admins = await collection.countDocuments({ role: 'admin' })
      if (admins <= 1) {
        return NextResponse.json({ error: 'Cannot delete the last remaining admin' }, { status: 400 })
      }
    }

    await collection.deleteOne({ _id })
    return NextResponse.json({ success: true, id: String(_id) })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
