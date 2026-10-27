'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import TrackedPhoneLink from '@/components/ui/TrackedPhoneLink'
import { cn } from '@/lib/utils'

/**
 * Site header — styled from the approved design (Downloads/Engel_design/EE Home.dc.html).
 * Uppercase menu with a gold underline on hover, navy "Talk to an expert" phone pill,
 * round menu button below 1100px.
 *
 * Two looks:
 *  - solid: white bar, navy logo (light-hero pages via `solid`, and every page once scrolled)
 *  - transparent: white logo and text over the dark heroes on other pages
 */

type NavLink = { name: string; href: string }
type NavItem = { label: string; href: string; items?: NavLink[] }

const practiceAreas: NavLink[] = [
  { name: 'Economic Damages', href: '/practice-areas/economic-damages' },
  { name: 'Fraud Investigation', href: '/practice-areas/fraud-investigation' },
  { name: 'Business Valuation', href: '/practice-areas/business-valuation' },
  { name: 'Bankruptcy & Insolvency', href: '/practice-areas/bankruptcy-insolvency' },
  { name: 'Intellectual Property (IP) Litigation', href: '/practice-areas/ip-litigation' },
  { name: 'Real Estate Litigation', href: '/practice-areas/real-estate-litigation' },
  { name: 'Construction Litigation', href: '/practice-areas/construction-litigation' },
  { name: 'Alter Ego', href: '/practice-areas/alter-ego' },
  { name: 'Fraudulent Transfers', href: '/practice-areas/fraudulent-transfers' },
  { name: 'Employment Litigation', href: '/practice-areas/employment-litigation' },
  { name: 'Business Interruption', href: '/practice-areas/business-interruption' },
  { name: 'Personal Injury', href: '/practice-areas/personal-injury' },
  { name: 'Accounting Malpractice', href: '/practice-areas/accounting-malpractice' },
  { name: 'Partnership / Shareholder Disputes', href: '/practice-areas/partnership-disputes' },
  { name: 'Trust/Probate Litigation', href: '/practice-areas/trust-probate-litigation' },
  { name: 'Defamation Litigation', href: '/practice-areas/defamation' },
]

const services: NavLink[] = [
  { name: 'Forensic Accounting', href: '/services/forensic-accounting' },
  { name: 'Expert Witness Testimony', href: '/services/expert-witness-testimony' },
  { name: 'Joint Retention Program', href: '/services/joint-retention-program' },
  { name: 'Internal Investigations', href: '/services/internal-investigations' },
]

const aboutDropdown: NavLink[] = [
  { name: 'Our Team', href: '/team' },
  { name: 'Blog', href: '/blog' },
  { name: 'News & Insights', href: '/news-and-insights' },
  // { name: 'Events', href: '/events' },
  { name: 'Careers', href: '/careers' },
]

const publicationsDropdown: NavLink[] = [
  { name: 'Economic Damages', href: '/publications/economic-damages' },
  { name: 'Infringement Damages', href: '/publications/infringement-damages' },
  { name: 'Employment Damages', href: '/publications/employment-damages' },
  { name: 'Business Valuation', href: '/publications/business-valuation' },
  { name: 'Fraudulent Transfers', href: '/publications/fraudulent-transfers' },
  { name: 'Alter Ego Publications', href: '/publications/alter-ego' },
  { name: 'Admissibility of Expert Testimony', href: '/publications/expert-testimony' },
  { name: 'Deposition Outline for Officers & Executives', href: '/publications/deposition-outline' },
  { name: 'Document Request for Accounting & Business Records', href: '/publications/document-request' },
]

const NAV: NavItem[] = [
  { label: 'About', href: '/about', items: aboutDropdown },
  { label: 'Cases', href: '/cases' },
  { label: 'Publications', href: '/publications', items: publicationsDropdown },
  { label: 'Services', href: '/services', items: services },
  { label: 'Practices', href: '/practice-areas', items: practiceAreas },
  { label: 'Contact', href: '/contact' },
]

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
  </svg>
)

const Chevron = ({ open, className }: { open: boolean; className?: string }) => (
  <svg
    className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180', className)}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
)

interface HeaderProps {
  /** Show the solid white header from the start (for pages with a light hero). */
  solid?: boolean
}

export default function Header({ solid = false }: HeaderProps) {
  const pathname = usePathname() || '/'
  const [hasScrolled, setHasScrolled] = useState(false)
  const isSolid = hasScrolled || solid
  const [openMenu, setOpenMenu] = useState<string | null>(null) // desktop dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // White bar appears after 10px of scrolling
    const handleScroll = () => setHasScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on outside click or Escape
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null)
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const isActive = (item: NavItem) =>
    pathname === item.href ||
    pathname.startsWith(item.href + '/') ||
    !!item.items?.some(i => pathname === i.href || pathname.startsWith(i.href + '/'))

  // Solid header gets the white bar + navy text; the mobile panel also needs it
  const showBar = isSolid || isMobileMenuOpen

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-[background-color,box-shadow] duration-300',
        showBar ? 'bg-white shadow-[0_1px_0_#e2e6f0,0_6px_24px_rgba(17,22,45,0.06)]' : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex h-[var(--hdr)] max-w-[1440px] items-center justify-between gap-[clamp(16px,2.4vw,40px)] pl-[clamp(20px,5.56vw,80px)] pr-[clamp(20px,4.1vw,60px)]">
        {/* Logo: white over dark heroes, navy on the white bar (both loaded, cross-faded) */}
        <Link href="/" className="relative flex flex-none items-center" aria-label="Engel & Engel LLP, Forensic Accountants - Home">
          <Image
            src="/images/brand/ee-logo-horizontal-white.png"
            alt="Engel & Engel LLP, Forensic Accountants"
            width={1084}
            height={177}
            className={cn('h-[clamp(30px,3.1vw,48px)] w-auto object-contain transition-opacity duration-300', showBar ? 'opacity-0' : 'opacity-100')}
            priority
          />
          <Image
            src="/images/brand/ee-logo-horizontal.png"
            alt=""
            aria-hidden="true"
            width={1084}
            height={177}
            className={cn('absolute inset-0 h-[clamp(30px,3.1vw,48px)] w-auto object-contain transition-opacity duration-300', showBar ? 'opacity-100' : 'opacity-0')}
            priority
          />
        </Link>

        {/* Desktop navigation (1100px+) */}
        <nav ref={navRef} aria-label="Primary" className="ml-auto hidden items-center gap-[clamp(14px,1.8vw,28px)] min-[1100px]:flex">
          {NAV.map(item => {
            const open = openMenu === item.label
            const active = isActive(item)
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.items ? item.label : null)}
                onMouseLeave={() => setOpenMenu(null)}
                onFocus={() => item.items && setOpenMenu(item.label)}
                onBlur={e => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null)
                }}
              >
                <Link
                  href={item.href}
                  aria-haspopup={item.items ? 'true' : undefined}
                  aria-expanded={item.items ? open : undefined}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group flex flex-col items-center gap-1.5 py-2 text-[clamp(15px,1.355vw,21px)] font-semibold uppercase leading-none no-underline transition-colors duration-200',
                    showBar ? 'text-[#4a5175] hover:text-brand-midnight' : 'text-white/90 hover:text-white'
                  )}
                  onClick={() => setOpenMenu(null)}
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-0.5 bg-brand-gold transition-[width] duration-[350ms] ease-[cubic-bezier(.2,.7,.2,1)]',
                      open || active ? 'w-full' : 'w-0 group-hover:w-full group-focus-visible:w-full'
                    )}
                  />
                </Link>

                {item.items && open && (
                  <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                    <div
                      className={cn(
                        'overflow-y-auto rounded-md border-t-2 border-brand-gold bg-white py-2 shadow-[0_18px_40px_rgba(17,22,45,0.16)]',
                        item.items.length > 8 ? 'max-h-[calc(100vh-120px)] w-80' : 'w-64'
                      )}
                    >
                      {item.items.map(sub => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={cn(
                            'block border-l-2 px-5 py-2.5 text-[15px] leading-snug no-underline transition-colors duration-150',
                            pathname === sub.href
                              ? 'border-brand-gold bg-primary-50 text-brand-midnight'
                              : 'border-transparent text-brand-charcoal hover:border-brand-gold hover:bg-primary-50 hover:text-brand-midnight'
                          )}
                          onClick={() => setOpenMenu(null)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="flex flex-none items-center gap-3">
          {/* Phone pill — number shown from 640px, icon only on phones */}
          <TrackedPhoneLink
            phone="+13102772220"
            location="header"
            aria-label="Call (310) 277-2220 - Talk to an expert"
            className={cn(
              'flex items-center gap-[clamp(12px,1.17vw,18px)] rounded-full p-2 no-underline transition-colors duration-300 sm:py-[clamp(8px,1.06vw,16px)] sm:pl-[clamp(12px,1.9vw,28px)] sm:pr-[clamp(20px,2.4vw,36px)]',
              showBar
                ? 'bg-brand-midnight shadow-[0_6px_14px_rgba(17,22,45,0.28)] hover:bg-brand-cobalt'
                : 'border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20'
            )}
          >
            <span className="flex h-[clamp(36px,2.93vw,44px)] w-[clamp(36px,2.93vw,44px)] flex-none items-center justify-center rounded-full bg-brand-gold text-brand-midnight">
              <PhoneIcon className="h-4 w-4" />
            </span>
            <span className="hidden flex-col gap-[clamp(5px,0.6vw,9px)] leading-none sm:flex">
              <span className="text-[clamp(15px,1.3vw,20px)] font-bold text-white">(310) 277-2220</span>
              <span className="text-[clamp(10px,0.84vw,13px)] font-semibold uppercase tracking-[0.12em] text-brand-gold">Talk to an expert</span>
            </span>
          </TrackedPhoneLink>

          {/* Menu button (below 1100px) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(o => !o)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className={cn(
              'flex h-[46px] w-[46px] flex-col items-center justify-center gap-[5px] rounded-full border transition-colors min-[1100px]:hidden',
              showBar ? 'border-brand-slate bg-white' : 'border-white/30 bg-transparent'
            )}
          >
            {isMobileMenuOpen ? (
              <svg className={cn('h-5 w-5', showBar ? 'text-brand-midnight' : 'text-white')} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <>
                <span className={cn('h-0.5 w-[18px]', showBar ? 'bg-brand-midnight' : 'bg-white')} />
                <span className={cn('h-0.5 w-[18px]', showBar ? 'bg-brand-midnight' : 'bg-white')} />
                <span className="ml-1.5 h-0.5 w-3 bg-brand-gold" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute left-0 right-0 top-full max-h-[calc(100vh-var(--hdr))] overflow-y-auto border-t border-brand-slate bg-white px-[clamp(20px,5.56vw,80px)] pb-5 pt-2 shadow-[0_18px_30px_rgba(17,22,45,0.12)] min-[1100px]:hidden"
        >
          {NAV.map(item => {
            const open = openMobileSection === item.label
            return (
              <div key={item.label} className="border-b border-brand-slate">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className={cn(
                      'flex-1 py-4 text-base font-medium uppercase leading-none tracking-[0.08em] no-underline',
                      isActive(item) ? 'text-brand-cobalt' : 'text-brand-midnight'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.items && (
                    <button
                      type="button"
                      className="-mr-2 p-2 text-brand-gold"
                      aria-label={`${open ? 'Hide' : 'Show'} ${item.label} pages`}
                      aria-expanded={open}
                      onClick={() => setOpenMobileSection(open ? null : item.label)}
                    >
                      <Chevron open={open} className="h-5 w-5" />
                    </button>
                  )}
                </div>
                {item.items && open && (
                  <div className="pb-3">
                    {item.items.map(sub => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block border-l-2 border-brand-gold/40 py-2 pl-4 text-[15px] text-brand-charcoal no-underline hover:border-brand-gold hover:text-brand-midnight"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          <TrackedPhoneLink
            phone="+13102772220"
            location="header_mobile"
            className="mt-5 flex items-center justify-center gap-3 rounded-full bg-brand-midnight px-4 py-3.5 font-bold text-white no-underline shadow-md hover:bg-brand-cobalt"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold text-brand-midnight">
              <PhoneIcon className="h-4 w-4" />
            </span>
            (310) 277-2220
          </TrackedPhoneLink>
        </nav>
      )}
    </header>
  )
}
