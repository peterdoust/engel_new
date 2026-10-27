'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroV8 from '@/components/sections/HeroV8'
import IntroSection from '@/components/sections/IntroSection'
import ForbesBanner from '@/components/sections/ForbesBanner'
import ServicesOverviewV3 from '@/components/sections/ServicesOverviewV3'
import ExpertiseGridV5 from '@/components/sections/ExpertiseGridV5'
import Certifications from '@/components/sections/Certifications'
import GoogleReviews from '@/components/sections/GoogleReviews'
import ContactCTA from '@/components/sections/ContactCTA'

export default function Home8Page() {
  return (
    <main>
      <Header />
      <HeroV8 overlayOpacity={0.3} bgImage="/images/unnamed.png" />
      <IntroSection />
      <ForbesBanner />
      <ServicesOverviewV3 />
      <ExpertiseGridV5 />
      <Certifications />
      <GoogleReviews />
      <ContactCTA />
      <Footer />
    </main>
  )
}
