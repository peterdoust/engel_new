'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#293995] pt-[calc(var(--hdr)+1rem)] pb-10">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#D4AF37]/10 blur-[150px] rounded-full" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          </div>
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto">
              <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.3em] uppercase mb-3">Legal</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.9]">
                Terms of <span className="font-serif italic text-[#D4AF37] font-medium">Service</span>
              </h1>
              <p className="text-white/60 text-lg mt-6">Last updated: April 18, 2026</p>
              <div className="h-[3px] w-24 bg-[#D4AF37] mt-5" />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto prose prose-lg prose-headings:text-primary-950 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-gold-700">
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the website operated by Engel &amp; Engel, LLP (&ldquo;Engel &amp; Engel,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) at engelandengel.com (the &ldquo;Site&rdquo;). By accessing or using the Site, you agree to be bound by these Terms.
              </p>

              <h2>1. Use of the Site</h2>
              <p>
                The Site is provided for general informational purposes only. You agree to use the Site only for lawful purposes and in accordance with these Terms. You may not use the Site in any manner that could damage, disable, overburden, or impair the Site or interfere with any other party&apos;s use of the Site.
              </p>

              <h2>2. No Professional Relationship</h2>
              <p>
                The information provided on the Site does not constitute professional accounting, financial, tax, or legal advice and is not a substitute for advice from a qualified professional. Use of, or access to, the Site does not create a client–accountant or attorney–client relationship between you and Engel &amp; Engel. A professional engagement is established only through a signed engagement letter.
              </p>

              <h2>3. Intellectual Property</h2>
              <p>
                All content on the Site — including text, graphics, logos, images, and software — is the property of Engel &amp; Engel or its licensors and is protected by United States and international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.
              </p>

              <h2>4. Submissions &amp; Communications</h2>
              <p>
                Any inquiry, message, or information you transmit to us through the Site is not protected by any privilege or confidentiality obligation until a formal engagement is established. Do not send confidential or sensitive information through the Site&apos;s contact forms.
              </p>

              <h2>5. Third-Party Links</h2>
              <p>
                The Site may contain links to third-party websites. We do not control and are not responsible for the content, privacy practices, or accuracy of any third-party site.
              </p>

              <h2>6. Disclaimer of Warranties</h2>
              <p>
                THE SITE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR HARMFUL COMPONENTS.
              </p>

              <h2>7. Limitation of Liability</h2>
              <p>
                TO THE FULLEST EXTENT PERMITTED BY LAW, ENGEL &amp; ENGEL AND ITS PARTNERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF, OR INABILITY TO USE, THE SITE.
              </p>

              <h2>8. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Engel &amp; Engel from any claim, demand, loss, or damages, including reasonable attorneys&apos; fees, arising out of your breach of these Terms or your misuse of the Site.
              </p>

              <h2>9. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of California, without regard to its conflict-of-laws principles. Any dispute arising under these Terms shall be brought exclusively in the state or federal courts located in Los Angeles County, California.
              </p>

              <h2>10. Changes to These Terms</h2>
              <p>
                We may modify these Terms at any time. The &ldquo;Last updated&rdquo; date at the top reflects the most recent revision. Continued use of the Site after changes are posted constitutes acceptance of the revised Terms.
              </p>

              <h2>11. Contact</h2>
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
