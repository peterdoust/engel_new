'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const categories = ['All', 'Events', 'News', 'Announcements']

const newsItems = [
  {
    id: 1,
    slug: 'jason-engel-forbes-top-cpas-valuations-2025',
    title: 'Jason Engel Named to Forbes\' Inaugural List of America\'s Top CPAs in Valuations',
    excerpt: 'Jason Engel has been named among Forbes\' inaugural list of America\'s Top CPAs in Valuations. This prestigious list was drawn from nominations, independent research, and interviews with industry leaders and experts.',
    date: 'March 6, 2026',
    category: 'Announcements',
    image: '/images/memberships/forbes.png',
    featured: true,
  },
  {
    id: 7,
    title: 'Engel & Engel Sponsors ABTL Dinner Program at the Omni Hotel',
    excerpt: 'Engel & Engel is proud to sponsor the Association of Business Trial Lawyers\' dinner program on Wednesday, April 22nd at the Omni Hotel. The ABTL provides a forum for litigators and judges to discuss issues critical to all business trial attorneys. Please join us.',
    date: 'April 22, 2026',
    category: 'Events',
    extraCategories: ['Announcements'],
    image: '/images/abtl-event.jpg',
    featured: false,
  },
  {
    id: 8,
    title: 'Engel & Engel Platinum Sponsor of the Institute for Corporate Counsel Program',
    excerpt: 'Engel & Engel is proud to be a Platinum Sponsor of this year\'s Institute for Corporate Counsel Program held at The California Club on December 3, 2025. This day-long conference hosted by the Gould School of Law and the LACBA Business Law Section brings together top law and consulting firms dedicated to understanding the challenges of California\'s business environment and changes in the law that impact in-house legal departments.',
    date: 'December 3, 2025',
    category: 'Events',
    extraCategories: ['Announcements'],
    image: '/images/event2.jpg',
    featured: false,
  },
]

export default function NewsroomPage() {
  const [activeCategory, setActiveCategory] = useState('All')


  const featuredItem = newsItems.find(item => item.featured)

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative flex items-end overflow-hidden bg-[#293995] pt-[calc(var(--hdr)+1rem)] pb-10">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#293995]/10 blur-[120px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        </div>
        <div className="container-custom relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-5xl"
          >
            <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.3em] uppercase mb-3">Latest Updates</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.9]">
              News &amp; <span className="font-serif italic text-[#D4AF37] font-medium">Insights</span>
            </h1>
            <p className="text-white/50 text-lg md:text-xl font-light mt-6 max-w-2xl">
              Press releases, awards, events, and the latest updates from Engel & Engel LLP.
            </p>
            <div className="h-[3px] w-24 bg-[#D4AF37] mt-5" />
          </motion.div>
        </div>
      </section>

      {/* Featured Story */}
      {featuredItem && activeCategory === 'All' && (
        <section className="py-16 bg-slate-50">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-10">
                <div className="h-px w-12 bg-[#D4AF37]" />
                <span className="text-gold-700 font-bold tracking-[0.4em] uppercase text-xs">Featured Story</span>
              </div>
              <Link
                href="/news-and-insights/jason-engel-forbes-top-cpas-valuations-2025"
                className="group grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="relative h-64 md:h-auto min-h-[300px] bg-gray-100 overflow-hidden">
                  <Image
                    src={featuredItem.image}
                    alt={featuredItem.title}
                    fill
                    className="object-contain p-10 md:p-16 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-[#D4AF37] text-primary-950 px-3 py-1 rounded-sm">
                      {featuredItem.category}
                    </span>
                    <span className="text-xs text-gray-600">{featuredItem.date}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary-950 tracking-tight mb-4 leading-tight group-hover:text-gold-700 transition-colors">
                    {featuredItem.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed font-light mb-6">{featuredItem.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-gold-700 font-bold text-sm">
                    Read More
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Filter + list share a wrapper so the sticky filter stops at the end of the list */}
      <div>
      {/* Category Filter */}
      <section className="py-3 sm:py-8 bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-30">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-1 px-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`shrink-0 px-4 sm:px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-primary-950 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {(() => {
              const matchesCategory = (item: (typeof newsItems)[number], cat: string) =>
                item.category === cat || item.extraCategories?.includes(cat)

              const filtered = newsItems
                .filter(item => !item.featured && (activeCategory === 'All' || matchesCategory(item, activeCategory)))
                .slice()
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

              if (filtered.length === 0) {
                return (
                  <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 mb-4">
                      <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm">No items in this category yet.</p>
                    <p className="text-gray-300 text-xs mt-1">Check back soon for updates.</p>
                  </div>
                )
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                  {filtered.map(item => {
                    const detailUrl = item.category === 'Announcements' && item.slug
                      ? `/news-and-insights/${item.slug}`
                      : null

                    const cardInner = (
                      <>
                        <div className="relative aspect-square bg-white overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-[#D4AF37] text-primary-950 px-2.5 py-1 rounded-sm">
                              {item.category}
                            </span>
                            <span className="text-xs text-gray-600">{item.date}</span>
                          </div>
                          <h3 className={`text-lg font-bold text-primary-950 leading-snug mb-3 ${detailUrl ? 'group-hover:text-[#D4AF37] transition-colors' : ''}`}>
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 leading-relaxed font-light">
                            {item.excerpt}
                          </p>
                          {detailUrl && (
                            <span className="mt-4 inline-flex items-center gap-2 text-gold-700 font-bold text-sm">
                              Read More
                              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </span>
                          )}
                        </div>
                      </>
                    )

                    return (
                      <motion.article
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col group"
                      >
                        {detailUrl ? (
                          <Link href={detailUrl} className="flex flex-col h-full">
                            {cardInner}
                          </Link>
                        ) : (
                          cardInner
                        )}
                      </motion.article>
                    )
                  })}
                </div>
              )
            })()}
          </div>
        </div>
      </section>
      </div>

      {/* CTA */}
      <section className="relative py-20 bg-primary-950 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[10px] font-bold tracking-[0.6em] uppercase text-[#D4AF37] mb-6">Media Inquiries</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">
              Press & Media <span className="font-serif italic text-[#D4AF37] font-medium">Contact</span>
            </h2>
            <p className="text-lg mb-10 text-white/60 font-light leading-relaxed">
              For press inquiries, interview requests, or media information, please contact our office.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#D4AF37] text-primary-950 font-bold text-sm tracking-wider uppercase hover:bg-white transition-colors duration-300 rounded-lg"
              >
                Contact Us
              </Link>
              <Link
                href="/blog"
                className="px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-wider uppercase hover:bg-white/10 transition-colors duration-300 rounded-lg"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
