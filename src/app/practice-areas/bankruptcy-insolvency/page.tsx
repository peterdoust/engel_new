'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import TrackedPhoneLink from '@/components/ui/TrackedPhoneLink'

const practiceAreas = [
  { title: 'Economic Damages', href: '/practice-areas/economic-damages' },
  { title: 'Fraud Investigation', href: '/practice-areas/fraud-investigation' },
  { title: 'Business Valuation', href: '/practice-areas/business-valuation' },
  { title: 'Bankruptcy & Insolvency', href: '/practice-areas/bankruptcy-insolvency' },
  { title: 'IP Litigation', href: '/practice-areas/ip-litigation' },
  { title: 'Real Estate Litigation', href: '/practice-areas/real-estate-litigation' },
  { title: 'Construction Litigation', href: '/practice-areas/construction-litigation' },
  { title: 'Alter Ego', href: '/practice-areas/alter-ego' },
  { title: 'Fraudulent Transfers', href: '/practice-areas/fraudulent-transfers' },
  { title: 'Employment Litigation', href: '/practice-areas/employment-litigation' },
  { title: 'Business Interruption', href: '/practice-areas/business-interruption' },
  { title: 'Personal Injury', href: '/practice-areas/personal-injury' },
  { title: 'Accounting Malpractice', href: '/practice-areas/accounting-malpractice' },
  { title: 'Partnership & Shareholder Disputes', href: '/practice-areas/partnership-disputes' },
  { title: 'Trust/Probate Litigation', href: '/practice-areas/trust-probate-litigation' },
  { title: 'Defamation Litigation', href: '/practice-areas/defamation' },
];

export default function BankruptcyInsolvencyPage() {

  const pathname = usePathname();
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });

  const services = [
    'Bankruptcy Fraud Investigation',
    'Solvency Analysis',
    'Preference Analysis',
    'Liquidation Analysis',
    'Adequate Protection Analysis',
    'Reorganization Plans',
    'Fraudulent Transfers',
    'Fair Value and Fair Market Value Valuations',
    'Analysis of Undercapitalization',
    'Analysis of Reasonably Equivalent Value',
    'Investigation of Hidden Distributions',
    'Expert Witness Testimony',
  ];

  const publications = [
    'Fraudulent Transfers: The Element of Insolvency',
    'Fraudulent Transfers: The Element of Reasonably Equivalent Value',
    'Fraudulent Transfers: The Element of Reasonably Small Capital',
    'Fraudulent Transfers: The Element of Inability to Pay Debts as they Mature',
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen">

        {/* HERO */}
        <section className="relative flex items-end overflow-hidden bg-[#293995] pt-[calc(var(--hdr)+1rem)] pb-10">

          <div className="absolute inset-0 z-0 pointer-events-none">

            <motion.div
              style={{ y: y2, scale }}
              className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[150px] rounded-full"
            />

            <motion.div
              style={{ y: y1 }}
              className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#293995]/10 blur-[120px] rounded-full"
            />

            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />

            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

          </div>

          <div className="container-custom relative z-10 w-full">

            <motion.div style={{ y: springY1, opacity }} className="max-w-5xl">

              <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.3em] uppercase mb-3">
                Practice Area
              </p>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.9]">
                Bankruptcy &<br />
                <span className="font-serif italic text-[#D4AF37] font-medium">
                  Insolvency
                </span>
              </h1>

              <div className="h-[3px] w-24 bg-[#D4AF37] mt-5" />

            </motion.div>

          </div>

        </section>


        {/* CONTENT */}
        <div className="container-custom relative py-16 lg:py-24">

          <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">

            {/* SIDEBAR */}
            <aside className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0 sticky top-28">

              <nav className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">

                <div className="p-5 bg-primary-950">
                  <h3 className="text-sm font-bold text-white tracking-[0.2em] uppercase">
                    Practice Areas
                  </h3>
                </div>

                <div className="max-h-[70vh] overflow-y-auto py-2">

                  {practiceAreas.map((area) => {

                    const isActive = pathname === area.href;

                    return (
                      <Link
                        key={area.href}
                        href={area.href}
                        className={`block px-5 py-3 text-[0.85rem] font-medium border-l-[3px] ${
                          isActive
                            ? 'bg-primary-950/5 text-primary-950 border-l-[#D4AF37] font-semibold'
                            : 'text-gray-800 border-l-transparent hover:bg-slate-50 hover:border-l-primary-950/30'
                        }`}
                      >
                        {area.title}
                      </Link>
                    );
                  })}

                </div>

              </nav>

            </aside>


            {/* MAIN CONTENT */}
            <div className="flex-1 min-w-0">

              {/* OVERVIEW */}
              <section>

                <div className="relative">

                  <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/40 to-transparent rounded-full hidden lg:block" />

                  <p className="text-[18px] leading-relaxed">
                    Bankruptcy lawyers require sophisticated support when litigating
                    financial bankruptcy issues. Debtors, trustees, shareholders,
                    and creditors often need forensic accounting investigations
                    and turn to Engel & Engel to reconstruct a truthful picture
                    of relevant financial facts.
                  </p>

                </div>

              </section>


              {/* SERVICES */}
              <section className="py-10 my-10 border-t border-b border-slate-200">

                <h2 className="text-2xl md:text-3xl font-bold text-primary-950 mb-4">
                  How Engel & Engel Helps Bankruptcy Attorneys
                </h2>

                <div className="h-[3px] w-16 bg-primary-950 mb-4" />

                <p className="mb-10">
                  When the stakes are high, Engel & Engel can serve as your expert in connection with the following:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

                  {services.map((item, i) => (

                    <div
                      key={i}
                      className="group relative p-5 bg-white rounded-2xl border border-slate-200 hover:border-primary-950/30 hover:shadow-lg transition-all"
                    >

                      <div className="absolute top-1/2 -translate-y-1/2 left-5 w-2 h-2 rounded-full bg-[#D4AF37]" />

                      <span className="block pl-5 text-[0.95rem] font-medium leading-snug">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </section>


              {/* PUBLICATIONS */}
              <section>

                <h2 className="text-2xl md:text-3xl font-bold text-primary-950 mb-4">
                  Research Publications
                </h2>

                <div className="h-[3px] w-16 bg-primary-950 mb-6" />

                <div className="space-y-3">

                  {publications.map((item, i) => (

                    <div
                      key={i}
                      className="flex gap-5 p-5 rounded-xl bg-white border hover:shadow-md"
                    >

                      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-950/5 text-primary-950 flex items-center justify-center text-sm font-bold">
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <span className="font-medium text-gray-800 leading-snug">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </section>

            </div>
          </div>
        </div>


        {/* CONTACT CTA */}
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
                <span className="font-serif italic text-[#D4AF37]">Bankruptcy &amp; Insolvency</span>{' '}
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

                  <TrackedPhoneLink phone="310-277-2220" location="practice_area_cta" className="group flex items-center gap-4">
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
  );
}