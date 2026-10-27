'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import TrackedPhoneLink from '@/components/ui/TrackedPhoneLink'

function PortalLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    accessToken: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Pre-fill access token from URL if provided
    const token = searchParams.get('token')
    if (token) {
      setFormData(prev => ({ ...prev, accessToken: token }))
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // SIMPLIFIED LOGIN FOR TESTING
    // Remove this and implement proper authentication later
    try {
      // Simple test validation
      if (!formData.accessToken || !formData.password) {
        throw new Error('Please enter both access token and password')
      }

      // For testing, accept any token/password combination
      // In production, this would validate against the database
      const mockClient = {
        id: 'test-client-123',
        email: 'peter@gcs.la',
        firstName: 'Peter',
        lastName: 'Doust',
        company: 'GCS LA',
        isPasswordChanged: false // Force password change for testing
      }

      // Store mock client info
      localStorage.setItem('portalToken', 'test-token-123')
      localStorage.setItem('clientInfo', JSON.stringify(mockClient))

      // Always go to password change for testing
      router.push('/portal/change-password')

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">Engel & Engel LLP</h1>
          <p className="text-primary-700">Publications Portal</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-900">Client Login</CardTitle>
            <p className="text-gray-600 mt-2">
              Access your exclusive publications and research papers
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div>
                <label htmlFor="accessToken" className="block text-sm font-medium text-gray-700 mb-2">
                  Access Token
                </label>
                <input
                  type="text"
                  id="accessToken"
                  name="accessToken"
                  value={formData.accessToken}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Enter your access token"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This was provided in your invitation email
                </p>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Enter your password"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use the temporary password from your invitation email
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-lg font-medium"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Need help accessing your account?
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <TrackedPhoneLink phone="(310) 277-2220" location="portal_login" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                    Call (310) 277-2220
                  </TrackedPhoneLink>
                  <span className="hidden sm:inline text-gray-400">|</span>
                  <button
                    type="button"
                    onClick={() => router.push('/portal/request-access')}
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                  >
                    Request New Access
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Engel & Engel LLP. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function PortalLoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PortalLoginForm />
    </Suspense>
  )
}
