import { MetadataRoute } from 'next'

// Blog posts data for sitemap generation
const blogPosts = [
  {
    slug: 'hidden-cost-employee-fraud-early-detection-saves-millions',
    publishDate: '2024-01-15T09:00:00-08:00',
    modifiedDate: '2024-01-15T09:00:00-08:00',
    priority: 1.0
  },
  {
    slug: 'business-valuation-ma-avoiding-common-pitfalls',
    publishDate: '2024-01-12T10:30:00-08:00',
    modifiedDate: '2024-01-12T10:30:00-08:00',
    priority: 0.9
  },
  {
    slug: 'expert-witness-testimony-cross-examination-preparation',
    publishDate: '2024-01-10T14:15:00-08:00',
    modifiedDate: '2024-01-10T14:15:00-08:00',
    priority: 0.9
  },
  {
    slug: 'digital-forensics-financial-investigations-2024',
    publishDate: '2024-01-08T11:45:00-08:00',
    modifiedDate: '2024-01-08T11:45:00-08:00',
    priority: 0.8
  },
  {
    slug: 'insurance-fraud-patterns-adjusters-guide',
    publishDate: '2024-01-05T09:30:00-08:00',
    modifiedDate: '2024-01-05T09:30:00-08:00',
    priority: 0.8
  },
  {
    slug: 'economic-damages-intellectual-property-litigation',
    publishDate: '2024-01-03T16:20:00-08:00',
    modifiedDate: '2024-01-03T16:20:00-08:00',
    priority: 0.8
  }
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://engelandengel.com'
  
  // Main blog page
  const blogMainPage = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }
  
  // Individual blog post pages
  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedDate),
    changeFrequency: 'monthly' as const,
    priority: post.priority,
  }))
  
  // Blog category pages
  const categoryPages = [
    'fraud-investigation',
    'business-valuation',
    'expert-witness',
    'digital-forensics',
    'insurance-fraud',
    'economic-damages'
  ].map((category) => ({
    url: `${baseUrl}/blog/category/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [
    blogMainPage,
    ...blogPostPages,
    ...categoryPages
  ]
}
