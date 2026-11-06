'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import TrackedPhoneLink from '@/components/ui/TrackedPhoneLink';
import { trackFormSubmission, type PhoneClickLocation } from '@/lib/analytics';

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

interface ContactPerson {
  header: string;
  name: string;
  image: string;
  address: string;
  city: string;
  phone: string;
  direct: string;
  email: string;
  // The office line is shared, so only the direct line identifies who was called.
  phoneLocation: PhoneClickLocation;
  directLocation: PhoneClickLocation;
}

const contactPersons: ContactPerson[] = [
  {
    header: 'Forensic Accounting Services',
    name: 'Jason A. Engel, CPA, CFE, CIRA, CVA, MAFF, ABV',
    image: '/images/team/jason-engel.jpg',
    address: '350 S Grand Avenue, Suite 3160',
    city: 'Los Angeles, CA 90071',
    phone: '(310) 277-2220',
    direct: '(310) 277-5986',
    email: 'jasonengel@engelandengel.com',
    phoneLocation: 'contact_jason_office',
    directLocation: 'contact_jason_direct',
  },
  {
    header: 'Forensic Accounting Services',
    name: 'Brandon J. Engel, CPA, CFE, ABV',
    image: '/images/team/brandon-engel.jpg',
    address: '350 S Grand Avenue, Suite 3160',
    city: 'Los Angeles, CA 90071',
    phone: '(310) 277-2220',
    direct: '(310) 579-0115',
    email: 'brandon@engelandengel.com',
    phoneLocation: 'contact_brandon_office',
    directLocation: 'contact_brandon_direct',
  }
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Fired only once the server confirms delivery, never on button click.
      trackFormSubmission('contact_form');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('There was an error sending your message. Please try again or call (310) 277-2220.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Header />
        <main className="bg-[#293995] min-h-screen text-white flex items-center justify-center pt-20">
          <div className="container-custom py-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 bg-[#D4AF37]/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-[#D4AF37]/30">
                <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tighter text-white">Message Received</h1>
              <p className="text-xl text-slate-400 mb-10 font-light">
                Thank you for contacting Engel & Engel. We will review your inquiry and respond within 24 hours. For urgent matters, please call (310) 277-2220.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#1d2653] font-bold px-10 py-4 h-auto text-lg rounded-xl"
              >
                Send Another Message
              </Button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* ══════════ CINEMATIC HERO ══════════ */}
        <section className="relative pt-24 pb-8 lg:pt-32 lg:pb-12 overflow-hidden bg-primary-950 text-white text-center">
          {/* Subtle radial glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center top, rgba(212,175,55,0.06) 0%, transparent 60%)' }} />

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-[#D4AF37]/70 mb-5">Contact</p>
              <h1 className="text-[2.5rem] md:text-5xl font-bold leading-[1.1] tracking-tight text-white text-center md:text-left">
                Contact us today to discuss <br className="hidden md:block" />
                <span className="font-serif italic text-[#D4AF37] font-medium">how we can help you</span>
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto mt-8" />
            </motion.div>
          </div>
        </section>

        {/* ══════════ MAIN CONTENT ═════════ */}
        <section className="relative bg-primary-950 z-20 -mt-8">
          {/* Dark background that spans the full section */}
          <div className="bg-primary-950 pt-16 pb-32">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">

                {/* ▬▬ LEFT COLUMN: CONTACT INFO ▬▬ */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-5 space-y-6"
                >

                  {/* Principal Authorities Cards */}
                  {contactPersons.map((person, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.15 }}
                      className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-7 group hover:border-[#D4AF37]/30 hover:bg-white/[0.07] transition-all duration-500 relative overflow-hidden"
                    >
                      {/* Hover glow accent */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-transparent to-[#D4AF37]/0 group-hover:from-[#D4AF37]/[0.03] group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                      <div className="relative z-10">
                        <div className="flex items-start gap-5 mb-5">
                          {/* Avatar */}
                          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#D4AF37]/40 shrink-0">
                            <Image width={56} height={56} src={person.image} alt={person.name} className="w-full h-full object-cover object-top" />
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]/80 mb-1">{person.header}</p>
                            <p className="text-lg font-bold text-white leading-tight">{person.name}</p>
                          </div>
                        </div>

                        <div className="space-y-4 text-white/90 text-sm">
                          <div className="flex items-start gap-3">
                            <svg className="w-4 h-4 mt-0.5 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{person.address}, {person.city}</span>
                          </div>

                          <div className="h-px bg-white/[0.06]" />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <TrackedPhoneLink phone={person.phone} location={person.phoneLocation} className="flex text-white/90 items-center gap-3 hover:text-[#D4AF37] transition-colors duration-300">
                              <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:border-[#D4AF37]/20 transition-colors">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                              </div>
                              <span>{person.phone}</span>
                            </TrackedPhoneLink>
                            <TrackedPhoneLink phone={person.direct} location={person.directLocation} className="flex text-white/90 items-center gap-3 hover:text-[#D4AF37] transition-colors duration-300">
                              <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:border-[#D4AF37]/20 transition-colors">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                              </div>
                              <span>{person.direct}</span>
                            </TrackedPhoneLink>
                          </div>

                          <a href={`mailto:${person.email}`} className="flex items-center gap-3 text-white/90 hover:text-[#D4AF37] transition-colors duration-300 font-medium pt-1">
                            <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            {person.email}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Office hours badge */}
                  {/* <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl px-6 py-4"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <p className="text-white/80 text-sm font-medium">Available Mon - Fri, 9:00 AM - 6:00 PM PST</p>
                      <p className="text-white/40 text-xs mt-0.5">Urgent matters: call directly anytime</p>
                    </div>
                  </motion.div> */}
                </motion.div>

                {/* ▬▬ RIGHT COLUMN: CONTACT FORM ▬▬ */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="lg:col-span-7"
                >
                  <div className="bg-white rounded-2xl p-8 sm:p-10 lg:p-12 relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none">
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#D4AF37]/[0.06] to-transparent" />
                      <div className="absolute top-4 right-4 w-8 h-px bg-[#D4AF37]/30" />
                      <div className="absolute top-4 right-4 w-px h-8 bg-[#D4AF37]/30" />
                    </div>

                    {/* Left gold bar accent */}
                    <div className="absolute left-0 top-10 bottom-10 w-[3px] bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/40 to-transparent rounded-r-full" />

                    <div className="relative z-10">
                      <div className="mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                          Send an <span className="font-serif italic text-[#D4AF37]">Inquiry</span>
                        </h2>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    
    <div>
      <label className="block text-[11px] font-semibold text-primary-950 uppercase tracking-[0.15em] mb-2">
        Your Name
      </label>
      <input
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        type="text"
        placeholder="Your Name *"
        className="w-full px-4 py-3.5 bg-[#f8fbff] border border-primary-950/40 rounded-md"
        required
      />
    </div>

    <div>
      <label className="block text-[11px] font-semibold text-primary-950 uppercase tracking-[0.15em] mb-2">
        Your Email
      </label>
      <input
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        type="email"
        placeholder="Your Email *"
        className="w-full px-4 py-3.5 bg-[#f8fbff] border border-primary-950/40 rounded-md"
        required
      />
    </div>

  </div>

  <div>
    <label className="block text-[11px] font-semibold text-primary-950 uppercase tracking-[0.15em] mb-2">
      Your Phone Number
    </label>
    <input
      name="phone"
      value={formData.phone}
      onChange={handleInputChange}
      type="text"
      placeholder="Your Phone Number"
      className="w-full px-4 py-3.5 bg-[#f8fbff] border border-primary-950/40 rounded-md"
    />
  </div>

  <div>
    <label className="block text-[11px] font-semibold text-primary-950 uppercase tracking-[0.15em] mb-2">
      Enter a Brief Message
    </label>
    <textarea
      name="message"
      value={formData.message}
      onChange={handleInputChange}
      rows={5}
      placeholder="Enter a Brief Message"
      className="w-full px-4 py-3.5 bg-[#f8fbff] border border-primary-950/40 rounded-md resize-none"
    />
  </div>

  <Button
    type="submit"
    className="w-full py-6 bg-primary-950 text-white font-bold"
  >
    SEND MESSAGE
  </Button>

</form>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ MAP SECTION ══════════ */}
        <section className="">
          <div className="">
            <div className="relative h-[600px] w-full overflow-hidden shadow-2xl group grayscale hover:grayscale-0 transition-all duration-700">
              {/* Note: In a real app we'd use Google Maps. Using a placeholders/styled div for now */}
              <div className="absolute inset-0 bg-[#293995]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.672901974726!2d-118.25206982348505!3d34.05223417315664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c64bd9807669%3A0xc68e592634e5a953!2s350%20S%20Grand%20Ave%20%233160%2C%20Los%20Angeles%2C%20CA%2090071!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, opacity: 0.6 }}
                  title="Map of the Engel & Engel office at 350 S Grand Ave, Los Angeles"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="absolute left-4 right-4 bottom-4 sm:bottom-auto sm:right-auto sm:top-10 sm:left-10 z-10 bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-xl sm:max-w-xs border border-white">
                <h4 className="text-lg font-bold text-slate-900 mb-2">Visit Our Office</h4>
                <p className="text-sm text-slate-500 font-light leading-relaxed">
                  Centrally located in Downtown Los Angeles at <span className="text-slate-900 font-medium">350 S Grand Ave.</span> Validated parking available for all clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <style jsx global>{`
        @keyframes ken-burns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-1%, -1%); }
        }
        .animate-ken-burns {
          animation: ken-burns 20s infinite alternate linear;
        }
      `}</style>
    </>
  );
}

