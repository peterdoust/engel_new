import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import UnsubscribeForm from '@/components/sections/UnsubscribeForm'

/**
 * Server component on purpose: the form itself is the only client-side part, and
 * keeping the page a server component is what allows the noindex metadata below.
 * A page reached only from an email has no business in search results.
 */
export const metadata: Metadata = {
  title: 'Unsubscribe',
  description: 'Remove your email address from the Engel & Engel mailing list.',
  robots: { index: false, follow: false },
}

/**
 * Reading searchParams here makes the route render per request instead of being
 * prerendered, which is the point: the address from the mailer link is in the
 * HTML the visitor receives, with no post-hydration flash on the one page whose
 * whole job is a single click.
 */
export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { email?: string | string[] }
}) {
  const emailParam = searchParams?.email
  const initialEmail = Array.isArray(emailParam) ? emailParam[0] : emailParam || ''

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative bg-primary-950 pt-40 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#D4AF37]/10 blur-[150px] rounded-full" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          </div>
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto">
              <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.3em] uppercase mb-6">Mailing List</p>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[0.9]">
                Un<span className="font-serif italic text-[#D4AF37] font-medium">subscribe</span>
              </h1>
              <p className="text-white/60 text-lg mt-6 max-w-2xl">
                Confirm your email address below and we&apos;ll remove you from our mailing list.
              </p>
              <div className="h-[3px] w-24 bg-[#D4AF37] mt-8" />
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-lg mx-auto border border-gray-200 p-8 md:p-10">
              <UnsubscribeForm initialEmail={initialEmail} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
