import { NextResponse } from 'next/server'

// Blog posts data for RSS feed
const blogPosts = [
  {
    title: 'The Hidden Cost of Employee Fraud: Why Early Detection Saves Millions in 2024',
    description: 'Employee fraud costs U.S. businesses over $50 billion annually according to ACFE studies. Discover proven warning signs, advanced detection methods, and prevention strategies that forensic accounting experts use to protect organizations from devastating financial losses.',
    slug: 'hidden-cost-employee-fraud-early-detection-saves-millions',
    author: 'David Engel, CPA, CFE',
    publishDate: '2024-01-15T09:00:00-08:00',
    category: 'Fraud Investigation',
    tags: ['Employee Fraud Detection', 'Internal Controls', 'Risk Management', 'Forensic Accounting', 'Fraud Prevention']
  },
  {
    title: 'Business Valuation in M&A Transactions: Avoiding Common Pitfalls That Cost Millions',
    description: 'Mergers and acquisitions require precise business valuations using DCF, market multiple, and asset-based approaches. Discover the methodologies, red flags, and due diligence practices that forensic accounting experts use to ensure accurate valuations and prevent costly mistakes.',
    slug: 'business-valuation-ma-avoiding-common-pitfalls',
    author: 'Sarah Chen, CPA, ABV',
    publishDate: '2024-01-12T10:30:00-08:00',
    category: 'Business Valuation',
    tags: ['M&A Valuation', 'Due Diligence', 'DCF Analysis', 'Market Multiples', 'Business Appraisal']
  },
  {
    title: 'Expert Witness Testimony: Preparing for Cross-Examination in Financial Litigation',
    description: 'Effective expert witness testimony can make or break a case. Learn how forensic accounting experts prepare compelling presentations and handle aggressive cross-examination in complex financial litigation.',
    slug: 'expert-witness-testimony-cross-examination-preparation',
    author: 'Michael Rodriguez, CPA, CFF',
    publishDate: '2024-01-10T14:15:00-08:00',
    category: 'Expert Witness',
    tags: ['Litigation Support', 'Expert Testimony', 'Court Preparation', 'Financial Litigation']
  }
]

export async function GET() {
  const baseUrl = 'https://engelandengel.com'
  
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:wfw="http://wellformedweb.org/CommentAPI/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
     xmlns:slash="http://purl.org/rss/1.0/modules/slash/">
  <channel>
    <title>Engel &amp; Engel Forensic Accounting Blog</title>
    <atom:link href="${baseUrl}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <link>${baseUrl}/blog</link>
    <description>Expert insights on forensic accounting, fraud investigation, business valuation, and litigation support from certified professionals.</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <language>en-US</language>
    <sy:updatePeriod>weekly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <generator>Next.js</generator>
    <managingEditor>info@engelandengel.com (Engel &amp; Engel)</managingEditor>
    <webMaster>info@engelandengel.com (Engel &amp; Engel)</webMaster>
    <category>Forensic Accounting</category>
    <category>Fraud Investigation</category>
    <category>Business Valuation</category>
    <category>Expert Witness</category>
    <image>
      <url>${baseUrl}/images/brand/ee-logo-horizontal.png</url>
      <title>Engel &amp; Engel Forensic Accounting</title>
      <link>${baseUrl}/blog</link>
      <width>200</width>
      <height>60</height>
    </image>
    ${blogPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
      <dc:creator><![CDATA[${post.author}]]></dc:creator>
      <category><![CDATA[${post.category}]]></category>
      ${post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('')}
      <content:encoded><![CDATA[
        <p>${post.description}</p>
        <p><strong>Category:</strong> ${post.category}</p>
        <p><strong>Author:</strong> ${post.author}</p>
        <p><strong>Tags:</strong> ${post.tags.join(', ')}</p>
        <p><a href="${baseUrl}/blog/${post.slug}">Read the full article</a></p>
      ]]></content:encoded>
    </item>`).join('')}
  </channel>
</rss>`

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
    }
  })
}
