import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const valuePropositions = [
  {
    title: 'Rapid Response Team',
    description: '24/7 availability for urgent matters with initial response within 24 hours',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    stats: '< 24 Hours Response Time'
  },
  {
    title: 'Court-Proven Expertise',
    description: 'Seasoned professionals with 500+ successful expert witness testimonies',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    stats: '500+ Court Testimonies'
  },
  {
    title: 'Advanced Technology',
    description: 'AI-powered fraud detection and cutting-edge digital forensics tools',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    stats: 'AI-Powered Detection'
  },
  {
    title: 'Confidential & Secure',
    description: 'Bank-level security protocols with strict confidentiality agreements',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    stats: 'Bank-Level Security'
  }
]



export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Engel & Engel?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            When financial integrity is questioned, you need experts who combine 
            deep experience with cutting-edge technology to uncover the truth quickly and accurately.
          </p>
        </div>

        {/* Value Propositions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {valuePropositions.map((prop, index) => (
            <Card key={index} className="text-center h-full">
              <CardHeader>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
                  {prop.icon}
                </div>
                <CardTitle className="text-lg mb-2">{prop.title}</CardTitle>
                <div className="text-2xl font-bold text-primary-600 mb-3">
                  {prop.stats}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {prop.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Experience Highlights */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                35+ Years of Proven Results
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold text-lg">$50M+</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Fraud Losses Recovered</h4>
                    <p className="text-gray-600">Successfully recovered over $50 million in fraudulent losses for our clients through thorough investigations and expert analysis.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-16 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold text-lg">1K+</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Cases Successfully Resolved</h4>
                    <p className="text-gray-600">Over 1,000 complex financial disputes resolved with favorable outcomes for our clients across various industries.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-16 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold text-lg">98%</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Client Satisfaction Rate</h4>
                    <p className="text-gray-600">Consistently high client satisfaction with our thorough approach, clear communication, and successful outcomes.</p>
                  </div>
                </div>
              </div>

              {/* Meet Our Team CTA */}
              <div className="mt-8 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-1">Meet Our Team</h4>
                        <p className="text-primary-100">Expert forensic accountants with decades of experience</p>
                      </div>
                    </div>
                    <Link href="/team">
                      <Button
                        as="span"
                        size="lg"
                        className="bg-white text-primary-700 hover:bg-primary-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                      >
                        View Team
                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Serving Los Angeles & Beyond
              </h3>
              <p className="text-gray-600 mb-6">
                Based in Los Angeles, we provide forensic accounting and expert witness services throughout California and nationwide. Our expertise spans multiple industries and case types.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Service Areas
                  </h4>
                  <ul className="space-y-2 text-gray-600 ml-7">
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>Los Angeles County</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>Orange County</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>San Diego County</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>All of California</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>Nationwide Federal Cases</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Industries Served
                  </h4>
                  <ul className="space-y-2 text-gray-600 ml-7">
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>Real Estate & Construction</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>Technology & IP</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>Healthcare & Medical</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>Manufacturing & Retail</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>Professional Services</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Industry Recognition */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Trusted by Leading Organizations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {/* Placeholder for client logos */}
            <div className="h-12 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 text-sm">Fortune 500</span>
            </div>
            <div className="h-12 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 text-sm">Law Firms</span>
            </div>
            <div className="h-12 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 text-sm">Insurance</span>
            </div>
            <div className="h-12 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 text-sm">Government</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
