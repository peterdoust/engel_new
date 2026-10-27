import React from 'react'

interface EventSchemaProps {
  event: {
    title: string
    description: string
    date: string
    endDate?: string
    time: string
    location: string
    address: string
    type: string
    category: string
    speakers?: string[]
    registrationUrl?: string
    image?: string
  }
  slug: string
}

export default function EventSchema({ event, slug }: EventSchemaProps) {
  const schema = {
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
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.address,
      },
    },
    image: event.image || `https://engelandengel.com/images/events/${slug}.jpg`,
    organizer: {
      '@type': 'Organization',
      name: 'Engel & Engel LLP',
      url: 'https://engelandengel.com',
      logo: 'https://engelandengel.com/images/brand/ee-logo-horizontal.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-310-277-2220',
        contactType: 'Customer Service',
        email: 'events@engelandengel.com',
      },
    },
    performer: event.speakers?.map((speaker) => ({
      '@type': 'Person',
      name: speaker,
    })),
    offers: {
      '@type': 'Offer',
      url: event.registrationUrl || `https://engelandengel.com/events/${slug}`,
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

