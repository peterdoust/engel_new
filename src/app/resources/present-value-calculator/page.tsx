'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CalculatorNavigation from '@/components/CalculatorNavigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { PiggyBank } from 'lucide-react'

interface PVResult {
  presentValue: number
  totalFutureValue: number
  totalDiscount: number
}

export default function PresentValueCalculatorPage() {
  const [inputs, setInputs] = useState({
    futureValue: '',
    discountRate: '',
    numberOfPeriods: '',
    paymentAmount: ''
  })
  const [results, setResults] = useState<PVResult | null>(null)

  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  // Format number input with commas
  const formatNumberInput = (value: string) => {
    const numericValue = value.replace(/[^\d.]/g, '')
    const parts = numericValue.split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }

  // Handle currency input changes
  const handleCurrencyChange = (field: string, value: string) => {
    const formattedValue = formatNumberInput(value)
    setInputs({...inputs, [field]: formattedValue})
  }

  const calculatePresentValue = () => {
    const fv = parseFloat(inputs.futureValue.replace(/[^\d.]/g, '')) || 0
    const rate = parseFloat(inputs.discountRate.replace(/[^\d.]/g, '')) / 100
    const periods = parseFloat(inputs.numberOfPeriods.replace(/[^\d.]/g, ''))
    const payment = parseFloat(inputs.paymentAmount.replace(/[^\d.]/g, '')) || 0

    if (rate >= 0 && periods > 0) {
      let presentValue = 0

      // Calculate present value of lump sum
      if (fv > 0) {
        presentValue += fv / Math.pow(1 + rate, periods)
      }

      // Calculate present value of annuity payments
      if (payment > 0) {
        for (let i = 1; i <= periods; i++) {
          presentValue += payment / Math.pow(1 + rate, i)
        }
      }

      const totalFutureValue = fv + (payment * periods)
      const totalDiscount = totalFutureValue - presentValue

      setResults({
        presentValue,
        totalFutureValue,
        totalDiscount
      })
    }
  }

  const resetCalculator = () => {
    setInputs({
      futureValue: '',
      discountRate: '',
      numberOfPeriods: '',
      paymentAmount: ''
    })
    setResults(null)
  }

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="text-white bg-[#293995] pt-[calc(var(--hdr)+1rem)] pb-10">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Present Value <span className="text-[#d4af37]">Calculator</span>
            </h1>
            <p className="text-xl text-white/80 mb-0 max-w-3xl mx-auto">
              Calculate the present value of future cash flows for investment analysis and financial planning
            </p>
          </div>
        </div>
      </section>

      <div className="bg-gray-50">
        <div className="container-custom py-8">
          <div className="max-w-4xl mx-auto">
            {/* Calculator Section */}
            <Card padding="none" className="mb-8 shadow-lg border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-[#1d2653] to-[#293995] text-white rounded-t-lg p-5 sm:p-6">
                <CardTitle className="text-2xl font-bold flex items-center text-white">
                  <PiggyBank className="w-6 h-6 mr-3 text-[#d4af37]" strokeWidth={1.5} aria-hidden="true" />
                  Present Value Calculator
                </CardTitle>
                <CardDescription className="text-white/80">
                  Calculate present value of future cash flows using discount rates
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 sm:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Input Form */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Future Value ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                        <input
                          type="text"
                          value={inputs.futureValue}
                          onChange={(e) => handleCurrencyChange('futureValue', e.target.value)}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#293995] focus:border-transparent transition-all duration-200"
                          placeholder="100,000.00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Discount Rate (%)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={inputs.discountRate}
                          onChange={(e) => setInputs({...inputs, discountRate: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#293995] focus:border-transparent transition-all duration-200"
                          placeholder="5.00"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Periods
                      </label>
                      <input
                        type="number"
                        value={inputs.numberOfPeriods}
                        onChange={(e) => setInputs({...inputs, numberOfPeriods: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#293995] focus:border-transparent transition-all duration-200"
                        placeholder="Enter number of years/periods"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Payment Amount ($) - Optional
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                        <input
                          type="text"
                          value={inputs.paymentAmount}
                          onChange={(e) => handleCurrencyChange('paymentAmount', e.target.value)}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#293995] focus:border-transparent transition-all duration-200"
                          placeholder="1,000.00"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        onClick={calculatePresentValue}
                        className="flex-1 font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Calculate Present Value
                      </Button>
                      <Button 
                        onClick={resetCalculator}
                        variant="outline"
                        className="px-6 py-3 border-2 border-[#1d2653] text-[#1d2653] hover:bg-primary-50 rounded-lg transition-all duration-200"
                      >
                        Reset
                      </Button>
                    </div>
                  </div>

                  {/* Results Display */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Present Value Results</h3>
                    
                    {results ? (
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <div className="text-sm text-gray-600 mb-1">Present Value</div>
                          <div className="text-2xl font-bold text-[#1d2653]">
                            {formatCurrency(results.presentValue)}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <div className="text-sm text-gray-600 mb-1">Total Future Value</div>
                          <div className="text-lg font-semibold text-gray-800">
                            {formatCurrency(results.totalFutureValue)}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <div className="text-sm text-gray-600 mb-1">Total Discount</div>
                          <div className="text-lg font-semibold text-[#293995]">
                            {formatCurrency(results.totalDiscount)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <PiggyBank className="w-10 h-10 mb-4 mx-auto text-[#1d2653]" strokeWidth={1.5} aria-hidden="true" />
                        <p className="text-sm">Enter values and click "Calculate Present Value" to see results</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Educational Content */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">About Present Value Calculations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Present value calculations are essential in forensic accounting for determining the current worth of future cash flows.
                  This tool helps attorneys, accountants, and financial analysts assess economic damages, investment values, and settlement amounts
                  by discounting future payments to their present value using appropriate discount rates.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Other Calculators Navigation */}
      <CalculatorNavigation currentPath="/resources/present-value-calculator" />

      <Footer />
    </main>
  )
}
