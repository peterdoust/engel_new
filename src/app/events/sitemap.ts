import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://engelandengel.com'
  
  // Event slugs
  const eventSlugs = [
    'california-state-bar-annual-meeting-2025',
    'lacba-litigation-section-meeting-2025',
    'acfe-global-fraud-conference-2025',
  ]

  const eventPages = eventSlugs.map((slug) => ({
    url: `${baseUrl}/events/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...eventPages,
  ]
}

