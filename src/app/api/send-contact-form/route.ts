import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

// Function to get IP address from request
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  return request.ip || 'Unknown'
}

// Function to get location data from IP
async function getLocationFromIP(ip: string) {
  try {
    if (ip === 'Unknown' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.') || ip === '::1') {
      return {
        city: 'Local/Private Network',
        region: 'N/A',
        country: 'N/A',
        timezone: 'N/A',
        isp: 'N/A'
      }
    }

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
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        message: data.message || '',
        timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
        createdAt: new Date(),
        ipAddress: clientIP,
        location: locationData,
      }

      const result = await db.collection('contact_submissions').insertOne(submission)
      console.log(`[CONTACT-FORM] Saved to DB: ${result.insertedId}`)
    } catch (dbError: any) {
      console.error('Error saving contact submission to MongoDB:', dbError)
      return NextResponse.json(
        {
          error: 'Failed to save contact submission to database',
          details: dbError.message,
        },
        { status: 500 }
      )
    }

    // Log the submission data
    console.log('=== CONTACT FORM SUBMISSION ===')
    console.log('Name:', data.name)
    console.log('Email:', data.email)
    console.log('Phone:', data.phone)
    console.log('Message:', data.message)
    console.log('Timestamp:', new Date(data.timestamp).toLocaleString())
    console.log('--- LOCATION DATA ---')
    console.log('IP Address:', clientIP)
    console.log('Location:', `${locationData.city}, ${locationData.region}, ${locationData.country}`)
    console.log('Timezone:', locationData.timezone)
    console.log('ISP:', locationData.isp)
    console.log('Coordinates:', locationData.coordinates)
    console.log('===============================')

    // Email content for future implementation
    const emailContent = `
New Contact Form Submission - Engel & Engel

CONTACT INFORMATION:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

MESSAGE:
${data.message}

LOCATION & SECURITY INFO:
IP Address: ${clientIP}
Location: ${locationData.city}, ${locationData.region}, ${locationData.country}
Timezone: ${locationData.timezone}
ISP: ${locationData.isp}
Coordinates: ${locationData.coordinates}

SUBMISSION DETAILS:
Submitted: ${new Date(data.timestamp).toLocaleString('en-US', {
  timeZone: 'America/Los_Angeles',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short'
})}

---
This message was submitted through the Engel & Engel website contact form.
    `.trim()

    // TODO: Send email once SMTP is configured
   
    const nodemailer = require('nodemailer')
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@engelandengel.com',
      to: ['Peter@globalcreativestudios.com', 'info@engelandengel.com'],
      subject: `New Inquiry from ${data.name}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #293995; border-bottom: 2px solid #293995; padding-bottom: 10px;">
            New Contact Form Submission - Engel & Engel
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #11162d; margin-top: 0;">Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 5px 0; font-weight: bold; width: 100px;">Name:</td>
                <td style="padding: 5px 0;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; font-weight: bold;">Email:</td>
                <td style="padding: 5px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 5px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 5px 0;"><a href="tel:${data.phone}">${data.phone}</a></td>
              </tr>
            </table>
          </div>

          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #11162d; margin-top: 0;">Message</h3>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>

          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #11162d; margin-top: 0;">Location & Security Info</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 3px 0; font-weight: bold; width: 120px;">IP Address:</td>
                <td style="padding: 3px 0;">${clientIP}</td>
              </tr>
              <tr>
                <td style="padding: 3px 0; font-weight: bold;">Location:</td>
                <td style="padding: 3px 0;">${locationData.city}, ${locationData.region}, ${locationData.country}</td>
              </tr>
              <tr>
                <td style="padding: 3px 0; font-weight: bold;">Timezone:</td>
                <td style="padding: 3px 0;">${locationData.timezone}</td>
              </tr>
              <tr>
                <td style="padding: 3px 0; font-weight: bold;">ISP:</td>
                <td style="padding: 3px 0;">${locationData.isp}</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0; color: #64748b; font-size: 14px;">
              <strong>Submitted:</strong> ${new Date(data.timestamp).toLocaleString('en-US', {
                timeZone: 'America/Los_Angeles',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}
            </p>
          </div>

          <div style="border-top: 1px solid #e2e6f0; padding-top: 15px; margin-top: 30px;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              This message was submitted through the Engel & Engel website contact form.
            </p>
          </div>
        </div>
      `
    })
    

    // For now, just return success
    return NextResponse.json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    })
    
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}
