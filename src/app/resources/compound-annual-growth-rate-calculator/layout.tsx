import { buildMetadata } from '@/lib/seo'

// Meta title / description for this page are editable at /admin/seo.
// The page itself is a client component and cannot export metadata, so it lives here.
export const generateMetadata = () => buildMetadata('/resources/compound-annual-growth-rate-calculator')

export const revalidate = 3600

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
