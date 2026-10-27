'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { getProcessedReviews, type ProcessedReview } from '@/lib/googleReviews'

// No custom testimonials - using only Google reviews

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [allTestimonials, setAllTestimonials] = useState<ProcessedReview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const testimonialsRef = React.useRef<HTMLElement>(null)

  // Load Google reviews on component mount
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const googleReviews = await getProcessedReviews()
        // Sort by date (newest first)
        googleReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setAllTestimonials(googleReviews)
      } catch (error) {
        console.error('Error loading reviews:', error)
        // Fallback to empty array if Google reviews fail
        setAllTestimonials([])
      } finally {
        setIsLoading(false)
      }
    }

    loadReviews()
  }, [])

  // Handle testimonial selection with smooth scroll
  const handleTestimonialSelect = (index: number) => {
    setActiveTestimonial(index)

    // Smooth scroll to the top of the testimonials section
    if (testimonialsRef.current) {
      testimonialsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section ref={testimonialsRef} className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our clients say about 
            working with Engel & Engel on their most critical financial matters.
          </p>
        </div>

        {/* Featured Testimonial */}
        {!isLoading && allTestimonials.length > 0 && (
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="bg-primary-50 border-primary-200">
              <CardContent className="p-8 md:p-12 text-center">
              <div className="mb-6">
                <svg className="w-12 h-12 text-primary-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              
              <blockquote className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed mb-6">
                "{allTestimonials[activeTestimonial]?.quote}"
              </blockquote>

              {/* Star Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${
                      i < (allTestimonials[activeTestimonial]?.rating || 5)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                  {allTestimonials[activeTestimonial]?.avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    {allTestimonials[activeTestimonial]?.author}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {allTestimonials[activeTestimonial]?.company}
                  </div>
                  {allTestimonials[activeTestimonial]?.source === 'google' && (
                    <div className="flex items-center mt-1">
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-xs text-gray-500">Google Review</span>
                    </div>
                  )}
                </div>
                <div className="hidden sm:block w-px h-12 bg-gray-300 mx-4" />
                <div className="hidden sm:block text-right">
                  <div className="font-bold text-primary-600">
                    {allTestimonials[activeTestimonial]?.result}
                  </div>
                  <div className="text-gray-600 text-sm">
                    Result
                  </div>
                </div>
              </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Testimonial Navigation */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading reviews...</p>
          </div>
        ) : allTestimonials.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No reviews available at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {allTestimonials.map((testimonial, index) => (
              <button
                key={`${testimonial.source}-${index}`}
                onClick={() => handleTestimonialSelect(index)}
                className={`p-6 rounded-lg text-left transition-all duration-200 ${
                  index === activeTestimonial
                    ? 'bg-primary-100 border-2 border-primary-300'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === activeTestimonial ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-gray-600">
                      {testimonial.company}
                    </div>
                    {testimonial.source === 'google' && (
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 ${
                                i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">Google</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className={`text-xs font-semibold ${
                  index === activeTestimonial ? 'text-primary-600' : 'text-gray-500'
                }`}>
                  {testimonial.result}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">25+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">1000+</div>
              <div className="text-sm text-gray-600">Cases Resolved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">$50M+</div>
              <div className="text-sm text-gray-600">Fraud Recovered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
