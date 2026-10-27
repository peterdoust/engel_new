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

export default function CorporateExpertise() {
    return (
        <section className="py-24 md:py-32 bg-[#FAF9F6] border-t border-gray-100">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    <div className="lg:col-span-4 sticky top-32">
                        <span className="text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Specialized Knowledge</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-[#11162D] mb-2 tracking-tight uppercase">
                            Our Areas of <br />
                            <span className="text-gray-400">Expertise</span>
                        </h2>
                        <div className="h-1.5 w-72 md:w-[400px] bg-[#D4AF37] mb-8 shadow-[0_0_20px_rgba(212,175,55,0.3)] mt-2" />
                        <p className="text-gray-600 text-lg leading-relaxed mb-12 border-l-4 border-[#D4AF37] pl-8">
                            Jason A. Engel, CPA, CFE, CIRA, CVA, MAFF, ABV,<br />
                            has served as a financial and economic expert witness<br />
                            for over 30+ years and in over 500 cases.
                        </p>
                        <div className="relative h-64 w-full rounded-sm overflow-hidden shadow-lg border border-gray-100 bg-white">
                            <Image
                                src="/legal_scales_modern_1772279144393.png"
                                alt="Expertise detail"
                                fill
                                className="object-cover brightness-90 grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {expertiseAreas.map((area, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <Link
                                        href={area.href}
                                        className="group flex items-center justify-between p-6 bg-white border border-gray-100 hover:border-[#D4AF37] hover:bg-[#11162D] transition-all duration-500 rounded-sm"
                                    >
                                        <span className="text-base font-bold text-[#11162D] group-hover:text-white transition-colors uppercase tracking-tight">
                                            {area.title}
                                        </span>
                                        <svg className="w-5 h-5 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
