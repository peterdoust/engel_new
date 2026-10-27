'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const certifications = [
    { name: 'CPA', fullName: 'Certified Public Accountant', image: '/images/certifications/cpa-gold.png', alt: 'AICPA' },
    { name: 'CFE', fullName: 'Certified Fraud Examiner', image: '/images/certifications/cfe-gold.png', alt: 'ACFE' },
    { name: 'CIRA', fullName: 'Certified Insolvency & Restructuring Advisor', image: '/images/certifications/cira-gold.png', alt: 'AIRA' },
    { name: 'CVA', fullName: 'Certified Valuation Analyst', image: '/images/certifications/cva-gold.png', alt: 'NACVA' },
    { name: 'MAFF', fullName: 'Master Analyst in Financial Forensics', image: '/images/certifications/maff-gold.png', alt: 'MAFF' },
    { name: 'ABV', fullName: 'Accredited in Business Valuation', image: '/images/certifications/abv-gold.png', alt: 'ABV' },
]

export default function PremiumCertifications() {
    return (
        <section className="relative py-32 md:py-64 bg-white overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 lg:px-24">
                <div className="flex flex-col items-center mb-40 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-6xl md:text-[10rem] font-bold text-[#11162D] mb-12 leading-none tracking-tighter uppercase font-sans">
                            Our <span className="font-serif italic font-medium text-[#11162D]/40 lowercase tracking-normal">Certifications</span>
                        </h2>
                        <p className="text-gray-500 text-xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto mb-16">
                            Our analysis and testimony are supported by relevant professional credentials.
                        </p>
                        <div className="h-2 w-48 bg-[#D4AF37] mx-auto" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-24 items-center">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center group relative h-96 w-full"
                        >
                            <div className="relative w-56 h-56 md:w-80 md:h-80 transition-all duration-1000 group-hover:scale-110 group-hover:-rotate-3 grayscale hover:grayscale-0">
                                <Image
                                    src={cert.image}
                                    alt={cert.alt}
                                    fill
                                    className="object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_60px_120px_rgba(212,175,55,0.5)]"
                                    sizes="40vw"
                                />
                            </div>

                            {/* Museum Style Floor Accent */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-[#D4AF37] group-hover:w-64 transition-all duration-1000" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
