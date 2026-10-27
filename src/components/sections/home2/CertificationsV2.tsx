'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function CertificationsV2() {
    const containerRef = useRef<HTMLDivElement>(null)

    const certifications = [
        { name: 'CPA', fullName: 'Certified Public Accountant', image: '/images/certifications/cpa-gold.png', alt: 'AICPA' },
        { name: 'CFE', fullName: 'Certified Fraud Examiner', image: '/images/certifications/cfe-gold.png', alt: 'ACFE' },
        { name: 'CIRA', fullName: 'Certified Insolvency & Restructuring Advisor', image: '/images/certifications/cira-gold.png', alt: 'AIRA' },
        { name: 'CVA', fullName: 'Certified Valuation Analyst', image: '/images/certifications/cva-gold.png', alt: 'NACVA' },
        { name: 'MAFF', fullName: 'Master Analyst in Financial Forensics', image: '/images/certifications/maff-gold.png', alt: 'MAFF' },
        { name: 'ABV', fullName: 'Accredited in Business Valuation', image: '/images/certifications/abv-gold.png', alt: 'ABV' },
    ]

    return (
        <section ref={containerRef} className="relative py-28 md:py-48 lg:py-64 bg-white overflow-hidden">
            {/* Decorative Texture Layer (Subtle) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
                <div className="absolute inset-0 bg-[#11162D] mix-blend-multiply transition-opacity duration-1000 group-hover:opacity-10" />
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 w-full max-w-[1800px]">
                <div className="flex flex-col items-center mb-32 max-w-4xl mx-auto text-center font-bold">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex items-center justify-center space-x-6 mb-12">
                            <div className="h-px w-12 bg-[#D4AF37]" />
                            <span className="text-[#D4AF37] font-bold tracking-[1em] uppercase text-xs">Exemplary Credentials</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold text-[#11162D] mb-12 leading-none tracking-tighter uppercase relative">
                            Our <span className="font-serif italic font-medium text-[#11162D]/60 border-b-8 border-[#D4AF37]/10 pb-4 inline-block tracking-normal lowercase">Certifications</span>
                        </h2>

                        <p className="text-gray-500 text-lg md:text-2xl font-light leading-relaxed mb-16 max-w-2xl mx-auto">
                            Our analysis and testimony are supported by relevant professional credentials.
                        </p>
                    </motion.div>
                </div>

                {/* High-End Gallery Interaction */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-12 gap-y-24 items-center justify-items-center">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center group relative w-full"
                        >
                            <div className="relative w-40 h-40 md:w-64 md:h-64 transition-all duration-1000 group-hover:scale-110 group-hover:rotate-y-12 active:scale-95">
                                <Image
                                    src={cert.image}
                                    alt={cert.alt}
                                    fill
                                    className="object-contain filter transition-all duration-1000 drop-shadow-[0_20px_40px_rgba(212,175,55,0.15)] group-hover:drop-shadow-[0_50px_100px_rgba(212,175,55,0.4)]"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                            </div>

                            <span className="mt-6 text-sm md:text-base font-bold tracking-widest uppercase text-[#11162D]/70 group-hover:text-[#11162D] transition-colors duration-700">{cert.name}</span>
                            <span className="mt-1 text-xs md:text-sm text-gray-400 text-center leading-tight">{cert.fullName}</span>

                            {/* Sophisticated Floor Light Effect */}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
