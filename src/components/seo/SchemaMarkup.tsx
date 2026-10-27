import React from 'react'

interface SchemaMarkupProps {
  type: 'Service' | 'FAQ' | 'Organization' | 'LocalBusiness' | 'ProfessionalService' | 'HowTo' | 'BreadcrumbList'
  data: any
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  const generateSchema = () => {
    const baseContext = "https://schema.org"
    
    switch (type) {
      case 'Service':
      case 'ProfessionalService':
        return {
          "@context": baseContext,
          "@type": "ProfessionalService",
          "name": data.name,
          "description": data.description,
          "provider": {
            "@type": "Organization",
            "name": "Engel & Engel LLP",
            "url": "https://engelandengel.com",
            "logo": "https://engelandengel.com/images/brand/ee-logo-horizontal.png",
            "telephone": "(310) 277-2220",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": data.address?.street || "",
              "addressLocality": "Los Angeles",
              "addressRegion": "CA",
              "postalCode": data.address?.zip || "",
              "addressCountry": "US"
            }
          },
          "areaServed": {
            "@type": "City",
            "name": "Los Angeles"
          },
          "serviceType": data.serviceType || "Forensic Accounting"
        }
      
      case 'FAQ':
        return {
          "@context": baseContext,
          "@type": "FAQPage",
          "mainEntity": data.questions.map((q: any) => ({
            "@type": "Question",
            "name": q.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": q.answer
            }
          }))
        }
      
      case 'Organization':
        return {
          "@context": baseContext,
          "@type": "Organization",
          "name": "Engel & Engel LLP",
          "url": "https://engelandengel.com",
          "logo": "https://engelandengel.com/images/brand/ee-logo-horizontal.png",
          "description": "Forensic Accounting and Expert Witness Services in Los Angeles",
          "telephone": "(310) 277-2220",
          "email": "info@engelandengel.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": data.address?.street || "",
            "addressLocality": "Los Angeles",
            "addressRegion": "CA",
            "postalCode": data.address?.zip || "",
            "addressCountry": "US"
          },
          "sameAs": data.socialMedia || []
        }
      
      case 'LocalBusiness':
        return {
          "@context": baseContext,
          "@type": "ProfessionalService",
          "name": "Engel & Engel LLP",
          "image": "https://engelandengel.com/images/brand/ee-logo-horizontal.png",
          "description": "Forensic Accounting, Expert Witness Testimony, and Litigation Support Services",
          "telephone": "(310) 277-2220",
          "email": "info@engelandengel.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": data.address?.street || "",
            "addressLocality": "Los Angeles",
            "addressRegion": "CA",
            "postalCode": data.address?.zip || "",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": data.geo?.latitude || "",
            "longitude": data.geo?.longitude || ""
          },
          "url": "https://engelandengel.com",
          "priceRange": "$$$$",
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "09:00",
            "closes": "17:00"
          },
          "areaServed": [
            {
              "@type": "City",
              "name": "Los Angeles"
            },
            {
              "@type": "City",
              "name": "Santa Monica"
            },
            {
              "@type": "City",
              "name": "Beverly Hills"
            },
            {
              "@type": "City",
              "name": "Pasadena"
            },
            {
              "@type": "State",
              "name": "California"
            }
          ]
        }

      case 'HowTo':
        return {
          "@context": baseContext,
          "@type": "HowTo",
          "name": data.name,
          "description": data.description,
          "step": data.steps.map((step: any, index: number) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.name,
            "text": step.text
          }))
        }

      case 'BreadcrumbList':
        return {
          "@context": baseContext,
          "@type": "BreadcrumbList",
          "itemListElement": data.items.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": `https://engelandengel.com${item.href}`
          }))
        }

      default:
        return {}
    }
  }

  const schema = generateSchema()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

