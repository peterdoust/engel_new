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
      'High stakes litigation demands persuasive, effective, and well-credentialed forensic expert testimony. Engel & Engel has provided expert testimony in over 100 cases for both plaintiffs and defendants in state, federal, and bankruptcy courts. Engel & Engel\'s expert qualifications includes 1,000+ forensic accounting cases, six professional certifications, 20 authored research publications, and Big Four forensic accounting experience.',
      'Engel & Engel\'s courtroom experience is highlighted in numerous judge and jury awards including a $2.3 billion jury award in connection with misappropriation of trade secrets.',
    ],
    items: [],
  },
  {
    id: 'courtroom',
    title: 'Credibility in the Courtroom',
    paragraphs: [
      'Before we enter the courtroom, we are armed with evidence obtained in the course of a rigorous forensic investigation. To uncover all the relevant information, we utilize specialized investigatory techniques to probe and analyze data buried in a proliferation of records. Thus, we find the financial evidence needed to build a convincing case. We work alongside trial counsel to ensure important issues are properly addressed before they become obstacles.',
      'On the witness stand, we present our findings and opinions clearly and concisely. We utilize charts and graphs to break down complex concepts and ensure that the points we emphasize are understood. Our trial exhibits provide a visual summary of the facts and enable us to explain even the most complex concepts with clarity. By combining a visual summary with our concise and articulate testimony, we are able to reinforce our findings and opinions and ensure that the court comprehends the points we emphasize.',
      'Our professional demeanor, exemplary credentials, and integrity, provide us with the conviction needed to withstand the most grueling cross-examinations.',
    ],
    items: [],
  },
  {
    id: 'publications',
    title: 'Research Publications',
    paragraphs: [
      'Engel & Engel has published the following research publications in connection with expert witness testimony:',
    ],
    items: [
      'Admissibility of Expert Witness Testimony',
      'The Business Records Exception to the Hearsay Rule: The Admissibility of Financial Records as Evidence in Federal and State Court',
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

export default function ExpertWitnessTestimonyPage() {
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
                  Expert Witness <br />
                  <span className="font-serif italic text-[#D4AF37] font-medium">Testimony</span>
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
                <span className="font-serif italic text-[#D4AF37]">Expert Witness Testimony</span>{' '}
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
