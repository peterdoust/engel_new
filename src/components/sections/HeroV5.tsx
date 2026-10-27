'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroV5() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
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
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden py-28 bg-primary-950">
      {/* Interactive parallax background — moves with mouse */}
      <div
        className="absolute inset-[-20px] z-0 transition-transform duration-[2000ms] ease-out"
        style={{ transform: `translate(${(mousePos.x - 0.5) * -20}px, ${(mousePos.y - 0.5) * -20}px)` }}
      >
        <Image
          src="/images/hero.webp"
          alt="Expert Team"
          fill
          className="object-cover brightness-[0.5] contrast-[1.1] grayscale-[20%] scale-110"
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-primary-950/40" />

      {/* Horizontal gold lines */}
      <div className="absolute top-[35%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent z-[2] pointer-events-none" />
      <div className="absolute top-[65%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent z-[2] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container-custom w-full">
        <div className="max-w-7xl text-center mx-auto">

          {/* Top line accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-24 h-[2px] bg-[#D4AF37] mx-auto mb-10 origin-center"
          />

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-0 tracking-tighter leading-[1] drop-shadow-2xl"
          >
            California&apos;s Top <br />
            <span className="font-serif text-6xl md:text-8xl lg:text-9xl italic font-medium text-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] mt-1 block">
              Forensic Accountants
            </span>
          </motion.h1>

          {/* Subline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center space-x-6 max-w-4xl mx-auto my-5 md:my-5 lg:my-8"
          >
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
            <h2 className="text-sm md:text-lg lg:text-2xl font-bold text-white md:tracking-[0.3em] lg:tracking-[0.4em] uppercase">
              {sublineText}
            </h2>
            <div className="h-px flex-grow bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-transparent" />
          </motion.div>

          {/* Bullet Points — 2 columns */}
          <div className="flex justify-center">
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 1.2 } } }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2 text-left mb-4 md:mb-6 lg:mb-10"
            >
              {bulletPoints.map((point, index) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className={`flex font-medium items-center text-base md:text-xl lg:text-2xl tracking-tight cursor-default py-1.5 group ${point.isGold ? 'text-[#D4AF37]' : 'text-white'}`}
                >
                  <span className={`w-2 h-[2px] mr-3 shrink-0 group-hover:w-4 transition-all duration-300 ${point.isGold ? 'bg-[#D4AF37]' : 'bg-white/40'}`} />
                  <span className="mr-1">{point.text}</span>
                  {point.highlight && (
                    <a href='/cases' className="text-[#D4AF37] underline hover:no-underline decoration-1 underline-offset-4">
                      {point.highlight}
                    </a>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Bottom line accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 2, ease: [0.22, 1, 0.36, 1] }}
            className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-4 origin-center"
          />

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
      >
        <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent relative">
          <motion.div
            animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#D4AF37] rounded-full blur-[1px]"
          />
        </div>
      </motion.div>
    </section>
  )
}
