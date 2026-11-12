'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
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
                Privacy <span className="font-serif italic text-[#D4AF37] font-medium">Policy</span>
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
                Engel &amp; Engel, LLP (&ldquo;Engel &amp; Engel,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard information about visitors to our website at engelandengel.com (the &ldquo;Site&rdquo;) and individuals who interact with our firm.
              </p>

              <h2>1. Information We Collect</h2>
              <p>We may collect the following categories of information:</p>
              <ul>
                <li><strong>Information you provide directly</strong> — name, email address, phone number, company, message contents, and any other information you submit through contact forms, consultation requests, or career applications.</li>
                <li><strong>Automatically collected information</strong> — IP address, browser type, device identifiers, pages visited, time spent, referring URL, and similar usage data collected via cookies and similar technologies.</li>
                <li><strong>Engagement information</strong> — information you provide in connection with professional services, subject to applicable confidentiality and professional standards.</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to inquiries and consultation requests;</li>
                <li>Provide and improve our professional services;</li>
                <li>Send communications you have requested or that relate to engagements;</li>
                <li>Operate, maintain, secure, and improve the Site;</li>
                <li>Comply with legal obligations and professional standards;</li>
                <li>Conduct marketing and advertising activities, including remarketing through Google Ads and similar platforms.</li>
              </ul>

              <h2>3. Cookies, Analytics, and Advertising</h2>
              <p>
                We use cookies and similar technologies to operate the Site and to understand how visitors interact with it. We use Google Analytics to measure Site usage and may use Google Ads (including remarketing) and similar advertising services to deliver relevant advertising to past visitors on third-party sites.
              </p>
              <p>
                You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-Out Browser Add-on</a> and out of personalized Google advertising via your <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>. See our <Link href="/cookies">Cookie Policy</Link> for details.
              </p>

              <h2>4. How We Share Information</h2>
              <p>We do not sell your personal information. We may share information with:</p>
              <ul>
                <li>Service providers that support our operations (e.g., hosting, analytics, email delivery), under contractual obligations to protect the information;</li>
                <li>Professional advisors (legal, accounting, insurance) where required;</li>
                <li>Authorities, courts, or other parties when required by law, subpoena, or to protect our rights;</li>
                <li>A successor entity in connection with a merger, acquisition, or similar transaction.</li>
              </ul>

              <h2>5. Your California Privacy Rights (CCPA/CPRA)</h2>
              <p>
                If you are a California resident, you have the right to (i) know what personal information we collect, use, disclose, and sell or share; (ii) request deletion of personal information; (iii) request correction of inaccurate personal information; (iv) opt out of the sale or sharing of personal information; and (v) be free from discrimination for exercising these rights. To exercise these rights, contact us using the details below.
              </p>

              <h2>6. Data Retention &amp; Security</h2>
              <p>
                We retain personal information for as long as needed to fulfill the purposes described in this Policy, comply with legal obligations, resolve disputes, and enforce our agreements. We use reasonable administrative, technical, and physical safeguards to protect personal information. No method of transmission over the Internet is 100% secure.
              </p>

              <h2>7. Children</h2>
              <p>
                The Site is not directed to children under 16. We do not knowingly collect personal information from children under 16.
              </p>

              <h2>8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top reflects the most recent revision.
              </p>

              <h2>9. Contact Us</h2>
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
