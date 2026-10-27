'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroV6() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Gold particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const pts: Array<{x: number, y: number, size: number, speedX: number, speedY: number, opacity: number}> = []
    for (let i = 0; i < 120; i++) {
      pts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 0.5,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: -Math.random() * 1.2 - 0.3,
        opacity: Math.random() * 0.6 + 0.1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`
        ctx.fill()
        p.x += p.speedX
        p.y += p.speedY
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
        if (p.x < -10 || p.x > canvas.width + 10) p.x = Math.random() * canvas.width
      })
      requestAnimationFrame(animate)
    }
    animate()

    return () => window.removeEventListener('resize', resize)
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
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.webp"
          alt="Expert Team"
          fill
          className="object-cover brightness-[0.45] contrast-[1.1] grayscale-[30%]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/50 via-primary-950/30 to-primary-950/60" />
      </div>

      {/* Gold floating particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[2] pointer-events-none" />

      {/* Vignette */}
      <div className="absolute inset-0 z-[3] pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.5)]" />

      {/* Content */}
      <div className="relative z-10 container-custom w-full">
        <div className="max-w-7xl text-center mx-auto">

          {/* Animated top decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 1.2, delay: 0.5 }} className="h-px bg-[#D4AF37]/60" />
            <div className="w-2 h-2 rotate-45 border border-[#D4AF37]/60" />
            <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 1.2, delay: 0.5 }} className="h-px bg-[#D4AF37]/60" />
          </motion.div>

          {/* Title with stagger */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: '110%', rotateX: -20 }}
              animate={{ y: 0, rotateX: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-tighter leading-[1]"
            >
              California&apos;s Top
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: '110%', rotateX: -20 }}
              animate={{ y: 0, rotateX: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="font-serif text-6xl md:text-8xl lg:text-9xl italic font-medium text-[#D4AF37] leading-[0.95] drop-shadow-[0_0_30px_rgba(212,175,55,0.25)]"
            >
              Forensic Accountants
            </motion.h1>
          </div>

          {/* Subline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center justify-center space-x-6 max-w-4xl mx-auto my-5 md:my-5 lg:my-8"
          >
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
            <h2 className="text-sm md:text-lg lg:text-2xl font-bold text-white md:tracking-[0.3em] lg:tracking-[0.4em] uppercase">
              {sublineText}
            </h2>
            <div className="h-px flex-grow bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-transparent" />
          </motion.div>

          {/* Bullet Points — 3 columns on desktop */}
          <div className="flex justify-center">
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 1.4 } } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 text-left mb-4 md:mb-6 lg:mb-10"
            >
              {bulletPoints.map((point, index) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className={`flex font-medium items-center text-base md:text-lg tracking-tight cursor-default py-1 ${point.isGold ? 'text-[#D4AF37]' : 'text-white'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full mr-3 shrink-0 ${point.isGold ? 'bg-[#D4AF37]' : 'bg-white/40'}`} />
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

          {/* Bottom decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="flex items-center justify-center gap-4 mt-4"
          >
            <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 1.2, delay: 2.5 }} className="h-px bg-[#D4AF37]/60" />
            <div className="w-2 h-2 rotate-45 border border-[#D4AF37]/60" />
            <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 1.2, delay: 2.5 }} className="h-px bg-[#D4AF37]/60" />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
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
