import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import EventDetailContent from '@/components/events/EventDetailContent'

// Event Data (same as in main events page)
import { eventsData } from '@/lib/eventsData'
import { applySeoOverride } from '@/lib/seo'

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const event = eventsData[params.slug]

  if (!event) {
    return {
      title: 'Event Not Found | Engel & Engel',
    }
  }

  // Everything below is the event's own metadata; applySeoOverride only swaps the
  // title/description when an admin has set one at /admin/seo.
  const metadata: Metadata = {
    title: `${event.title} | Engel & Engel Events`,
    description: event.description,
    keywords: `${event.category}, forensic accounting events, ${event.type}, legal conferences, expert witness, ${event.location}`,
    openGraph: {
      title: event.title,
      description: event.description,
      type: 'article',
      publishedTime: new Date().toISOString(),
      authors: event.speakers,
      url: `https://engelandengel.com/events/${params.slug}`,
      images: [
        {
          url: `https://engelandengel.com/images/events/${params.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: event.description,
      images: [`https://engelandengel.com/images/events/${params.slug}.jpg`],
    },
    alternates: {
      canonical: `https://engelandengel.com/events/${params.slug}`,
    },
  }

  return applySeoOverride(metadata, `/events/${params.slug}`)
}

// Generate static params for all events
export async function generateStaticParams() {
  return Object.keys(eventsData).map((slug) => ({
    slug,
  }))
}

export default function EventPage({ params }: { params: { slug: string } }) {
  const event = eventsData[params.slug]

  if (!event) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <EventDetailContent event={event} />
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: event.title,
            description: event.description,
            startDate: event.date,
            endDate: event.endDate || event.date,
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            location: {
              '@type': 'Place',
              name: event.venue?.name || event.location,
              address: {
                '@type': 'PostalAddress',
                streetAddress: event.venue?.address || event.address,
              },
            },
            organizer: {
              '@type': 'Organization',
              name: 'Engel & Engel LLP',
              url: 'https://engelandengel.com',
            },
            performer: event.speakers?.map((speaker: string) => ({
              '@type': 'Person',
              name: speaker,
            })),
          }),
        }}
      />
      <Footer />
    </main>
  )
}
