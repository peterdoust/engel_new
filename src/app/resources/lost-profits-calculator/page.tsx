'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CalculatorNavigation from '@/components/CalculatorNavigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { TrendingUp } from 'lucide-react'

interface LostProfitsResult {
  totalLostProfits: number
  monthlyLostProfits: number
  presentValue: number
  totalDamages: number
}

export default function LostProfitsCalculatorPage() {
  const [inputs, setInputs] = useState({
    monthlyRevenue: '',
    profitMargin: '',
    lossMonths: '',
    discountRate: '',
    growthRate: ''
  })
  const [results, setResults] = useState<LostProfitsResult | null>(null)

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

  const calculateLostProfits = () => {
    const revenue = parseFloat(inputs.monthlyRevenue.replace(/[^\d.]/g, ''))
    const margin = parseFloat(inputs.profitMargin.replace(/[^\d.]/g, '')) / 100
    const months = parseFloat(inputs.lossMonths.replace(/[^\d.]/g, ''))
    const discount = parseFloat(inputs.discountRate.replace(/[^\d.]/g, '')) / 100 / 12 // Monthly discount rate
    const growth = parseFloat(inputs.growthRate.replace(/[^\d.]/g, '')) / 100 / 12 // Monthly growth rate

    if (revenue > 0 && margin >= 0 && months > 0) {
      const monthlyProfit = revenue * margin
      let totalLostProfits = 0
      let presentValue = 0

      for (let month = 1; month <= months; month++) {
        const adjustedProfit = monthlyProfit * Math.pow(1 + growth, month - 1)
        totalLostProfits += adjustedProfit
        
        if (discount > 0) {
          presentValue += adjustedProfit / Math.pow(1 + discount, month)
        } else {
          presentValue += adjustedProfit
        }
      }

      setResults({
        totalLostProfits,
        monthlyLostProfits: monthlyProfit,
        presentValue,
        totalDamages: presentValue
      })
    }
  }

  const resetCalculator = () => {
    setInputs({
      monthlyRevenue: '',
      profitMargin: '',
      lossMonths: '',
      discountRate: '',
      growthRate: ''
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
              Lost Profits <span className="text-[#d4af37]">Calculator</span>
            </h1>
            <p className="text-xl text-white/80 mb-0 max-w-3xl mx-auto">
              Calculate economic damages from lost business profits due to interruption or interference
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
                  <TrendingUp className="w-6 h-6 mr-3 text-[#d4af37]" strokeWidth={1.5} aria-hidden="true" />
                  Lost Profits Calculator
                </CardTitle>
                <CardDescription className="text-white/80">
                  Calculate economic damages from business interruption and lost opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 sm:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Input Form */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Monthly Revenue ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                        <input
                          type="text"
                          value={inputs.monthlyRevenue}
                          onChange={(e) => handleCurrencyChange('monthlyRevenue', e.target.value)}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#293995] focus:border-transparent transition-all duration-200"
                          placeholder="50,000.00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Profit Margin (%)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={inputs.profitMargin}
                          onChange={(e) => setInputs({...inputs, profitMargin: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#293995] focus:border-transparent transition-all duration-200"
                          placeholder="15.00"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Loss Period (Months)
                      </label>
                      <input
                        type="number"
                        value={inputs.lossMonths}
                        onChange={(e) => setInputs({...inputs, lossMonths: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#293995] focus:border-transparent transition-all duration-200"
                        placeholder="Enter number of months of losses"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Discount Rate (%) - Optional
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputs.discountRate}
                        onChange={(e) => setInputs({...inputs, discountRate: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#293995] focus:border-transparent transition-all duration-200"
                        placeholder="Enter annual discount rate"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Growth Rate (%) - Optional
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputs.growthRate}
                        onChange={(e) => setInputs({...inputs, growthRate: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#293995] focus:border-transparent transition-all duration-200"
                        placeholder="Enter expected annual growth rate"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        onClick={calculateLostProfits}
                        className="flex-1 font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Calculate Lost Profits
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
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Lost Profits Analysis</h3>
                    
                    {results ? (
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <div className="text-sm text-gray-600 mb-1">Total Economic Damages</div>
                          <div className="text-2xl font-bold text-[#1d2653]">
                            {formatCurrency(results.totalDamages)}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <div className="text-sm text-gray-600 mb-1">Monthly Lost Profits</div>
                          <div className="text-lg font-semibold text-gray-800">
                            {formatCurrency(results.monthlyLostProfits)}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <div className="text-sm text-gray-600 mb-1">Total Lost Profits</div>
                          <div className="text-lg font-semibold text-gray-800">
                            {formatCurrency(results.totalLostProfits)}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <div className="text-sm text-gray-600 mb-1">Present Value</div>
                          <div className="text-lg font-semibold text-[#293995]">
                            {formatCurrency(results.presentValue)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <TrendingUp className="w-10 h-10 mb-4 mx-auto text-[#1d2653]" strokeWidth={1.5} aria-hidden="true" />
                        <p className="text-sm">Enter business data and click "Calculate Lost Profits" to see analysis</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Educational Content */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">About Lost Profits Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Lost profits calculations are crucial in business litigation for quantifying economic damages from contract breaches,
                  business interruptions, or competitive interference. This calculator helps forensic accountants and attorneys
                  estimate damages by analyzing historical profitability, loss periods, and applying appropriate discount rates
                  for present value calculations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Other Calculators Navigation */}
      <CalculatorNavigation currentPath="/resources/lost-profits-calculator" />

      <Footer />
    </main>
  )
}
