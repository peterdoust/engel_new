'use client'

import React, { useState } from 'react'
import Link from 'next/link'

/**
 * `initialEmail` is read from ?email= by the server component rather than by
 * useSearchParams here. Under useSearchParams the page has to sit behind a
 * Suspense boundary, and a statically rendered boundary ships the fallback —
 * so the mailer's one-click path would land on an empty box until hydration.
 */
export default function UnsubscribeForm({ initialEmail = '' }: { initialEmail?: string }) {
  const prefilled = initialEmail

  const [email, setEmail] = useState(prefilled)
  const [company, setCompany] = useState('') // honeypot
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          company,
          source: prefilled ? 'mailer' : 'manual',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
          <svg className="w-7 h-7 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-primary-950 mb-3">You&apos;ve been unsubscribed</h2>
        <p className="text-gray-600 leading-relaxed">
          <span className="font-medium text-primary-950">{email.trim().toLowerCase()}</span> has been removed from our
          mailing list. Please allow up to 10 business days for the change to take effect &mdash; you may receive
          messages already in transit during that time.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 text-sm font-semibold tracking-wider uppercase text-[#D4AF37] hover:text-primary-950 transition-colors"
        >
          Return to homepage
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="unsubscribe-email" className="block text-sm font-semibold text-primary-950 mb-2">
        Email address
      </label>
      <input
        id="unsubscribe-email"
        type="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@example.com"
        autoComplete="email"
        required
        className="w-full px-5 py-4 border border-gray-300 text-primary-950 placeholder:text-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-colors"
      />

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="unsubscribe-company">Company</label>
        <input
          id="unsubscribe-company"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={e => setCompany(e.target.value)}
        />
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-6 px-8 py-4 bg-[#D4AF37] text-[#1D2653] font-bold text-sm tracking-wider uppercase hover:bg-primary-950 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Processing...' : 'Unsubscribe'}
      </button>

      <p className="mt-6 text-xs text-gray-500 leading-relaxed">
        This removes you from our newsletter and announcement emails. We will still reply to messages you send us
        directly. Questions? Email{' '}
        <a href="mailto:info@engelandengel.com" className="text-[#D4AF37] hover:underline">
          info@engelandengel.com
        </a>
        .
      </p>
    </form>
  )
}
