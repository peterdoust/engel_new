import { cache } from 'react'
import type { Metadata } from 'next'
import clientPromise from '@/lib/mongodb'
import { getSeoPage, type SeoPage } from '@/lib/seoPages'

export const SEO_COLLECTION = 'page_seo'

/**
 * Named explicitly rather than using the URI's default database, because
 * api/raffle/login writes admin session tokens into `engelandengel` by name.
 * If the two disagreed, every admin request would 401.
 */
export const SEO_DB_NAME = 'engelandengel'

export interface SeoOverride {
  path: string
  title?: string
  description?: string
  updatedAt?: Date
  updatedBy?: string
}

export interface ResolvedSeo {
  path: string
  title: string
  description: string
  /** 'db' when an admin override supplied the value, 'default' when it came from the registry. */
  titleSource: 'db' | 'default'
  descriptionSource: 'db' | 'default'
}

/**
 * All overrides, keyed by path. Memoised per request so a page render that touches
 * several helpers only hits Mongo once. Fails soft: any connection or query error
 * yields an empty map, and callers fall back to the registry defaults.
 */
export const getSeoOverrides = cache(async (): Promise<Map<string, SeoOverride>> => {
  try {
    if (!process.env.MONGODB_URI) return new Map()
    const client = await clientPromise
    const db = client.db(SEO_DB_NAME)
    const docs = await db.collection<SeoOverride>(SEO_COLLECTION).find({}).toArray()
    return new Map(docs.map(d => [d.path, d]))
  } catch (error) {
    console.error('[seo] Failed to load SEO overrides, using defaults:', error)
    return new Map()
  }
})

function resolve(page: SeoPage, override?: SeoOverride): ResolvedSeo {
  const title = override?.title?.trim()
  const description = override?.description?.trim()
  return {
    path: page.path,
    title: title || page.defaultTitle,
    description: description || page.defaultDescription,
    titleSource: title ? 'db' : 'default',
    descriptionSource: description ? 'db' : 'default',
  }
}

/** Resolution order: Mongo override → registry default. */
export async function getSeoMeta(path: string): Promise<ResolvedSeo | null> {
  const page = getSeoPage(path)
  if (!page) return null
  const overrides = await getSeoOverrides()
  return resolve(page, overrides.get(path))
}

/** Every managed page with its effective meta — used by the admin screen. */
export async function getAllSeoMeta(pages: SeoPage[]): Promise<ResolvedSeo[]> {
  const overrides = await getSeoOverrides()
  return pages.map(page => resolve(page, overrides.get(page.path)))
}

/**
 * Builds the Next.js Metadata object for a managed page.
 *
 * The title is emitted as `title.absolute` on purpose: the root layout declares
 * `title: { template: '%s | Engel & Engel' }`, and admin-entered titles already
 * carry the brand suffix. Using the template would render it twice.
 *
 * openGraph/twitter are re-declared in full because Next.js replaces — rather
 * than deep-merges — these objects when a child segment defines them.
 *
 * `options` covers the few fields the admin does not manage, so a page with a
 * richer setup than title/description (e.g. /events) keeps it. Deliberately not
 * a raw Metadata spread: overriding `openGraph` wholesale would silently drop the
 * generated og:title/og:description.
 */
/**
 * Overlays an admin override onto metadata a page already built for itself.
 *
 * Used by /blog/[slug] and /events/[slug], whose metadata is far richer than
 * buildMetadata produces — article type, authors, publish/modified dates,
 * per-post OG images, tags. Replacing that wholesale would be a regression, so
 * only the title and description are swapped, including inside openGraph and
 * twitter, and everything else is left exactly as the page built it.
 *
 * With no override stored, `base` is returned untouched.
 */
export async function applySeoOverride(base: Metadata, path: string): Promise<Metadata> {
  const meta = await getSeoMeta(path)
  if (!meta) return base

  const titleChanged = meta.titleSource === 'db'
  const descChanged = meta.descriptionSource === 'db'
  if (!titleChanged && !descChanged) return base

  const next: Metadata = { ...base }
  if (titleChanged) next.title = { absolute: meta.title }
  if (descChanged) next.description = meta.description

  if (base.openGraph) {
    next.openGraph = {
      ...base.openGraph,
      ...(titleChanged ? { title: meta.title } : {}),
      ...(descChanged ? { description: meta.description } : {}),
    } as Metadata['openGraph']
  }
  if (base.twitter) {
    next.twitter = {
      ...base.twitter,
      ...(titleChanged ? { title: meta.title } : {}),
      ...(descChanged ? { description: meta.description } : {}),
    } as Metadata['twitter']
  }

  return next
}

export interface BuildMetadataOptions {
  /** Page-specific keywords, in addition to the site-wide ones on the root layout. */
  keywords?: string | string[]
}

// NOTE: neither of these files currently exists in public/images — a pre-existing
// issue inherited from the root layout, not introduced here. Kept as-is so the tags
// stay consistent site-wide; add the assets and every page picks them up at once.
const OG_IMAGE = {
  url: '/images/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Engel & Engel Forensic Accounting',
}
const TWITTER_IMAGE = '/images/twitter-image.jpg'

export async function buildMetadata(path: string, options?: BuildMetadataOptions): Promise<Metadata> {
  const meta = await getSeoMeta(path)
  if (!meta) return {}

  return {
    title: { absolute: meta.title },
    description: meta.description,
    ...(options?.keywords ? { keywords: options.keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'Engel & Engel',
      url: path,
      title: meta.title,
      description: meta.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [TWITTER_IMAGE],
      creator: '@engelengel',
    },
  }
}
