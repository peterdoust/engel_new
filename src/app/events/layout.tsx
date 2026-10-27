import { buildMetadata } from '@/lib/seo'

// Meta title / description for this page are editable at /admin/seo.
// Previously hard-coded in ./page.tsx; the defaults were ported verbatim into
// src/lib/seoPages.ts. The page-specific keywords are kept here.
export const generateMetadata = () =>
  buildMetadata('/events', {
    keywords:
      'forensic accounting events, legal conferences, CLE seminars, expert witness events, litigation support conferences, fraud investigation seminars, accounting expert events',
  })

export const revalidate = 3600

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
