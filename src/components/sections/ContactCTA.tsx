'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import TrackedPhoneLink from '@/components/ui/TrackedPhoneLink'
import { trackFormSubmission, type PhoneClickLocation } from '@/lib/analytics'

interface ContactCard {
  name: string
  creds: string
  image: string
  address: string
  city: string
  tel: string
  direct: string
  email: string
  // Both numbers are tracked separately: the main line is shared between the
  // partners, so only the direct line identifies who was actually called.
  telLocation: PhoneClickLocation
  directLocation: PhoneClickLocation
}

const teamMembers: ContactCard[] = [
  {
    name: 'Jason A. Engel',
    creds: 'CPA, CFE, CIRA, CVA, MAFF, ABV',
    image: '/images/team/jason-engel.jpg',
    address: '350 S Grand Avenue, Suite 3160',
    city: 'Los Angeles, CA 90071',
    tel: '(310) 277-2220',
    direct: '(310) 277-5986',
    email: 'jasonengel@engelandengel.com',
    telLocation: 'homepage_jason_office',
    directLocation: 'homepage_jason_direct'
  },
  {
    name: 'Brandon J. Engel',
    creds: 'CPA, CFE, ABV',
    image: '/images/team/brandon-engel.jpg',
    address: '350 S Grand Avenue, Suite 3160',
    city: 'Los Angeles, CA 90071',
    tel: '(310) 277-2220',
    direct: '(310) 579-0115',
    email: 'brandon@engelandengel.com',
    telLocation: 'homepage_brandon_office',
    directLocation: 'homepage_brandon_direct'
  }
]

export default function ContactCTA() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/send-contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() }),
      })
      if (!response.ok) throw new Error('Failed to send message')
      // Server confirmed the send — safe to report the lead. Anything earlier
      // would count failed submissions as Google Ads conversions.
      trackFormSubmission('contact_form')
      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      console.error('Error submitting contact form:', error)
      alert('There was an error sending your message. Please try again or call (310) 277-2220.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-primary-950">

      <div className="container-custom relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left Column: Team Cards */}
          <div className="space-y-5 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-10 "
            >
              {/* <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-[#D4AF37]/60" />
                <span className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-[0.3em]">Get in Touch</span>
                <span className="h-px w-8 bg-[#D4AF37]/60" />
              </div> */}
              <h2 className="text-5xl md:text-6xl font-bold leading-[1.1] font-serif italic text-[#d4af37] tracking-tight">
                Contact
                <span className="text-white not-italic font-sans"> us today</span>
              </h2>
              <p className="mt-1 text-lg md:text-xl text-white font-light max-w-xl">
                to discuss how we can help you
              </p>
              {/* <div className="h-px w-24 bg-[#D4AF37]" /> */}
            </motion.div>
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group relative  bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/40 text-white transition-all duration-500 overflow-hidden hover:shadow-lg"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/[0.03] to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-6 md:p-8">
                  <div className="flex items-start gap-5 md:gap-6">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 overflow-hidden ring-2 ring-gray-200 group-hover:ring-[#D4AF37]/40 transition-all duration-500 rounded-full">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover object-top  transition-transform duration-700 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-[10px] font-bold text-[#D4AF37]/80 tracking-widest uppercase mb-4">{member.creds}</p>

                      <div className="space-y-1 text-sm text-white font-normal">
                        <p className="text-white">{member.address}</p>
                        <p className="text-white">{member.city}</p>
                        <p className="text-white font-semibold">
                          <span className="">MAIN: </span>
                          <TrackedPhoneLink
                            phone={member.tel}
                            location={member.telLocation}
                            className="text-white hover:text-[#D4AF37] transition-colors duration-300"
                          >
                            {member.tel}
                          </TrackedPhoneLink>
                        </p>
                        <p className="text-white font-semibold">
                          <span className="">DIRECT: </span>
                          <TrackedPhoneLink
                            phone={member.direct}
                            location={member.directLocation}
                            className="text-white hover:text-[#D4AF37] transition-colors duration-300"
                          >
                            {member.direct}
                          </TrackedPhoneLink>
                        </p>
                        <p className="truncate text-white font-semibold">
                          <span className="">EMAIL: </span>
                          <a href={`mailto:${member.email}`} className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300">{member.email}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative lg:col-span-7"
          >
            <div className="relative bg-white p-8 md:p-12">
              <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#D4AF37]"></div>
              {/* <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-950 mb-2">Contact Us</h3>
              <p className="text-sm lg:text-lg text-primary-950/60 mb-10">Fill out the form below and we&apos;ll get back to you shortly.</p> */}

              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-[#D4AF37]/15 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#D4AF37]/40">
                    <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-primary-950 mb-2">Message Received</h3>
                  <p className="text-primary-950/60 mb-6">
                    Thank you for contacting Engel & Engel. We&apos;ll respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-bold text-primary-950 hover:text-[#D4AF37] tracking-[0.3em] uppercase transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-semibold text-primary-950 uppercase tracking-[0.15em] mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name *"
                        className="w-full px-4 py-3.5 bg-[#f8fbff] border border-primary-950/40 rounded-md focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 outline-none transition-all text-primary-950 text-sm placeholder:text-primary-950/30"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-primary-950 uppercase tracking-[0.15em] mb-2">Your Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your Email *"
                        className="w-full px-4 py-3.5 bg-[#f8fbff] border border-primary-950/40 rounded-md focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 outline-none transition-all text-primary-950 text-sm placeholder:text-primary-950/30"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-primary-950 uppercase tracking-[0.15em] mb-2">Your Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your Phone Number"
                      className="w-full px-4 py-3.5 bg-[#f8fbff] border border-primary-950/40 rounded-md focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 outline-none transition-all text-primary-950 text-sm placeholder:text-primary-950/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-primary-950 uppercase tracking-[0.15em] mb-2">Enter a Brief Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Enter a Brief Message"
                      rows={5}
                      className="w-full px-4 py-3.5 bg-[#f8fbff] border border-primary-950/40 rounded-md focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 outline-none transition-all text-primary-950 text-sm placeholder:text-primary-950/30 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-primary-950 uppercase tracking-[0.15em] mb-2">Google reCAPTCHA</label>
                    <div className="w-full h-20 border border-primary-950/40 bg-[#f8fbff] flex items-center rounded-md justify-center text-sm text-primary-950/40">
                      reCAPTCHA widget placeholder
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 bg-primary-950 hover:bg-[#D4AF37] text-white font-bold tracking-[0.5em] uppercase text-xs transition-all duration-500 rounded-none group relative overflow-hidden disabled:opacity-60 hover:text-[#1d2653]"
                  >
                    <span className="relative z-10">{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                    <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
