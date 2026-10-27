'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { resetCurrentUserCache } from '../useCurrentUser'

export default function AdminLoginPage() {
  const router = useRouter()
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSent, setForgotSent] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Already logged in -> redirect to dashboard
  useEffect(() => {
    const token = sessionStorage.getItem('raffle_token')
    if (token) {
      // /admin resolves the first section this user may actually open.
      router.replace('/admin')
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/raffle/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      sessionStorage.setItem('raffle_token', data.token)
      // Drop any identity cached for a previously signed-in user.
      resetCurrentUserCache()
      // /admin resolves the first section this user may actually open.
      router.replace('/admin')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/raffle/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setForgotSent(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#1d2653] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
              {showForgotPassword ? (
                forgotSent ? (
                  <svg className="w-7 h-7 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                )
              ) : (
                <svg className="w-7 h-7 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              {showForgotPassword ? (forgotSent ? 'Check Your Email' : 'Reset Password') : 'Engel & Engel'}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              {showForgotPassword ? (forgotSent ? 'We sent you a reset link' : 'Enter your admin email') : 'Admin Panel'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 px-4 py-2.5 text-sm rounded-lg text-center mb-5 border border-red-100">
              {error}
            </div>
          )}

          {showForgotPassword ? (
            forgotSent ? (
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-6">
                  If <strong className="text-gray-700">{forgotEmail}</strong> is registered, you'll receive a reset link shortly.
                </p>
                <button
                  onClick={() => { setShowForgotPassword(false); setForgotSent(false); setError('') }}
                  className="w-full py-3.5 bg-[#1d2653] text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={e => { setForgotEmail(e.target.value); setError('') }}
                    placeholder="admin@example.com"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#1d2653] text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Sending...' : 'Send Reset Link'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForgotPassword(false); setError('') }}
                  className="w-full py-2 text-gray-400 text-sm hover:text-gray-600 transition-colors"
                >
                  Back to Sign In
                </button>
              </form>
            )
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={e => { setLoginEmail(e.target.value); setError('') }}
                  placeholder="admin@example.com"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={e => { setLoginPassword(e.target.value); setError('') }}
                  placeholder="Enter password"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#1d2653] text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors disabled:opacity-50"
              >
                {submitting ? 'Signing In...' : 'Sign In'}
              </button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => { setShowForgotPassword(true); setError('') }}
                  className="text-gray-400 text-xs hover:text-[#D4AF37] transition-colors"
                >
                  Forgot your password?
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="text-center text-gray-500 text-[10px] tracking-wider uppercase mt-6">
          Engel & Engel LLP &middot; Forensic Accountants
        </p>
      </motion.div>
    </div>
  )
}
