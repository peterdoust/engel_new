import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { requireAdmin } from '@/lib/adminAuth'

// Generate test credentials
function generateTestCredentials() {
  const accessToken = crypto.randomBytes(32).toString('hex')
  const tempPassword = generateTempPassword()
  const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const portalUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/portal/login?token=${accessToken}`
  
  return { accessToken, tempPassword, expiryDate, portalUrl }
}

function generateTempPassword() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'
  let password = ''
  
  // Ensure at least one uppercase, one lowercase, one number
  password += 'ABCDEFGHJKMNPQRSTUVWXYZ'[Math.floor(Math.random() * 23)]
  password += 'abcdefghijkmnpqrstuvwxyz'[Math.floor(Math.random() * 23)]
  password += '23456789'[Math.floor(Math.random() * 8)]
  
  // Fill remaining characters
  for (let i = 3; i < 12; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('')
}

function createEmailTemplate(data: any) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Engel & Engel Publications Portal - Test Access</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div style="max-width: 650px; margin: 0 auto; background: #ffffff;">
    <!-- Header with Logo and Branding -->
    <div style="background: linear-gradient(135deg, #293995 0%, #293995 100%); padding: 40px 30px; text-align: center; position: relative;">
      <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 12px; display: inline-block;">
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
          ENGEL & ENGEL LLP
        </h1>
        <div style="height: 2px; background: rgba(255,255,255,0.3); margin: 12px 0;"></div>
        <p style="color: #e0e7ff; margin: 0; font-size: 16px; font-weight: 500;">
          FORENSIC ACCOUNTING & EXPERT SERVICES
        </p>
      </div>
      <div style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.2); padding: 8px 12px; border-radius: 20px;">
        <span style="color: white; font-size: 12px; font-weight: 600;">TEST ACCOUNT</span>
      </div>
    </div>
    
    <!-- Main Content -->
    <div style="padding: 50px 40px; background: #ffffff;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #11162d; margin: 0; font-size: 28px; font-weight: 600;">
          Publications Portal Access
        </h2>
        <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">
          Your secure credentials for testing the client portal
        </p>
      </div>
      
      <p style="color: #4b5563; line-height: 1.7; margin-bottom: 25px; font-size: 16px;">
        Dear Peter Doust,
      </p>
      
      <p style="color: #4b5563; line-height: 1.7; margin-bottom: 30px; font-size: 16px;">
        Welcome to the Engel & Engel Publications Portal! You now have secure access to our exclusive collection of research papers, articles, and professional publications in forensic accounting and litigation support.
      </p>
      
      <!-- Credentials Box -->
      <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e6f0; border-radius: 12px; padding: 30px; margin: 35px 0;">
        <h3 style="color: #293995; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; text-align: center;">
          🔐 Your Access Credentials
        </h3>
        
        <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #293995;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; color: #11162d; font-weight: 600; font-size: 14px; margin-bottom: 5px;">ACCESS TOKEN:</label>
            <code style="background: #f3f4f6; padding: 8px 12px; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 14px; color: #11162d; word-break: break-all; display: block;">${data.accessToken}</code>
          </div>
          
          <div>
            <label style="display: block; color: #11162d; font-weight: 600; font-size: 14px; margin-bottom: 5px;">TEMPORARY PASSWORD:</label>
            <code style="background: #f3f4f6; padding: 8px 12px; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 16px; color: #11162d; font-weight: 600; display: block;">${data.tempPassword}</code>
          </div>
        </div>
        
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 6px;">
          <p style="color: #92400e; margin: 0; font-size: 14px; font-weight: 500;">
            <strong>⚠️ Important:</strong> You will be required to create a new secure password on your first login.
          </p>
        </div>
      </div>
      
      <!-- Login Instructions -->
      <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 12px; padding: 25px; margin: 30px 0;">
        <h3 style="color: #0c4a6e; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
          📋 How to Access the Portal
        </h3>
        <ol style="color: #0c4a6e; margin: 0; padding-left: 20px; line-height: 1.6;">
          <li style="margin-bottom: 8px;">Click the "Access Portal" button below</li>
          <li style="margin-bottom: 8px;">The access token will be pre-filled automatically</li>
          <li style="margin-bottom: 8px;">Enter your temporary password from above</li>
          <li style="margin-bottom: 8px;">Create a new secure password when prompted</li>
          <li>Start exploring our publications library!</li>
        </ol>
      </div>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 40px 0;">
        <a href="${data.portalUrl}" 
           style="background: linear-gradient(135deg, #293995 0%, #293995 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);">
          🚀 Access Publications Portal
        </a>
      </div>
      
      <!-- Access Details -->
      <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 30px 0;">
        <h4 style="color: #11162d; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Access Details:</h4>
        <ul style="color: #6b7280; margin: 0; padding-left: 20px; line-height: 1.6; font-size: 14px;">
          <li><strong>Portal URL:</strong> ${data.portalUrl.split('?')[0]}</li>
          <li><strong>Access Expires:</strong> ${data.expiryDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</li>
          <li><strong>Account Type:</strong> Test Account</li>
        </ul>
      </div>
      
      <!-- Support Information -->
      <div style="border-top: 2px solid #e2e6f0; padding-top: 25px; margin-top: 35px;">
        <h4 style="color: #11162d; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">Need Assistance?</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 20px;">
          <div style="flex: 1; min-width: 200px;">
            <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 14px;">
              <strong>📞 Phone Support:</strong><br>
              <a href="tel:(310) 277-2220" style="color: #293995; text-decoration: none; font-weight: 600;">(310) 277-2220</a>
            </p>
          </div>
          <div style="flex: 1; min-width: 200px;">
            <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 14px;">
              <strong>✉️ Email Support:</strong><br>
              <a href="mailto:jason@engelandengel.com" style="color: #293995; text-decoration: none; font-weight: 600;">jason@engelandengel.com</a>
            </p>
          </div>
        </div>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e6f0;">
        <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
          We're excited to have you explore our publications portal. Our research represents decades of expertise in forensic accounting, and we're confident you'll find valuable insights for your work.
        </p>
        
        <p style="color: #4b5563; line-height: 1.6; margin: 0; font-size: 16px;">
          Best regards,<br>
          <strong style="color: #11162d;">Jason A. Engel, CPA, CFE</strong><br>
          <span style="color: #6b7280;">Managing Partner</span><br>
          <strong style="color: #293995;">Engel & Engel LLP</strong>
        </p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="background: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e2e6f0;">
      <div style="margin-bottom: 15px;">
        <p style="color: #11162d; margin: 0; font-size: 14px; font-weight: 600;">
          350 S Grand Avenue, Suite 3160, Los Angeles, CA 90071
        </p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <a href="tel:(310) 277-2220" style="color: #293995; text-decoration: none; margin: 0 15px; font-size: 14px;">(310) 277-2220</a>
        <span style="color: #d1d5db;">|</span>
        <a href="mailto:info@engelandengel.com" style="color: #293995; text-decoration: none; margin: 0 15px; font-size: 14px;">info@engelandengel.com</a>
        <span style="color: #d1d5db;">|</span>
        <a href="https://engelandengel.com" style="color: #293995; text-decoration: none; margin: 0 15px; font-size: 14px;">engelandengel.com</a>
      </div>
      
      <div style="border-top: 1px solid #e2e6f0; padding-top: 15px;">
        <p style="color: #6b7280; font-size: 12px; margin: 0 0 5px 0;">
          This email contains confidential information intended only for the recipient. 
          If you received this in error, please delete it immediately.
        </p>
        <p style="color: #6b7280; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} Engel & Engel LLP. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `
}

export async function POST(request: NextRequest) {
  // This endpoint sends mail to an arbitrary address and returns generated portal
  // credentials, so it must never be reachable anonymously — an open relay otherwise.
  const gate = await requireAdmin(request)
  if (gate.error) return gate.error

  try {
    const { email = 'peter@gcs.la' } = await request.json()
    
    // Generate test credentials
    const credentials = generateTestCredentials()
    
    // For now, we'll use a simple email service or just return the credentials
    // In production, you'd configure nodemailer with your SMTP settings
    
    // Try to send email if SMTP is configured
    let emailSent = false
    let emailError = null
    
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        })
        
        await transporter.sendMail({
          from: `"Engel & Engel LLP" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: email,
          subject: 'Engel & Engel Publications Portal - Test Access Credentials',
          html: createEmailTemplate(credentials)
        })
        
        emailSent = true
      } catch (error) {
        emailError = error instanceof Error ? error.message : 'Unknown email error'
      }
    }
    
    return NextResponse.json({
      success: true,
      emailSent,
      emailError,
      credentials: {
        email,
        accessToken: credentials.accessToken,
        tempPassword: credentials.tempPassword,
        portalUrl: credentials.portalUrl,
        expiryDate: credentials.expiryDate
      },
      message: emailSent 
        ? 'Professional email sent successfully!' 
        : 'Test credentials generated. Configure SMTP to send email.'
    })
    
  } catch (error) {
    console.error('Send test email error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
