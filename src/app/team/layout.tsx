import { buildMetadata } from '@/lib/seo'

// Meta title / description for this page are editable at /admin/seo.
// Previously hard-coded here; the defaults were ported verbatim into src/lib/seoPages.ts.
export const generateMetadata = () => buildMetadata('/team')

export const revalidate = 3600

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
