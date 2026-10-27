'use client'

import React, { useState, useEffect, useMemo } from 'react'

interface CareerApplication {
  _id: string
  name: string
  email: string
  phone: string
  message: string
  resume?: {
    filename?: string
    mimetype?: string
    size?: number
  } | null
  timestamp: string
  createdAt: string
  ipAddress?: string
  location?: {
    city?: string
    region?: string
    country?: string
  }
}

export default function CareerApplicationsAdmin() {
  const [authToken, setAuthToken] = useState('')
  const [submissions, setSubmissions] = useState<CareerApplication[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<CareerApplication | null>(null)

  useEffect(() => {
    const token = sessionStorage.getItem('raffle_token')
    if (token) {
      setAuthToken(token)
      fetchSubmissions(token)
    }
  }, [])

  const fetchSubmissions = async (token?: string) => {
    const key = token || authToken
    if (!key) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/career-applications', {
        headers: { 'x-admin-key': key },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load')
      setSubmissions(data.submissions || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return submissions
    return submissions.filter(s =>
      s.name?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.phone?.toLowerCase().includes(q) ||
      s.message?.toLowerCase().includes(q)
    )
  }, [submissions, search])

  const resumeUrl = (id: string) =>
    `/api/career-applications/${id}/resume?key=${encodeURIComponent(authToken)}`

  const exportCsv = () => {
    const headers = ['S.No', 'Name', 'Email', 'Phone', 'Message', 'Resume', 'Date']
    const rows = filtered.map((s, i) => [
      i + 1,
      s.name,
      s.email,
      s.phone,
      s.message,
      s.resume?.filename || '',
      new Date(s.createdAt || s.timestamp).toLocaleString(),
    ])
    const csv = [headers, ...rows]
      .map(row => row.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `career-applications-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="lg:pl-0 pl-12">
            <h1 className="text-lg sm:text-xl font-bold text-[#1d2653]">Career Applications</h1>
            <p className="text-xs text-gray-500 mt-0.5">{submissions.length} total applications</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchSubmissions()}
              className="flex-1 sm:flex-none text-xs font-semibold text-gray-600 hover:text-[#1d2653] px-3 py-2 border border-gray-200 rounded-lg"
            >
              Refresh
            </button>
            <button
              onClick={exportCsv}
              disabled={submissions.length === 0}
              className="flex-1 sm:flex-none text-xs font-semibold text-white bg-[#1d2653] hover:bg-black px-3 py-2 rounded-lg disabled:opacity-30"
            >
              Export CSV
            </button>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-6 lg:p-8">
        {error && (
          <div className="mb-4 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search by name, email, phone, message..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] outline-none"
            />
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
              {submissions.length === 0 ? 'No career applications yet.' : 'No matches for current filter.'}
            </div>
          ) : (
            <>
              {/* Mobile + tablet cards */}
              <ul className="lg:hidden divide-y divide-gray-100">
                {filtered.map((s, i) => (
                  <li key={s._id} className="px-4 py-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-baseline gap-2 min-w-0 flex-1">
                        <span className="text-[11px] text-gray-400 font-medium flex-shrink-0">#{i + 1}</span>
                        <p className="text-sm font-semibold text-gray-900 truncate">{s.name}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 flex-shrink-0">
                        {new Date(s.createdAt || s.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs mt-2">
                      <p className="text-gray-500 truncate"><span className="text-gray-400">Email:</span> {s.email}</p>
                      <p className="text-gray-500 truncate"><span className="text-gray-400">Phone:</span> {s.phone || '—'}</p>
                    </div>
                    {s.message && <p className="text-xs text-gray-600 mt-2 line-clamp-2">{s.message}</p>}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => setSelected(s)}
                        className="text-[11px] font-semibold text-[#1d2653] hover:underline"
                      >
                        View details
                      </button>
                      {s.resume?.filename && (
                        <a
                          href={resumeUrl(s._id)}
                          className="text-[11px] font-semibold text-[#D4AF37] hover:underline"
                        >
                          Download Resume
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Desktop table (lg and up) */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50/50 text-[11px] uppercase tracking-wider text-gray-400">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">S.No</th>
                      <th className="px-4 py-3 text-left font-semibold">Name</th>
                      <th className="px-4 py-3 text-left font-semibold">Email</th>
                      <th className="px-4 py-3 text-left font-semibold">Phone</th>
                      <th className="px-4 py-3 text-left font-semibold">Message</th>
                      <th className="px-4 py-3 text-left font-semibold">Resume</th>
                      <th className="px-4 py-3 text-left font-semibold">Date</th>
                      <th className="px-4 py-3 text-left font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((s, i) => (
                      <tr key={s._id} className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 text-gray-500 font-medium">{i + 1}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
                        <td className="px-4 py-3 text-gray-600">{s.email}</td>
                        <td className="px-4 py-3 text-gray-600">{s.phone || '—'}</td>
                        <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{s.message}</td>
                        <td className="px-4 py-3">
                          {s.resume?.filename ? (
                            <a
                              href={resumeUrl(s._id)}
                              className="text-xs font-semibold text-[#D4AF37] hover:underline"
                            >
                              Download
                            </a>
                          ) : (
                            <span className="text-xs text-gray-300">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {new Date(s.createdAt || s.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setSelected(s)}
                            className="text-xs font-semibold text-[#1d2653] hover:underline"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-[#1d2653]">Application Details</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <Row label="Name" value={selected.name} />
              <Row label="Email" value={selected.email} />
              <Row label="Phone" value={selected.phone || '—'} />
              {selected.message && (
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Message</p>
                  <p className="text-gray-700 whitespace-pre-wrap">{selected.message}</p>
                </div>
              )}
              {selected.resume?.filename && (
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Resume</p>
                  <a
                    href={resumeUrl(selected._id)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1d2653] hover:text-[#D4AF37]"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    {selected.resume.filename}
                    {selected.resume.size ? (
                      <span className="text-xs text-gray-400">({Math.round(selected.resume.size / 1024)} KB)</span>
                    ) : null}
                  </a>
                </div>
              )}
              <Row
                label="Submitted"
                value={new Date(selected.createdAt || selected.timestamp).toLocaleString()}
              />
              {selected.ipAddress && <Row label="IP Address" value={selected.ipAddress} />}
              {selected.location && (selected.location.city || selected.location.country) && (
                <Row
                  label="Location"
                  value={[selected.location.city, selected.location.region, selected.location.country]
                    .filter(Boolean)
                    .join(', ')}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold sm:w-32 flex-shrink-0">{label}</p>
      <p className="text-gray-700 break-words">{value}</p>
    </div>
  )
}
