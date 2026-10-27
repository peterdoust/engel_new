'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactCTA from '@/components/sections/ContactCTA'

// Corporate Styled Components
import CorporateHero from '@/components/sections/home2/CorporateHero'
import CorporateIntro from '@/components/sections/home2/CorporateIntro'
import CorporateServices from '@/components/sections/home2/CorporateServices'
import CorporateExpertise from '@/components/sections/home2/CorporateExpertise'
import CorporateCertifications from '@/components/sections/home2/CorporateCertifications'

export default function Home2Page() {
    return (
        <main className="bg-white">
            <Header />

            {/* 1. Hero */}
            <CorporateHero />

            {/* 2. Intro */}
            <CorporateIntro />

            {/* 3. Services */}
            <CorporateServices />

            {/* 4. Expertise */}
            <CorporateExpertise />

            {/* 5. Certifications */}
            <CorporateCertifications />

            {/* 6. Contact Section (Corporate Standard) */}
            <ContactCTA />

            <Footer />
        </main>
    )
}
