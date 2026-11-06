import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Newsletter sign-up from the blog page: emails the firm, same SMTP setup and inbox as the contact form.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const email = String(body.email || '').trim().slice(0, 254)
    const company = String(body.company || '') // hidden honeypot field; real visitors leave it empty

    // Bots fill the hidden field: pretend it worked and send nothing
    if (company) return NextResponse.json({ success: true })

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })

    const when = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
    const safe = escapeHtml(email)

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@engelandengel.com',
      to: ['Peter@globalcreativestudios.com', 'info@engelandengel.com'],
      replyTo: email,
      subject: `New newsletter sign-up: ${email}`,
      text: `New newsletter sign-up from the website blog page.\n\nEmail: ${email}\nDate: ${when} (Los Angeles time)\n`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; color: #1d2653;">
          <h2 style="margin: 0 0 12px;">New newsletter sign-up</h2>
          <p style="margin: 0 0 16px;">Someone asked to receive the latest insights from the website blog page.</p>
          <table style="border-collapse: collapse;">
            <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Email</td><td><a href="mailto:${safe}">${safe}</a></td></tr>
            <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Date</td><td>${when} (Los Angeles time)</td></tr>
          </table>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter sign-up failed:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 })
  }
}
