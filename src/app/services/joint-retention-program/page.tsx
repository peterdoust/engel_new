'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import TrackedPhoneLink from '@/components/ui/TrackedPhoneLink'

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    paragraphs: [
      'Business litigation often requires the retention of forensic accounting experts by both litigants in a dispute. Engel & Engel provides a specialized Joint Retention Program as an alternative to the typical litigation process as a way to resolve disputed financial issues and achieve settlement. Engel & Engel\'s Joint Retention Program is particularly beneficial in arbitration, mediation and litigation cases where the parties prefer a process that can help settle their differences in a cost-effective manner. Our Joint Retention Program is designed to equally address the financial concerns of both parties in a dispute, whereby the parties jointly retain Engel & Engel to conduct an objective and independent forensic accounting investigation.',
      'In addition, Engel & Engel can serve as a referee in accordance with California Code of Civil Procedure § 638 and § 639 and as a special master in accordance with California Code of Civil Procedure § 845. Engel & Engel can also serve as a special master in accordance with Federal Rules of Civil Procedure § 53.',
    ],
    items: [],
  },
  {
    id: 'benefits',
    title: 'Benefits',
    paragraphs: [
      'By employing Engel & Engel\'s Joint Retention Program, both parties can:',
    ],
    items: [
      'Save on forensic accounting costs.',
      'Save on litigation costs.',
      'Efficiently obtain accounting and business records.',
      'Expedite resolution of financial issues.',
      'Eliminate discovery disputes and related discovery costs.',
      'Receive an independent and objective analysis on which both parties can rely.',
      'Eliminate unnecessary and duplicative forensic accounting analysis.',
      'Minimize or eliminate financial disputes between the parties.',
    ],
  },
  {
    id: 'process',
    title: 'Our Process',
    paragraphs: [
      'Engel & Engel\'s Joint Retention Program is founded on the high standards of independence and impartiality coupled with over forty years of forensic experience. Engel & Engel\'s Joint Retention Program is a formal service offering with a uniquely designed process providing the parties with the following:',
    ],
    items: [
      'Assurance that Engel & Engel is independent, objective, and neutral throughout the process, including a formal conflicts check and disclosure statement.',
      'A jointly agreed upon scope of the assignment.',
      'Discovery of the relevant accounting and business records.',
      'An objective financial analysis that includes the concerns of both parties.',
      'An objective and impartial report of findings.',
      'A process for both parties to challenge Engel & Engel\'s findings.',
    ],
  },
  {
    id: 'practice-areas',
    title: 'Related Practice Areas',
    paragraphs: [
      'In connection with our Joint Retention Program, Engel & Engel has the expertise and experience in addressing complex business litigation issues including the following:',
    ],
    items: [
      'Economic Damages',
      'Fraud Investigation',
      'Business Valuation',
      'Bankruptcy & Insolvency',
      'Intellectual Property (IP) Litigation',
      'Real Estate Litigation',
      'Construction Litigation',
      'Alter Ego',
      'Fraudulent Transfers',
      'Employment Litigation',
      'Business Interruption',
      'Personal Injury',
      'Accounting Malpractice',
      'Partnership/Shareholder Disputes',
      'Trust/Probate Litigation',
      'Defamation',
    ],
  },
];

// ─────────────────────────────────────────────
// Mobile/Tablet Nav Component
// ─────────────────────────────────────────────

function MobileNav({ sidebarSections }: { sidebarSections: { id: string; title: string }[] }) {
  const [activeId, setActiveId] = useState(sidebarSections[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY + 150;
      let currentId = sidebarSections[0]?.id || '';

      for (const section of sidebarSections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollTop) {
          currentId = section.id;
        }
      }

      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sidebarSections]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="lg:hidden sticky top-[72px] z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <select
          value={activeId}
          onChange={handleChange}
          className="w-full p-3 bg-primary-950 text-white text-sm font-medium rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] appearance-none cursor-pointer"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23D4AF37' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
        >
          {sidebarSections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Sidebar Component
// ─────────────────────────────────────────────

function Sidebar({ sidebarSections }: { sidebarSections: { id: string; title: string }[] }) {
  const [activeId, setActiveId] = useState(sidebarSections[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY + 150;
      let currentId = sidebarSections[0]?.id || '';

      for (const section of sidebarSections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollTop) {
          currentId = section.id;
        }
      }

      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sidebarSections]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <aside className="hidden lg:block w-72 flex-shrink-0">
      <div className="sticky top-28 bg-primary-950 py-6 rounded-xl border-t-4 border-[#D4AF37]">
        <p className="text-[10px] tracking-[0.2em] uppercase text-white/80 font-bold mb-1 px-6">
          On This Page
        </p>
        <div className="h-[2px] ml-6 w-24 bg-gradient-to-r from-[#D4AF37] to-transparent mb-6" />
        <nav className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto sidebar-scrollbar">
          {sidebarSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className={`block text-sm py-2 px-6 rounded-r border-l-2 transition-colors ${
                activeId === section.id
                  ? 'text-[#D4AF37] hover:text-[#D4AF37] border-[#D4AF37] font-medium bg-[#D4AF37]/20'
                  : 'text-white border-transparent hover:text-[#D4AF37] hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]'
              }`}
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function JointRetentionProgramPage() {
  const { scrollY } = useScroll();
  const sidebarSections = sections.map((s) => ({ id: s.id, title: s.title }));

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen text-slate-900">

        {/* ══════════ CINEMATIC HERO ══════════ */}
        <section className="relative flex items-center overflow-hidden bg-[#293995] pt-[calc(var(--hdr)+1rem)] pb-10">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <motion.div
              style={{ y: y2, scale }}
              className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[150px] rounded-full"
            />
            <motion.div
              style={{ y: y1 }}
              className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#293995]/10 blur-[120px] rounded-full"
            />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          </div>

          <div className="container-custom relative z-10 w-full">
            <motion.div
              style={{ y: springY1, opacity }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white drop-shadow-2xl">
                  Joint Retention <br />
                  <span className="font-serif italic text-[#D4AF37] font-medium">Program</span>
                </h1>
                <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* sticky-scope: keeps the mobile section bar from sticking over the CTA and footer */}

        <div>

        {/* ══════════ MOBILE/TABLET STICKY NAV ══════════ */}
        <MobileNav sidebarSections={sidebarSections} />

        {/* ══════════ CONTENT BODY WITH SIDEBAR ══════════ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28 pt-16">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Sidebar */}
            <Sidebar sidebarSections={sidebarSections} />

            {/* Content */}
            <div className="flex-1 min-w-0">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-10 scroll-mt-[6rem]">
                  <h2 className="relative text-2xl font-semibold text-primary-950 mb-6 group inline-block">
                    {section.title}
                    <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#293995] to-transparent transition-all duration-500 group-hover:w-full" />
                  </h2>

                  <div className="space-y-5 text-[18px] leading-relaxed text-gray-600">
                    {section.paragraphs.map((paragraph: string, i: number) => (
                      <p key={i}>{paragraph}</p>
                    ))}

                    {section.items && section.items.length > 0 && (
                      <ul className={`gap-x-10 gap-y-2 ${
                        section.items.length > 5
                          ? 'grid grid-cols-1 sm:grid-cols-2'
                          : 'flex flex-col'
                      }`}>
                        {section.items.map((item: string, j: number) => (
                          <li key={j} className="flex items-start gap-3 text-base text-gray-800">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#293995] flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>

        </div>

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
                <span className="font-serif italic text-[#D4AF37]">Joint Retention Program</span>{' '}
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

                  <TrackedPhoneLink phone="310-277-2220" location="service_cta" className="group flex items-center gap-4">
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
