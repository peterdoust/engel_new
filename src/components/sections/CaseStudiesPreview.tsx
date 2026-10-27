import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const caseStudies = [
  {
    title: 'Manufacturing Company Recovers $2.3M Through Employee Fraud Investigation',
    industry: 'Manufacturing',
    challenge: 'A Los Angeles manufacturing company suspected employee embezzlement after noticing unexplained inventory discrepancies and unusual vendor payments over 18 months.',
    approach: 'Our team conducted a comprehensive forensic audit, analyzing 24 months of financial records, implementing data analytics to identify unusual patterns, and interviewing key personnel under attorney-client privilege.',
    result: 'Uncovered a sophisticated kickback scheme involving the purchasing manager and three vendors. Recovered $2.3M in fraudulent payments, strengthened internal controls, and provided expert testimony leading to successful prosecution.',
    testimonial: "Engel & Engel's thorough investigation not only recovered our losses but helped us implement systems to prevent future fraud. Their professionalism throughout the legal process was exceptional.",
    author: 'CFO, Manufacturing Client',
    amount: '$2.3M Recovered',
    timeframe: '6 weeks',
    href: '/cases'
  },
  {
    title: 'Tech Startup Wins $5M Partnership Dispute with Expert Witness Testimony',
    industry: 'Technology',
    challenge: 'A technology startup faced a complex partnership dispute involving allegations of financial mismanagement and breach of fiduciary duty in a $5M claim.',
    approach: 'We provided comprehensive litigation support including financial analysis, damage calculations, and expert witness testimony. Our team reconstructed financial records and provided clear courtroom presentations.',
    result: 'Successfully defended against all claims and secured a favorable settlement. Our expert testimony was instrumental in demonstrating the validity of financial decisions and business practices.',
    testimonial: "Their expert witness testimony was crucial in our case. The forensic analysis was comprehensive and the courtroom presentation was clear and compelling.",
    author: 'Partner, Law Firm',
    amount: '$5M Case Won',
    timeframe: '4 months',
    href: '/cases'
  },
  {
    title: 'Insurance Company Saves $1.2M Through Claims Fraud Investigation',
    industry: 'Insurance',
    challenge: 'A major insurance company suspected organized fraud in multiple workers compensation claims showing unusual patterns and inflated medical costs.',
    approach: 'Our investigation included medical record analysis, surveillance coordination, financial background checks, and pattern recognition across multiple claims to identify fraudulent activity.',
    result: 'Identified a coordinated fraud ring involving 15 claimants, 3 medical providers, and 2 attorneys. Prevented $1.2M in fraudulent payouts and provided evidence for criminal prosecution.',
    testimonial: "Their meticulous investigation identified fraudulent patterns we missed and provided court-ready documentation that saved our company over $1M in false claims.",
    author: 'Claims Director, Insurance Company',
    amount: '$1.2M Saved',
    timeframe: '8 weeks',
    href: '/cases'
  }
]

export default function CaseStudiesPreview() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real Results for Real Clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how we've helped clients across industries recover millions in losses, 
            win complex litigation, and protect their financial interests through expert forensic accounting.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((study, index) => (
            <Card key={index} hover className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                    {study.industry}
                  </span>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary-600">
                      {study.amount}
                    </div>
                    <div className="text-xs text-gray-500">
                      {study.timeframe}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight mb-3">
                  {study.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">The Challenge</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Our Approach</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {study.approach}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">The Result</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {study.result}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <blockquote className="text-sm text-gray-700 italic mb-2">
                    "{study.testimonial}"
                  </blockquote>
                  <cite className="text-xs text-gray-500 not-italic">
                    — {study.author}
                  </cite>
                </div>
                
                <Link href={study.href}>
                  <Button as="span" variant="outline" size="sm" className="w-full group">
                    Read Full Case Study
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            These are just a few examples of how we've helped clients protect their interests 
            and recover significant losses through expert forensic accounting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cases">
              <Button as="span" size="lg">
                View All Case Studies
              </Button>
            </Link>
            <Link href="/contact">
              <Button as="span" variant="outline" size="lg">
                Discuss Your Case
              </Button>
            </Link>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-soft">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Proven Track Record
            </h3>
            <p className="text-gray-600">
              Our results speak for themselves
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">$50M+</div>
              <div className="text-sm text-gray-600">Total Fraud Recovered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">1000+</div>
              <div className="text-sm text-gray-600">Cases Successfully Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-sm text-gray-600">Expert Witness Testimonies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-sm text-gray-600">Client Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
