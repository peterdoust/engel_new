'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const services = [
  {
    title: 'Forensic Accounting',
    description: 'For over 30+ years, we have provided clients with high-level forensic accounting services for both plaintiffs and defendants in state, federal, and bankruptcy courts.',
    href: '/services/forensic-accounting',
    icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
  },
  {
    title: 'Expert Witness Testimony',
    description: 'Engel & Engel has provided expert testimony in over 100 cases for both plaintiffs and defendants in state, federal, and bankruptcy courts.',
    href: '/services/expert-witness-testimony',
    icon: 'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z',
  },
  {
    title: 'Joint Retention Program',
    description: 'Engel & Engel provides a specialized Joint Retention Program as an alternative to the typical litigation process as a way to resolve disputed financial issues and achieve settlement.',
    href: '/services/joint-retention-program',
    icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
  },
  {
    title: 'Internal Investigations',
    description: 'We conduct internal forensic accounting investigations that uncover irregularities and quantify financial impact for individuals, families, companies, and government agencies.',
    href: '/services/internal-investigations',
    icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z',
  },
]

export default function ServicesOverviewV2() {
  return (
    <section className="relative py-20 md:py-28 bg-[#1d2653] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#D4AF37]/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-[#293995]/5 blur-[120px] rounded-full" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 lg:mb-20"
        >
          <div className="flex items-center gap-6">
            <h2 className="text-[70px] text-white leading-tight font-bold tracking-tight">
              Our <em className="text-[#d4af37] font-serif italic font-medium">Services</em>
            </h2>
            <div className="h-[2px] flex-grow bg-[#D4AF37] hidden md:block" />
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={service.href}
                className="group relative flex flex-col h-full min-h-[280px] rounded-2xl bg-[#1e3a6e] p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-[#234480] overflow-hidden"
              >
                {/* Top row: number + icon */}
                <div className="flex items-start justify-between mb-8">
                  <span className="text-[48px] font-bold leading-none text-white/[0.06]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[17px] font-bold text-white mb-3">
                  {service.title}
                </h3>

                {/* Divider */}
                <div className="h-px w-10 bg-[#D4AF37]/40 mb-4" />

                {/* Description */}
                <p className="text-[13px] leading-relaxed text-white/45 flex-grow">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-2 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all duration-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Explore</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
