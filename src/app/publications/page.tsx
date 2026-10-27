'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RequestPublicationModal from '@/components/modals/RequestPublicationModal';
import TrackedPhoneLink from '@/components/ui/TrackedPhoneLink'

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const publicationCategories = [
  {
    title: 'Economic Damages',
    description: 'Comprehensive framework for calculating lost profits and economic damages across commercial litigation.',
    publications: [
      'Framework for the Calculation of Lost Profits: Part I',
      'Framework for the Calculation of Lost Profits: Part II: "The Element of Certainty"',
      'Framework for the Calculation of Lost Profits: Part III: "Prospective Lost Profits"',
      'Framework for the Calculation of Lost Profits: Part IV: "Unestablished Businesses"',
      'Framework for the Calculation of Lost Profits: Part V: "Mitigation of Damages"',
      'Discounting Future Lost Profits'
    ],
    slug: 'economic-damages'
  },
  {
    title: 'Infringement Damages',
    description: 'Advanced methodologies for trademark and patent infringement damage analysis.',
    publications: [
      'Framework for the Calculation of Infringement Damages: Part I: "Trademark Infringement Damages Under the Lanham Act"',
      'Framework for the Calculation of Infringement Damages: Part II "Patent Infringement Damages"'
    ],
    slug: 'infringement-damages'
  },
  {
    title: 'Fraudulent Transfers',
    description: 'Detailed analysis of insolvency, equivalent value, and capital requirements in transfer cases.',
    publications: [
      'Fraudulent Transfers: "The Element of Insolvency"',
      'Fraudulent Transfers: "The Element of Reasonably Equivalent Value"',
      'Fraudulent Transfers: "The Element of Unreasonably Small Capital"',
      'Fraudulent Transfers: "The Element of Inability to Pay Debts as They Mature"'
    ],
    slug: 'fraudulent-transfers'
  },
  {
    title: 'Alter Ego',
    description: 'Investigation factors and undercapitalization analysis for corporate veil litigation.',
    publications: [
      'Investigation & Discovery of Alter Ego Factors',
      'Alter Ego: "The Element of Undercapitalization"'
    ],
    slug: 'alter-ego'
  },
  {
    title: 'Employment Damages',
    description: 'Economic damage frameworks for wrongful termination and employment-related disputes.',
    publications: [
      'Framework for the Calculation of Employment Damages'
    ],
    slug: 'employment-damages'
  },
  {
    title: 'Business Valuation',
    description: 'Expertise in valuation methodologies under California Corporate Code § 2000.',
    publications: [
      'Business Valuation Under California Corporate Code Section 2000'
    ],
    slug: 'business-valuation'
  },
  {
    title: 'Expert Witness Testimony',
    description: 'Technical guidance on the admissibility and reliability of financial expert evidence.',
    publications: [
      'Admissibility of Expert Testimony: "The Element of Reliability"',
      'The Business Records Exception to the Hearsay Rule: "The Admissibility of Financial Records as Evidence in Federal and State Court"'
    ],
    slug: 'expert-testimony'
  },
  {
    title: 'Legal Resources',
    description: 'Practical tools and outlines for legal professionals during discovery and depositions.',
    publications: [
      'Deposition Outline for Officers & Executives',
      'Document Request for Accounting & Business Records'
    ],
    slug: 'document-request'
  }
];

const stats = [
  { value: '20+', label: 'Research Publications' },
  { value: '30+', label: 'Years of Research' },
  { value: '100+', label: 'Court Applications' },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function PublicationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPub, setSelectedPub] = useState({ title: '', image: '' });
  const { scrollY } = useScroll();

  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });

  const handleRequestClick = (title: string, image?: string) => {
    setSelectedPub({ title, image: image || '/images/future-lost-profits.png' });
    setIsModalOpen(true);
  };

  return (
    <>
      <Header />
      <main className="bg-slate-50 min-h-screen overflow-hidden">

        {/* ══════════ CINEMATIC HERO ══════════ */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#1D2653]">
          {/* Parallax Background Decorations */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Glowing orbs */}
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
                <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white drop-shadow-2xl">
                  Research & <br />
                  {/* Own letter-spacing: otherwise it inherits the big line's (in px) and the letters overlap */}
                  <span className="font-serif italic text-[#D4AF37] font-medium text-[0.75em] tracking-[-0.02em]">Publications</span>
                </h1>
                <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════ PUBLICATION CATEGORIES ══════════ */}
        <section className="py-32 relative bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {publicationCategories.map((category, idx) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative bg-white border border-slate-100 p-10 lg:p-14 rounded-[2.5rem] shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:border-[#D4AF37]/30 transition-all duration-700 overflow-hidden"
                >
                  {/* Decorative background number */}
                  <div className="absolute top-10 right-10 text-8xl font-bold text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 select-none">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-[1px] bg-[#D4AF37]" />
                      <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#D4AF37]">{category.publications.length} Papers</span>
                    </div>

                    <h3 className="text-3xl font-bold text-[#1D2653] mb-4 tracking-tight group-hover:text-[#D4AF37] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-lg text-slate-500 font-light leading-relaxed mb-10 max-w-lg">
                      {category.description}
                    </p>

                    <div className="space-y-4 mb-12">
                      {category.publications.map((pub, pidx) => (
                        <div key={pidx} className="flex items-start gap-4">
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                          <span className="text-slate-800 font-medium leading-tight">{pub}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-50">
                      <Link
                        href={`/publications/${category.slug}`}
                        className="px-8 py-3 bg-[#1D2653] text-white rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#1D2653] transition-all text-center"
                      >
                        View Series
                      </Link>
                      <button
                        onClick={() => handleRequestClick(category.title)}
                        className="px-8 py-3 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold tracking-widest uppercase hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all text-center"
                      >
                        Request Publication
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ FEATURED HIGHLIGHT ══════════ */}
        <section className="py-32 relative overflow-hidden bg-white">
          <div className="container-custom">
            <div className="relative bg-slate-900 rounded-[3rem] p-12 lg:p-24 overflow-hidden text-white flex flex-col lg:flex-row items-center gap-16">
              {/* Visual element */}
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />

              <div className="lg:w-2/3 relative z-10">
                <span className="text-xs font-bold tracking-[0.4em] uppercase text-[#D4AF37] mb-8 block">Foundational Work</span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white">
                  The Framework for <br />
                  <span className="font-serif italic text-[#D4AF37] font-medium text-[2.5rem] tracking-normal">Lost Profits</span>
                </h2>
                <p className="text-slate-400 text-xl font-light leading-relaxed mb-12 max-w-2xl">
                  Our five-part research series on the calculation of lost profits has been widely utilized by legal professionals to understand the elements of certainty, prospective profits, and mitigation.
                </p>
                <Link href="/publications/economic-damages" className="inline-flex items-center gap-4 px-10 py-5 bg-[#D4AF37] text-black font-bold rounded-2xl hover:bg-[#B8962E] transition-all group">
                  Explore The Series
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

              <div className="lg:w-1/3 flex justify-center">
                <div className="relative w-64 h-80 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center p-8 text-center rotate-3 group-hover:rotate-0 transition-transform duration-700">
                  <div className="absolute inset-x-8 top-8 h-px bg-[#D4AF37]/30" />
                  <div className="p-4 border-2 border-[#D4AF37]/20 rounded-lg">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">Expert Series</p>
                    <p className="text-xl font-serif italic text-white leading-tight">Forensic Accounting Perspective</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ CTA ══════════ */}
        <section className="py-32 bg-slate-50">
          <div className="container-custom text-center">
            <h4 className="text-xs font-bold tracking-[0.4em] uppercase text-slate-400 mb-8">Need Assistance?</h4>
            <p className="text-3xl md:text-5xl font-bold text-[#1D2653] mb-12 tracking-tight">
              Access our authoritative <br /> research for your next case.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => handleRequestClick('General Research Inquiry')}
                className="px-10 py-5 bg-[#1D2653] text-white font-bold text-lg rounded-2xl hover:bg-[#D4AF37] hover:text-[#1D2653] transition-all shadow-lg"
              >
                Request Publication
              </button>
              <TrackedPhoneLink phone="+13102772220" location="publications_cta" className="px-10 py-5 bg-white shadow-lg text-[#1D2653] font-bold text-lg rounded-2xl hover:bg-[#1D2653] hover:text-white transition-all border border-slate-100">
                Call (310) 277-2220
              </TrackedPhoneLink>
            </div>
          </div>
        </section>

        <Footer />

        <RequestPublicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          publicationTitle={selectedPub.title}
          publicationImage={selectedPub.image}
        />
      </main>

      <style jsx global>{`
        @keyframes ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-ken-burns {
          animation: ken-burns 20s infinite alternate linear;
        }
      `}</style>
    </>
  );
}

