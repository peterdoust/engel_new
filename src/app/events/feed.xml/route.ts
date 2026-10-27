import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://engelandengel.com'
  
  const events = [
    {
      title: 'California State Bar Annual Meeting 2025',
      slug: 'california-state-bar-annual-meeting-2025',
      description: 'Join us at the California State Bar Annual Meeting where our forensic accounting experts will be available for consultations and networking.',
      date: '2025-10-15',
      location: 'San Diego Convention Center',
      category: 'Legal Conference',
    },
    {
      title: 'Los Angeles County Bar Association - Litigation Section Meeting',
      slug: 'lacba-litigation-section-meeting-2025',
      description: 'Brandon Engel will present on "Maximizing Damages Recovery with Forensic Accounting Evidence" - 1.5 CLE Credits available.',
      date: '2025-11-08',
      location: 'LACBA Conference Center',
      category: 'CLE Seminar',
    },
    {
      title: 'Association of Certified Fraud Examiners (ACFE) Global Fraud Conference',
      slug: 'acfe-global-fraud-conference-2025',
      description: 'Meet our fraud investigation experts at the world\'s largest anti-fraud conference. Visit our booth for insights on forensic accounting and fraud detection.',
      date: '2025-12-05',
      location: 'Las Vegas Convention Center',
      category: 'Fraud Investigation',
    },
  ]

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Engel &amp; Engel - Upcoming Events</title>
    <link>${baseUrl}/events</link>
    <description>Upcoming forensic accounting conferences, legal seminars, and industry events featuring Engel &amp; Engel experts</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/events/feed.xml" rel="self" type="application/rss+xml"/>
    ${events
      .map(
        (event) => `
    <item>
      <title>${event.title}</title>
      <link>${baseUrl}/events/${event.slug}</link>
      <description>${event.description}</description>
      <pubDate>${new Date(event.date).toUTCString()}</pubDate>
      <guid>${baseUrl}/events/${event.slug}</guid>
      <category>${event.category}</category>
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

