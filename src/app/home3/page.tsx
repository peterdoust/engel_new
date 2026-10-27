'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroV3 from '@/components/sections/HeroV3'
import IntroSection from '@/components/sections/IntroSection'
import ServicesOverview from '@/components/sections/ServicesOverview'
import ExpertiseGrid from '@/components/sections/ExpertiseGrid'
import Certifications from '@/components/sections/Certifications'
import GoogleReviews from '@/components/sections/GoogleReviews'
import ContactCTA from '@/components/sections/ContactCTA'

export default function Home3Page() {
  return (
    <main>
      <Header />
      <HeroV3 />
      <IntroSection />
      <ServicesOverview />
      <ExpertiseGrid />
      <Certifications />
      <GoogleReviews />
      <ContactCTA />
      <Footer />
    </main>
  )
}
