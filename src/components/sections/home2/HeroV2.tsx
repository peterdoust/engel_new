'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, memo } from 'react'

const NumberTicker = memo(({ value, duration = 3 }: { value: string, duration?: number }) => {
    const [displayValue, setDisplayValue] = useState('0')
    const numericMatch = value.match(/[\d.]+/)
    const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0
    const suffix = value.replace(/[\d.$+]+/, '')
    const prefix = value.startsWith('$') ? '$' : ''
    const hasPlus = value.includes('+')

    useEffect(() => {
        if (isNaN(numericValue)) {
            setDisplayValue(value)
            return
        }

        let start = 0
        const end = numericValue
        const totalFrames = duration * 60
        let frame = 0

        const timer = setInterval(() => {
            frame++
            const progress = frame / totalFrames
            const current = end * (1 - Math.pow(2, -10 * progress))

            let formattedCurrent = ''
            if (end % 1 === 0) {
                formattedCurrent = Math.floor(current).toString()
            } else {
                formattedCurrent = current.toFixed(1)
            }

            const finalSuffix = hasPlus ? `+${suffix}` : suffix
            if (prefix === '$') {
                setDisplayValue(`${prefix}${formattedCurrent}${finalSuffix}`)
            } else {
                setDisplayValue(`${formattedCurrent}${finalSuffix}`)
            }

            if (frame === totalFrames) {
                clearInterval(timer)
                setDisplayValue(value)
            }
        }, 1000 / 60)

        return () => clearInterval(timer)
    }, [value, duration, numericValue, prefix, suffix, hasPlus])

    return <span>{displayValue}</span>
})
NumberTicker.displayName = 'NumberTicker'

const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' }
    }
}

export default function HeroV2() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    })

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

    const stats = [
        { text: '30+ Year Forensic Accounting Practice' },
        { text: '1,000+  forensic accounting ', highlight: 'Cases' },
        { text: '20 Authored Research Publications' },
        { text: '6 Professional Certifications' },
        { text: 'Big 4 Forensic Experience' },
        { text: '$2.3 Billion Jury Award', isGold: true }
    ]

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#11162D]"
        >
            {/* Cinematic Background Layer */}
            <motion.div style={{ y, scale, opacity }} className="absolute inset-0 z-0">
                <Image
                    src="/images/city.jpg"
                    alt="Expert Team"
                    fill
                    className="object-cover object-top brightness-[0.25] contrast-[1.1] grayscale-[20%]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#11162D]/90 via-transparent to-[#11162D]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(17, 22, 45,0.8)_100%)]" />
            </motion.div>

            <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col items-center text-center">

                    {/* Subtle Institutional Line */}
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: '80px', opacity: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="h-px bg-[#D4AF37] mb-12"
                    />

                    {/* Majestic Headline */}
                    <div className="overflow-hidden mb-8">
                        <motion.h1
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-white tracking-tighter leading-[0.85] uppercase"
                        >
                            California&apos;s Top <br />
                            <span className="font-serif italic font-medium text-[#D4AF37] lowercase tracking-normal">Forensic Accountants</span>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="text-[10px] md:text-xs font-bold text-white uppercase mb-12 whitespace-nowrap flex opacity-80"
                    >
                        Let Our Numbers Do The Talking:
                    </motion.div>

                    {/* Premium Institutional List */}
                    <div className="w-full border-t border-white/5 pt-10 flex justify-center">
                        <motion.ul
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.8,
                                        delayChildren: 2.6
                                    }
                                }
                            }}
                            className="space-y-1 md:space-y-1 text-left inline-block"
                        >
                            {stats.map((stat, index) => (
                                <motion.li
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 60 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 1.0,
                                                ease: [0.16, 1, 0.3, 1]
                                            }
                                        }
                                    }}
                                    className={`flex items-center text-xl font-light tracking-tight group/item cursor-default py-0.5 ${stat.isGold ? 'text-[#D4AF37]' : 'text-white'}`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full mr-3 shrink-0 ${stat.isGold ? 'bg-[#D4AF37]' : 'bg-white/40'}`} />
                                    <span className="mr-1">
                                        {stat.text}
                                    </span>
                                    {stat.highlight && (
                                        <span className="text-[#D4AF37] underline decoration-1 underline-offset-4">
                                            {stat.highlight}
                                        </span>
                                    )}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                </div>
            </div>

            {/* Elegant Scroll Progression */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-30">
                <div className="w-px h-24 bg-gradient-to-b from-[#D4AF37] to-transparent" />
            </div>
        </section>
    )
}
