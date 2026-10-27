import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('engelandengel')

    const admin = await db.collection('raffle_admin').findOne({ email: email.trim().toLowerCase() })

    if (!admin) {
      // Don't reveal if email exists or not
      return NextResponse.json({ success: true, message: 'If this email is registered, a reset link has been sent.' })
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetExpiry = new Date(Date.now() + 60 * 60 * 1000).toISOString()

    await db.collection('raffle_admin').updateOne(
      { _id: admin._id },
      { $set: { resetToken, resetExpiry } }
    )

    // Send reset email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const resetUrl = `${request.headers.get('origin') || 'http://localhost:3000'}/abtl/drawing/reset-password?token=${resetToken}`

    await transporter.sendMail({
      from: `"Engel & Engel" <${process.env.SMTP_USER}>`,
      to: admin.email,
      subject: 'Password Reset – Raffle Admin',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <div style="background: #1d2653; padding: 25px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Engel & Engel, LLP</h1>
            <p style="color: #D4AF37; margin: 5px 0 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase;">Raffle Admin</p>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #1d2653; margin: 0 0 15px; font-size: 20px;">Password Reset</h2>
            <p style="color: #64748b; line-height: 1.6; margin: 0 0 25px;">
              Click the button below to reset your password. This link expires in 1 hour.
            </p>
            <a href="${resetUrl}" style="display: inline-block; background: #D4AF37; color: #1d2653; font-weight: bold; font-size: 14px; padding: 12px 30px; text-decoration: none;">
              Reset Password
            </a>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 25px;">
              If you didn't request this, ignore this email.
            </p>
          </div>
        </div>
      `,
    })

    console.log(`[RAFFLE] Password reset email sent to ${admin.email}`)

    return NextResponse.json({ success: true, message: 'If this email is registered, a reset link has been sent.' })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
