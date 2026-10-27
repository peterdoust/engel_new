'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useCurrentUser } from '../useCurrentUser'

interface TestCredentials {
  email: string
  accessToken: string
  tempPassword: string
  portalUrl: string
  expiryDate: string
}

export default function TestEmailPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  // Sending mail is an administrator tool; it is not one of the granted sections.
  const { user, loading: userLoading } = useCurrentUser()

  const sendTestEmail = async () => {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/send-test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': sessionStorage.getItem('raffle_token') || '',
        },
        body: JSON.stringify({ email: 'peter@gcs.la' }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send test email')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">
        Loading...
      </div>
    )
  }

  if (!user?.canManageUsers) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md text-center">
          <h1 className="text-lg font-bold text-gray-900 mb-2">Administrators only</h1>
          <p className="text-sm text-gray-600">
            This tool sends email on behalf of the firm and is restricted to administrators.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-900 mb-2">Engel & Engel LLP</h1>
          <p className="text-primary-700 text-lg">Client Portal Test Email Generator</p>
          <div className="mt-2 inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            🔧 ADMIN TEST - REMOVE BEFORE PRODUCTION
          </div>
        </div>

        {/* Main Card */}
        <Card className="shadow-xl mb-8">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-900">Generate Test Email</CardTitle>
            <p className="text-gray-600 mt-2">
              Create professional test credentials and send invitation email to peter@gcs.la
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Generate Button */}
            <div className="text-center">
              <Button
                onClick={sendTestEmail}
                disabled={loading}
                className="px-8 py-3 text-lg font-medium"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Generate & Send Test Email
                  </>
                )}
              </Button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Success Result */}
            {result && (
              <div className="space-y-6">
                {/* Status */}
                <div className={`border rounded-lg p-4 ${
                  result.emailSent 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <div className="flex items-center">
                    {result.emailSent ? (
                      <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    )}
                    <p className={`font-medium ${
                      result.emailSent ? 'text-green-700' : 'text-yellow-700'
                    }`}>
                      {result.message}
                    </p>
                  </div>
                  {result.emailError && (
                    <p className="text-yellow-600 text-sm mt-2">
                      Email Error: {result.emailError}
                    </p>
                  )}
                </div>

                {/* Credentials */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Test Credentials Generated
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                      <div className="flex items-center space-x-2">
                        <code className="flex-1 bg-white px-3 py-2 border border-gray-300 rounded text-sm">
                          {result.credentials.email}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(result.credentials.email)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Access Token:</label>
                      <div className="flex items-center space-x-2">
                        <code className="flex-1 bg-white px-3 py-2 border border-gray-300 rounded text-sm break-all">
                          {result.credentials.accessToken}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(result.credentials.accessToken)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password:</label>
                      <div className="flex items-center space-x-2">
                        <code className="flex-1 bg-white px-3 py-2 border border-gray-300 rounded text-sm font-semibold">
                          {result.credentials.tempPassword}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(result.credentials.tempPassword)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Portal URL:</label>
                      <div className="flex items-center space-x-2">
                        <code className="flex-1 bg-white px-3 py-2 border border-gray-300 rounded text-sm break-all">
                          {result.credentials.portalUrl}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(result.credentials.portalUrl)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expires:</label>
                      <code className="block bg-white px-3 py-2 border border-gray-300 rounded text-sm">
                        {new Date(result.credentials.expiryDate).toLocaleString()}
                      </code>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={result.credentials.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button as="span" className="w-full">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Test Portal Login
                    </Button>
                  </a>
                  
                  <a
                    href="/portal/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button as="span" variant="outline" className="w-full">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Manual Login
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Click "Generate & Send Test Email" to create test credentials</li>
              <li>If email is configured, a professional invitation will be sent to peter@gcs.la</li>
              <li>Use the generated credentials to test the portal login</li>
              <li>Click "Test Portal Login" for direct access with pre-filled token</li>
              <li>Or use "Manual Login" to enter credentials manually</li>
            </ol>
            
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">
                <strong>Note:</strong> To enable email sending, configure SMTP environment variables in your .env.local file:
                SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT, SMTP_FROM
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
