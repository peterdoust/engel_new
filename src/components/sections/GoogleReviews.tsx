'use client'

import React, { useState, useEffect, useRef } from 'react'

interface Review {
  name: string
  rating: number
  text: string
  title?: string
}

const reviews: Review[] = [
  {
    name: 'Mark K.',
    rating: 5,
    text: 'I am a real estate litigation attorney who has used Jason Engel as my forensic accounting expert in two multi-million dollar cases. He is eminently responsive and able to synthesize complicated financial transactions so that the fact-finder may easily understand them at trial.\n\nI highly recommend him and intend to use him again if the need arises.',
  },
  {
    name: 'Eric K.',
    rating: 5,
    text: 'I used Jason in a contentious breach of contract case with eight-figure damages. The case was barreling toward trial, and Jason was asked to provide his analysis and opinion in a very short time frame and under significant pressure from the client. Jason and his team did a fantastic job. He was extremely responsive and his report was exactly what we needed. I will use Jason again.',
  },
  {
    name: 'Michael S.',
    rating: 5,
    text: "I have had the privilege of using Jason Engel's professional services for many years. Simply stated, he is not only excellent at what he does, he is a creative problem solver who always has innovative ways to advance my clients' interests. I would recommend him without reservation to anyone who is in need of the many services he provides.",
  },
  {
    name: 'Geoffrey G.',
    rating: 5,
    text: 'Jason is the kind of expert witness you want. One who is always going to provide a well-supported expert opinion. His opinion is independent. It might not always be the one you would hope to hear. But it is the one that is right and correct. Jason is careful, attentive to detail and thorough. He presents well at trial. And he is a pleasure to work with. He has my highest recommendation.',
  },
  {
    name: 'Brian F.',
    rating: 5,
    text: 'We hired Engel & Engel as a forensic accountant on a construction defect case. We found Jason and Brandon to both be knowledgeable, responsive and professional. We will definitely use them again.',
  },
  {
    name: 'Ed M.',
    rating: 5,
    text: 'Jason Engel and his team are professional, knowledgeable, honest, and trustworthy. I would recommend Engel & Engel for any accounting matters.',
  },
  {
    name: 'Phillip S.',
    rating: 5,
    text: 'Excellent forensic accounting experts. Sharp analysis and clear presentation. Timely follow through and ability to work under short deadlines.',
  },
  {
    name: 'David S.',
    rating: 5,
    text: 'Amazing and thorough job as experts in a Piercing the Corporate Veil case. Very thankful.',
  },
  {
    name: 'Eric W.',
    rating: 5,
    text: 'The Engels are the best in the business, hands down. They are a remarkable father-son duo, and I had the opportunity to work with them on a very high-stakes, company-breaking matter. They were outstanding from start to finish. They reviewed opposing counsel’s expert work and professionally dismantled it with precision and credibility. They updated their reports in real time when needed, responded thoroughly to the arbitrator’s inquiries, and provided strong backup for every position they took. Our success was due in large part to having the Engels in our corner. I recommend them without hesitation.',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-[#D4AF37]' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) setVisibleCount(1)
      else if (window.innerWidth < 1024) setVisibleCount(2)
      else setVisibleCount(3)
    }
    updateVisible()
    window.addEventListener('resize', updateVisible)
    return () => window.removeEventListener('resize', updateVisible)
  }, [])

  useEffect(() => {
    const maxIndex = Math.max(0, reviews.length - visibleCount)
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex)
  }, [visibleCount, currentIndex])

  const toggleExpand = (index: number) => {
    setExpandedCards((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const maxIndex = Math.max(0, reviews.length - visibleCount)
  const cardWidth = 100 / visibleCount

  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  // Auto-scroll every 6 seconds (pauses briefly after user interaction)
  const [isPaused, setIsPaused] = useState(false)
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const pauseAutoplay = () => {
    setIsPaused(true)
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 10000)
  }

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 6000)
    return () => clearInterval(interval)
  }, [isPaused, maxIndex])

  // Touch / swipe support for mobile
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const distance = touchStartX.current - touchEndX.current
    const minSwipe = 50
    if (distance > minSwipe) {
      next()
      pauseAutoplay()
    } else if (distance < -minSwipe) {
      prev()
      pauseAutoplay()
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-gold-700 font-bold tracking-[0.4em] uppercase text-xs">Client Testimonials</span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-950 mb-8">
            What Our <span className="font-serif italic text-gold-700">Clients</span> Say
          </h2>
        </div>

        {/* Reviews */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={() => { prev(); pauseAutoplay(); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-14 z-10 w-11 h-11 rounded-full border-2 border-primary-950/20 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] text-primary-950/40 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => { next(); pauseAutoplay(); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-14 z-10 w-11 h-11 rounded-full border-2 border-primary-950/20 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] text-primary-950/40 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Sliding track */}
          <div
            className="overflow-hidden pt-10"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * cardWidth}%)` }}
            >
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${cardWidth}%` }}
                >
                  <div className="relative bg-[#F8F6F3] rounded-2xl pt-16 pb-8 px-8 text-center group hover:shadow-lg transition-shadow duration-500 h-full">
                    {/* Avatar */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                      <div className="w-16 h-16 rounded-full bg-primary-950 flex items-center justify-center text-[#D4AF37] font-bold text-2xl shadow-lg border-4 border-white">
                        {review.name.charAt(0)}
                      </div>
                    </div>

                    {/* Name */}
                    <h4 className="font-bold text-primary-950 text-base">{review.name}</h4>
                    {review.title ? (
                      <p className="text-gray-500 text-xs italic mb-2">{review.title}</p>
                    ) : (
                      <div className="mb-2" />
                    )}

                    {/* Stars */}
                    <div className="flex justify-center mb-4">
                      <StarRating rating={review.rating} />
                    </div>

                    {/* Review text */}
                    <div className="relative">
                      <p className={`text-gray-500 text-sm leading-relaxed mb-2 ${
                        expandedCards.has(index) ? '' : 'line-clamp-6'
                      }`}>
                        {review.text}
                      </p>
                      {review.text.length > 200 && (
                        <button
                          onClick={() => toggleExpand(index)}
                          className="text-gold-700 text-xs font-semibold hover:underline transition-all"
                        >
                          {expandedCards.has(index) ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => { setCurrentIndex(index); pauseAutoplay(); }}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-[#D4AF37] w-8 h-2'
                    : 'bg-gray-200 w-2 h-2 hover:bg-[#D4AF37]/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
