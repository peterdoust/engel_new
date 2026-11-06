'use client'

import React from 'react'
import Head from 'next/head'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// Real blog posts from engelandengel.com integrated with SEO optimization
const featuredPost = {
  id: 1,
  title: 'How Forensic Accountants Uncover Critical Evidence with Operational and Underlying Business Records',
  excerpt: 'Providing your forensic accountant with operational and underlying business records can be just as critical as providing financial statements, and in some matters it can reveal the key piece of evidence that shifts the direction of a case.',
  author: 'Brandon Engel, CPA, CFE, ABV',
  publishDate: '2024-09-11',
  readTime: '7 min read',
  category: 'Forensic Accounting',
  slug: 'forensic-accountants-uncover-evidence-operational-business-records',
  image: '/images/blog/underlying-records-financial-statements.avif',
  imageAlt: 'Underlying records in financial statements - forensic accounting analysis',
  tags: ['#ForensicAccounting', '#BusinessRecords', '#LegalEvidence', '#ExpertWitness', '#FinancialAnalysis', '#Litigation'],
  url: 'https://engelandengel.com/how-forensic-accountants-uncover-critical-evidence-with-operational-and-underlying-business-records/'
}

const blogPosts = [
  {
    id: 2,
    title: 'What To Look For When Retaining a Forensic Accountant',
    excerpt: 'When litigation hinges on the clarity of financial facts, a skilled forensic accountant can be the difference between prevailing and watching your case unravel.',
    author: 'Brandon Engel, CPA, CFE, ABV',
    publishDate: '2024-07-29',
    readTime: '6 min read',
    category: 'Expert Selection',
    slug: 'what-to-look-for-when-retaining-forensic-accountant',
    image: '/images/blog/retaining-forensic-accountant.avif',
    imageAlt: 'Professional consultation for retaining a forensic accountant - expert selection process',
    tags: ['#ForensicAccountant', '#ExpertWitness', '#LegalConsultation', '#ExpertSelection', '#Litigation', '#BigLaw'],
    url: 'https://engelandengel.com/what-to-look-for-when-retaining-a-forensic-accountant/'
  },
  {
    id: 3,
    title: 'The Most Critical Action Steps for Preserving Evidence after an Embezzlement',
    excerpt: 'Preserving accounting evidence after an embezzlement is crucial for pursuing the perpetrator of the fraud in civil and criminal courts.',
    author: 'Brandon Engel, CPA, CFE, ABV',
    publishDate: '2024-07-14',
    readTime: '8 min read',
    category: 'Fraud Investigation',
    slug: 'critical-action-steps-preserving-evidence-after-embezzlement',
    image: '/images/blog/critical-actions-evidence-embezzlement.avif',
    imageAlt: 'Critical action steps to preserve evidence in an embezzlement case',
    tags: ['#Embezzlement', '#FraudInvestigation', '#EvidencePreservation', '#CertifiedFraudExaminer', '#ForensicAccounting', '#TrialReady'],
    url: 'https://engelandengel.com/the-most-critical-action-steps-for-preserving-evidence-after-an-embezzlement/'
  },
  {
    id: 4,
    title: '4 Key Documents Most Forensic Accounting Experts Need Before Discovery Closes',
    excerpt: 'Whether your forensic accountant is retained to calculate economic damages, conduct a fraud investigation, or perform a business valuation, these four financial documents can almost always serve as the foundation.',
    author: 'Brandon Engel, CPA, CFE, ABV',
    publishDate: '2024-06-24',
    readTime: '5 min read',
    category: 'Document Discovery',
    slug: 'key-documents-forensic-accounting-experts-need-discovery',
    image: '/images/blog/documents-forensic-accountants-need-1.avif',
    imageAlt: 'Key documents that forensic accounting experts need for discovery and analysis',
    tags: ['#LitigationDocuments', '#Discovery', '#ForensicAccounting', '#DamagesExperts', '#BigLaw', '#TrialReady'],
    url: 'https://engelandengel.com/4-key-documents-most-forensic-accounting-experts-need-before-discovery-closes/'
  }
]

const categories = [
  'All',
  'Events',
  'News',
  'Announcements'
]

export default function BlogPage() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 500], [1, 1.1])
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 })

  // Enhanced SEO structured data for search engines
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "The Forensic Accounting Perspective",
    "description": "Expert forensic accounting insights, fraud investigation techniques, and litigation support strategies from certified professionals at Engel & Engel LLP.",
    "url": "https://engelandengel.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Engel & Engel LLP",
      "url": "https://engelandengel.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://engelandengel.com/images/brand/ee-logo-horizontal.png"
      }
    },
    "blogPost": [featuredPost, ...blogPosts].map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": post.publishDate,
      "url": post.url || `https://engelandengel.com/blog/${post.slug}`,
      "image": post.image,
      "keywords": post.tags?.join(', ').replace(/#/g, '') || "forensic accounting, expert witness, litigation support"
    }))
  }

  // Blog page with professional images from engelandengel.com
  return (
    <>
      <Head>
        <title>The Forensic Accounting Perspective | Expert Insights & Analysis | Engel & Engel LLP</title>
        <meta name="description" content="Expert forensic accounting insights, fraud investigation techniques, and litigation support strategies from certified professionals. Stay informed with the latest industry analysis and case studies." />
        <meta name="keywords" content="forensic accounting, fraud investigation, expert witness, litigation support, financial analysis, embezzlement, business valuation, economic damages, big law, trial ready, certified fraud examiner" />
        <meta name="author" content="Engel & Engel LLP" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://engelandengel.com/blog" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://engelandengel.com/blog" />
        <meta property="og:title" content="The Forensic Accounting Perspective | Expert Insights & Analysis" />
        <meta property="og:description" content="Expert forensic accounting insights, fraud investigation techniques, and litigation support strategies from certified professionals." />
        <meta property="og:image" content="https://engelandengel.com/images/og-image.jpg" />
        <meta property="og:site_name" content="Engel & Engel LLP" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://engelandengel.com/blog" />
        <meta property="twitter:title" content="The Forensic Accounting Perspective | Expert Insights & Analysis" />
        <meta property="twitter:description" content="Expert forensic accounting insights, fraud investigation techniques, and litigation support strategies from certified professionals." />
        <meta property="twitter:image" content="https://engelandengel.com/images/og-image.jpg" />

        {/* Additional SEO */}
        <meta name="theme-color" content="#293995" />
        <meta name="msapplication-TileColor" content="#293995" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogStructuredData)
          }}
        />
      </Head>

      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-primary-950">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div style={{ y: y2, scale }} className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[150px] rounded-full" />
          <motion.div style={{ y: y1 }} className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#293995]/10 blur-[120px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        </div>
        <div className="container-custom relative z-10 w-full pb-20 pt-40">
          <motion.div style={{ y: springY1, opacity }} className="max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
              <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.3em] uppercase mb-6">Blog</p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.9]">
                The Forensic Accounting<br />
                <span className="font-serif italic text-[#D4AF37] font-medium">Perspective</span>
              </h1>
              <div className="h-[3px] w-24 bg-[#D4AF37] mt-8" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-10 tracking-tight">Featured Article</h2>
            <Card padding="none" className="overflow-hidden shadow-lg border border-slate-100">
              <div className="md:flex">
                <div className="md:w-1/2 relative h-48 md:h-auto">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.imageAlt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase bg-[#D4AF37] text-primary-950 px-3 py-1">{featuredPost.category}</span>
                    <div className="text-xs opacity-90 mt-2">{featuredPost.readTime}</div>
                  </div>
                </div>
                <div className="md:w-1/2 p-6 md:p-8">
                  <h3 className="text-2xl font-bold mb-4 text-primary-950 tracking-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-slate-500 mb-4 leading-relaxed font-light">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags.map((tag, index) => (
                      <span key={index} className={`${index >= 3 ? 'hidden sm:inline-block' : ''} text-[11px] font-bold tracking-wider uppercase bg-primary-950/5 text-primary-950/70 px-2.5 py-1`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm text-slate-600">
                      <div className="font-semibold text-primary-950">{featuredPost.author}</div>
                      <div>{new Date(featuredPost.publishDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {featuredPost.readTime}</div>
                    </div>
                  </div>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Button as="span" className="bg-primary-950 hover:bg-black text-white">
                      Read Full Article
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Category Filter - Hidden for now
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === 'All Posts' ? 'primary' : 'outline'}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-12 tracking-tight">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                  <Card className="overflow-hidden hover:shadow-[0_20px_60px_-20px_rgba(41, 57, 149,0.15)] transition-all duration-500 group-hover:translate-y-[-6px] cursor-pointer h-full border border-slate-100">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase bg-[#D4AF37] text-primary-950 px-3 py-1">
                          {post.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 text-white/80 text-sm">
                        {post.readTime}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl leading-tight text-primary-950 group-hover:text-[#293995] transition-colors tracking-tight">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <CardDescription className="text-slate-500 mb-3 leading-relaxed font-light flex-1">
                        {post.excerpt}
                      </CardDescription>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-[10px] font-bold tracking-wider uppercase bg-slate-50 text-slate-500 px-2 py-0.5 border border-slate-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                        <div className="text-sm text-slate-600">
                          <div className="font-semibold text-primary-950 text-xs">{post.author}</div>
                          <div className="text-xs">{new Date(post.publishDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {post.readTime}</div>
                        </div>
                        <span className="flex items-center gap-2 text-gold-700 font-bold text-xs group-hover:gap-4 transition-all duration-300">
                          Read
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="relative py-20 bg-[#1D2653] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[10px] font-bold tracking-[0.6em] uppercase text-[#D4AF37] mb-6">Stay Updated</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">
              Get the Latest <span className="font-serif italic text-[#D4AF37] font-medium">Insights</span>
            </h2>
            <p className="text-lg mb-10 text-white/60 font-light leading-relaxed">
              Get the latest insights on forensic accounting, fraud investigation, and expert witness testimony
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
              />
              <button className="px-8 py-4 bg-[#D4AF37] text-[#1D2653] font-bold text-sm tracking-wider uppercase hover:bg-white transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Let Our Numbers Do The Talking - Hidden for now
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        ...
      </section>
      */}

      <Footer />
    </>
  )
}
