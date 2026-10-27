'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

function NumberTicker({ value, duration = 3 }: { value: string, duration?: number }) {
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
            // Ease out expo for smoothness
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
}

const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' }
    }
}

const stats = [
    { text: '30+ Year Forensic Accounting Practice' },
    { text: ' ', highlight: 'Cases' },
    { text: '20 Authored Research Publications' },
    { text: '6 Professional Certifications' },
    { text: 'Big 4 Forensic Experience' },
    { text: '$2.3 Billion Jury Award', isGold: true }
]

export default function PremiumHero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    })

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

    return (
        <section
            ref={containerRef}
            className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-[#11162d]"
        >
            {/* Cinematic Background */}
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <Image
                    src="/images/city.jpg"
                    alt="Expert Team"
                    fill
                    className="object-cover object-top brightness-[0.3] contrast-[1.2] scale-[1.05]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#11162d]/40 to-[#11162d]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(17, 22, 45,0.7)_100%)]" />
            </motion.div>

            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 100 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-1 bg-[#D4AF37] mx-auto mb-10"
                    />

                    <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-bold text-white tracking-tighter leading-[0.8] mb-12 uppercase">
                        California&apos;s Top <br />
                        <span className="font-serif italic font-medium text-[#D4AF37] lowercase tracking-normal">Forensic Accountants</span>
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="flex items-center justify-center space-x-8 mb-16 max-w-2xl mx-auto"
                    >
                        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
                        <h2 className="text-xs md:text-sm font-bold text-white tracking-[0.8em] uppercase whitespace-nowrap opacity-80">
                            Let Our Numbers Do The Talking:
                        </h2>
                        <div className="h-px flex-grow bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-transparent" />
                    </motion.div>
                </motion.div>

                {/* Premium Institutional List */}
                <div className="flex justify-center pt-4 max-w-4xl mx-auto">
                    <motion.ul
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.8,
                                    delayChildren: 2.8
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

            {/* Decorative architectural elements */}
            <div className="absolute left-10 bottom-10 flex flex-col items-center space-y-4 opacity-20">
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-white [writing-mode:vertical-lr] rotate-180">Discovery</span>
                <div className="w-px h-24 bg-white" />
            </div>

            <div className="absolute right-10 bottom-10 flex flex-col items-center space-y-4 opacity-20">
                <div className="w-px h-24 bg-white" />
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-white [writing-mode:vertical-lr]">Accuracy</span>
            </div>
        </section>
    )
}
