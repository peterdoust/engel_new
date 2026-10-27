import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

// VARIATION 3: MODERN CARD-BASED MASONRY LAYOUT
export default function BlogPageVariation3() {
  return (
    <main>
      <Header />
      
      {/* Dynamic Hero with Stats */}
      <section className="pt-16 lg:pt-20 bg-gradient-to-r from-gray-50 to-white">
        <div className="container-custom py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Expert Insights &<br />
                  <span className="text-primary-600">Industry Analysis</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Stay ahead with cutting-edge forensic accounting insights, case studies, 
                  and industry trends from our team of certified experts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg">
                    Latest Articles
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="lg">
                    Subscribe to Newsletter
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-primary-600 mb-2">150+</div>
                  <div className="text-gray-600">Articles Published</div>
                </Card>
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-primary-600 mb-2">25K+</div>
                  <div className="text-gray-600">Monthly Readers</div>
                </Card>
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-primary-600 mb-2">12</div>
                  <div className="text-gray-600">Expert Authors</div>
                </Card>
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-primary-600 mb-2">8</div>
                  <div className="text-gray-600">Categories</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Filter Tabs */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { name: 'All', count: 24, active: true },
              { name: 'Fraud Investigation', count: 8 },
              { name: 'Business Valuation', count: 6 },
              { name: 'Expert Witness', count: 5 },
              { name: 'Digital Forensics', count: 3 },
              { name: 'Insurance', count: 2 }
            ].map((category) => (
              <button
                key={category.name}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  category.active
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry-Style Blog Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Large Featured Card */}
            <Card className="md:col-span-2 lg:row-span-2 overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 lg:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                    <p className="text-sm opacity-75">Featured Article</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 text-primary-700 text-sm font-medium rounded-full">
                    Featured
                  </span>
                </div>
              </div>
              
              <CardHeader className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm text-gray-500">Fraud Investigation</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">8 min read</span>
                </div>
                <CardTitle className="text-2xl leading-tight group-hover:text-primary-600 transition-colors duration-200">
                  The Hidden Cost of Employee Fraud: Why Early Detection Saves Millions
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6 pt-0">
                <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                  Employee fraud costs businesses over $50 billion annually. Learn the warning signs, 
                  detection methods, and prevention strategies that can protect your organization.
                </CardDescription>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      DE
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">David Engel</p>
                      <p className="text-sm text-gray-500">Jan 15, 2024</p>
                    </div>
                  </div>
                  <Button>Read More</Button>
                </div>
              </CardContent>
            </Card>

            {/* Regular Cards */}
            {[
              {
                title: 'Business Valuation in M&A: Avoiding Common Pitfalls',
                excerpt: 'Discover the methodologies and due diligence practices that ensure accurate valuations.',
                author: 'Sarah Chen',
                date: 'Jan 12',
                category: 'Business Valuation',
                readTime: '6 min',
                color: 'from-blue-500 to-blue-600'
              },
              {
                title: 'Expert Witness Testimony: Preparing for Cross-Examination',
                excerpt: 'Learn how to prepare compelling presentations and handle aggressive cross-examination.',
                author: 'Michael Rodriguez',
                date: 'Jan 10',
                category: 'Expert Witness',
                readTime: '7 min',
                color: 'from-green-500 to-green-600'
              },
              {
                title: 'Digital Forensics in Financial Investigations',
                excerpt: 'Explore the tools and techniques used to uncover electronic evidence in financial crimes.',
                author: 'Jennifer Walsh',
                date: 'Jan 8',
                category: 'Digital Forensics',
                readTime: '9 min',
                color: 'from-purple-500 to-purple-600'
              },
              {
                title: 'Insurance Fraud Patterns: What Adjusters Should Know',
                excerpt: 'Learn to identify common fraud patterns and implement effective detection strategies.',
                author: 'David Kim',
                date: 'Jan 5',
                category: 'Insurance Fraud',
                readTime: '5 min',
                color: 'from-red-500 to-red-600'
              },
              {
                title: 'Economic Damages in IP Litigation',
                excerpt: 'Understand the methodologies and challenges in IP damage assessments.',
                author: 'Lisa Thompson',
                date: 'Jan 3',
                category: 'Economic Damages',
                readTime: '10 min',
                color: 'from-orange-500 to-orange-600'
              }
            ].map((post, index) => (
              <Card key={index} className="h-fit hover:shadow-lg transition-all duration-300 group">
                <div className={`relative h-40 bg-gradient-to-br ${post.color} flex items-center justify-center`}>
                  <div className="text-white text-center">
                    <svg className="w-10 h-10 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/20 text-white text-xs font-medium rounded">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-white/80 text-xs">{post.readTime}</span>
                  </div>
                </div>
                
                <CardHeader className="p-4">
                  <CardTitle className="text-lg leading-tight group-hover:text-primary-600 transition-colors duration-200">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-4 pt-0">
                  <CardDescription className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-900">{post.author}</p>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700 p-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More with Animation */}
          <div className="text-center mt-12">
            <Button size="lg" className="group">
              Load More Articles
              <svg className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA with Visual Elements */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Never Miss an Insight
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join 5,000+ professionals who receive our monthly newsletter with the latest 
              forensic accounting insights and industry analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4">
                Subscribe Now
              </Button>
            </div>
            <p className="text-sm text-primary-200 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
