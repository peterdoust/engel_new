'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import Image from 'next/image';
import RequestPublicationModal from '@/components/modals/RequestPublicationModal';

const publications = [
    { title: 'Admissibility of Expert Testimony: "The Element of Reliability"', image: '/images/law18.png' },
    { title: 'The Business Records Exception to the Hearsay Rule: "The Admissibility of Financial Records as Evidence in Federal and State Court"', image: '/images/law19.png' },
];

export default function ExpertTestimonyPublications() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPub, setSelectedPub] = useState({ title: '', image: '' });
    const { scrollY } = useScroll();

    // Parallax transforms
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

    const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });

    const handleRequestClick = (title: string, image: string) => {
        setSelectedPub({ title, image });
        setIsModalOpen(true);
    };

    return (
        <main className="bg-slate-50 min-h-screen overflow-hidden">
            <Header />

            {/* ══════════ CINEMATIC HERO ══════════ */}
            <section className="relative flex items-center overflow-hidden bg-[#293995] pt-[calc(var(--hdr)+1rem)] pb-10">
                {/* Parallax Background Decorations */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Glowing orbs */}
                    <motion.div
                        style={{ y: y2, scale }}
                        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[150px] rounded-full"
                    />
                    <motion.div
                        style={{ y: y1 }}
                        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#293995]/10 blur-[120px] rounded-full"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
                </div>

                <div className="container-custom relative z-10 w-full pt-32 md:pt-0">
                    <motion.div
                        style={{ y: springY1, opacity }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white drop-shadow-2xl">
                                Admissibility of <br />
                                <span className="font-serif italic text-[#D4AF37] font-medium block mt-4 text-[0.8em] tracking-[-0.02em]">Expert Testimony</span>
                            </h1>
                            <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* PUBLICATIONS */}
            <section className="py-24 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
                        {publications.map((pub, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden"
                            >
                                {/* IMAGE */}
                                <div className="w-full flex items-center justify-center bg-white border-b p-6">
                                    <Image
                                        src={pub.image}
                                        alt={pub.title}
                                        width={400}
                                        height={520}
                                        className="w-full h-auto object-contain rounded shadow-md"
                                    />
                                </div>

                                {/* CONTENT */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-lg font-semibold text-[#1D2653] leading-snug mb-8 min-h-[70px]">
                                        {pub.title}
                                    </h3>

                                    <button
                                        onClick={() => handleRequestClick(pub.title, pub.image)}
                                        className="mt-auto w-full bg-[#1D2653] hover:bg-[#D4AF37] text-white py-4 rounded-lg transition-all duration-400 text-[12px] tracking-[0.25em] uppercase font-semibold hover:text-[#1D2653]"
                                    >
                                        Request Publication
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <RequestPublicationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                publicationTitle={selectedPub.title}
                publicationImage={selectedPub.image}
            />
        </main>
    );
}
