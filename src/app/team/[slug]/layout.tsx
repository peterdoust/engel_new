import { buildMetadata } from '@/lib/seo'

// Meta title / description for each team member are editable at /admin/seo.
// Slugs not present in the registry fall through to the site-wide defaults.
export const generateMetadata = ({ params }: { params: { slug: string } }) =>
  buildMetadata(`/team/${params.slug}`)

export const revalidate = 3600

export default function TeamMemberLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
