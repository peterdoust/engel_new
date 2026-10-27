'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, MotionConfig } from 'framer-motion'

/**
 * Homepage intro ("About the firm") — follows the hero's style:
 * uppercase Midnight Blue heading with an italic last word, gold accents,
 * and the hero's gold tab shape for the "Est. 1994" label.
 * Anchor #about is used by the footer's "About Us" link.
 */

const memberships = [
  { src: '/images/memberships/aicpa.png', alt: 'AICPA — American Institute of CPAs', box: 'h-10 md:h-12 w-32' },
  { src: '/images/memberships/calcpa.png', alt: 'CalCPA — California Society of CPAs', box: 'h-14 md:h-16 w-36' },
  { src: '/images/memberships/acfe.png', alt: 'ACFE — Association of Certified Fraud Examiners', box: 'h-14 md:h-16 w-40' },
  { src: '/images/memberships/aira.png', alt: 'AIRA — Association of Insolvency & Restructuring Advisors', box: 'h-10 md:h-12 w-44' },
  { src: '/images/memberships/nacva.png', alt: 'NACVA — National Association of Certified Valuators and Analysts', box: 'h-16 md:h-20 w-20' },
]

const WRAP = 'mx-auto max-w-[1440px] px-[clamp(20px,5.56vw,80px)]'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } }),
}

function Logo({ m }: { m: (typeof memberships)[number] }) {
  return (
    <div className={`relative flex-shrink-0 ${m.box}`}>
      <Image src={m.src} alt={m.alt} fill sizes="176px" className="object-contain mix-blend-multiply" />
    </div>
  )
}

export default function IntroSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="about" aria-labelledby="intro-title" className="relative bg-white">
        <div className={`${WRAP} grid grid-cols-1 items-center gap-12 py-[clamp(64px,8vw,120px)] lg:grid-cols-12 lg:gap-16`}>
          {/* Text */}
          <motion.div
            className="lg:col-span-7"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <p className="mb-6 flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-cobalt">
              <span aria-hidden="true" className="h-0.5 w-12 bg-brand-gold" />
              About the Firm
            </p>

            <h2 id="intro-title" className="m-0 flex flex-col uppercase text-brand-midnight">
              <span className="font-medium leading-none tracking-[-0.03em] text-[clamp(30px,3.4vw,56px)]">From Strategy</span>
              <span className="mt-1 font-medium leading-none tracking-[-0.03em] text-[clamp(30px,3.4vw,56px)]">
                to <em className="italic">Testimony.</em>
              </span>
              <span className="mt-4 text-[clamp(17px,1.5vw,24px)] font-normal normal-case leading-snug tracking-normal text-brand-cobalt">
                Los Angeles Forensic Accounting Experts
              </span>
            </h2>

            <div className="mt-8 max-w-[640px] space-y-5 text-brand-charcoal">
              <p className="text-[clamp(18px,1.4vw,21px)] leading-relaxed text-brand-midnight">
                Established in Los Angeles in 1994, <strong className="font-semibold">Engel &amp; Engel LLP</strong> provides forensic
                accounting and advisory services in complex business litigation matters across California and nationwide.
              </p>
              <p className="text-base leading-relaxed md:text-[17px]">
                We provide litigation support for plaintiffs and defendants in matters involving fraud investigations, economic
                damages, business valuation, bankruptcy and insolvency, and other financial matters.
              </p>
              <p className="text-base leading-relaxed md:text-[17px]">
                Engel &amp; Engel delivers industry-leading forensic accounting analysis and clear, defensible expert testimony in
                high-stakes matters nationwide. Engel &amp; Engel&apos;s forensic analysis has supported billions of dollars in court
                awards and defenses, and its professionals have been recognized nationally, including Forbes&apos; 2025 Top
                Valuation CPAs.
              </p>
            </div>

            <Link
              href="/team"
              className="group mt-10 inline-flex items-center gap-3 rounded-lg bg-brand-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-brand-midnight no-underline shadow-md transition-colors duration-200 hover:bg-gold-600 hover:text-brand-midnight"
            >
              Meet the Team
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Photo */}
          <motion.div
            className="mx-auto w-full max-w-[460px] lg:col-span-5 lg:max-w-none"
            variants={fadeUp}
            custom={0.15}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {/* This wrapper triggers the frame + tab animations (the tab starts clipped, so it can't trigger itself) */}
            <motion.div className="relative mr-5 mb-5" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
              {/* Gold offset frame — slides out from behind the photo when it comes into view */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 rounded-tr-[26px] border-2 border-brand-gold"
                variants={{
                  hidden: { x: 0, y: 0, opacity: 0 },
                  show: { x: 20, y: 20, opacity: 1, transition: { duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] } },
                }}
              />
              {/* Photo on a pale sky, echoing the hero */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-tr-[26px] bg-gradient-to-b from-[#cfdcf0] via-[#e2e6f0] to-[#f4f6fb]">
                {/* Slow, continuous zoom (CSS: .ee-photo-drift) */}
                <div className="ee-photo-drift absolute inset-0">
                  <Image
                    src="/images/forensic-accounting-experts.png"
                    alt="Downtown Los Angeles office towers"
                    fill
                    sizes="(min-width: 1024px) 40vw, 460px"
                    className="object-cover object-bottom"
                  />
                </div>
                {/* Est. 1994 — same tab shape as the hero's "Our Numbers" tab; rises in after the frame */}
                <motion.div
                  className="absolute bottom-0 left-0 rounded-tr-[clamp(14px,1.5vw,26px)] bg-[rgba(212,175,55,0.95)] px-[clamp(18px,2vw,30px)] py-[clamp(10px,1vw,14px)] text-brand-cobalt"
                  variants={{
                    hidden: { y: '100%' },
                    show: { y: 0, transition: { duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em]">Est.</span>
                  <span className="block text-[clamp(28px,2.6vw,40px)] font-semibold leading-none">1994</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Professional memberships */}
        <div className="bg-brand-slate">
          <div className={`${WRAP} flex flex-col items-center gap-6 py-10 lg:flex-row lg:gap-12`}>
            <p className="flex-shrink-0 text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-cobalt lg:text-left">
              Professional
              <br className="hidden lg:block" /> Memberships
            </p>
            <span aria-hidden="true" className="hidden h-12 w-px bg-brand-midnight/15 lg:block" />
            {/* Logos scroll slowly on every screen size (pause on hover); edges fade out */}
            <div className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
              <div className="ee-logo-marquee flex w-max items-center bg-brand-slate">
                {[0, 1].map(set => (
                  <React.Fragment key={set}>
                    {memberships.map(m => (
                      // Spacing as right padding (not flex gap) so the loop joins seamlessly
                      <div key={`${set}-${m.src}`} className="pr-14 md:pr-20" aria-hidden={set === 1 ? true : undefined}>
                        <Logo m={m} />
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
