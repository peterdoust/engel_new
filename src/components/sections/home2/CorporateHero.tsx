'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
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
    { text: '1,000+  forensic accounting ', highlight: 'Cases' },
    { text: '20 Authored Research Publications' },
    { text: '6 Professional Certifications' },
    { text: 'Big 4 Forensic Experience' },
    { text: '$2.3 Billion Jury Award', isGold: true }
]

export default function CorporateHero() {
    return (
        <section className="relative h-[85vh] min-h-[700px] flex items-center bg-[#11162D] overflow-hidden">
            {/* High-End Corporate Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/city.jpg"
                    alt="Expert Team"
                    fill
                    className="object-cover object-top brightness-[0.3]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#11162D] via-[#11162D]/60 to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto px-6 lg:px-12">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight uppercase">
                            California&apos;s Top <br />
                            <span className="text-[#D4AF37] font-serif italic font-medium lowercase">Forensic Accountants</span>
                        </h1>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex items-center space-x-4 mb-8"
                        >
                            <div className="h-px w-8 bg-[#D4AF37]" />
                            <h2 className="text-white/80 text-lg md:text-xl tracking-[0.4em] uppercase font-bold">
                                Let Our Numbers Do The Talking:
                            </h2>
                        </motion.div>
                    </motion.div>

                    <div className="pt-8 border-t border-white/10">
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
                            className="space-y-1 md:space-y-1 text-left inline-block w-full"
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
        </section>
    )
}
