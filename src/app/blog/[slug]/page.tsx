import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'

// Real blog posts data from engelandengel.com
import { blogPosts } from '@/lib/blogPosts'
import { applySeoOverride } from '@/lib/seo'

type Props = {
  params: { slug: string }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    return {
      title: 'Post Not Found | Engel & Engel Blog',
      description: 'The requested blog post could not be found.'
    }
  }

  // Everything below is the post's own metadata; applySeoOverride only swaps the
  // title/description when an admin has set one at /admin/seo.
  const metadata: Metadata = {
    title: `${post.title} | Engel & Engel Blog`,
    description: post.description,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: 'Engel & Engel Forensic Accounting',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://engelandengel.com'),
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${params.slug}`,
      siteName: 'Engel & Engel Forensic Accounting',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishDate,
      modifiedTime: post.modifiedDate,
      authors: [post.author],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
      creator: '@engelandengel',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }

  return applySeoOverride(metadata, `/blog/${params.slug}`)
}

export default function BlogPost({ params }: Props) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `https://engelandengel.com${post.image}`,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
      description: post.authorBio,
      worksFor: {
        '@type': 'Organization',
        name: 'Engel & Engel Forensic Accounting'
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'Engel & Engel Forensic Accounting',
      logo: {
        '@type': 'ImageObject',
        url: 'https://engelandengel.com/images/brand/ee-logo-horizontal.png',
        width: 200,
        height: 60
      }
    },
    datePublished: post.publishDate,
    dateModified: post.modifiedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://engelandengel.com/blog/${params.slug}`
    },
    wordCount: post.wordCount,
    keywords: post.tags.join(', '),
    articleSection: post.category,
    about: post.category,
    inLanguage: 'en-US'
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      <main>
        <Header />

        {/* Hero Banner with Full Image - Extends Behind Header */}
        <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </div>

          <div className="relative z-10 h-full flex items-end">
            <div className="container mx-auto px-6 pb-16">
              <div className="max-w-4xl mx-auto">
                {/* Breadcrumb Navigation - Positioned over image */}
                <nav aria-label="Breadcrumb" className="mb-8 hidden">
                  <ol className="flex items-center space-x-2 text-sm text-white/80">
                    <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                    <li className="text-white/60">/</li>
                    <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                    <li className="text-white/60">/</li>
                    <li className="text-white font-medium">{post.category}</li>
                  </ol>
                </nav>

                <div className="mb-4">
                  <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase bg-[#D4AF37] text-primary-950 px-3 py-1">
                    {post.category}
                  </span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {post.title}
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-4xl">
                  {post.description}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-white/90">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-white">{post.author}</div>
                      <div className="text-sm text-white/70">{post.authorRole}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white/80">
                    <span>{new Date(post.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <span key={index} className="text-[10px] font-bold tracking-wider uppercase bg-slate-50 text-slate-500 px-3 py-1.5 border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-ul:my-4 prose-ol:my-4 prose-li:my-1"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

            </div>
          </div>
        </article>

        {/* Related Articles Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary-950 mb-4">Continue Reading</h2>
                <p className="text-xl text-gray-600">
                  Explore more expert insights on forensic accounting and litigation support
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(blogPosts)
                  .filter(([slug]) => slug !== params.slug)
                  .slice(0, 3)
                  .map(([slug, relatedPost]) => (
                    <div key={slug} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.imageAlt}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="text-[10px] font-bold tracking-[0.3em] uppercase bg-[#D4AF37] text-primary-950 px-3 py-1">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 leading-tight">
                          <Link href={`/blog/${slug}`} className="text-primary-950 hover:text-[#293995] transition-colors tracking-tight">
                            {relatedPost.title}
                          </Link>
                        </h3>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {relatedPost.description.length > 120
                            ? `${relatedPost.description.substring(0, 120)}...`
                            : relatedPost.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {relatedPost.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="text-[9px] font-bold tracking-wider uppercase bg-slate-50 text-slate-400 px-2 py-0.5 border border-slate-100">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            <div className="font-medium">{relatedPost.author}</div>
                            <div>{relatedPost.readTime}</div>
                          </div>
                          <Link href={`/blog/${slug}`} className="group">
                            <span className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs group-hover:gap-4 transition-all duration-300">
                              Read
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* View All Articles Button */}
              <div className="text-center mt-12">
                <Link href="/blog">
                  <Button as="span" className="bg-primary-950 hover:bg-black text-white" size="lg">
                    View All Articles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-primary-950 text-white p-8 rounded-lg text-center">
                <h2 className="text-3xl font-bold mb-4 text-white">Need Expert Forensic Accounting Services?</h2>
                <p className="text-blue-100 mb-6 text-lg">
                  Contact Engel & Engel LLP for professional forensic accounting, fraud investigation,
                  and expert witness testimony services. Over 30+ years of experience with hundreds of successful cases.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button as="span" className="bg-white text-primary-950 hover:bg-blue-50" size="lg">
                      Get Free Consultation
                    </Button>
                  </Link>
                  <Link href="/blog">
                    <Button as="span" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-950" size="lg">
                      Read More Articles
                    </Button>
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Call:</span>
                      <span>(310) 277-2220</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Email:</span>
                      <span>info@engelandengel.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
