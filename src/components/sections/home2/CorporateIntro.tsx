'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function CorporateIntro() {
    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <div className="mb-8">
                            <span className="text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-xs mb-4 block">From Strategy to Testimony</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-[#11162D] mb-8 leading-tight">
                                Engel & Engel <br />
                                <span className="text-[#11162D]/70">Los Angeles Forensic Accounting Experts</span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                            <p>
                                Established in Los Angeles in 1994, <strong className="font-semibold text-[#11162D]">Engel & Engel LLP</strong> provides forensic accounting and advisory services in complex business litigation matters across California and nationwide.
                            </p>

                            <p>
                                We provide litigation support for plaintiffs and defendants in matters involving fraud investigations, economic damages, business valuation, bankruptcy and insolvency, and other financial matters.
                            </p>

                            <p>
                                Engel & Engel delivers industry-leading forensic accounting analysis and clear, defensible expert testimony in high-stakes matters nationwide.
                            </p>

                            <p className="font-medium text-[#11162D]">
                                Engel & Engel's forensic analysis has supported billions of dollars in court awards and defenses, and its professionals have been recognized nationally, including Forbes' 2025 Top Valuation CPAs.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative h-[500px] md:h-[600px] rounded-sm overflow-hidden shadow-2xl order-1 lg:order-2"
                    >
                        <Image
                            src="/professional_handshake_legal_1772279129932.png"
                            alt="Professional Engagement"
                            fill
                            className="object-cover"
                        />
                        {/* Overlay Grid Stats */}
                        <div className="absolute bottom-0 left-0 right-0 bg-[#11162D]/95 p-12 text-white">
                            <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs mb-4 block">Est.</span>
                            <div className="text-6xl md:text-8xl font-bold mb-4">1994</div>
                            <p className="text-primary-100 text-xl font-light leading-relaxed">
                                Over 30 years of providing forensic accounting analysis and expert testimony to attorneys across California and the United States.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
