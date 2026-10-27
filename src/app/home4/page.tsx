'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroV4 from '@/components/sections/HeroV4'
import IntroSection from '@/components/sections/IntroSection'
import ServicesOverview from '@/components/sections/ServicesOverview'
import ExpertiseGridV3 from '@/components/sections/ExpertiseGridV3'
import Certifications from '@/components/sections/Certifications'
import GoogleReviews from '@/components/sections/GoogleReviews'
import ContactCTA from '@/components/sections/ContactCTA'

export default function Home4Page() {
  return (
    <main>
      <Header />
      <HeroV4 />
      <IntroSection />
      <ServicesOverview />
      <ExpertiseGridV3 />
      <Certifications />
      <GoogleReviews />
      <ContactCTA />
      <Footer />
    </main>
  )
}
