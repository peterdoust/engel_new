'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const practiceAreas = [
  {
    title: 'Economic Damages',
    description: 'Over 1,000 economic damage analyses for both plaintiffs and defendants across a wide variety of industries with MAFF credentials and over 10 research publications.',
    href: '/practice-areas/economic-damages',
    icon: 'M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Fraud Investigation',
    description: 'Hundreds of fraud investigations conducted by Certified Fraud Examiners, applying cutting-edge techniques to separate fact from fiction and reconstruct truthful financial pictures.',
    href: '/practice-areas/fraud-investigation',
    icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
  },
  {
    title: 'Business Valuation',
    description: 'Over 100 business valuations with CVA and ABV credentials across a wide variety of industries, consistent with established principles and able to withstand court scrutiny.',
    href: '/practice-areas/business-valuation',
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
  },
  {
    title: 'Bankruptcy & Insolvency',
    description: 'Sophisticated forensic accounting support for debtors, trustees, shareholders, and creditors to reconstruct a truthful picture of relevant financial facts in bankruptcy proceedings.',
    href: '/practice-areas/bankruptcy-insolvency',
    icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z',
  },
  {
    title: 'IP Litigation',
    description: 'Comprehensive intellectual property damages analysis including lost profits, market share analysis, and reasonable royalty calculations, highlighted by research publications on the subject.',
    href: '/practice-areas/ip-litigation',
    icon: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
  },
  {
    title: 'Real Estate Litigation',
    description: 'Significant experience investigating and analyzing complex real estate accounting issues, highlighted by an arbitration award in excess of $100 million in connection with a buy/sell dispute of a commercial shopping center.',
    href: '/practice-areas/real-estate-litigation',
    icon: 'M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819',
  },
  {
    title: 'Construction Litigation',
    description: 'Extensive experience in forensic investigations and expert testimony for disputes involving builders, contractors, developers, subcontractors, and owners.',
    href: '/practice-areas/construction-litigation',
    icon: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21',
  },
  {
    title: 'Alter Ego',
    description: 'Extensive experience conducting forensic investigations and financial analyses on the court\'s 28 alter ego factors for both plaintiffs and defendants, with two research publications.',
    href: '/practice-areas/alter-ego',
    icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
  },
  {
    title: 'Fraudulent Transfers',
    description: 'Deep expertise in business and bankruptcy litigation with CIRA, ABV, MAFF, and CFE credentials, plus four research publications on fraudulent transfers.',
    href: '/practice-areas/fraudulent-transfers',
    icon: 'M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5',
  },
  {
    title: 'Employment Litigation',
    description: 'Extensive expertise in analyzing and calculating economic damages in employment matters, highlighted by our research publication on the framework for employment damages.',
    href: '/practice-areas/employment-litigation',
    icon: 'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z',
  },
  {
    title: 'Business Interruption',
    description: 'Extensive experience evaluating business interruption claims for both plaintiffs and defendants across a wide variety of industries for litigators and insurance companies.',
    href: '/practice-areas/business-interruption',
    icon: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
  },
  {
    title: 'Personal Injury',
    description: 'Over 1,000 economic damage calculations and testimony in over 100 cases with MAFF credentials and over 10 research publications in personal injury and wrongful death matters.',
    href: '/practice-areas/personal-injury',
    icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
  },
  {
    title: 'Accounting Malpractice',
    description: 'Expert investigation of whether financial statements have been prepared in accordance with GAAP and GAAS, qualified to serve for both plaintiffs and defendants.',
    href: '/practice-areas/accounting-malpractice',
    icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
  },
  {
    title: 'Partnership & Shareholder Disputes',
    description: 'Involved in over 100 cases regarding corporate and partnership disputes including dissolutions under California Corporations Code Section 2000.',
    href: '/practice-areas/partnership-disputes',
    icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
  },
  {
    title: 'Trust/Probate Litigation',
    description: 'Working closely with attorneys to untangle complex financial records, trace assets, and provide the forensic accounting analysis necessary to resolve trust and estate disputes.',
    href: '/practice-areas/trust-probate-litigation',
    icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
  },
  {
    title: 'Defamation Litigation',
    description: 'Forensic accounting expertise in defamation litigation for both plaintiffs and defendants, examining whether reputational harm has translated into measurable losses with analyses that withstand scrutiny in court.',
    href: '/practice-areas/defamation',
    icon: 'M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function PracticeAreasPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

        {/* ══════════ CINEMATIC HERO ══════════ */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#1D2653]">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#293995]/10 blur-[120px] rounded-full" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          </div>

          <div className="container-custom relative z-10 w-full">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white drop-shadow-2xl">
                  Practice <br />
                  <span className="font-serif italic text-[#D4AF37] font-medium">Areas</span>
                </h1>
                <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════ PRACTICE AREAS — GRADIENT CARDS ══════════ */}
        <section className="py-24 md:py-32 bg-slate-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {practiceAreas.map((area, idx) => (
                <motion.div
                  key={`gradient-${area.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                >
                  <Link
                    href={area.href}
                    className="group relative block sm:h-[180px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 border border-[#1d2653] hover:from-primary-950 hover:to-[#1d2653] hover:border-primary-950 hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
                  >
                    {/* Watermark icon */}
                    <div className="hidden sm:block absolute -bottom-4 -right-4 opacity-[0.05] group-hover:opacity-[0.25] transition-opacity duration-500">
                      <svg className="w-32 h-32 text-primary-950 group-hover:text-[#D4AF37] transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d={area.icon} />
                      </svg>
                    </div>

                    {/* Gold top accent */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    <div className="relative z-10 p-4 sm:p-6 h-full flex flex-row items-center gap-4 sm:flex-col sm:items-stretch sm:gap-0">
                      <div className="w-11 h-11 rounded-xl bg-primary-950 group-hover:bg-[#D4AF37] flex shrink-0 items-center justify-center sm:mb-auto transition-all duration-500">
                        <svg className="w-5 h-5 text-[#D4AF37] group-hover:text-[#1d2653] transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={area.icon} />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-bold text-primary-950 group-hover:text-[#D4AF37] leading-snug transition-colors duration-300 sm:mb-2">
                          {area.title}
                        </h3>
                        <div className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                          <span className="text-[11px] text-[#D4AF37] font-semibold tracking-wide uppercase">Explore</span>
                          <svg className="w-3 h-3 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                          </svg>
                        </div>
                      </div>
                      <svg className="sm:hidden w-5 h-5 shrink-0 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
