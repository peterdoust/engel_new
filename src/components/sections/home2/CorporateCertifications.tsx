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

export default function CorporateCertifications() {
    return (
        <section className="py-24 bg-white border-y border-gray-100">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#11162D] mb-6 tracking-tight uppercase">
                        Our Certifications
                    </h2>
                    <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto">
                        Our analysis and testimony are supported by relevant professional credentials.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-12 items-center">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center grayscale hover:grayscale-0 transition-all duration-500"
                        >
                            <div className="relative w-32 h-32 md:w-40 md:h-40">
                                <Image
                                    src={cert.image}
                                    alt={cert.alt}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
