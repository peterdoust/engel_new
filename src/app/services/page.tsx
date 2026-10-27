'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TrackedPhoneLink from '@/components/ui/TrackedPhoneLink'

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const mainServices = [
  {
    title: 'Forensic Accounting',
    description: 'Specialized investigative accounting to identify inconsistencies, detect hidden transactions, and provide clear financial evidence for legal proceedings.',
    href: '/services/forensic-accounting',
    number: '01'
  },
  {
    title: 'Expert Witness Testimony',
    description: 'Court-tested testimony from highly credentialed experts in state, federal, and bankruptcy courts across complex financial litigation.',
    href: '/services/expert-witness-testimony',
    number: '02'
  },
  {
    title: 'Joint Retention Program',
    description: 'A neutral, cost-effective forensic accounting process for multi-party disputes, designed to achieve objective results and settlement.',
    href: '/services/joint-retention-program',
    number: '03'
  },
  {
    title: 'Internal Investigations',
    description: 'Confidential investigations into suspected corporate fraud, embezzlement, and management misconduct for private and public entities.',
    href: '/services/internal-investigations',
    number: '04'
  }
];

const stats = [
  { value: '30+', label: 'Years Experience' },
  { value: '20', label: 'Research Publications' },
  { value: '6', label: 'Professional Certifications' },
  { value: '1,000+', label: 'Cases Resolved' },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="bg-slate-50 min-h-screen">

        {/* ══════════ CINEMATIC HERO ══════════ */}
        <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-[#293995] text-white text-center">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 animate-ken-burns"
              style={{ backgroundImage: 'url("https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#293995] via-[#293995]/95 to-[#293995]" />
            <div className="absolute top-0 right-0 w-[1200px] h-[800px] bg-[#D4AF37]/10 blur-[200px] rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tighter text-white">
                Core <br />
                <span className="font-serif italic text-[#D4AF37] font-medium text-[2.5rem]">Services</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ══════════ SERVICES LISTING ══════════ */}
        <section className="py-32 relative bg-white">
          <div className="container-custom">
            <div className="flex flex-col gap-12 max-w-6xl mx-auto">
              {mainServices.map((service, idx) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Link
                    href={service.href}
                    className="group relative flex flex-col md:flex-row items-center gap-10 p-10 lg:p-16 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-[0_30px_70px_rgba(0,0,0,0.06)] hover:border-[#D4AF37]/30 transition-all duration-700 overflow-hidden"
                  >
                    {/* Number Background */}
                    <div className="absolute top-0 right-0 p-8 text-9xl font-bold text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-y-4 select-none">
                      {service.number}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-[1px] bg-[#D4AF37]" />
                        <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#D4AF37]">Service {service.number}</span>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-bold text-[#293995] tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                        {service.title}
                      </h3>
                      <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed max-w-2xl">
                        {service.description}
                      </p>

                      <div className="pt-4 flex items-center gap-4 text-sm font-bold tracking-widest text-[#D4AF37] uppercase group/more">
                        Learn More
                        <div className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center group-hover/more:bg-[#D4AF37] group-hover/more:text-[#1d2653] transition-all">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Image Placeholder / Icon Visual */}
                    <div className="relative w-full md:w-1/3 aspect-square max-w-[280px] rounded-3xl overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:scale-105 transition-transform duration-1000 shadow-inner">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
                      <div className="w-20 h-20 rounded-2xl border-2 border-[#293995]/10 flex items-center justify-center text-[#293995]">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ CTA SECTION ══════════ */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#293995]" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/5 blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[140px] rounded-full -translate-x-1/2 translate-y-1/2" />

          <div className="container-custom relative z-10 text-center">
            <div className="max-w-4xl mx-auto py-20 px-10 border border-white/5 bg-white/[0.02] backdrop-blur-md rounded-[3rem] shadow-2xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight leading-tight">
                Experience the <br />
                <span className="font-serif italic text-[#D4AF37] font-medium text-[2.5rem] tracking-normal">Engel Difference</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
                Join the law firms and public corporations that rely on our authoritative forensic investigative reporting and court-validated expert testimony.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/contact" className="px-10 py-5 bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-lg rounded-2xl shadow-xl transition-all duration-300">
                  Secure Your Consultation
                </Link>
                <TrackedPhoneLink phone="+13102772220" location="services_index_cta" className="px-10 py-5 bg-white/5 border border-white/20 hover:bg-white/10 text-white font-bold text-lg rounded-2xl transition-all duration-300">
                  (310) 277-2220
                </TrackedPhoneLink>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

