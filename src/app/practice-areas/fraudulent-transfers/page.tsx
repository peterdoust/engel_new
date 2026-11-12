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

export default function FraudulentTransfersPage() {
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });

  const services = [
    'Analysis of Reasonable Equivalent Value',
    'Solvency Analysis',
    'Analysis of Ability to Pay Debts as they Become Due',
    'Analysis of Undercapitalization',
    'Tracing of Fraudulent Transactions',
    'Business Fair Market Valuation',
    'Business Fair Valuation',
    'Valuation of Intangible Assets',
    'Liquidation Analysis',
    'Financial Fraud Investigations',
    'Expert Witness Testimony',
  ];

  const publications = [
    'The Element of Reasonably Equivalent Value',
    'The Element of Insolvency',
    'The Element of Reasonably Small Capital',
    'The Element of Inability to Pay Debts as they Mature',
  ];

  return (
    <>
      <Header />
      <main className=" min-h-screen">

        {/* ══════════ HERO ══════════ */}
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
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          </div>

          <div className="container-custom relative z-10 w-full">
            <motion.div
              style={{ y: springY1, opacity }}
              className="max-w-5xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.3em] uppercase mb-3">Practice Area</p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.9]">
                  Fraudulent<br />
                  <span className="font-serif italic text-[#D4AF37] font-medium">Transfers</span>
                </h1>
                <div className="h-[3px] w-24 bg-[#D4AF37] mt-5" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════ CONTENT WITH SIDEBAR ══════════ */}
        <div className="container-custom relative py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">

            {/* ── Sticky Sidebar ── */}
            <aside className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0 z-20 sticky top-28">
              <div className="">
                <nav className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                  <div className="p-5 bg-primary-950">
                    <h3 className="text-sm font-bold text-white tracking-[0.2em] uppercase">Practice Areas</h3>
                  </div>
                  <div className="max-h-[70vh] overflow-y-auto py-2 custom-scrollbar">
                    {practiceAreas.map((area) => {
                      const isActive = pathname === area.href;
                      return (
                        <Link
                          key={area.href}
                          href={area.href}
                          className={`block px-5 py-3 text-[0.85rem] font-medium transition-all duration-200 border-l-[3px] ${
                            isActive
                              ? 'bg-primary-950/5 text-primary-950 border-l-[#D4AF37] font-semibold'
                              : 'text-gray-800 border-l-transparent hover:bg-slate-50 hover:text-primary-950 hover:border-l-primary-950/30'
                          }`}
                        >
                          {area.title}
                        </Link>
                      );
                    })}
                  </div>
                </nav>
              </div>
            </aside>

            {/* ── Main Content ── */}
            <div className="flex-1 min-w-0">

              {/* ══════════ OVERVIEW ══════════ */}
              <section className="">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="relative">
                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/40 to-transparent rounded-full hidden lg:block" />
                    <p className="text-[18px] leading-relaxed">
                      Business and bankruptcy litigators often require forensic accounting expertise in connection with fraudulent transfer claims. Engel &amp; Engel has extensive experience, both in business litigation and bankruptcy litigation, in investigating fraudulent transfers and providing expert witness testimony for both plaintiffs and defendants. Engel &amp; Engel&apos;s fraudulent transfer expertise is highlighted with a credentialed Certified Insolvency and Restructuring Advisor (CIRA), as well as an Accreditation in Business Valuation (ABV), a Master Analyst in Financial Forensics (MAFF), and Certified Fraud Examiners (CFE). Engel &amp; Engel&apos;s expertise is further highlighted with four research publications on the subject of fraudulent transfers. Overall, Engel &amp; Engel has the qualifications and experience to conduct a fraudulent transfer analysis that is consistent with established legal principles and able to withstand the scrutiny of the court.
                    </p>
                  </div>
                </motion.div>
              </section>

              {/* ══════════ SERVICES ══════════ */}
              <section className="py-10 my-10 border-t border-b border-slate-200">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-primary-950 leading-tight mb-4">
                    How Engel &amp; Engel Helps Business and Bankruptcy Litigation Attorneys
                  </h2>
                  <div className="h-[3px] w-16 bg-primary-950 mb-4" />
                  <p className="mb-10">
                    When the stakes are high, Engel &amp; Engel can serve as your expert in connection with the following:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {services.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.03 }}
                        className="group relative p-5 bg-white rounded-2xl border border-slate-200 hover:border-primary-950/30 hover:shadow-lg transition-all duration-300 flex justify-center flex-col"
                      >
                        <div className="absolute top-1/2 -translate-y-1/2 left-5 w-2 h-2 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                        <span className="block pl-5 text-[0.95rem] font-medium leading-snug group-hover:text-primary-950 transition-colors">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </section>

              {/* ══════════ PUBLICATIONS ══════════ */}
              <section className="border-slate-200">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-primary-950 tracking-tight mb-4">
                    Research Publications
                  </h2>
                  <div className="h-[3px] w-16 bg-primary-950 mb-6" />
                  <p className="mb-10">
                    Engel &amp; Engel has published various research publications in connection with fraudulent transfers:
                  </p>
                  <div className="space-y-3">
                    {publications.map((item, i) => (
                      <motion.a
                        href="/publications/fraudulent-transfers"
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.04 }}
                        className="group flex gap-5 p-5 rounded-xl bg-white border border-transparent hover:border-primary-950/20 hover:shadow-md transition-all duration-300 items-center"
                      >
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-950/5 text-primary-950 flex items-center justify-center text-sm font-bold group-hover:bg-primary-950 group-hover:text-white transition-all duration-300">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-medium text-gray-800 leading-snug group-hover:text-primary-950 transition-colors">
                          {item}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </section>
            </div>
          </div>
        </div>

        {/* ══════════ MOBILE PRACTICE AREAS ══════════ */}
        <section className="lg:hidden py-12 bg-white border-t border-slate-200">
          <div className="container-custom">
            <h3 className="text-lg font-bold text-primary-950 mb-6 tracking-tight">Other Practice Areas</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {practiceAreas.filter((area) => area.href !== pathname).map((area) => (
                <Link
                  key={area.href}
                  href={area.href}
                  className="block p-4 bg-slate-50 rounded-xl text-[0.8rem] font-medium text-slate-600 hover:bg-primary-950/5 hover:text-primary-950 transition-all duration-200 border border-slate-100 hover:border-primary-950/20"
                >
                  {area.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ CONTACT CTA ══════════ */}
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
                <span className="font-serif italic text-[#D4AF37]">Fraudulent Transfers</span>{' '}
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
