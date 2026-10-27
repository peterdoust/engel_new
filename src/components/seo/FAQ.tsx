'use client'

import React, { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
  title?: string
}

export default function FAQ({ items, title = "Frequently Asked Questions" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md border border-gray-100"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none group"
              aria-expanded={openIndex === index}
            >
              <span className="text-lg font-semibold text-gray-900 pr-8 group-hover:text-primary-700 transition-colors">
                {item.question}
              </span>
              <svg
                className={`w-6 h-6 text-primary-600 flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openIndex === index && (
              <div className="border-t border-gray-100 bg-gradient-to-b from-gray-100 to-white">
                <div className="px-6 py-5 text-gray-700 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                  {item.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

