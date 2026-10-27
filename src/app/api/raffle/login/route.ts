import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('engelandengel')
    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const admin = await db.collection('raffle_admin').findOne({
      email: email.trim().toLowerCase(),
      password: hash,
    })

    if (!admin) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Generate session token
    const token = crypto.randomBytes(32).toString('hex')
    await db.collection('raffle_admin').updateOne(
      { _id: admin._id },
      { $set: { sessionToken: token, lastLogin: new Date().toISOString() } }
    )

    return NextResponse.json({ success: true, token })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
