'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative bg-primary-950 pt-40 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#D4AF37]/10 blur-[150px] rounded-full" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          </div>
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto">
              <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.3em] uppercase mb-6">Legal</p>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[0.9]">
                <span className="font-serif italic text-[#D4AF37] font-medium">Disclaimer</span>
              </h1>
              <p className="text-white/60 text-lg mt-6">Last updated: April 18, 2026</p>
              <div className="h-[3px] w-24 bg-[#D4AF37] mt-8" />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto prose prose-lg prose-headings:text-primary-950 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-gold-700">
              <h2>General Information Only</h2>
              <p>
                The information provided on engelandengel.com (the &ldquo;Site&rdquo;) by Engel &amp; Engel, LLP (&ldquo;Engel &amp; Engel&rdquo;) is for general informational purposes only. All information on the Site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
              </p>

              <h2>No Professional Advice</h2>
              <p>
                The Site does not constitute, and should not be relied upon as, professional accounting, tax, financial, valuation, forensic, investment, or legal advice. Information published on the Site is general in nature and may not apply to your specific situation. You should consult a qualified professional for advice tailored to your circumstances.
              </p>

              <h2>No Engagement Created</h2>
              <p>
                Reviewing the Site, contacting us, or transmitting information through the Site does not create a professional relationship between you and Engel &amp; Engel. A professional engagement is established only through a signed engagement letter. Any information you transmit prior to executing an engagement letter is not protected by any privilege or confidentiality obligation.
              </p>

              <h2>Case Results &amp; Statements</h2>
              <p>
                Any references to past matters, cases, or results on the Site are illustrative only. Prior outcomes do not guarantee a similar result in any future matter. Each engagement turns on its own facts.
              </p>

              <h2>External Links</h2>
              <p>
                The Site may contain links to external websites that are not provided or maintained by Engel &amp; Engel. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external sites.
              </p>

              <h2>Errors &amp; Omissions</h2>
              <p>
                While we strive to keep information current, errors and omissions may occur. We assume no responsibility for any errors or omissions in the contents of the Site.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                In no event will Engel &amp; Engel, its partners, employees, agents, or affiliates be liable for any loss or damage arising from the use of, or reliance on, information provided on the Site.
              </p>

              <h2>Contact</h2>
              <p>
                Engel &amp; Engel, LLP<br />
                350 S Grand Avenue, Suite 3160<br />
                Los Angeles, CA 90071<br />
                Phone: (310) 277-2220<br />
                Email: info@engelandengel.com
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
