'use client'

import React, { useState } from 'react'

// Blog "Get the Latest Insights" sign-up. Sends the address to /api/newsletter-signup, which emails the firm.
export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('') // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again later.')
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again later.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div role="status" className="max-w-md mx-auto border border-[#D4AF37]/40 bg-white/5 px-6 py-5 text-white">
        <p className="font-semibold text-[#D4AF37]">Thank you for subscribing.</p>
        <p className="mt-1 text-sm text-white/70">We&apos;ll send our latest insights to {email}.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto" noValidate={false}>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-5 py-4 text-base bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
        />
        {/* Hidden from people; bots tend to fill it in */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={company}
          onChange={e => setCompany(e.target.value)}
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-8 py-4 bg-[#D4AF37] text-[#1D2653] font-bold text-sm tracking-wider uppercase hover:bg-white transition-colors duration-300 disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>
      )}
    </form>
  )
}
