import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import EventsContent from '@/components/events/EventsContent'

// SEO metadata moved to ./layout.tsx so it is editable at /admin/seo.

// Upcoming Events Data
const upcomingEvents = [
  {
    id: 1,
    title: 'California State Bar Annual Meeting 2025',
    slug: 'california-state-bar-annual-meeting-2025',
    date: '2025-10-15',
    endDate: '2025-10-17',
    time: '9:00 AM - 5:00 PM',
    location: 'San Diego Convention Center',
    address: '111 W Harbor Dr, San Diego, CA 92101',
    type: 'Conference',
    category: 'Legal Conference',
    description: 'Join us at the California State Bar Annual Meeting where our forensic accounting experts will be available for consultations and networking.',
    fullDescription: 'The California State Bar Annual Meeting is the premier gathering of legal professionals in California. Engel & Engel will be exhibiting and available for one-on-one consultations about forensic accounting, expert witness testimony, and litigation support services.',
    image: '/images/events/state-bar-conference.jpg',
    imageAlt: 'California State Bar Annual Meeting - Engel & Engel Booth',
    featured: true,
    booth: 'Booth #245',
    speakers: ['Brandon Engel, CPA, CFE, ABV', 'David Engel, CPA, CFE'],
    topics: ['Forensic Accounting in Complex Litigation', 'Expert Witness Best Practices', 'Fraud Investigation Techniques'],
    registrationUrl: 'https://www.calbar.ca.gov/annual-meeting',
    contactEmail: 'events@engelandengel.com',
    contactPhone: '(310) 277-2220',
  },
  {
    id: 2,
    title: 'Los Angeles County Bar Association - Litigation Section Meeting',
    slug: 'lacba-litigation-section-meeting-2025',
    date: '2025-11-08',
    endDate: '2025-11-08',
    time: '12:00 PM - 2:00 PM',
    location: 'LACBA Conference Center',
    address: '1055 W 7th St, Los Angeles, CA 90017',
    type: 'Seminar',
    category: 'CLE Seminar',
    description: 'Brandon Engel will present on "Maximizing Damages Recovery with Forensic Accounting Evidence" - 1.5 CLE Credits available.',
    fullDescription: 'Join Brandon Engel, CPA, CFE, ABV for an interactive CLE seminar focused on leveraging forensic accounting evidence to maximize damages recovery in complex litigation. This presentation will cover real-world case studies and practical strategies for working with forensic accounting experts.',
    image: '/images/events/lacba-seminar.jpg',
    imageAlt: 'LACBA Litigation Section Meeting - Brandon Engel Presenting',
    featured: true,
    booth: null,
    speakers: ['Brandon Engel, CPA, CFE, ABV'],
    topics: ['Damages Calculation Methodologies', 'Working with Expert Witnesses', 'Evidence Preservation Strategies'],
    registrationUrl: 'https://www.lacba.org/events',
    contactEmail: 'events@engelandengel.com',
    contactPhone: '(310) 277-2220',
    cleCredits: '1.5 CLE Credits',
  },
  {
    id: 3,
    title: 'Association of Certified Fraud Examiners (ACFE) Global Fraud Conference',
    slug: 'acfe-global-fraud-conference-2025',
    date: '2025-12-05',
    endDate: '2025-12-07',
    time: '8:00 AM - 6:00 PM',
    location: 'Las Vegas Convention Center',
    address: '3150 Paradise Rd, Las Vegas, NV 89109',
    type: 'Conference',
    category: 'Fraud Investigation',
    description: 'Meet our fraud investigation experts at the world\'s largest anti-fraud conference. Visit our booth for insights on forensic accounting and fraud detection.',
    fullDescription: 'The ACFE Global Fraud Conference brings together fraud examiners, forensic accountants, and anti-fraud professionals from around the world. Engel & Engel will be exhibiting and presenting on advanced fraud investigation techniques.',
    image: '/images/events/acfe-conference.jpg',
    imageAlt: 'ACFE Global Fraud Conference - Engel & Engel Experts',
    featured: true,
    booth: 'Booth #512',
    speakers: ['Brandon Engel, CPA, CFE, ABV', 'David Engel, CPA, CFE'],
    topics: ['Embezzlement Detection', 'Financial Statement Fraud', 'Digital Forensics in Fraud Cases'],
    registrationUrl: 'https://www.acfe.com/fraud-conference',
    contactEmail: 'events@engelandengel.com',
    contactPhone: '(310) 277-2220',
  },
  {
    id: 4,
    title: 'ABA Section of Litigation Annual Conference',
    slug: 'aba-litigation-conference-2026',
    date: '2026-04-22',
    endDate: '2026-04-24',
    time: '8:30 AM - 5:30 PM',
    location: 'Marriott Marquis, Washington D.C.',
    address: '901 Massachusetts Ave NW, Washington, DC 20001',
    type: 'Conference',
    category: 'Legal Symposium',
    description: 'Engage with our experts at the ABA Litigation Conference in Washington D.C. where we discuss the intersection of finance and federal law.',
    fullDescription: 'The ABA Section of Litigation Annual Conference is the premier event for litigators. Our partners will be available to discuss complex damages analysis and expert testimony in federal jurisdictions.',
    image: '/images/events/aba-litigation.jpg',
    imageAlt: 'ABA Litigation Conference - DC',
    featured: true,
    booth: 'Table #12',
    speakers: ['David Engel, CPA, CFE'],
    topics: ['Federal Court Expert Testimony', 'Calculating Complex Business Interruption Losses'],
    registrationUrl: 'https://www.americanbar.org/groups/litigation/events-cle/',
    contactEmail: 'events@engelandengel.com',
    contactPhone: '(310) 277-2220',
  },
  {
    id: 5,
    title: 'Northern California Fraud Symposium',
    slug: 'northern-california-fraud-symposium-2026',
    date: '2026-02-12',
    endDate: '2026-02-12',
    time: '9:00 AM - 4:00 PM',
    location: 'Palace Hotel, San Francisco',
    address: '2 New Montgomery St, San Francisco, CA 94105',
    type: 'Symposium',
    category: 'Fraud Detection',
    description: 'A focused deep-dive into corporate embezzlement and internal control failures. Brandon Engel leads the morning keynote.',
    fullDescription: 'The Northern California Fraud Symposium brings together top investigators and forensic accountants to share case studies on multi-million dollar corporate frauds.',
    image: '/images/events/sf-fraud.jpg',
    imageAlt: 'Fraud Symposium SF',
    featured: true,
    booth: null,
    speakers: ['Brandon Engel, CPA, CFE, ABV'],
    topics: ['Embezzlement Case Studies', 'Modern Forensic Data Analytics'],
    registrationUrl: 'https://acfe-sf.org/symposium',
    contactEmail: 'events@engelandengel.com',
    contactPhone: '(310) 277-2220',
  },
  {
    id: 6,
    title: 'Orange County Business Litigation Seminar',
    slug: 'oc-business-litigation-seminar-2026',
    date: '2026-03-15',
    endDate: '2026-03-15',
    time: '11:30 AM - 1:30 PM',
    location: 'The Pacific Club, Newport Beach',
    address: '4110 MacArthur Blvd, Newport Beach, CA 92660',
    type: 'Seminar',
    category: 'Professional Seminar',
    description: 'Join us for a lunch seminar on business valuation in shareholder disputes and marital dissolution cases.',
    fullDescription: 'This seminar provides practical insights into the valuation methodologies used in Southern California courts for business disputes and family law matters.',
    image: '/images/events/oc-seminar.jpg',
    imageAlt: 'OC Litigation Seminar',
    featured: true,
    booth: null,
    speakers: ['Brandon Engel, CPA, CFE, ABV', 'David Engel, CPA, CFE'],
    topics: ['Business Valuation Standards', 'Shareholder Buy-out Calculations'],
    registrationUrl: 'https://ocbar.org/events',
    contactEmail: 'events@engelandengel.com',
    contactPhone: '(310) 277-2220',
  },
]

export default function EventsPage() {
  const featuredEvents = upcomingEvents.filter(event => event.featured)
  const otherEvents = upcomingEvents.filter(event => !event.featured)

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <EventsContent
        featuredEvents={featuredEvents}
        otherEvents={otherEvents}
        upcomingEvents={upcomingEvents}
      />
      <Footer />
    </main>
  )
}
