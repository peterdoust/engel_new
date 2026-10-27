import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/', '/portal/', '/design-showcase/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/private/', '/admin/', '/portal/', '/design-showcase/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/private/', '/admin/', '/portal/', '/design-showcase/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/', '/portal/', '/design-showcase/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/', '/portal/', '/design-showcase/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/', '/portal/', '/design-showcase/'],
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/', '/portal/', '/design-showcase/'],
      }
    ],
    sitemap: [
      'https://engelandengel.com/sitemap.xml',
      'https://engelandengel.com/blog/sitemap.xml'
    ],
    host: 'https://engelandengel.com'
  }
}
