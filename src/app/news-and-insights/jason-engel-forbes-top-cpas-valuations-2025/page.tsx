'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import TrackedPhoneLink from '@/components/ui/TrackedPhoneLink'

export default function ForbesTopCPAsArticle() {
  return (
    <>
      <main>
        <Header />

        {/* Hero Banner */}
        <section className="relative overflow-hidden bg-[#293995] pt-[calc(var(--hdr)+1rem)] pb-10">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          </div>

          <div className="relative z-10">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                  {/* Left - Text Content */}
                  <div className="lg:col-span-3">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="mb-5">
                      <ol className="flex items-center space-x-2 text-sm text-[#D4AF37]/80">
                        <li><Link href="/" className="text-white/75 hover:text-[#D4AF37] transition-colors">Home</Link></li>
                        <li className="text-white/40">/</li>
                        <li><Link href="/news-and-insights" className="text-white/75 hover:text-[#D4AF37] transition-colors">News &amp; Insights</Link></li>
                        <li className="text-white/40">/</li>
                        <li className="text-white font-medium">Awards</li>
                      </ol>
                    </nav>

                    <div className="mb-4">
                      <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                        Announcements
                      </span>
                      <span className="ml-3 text-white/60 text-sm">March 6, 2026</span>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
                      Jason Engel Named to Forbes&apos; Inaugural List of America&apos;s Top CPAs in Valuations
                    </h1>
                    <p className="text-lg lg:text-xl text-white/90 mb-6 leading-relaxed max-w-4xl">
                      Drawn from nominations, independent research, and interviews with industry leaders and experts.
                    </p>
                    <div className="flex flex-wrap items-center gap-6 text-white/90">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                          EE
                        </div>
                        <div>
                          <div className="font-medium text-white">Engel & Engel LLP</div>
                          <div className="text-sm text-white/70">Press Release</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right - Forbes Logo */}
                  <div className="lg:col-span-2 flex items-center justify-center">
                    <div className="relative w-full h-[140px] lg:h-[260px] p-2">
                      <Image
                        src="/images/memberships/forbes.png"
                        alt="Forbes Top CPAs for Valuations 2025"
                        fill
                        className="object-contain p-8"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Forbes', 'Business Valuation', 'CPA', 'Awards', 'Los Angeles'].map((tag) => (
                  <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-ul:my-4 prose-ol:my-4 prose-li:my-1">
                <p>
                  <strong>LOS ANGELES &mdash; March 6, 2026</strong>
                </p>
                <p>
                  Jason Engel has been named among Forbes&apos; inaugural list of America&apos;s Top CPAs in Valuations. This prestigious list was drawn from nominations, independent research, and interviews with industry leaders and experts.
                </p>
                <p>
                  For nearly 47 years, Jason has been engaged in the practice of public accounting and has been a respected leader in the forensic accounting arena since 1982. Jason has served as an expert witness in over 500 cases and has testified in federal, bankruptcy, and state courts. He has also testified in arbitration and has served as a court appointed accounting referee. His professional credentials include those of Certified Public Accountant (CPA), Certified Fraud Examiner (CFE), Certified Insolvency and Restructuring Advisor (CIRA), Certified Valuation Analyst (CVA), Master Analyst of Financial Forensics (MAFF), and Accredited in Business Valuation (ABV).
                </p>
                <p>
                  This recognition reflects his commitment to forensic accounting and valuation services that align with the needs of private practice attorneys and in-house counsel.
                </p>

                <h2>About Engel &amp; Engel</h2>
                <p>
                  Engel &amp; Engel, LLP has been engaged in the practice of forensic accounting and expert testimony since 1994. Located in Los Angeles, Engel &amp; Engel has positioned itself as one of the premier providers of forensic accounting and advisory services not only in California, but nationwide as well. The firm is dedicated to providing private practice law firms, as well as in-house counsel of Fortune 500 to middle-market companies, complex business litigation support including fraud investigations, economic damages, business valuation, bankruptcy and insolvency, alter ego, IP litigation, employment litigation, real estate litigation, construction litigation and a variety of other litigation matters.
                </p>
                <p>
                  For more information about Engel &amp; Engel LLP, visit <Link href="/" className="text-blue-600 hover:underline">engelandengel.com</Link> or contact the firm directly.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Contact CTA */}
        <section className="relative py-28 bg-[#1D2653] overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <p className="text-base md:text-lg text-white/60 font-light mb-10 text-center">
                For additional information about{' '}
                <span className="text-white font-medium">Engel &amp; Engel&apos;s</span>{' '}
                <span className="font-serif italic text-[#D4AF37]">Valuation Services</span>{' '}
                or a consultation, please contact:
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex items-center gap-6 p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                  <div className="flex-shrink-0">
                    <div className="rounded-full overflow-hidden border-2 border-[#D4AF37]/40">
                      <Image width={80} height={80} src="/images/team/brandon-engel.jpg" alt="Brandon J. Engel" className="w-20 h-20 object-cover object-top" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Brandon J. Engel</h3>
                    <p className="text-white/50 text-sm font-medium tracking-widest uppercase">CPA, CFE, ABV</p>
                    <div className="h-px w-16 bg-[#D4AF37] mt-2" />
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-5 p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                  <a href="mailto:brandon@engelandengel.com" className="group flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#1D2653] transition-all duration-300 shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-lg font-semibold text-white/90 group-hover:text-white border-b border-white/20 group-hover:border-[#D4AF37] pb-0.5 transition-all duration-200">
                      brandon@engelandengel.com
                    </span>
                  </a>

                  <TrackedPhoneLink phone="310-277-2220" location="news_article_cta" className="group flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#1D2653] transition-all duration-300 shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-lg font-semibold text-white/90 group-hover:text-white border-b border-white/20 group-hover:border-[#D4AF37] pb-0.5 transition-all duration-200">
                      310-277-2220
                    </span>
                  </TrackedPhoneLink>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        </section>

        <Footer />
      </main>
    </>
  )
}
