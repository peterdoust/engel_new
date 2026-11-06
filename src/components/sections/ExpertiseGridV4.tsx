"use client";

import React from "react";
import Link from 'next/link'
import { motion } from 'framer-motion'

const expertiseAreas = [
    { title: 'Economic Damages', href: '/practice-areas/economic-damages', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
    { title: 'Fraud Investigation', href: '/practice-areas/fraud-investigation', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { title: 'Business Valuation', href: '/practice-areas/business-valuation', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { title: 'Bankruptcy', href: '/practice-areas/bankruptcy-insolvency', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { title: 'IP Litigation', href: '/practice-areas/ip-litigation', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { title: 'Real Estate', href: '/practice-areas/real-estate-litigation', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { title: 'Construction', href: '/practice-areas/construction-litigation', icon: 'M2 21h20M6 21V9l6-4 6 4v12M10 21v-4h4v4M9 9h1M14 9h1M9 13h1M14 13h1' },
    { title: 'Alter Ego', href: '/practice-areas/alter-ego', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { title: 'Fraudulent Transfers', href: '/practice-areas/fraudulent-transfers', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { title: 'Employment', href: '/practice-areas/employment-litigation', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { title: 'Business Interruption', href: '/practice-areas/business-interruption', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
    { title: 'Personal Injury', href: '/practice-areas/personal-injury', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { title: 'Accounting Malpractice', href: '/practice-areas/accounting-malpractice', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { title: 'Partnership Disputes', href: '/practice-areas/partnership-disputes', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { title: 'Trust/Probate', href: '/practice-areas/trust-probate-litigation', icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3' },
    { title: 'Defamation', href: '/practice-areas/defamation', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
]

export default function ExpertiseGridV4() {
  return (
    <section className="relative bg-[url(/images/Expertise.webp)] flex justify-center bg-cover bg-fixed bg-no-repeat bg-bottom py-16 md:py-24">
      <div className="absolute inset-0 bg-black/40" />
      <div className="container-custom w-full relative z-10">
        {/* Header */}
        <div className="mb-12 lg:mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-[72px] leading-[72px] tracking-[-0.02em] text-white text-center font-semibold">
            <span>Our Areas </span>of <em className="text-[#d4af37] font-serif italic">Expertise</em>
          </h2>
        </div>

        {/* Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
            >
              <Link href={area.href} className="group block">
                <div className="relative h-44 overflow-hidden cursor-pointer rounded-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_16px_50px_rgba(212,175,55,0.25)]">
                  {/* Card base */}
                  <div className="absolute inset-0 bg-[#e8edf5] backdrop-blur-md rounded-lg shadow-[0_6px_25px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:bg-primary-950" />
                  {/* Shine sweep effect */}
                  <div className="absolute inset-0 z-[1] overflow-hidden rounded-lg pointer-events-none">
                    <div className="absolute -inset-full top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent animate-shine" style={{ animationDelay: `${index * 0.2}s` }} />
                  </div>
                  {/* Inner border */}
                  <div className="absolute inset-3 z-[2] border border-[#1d2653] rounded group-hover:border-[#D4AF37] transition-all duration-500 pointer-events-none" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center px-5">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 group-hover:scale-110 transition-all duration-500">
                      <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={area.icon} />
                      </svg>
                    </div>

                    {/* Title */}
                    <h3 className="text-[13px] sm:text-[15px] font-bold uppercase tracking-[0.06em] sm:tracking-[0.12em] leading-tight text-center text-primary-950 group-hover:text-white transition-colors duration-500">
                      {area.title}
                    </h3>

                    {/* Arrow — appears on hover */}
                    <div className="mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                      <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom gold line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
