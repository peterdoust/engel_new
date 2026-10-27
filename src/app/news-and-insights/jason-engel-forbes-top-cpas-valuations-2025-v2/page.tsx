'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'

export default function ForbesTopCPAsArticleV2() {
  return (
    <>
      <main>
        <Header />

        {/* Hero Banner */}
        <section className="relative overflow-hidden bg-primary-950">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          </div>

          <div className="relative z-10">
            <div className="container mx-auto px-6 pt-40 pb-16">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                  {/* Left - Text Content */}
                  <div className="lg:col-span-3">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="mb-8">
                      <ol className="flex items-center space-x-2 text-sm text-[#D4AF37]/80">
                        <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link></li>
                        <li className="text-white/40">/</li>
                        <li><Link href="/news-and-insights" className="hover:text-[#D4AF37] transition-colors">News &amp; Insights</Link></li>
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
                    <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                      Jason Engel Named to Forbes&apos; Inaugural List of America&apos;s Top CPAs in Valuations
                    </h1>
                    <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-4xl">
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
                    <div className="relative w-full h-[300px] lg:h-[400px] p-6">
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

        {/* Call to Action */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-blue-900 text-white p-8 rounded-lg text-center">
                <h2 className="text-3xl font-bold mb-4">Need Expert Valuation Services?</h2>
                <p className="text-blue-100 mb-6 text-lg">
                  Contact Engel & Engel LLP for professional business valuation, forensic accounting,
                  and expert witness testimony services. Over 30+ years of experience with hundreds of successful cases.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="inline-block bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors">
                    Get Free Consultation
                  </Link>
                  <Link href="/news-and-insights" className="inline-block border border-white text-white hover:bg-white hover:text-blue-900 px-6 py-3 rounded-lg font-semibold transition-colors">
                    Back to News &amp; Insights
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-blue-800">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Call:</span>
                      <span>(310) 277-2220</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Email:</span>
                      <span>info@engelandengel.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
