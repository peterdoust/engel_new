'use client';

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import EventCalendar from '@/components/events/EventCalendar'
import TrackedPhoneLink from '@/components/ui/TrackedPhoneLink'

interface EventsContentProps {
    featuredEvents: any[]
    otherEvents: any[]
    upcomingEvents: any[]
}

export default function EventsContent({ featuredEvents, otherEvents, upcomingEvents }: EventsContentProps) {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    return (
        <>
            {/* ══════════ PREMIUM HERO SECTION ══════════ */}
            <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-[#293995] text-white text-center">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 animate-ken-burns"
                        style={{ backgroundImage: 'url("https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080")' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#293995] via-[#293995]/95 to-[#293995]" />
                    <div className="absolute top-0 right-0 w-[1200px] h-[800px] bg-[#D4AF37]/10 blur-[200px] rounded-full -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tighter text-white">
                            Connect With <br />
                            <span className="font-serif italic text-[#D4AF37] font-medium text-[2.5rem]">Experts</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* ══════════ FEATURED EVENTS SECTION ══════════ */}
            <section id="upcoming-events" className="py-24 bg-white relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <div className="h-1.5 w-16 bg-[#D4AF37] mb-6 rounded-full" />
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                                Featured <span className="font-serif italic font-medium">Events</span>
                            </h2>
                            <p className="mt-4 text-lg text-slate-500 font-light leading-relaxed">
                                Experience world-class forensic accounting insights. Connect with our experts at these flagship industry gatherings.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {featuredEvents.map((event, idx) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                                className="group relative flex flex-col"
                            >
                                {/* Visual Accent */}
                                <div className="aspect-[16/9] relative rounded-2xl overflow-hidden bg-slate-900 shadow-2xl">
                                    {/* Decorative Frame */}
                                    <div className="absolute inset-0 border border-white/5 z-20 rounded-2xl" />
                                    <div className="absolute -inset-4 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                                    {/* Date Badge */}
                                    <div className="absolute top-6 left-6 z-30 flex flex-col items-center justify-center w-16 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                                        <span className="text-2xl font-bold text-white leading-none">{new Date(event.date + 'T00:00:00').getDate()}</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] mt-1">
                                            {new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' })}
                                        </span>
                                    </div>

                                    {/* Icon Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20">
                                        <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#293995] transform scale-0 group-hover:scale-100 transition-transform duration-500">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </div>
                                    </div>

                                    {/* Placeholder Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#1d2653] to-[#11162d] flex items-end justify-end p-5 sm:p-6">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="/images/brand/ee-logo-horizontal-white.png" alt="" aria-hidden="true" className="w-1/2 max-w-[200px] opacity-[0.15] select-none" />
                                    </div>
                                </div>

                                <div className="flex-1 pt-8 flex flex-col">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 rounded bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest border border-[#D4AF37]/20">
                                            {event.type}
                                        </span>
                                        <span className="h-px flex-1 bg-slate-100" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors duration-300 mb-4">
                                        {event.title}
                                    </h3>

                                    <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-slate-100">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Location</p>
                                            <p className="text-sm font-semibold text-slate-700 line-clamp-2 sm:line-clamp-1">{event.location}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Schedule</p>
                                            <p className="text-sm font-semibold text-slate-700 line-clamp-1">{event.time}</p>
                                        </div>
                                    </div>

                                    <p className="text-slate-500 text-base font-light leading-relaxed mb-8 line-clamp-2">
                                        {event.description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between gap-4">
                                        <Link href={`/events/${event.slug}`} className="flex-1 px-6 py-3 bg-[#293995] text-white rounded-xl text-xs font-bold uppercase tracking-widest text-center hover:bg-slate-800 transition-colors duration-300">
                                            View Details
                                        </Link>
                                        <TrackedPhoneLink phone={event.contactPhone} location="events_list" className="px-6 py-3 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-900 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300">
                                            Schedule Meet
                                        </TrackedPhoneLink>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* ══════════ LIST SECTION ══════════ */}
                    {otherEvents.length > 0 && (
                        <div className="mt-32 pt-32 border-t border-slate-100">
                            <div className="flex items-center justify-between mb-16">
                                <div>
                                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Upcoming Engagements</h3>
                                    <p className="text-slate-500 font-light mt-2">Browse more opportunities to connect with the firm.</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {otherEvents.map((event) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="group flex flex-col md:flex-row md:items-center gap-8 p-6 rounded-2xl hover:bg-slate-50 transition-colors duration-300 border border-transparent hover:border-slate-100"
                                    >
                                        <div className="md:w-32 flex flex-col items-center justify-center text-center pb-6 md:pb-0 md:border-r border-slate-200">
                                            <span className="text-3xl font-serif italic text-[#D4AF37]">{String(new Date(event.date + 'T00:00:00').getDate()).padStart(2, '0')}</span>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                                {new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' })}
                                            </span>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{event.type}</span>
                                                <div className="w-1 h-1 rounded-full bg-slate-300" />
                                                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">{event.category}</span>
                                            </div>
                                            <h4 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h4>
                                            <p className="text-sm text-slate-500 font-light max-w-2xl line-clamp-1">{event.location}</p>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <Link href={`/events/${event.slug}`} className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-900 border border-slate-200 rounded-xl hover:bg-white hover:border-slate-950 transition-all duration-300">
                                                Details
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Calendar Section */}
            <section id="calendar" className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Events <span className="font-serif italic font-medium">Calendar</span></h2>
                        <p className="text-slate-500 font-light mt-4">A complete overview of our professional presence.</p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <EventCalendar events={upcomingEvents} />
                    </div>
                </div>
            </section>
        </>
    )
}

