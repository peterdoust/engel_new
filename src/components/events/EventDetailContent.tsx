'use client';

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import TrackedPhoneLink from '@/components/ui/TrackedPhoneLink'

interface EventDetailContentProps {
    event: any
}

export default function EventDetailContent({ event }: EventDetailContentProps) {
    // 'YYYY-MM-DD' alone parses as UTC midnight, which shows the previous day in US time zones
    const eventStartDate = new Date(event.date + 'T00:00:00')
    const eventEndDate = event.endDate ? new Date(event.endDate + 'T00:00:00') : eventStartDate

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
                {/* Architectural Background Elements */}
                <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#293995] via-[#293995] to-[#1d2653]/30" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(41, 57, 149,0.15)_0%,transparent_70%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_100%] opacity-20" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_80px] opacity-20" />
                </motion.div>

                <motion.div style={{ y: contentY, opacity: opacityHero }} className="container-custom relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <div className="px-3 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#D4AF37]">{event.type}</span>
                                </div>
                                <div className="px-3 py-1 rounded bg-white/5 border border-white/10">
                                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/60">{event.category}</span>
                                </div>
                            </div>

                            <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tighter text-white">
                                {event.title}
                            </h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Date & Duration</p>
                                        <p className="text-white font-medium">
                                            {eventStartDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                            {event.endDate && event.endDate !== event.date && ` — ${eventEndDate.toLocaleDateString('en-US', { day: 'numeric' })}`}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Timezone / Schedule</p>
                                        <p className="text-white font-medium">{event.time}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Venue Destination</p>
                                        <p className="text-white font-medium">{event.location}</p>
                                    </div>
                                </div>

                                {event.booth && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Find Our Booth</p>
                                            <p className="text-white font-medium underline decoration-[#D4AF37] decoration-2 underline-offset-4">{event.booth}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                        {/* Main Content Column */}
                        <div className="lg:col-span-2">
                            <div className="max-w-none">
                                <div className="prose prose-slate prose-xl prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:text-slate-500 prose-p:font-light prose-p:leading-relaxed prose-li:text-slate-500 prose-li:font-light">
                                    <div dangerouslySetInnerHTML={{ __html: event.fullDescription }} />
                                </div>
                            </div>

                            {/* Topics Covered */}
                            {event.topics && event.topics.length > 0 && (
                                <div className="mt-20 pt-20 border-t border-slate-100">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight flex items-center gap-3">
                                        <span className="w-8 h-1 bg-[#D4AF37] rounded-full" />
                                        Key Discussion <span className="font-serif italic font-medium">Topics</span>
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                        {event.topics.map((topic: string, idx: number) => (
                                            <div key={idx} className="flex items-center gap-4 py-3 border-b border-slate-50">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                                                <span className="text-sm font-semibold text-slate-600 tracking-tight">{topic}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Schedule */}
                            {event.schedule && event.schedule.length > 0 && (
                                <div className="mt-20 pt-20 border-t border-slate-100">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight flex items-center gap-3">
                                        <span className="w-8 h-1 bg-[#D4AF37] rounded-full" />
                                        Event <span className="font-serif italic font-medium">Timeline</span>
                                    </h3>
                                    <div className="space-y-4">
                                        {event.schedule.map((item: any, idx: number) => (
                                            <div key={idx} className="group flex gap-8 p-6 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                                <div className="min-w-[120px] text-xs font-black uppercase tracking-widest text-[#D4AF37]">
                                                    {item.time}
                                                </div>
                                                <div className="text-sm font-semibold text-slate-700 tracking-tight">
                                                    {item.activity}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-12">
                                {/* Contact Card */}
                                <div className="bg-[#293995] rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:bg-[#D4AF37]/20" />

                                    <h3 className="text-xl font-bold text-white mb-6 pr-8">Initialize <span className="text-[#D4AF37]">Consultation</span></h3>
                                    <p className="text-slate-400 text-sm font-light mb-8 leading-relaxed">
                                        Reserve dedicated time with our experts to discuss your specific litigation requirements during the session.
                                    </p>
                                    <div className="space-y-4">
                                        <TrackedPhoneLink phone={event.contactPhone} location="event_detail" className="block">
                                            <button className="w-full py-4 bg-[#D4AF37] text-[#293995] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#B8962D] transition-all shadow-[0_10px_30px_rgba(212,175,55,0.1)]">
                                                Call {event.contactPhone}
                                            </button>
                                        </TrackedPhoneLink>
                                        <a href={`mailto:${event.contactEmail}`} className="block">
                                            <button className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                                                Secure Email
                                            </button>
                                        </a>
                                        {event.registrationUrl && (
                                            <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="block pt-4">
                                                <button className="w-full py-4 bg-white text-[#293995] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-100 transition-all">
                                                    Official Register
                                                </button>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Our Experts */}
                                {event.speakers && event.speakers.length > 0 && (
                                    <div className="px-4">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Attending Experts</h4>
                                        <div className="space-y-4">
                                            {event.speakers.map((speaker: string, idx: number) => (
                                                <div key={idx} className="flex items-center gap-4 group">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-sm group-hover:bg-[#D4AF37] group-hover:text-[#1d2653] transition-all">
                                                        {speaker.charAt(0)}
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-900 tracking-tight">{speaker}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Venue Intelligence */}
                                {event.venue && (
                                    <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Venue Intelligence</h4>
                                        <div className="space-y-6">
                                            <div>
                                                <div className="text-sm font-bold text-slate-900 mb-1">{event.venue.name}</div>
                                                <div className="text-xs text-slate-400 font-medium leading-relaxed">{event.venue.address}</div>
                                            </div>
                                            {event.venue.parking && (
                                                <div>
                                                    <p className="text-[9px] font-black text-[#D4AF37] uppercase tracking-widest mb-1">Access & Parking</p>
                                                    <p className="text-xs text-slate-500 font-light leading-relaxed">{event.venue.parking}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Back Link */}
                                <div className="pt-8">
                                    <Link href="/events" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors px-4">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 0118 0z" /></svg>
                                        Corporate Events
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

