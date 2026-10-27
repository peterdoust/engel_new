'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroV7() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Connection lines between dots
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const dots: Array<{x: number, y: number, vx: number, vy: number}> = []
    for (let i = 0; i < 100; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1
        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(212,175,55,0.3)'
        ctx.fill()
      })
      // Draw connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(212,175,55,${0.08 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
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

  const sublineText = "Let Our Numbers Do The Talking"

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden py-28 bg-primary-950">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Forensic-Accounting-Firm-Los-Angeles-1.jpg"
          alt="Expert Team"
          fill
          className="object-cover brightness-[0.45] contrast-[1.1] grayscale-[30%]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary-950/50" />
      </div>

      {/* Network animation */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[2] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container-custom w-full">
        <div className="max-w-7xl mx-auto">

          {/* Split layout — title left, bullets right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">

            {/* Left — Title area */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tighter leading-[1] mb-3">
                  California&apos;s Top
                </h1>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl italic font-medium text-[#D4AF37] leading-[0.95] drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                  Forensic<br />Accountants
                </h1>

              </motion.div>
            </div>

            {/* Right — Bullets in card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="lg:col-span-5"
            >
              <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-lg p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]/70" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]/70" />

                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-md px-4 py-3 mb-6">
                  <h2 className="text-sm md:text-base font-bold text-[#D4AF37] tracking-[0.3em] uppercase text-center">
                    {sublineText}
                  </h2>
                </div>

                <ul className="space-y-4">
                  {bulletPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.5, duration: 0.9, ease: 'easeOut' }}
                      className={`flex items-center text-base md:text-lg font-medium ${point.isGold ? 'text-[#D4AF37]' : 'text-white/85'}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mr-3 shrink-0 ${point.isGold ? 'bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.5)]' : 'bg-white/30'}`} />
                      <span>{point.text}</span>
                      {point.highlight && (
                        <a href='/cases' className="text-[#D4AF37] underline hover:no-underline decoration-1 underline-offset-4 ml-1">
                          {point.highlight}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>

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
