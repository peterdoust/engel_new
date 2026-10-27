'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

const services = [
    {
        title: 'Forensic Accounting',
        href: '/services/forensic-accounting',
        image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        title: 'Expert Witness Testimony',
        href: '/services/expert-witness-testimony',
        image: 'https://images.pexels.com/photos/159832/pexels-photo-159832.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        title: 'Joint Retention Program',
        href: '/services/joint-retention-program',
        image: 'https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        title: 'Internal Investigations',
        href: '/services/internal-investigations',
        image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
]

export default function PremiumServices() {
    return (
        <section className="relative py-32 md:py-64 bg-[#11162d] overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center mb-40 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-6xl md:text-[10rem] font-bold text-white mb-4 leading-none tracking-tighter uppercase">
                            Our Services
                        </h2>
                        <div className="h-2.5 w-96 md:w-[800px] lg:w-[1000px] bg-[#D4AF37] mx-auto shadow-[0_0_50px_rgba(212,175,55,0.5)] mt-4" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-[#4cc9f0]/20 rounded-sm overflow-hidden shadow-2xl" style={{ borderWidth: '0.5px' }}>
                    {services.map((service, index) => (
                        <Link key={index} href={service.href} className="group relative h-[700px] overflow-hidden border-[#4cc9f0]/20 " style={{ borderRightWidth: '0.5px' }}>
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-[2s] group-hover:scale-115 group-hover:rotate-1 brightness-[0.4] group-hover:brightness-[0.7]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#293995] via-[#293995]/60 to-transparent flex flex-col justify-end p-12 text-center items-center">
                                <span className="text-[10rem] font-serif italic absolute top-10 opacity-5 text-white transition-opacity group-hover:opacity-20 pointer-events-none">0{index + 1}</span>

                                <h3 className="text-3xl md:text-5xl font-bold text-white mb-10 tracking-tighter uppercase leading-none px-4 group-hover:-translate-y-4 transition-transform duration-700">
                                    {service.title.split(' ').map((word, i) => (
                                        <span key={i} className="block">{word}</span>
                                    ))}
                                </h3>

                                <div className="flex flex-col items-center opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-700">
                                    <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-[#D4AF37] mb-4">Launch Practice</span>
                                    <div className="w-16 h-px bg-[#D4AF37]" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
