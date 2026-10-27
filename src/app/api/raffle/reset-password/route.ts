import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ error: 'Token and password are required' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('engelandengel')

    const admin = await db.collection('raffle_admin').findOne({ resetToken: token })

    if (!admin) {
      return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 })
    }

    if (new Date(admin.resetExpiry) < new Date()) {
      return NextResponse.json({ error: 'Reset link has expired. Please request a new one.' }, { status: 400 })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    await db.collection('raffle_admin').updateOne(
      { _id: admin._id },
      {
        $set: { password: hash },
        $unset: { resetToken: '', resetExpiry: '' },
      }
    )

    console.log(`[RAFFLE] Password reset for ${admin.email}`)

    return NextResponse.json({ success: true, message: 'Password updated successfully' })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
