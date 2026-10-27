import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import IntroSection from '@/components/sections/IntroSection'
import ServicesOverviewV2 from '@/components/sections/ServicesOverviewV2'
import ExpertiseGridV2 from '@/components/sections/ExpertiseGridV2'
import Certifications from '@/components/sections/Certifications'
import GoogleReviews from '@/components/sections/GoogleReviews'
import ForbesBanner from '@/components/sections/ForbesBanner'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata = {
  title: 'Engel & Engel - Premier Forensic Accounting Firm in Los Angeles',
  description: 'Established in Los Angeles in 1994, Engel & Engel LLP is one of the premier providers of forensic accounting and advisory services in California and nationwide. From strategy to testimony.',
}

export default function Home7Page() {
  return (
    <main>
      <Header />
      <Hero />
      <IntroSection />
      <ForbesBanner />
      <ServicesOverviewV2 />
      <ExpertiseGridV2 />
      <Certifications />
      <GoogleReviews />
      <ContactCTA />
      <Footer />
    </main>
  )
}
