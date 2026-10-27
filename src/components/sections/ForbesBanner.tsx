'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ForbesBanner() {
  return (
    <section className="relative pt-10 pb-20 md:pt-14 md:pb-28 bg-[#FAFAF8] overflow-hidden">
      {/* Subtle decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">

            {/* Left — Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-950 mb-4 lg:leading-[1.05]">
                Named Among America&apos;s{' '}
                Top CPAs for Valuations
              </h2>
              <p className="text-gold-700 font-bold tracking-[0.4em] uppercase text-base md:text-xl mb-5">Forbes 2025 Honoree</p>

              <div className="flex flex-col gap-4 mb-8">
                <p>
                  Jason Engel has been named among Forbes&apos; inaugural list of America&apos;s Top CPAs in Valuations. This prestigious list was drawn from nominations, independent research, and interviews with industry leaders and experts.
                </p>
              </div>

              <Link
                href="/news-and-insights/jason-engel-forbes-top-cpas-valuations-2025"
                className="inline-flex items-center gap-2 px-7 py-3 bg-primary-950 text-white font-semibold text-sm tracking-wider uppercase rounded-lg hover:bg-[#D4AF37] transition-colors duration-300 hover:text-[#1d2653]"
              >
                Read More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>

            {/* Right — Forbes badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 flex justify-center"
            >
              <Link href="/news-and-insights/jason-engel-forbes-top-cpas-valuations-2025">
                <div className="relative">
                  {/* Soft shadow behind image */}
                  <div className="absolute inset-4 bg-black/5 rounded-2xl blur-xl" />
                  <div className="relative w-80 h-80 md:w-96 md:h-96">
                    <Image
                      src="/images/memberships/forbes.png"
                      alt="Forbes America's Top CPAs for Valuations 2025"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
