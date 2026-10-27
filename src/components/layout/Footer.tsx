import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
// Footer stays a server component: TrackedPhoneLink carries its own
// 'use client' boundary, so only the link hydrates.
import TrackedPhoneLink from '@/components/ui/TrackedPhoneLink'

const services = [
  { name: 'Forensic Accounting', href: '/services/forensic-accounting' },
  { name: 'Expert Witness Testimony', href: '/services/expert-witness-testimony' },
  { name: 'Joint Retention Program', href: '/services/joint-retention-program' },
  { name: 'Internal Investigations', href: '/services/internal-investigations' },
]

const company = [
  { name: 'About Us', href: '/#about' },
  { name: 'Our Team', href: '/team' },
  { name: 'News & Insights', href: '/news-and-insights' },
  { name: 'Careers', href: '/careers' },
  { name: 'Cases', href: '/cases' },
  { name: 'Contact', href: '/contact' },
]

const resources = [
  // { name: 'Calculators', href: '/resources' },
  { name: 'Publications', href: '/publications' },
  { name: 'Blog', href: '/blog' },
]

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white border-t border-white/10 ">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/images/brand/ee-logo-horizontal-white.png"
                alt="Engel & Engel LLP, Forensic Accountants"
                width={1084}
                height={177}
                className="h-10 lg:h-12 w-auto object-contain"
              />
            </div>

            <p className="text-gray-300 mb-6 max-w-md">
              Los Angeles' premier forensic accounting firm with 30+ years of experience
              in complex business litigation and expert witness testimony.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <TrackedPhoneLink
                  phone="(310) 277-2220"
                  location="footer"
                  className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-200"
                >
                  (310) 277-2220
                </TrackedPhoneLink>
              </div>

              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-gray-300">info@engelandengel.com</span>
              </div>

              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-0.5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-300">
                  350 S Grand Avenue, Suite 3160<br />
                  Los Angeles, CA 90071
                </span>
              </div>
            </div>

          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#D4AF37]">Services</h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#D4AF37]">Company</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#D4AF37]">Resources</h3>
            <ul className="space-y-3">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[rgba(255,255,255,0.3)]">
        <div className="container-custom py-6">
          <div className="flex justify-center items-center">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Engel & Engel. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
