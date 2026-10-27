import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import nodemailer from 'nodemailer'

const ADMIN_EMAIL = ['Peter@globalcreativestudios.com', 'info@engelandengel.com']
const MAX_RESUME_BYTES = 10 * 1024 * 1024 // 10MB

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')

  if (forwarded) return forwarded.split(',')[0].trim()
  if (realIP) return realIP
  if (cfConnectingIP) return cfConnectingIP
  return request.ip || 'Unknown'
}

async function getLocationFromIP(ip: string) {
  try {
    if (ip === 'Unknown' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.') || ip === '::1') {
      return { city: 'Local/Private Network', region: 'N/A', country: 'N/A', timezone: 'N/A', isp: 'N/A' }
    }
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,timezone,isp,lat,lon`)
    if (!response.ok) throw new Error('Failed to fetch location data')
    const d = await response.json()
    if (d.status === 'fail') throw new Error(d.message || 'Location lookup failed')
    return {
      city: d.city || 'Unknown',
      region: d.regionName || 'Unknown',
      country: d.country || 'Unknown',
      countryCode: d.countryCode || 'Unknown',
      timezone: d.timezone || 'Unknown',
      isp: d.isp || 'Unknown',
      coordinates: d.lat && d.lon ? `${d.lat}, ${d.lon}` : 'Unknown',
    }
  } catch (error) {
    console.error('Error fetching location data:', error)
    return { city: 'Unknown', region: 'Unknown', country: 'Unknown', timezone: 'Unknown', isp: 'Unknown', coordinates: 'Unknown' }
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const phone = String(formData.get('phone') || '').trim()
    const message = String(formData.get('message') || '').trim()
    const timestampRaw = formData.get('timestamp')
    const resume = formData.get('resume') as File | null

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    let resumeBuffer: Buffer | null = null
    let resumeMeta: { filename: string; mimetype: string; size: number } | null = null

    if (resume && typeof (resume as any).arrayBuffer === 'function' && resume.size > 0) {
      if (resume.size > MAX_RESUME_BYTES) {
        return NextResponse.json({ error: 'Resume exceeds the 10MB size limit.' }, { status: 400 })
      }
      const ab = await resume.arrayBuffer()
      resumeBuffer = Buffer.from(ab)
      resumeMeta = {
        filename: resume.name || 'resume',
        mimetype: resume.type || 'application/octet-stream',
        size: resume.size,
      }
    }

    const clientIP = getClientIP(request)
    const locationData = await getLocationFromIP(clientIP)

    let insertedId: string | null = null
    try {
      const client = await clientPromise
      const db = client.db('engelandengel')

      const submission: any = {
        name,
        email,
        phone,
        message,
        resume: resumeBuffer && resumeMeta ? { ...resumeMeta, data: resumeBuffer } : null,
        timestamp: timestampRaw ? new Date(String(timestampRaw)) : new Date(),
        createdAt: new Date(),
        ipAddress: clientIP,
        location: locationData,
      }

      const result = await db.collection('career_applications').insertOne(submission)
      insertedId = result.insertedId.toString()
      console.log(`[CAREER-APPLICATION] Saved to DB: ${insertedId}`)
    } catch (dbError: any) {
      console.error('Error saving career application to MongoDB:', dbError)
      return NextResponse.json(
        { error: 'Failed to save career application to database', details: dbError.message },
        { status: 500 }
      )
    }

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      const fromAddress = process.env.SMTP_FROM || `"Engel & Engel" <${process.env.SMTP_USER || 'noreply@engelandengel.com'}>`

      const attachments = resumeBuffer && resumeMeta
        ? [{ filename: resumeMeta.filename, content: resumeBuffer, contentType: resumeMeta.mimetype }]
        : []

      const submittedAt = new Date().toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
      })

      await transporter.sendMail({
        from: fromAddress,
        to: ADMIN_EMAIL,
        replyTo: email,
        subject: `New Career Application - ${name}`,
        text: `New Career Application - Engel & Engel\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}\n\nResume: ${resumeMeta ? resumeMeta.filename : 'Not attached'}\n\nSubmitted: ${submittedAt}\nIP: ${clientIP}\nLocation: ${locationData.city}, ${locationData.region}, ${locationData.country}\n`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff;">
            <div style="background: #1D2653; padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px;">New Career Application</h1>
              <p style="color: #D4AF37; margin: 6px 0 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">Engel &amp; Engel LLP</p>
            </div>
            <div style="padding: 28px;">
              <h3 style="color: #1D2653; margin: 0 0 8px; font-size: 14px;">Applicant Information</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr><td style="padding: 6px 0; font-weight: bold; color: #1D2653; width: 100px;">Name:</td><td style="padding: 6px 0; color: #11162d;">${name}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #1D2653;">Email:</td><td style="padding: 6px 0; color: #11162d;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #1D2653;">Phone:</td><td style="padding: 6px 0; color: #11162d;">${phone ? `<a href="tel:${phone}">${phone}</a>` : '—'}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #1D2653;">Resume:</td><td style="padding: 6px 0; color: #11162d;">${resumeMeta ? resumeMeta.filename + ' (attached)' : 'Not attached'}</td></tr>
              </table>

              ${message ? `
                <h3 style="color: #1D2653; margin: 0 0 8px; font-size: 14px;">Message</h3>
                <div style="background: #fef9e7; padding: 14px; border-radius: 6px; color: #11162d; white-space: pre-wrap; line-height: 1.5;">${message}</div>
              ` : ''}

              <h3 style="color: #1D2653; margin: 22px 0 8px; font-size: 14px;">Submission Info</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 4px 0; font-weight: bold; color: #64748b; width: 120px;">Submitted:</td><td style="padding: 4px 0; color: #11162d;">${submittedAt}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: bold; color: #64748b;">IP Address:</td><td style="padding: 4px 0; color: #11162d;">${clientIP}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: bold; color: #64748b;">Location:</td><td style="padding: 4px 0; color: #11162d;">${locationData.city}, ${locationData.region}, ${locationData.country}</td></tr>
              </table>
            </div>
            <div style="background: #f8fafc; padding: 14px; text-align: center; border-top: 1px solid #e2e6f0;">
              <p style="color: #94a3b8; font-size: 11px; margin: 0;">Submitted via the Engel &amp; Engel careers form.</p>
            </div>
          </div>
        `,
        attachments,
      })

      console.log(`[CAREER-APPLICATION] Notification email sent to ${ADMIN_EMAIL.join(', ')}`)
    } catch (emailError) {
      console.error('[CAREER-APPLICATION] Email sending failed:', emailError)
    }

    return NextResponse.json({ success: true, id: insertedId, message: 'Career application received successfully' })
  } catch (error) {
    console.error('Error processing career application:', error)
    return NextResponse.json({ error: 'Failed to process career application' }, { status: 500 })
  }
}
