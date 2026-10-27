import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import nodemailer from 'nodemailer'
import { requirePermission } from '@/lib/adminAuth'

// GET — return all entries (admin only)
export async function GET(request: NextRequest) {
  const gate = await requirePermission(request, 'raffle', 'view')
  if (gate.error) return gate.error

  try {
    const db = gate.auth.db

    const entries = await db.collection('raffle_entries').find({}).sort({ timestamp: -1 }).toArray()
    return NextResponse.json({ success: true, entries, total: entries.length })
  } catch (error) {
    console.error('Error fetching entries:', error)
    return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 })
  }
}

// POST — submit new entry
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, title, email, phone, company } = data

    if (!name || !title || !email || !phone || !company) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('engelandengel')
    const collection = db.collection('raffle_entries')

    // Check duplicate email
    const emailExists = await collection.findOne({ email: email.trim().toLowerCase() })
    if (emailExists) {
      return NextResponse.json({ error: 'You have already entered the drawing with this email address.' }, { status: 409 })
    }

    // Check duplicate phone
    const cleanPhone = phone.replace(/\D/g, '')
    const allEntries = await collection.find({}).toArray()
    const phoneExists = allEntries.find((e: any) => e.phone.replace(/\D/g, '') === cleanPhone)
    if (phoneExists) {
      return NextResponse.json({ error: 'You have already entered the drawing with this phone number.' }, { status: 409 })
    }

    const entry = {
      name: name.trim(),
      title: title.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: company.trim(),
      timestamp: new Date().toISOString(),
    }

    await collection.insertOne(entry)
    const totalEntries = await collection.countDocuments()

    console.log(`[RAFFLE] New entry: ${entry.name} (${entry.company}) — Total: ${totalEntries}`)

    // Send emails via Gmail SMTP
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      const fromAddress = `"Engel & Engel" <${process.env.SMTP_USER}>`

      // 1. Confirmation email to user
      await transporter.sendMail({
        from: fromAddress,
        to: entry.email,
        subject: "You're Entered! – Engel & Engel Drawing",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #ffffff;">
            <div style="background: #1d2653; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Engel & Engel, LLP</h1>
              <p style="color: #D4AF37; margin: 5px 0 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">Forensic Accountants</p>
            </div>
            <div style="padding: 30px;">
              <h2 style="color: #1d2653; margin: 0 0 15px;">You're In, ${entry.name}!</h2>
              <p style="color: #64748b; line-height: 1.6; margin: 0 0 20px;">
                Your entry for the <strong>Luxury Oceanfront Getaway at Terranea Resort</strong> drawing has been received. The winner will be notified directly following the event.
              </p>
              <div style="background: #f8fafc; border-left: 3px solid #D4AF37; padding: 15px; margin: 0 0 20px;">
                <p style="margin: 0; color: #11162d; font-size: 14px;"><strong>Name:</strong> ${entry.name}</p>
                <p style="margin: 5px 0 0; color: #11162d; font-size: 14px;"><strong>Title:</strong> ${entry.title}</p>
                <p style="margin: 5px 0 0; color: #11162d; font-size: 14px;"><strong>Company:</strong> ${entry.company}</p>
              </div>
              <p style="color: #94a3b8; font-size: 13px; margin: 0;">Good luck!</p>
            </div>
            <div style="background: #f8fafc; padding: 15px; text-align: center; border-top: 1px solid #e2e6f0;">
              <p style="color: #94a3b8; font-size: 11px; margin: 0;">Engel & Engel LLP &bull; 350 S Grand Avenue, Suite 3160, Los Angeles, CA 90071</p>
            </div>
          </div>
        `,
      })

      // 2. Notification email to team
      await transporter.sendMail({
        from: fromAddress,
        to: ['Peter@globalcreativestudios.com', 'info@engelandengel.com'],
        subject: `New Raffle Entry: ${entry.name} (${entry.company})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
            <div style="background: #1d2653; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 18px;">New Raffle Entry</h1>
            </div>
            <div style="padding: 25px; background: #ffffff;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1d2653; width: 90px;">Name:</td><td style="padding: 8px 0; color: #11162d;">${entry.name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1d2653;">Title:</td><td style="padding: 8px 0; color: #11162d;">${entry.title}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1d2653;">Email:</td><td style="padding: 8px 0; color: #11162d;"><a href="mailto:${entry.email}">${entry.email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1d2653;">Phone:</td><td style="padding: 8px 0; color: #11162d;"><a href="tel:${entry.phone}">${entry.phone}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1d2653;">Company:</td><td style="padding: 8px 0; color: #11162d;">${entry.company}</td></tr>
              </table>
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e6f0;">
                <p style="color: #94a3b8; font-size: 13px; margin: 0;">Total entries: <strong style="color: #1d2653;">${totalEntries}</strong></p>
              </div>
            </div>
          </div>
        `,
      })

      console.log(`[RAFFLE] Emails sent for ${entry.name}`)
    } catch (emailError) {
      console.error('[RAFFLE] Email sending failed:', emailError)
    }

    return NextResponse.json({ success: true, message: 'Entry submitted successfully' })
  } catch (error) {
    console.error('Error processing raffle entry:', error)
    return NextResponse.json({ error: 'Failed to process entry' }, { status: 500 })
  }
}
