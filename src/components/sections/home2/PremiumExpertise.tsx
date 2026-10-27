'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

const expertiseAreas = [
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
    { title: 'Partnership Disputes', href: '/practice-areas/partnership-disputes' },
    { title: 'Trust/Probate Litigation', href: '/practice-areas/trust-probate-litigation' },
    { title: 'Defamation', href: '/practice-areas/defamation' },
]

export default function PremiumExpertise() {
    return (
        <section className="relative py-28 md:py-64 bg-[#11162d] overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0 opacity-20">
                <Image
                    src="/abstract_forensics_premium_1772278904549.png"
                    alt="Forensics Abstract"
                    fill
                    className="object-cover transition-transform duration-[10s] animate-pulse"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#11162d] via-transparent to-[#11162d]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 lg:px-24">
                <div className="max-w-7xl mx-auto mb-40">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center space-x-8 mb-12">
                            <div className="h-px w-24 bg-[#D4AF37]" />
                            <span className="text-[#D4AF37] font-bold tracking-[1em] uppercase text-xs">Exemplary Scope</span>
                        </div>

                        <h2 className="text-4xl md:text-8xl lg:text-[12rem] font-bold text-white tracking-tighter leading-[0.8] uppercase mb-4">
                            Our Areas of <br />
                            <span className="font-serif italic font-medium text-white/40 border-b-[10px] border-white/10 pb-10 inline-block tracking-normal lowercase">Expertise</span>
                        </h2>
                        <div className="h-2.5 w-96 md:w-[1000px] lg:w-[1600px] bg-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.5)] mt-4 mb-20" />

                        <div className="max-w-4xl border-l-[12px] border-[#D4AF37] pl-16 py-12 bg-white/5 backdrop-blur-xl">
                            <p className="text-white text-xl md:text-3xl font-light leading-relaxed">
                                Jason A. Engel, CPA, CFE, CIRA, CVA, MAFF, ABV,<br />
                                has served as a financial and economic expert witness<br />
                                for over 30+ years and in over 500 cases.
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 border-l border-t border-white/10 rounded-sm overflow-hidden bg-white/5 shadow-2xl">
                    {expertiseAreas.map((area, index) => (
                        <Link
                            key={index}
                            href={area.href}
                            className="group relative bg-[#11162d] p-12 md:p-20 aspect-square flex flex-col justify-between hover:bg-[#0f172a] transition-all duration-1000 border-r border-b border-white/5 overflow-hidden"
                        >
                            <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-4">
                                <div className="text-[10px] md:text-xs font-bold tracking-[0.6em] uppercase text-white/10 group-hover:text-[#D4AF37] transition-all mb-10">
                                    Practice 0{index + 1}
                                </div>
                                <h3 className="text-xl md:text-3xl font-bold text-white tracking-tighter leading-tight uppercase">
                                    {area.title}
                                </h3>
                            </div>

                            <div className="opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-10 group-hover:translate-y-0 text-[#D4AF37] flex items-center space-x-4">
                                <span className="text-[10px] font-bold tracking-[0.5em] uppercase">Investigate</span>
                                <div className="w-16 h-px bg-[#D4AF37]" />
                            </div>

                            {/* Sophisticated Architectural Detail */}
                            <div className="absolute inset-[40px] border border-white/0 group-hover:border-white/10 transition-all duration-1000 pointer-events-none" />
                            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity">
                                <svg className="w-48 h-48 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
