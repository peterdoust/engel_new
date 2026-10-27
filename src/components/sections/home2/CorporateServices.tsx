'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Landmark, Scale, ShieldAlert, BarChart3 } from 'lucide-react'

const services = [
    {
        title: 'Forensic Accounting',
        href: '/services/forensic-accounting',
        icon: BarChart3
    },
    {
        title: 'Expert Witness Testimony',
        href: '/services/expert-witness-testimony',
        icon: Scale
    },
    {
        title: 'Joint Retention Program',
        href: '/services/joint-retention-program',
        icon: Landmark
    },
    {
        title: 'Internal Investigations',
        href: '/services/internal-investigations',
        icon: ShieldAlert
    },
]

export default function CorporateServices() {
    return (
        <section className="py-24 md:py-32 bg-[#FAF9F6]">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center mb-16 text-center">
                    <span className="text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-xs mb-4">Core Competencies</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#11162D] mb-2 tracking-tight uppercase">
                        Our Services
                    </h2>
                    <div className="h-1.5 w-72 md:w-[450px] bg-[#D4AF37] mx-auto mt-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={service.href} className="group block h-full bg-[#293995] p-10 border-[#4cc9f0]/40 hover:border-[#D4AF37] transition-all duration-500 rounded-sm" style={{ borderWidth: '0.5px' }}>
                                    <div className="w-16 h-16 bg-white/10 rounded-sm flex items-center justify-center mb-8 group-hover:bg-[#D4AF37] transition-colors duration-500">
                                        <Icon className="w-8 h-8 text-white group-hover:text-[#1d2653] transition-colors duration-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight group-hover:text-[#D4AF37] transition-colors">
                                        {service.title}
                                    </h3>
                                    <div className="flex items-center text-[10px] font-bold tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">
                                        <span>Learn More</span>
                                        <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
