'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useCurrentUser } from '../useCurrentUser'

const TITLE_LIMIT = 60
const DESCRIPTION_LIMIT = 160
const SITE_ORIGIN = 'https://engelandengel.com'

type SeoPageType =
  | 'standard'
  | 'practice-area'
  | 'service'
  | 'publication'
  | 'team'
  | 'resource'
  | 'blog-post'
  | 'event'

interface SeoPageRow {
  type: SeoPageType
  path: string
  label: string
  defaultTitle: string
  defaultDescription: string
  title: string
  description: string
  isTitleOverridden: boolean
  isDescriptionOverridden: boolean
}

interface Draft {
  title: string
  description: string
}

const GROUPS: { type: SeoPageType; label: string }[] = [
  { type: 'standard', label: 'Standard' },
  { type: 'practice-area', label: 'Practice Areas' },
  { type: 'service', label: 'Services' },
  { type: 'publication', label: 'Publications' },
  { type: 'team', label: 'Team' },
  { type: 'resource', label: 'Resources' },
  { type: 'blog-post', label: 'Blog' },
  { type: 'event', label: 'Events' },
]

function CharCount({ value, limit }: { value: string; limit: number }) {
  const n = value.length
  const over = n > limit
  const empty = n === 0
  return (
    <span
      className={`text-[11px] font-semibold tabular-nums ${
        empty ? 'text-gray-400' : over ? 'text-red-600' : n > limit * 0.85 ? 'text-amber-600' : 'text-emerald-600'
      }`}
    >
      {n} / {limit}
      {over && ' — may be truncated by Google'}
    </span>
  )
}

/**
 * Title and description are overridden independently, so the row-level badge cannot
 * stand in for this: "title customised, description still default" is a normal state.
 * Reflects what is saved, not the current draft.
 */
function FieldTag({ overridden }: { overridden: boolean }) {
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
        overridden ? 'bg-[#D4AF37]/20 text-[#8a6d0b]' : 'bg-gray-100 text-gray-500'
      }`}
    >
      {overridden ? 'Custom' : 'Default'}
    </span>
  )
}

function SerpPreview({ path, title, description }: { path: string; title: string; description: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Search preview</p>
      <p className="text-xs text-[#202124] truncate">{SITE_ORIGIN}{path}</p>
      <p className="text-[#1a0dab] text-lg leading-snug truncate">{title || '(no title)'}</p>
      <p className="text-sm text-[#4d5156] line-clamp-2">{description || '(no description)'}</p>
    </div>
  )
}

export default function SeoAdmin() {
  const [authToken, setAuthToken] = useState('')
  const [pages, setPages] = useState<SeoPageRow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | SeoPageType>('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  // Drafts are keyed by path so switching between rows never discards unsaved edits.
  const [drafts, setDrafts] = useState<Record<string, Draft>>({})
  const [saving, setSaving] = useState(false)

  // The API is the real gate (it returns 403 regardless of what the UI shows), but
  // offering controls the user cannot use produces a confusing failure on Save.
  const { can } = useCurrentUser()
  // "Reset to default" clears an override, which is an edit — see api/seo DELETE.
  const canEdit = can('seo', 'edit')

  const fetchPages = useCallback(async (token?: string) => {
    const key = token || authToken
    if (!key) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/seo', { headers: { 'x-admin-key': key } })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load')
      setPages(data.pages || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load SEO settings')
    } finally {
      setLoading(false)
    }
  }, [authToken])

  useEffect(() => {
    const token = sessionStorage.getItem('raffle_token')
    if (token) {
      setAuthToken(token)
      fetchPages(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return pages.filter(p => {
      if (typeFilter !== 'all' && p.type !== typeFilter) return false
      if (!q) return true
      return (
        p.label.toLowerCase().includes(q) ||
        p.path.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    })
  }, [pages, search, typeFilter])

  const customCount = pages.filter(p => p.isTitleOverridden || p.isDescriptionOverridden).length

  /**
   * `row.title` is the text the live page actually renders: the DB override when one
   * exists, the registry default otherwise (see lib/seo.ts). Seeding the editor from it
   * means the fields show real, editable text rather than a placeholder ghost.
   */
  const effectiveDraftFor = (row: SeoPageRow): Draft => ({
    title: row.title,
    description: row.description,
  })

  const draftFor = (row: SeoPageRow): Draft => drafts[row.path] ?? effectiveDraftFor(row)

  const isDirty = (row: SeoPageRow) => {
    const d = drafts[row.path]
    if (!d) return false
    const saved = effectiveDraftFor(row)
    return d.title !== saved.title || d.description !== saved.description
  }

  // Merged onto the effective text, not onto a blank: reset() leaves an open row with no
  // draft entry, and an empty base there would wipe whichever field is not being edited.
  const setDraft = (row: SeoPageRow, patch: Partial<Draft>) =>
    setDrafts(prev => ({ ...prev, [row.path]: { ...(prev[row.path] ?? effectiveDraftFor(row)), ...patch } }))

  const clearDraft = (path: string) =>
    setDrafts(prev => {
      const next = { ...prev }
      delete next[path]
      return next
    })

  const openRow = (row: SeoPageRow) => {
    setNotice('')
    setError('')
    if (expanded === row.path) {
      setExpanded(null)
      return
    }
    setExpanded(row.path)
    // Seed from the effective text, but never clobber an in-progress draft.
    setDrafts(prev => (prev[row.path] ? prev : { ...prev, [row.path]: effectiveDraftFor(row) }))
  }

  const applyResult = (result: any) => {
    setPages(prev =>
      prev.map(p =>
        p.path === result.path
          ? {
              ...p,
              title: result.title,
              description: result.description,
              isTitleOverridden: result.isTitleOverridden,
              isDescriptionOverridden: result.isDescriptionOverridden,
            }
          : p
      )
    )
  }

  const save = async (row: SeoPageRow) => {
    const draft = draftFor(row)
    // The fields are pre-filled with the effective text, so an untouched Save would
    // otherwise write the default straight back as an override. That matters most for
    // blog posts and events, whose defaults are derived from the content itself
    // (see lib/seoPages.ts) — a frozen copy would stop tracking the post. '' means
    // "no override", which is also what keeps the Custom/Default badges honest.
    const title = draft.title.trim() === row.defaultTitle.trim() ? '' : draft.title
    const description =
      draft.description.trim() === row.defaultDescription.trim() ? '' : draft.description
    setSaving(true)
    setError('')
    setNotice('')
    try {
      const res = await fetch('/api/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': authToken },
        body: JSON.stringify({ path: row.path, title, description }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save')
      applyResult(data)
      clearDraft(row.path)
      setNotice(`Saved — ${row.label}. The live page updates on its next request.`)
      setExpanded(null)
    } catch (err: any) {
      setError(err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const reset = async (row: SeoPageRow) => {
    setSaving(true)
    setError('')
    setNotice('')
    try {
      const res = await fetch(`/api/seo?path=${encodeURIComponent(row.path)}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': authToken },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to reset')
      applyResult({
        path: row.path,
        title: row.defaultTitle,
        description: row.defaultDescription,
        isTitleOverridden: false,
        isDescriptionOverridden: false,
      })
      // applyResult has already put the defaults back on the row, and the draft falls
      // back to those, so seeding one here would only be a second source of truth.
      clearDraft(row.path)
      setNotice(`Reset to default — ${row.label}.`)
    } catch (err: any) {
      setError(err.message || 'Failed to reset')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="lg:pl-0 pl-12">
            <h1 className="text-lg sm:text-xl font-bold text-[#1d2653]">SEO Meta</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {pages.length} pages · {customCount} customised
            </p>
          </div>
          <button
            onClick={() => fetchPages()}
            className="text-xs font-semibold text-gray-600 hover:text-[#1d2653] px-3 py-2 border border-gray-200 rounded-lg"
          >
            Refresh
          </button>
        </div>

        <div className="px-4 sm:px-6 pb-4 flex flex-col sm:flex-row gap-2">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search pages, titles or URLs..."
            className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d2653]/20"
          />
          <div className="flex gap-1">
            {([{ type: 'all' as const, label: 'All' }, ...GROUPS]).map(g => (
              <button
                key={g.type}
                onClick={() => setTypeFilter(g.type as any)}
                className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-colors ${
                  typeFilter === g.type
                    ? 'bg-[#1d2653] text-white border-[#1d2653]'
                    : 'bg-white text-gray-600 border-gray-200 hover:text-[#1d2653]'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 py-5 space-y-4">
        {error && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</div>
        )}
        {notice && (
          <div className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
            {notice}
          </div>
        )}
        {loading && <p className="text-sm text-gray-400">Loading...</p>}
        {!loading && filtered.length === 0 && (
          <p className="text-sm text-gray-400">No pages match your search.</p>
        )}

        {GROUPS.map(group => {
          const rows = filtered.filter(p => p.type === group.type)
          if (rows.length === 0) return null
          return (
            <section key={group.type} className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 pt-2">
                {group.label} <span className="text-gray-300">({rows.length})</span>
              </h2>

              {rows.map(row => {
                const isOpen = expanded === row.path
                const custom = row.isTitleOverridden || row.isDescriptionOverridden
                const draft = draftFor(row)
                const dirty = isDirty(row)
                return (
                  <div key={row.path} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => openRow(row)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-[#1d2653]">{row.label}</span>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                custom ? 'bg-[#D4AF37]/20 text-[#8a6d0b]' : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {custom ? 'Custom' : 'Default'}
                            </span>
                            {dirty && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                                Unsaved
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5">{row.path}</p>
                          <p className="text-xs text-gray-700 mt-1.5 truncate">{row.title}</p>
                          <p className="text-xs text-gray-500 truncate">{row.description}</p>
                        </div>
                        <svg
                          className={`w-4 h-4 text-gray-400 shrink-0 mt-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-gray-100 p-4 space-y-4 bg-gray-50/60">
                        <div>
                          <div className="flex items-center justify-between gap-3 mb-1">
                            <div className="flex items-center gap-2">
                              <label className="text-xs font-semibold text-gray-600">Meta Title</label>
                              <FieldTag overridden={row.isTitleOverridden} />
                            </div>
                            <div className="flex items-center gap-3">
                              {canEdit && draft.title !== row.defaultTitle && (
                                <button
                                  type="button"
                                  onClick={() => setDraft(row, { title: row.defaultTitle })}
                                  className="text-[11px] font-semibold text-gray-500 hover:text-[#1d2653] underline underline-offset-2"
                                >
                                  Restore default
                                </button>
                              )}
                              <CharCount value={draft.title} limit={TITLE_LIMIT} />
                            </div>
                          </div>
                          <input
                            value={draft.title}
                            onChange={e => setDraft(row, { title: e.target.value })}
                            placeholder={row.defaultTitle}
                            readOnly={!canEdit}
                            className={`w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d2653]/20 ${
                              canEdit ? 'bg-white' : 'bg-gray-50 text-gray-500 cursor-not-allowed'
                            }`}
                          />
                          <p className="text-[11px] text-gray-400 mt-1">
                            Shown in full — include <span className="font-mono">| Engel &amp; Engel</span> if you want the
                            firm name in the tab and search result. Clearing this field falls back to the built-in
                            default.
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center justify-between gap-3 mb-1">
                            <div className="flex items-center gap-2">
                              <label className="text-xs font-semibold text-gray-600">Meta Description</label>
                              <FieldTag overridden={row.isDescriptionOverridden} />
                            </div>
                            <div className="flex items-center gap-3">
                              {canEdit && draft.description !== row.defaultDescription && (
                                <button
                                  type="button"
                                  onClick={() => setDraft(row, { description: row.defaultDescription })}
                                  className="text-[11px] font-semibold text-gray-500 hover:text-[#1d2653] underline underline-offset-2"
                                >
                                  Restore default
                                </button>
                              )}
                              <CharCount value={draft.description} limit={DESCRIPTION_LIMIT} />
                            </div>
                          </div>
                          <textarea
                            value={draft.description}
                            onChange={e => setDraft(row, { description: e.target.value })}
                            placeholder={row.defaultDescription}
                            rows={3}
                            readOnly={!canEdit}
                            className={`w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d2653]/20 resize-y ${
                              canEdit ? 'bg-white' : 'bg-gray-50 text-gray-500 cursor-not-allowed'
                            }`}
                          />
                          <p className="text-[11px] text-gray-400 mt-1">
                            Clearing this field falls back to the built-in default.
                          </p>
                        </div>

                        <SerpPreview
                          path={row.path}
                          title={draft.title || row.defaultTitle}
                          description={draft.description || row.defaultDescription}
                        />

                        {!canEdit && (
                          <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                            You have view-only access to SEO Meta. Ask an administrator if you need to make changes.
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-2">
                          {canEdit && (
                            <button
                              onClick={() => save(row)}
                              disabled={saving}
                              className="text-xs font-semibold text-white bg-[#1d2653] hover:bg-black px-4 py-2 rounded-lg disabled:opacity-40"
                            >
                              {saving ? 'Saving...' : 'Save'}
                            </button>
                          )}
                          <button
                            onClick={() => {
                              clearDraft(row.path)
                              setExpanded(null)
                            }}
                            className="text-xs font-semibold text-gray-600 hover:text-[#1d2653] px-4 py-2 border border-gray-200 rounded-lg bg-white"
                          >
                            {canEdit ? 'Cancel' : 'Close'}
                          </button>
                          <a
                            href={row.path}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-semibold text-gray-600 hover:text-[#1d2653] px-4 py-2 border border-gray-200 rounded-lg bg-white"
                          >
                            View page
                          </a>
                          {custom && canEdit && (
                            <button
                              onClick={() => reset(row)}
                              disabled={saving}
                              className="text-xs font-semibold text-red-600 hover:text-red-700 px-4 py-2 border border-red-200 rounded-lg bg-white disabled:opacity-40 ml-auto"
                            >
                              Reset to default
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </section>
          )
        })}
      </div>
    </div>
  )
}
