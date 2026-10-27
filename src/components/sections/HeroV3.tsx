'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

export default function HeroV3() {
  const [activeWord, setActiveWord] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.8])

  const rotatingWords = ['Damages', 'Fraud', 'Valuation', 'Litigation', 'Testimony']

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % rotatingWords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const bulletPoints = [
    { text: '30+ Year Forensic Accounting Practice' },
    { text: '1,000+ Forensic Accounting ', highlight: 'Cases' },
    { text: '20 Authored Research Publications' },
    { text: '6 Professional Certifications' },
    { text: 'Big 4 Forensic Experience' },
    { text: '$2.3 Billion Jury Award', isGold: true }
  ]

  const sublineText = "Let Our Numbers Do The Talking:"

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-110">
        <Image
          src="/images/hero.webp"
          alt="Expert Team"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 z-[1] bg-primary-950" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-primary-950 via-transparent to-primary-950/60" />

      {/* Content */}
      <div className="relative z-10 container-custom w-full py-28">

        {/* Top — Large Typography */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            <span className="inline-block text-[#D4AF37] text-[11px] font-bold tracking-[0.6em] uppercase border border-[#D4AF37]/30 px-6 py-2">
              Engel & Engel LLP &bull; Est. 1994
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tighter leading-[1.1] mb-4"
          >
            California&apos;s Top
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl italic font-medium text-[#D4AF37] leading-[0.95]"
          >
            Forensic Accountants
          </motion.div>

          {/* Rotating expertise word */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 h-10 flex items-center justify-center gap-3"
          >
            <div className="h-px w-16 bg-[#D4AF37]/40" />
            <div className="flex items-center gap-2 text-white/50 text-sm md:text-base tracking-widest uppercase font-medium">
              <span>Expert in</span>
              <div className="relative w-28 h-7 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeWord}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-0 text-[#D4AF37] font-bold"
                  >
                    {rotatingWords[activeWord]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <div className="h-px w-16 bg-[#D4AF37]/40" />
          </motion.div>
        </div>

        {/* Middle — Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Subline */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            <h2 className="text-sm md:text-lg font-bold text-white tracking-[0.3em] uppercase">
              {sublineText}
            </h2>
            <div className="h-px flex-grow bg-gradient-to-l from-transparent via-[#D4AF37]/40 to-transparent" />
          </div>

          {/* Bullet Points — 2 col centered */}
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 1.5 } } }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 max-w-3xl mx-auto"
          >
            {bulletPoints.map((point, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                }}
                className={`flex font-medium items-center text-base md:text-lg tracking-tight py-1.5 ${point.isGold ? 'text-[#D4AF37]' : 'text-white/90'}`}
              >
                <svg className={`w-4 h-4 mr-3 shrink-0 ${point.isGold ? 'text-[#D4AF37]' : 'text-[#D4AF37]/50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{point.text}</span>
                {point.highlight && (
                  <a href='/cases' className="text-[#D4AF37] underline hover:no-underline decoration-1 underline-offset-4 ml-1">
                    {point.highlight}
                  </a>
                )}
              </motion.li>
            ))}
          </motion.ul>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="mt-12 grid grid-cols-4 border border-white/10 rounded-lg overflow-hidden"
          >
            {[
              { num: '30+', label: 'Years' },
              { num: '1,000+', label: 'Cases' },
              { num: '$2.3B', label: 'Award' },
              { num: '600+', label: 'Testimonies' },
            ].map((s, i) => (
              <div key={i} className={`text-center py-5 ${i < 3 ? 'border-r border-white/10' : ''} bg-white/[0.02] hover:bg-white/[0.06] transition-colors duration-500`}>
                <p className="text-xl md:text-2xl font-bold text-white font-serif">{s.num}</p>
                <p className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]/60 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
