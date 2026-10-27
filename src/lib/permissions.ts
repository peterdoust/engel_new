/**
 * Section-level permissions for the admin panel.
 *
 * Two roles exist:
 *   - 'admin' — implicitly has every permission on every section, and is the only
 *     role allowed to manage users. Never store a permissions map for an admin;
 *     hasPermission() short-circuits on the role so an admin can't be locked out
 *     of a section by a stale or partial map.
 *   - 'user'  — has only what the admin explicitly granted, section by section.
 *
 * The section keys mirror the admin sidebar in src/app/admin/layout.tsx. Keep the
 * two in sync: a key here with no matching nav entry is invisible, and a nav entry
 * with no key here can never be granted.
 */

/**
 * `actions` lists what a section can actually do today, so the admin UI never offers
 * a permission that grants nothing. Keep each entry honest: add 'edit'/'delete' here
 * only when the matching API handler and UI control exist, otherwise an admin ticks
 * a box and nothing changes.
 *
 * Current state: no section has a real delete. SEO Meta's "Reset to default" removes
 * a custom override, but that is an edit — clearing both fields via PUT does exactly
 * the same thing, so a separate delete flag would gate the button and nothing else.
 * Raffle implements edit (drawing and confirming a winner), and Unsubscribe List
 * implements edit (marking rows exported once the CSV has downloaded). The
 * remaining three sections are read-only — their APIs expose GET and nothing else.
 */
export const SECTIONS = [
  { key: 'contact-submissions', label: 'Contact Inquiries', href: '/admin/contact-submissions', actions: ['view'] },
  { key: 'seo', label: 'SEO Meta', href: '/admin/seo', actions: ['view', 'edit'] },
  { key: 'career-applications', label: 'Career Applications', href: '/admin/career-applications', actions: ['view'] },
  { key: 'raffle', label: 'Raffle Submissions', href: '/admin/raffle', actions: ['view', 'edit'] },
  { key: 'publication-requests', label: 'Publication Requests', href: '/admin/publication-requests', actions: ['view'] },
  { key: 'unsubscribes', label: 'Unsubscribe List', href: '/admin/unsubscribes', actions: ['view', 'edit'] },
] as const satisfies ReadonlyArray<{
  key: string
  label: string
  href: string
  actions: ReadonlyArray<'view' | 'edit' | 'delete'>
}>

export type SectionKey = (typeof SECTIONS)[number]['key']
export type Action = 'view' | 'edit' | 'delete'
export type Role = 'admin' | 'user'

/** What a single section grants. Absent section === no access at all. */
export type SectionGrant = { view?: boolean; edit?: boolean; delete?: boolean }
export type PermissionMap = Partial<Record<SectionKey, SectionGrant>>

export const SECTION_KEYS = SECTIONS.map(s => s.key) as SectionKey[]
export const ACTIONS: Action[] = ['view', 'edit', 'delete']

export function isSectionKey(value: unknown): value is SectionKey {
  return typeof value === 'string' && (SECTION_KEYS as string[]).includes(value)
}

/** Actions a section genuinely supports — drives which checkboxes the admin sees. */
export function actionsFor(section: SectionKey): Action[] {
  const entry = SECTIONS.find(s => s.key === section)
  return entry ? ([...entry.actions] as Action[]) : ['view']
}

export function supportsAction(section: SectionKey, action: Action): boolean {
  return actionsFor(section).includes(action)
}

/**
 * Actions at least one section supports — the columns worth showing in the admin
 * permission grid. A column no section can honour is pure noise.
 */
export function activeActions(): Action[] {
  return ACTIONS.filter(action => SECTION_KEYS.some(key => supportsAction(key, action)))
}

/** Drops unknown section keys and coerces every flag to a real boolean. */
export function sanitizePermissions(input: unknown): PermissionMap {
  if (!input || typeof input !== 'object') return {}
  const out: PermissionMap = {}
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (!isSectionKey(key) || !value || typeof value !== 'object') continue
    const grant = value as Record<string, unknown>
    // Flags the section cannot honour are dropped rather than stored, so a grant
    // never claims an ability the app does not implement.
    const clean: SectionGrant = {
      view: grant.view === true,
      edit: grant.edit === true && supportsAction(key, 'edit'),
      delete: grant.delete === true && supportsAction(key, 'delete'),
    }
    // Editing or deleting without being able to view is not a meaningful state,
    // and would render a section the user cannot open. Imply view instead.
    if (clean.edit || clean.delete) clean.view = true
    if (clean.view || clean.edit || clean.delete) out[key] = clean
  }
  return out
}

type PermissionSubject = { role?: string; permissions?: unknown } | null | undefined

export function isAdmin(subject: PermissionSubject): boolean {
  return subject?.role === 'admin'
}

/** The single authority on access. Every route and page must funnel through this. */
export function hasPermission(subject: PermissionSubject, section: SectionKey, action: Action): boolean {
  if (!subject) return false
  if (isAdmin(subject)) return true
  const permissions = sanitizePermissions(subject.permissions)
  return permissions[section]?.[action] === true
}

/** Sections a subject may open, in sidebar order. */
export function allowedSections(subject: PermissionSubject): SectionKey[] {
  if (!subject) return []
  return SECTION_KEYS.filter(key => hasPermission(subject, key, 'view'))
}
