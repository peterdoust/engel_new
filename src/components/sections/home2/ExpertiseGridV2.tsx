'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
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

export default function ExpertiseGridV2() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <section ref={containerRef} className="relative py-28 md:py-48 lg:py-64 bg-[#11162D] overflow-hidden">
            {/* Cinematic Perspective Monoterra Background */}
            <div className="absolute inset-x-0 inset-y-0 opacity-[0.02] pointer-events-none select-none overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:100px_100px] -rotate-12 scale-150" />
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 w-full max-w-[1800px]">
                <div className="flex flex-col mb-32 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="w-full"
                    >
                        <div className="flex items-center space-x-6 mb-12">
                            <div className="h-px w-20 bg-[#D4AF37]" />
                            <span className="text-[#D4AF37] font-bold tracking-[0.8em] uppercase text-xs">Exemplary Scope</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl lg:text-[10rem] font-bold text-white tracking-tighter leading-[0.85] uppercase mb-4 drop-shadow-2xl">
                            Our Areas of <br />
                            <span className="font-serif italic font-medium text-white/40 tracking-normal border-b-8 border-white/5 pb-8 inline-block">Expertise</span>
                        </h2>
                        <div className="h-2.5 w-96 md:w-[1000px] lg:w-[1400px] bg-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.5)] mt-4 mb-20" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="max-w-4xl"
                    >
                        <p className="text-[#E2E6F0]/80 text-lg md:text-3xl font-light leading-relaxed border-l-8 border-[#D4AF37] pl-16 py-12 bg-white/5 hover:bg-white/[0.08] transition-colors rounded-sm">
                            Jason A. Engel, CPA, CFE, CIRA, CVA, MAFF, ABV,<br />
                            has served as a financial and economic expert witness<br />
                            for over 30+ years and in over 500 cases.
                        </p>
                    </motion.div>
                </div>

                {/* High-End Practice Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 border-l border-t border-white/5 rounded-sm overflow-hidden bg-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                    {expertiseAreas.map((area, index) => (
                        <Link
                            key={index}
                            href={area.href}
                            className="group relative bg-[#1d2653] p-12 md:p-16 aspect-square flex flex-col justify-between hover:bg-[#1d2653] transition-all duration-1000 border-[#4cc9f0]/20"
                            style={{ borderRightWidth: '0.5px', borderBottomWidth: '0.5px' }}
                        >
                            <div className="relative z-10">
                                <div className="text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase text-white/20 group-hover:text-white transition-all mb-8">
                                    Area 0{index + 1}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tighter leading-tight group-hover:translate-x-4 transition-all duration-700 uppercase">
                                    {area.title}
                                </h3>
                            </div>

                            <div className="flex items-center space-x-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D4AF37]">Explore</span>
                                <div className="w-12 h-px bg-[#D4AF37] group-hover:w-20 transition-all" />
                            </div>

                            {/* Sophisticated Architectural Framing Component */}
                            <div className="absolute inset-[30px] border border-white/0 group-hover:border-white/10 transition-all duration-1000 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-0 h-2 bg-[#D4AF37] group-hover:w-full transition-all duration-1000" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
