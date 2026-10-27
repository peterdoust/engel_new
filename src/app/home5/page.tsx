'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroV8 from '@/components/sections/HeroV8'
import IntroSection from '@/components/sections/IntroSection'
import ServicesOverview from '@/components/sections/ServicesOverview'
import ExpertiseGrid from '@/components/sections/ExpertiseGrid'
import Certifications from '@/components/sections/Certifications'
import GoogleReviews from '@/components/sections/GoogleReviews'
import ContactCTA from '@/components/sections/ContactCTA'

export default function Home5Page() {
  return (
    <main>
      <Header />
      <HeroV8 />
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
