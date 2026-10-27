'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useCurrentUser } from '../useCurrentUser'

interface UnsubscribeEntry {
  _id: string
  email: string
  status?: 'new' | 'exported'
  source?: string
  createdAt: string
  lastRequestedAt?: string
  exportedAt?: string | null
  ipAddress?: string
}

type Tab = 'new' | 'exported'

// A row written before the status field existed still needs to reach someone, so
// anything that is not explicitly exported counts as new.
const isExported = (entry: UnsubscribeEntry) => entry.status === 'exported'

/**
 * The stored values are historical and read wrong on screen: 'manual' is what the
 * public unsubscribe form writes, and 'admin' means a member of staff keyed the
 * address in. Mapped for display rather than migrated, so the rows already in the
 * collection keep working and api/unsubscribe(s) stay untouched. An unrecognised
 * value falls through as-is rather than being labelled something it is not.
 */
const SOURCE_LABELS: Record<string, string> = {
  manual: 'Form',
  admin: 'Admin added',
  mailer: 'Mailer',
}

const sourceLabel = (source?: string) => {
  const key = source || 'manual'
  return SOURCE_LABELS[key] ?? key
}

export default function UnsubscribesAdmin() {
  const { can } = useCurrentUser()
  const [authToken, setAuthToken] = useState('')
  const [entries, setEntries] = useState<UnsubscribeEntry[]>([])
  const [tab, setTab] = useState<Tab>('new')
  const [loading, setLoading] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [search, setSearch] = useState('')
  const [adding, setAdding] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [savingNew, setSavingNew] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem('raffle_token')
    if (token) {
      setAuthToken(token)
      fetchEntries(token)
    }
  }, [])

  const fetchEntries = async (token?: string) => {
    const key = token || authToken
    if (!key) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/unsubscribes', {
        headers: { 'x-admin-key': key },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load')
      setEntries(data.entries || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load unsubscribe requests')
    } finally {
      setLoading(false)
    }
  }

  const newEntries = useMemo(() => entries.filter(e => !isExported(e)), [entries])
  const exportedEntries = useMemo(() => entries.filter(isExported), [entries])

  const filtered = useMemo(() => {
    const source = tab === 'new' ? newEntries : exportedEntries
    const q = search.trim().toLowerCase()
    if (!q) return source
    return source.filter(e => e.email?.toLowerCase().includes(q))
  }, [tab, newEntries, exportedEntries, search])

  const downloadCsv = (rows: UnsubscribeEntry[], filename: string) => {
    const headers = ['S.No', 'Email', 'Requested On', 'Source']
    const body = rows.map((e, i) => [
      i + 1,
      e.email,
      new Date(e.lastRequestedAt || e.createdAt).toLocaleString(),
      sourceLabel(e.source),
    ])
    const csv = [headers, ...body]
      .map(row => row.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const today = () => new Date().toISOString().split('T')[0]

  /**
   * Download first, mark second, and mark exactly the ids that went into the file.
   *
   * If the mark call fails the rows stay in New: exporting an address twice costs
   * nothing, but a row marked exported that never reached the mail tool drops out
   * of this tab and that person keeps getting the mailer.
   */
  const exportNew = async () => {
    const rows = filtered
    if (rows.length === 0) return

    setError('')
    setNotice('')
    setExporting(true)

    try {
      downloadCsv(rows, `unsubscribes-${today()}.csv`)

      const res = await fetch('/api/unsubscribes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': authToken },
        body: JSON.stringify({ ids: rows.map(r => r._id) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update status')

      setNotice(`${rows.length} ${rows.length === 1 ? 'address' : 'addresses'} exported and moved to the Exported tab.`)
      await fetchEntries()
    } catch (err: any) {
      setError(
        `${err.message || 'Failed to update status'} — the CSV downloaded, but these addresses are still marked New. Remove them in the mail tool, then export again.`
      )
    } finally {
      setExporting(false)
    }
  }

  /** For the people who reply "take me off the list" instead of using the link. */
  const addEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    const email = newEmail.trim()
    if (!email) return

    setError('')
    setNotice('')
    setSavingNew(true)

    try {
      const res = await fetch('/api/unsubscribes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': authToken },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to add the address')

      setNotice(
        data.wasExported
          ? `${data.email} was already exported — moved back to New so it gets removed again.`
          : data.existed
          ? `${data.email} was already on the list.`
          : `${data.email} added to the list.`
      )
      setNewEmail('')
      setAdding(false)
      setTab('new')
      await fetchEntries()
    } catch (err: any) {
      setError(err.message || 'Failed to add the address')
    } finally {
      setSavingNew(false)
    }
  }

  const downloadExported = () => {
    if (filtered.length === 0) return
    downloadCsv(filtered, `unsubscribes-exported-${today()}.csv`)
  }

  const canExport = can('unsubscribes', 'edit')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="lg:pl-0 pl-12">
            <h1 className="text-lg sm:text-xl font-bold text-[#1d2653]">Unsubscribe List</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {newEntries.length} awaiting removal &middot; {exportedEntries.length} exported
            </p>
          </div>
          <div className="flex items-center gap-2">
            {canExport && (
              <button
                onClick={() => {
                  setAdding(a => !a)
                  setError('')
                  setNotice('')
                }}
                className="flex-1 sm:flex-none text-xs font-semibold text-[#1d2653] hover:text-black px-3 py-2 border border-gray-200 rounded-lg"
              >
                {adding ? 'Cancel' : '+ Add Email'}
              </button>
            )}
            <button
              onClick={() => fetchEntries()}
              className="flex-1 sm:flex-none text-xs font-semibold text-gray-600 hover:text-[#1d2653] px-3 py-2 border border-gray-200 rounded-lg"
            >
              Refresh
            </button>
            {tab === 'new' ? (
              canExport && (
                <button
                  onClick={exportNew}
                  disabled={filtered.length === 0 || exporting}
                  className="flex-1 sm:flex-none text-xs font-semibold text-white bg-[#1d2653] hover:bg-black px-3 py-2 rounded-lg disabled:opacity-30"
                >
                  {exporting ? 'Exporting...' : 'Export CSV'}
                </button>
              )
            ) : (
              <button
                onClick={downloadExported}
                disabled={filtered.length === 0}
                className="flex-1 sm:flex-none text-xs font-semibold text-white bg-[#1d2653] hover:bg-black px-3 py-2 rounded-lg disabled:opacity-30"
              >
                Download CSV
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="p-4 md:p-6 lg:p-8">
        {adding && canExport && (
          <form
            onSubmit={addEmail}
            className="mb-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              autoFocus
              required
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              placeholder="Email address to unsubscribe"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] outline-none"
            />
            <button
              type="submit"
              disabled={savingNew || newEmail.trim() === ''}
              className="text-xs font-semibold text-white bg-[#1d2653] hover:bg-black px-4 py-2 rounded-lg disabled:opacity-30"
            >
              {savingNew ? 'Adding...' : 'Add to list'}
            </button>
          </form>
        )}

        {error && (
          <div className="mb-4 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100">
            {error}
          </div>
        )}
        {notice && (
          <div className="mb-4 bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg border border-green-100">
            {notice}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="px-4 pt-4 flex items-center gap-1 border-b border-gray-100">
            {([
              { key: 'new' as Tab, label: 'New', count: newEntries.length },
              { key: 'exported' as Tab, label: 'Exported', count: exportedEntries.length },
            ]).map(t => (
              <button
                key={t.key}
                onClick={() => {
                  setTab(t.key)
                  setNotice('')
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-t-lg border-b-2 -mb-px transition-colors ${
                  tab === t.key
                    ? 'border-[#D4AF37] text-[#1d2653]'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {t.label} <span className="text-gray-400 font-medium">({t.count})</span>
              </button>
            ))}
          </div>

          <div className="p-4 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search by email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] outline-none"
            />
            {tab === 'new' && search.trim() !== '' && canExport && (
              <p className="text-[11px] text-gray-400 mt-2">
                Export applies to the {filtered.length} filtered {filtered.length === 1 ? 'row' : 'rows'} below.
              </p>
            )}
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <svg className="w-8 h-8 animate-spin text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-sm">
              {search.trim() !== ''
                ? 'No matches for current filter.'
                : tab === 'new'
                ? 'No new unsubscribe requests.'
                : 'Nothing exported yet.'}
            </div>
          ) : (
            <>
              {/* Mobile + tablet cards */}
              <ul className="lg:hidden divide-y divide-gray-100">
                {filtered.map((e, i) => (
                  <li key={e._id} className="px-4 py-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-baseline gap-2 min-w-0 flex-1">
                        <span className="text-[11px] text-gray-400 font-medium flex-shrink-0">#{i + 1}</span>
                        <p className="text-sm font-semibold text-gray-900 truncate">{e.email}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 flex-shrink-0">
                        {new Date(e.lastRequestedAt || e.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {tab === 'exported' && e.exportedAt
                        ? `Exported ${new Date(e.exportedAt).toLocaleDateString()}`
                        : `Source: ${sourceLabel(e.source)}`}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Desktop table (lg and up) */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50/50 text-[11px] uppercase tracking-wider text-gray-400">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">S.No</th>
                      <th className="px-4 py-3 text-left font-semibold">Email</th>
                      <th className="px-4 py-3 text-left font-semibold">Requested On</th>
                      <th className="px-4 py-3 text-left font-semibold">Source</th>
                      {tab === 'exported' && <th className="px-4 py-3 text-left font-semibold">Exported On</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((e, i) => (
                      <tr key={e._id} className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 text-gray-500 font-medium">{i + 1}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{e.email}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {new Date(e.lastRequestedAt || e.createdAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{sourceLabel(e.source)}</td>
                        {tab === 'exported' && (
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                            {e.exportedAt ? new Date(e.exportedAt).toLocaleString() : '—'}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <p className="text-[11px] text-gray-400 mt-4">
          These addresses still have to be removed in the mail tool. Exporting only records that the list has been
          handed over.
        </p>
      </main>
    </div>
  )
}
