'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TrackedPhoneLink from '@/components/ui/TrackedPhoneLink'

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const stats = [
  { value: '30+', label: 'Years Experience' },
  { value: '1,000+', label: 'Forensic Cases' },
  { value: '100+', label: 'Trial Testimonies' },
  { value: '$2.3B', label: 'Record Jury Award' },
];

const certifications = [
  { name: 'CPA', fullName: 'Certified Public Accountant', image: '/images/certifications/CPA.png' },
  { name: 'CFE', fullName: 'Certified Fraud Examiner', image: '/images/certifications/CFE.png' },
  { name: 'CIRA', fullName: 'Certified Insolvency & Restructuring Advisor', image: '/images/certifications/CIRA.png' },
  { name: 'CVA', fullName: 'Certified Valuation Analyst', image: '/images/certifications/CVA.png' },
  { name: 'MAFF', fullName: 'Master Analyst in Financial Forensics', image: '/images/certifications/MAFF.png' },
  { name: 'ABV', fullName: 'Accredited in Business Valuation', image: '/images/certifications/ABV.png' }
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-slate-50 min-h-screen">

        {/* ══════════ CINEMATIC HERO ══════════ */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#293995] text-white">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 animate-ken-burns"
              style={{ backgroundImage: 'url("https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#293995] via-[#293995]/90 to-[#293995]" />
            <div className="absolute top-0 right-0 w-[1200px] h-[800px] bg-[#D4AF37]/10 blur-[200px] rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D4AF37] mb-6 block">Established 1994</span>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[0.85] tracking-tighter text-white">
                  Excellence in
                  <span className="block mt-3 md:mt-4 leading-none font-serif italic text-[#D4AF37] font-medium text-4xl md:text-6xl lg:text-7xl">Forensics</span>
                </h1>
                <p className="text-white/75 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-16">
                  For over three decades, Engel & Engel has provided authoritative forensic accounting and expert witness services to top law firms and corporations nationwide.
                </p>

                {/* Vertical Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 py-12 border-y border-white/10 w-full mb-12">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
                      <div className="text-[11px] text-white/70 tracking-widest uppercase font-bold">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════ THE FIRM STORY ══════════ */}
        <section className="py-32 relative bg-white overflow-hidden">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-6 space-y-10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-[#D4AF37]" />
                  <span className="text-xs font-bold tracking-[0.4em] uppercase text-[#D4AF37]">The Engel Experience</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-[#293995] tracking-tight leading-[1.1]">
                  From Strategy <br />
                  <span className="text-[#D4AF37] font-serif italic font-medium">to Testimony</span>
                </h2>
                <div className="space-y-6 text-lg text-slate-500 font-light leading-relaxed">
                  <p>
                    Established in Los Angeles in 1994, <strong>Engel & Engel LLP</strong> has positioned itself as one of the premier providers of forensic accounting and advisory services, not only in California, but nationwide as well.
                  </p>
                  <p>
                    We provide private practice law firms, as well as in-house counsel of Fortune 500 to middle-market companies, complex business litigation support, including fraud investigations, economic damages, business valuation, and a variety of other litigation matters.
                  </p>
                  <p>
                    With over <strong>30+ years in the forensic accounting industry</strong>, working with attorneys and legal teams in and out of the courtroom, Engel & Engel brings credentials, expertise, and careful attention to each and every case.
                  </p>
                </div>

                <div className="pt-6">
                  <Link href="/contact" className="inline-flex items-center gap-4 px-10 py-5 bg-[#293995] text-white font-bold rounded-2xl hover:bg-black transition-all group">
                    Schedule Consultation
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-6"
              >
                <div className="relative p-12 lg:p-16 bg-slate-50 rounded-[3rem] border border-slate-100 overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full translate-x-32 -translate-y-32 group-hover:scale-125 transition-transform duration-1000" />

                  <h3 className="text-2xl font-bold text-[#293995] mb-10 relative z-10">Why Attorneys Choose Us</h3>
                  <div className="space-y-8 relative z-10">
                    {[
                      { title: 'Proven Expertise', text: 'Over 500 forensic accounting cases successfully handled with precision and depth.' },
                      { title: 'Elite Credentials', text: 'Multiple professional certifications and Big 4 background for authoritative reporting.' },
                      { title: 'Thought Leadership', text: '20+ authored research publications setting the standard for forensic frameworks.' },
                      { title: 'Court Credibility', text: 'Tested in state, federal, and bankruptcy courts with multi-million and billion dollar results.' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-6 group/item">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#D4AF37] group-hover/item:bg-[#D4AF37] group-hover/item:text-[#1d2653] transition-all shadow-sm">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-[#293995] leading-tight">{item.title}</p>
                          <p className="text-sm text-slate-500 mt-1 font-light">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══════════ CERTIFICATIONS ══════════ */}
        <section className="py-32 bg-slate-50 relative overflow-hidden">
          <div className="container-custom">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-[#D4AF37] mb-6 block">Professional Standards</span>
              <h2 className="text-4xl md:text-6xl font-bold text-[#293995] mb-8 tracking-tight">Our Credentials</h2>
              <p className="text-slate-500 text-xl font-light leading-relaxed">
                The credibility of our testimony is built upon a foundation of elite professional certifications and years of academic research.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 sm:gap-x-12 gap-y-10 sm:gap-y-16 max-w-6xl mx-auto">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center group cursor-default"
                >
                  <div className="relative w-full aspect-square max-w-[140px] mb-4 sm:mb-6 [@media(hover:hover)]:grayscale hover:grayscale-0 transition-all duration-700 p-4 border border-transparent hover:border-slate-200 rounded-3xl hover:bg-white hover:shadow-xl">
                    <Image
                      src={cert.image}
                      alt={cert.fullName}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm font-bold text-[#293995] uppercase tracking-widest">{cert.name}</p>
                  <p className="text-[11px] text-slate-500 text-center mt-1 font-bold tracking-tight px-2">{cert.fullName}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ BIG FOUR EXPERIENCE ══════════ */}
        <section className="py-32 bg-white">
          <div className="container-custom">
            <div className="bg-[#293995] rounded-[2rem] sm:rounded-[3rem] p-7 sm:p-12 lg:p-24 text-white relative overflow-hidden group">
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                <div>
                  <span className="text-xs font-bold tracking-[0.4em] uppercase text-[#D4AF37] mb-8 block">Global Perspective</span>
                  <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-[1.1] text-white">
                    Big Four <br />
                    <span className="font-serif italic text-[#D4AF37] font-medium">Forensic Experience</span>
                  </h2>
                  <p className="text-white/75 text-lg sm:text-xl font-light leading-relaxed mb-6">
                    Our team brings extensive experience from major international accounting firms, providing the professional rigor and depth of knowledge expected in high-stakes litigation.
                  </p>
                  <p className="text-white/75 text-lg sm:text-xl font-light leading-relaxed mb-12">
                    This background ensures that our clients receive the highest level of expert analysis, capable of withstanding the most demanding courtroom scrutiny.
                  </p>
                  <Link href="/services" className="inline-flex items-center gap-4 px-10 py-5 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-2xl hover:bg-[#D4AF37] hover:text-black transition-all">
                    View Our Services
                  </Link>
                </div>

                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-8 group-hover:border-[#D4AF37]/30 transition-all duration-700">
                        <div className="text-center font-serif italic text-3xl text-white/20 select-none uppercase tracking-tighter">Trust</div>
                      </div>
                      <div className="aspect-[4/3] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-8 translate-x-8 group-hover:border-[#D4AF37]/30 transition-all duration-700">
                        <div className="text-center font-serif italic text-3xl text-white/20 select-none uppercase tracking-tighter">Ethics</div>
                      </div>
                    </div>
                    <div className="space-y-4 pt-12">
                      <div className="aspect-[3/4] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-8 group-hover:border-[#D4AF37]/30 transition-all duration-700">
                        <div className="text-center font-serif italic text-3xl text-white/20 select-none uppercase tracking-tighter">Rigour</div>
                      </div>
                      <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-8 -translate-x-8 group-hover:border-[#D4AF37]/30 transition-all duration-700">
                        <div className="text-center font-serif italic text-3xl text-white/20 select-none uppercase tracking-tighter">Expert</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ CONTACT STRIP ══════════ */}
        <section className="py-32 bg-slate-50">
          <div className="container-custom text-center">
            <h4 className="text-xs font-bold tracking-[0.4em] uppercase text-slate-400 mb-8">Ready to Connect?</h4>
            <p className="text-3xl md:text-5xl font-bold text-[#293995] mb-12 tracking-tight">
              Schedule a secure consultation <br /> with our principal authorities.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact" className="px-12 py-5 bg-[#293995] text-white font-bold text-lg rounded-2xl hover:bg-black transition-all shadow-xl">
                Contact Us
              </Link>
              <TrackedPhoneLink phone="+13102772220" location="about_cta" className="px-12 py-5 bg-white text-[#293995] font-bold text-lg rounded-2xl hover:shadow-lg transition-all border border-slate-100">
                (310) 277-2220
              </TrackedPhoneLink>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <style jsx global>{`
        @keyframes ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-ken-burns {
          animation: ken-burns 20s infinite alternate linear;
        }
      `}</style>
    </>
  );
}

