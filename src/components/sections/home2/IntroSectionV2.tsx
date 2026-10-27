'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function IntroSectionV2() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <section ref={containerRef} className="relative py-28 md:py-48 lg:py-64 bg-white overflow-hidden">
            {/* Cinematic Architectural Grid Background */}
            <div className="absolute inset-x-0 inset-y-0 opacity-[0.04] pointer-events-none select-none">
                <div className="absolute inset-0 bg-[radial-gradient(#0A0F1E_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 w-full max-w-[1800px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">

                    {/* Visual Column / The Monolith */}
                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="lg:col-span-12 xl:col-span-5 relative"
                    >
                        <div className="relative group">
                            {/* Background Architectural Framing */}
                            <div className="absolute -inset-10 border border-[#D4AF37]/20 rounded-sm translate-x-8 translate-y-8 z-0 pointer-events-none group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-1000" />

                            <div className="relative z-10 bg-[#11162D] text-white p-12 md:p-20 xl:p-24 rounded-sm shadow-[40px_40px_80px_-20px_rgba(17, 22, 45,0.3)] overflow-hidden">
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.4)_0%,transparent_60%)]" />

                                <span className="block text-xs font-bold tracking-[0.8em] uppercase text-[#D4AF37] mb-12">Established</span>

                                <div className="flex items-baseline space-x-2 relative mb-12">
                                    <span className="block text-9xl md:text-[12rem] font-serif italic mb-6 leading-none tracking-tighter text-white/90">1994</span>
                                </div>

                                <div className="h-px w-24 bg-[#D4AF37] mb-12" />

                                <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-light transition-colors group-hover:text-white duration-500">
                                    With  30+ years in the forensic accounting industry, working with attorneys and legal teams in and out of the courtroom.
                                </p>

                                {/* Aesthetic Detail */}
                                <div className="absolute bottom-0 right-0 p-12 opacity-10">
                                    <svg className="w-32 h-32 md:w-48 md:h-48 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Institutional Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:col-span-12 xl:col-span-7 flex flex-col justify-start xl:pt-16"
                    >
                        <div className="max-w-4xl">
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#11162D] mb-10 tracking-tighter leading-[1.1]">
                                Engel & Engel – <br />
                                <span className="font-serif italic font-medium text-[#1e1b4b]/70 border-b-4 border-[#D4AF37]/20 pb-4 inline-block">Los Angeles Forensic Accounting Firm</span>
                            </h2>

                            <div className="flex items-center space-x-6 mb-16">
                                <div className="h-px w-12 bg-[#D4AF37]" />
                                <span className="text-[#D4AF37] font-bold tracking-[0.6em] uppercase text-sm md:text-lg">From Strategy to Testimony</span>
                            </div>

                            <div className="space-y-12 text-gray-700 text-lg md:text-2xl leading-relaxed font-light">
                                <p>
                                    Established in Los Angeles in 1994, <strong className="font-bold text-[#11162D]">Engel & Engel LLP</strong> has positioned itself as one of the premier providers of forensic accounting and advisory services, not only in California, but nationwide as well. We provide private practice law firms, as well as in-house counsel of Fortune 500 to middle-market companies, complex business litigation support, including fraud investigations, economic damages, business valuation, bankruptcy and insolvency, alter ego, IP litigation, employment litigation, real estate litigation, construction litigation and a variety of other litigation matters.
                                </p>

                                <p>
                                    With  30+ years in the forensic accounting industry, working with attorneys and legal teams in and out of the courtroom, Engel & Engel brings credentials, expertise, and careful attention to each and every case. Our qualifications make us the right choice for developing thoughtful strategies, investigating the particulars, and finally, delivering analysis and calculations with sound and persuasive testimony.
                                </p>

                                <p className="text-[#11162D]/60 italic font-serif">
                                    We offer free consultations regarding your matter. Please contact Brandon Engel at (310) 277-2220 or complete our short contact form below.
                                </p>

                                <div className="pt-16 border-t border-gray-100 flex items-center justify-between group cursor-default">
                                    <span className="text-3xl font-serif italic text-[#11162D] transition-transform duration-700 group-hover:translate-x-4">Thank You!</span>
                                    <div className="h-px flex-grow bg-gradient-to-r from-gray-100 via-gray-100 to-transparent ml-12" />
                                </div>
                            </div>
                        </div>

                        {/* Credential Signature Row */}
                        <div className="mt-24 pt-16 border-t border-gray-100 flex flex-wrap justify-start items-center gap-4 md:gap-8 opacity-90 transition-all duration-1000">
                            {[
                                { src: '/images/memberships/aicpa.jpg', alt: 'AICPA', h: 'h-16 md:h-20', w: 'w-48' },
                                { src: '/images/memberships/calcpa.jpg', alt: 'CalCPA', h: 'h-24 md:h-28', w: 'w-36' },
                                { src: '/images/memberships/acfe.jpg', alt: 'ACFE', h: 'h-24 md:h-28', w: 'w-36' },
                                { src: '/images/memberships/aira.jpg', alt: 'AIRA', h: 'h-24 md:h-28', w: 'w-36' },
                                { src: '/images/memberships/nacva.jpg', alt: 'NACVA', h: 'h-24 md:h-28', w: 'w-48' },
                                { src: '/images/memberships/forbes.png', alt: 'Forbes', h: 'h-16 md:h-20', w: 'w-48' },
                            ].map((logo, i) => (
                                <div key={i} className={`relative ${logo.h} ${logo.w} opacity-80 hover:opacity-100 hover:grayscale transition-all duration-500`}>
                                    <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
