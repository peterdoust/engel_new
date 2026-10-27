import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

// VARIATION 2: MINIMAL TYPOGRAPHY-FOCUSED DESIGN
export default function BlogPageVariation2() {
  return (
    <main>
      <Header />
      
      {/* Minimal Hero */}
      <section className="pt-16 lg:pt-20 bg-white">
        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
                Insights
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                Thoughtful analysis and expert perspectives on forensic accounting, 
                fraud investigation, and financial litigation.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-6 py-4 text-lg border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article - Large Typography */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="text-sm font-medium text-primary-600 uppercase tracking-wider">Featured</span>
            </div>
            
            <article className="mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
                The Hidden Cost of Employee Fraud: Why Early Detection Saves Millions
              </h2>
              
              <div className="flex items-center gap-6 mb-8 text-sm text-gray-500">
                <span>David Engel</span>
                <span>•</span>
                <span>January 15, 2024</span>
                <span>•</span>
                <span>8 min read</span>
              </div>
              
              <p className="text-xl text-gray-700 leading-relaxed mb-8 font-light">
                Employee fraud costs businesses over $50 billion annually. Learn the warning signs, 
                detection methods, and prevention strategies that can protect your organization from 
                devastating financial losses.
              </p>
              
              <Button size="lg" className="rounded-full px-8">
                Continue Reading
              </Button>
            </article>
          </div>
        </div>
      </section>

      {/* Articles List - Clean Typography */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {[
                {
                  title: 'Business Valuation in M&A: Avoiding Common Pitfalls',
                  excerpt: 'Mergers and acquisitions require precise business valuations. Discover the methodologies, red flags, and due diligence practices that ensure accurate valuations.',
                  author: 'Sarah Chen',
                  date: 'January 12, 2024',
                  readTime: '6 min read',
                  category: 'Business Valuation'
                },
                {
                  title: 'Expert Witness Testimony: Preparing for Cross-Examination',
                  excerpt: 'Effective expert witness testimony can make or break a case. Learn how to prepare compelling presentations and handle aggressive cross-examination.',
                  author: 'Michael Rodriguez',
                  date: 'January 10, 2024',
                  readTime: '7 min read',
                  category: 'Expert Witness'
                },
                {
                  title: 'Digital Forensics in Financial Investigations',
                  excerpt: 'Modern fraud investigations require digital forensics expertise. Explore the tools and techniques used to uncover electronic evidence in financial crimes.',
                  author: 'Jennifer Walsh',
                  date: 'January 8, 2024',
                  readTime: '9 min read',
                  category: 'Digital Forensics'
                }
              ].map((post, index) => (
                <article key={index} className="group cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-4 leading-tight group-hover:text-primary-600 transition-colors duration-200">
                        {post.title}
                      </h3>
                      
                      <p className="text-lg text-gray-600 leading-relaxed mb-4 font-light">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 md:mt-0 md:ml-8">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-12"></div>
                </article>
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-16">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                View All Articles
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Sidebar Style */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Categories */}
              <div className="lg:col-span-1">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Categories</h3>
                <div className="space-y-3">
                  {[
                    'Fraud Investigation',
                    'Business Valuation', 
                    'Expert Witness',
                    'Digital Forensics',
                    'Insurance Fraud',
                    'Economic Damages'
                  ].map((category) => (
                    <button
                      key={category}
                      className="block text-left text-gray-600 hover:text-primary-600 transition-colors duration-200"
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                <div className="mt-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Newsletter</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    Get monthly insights delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <Button size="sm" className="w-full">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Recent Articles */}
              <div className="lg:col-span-3">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Recent Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    'Insurance Fraud Patterns: What Adjusters Should Know',
                    'Economic Damages in Intellectual Property Litigation',
                    'Cryptocurrency Fraud: New Challenges for Investigators',
                    'Partnership Disputes: Valuation Complexities'
                  ].map((title, index) => (
                    <article key={index} className="group cursor-pointer">
                      <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2 leading-tight group-hover:text-primary-600 transition-colors duration-200">
                        {title}
                      </h4>
                      <p className="text-sm text-gray-500">5 min read</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
