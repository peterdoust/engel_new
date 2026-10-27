import React from 'react'
import Link from 'next/link'
import { BarChart3, Briefcase, ClipboardList, Percent, PiggyBank, Sprout, TrendingDown, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const calculators = [
  {
    title: 'Lost Profits Calculator',
    description: 'Calculate economic damages from lost business profits',
    icon: TrendingUp,
    href: '/resources/lost-profits-calculator'
  },
  {
    title: 'Present Value Calculator',
    description: 'Determine present value of future cash flows',
    icon: PiggyBank,
    href: '/resources/present-value-calculator'
  },
  {
    title: 'Employment Damages Calculator',
    description: 'Calculate damages in employment litigation',
    icon: Briefcase,
    href: '/resources/employment-damages-calculator'
  },
  {
    title: 'CAGR Calculator',
    description: 'Calculate Compound Annual Growth Rate',
    icon: BarChart3,
    href: '/resources/compound-annual-growth-rate-calculator'
  },
  {
    title: 'Financial Ratio Calculator',
    description: 'Analyze financial health with ratio calculations',
    icon: ClipboardList,
    href: '/resources/financial-ratio-calculator'
  },
  {
    title: 'Interest Calculator',
    description: 'Calculate simple and compound interest',
    icon: Percent,
    href: '/resources/interest-calculator'
  },
  {
    title: 'Compound Interest Calculator',
    description: 'Calculate compound interest with contributions',
    icon: Sprout,
    href: '/resources/compound-interest-calculator'
  },
  {
    title: 'Depreciation Calculator',
    description: 'Calculate asset depreciation using multiple methods',
    icon: TrendingDown,
    href: '/resources/depreciation-calculator'
  }
]

interface CalculatorNavigationProps {
  currentPath?: string
}

export default function CalculatorNavigation({ currentPath }: CalculatorNavigationProps) {
  const otherCalculators = calculators.filter(calc => calc.href !== currentPath)

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Other Financial Calculators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our complete suite of professional financial analysis tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {otherCalculators.map((calculator, index) => (
              <Card key={index} className="h-full hover:shadow-xl transition-all duration-300 group border-0 bg-white">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-[#1d2653] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <calculator.icon className="w-7 h-7 text-[#d4af37]" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {calculator.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {calculator.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0 mt-auto">
                  <Link href={calculator.href}>
                    <Button
                      as="span"
                      className={`w-full font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 transform group-hover:scale-105 text-sm`}
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

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/resources">
                <Button as="span" className="font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                  <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  All Calculators
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  as="span"
                  variant="outline"
                  className="border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-all duration-200"
                >
                  Get Expert Help
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
