'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function CookiePolicyPage() {
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
                Cookie <span className="font-serif italic text-[#D4AF37] font-medium">Policy</span>
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
              <p>
                This Cookie Policy explains how Engel &amp; Engel, LLP (&ldquo;Engel &amp; Engel,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) uses cookies and similar technologies on engelandengel.com (the &ldquo;Site&rdquo;). It should be read together with our <Link href="/privacy">Privacy Policy</Link>.
              </p>

              <h2>1. What Are Cookies?</h2>
              <p>
                Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, improve performance, and provide information to site owners.
              </p>

              <h2>2. Types of Cookies We Use</h2>
              <ul>
                <li><strong>Strictly necessary cookies</strong> — required for the Site to function (e.g., security, navigation). These cannot be turned off.</li>
                <li><strong>Performance &amp; analytics cookies</strong> — collect aggregated information about how visitors use the Site (e.g., Google Analytics). This helps us improve the Site.</li>
                <li><strong>Functional cookies</strong> — remember your preferences (e.g., region or language).</li>
                <li><strong>Advertising &amp; targeting cookies</strong> — used by Google Ads (including remarketing) and similar networks to deliver relevant advertising on third-party sites and to measure the performance of advertising campaigns.</li>
              </ul>

              <h2>3. Third-Party Services</h2>
              <p>
                We use the following third-party services that may set cookies on your device:
              </p>
              <ul>
                <li><strong>Google Analytics</strong> — usage measurement. Learn more in <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.</li>
                <li><strong>Google Ads / Remarketing</strong> — display targeted ads to past visitors. Learn more about <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google&apos;s advertising technologies</a>.</li>
              </ul>

              <h2>4. How to Manage Cookies</h2>
              <p>
                Most browsers let you refuse or delete cookies through your browser settings. You can also opt out of personalized advertising:
              </p>
              <ul>
                <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-Out Browser Add-on</a></li>
                <li><a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a></li>
                <li><a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance opt-out</a></li>
                <li><a href="https://www.youronlinechoices.eu" target="_blank" rel="noopener noreferrer">Your Online Choices (EU)</a></li>
              </ul>
              <p>
                Note: blocking cookies may impact the functionality of the Site.
              </p>

              <h2>5. Changes to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. The &ldquo;Last updated&rdquo; date at the top reflects the most recent revision.
              </p>

              <h2>6. Contact</h2>
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
