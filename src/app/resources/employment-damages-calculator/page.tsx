'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CalculatorNavigation from '@/components/CalculatorNavigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Briefcase } from 'lucide-react'

interface EmploymentDamagesResult {
  totalBackPay: number
  totalFrontPay: number
  totalBenefitsLoss: number
  totalDamages: number
  presentValue: number
}

export default function EmploymentDamagesCalculatorPage() {
  const [inputs, setInputs] = useState({
    annualSalary: '',
    yearsOfBackPay: '',
    yearsOfFrontPay: '',
    benefitsPercentage: '',
    discountRate: '',
    salaryGrowthRate: ''
  })
  const [results, setResults] = useState<EmploymentDamagesResult | null>(null)

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

  const calculateEmploymentDamages = () => {
    const salary = parseFloat(inputs.annualSalary)
    const backPayYears = parseFloat(inputs.yearsOfBackPay)
    const frontPayYears = parseFloat(inputs.yearsOfFrontPay)
    const benefitsRate = parseFloat(inputs.benefitsPercentage) / 100
    const discount = parseFloat(inputs.discountRate) / 100
    const growth = parseFloat(inputs.salaryGrowthRate) / 100

    if (salary > 0 && (backPayYears > 0 || frontPayYears > 0)) {
      let totalBackPay = 0
      let totalFrontPay = 0
      let presentValue = 0

      // Calculate back pay (already occurred, no discounting needed)
      for (let year = 1; year <= backPayYears; year++) {
        const yearSalary = salary * Math.pow(1 + growth, year - 1)
        totalBackPay += yearSalary
      }

      // Calculate front pay (future losses, apply discounting)
      for (let year = 1; year <= frontPayYears; year++) {
        const yearSalary = salary * Math.pow(1 + growth, backPayYears + year - 1)
        totalFrontPay += yearSalary
        
        if (discount > 0) {
          presentValue += yearSalary / Math.pow(1 + discount, year)
        } else {
          presentValue += yearSalary
        }
      }

      const totalSalaryLoss = totalBackPay + totalFrontPay
      const totalBenefitsLoss = totalSalaryLoss * benefitsRate
      const totalDamages = totalSalaryLoss + totalBenefitsLoss
      const finalPresentValue = totalBackPay + presentValue + (totalBenefitsLoss * (totalBackPay / totalSalaryLoss))

      setResults({
        totalBackPay,
        totalFrontPay,
        totalBenefitsLoss,
        totalDamages,
        presentValue: finalPresentValue
      })
    }
  }

  const resetCalculator = () => {
    setInputs({
      annualSalary: '',
      yearsOfBackPay: '',
      yearsOfFrontPay: '',
      benefitsPercentage: '',
      discountRate: '',
      salaryGrowthRate: ''
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
              Employment Damages <span className="text-[#d4af37]">Calculator</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Calculate economic damages in employment litigation cases including back pay and front pay
            </p>
          </div>
        </div>
      </section>

      <div className="bg-gray-50">
        <div className="container-custom py-8">
          <div className="max-w-4xl mx-auto">
            {/* Calculator Section */}
            <Card className="mb-8 shadow-lg border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-[#1d2653] to-[#293995] text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center text-white">
                  <Briefcase className="w-6 h-6 mr-3 text-[#d4af37]" strokeWidth={1.5} aria-hidden="true" />
                  Employment Damages Calculator
                </CardTitle>
                <CardDescription className="text-white/80">
                  Calculate back pay, front pay, and benefits losses in employment litigation
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Input Form */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Annual Salary ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                        <input
                          type="text"
                          value={inputs.annualSalary}
                          onChange={(e) => handleCurrencyChange('annualSalary', e.target.value)}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#293995] focus:border-transparent transition-all duration-200"
                          placeholder="75,000.00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Years of Back Pay
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.yearsOfBackPay}
                        onChange={(e) => setInputs({...inputs, yearsOfBackPay: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#293995] focus:border-transparent transition-all duration-200"
                        placeholder="Enter years from termination to trial"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Years of Front Pay
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.yearsOfFrontPay}
                        onChange={(e) => setInputs({...inputs, yearsOfFrontPay: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#293995] focus:border-transparent transition-all duration-200"
                        placeholder="Enter years of future lost earnings"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Benefits Percentage (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.benefitsPercentage}
                        onChange={(e) => setInputs({...inputs, benefitsPercentage: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#293995] focus:border-transparent transition-all duration-200"
                        placeholder="Enter benefits as % of salary (typically 20-30%)"
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
                        placeholder="Enter discount rate for present value"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Salary Growth Rate (%) - Optional
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputs.salaryGrowthRate}
                        onChange={(e) => setInputs({...inputs, salaryGrowthRate: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#293995] focus:border-transparent transition-all duration-200"
                        placeholder="Enter expected annual salary growth rate"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        onClick={calculateEmploymentDamages}
                        className="flex-1 font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Calculate Damages
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
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Employment Damages Analysis</h3>
                    
                    {results ? (
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <div className="text-sm text-gray-600 mb-1">Total Economic Damages</div>
                          <div className="text-2xl font-bold text-[#1d2653]">
                            {formatCurrency(results.totalDamages)}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <div className="text-sm text-gray-600 mb-1">Back Pay</div>
                          <div className="text-lg font-semibold text-gray-800">
                            {formatCurrency(results.totalBackPay)}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <div className="text-sm text-gray-600 mb-1">Front Pay</div>
                          <div className="text-lg font-semibold text-gray-800">
                            {formatCurrency(results.totalFrontPay)}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <div className="text-sm text-gray-600 mb-1">Benefits Loss</div>
                          <div className="text-lg font-semibold text-[#293995]">
                            {formatCurrency(results.totalBenefitsLoss)}
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
                        <Briefcase className="w-10 h-10 mb-4 mx-auto text-[#1d2653]" strokeWidth={1.5} aria-hidden="true" />
                        <p className="text-sm">Enter employment data and click "Calculate Damages" to see analysis</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Educational Content */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">About Employment Damages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Employment damages calculations are essential in wrongful termination, discrimination, and other employment litigation cases.
                  This calculator helps quantify back pay (past losses), front pay (future losses), and benefits losses,
                  applying appropriate growth rates and discount factors for accurate present value determinations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Other Calculators Navigation */}
      <CalculatorNavigation currentPath="/resources/employment-damages-calculator" />

      <Footer />
    </main>
  )
}
