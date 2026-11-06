'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CalculatorNavigation from '@/components/CalculatorNavigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BarChart3 } from 'lucide-react'

interface CAGRResult {
  cagr: number
  totalGrowth: number
  totalReturn: number
}

export default function CAGRCalculatorPage() {
  const [inputs, setInputs] = useState({
    beginningValue: '',
    endingValue: '',
    numberOfYears: ''
  })
  const [results, setResults] = useState<CAGRResult | null>(null)

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

  const calculateCAGR = () => {
    const beginning = parseFloat(inputs.beginningValue.replace(/[^\d.]/g, ''))
    const ending = parseFloat(inputs.endingValue.replace(/[^\d.]/g, ''))
    const years = parseFloat(inputs.numberOfYears.replace(/[^\d.]/g, ''))

    if (beginning > 0 && ending > 0 && years > 0) {
      const cagr = (Math.pow(ending / beginning, 1 / years) - 1) * 100
      const totalGrowth = ((ending - beginning) / beginning) * 100
      const totalReturn = ending - beginning

      setResults({
        cagr,
        totalGrowth,
        totalReturn
      })
    }
  }

  const resetCalculator = () => {
    setInputs({
      beginningValue: '',
      endingValue: '',
      numberOfYears: ''
    })
    setResults(null)
  }

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-[var(--hdr)] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              CAGR <span className="text-[#d4af37]">Calculator</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Calculate Compound Annual Growth Rate for investment performance analysis
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
                  <BarChart3 className="w-6 h-6 mr-3 text-[#d4af37]" strokeWidth={1.5} aria-hidden="true" />
                  CAGR Calculator
                </CardTitle>
                <CardDescription className="text-white/80">
                  Calculate the compound annual growth rate of investments or business metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 sm:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Input Form */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Beginning Value ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                        <input
                          type="text"
                          value={inputs.beginningValue}
                          onChange={(e) => handleCurrencyChange('beginningValue', e.target.value)}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#293995] focus:border-transparent transition-all duration-200"
                          placeholder="10,000.00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ending Value ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                        <input
                          type="text"
                          value={inputs.endingValue}
                          onChange={(e) => handleCurrencyChange('endingValue', e.target.value)}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#293995] focus:border-transparent transition-all duration-200"
                          placeholder="25,000.00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Years
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.numberOfYears}
                        onChange={(e) => setInputs({...inputs, numberOfYears: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#293995] focus:border-transparent transition-all duration-200"
                        placeholder="Enter investment period in years"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        onClick={calculateCAGR}
                        className="flex-1 font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Calculate CAGR
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
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">CAGR Analysis</h3>
                    
                    {results ? (
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <div className="text-sm text-gray-600 mb-1">Compound Annual Growth Rate</div>
                          <div className="text-2xl font-bold text-[#1d2653]">
                            {results.cagr.toFixed(2)}%
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <div className="text-sm text-gray-600 mb-1">Total Growth</div>
                          <div className="text-lg font-semibold text-gray-800">
                            {results.totalGrowth.toFixed(2)}%
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <div className="text-sm text-gray-600 mb-1">Total Return</div>
                          <div className="text-lg font-semibold text-[#293995]">
                            {formatCurrency(results.totalReturn)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <BarChart3 className="w-10 h-10 mb-4 mx-auto text-[#1d2653]" strokeWidth={1.5} aria-hidden="true" />
                        <p className="text-sm">Enter investment data and click "Calculate CAGR" to see analysis</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Educational Content */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">About CAGR Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Compound Annual Growth Rate (CAGR) is a useful measure for analyzing investment performance over time. 
                  It represents the mean annual growth rate of an investment over a specified period longer than one year. 
                  CAGR is particularly valuable in forensic accounting for assessing business growth, investment returns, 
                  and economic damages in litigation cases.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Other Calculators Navigation */}
      <CalculatorNavigation currentPath="/resources/compound-annual-growth-rate-calculator" />

      <Footer />
    </main>
  )
}
