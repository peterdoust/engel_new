'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

function NumberTicker({ value, duration = 2 }: { value: string, duration?: number }) {
  const [displayValue, setDisplayValue] = useState('0')
  const numericMatch = value.match(/[\d.]+/)
  const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0
  const suffix = value.replace(/[\d.$]+/, '')
  const prefix = value.startsWith('$') ? '$' : ''

  useEffect(() => {
    if (isNaN(numericValue)) { setDisplayValue(value); return }
    const end = numericValue
    const totalFrames = duration * 60
    let frame = 0
    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const current = end * (1 - Math.pow(2, -10 * progress))
      const formatted = end % 1 === 0 ? Math.floor(current).toString() : current.toFixed(1)
      setDisplayValue(prefix === '$' ? `${prefix}${formatted}${suffix}` : `${formatted}${suffix}`)
      if (frame === totalFrames) { clearInterval(timer); setDisplayValue(value) }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [value, duration, numericValue, prefix, suffix])

  return <span>{displayValue}</span>
}

function StatCard({ label, sub, index }: { label: string, sub: string, index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      initial={{ x: -200, opacity: 0, scale: 0.9, rotateY: -30 }}
      animate={{ x: 0, opacity: 1, scale: 1, rotateY: 0, transition: { type: 'spring', stiffness: 70, damping: 20, delay: 1.5 + (index * 1.5) } }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className="group relative w-full h-[130px] md:h-[150px] p-px rounded-2xl cursor-pointer perspective-1000"
    >
      <div className="relative h-full w-full flex flex-col items-center justify-center bg-white/[0.06] backdrop-blur-xl border border-white/15 rounded-2xl group-hover:bg-white/[0.12] group-hover:border-[#D4AF37]/50 transition-all duration-300 overflow-hidden shadow-2xl">
        <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-700 blur-xl" />
        <div style={{ transform: 'translateZ(20px)' }} className="relative text-3xl md:text-5xl font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors font-serif text-center">
          <NumberTicker value={label} />
        </div>
        <div style={{ transform: 'translateZ(10px)' }} className="relative text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-primary-100 opacity-70 group-hover:opacity-100 transition-opacity text-center leading-tight px-2">
          {sub}
        </div>
      </div>
    </motion.div>
  )
}

export default function HeroV4() {
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
    <section className="relative min-h-screen flex flex-col justify-center content-center overflow-hidden py-28">
      {/* Background — brighter, less dark */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/city.jpg"
          alt="Los Angeles Skyline"
          fill
          className="object-cover brightness-[0.7] contrast-[1.05]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/70 via-primary-950/50 to-primary-950/80" />
      </div>

      {/* Soft light accents */}
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none z-[1]" />
      <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[120px] pointer-events-none z-[1]" />

      {/* Decorative lines */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.06]">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent -translate-x-1/2" />
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative z-10 container-custom w-full flex justify-center content-center flex-col">
        <div className="max-w-7xl text-center">
          <motion.div initial="hidden" animate="visible">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-0 tracking-tighter leading-[1] drop-shadow-2xl"
            >
              California&apos;s Top <br />
              <span className="font-serif text-6xl md:text-8xl lg:text-9xl italic font-medium text-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] mt-1 block">Forensic Accountants</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center justify-center space-x-6 max-w-4xl mx-auto my-5 md:my-5 lg:my-8"
            >
              <div className="h-px flex-grow bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
              <h2 className="text-sm md:text-lg lg:text-2xl font-bold text-white md:tracking-[0.3em] lg:tracking-[0.4em] uppercase">
                {sublineText}
              </h2>
              <div className="h-px flex-grow bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Bullet Points */}
          <div className="flex justify-center">
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.8, delayChildren: 2.6 } }
              }}
              className="space-y-1 md:space-y-1 text-left flex flex-col md:gap-2 gap-1 mb-4 md:mb-6 lg:mb-10"
            >
              {bulletPoints.map((point, index) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 60 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className={`flex font-medium items-center text-base md:text-xl lg:text-2xl tracking-tight group/item cursor-default py-0.5 ${point.isGold ? 'text-[#D4AF37]' : 'text-white'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full mr-3 shrink-0 ${point.isGold ? 'bg-[#D4AF37]' : 'bg-white/40'}`} />
                  <span className="mr-1">{point.text}</span>
                  {point.highlight && (
                    <a href='/cases' className="text-[#D4AF37] underline hover:text-[#D4AF37] hover:no-underline decoration-1 underline-offset-4">
                      {point.highlight}
                    </a>
                  )}
                </motion.li>
              ))}
            </motion.ul>
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
        <div className="w-px h-16 bg-gradient-to-b from-white/40 through-white/10 to-transparent relative">
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
