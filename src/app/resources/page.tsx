import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { BarChart3, Briefcase, ClipboardList, Percent, PiggyBank, Sprout, TrendingDown, TrendingUp, Scale } from 'lucide-react'

const calculators = [
  {
    title: 'Lost Profits Calculator',
    description: 'Calculate economic damages from lost business profits due to interruption or interference',
    icon: TrendingUp,
    href: '/resources/lost-profits-calculator'
  },
  {
    title: 'Present Value Calculator',
    description: 'Determine the present value of future cash flows for investment analysis',
    icon: PiggyBank,
    href: '/resources/present-value-calculator'
  },
  {
    title: 'Employment Damages Calculator',
    description: 'Calculate economic damages in employment litigation cases',
    icon: Briefcase,
    href: '/resources/employment-damages-calculator'
  },
  {
    title: 'CAGR Calculator',
    description: 'Calculate Compound Annual Growth Rate for investment performance analysis',
    icon: BarChart3,
    href: '/resources/compound-annual-growth-rate-calculator'
  },
  {
    title: 'Financial Ratio Calculator',
    description: 'Analyze financial health with comprehensive ratio calculations',
    icon: ClipboardList,
    href: '/resources/financial-ratio-calculator'
  },
  {
    title: 'Interest Calculator',
    description: 'Calculate simple and compound interest for various scenarios',
    icon: Percent,
    href: '/resources/interest-calculator'
  },
  {
    title: 'Compound Interest Calculator',
    description: 'Calculate compound interest with regular contributions over time',
    icon: Sprout,
    href: '/resources/compound-interest-calculator'
  },
  {
    title: 'Depreciation Calculator',
    description: 'Calculate asset depreciation using multiple accounting methods',
    icon: TrendingDown,
    href: '/resources/depreciation-calculator'
  }
]

export default function ResourcesPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-[var(--hdr)] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="container-custom py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Financial <span className="text-[#d4af37]">Calculators</span>
            </h1>
            <p className="text-xl lg:text-2xl text-primary-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Professional-grade financial calculators for forensic accounting, litigation support, and business analysis
            </p>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Expert Financial Analysis Tools
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access our comprehensive suite of financial calculators designed for forensic accounting professionals, attorneys, and business analysts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {calculators.map((calculator, index) => (
                <Card key={index} className="h-full hover:shadow-xl transition-all duration-300 group border-0 bg-white">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-[#1d2653] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <calculator.icon className="w-8 h-8 text-[#d4af37]" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {calculator.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {calculator.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 mt-auto">
                    <Link href={calculator.href}>
                      <Button
                        as="span"
                        className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform group-hover:scale-105`}
                      >
                        Open Calculator
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Notice */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-primary-50 rounded-2xl p-8 border border-primary-200">
              <div className="w-16 h-16 bg-[#1d2653] rounded-full flex items-center justify-center mx-auto mb-6">
                <Scale className="w-8 h-8 text-[#d4af37]" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Professional Forensic Accounting Services
              </h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                These calculators are provided as professional tools for financial analysis. For complex litigation matters, expert witness testimony, or comprehensive forensic investigations, our certified professionals are here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button as="span" size="lg" className="px-8 py-3">
                    Get Expert Consultation
                  </Button>
                </Link>
                <Link href="/services">
                  <Button as="span" variant="outline" size="lg" className="border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-3">
                    View Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
