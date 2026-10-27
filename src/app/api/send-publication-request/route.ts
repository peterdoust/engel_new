import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import nodemailer from 'nodemailer'

const ADMIN_EMAIL = ['Peter@globalcreativestudios.com', 'info@engelandengel.com']

// Function to get IP address from request
function getClientIP(request: NextRequest): string {
  // Check various headers for the real IP address
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip') // Cloudflare

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  if (cfConnectingIP) {
    return cfConnectingIP
  }

  // Fallback to connection remote address
  return request.ip || 'Unknown'
}

// Function to get location data from IP
async function getLocationFromIP(ip: string) {
  try {
    // Skip location lookup for local/private IPs
    if (ip === 'Unknown' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.') || ip === '::1') {
      return {
        city: 'Local/Private Network',
        region: 'N/A',
        country: 'N/A',
        timezone: 'N/A',
        isp: 'N/A'
      }
    }

    // Use ip-api.com (free service, no API key required)
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`)

    if (!response.ok) {
      throw new Error('Failed to fetch location data')
    }

    const locationData = await response.json()

    if (locationData.status === 'fail') {
      throw new Error(locationData.message || 'Location lookup failed')
    }

    return {
      city: locationData.city || 'Unknown',
      region: locationData.regionName || 'Unknown',
      country: locationData.country || 'Unknown',
      countryCode: locationData.countryCode || 'Unknown',
      timezone: locationData.timezone || 'Unknown',
      isp: locationData.isp || 'Unknown',
      coordinates: locationData.lat && locationData.lon ? `${locationData.lat}, ${locationData.lon}` : 'Unknown'
    }
  } catch (error) {
    console.error('Error fetching location data:', error)
    return {
      city: 'Unknown',
      region: 'Unknown',
      country: 'Unknown',
      timezone: 'Unknown',
      isp: 'Unknown',
      coordinates: 'Unknown'
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Get IP address and location
    const clientIP = getClientIP(request)
    const locationData = await getLocationFromIP(clientIP)

    // Store submission in MongoDB
    try {
      const client = await clientPromise
      const db = client.db('engelandengel') 
      
      const submission = {
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        firmName: data.firmName || '',
        position: data.position || '',
        category: data.category || 'General Request',
        requestedPublications: data.requestedPublications || [],
        timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
        createdAt: new Date(),
        ipAddress: clientIP,
        location: locationData,
      }

      const result = await db.collection('publication_requests').insertOne(submission)
      console.log(`[PUBLICATION-REQUEST] Saved to DB: ${result.insertedId}`)
    } catch (dbError: any) {
      console.error('Error saving publication request to MongoDB:', dbError)
      return NextResponse.json(
        { 
          error: 'Failed to save publication request to database',
          details: dbError.message 
        },
        { status: 500 }
      )
    }

    // Log the submission data (for testing)
    console.log('=== PUBLICATION REQUEST RECEIVED ===')
    console.log('Name:', data.firstName, data.lastName)
    console.log('Email:', data.email)
    console.log('Phone:', data.phone)
    console.log('Firm:', data.firmName)
    console.log('Practice Area:', data.practiceArea)
    console.log('Publications Requested:', data.requestedPublications.length)
    console.log('Publications:', data.requestedPublications)
    console.log('Message:', data.message)
    console.log('Timestamp:', new Date(data.timestamp).toLocaleString())
    console.log('--- LOCATION DATA ---')
    console.log('IP Address:', clientIP)
    console.log('Location:', `${locationData.city}, ${locationData.region}, ${locationData.country}`)
    console.log('Timezone:', locationData.timezone)
    console.log('ISP:', locationData.isp)
    console.log('Coordinates:', locationData.coordinates)
    console.log('=====================================')

    // Send notification email to admin
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      const fromAddress = `"Engel & Engel" <${process.env.SMTP_USER}>`
      const fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim()
      const publications = (data.requestedPublications || []).map((p: string) => `<li>${p}</li>`).join('')

      await transporter.sendMail({
        from: fromAddress,
        to: ADMIN_EMAIL,
        replyTo: data.email,
        subject: `Publication Request - ${fullName} (${data.firmName || 'Unknown firm'})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff;">
            <div style="background: #293995; padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px;">New Publication Request</h1>
              <p style="color: #D4AF37; margin: 6px 0 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">Engel &amp; Engel LLP</p>
            </div>
            <div style="padding: 28px;">
              <h2 style="color: #293995; margin: 0 0 6px; font-size: 16px;">Category</h2>
              <p style="margin: 0 0 20px; color: #11162d; font-size: 14px;"><strong>${data.category || 'General Request'}</strong></p>

              ${publications ? `
                <h3 style="color: #293995; margin: 0 0 6px; font-size: 14px;">Requested Publications</h3>
                <ul style="margin: 0 0 20px; padding-left: 20px; color: #11162d; font-size: 14px;">${publications}</ul>
              ` : ''}

              <h3 style="color: #293995; margin: 0 0 6px; font-size: 14px;">Contact Information</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr><td style="padding: 6px 0; font-weight: bold; color: #293995; width: 130px;">Name:</td><td style="padding: 6px 0; color: #11162d;">${fullName}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #293995;">Email:</td><td style="padding: 6px 0; color: #11162d;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #293995;">Phone:</td><td style="padding: 6px 0; color: #11162d;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #293995;">Firm:</td><td style="padding: 6px 0; color: #11162d;">${data.firmName || ''}</td></tr>
                ${data.position ? `<tr><td style="padding: 6px 0; font-weight: bold; color: #293995;">Position:</td><td style="padding: 6px 0; color: #11162d;">${data.position}</td></tr>` : ''}
              </table>

            </div>
            <div style="background: #f8fafc; padding: 14px; text-align: center; border-top: 1px solid #e2e6f0;">
              <p style="color: #94a3b8; font-size: 11px; margin: 0;">Submitted via the Engel &amp; Engel website publication request form.</p>
            </div>
          </div>
        `,
      })

      console.log(`[PUBLICATION-REQUEST] Notification email sent to ${ADMIN_EMAIL} for ${fullName}`)
    } catch (emailError) {
      console.error('[PUBLICATION-REQUEST] Email sending failed:', emailError)
      // Do not fail the request — submission is already saved in DB.
    }

    return NextResponse.json({
      success: true,
      message: 'Publication request received successfully'
    })

  } catch (error) {
    console.error('Error processing publication request:', error)
    return NextResponse.json(
      { error: 'Failed to process publication request' },
      { status: 500 }
    )
  }
}
