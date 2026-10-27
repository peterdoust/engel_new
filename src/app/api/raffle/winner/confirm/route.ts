import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { requirePermission } from '@/lib/adminAuth'

export async function POST(request: NextRequest) {
  // Confirming notifies the winner by email — a write action, so require edit.
  const gate = await requirePermission(request, 'raffle', 'edit')
  if (gate.error) return gate.error

  try {
    const db = gate.auth.db

    const winner = await db.collection('raffle_winner').findOne({})
    if (!winner) {
      return NextResponse.json({ error: 'No winner selected' }, { status: 404 })
    }

    if (winner.confirmed) {
      return NextResponse.json({ error: 'Winner already confirmed' }, { status: 400 })
    }

    // Mark as confirmed
    await db.collection('raffle_winner').updateOne(
      { _id: winner._id },
      { $set: { confirmed: true, confirmedAt: new Date().toISOString() } }
    )

    // Send winner notification email
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      const fromAddress = `"Engel & Engel" <${process.env.SMTP_USER}>`

      await transporter.sendMail({
        from: fromAddress,
        to: winner.email,
        subject: "Congratulations! You've Won! – Engel & Engel Raffle",
        html: `
          <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid #e8e8e8;">

            <div style="background: #1d2653; padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-family: Arial, sans-serif; font-weight: 700; letter-spacing: 1px;">ENGEL & ENGEL, LLP</h1>
              <p style="color: #D4AF37; margin: 8px 0 0; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; font-family: Arial, sans-serif;">Forensic Accountants</p>
            </div>

            <div style="padding: 30px 30px 15px; text-align: center;">
              <p style="color: #D4AF37; font-size: 11px; font-weight: bold; letter-spacing: 4px; text-transform: uppercase; margin: 0 0 12px; font-family: Arial, sans-serif;">&#9733; &nbsp; Winner &nbsp; &#9733;</p>

              <h2 style="color: #1d2653; margin: 0 0 4px; font-size: 26px; font-weight: normal; font-style: italic;">Congratulations,</h2>
              <h2 style="color: #1d2653; margin: 0 0 15px; font-size: 26px; font-weight: 700; font-family: Arial, sans-serif;">${winner.name}!</h2>

              <div style="width: 40px; height: 2px; background: #D4AF37; margin: 0 auto 15px;"></div>

              <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
                You've been selected as the winner of our event raffle.
              </p>
            </div>

            <div style="margin: 0 30px 25px; border: 2px solid #D4AF37; padding: 20px; text-align: center;">
              <p style="color: #D4AF37; font-size: 10px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 10px; font-family: Arial, sans-serif;">Your Prize</p>
              <h3 style="color: #1d2653; margin: 0 0 3px; font-size: 18px; font-weight: 700; font-family: Arial, sans-serif;">Luxury Oceanfront Getaway</h3>
              <p style="color: #D4AF37; font-size: 14px; margin: 0 0 12px; font-style: italic;">at Terranea Resort</p>
              <div style="width: 30px; height: 1px; background: #ddd; margin: 0 auto 12px;"></div>
              <p style="color: #555; font-size: 13px; margin: 0 0 4px; font-family: Arial, sans-serif;">&#10004; &nbsp; 2-Night Stay</p>
              <p style="color: #555; font-size: 13px; margin: 0; font-family: Arial, sans-serif;">&#10004; &nbsp; Dinner for Two at Mar'sel</p>
            </div>

            <div style="padding: 0 30px 25px; text-align: center;">
              <p style="color: #888; font-size: 13px; line-height: 1.7; margin: 0;">
                We'll be in touch shortly to arrange your prize.<br>
                Questions? Call <a href="tel:+13102772220" style="color: #1d2653; font-weight: bold; text-decoration: none;">(310) 277-2220</a>
              </p>
            </div>

            <div style="background: #1d2653; padding: 25px; text-align: center;">
              <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 0; font-family: Arial, sans-serif;">Engel & Engel LLP &bull; 350 S Grand Avenue, Suite 3160<br>Los Angeles, CA 90071</p>
            </div>
          </div>
        `,
      })

      console.log(`[RAFFLE] Winner confirmed & email sent to ${winner.name} (${winner.email})`)
    } catch (emailError) {
      console.error('[RAFFLE] Winner email failed:', emailError)
    }

    return NextResponse.json({ success: true, message: 'Winner confirmed and email sent' })
  } catch (error) {
    console.error('Error confirming winner:', error)
    return NextResponse.json({ error: 'Failed to confirm winner' }, { status: 500 })
  }
}
