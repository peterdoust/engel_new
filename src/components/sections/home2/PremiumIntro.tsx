'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function PremiumIntro() {
    return (
        <section className="relative py-32 md:py-56 bg-white overflow-hidden">
            {/* Texture for Architectural Depth */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none select-none">
                <div className="absolute inset-x-0 inset-y-0 bg-[radial-gradient(#0A0F1E_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <div className="container mx-auto relative z-10 px-6 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">

                    {/* Visual Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="lg:col-span-12 xl:col-span-5 relative"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-10 border border-[#D4AF37]/20 rounded-sm translate-x-8 translate-y-8 z-0 pointer-events-none group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-1000" />

                            <div className="relative z-10 bg-[#11162D] text-white p-16 md:p-24 rounded-sm shadow-2xl overflow-hidden min-h-[600px] flex flex-col justify-center">
                                <Image
                                    src="/architectural_detail_luxury_1772278889667.png"
                                    alt="Modern Architecture"
                                    fill
                                    className="object-cover opacity-20 transition-transform duration-[2s] group-hover:scale-110"
                                />
                                <div className="relative z-20">
                                    <span className="block text-xs font-bold tracking-[1em] uppercase text-[#D4AF37] mb-8">Est.</span>
                                    <span className="block text-[8rem] md:text-[12rem] font-serif italic mb-8 leading-none tracking-tighter">1994</span>
                                    <div className="h-px w-32 bg-[#D4AF37] mb-12" />
                                    <p className="text-white/80 text-xl font-light leading-relaxed">
                                        Over 30 years of providing forensic accounting analysis and expert testimony to attorneys across California and the United States.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="lg:col-span-12 xl:col-span-7"
                    >
                        <div className="max-w-4xl">
                            <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-[#11162D] mb-10 tracking-tighter leading-[0.9]">
                                Engel & Engel <br />
                                <span className="font-serif italic font-medium text-[#11162D]/60 border-b-8 border-[#D4AF37]/20 pb-6 inline-block tracking-normal">Los Angeles Forensic Accounting Experts</span>
                            </h2>

                            <div className="flex items-center space-x-6 mb-16">
                                <div className="h-px w-16 bg-[#D4AF37]" />
                                <span className="text-[#D4AF37] font-bold tracking-[0.8em] uppercase text-sm md:text-lg">From Strategy to Testimony</span>
                            </div>

                            <div className="space-y-12 text-gray-700 text-lg md:text-2xl leading-relaxed font-light">
                                <p>
                                    Established in Los Angeles in 1994, <strong className="font-bold text-[#11162D]">Engel & Engel LLP</strong> provides forensic accounting and advisory services in complex business litigation matters across California and nationwide.
                                </p>

                                <p>
                                    We provide litigation support for plaintiffs and defendants in matters involving fraud investigations, economic damages, business valuation, bankruptcy and insolvency, and other financial matters.
                                </p>

                                <p>
                                    Engel & Engel delivers industry-leading forensic accounting analysis and clear, defensible expert testimony in high-stakes matters nationwide.
                                </p>

                                <p>
                                    Engel & Engel's forensic analysis has supported billions of dollars in court awards and defenses, and its professionals have been recognized nationally, including Forbes' 2025 Top Valuation CPAs.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
