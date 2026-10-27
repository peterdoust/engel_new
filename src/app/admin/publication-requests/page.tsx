'use client'

import React, { useState, useEffect, useMemo } from 'react'

interface PublicationRequest {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  firmName: string
  position?: string
  category: string
  requestedPublications: string[]
  timestamp: string
  createdAt: string
}

export default function PublicationRequestsAdmin() {
  const [authToken, setAuthToken] = useState('')
  const [requests, setRequests] = useState<PublicationRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    const token = sessionStorage.getItem('raffle_token')
    if (token) {
      setAuthToken(token)
      fetchRequests(token)
    }
  }, [])

  const fetchRequests = async (token?: string) => {
    const key = token || authToken
    if (!key) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/publication-requests', {
        headers: { 'x-admin-key': key },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load')
      setRequests(data.requests || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load requests')
    } finally {
      setLoading(false)
    }
  }

  const categories = useMemo(() => {
    const set = new Set<string>()
    requests.forEach(r => r.category && set.add(r.category))
    return Array.from(set).sort()
  }, [requests])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return requests.filter(r => {
      if (categoryFilter !== 'all' && r.category !== categoryFilter) return false
      if (!q) return true
      return (
        `${r.firstName} ${r.lastName}`.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.firmName?.toLowerCase().includes(q) ||
        r.position?.toLowerCase().includes(q) ||
        r.category?.toLowerCase().includes(q)
      )
    })
  }, [requests, search, categoryFilter])

  const exportCsv = () => {
    const headers = [
      'S.No', 'First Name', 'Last Name', 'Email', 'Firm', 'Position', 'Phone',
      'Category', 'Requested Publications', 'Date'
    ]
    const rows = filtered.map((r, i) => [
      i + 1,
      r.firstName, r.lastName, r.email, r.firmName, r.position || '', r.phone,
      r.category,
      (r.requestedPublications || []).join('; '),
      new Date(r.createdAt || r.timestamp).toLocaleString()
    ])
    const csv = [headers, ...rows]
      .map(row => row.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `publication-requests-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="lg:pl-0 pl-12">
            <h1 className="text-lg sm:text-xl font-bold text-[#1d2653]">Publication Requests</h1>
            <p className="text-xs text-gray-500 mt-0.5">{requests.length} total submissions</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchRequests()}
              className="flex-1 sm:flex-none text-xs font-semibold text-gray-600 hover:text-[#1d2653] px-3 py-2 border border-gray-200 rounded-lg"
            >
              Refresh
            </button>
            <button
              onClick={exportCsv}
              disabled={requests.length === 0}
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
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search by name, email, firm, position..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] outline-none"
            />
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            >
              <option value="all">All Categories ({requests.length})</option>
              {categories.map(c => (
                <option key={c} value={c}>
                  {c} ({requests.filter(r => r.category === c).length})
                </option>
              ))}
            </select>
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
              {requests.length === 0 ? 'No publication requests yet.' : 'No matches for current filter.'}
            </div>
          ) : (
            <>
              {/* Mobile + tablet cards */}
              <ul className="lg:hidden divide-y divide-gray-100">
                {filtered.map((r, i) => (
                  <li key={r._id} className="px-4 py-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-baseline gap-2 min-w-0 flex-1">
                        <span className="text-[11px] text-gray-400 font-medium flex-shrink-0">#{i + 1}</span>
                        <p className="text-sm font-semibold text-gray-900 truncate">{r.firstName} {r.lastName}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 flex-shrink-0">
                        {new Date(r.createdAt || r.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs mt-2">
                      <p className="text-gray-600 truncate"><span className="text-gray-400">Firm:</span> {r.firmName}</p>
                      {r.position && <p className="text-gray-600 truncate"><span className="text-gray-400">Position:</span> {r.position}</p>}
                      <p className="text-gray-500 truncate"><span className="text-gray-400">Email:</span> {r.email}</p>
                      <p className="text-gray-500 truncate"><span className="text-gray-400">Phone:</span> {r.phone}</p>
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
                      <th className="px-4 py-3 text-left font-semibold">Firm</th>
                      <th className="px-4 py-3 text-left font-semibold">Position</th>
                      <th className="px-4 py-3 text-left font-semibold">Phone</th>
                      <th className="px-4 py-3 text-left font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((r, i) => (
                      <tr key={r._id} className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 text-gray-500 font-medium">{i + 1}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {r.firstName} {r.lastName}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{r.email}</td>
                        <td className="px-4 py-3 text-gray-600">{r.firmName}</td>
                        <td className="px-4 py-3 text-gray-600">{r.position || '—'}</td>
                        <td className="px-4 py-3 text-gray-600">{r.phone}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {new Date(r.createdAt || r.timestamp).toLocaleDateString()}
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

    </div>
  )
}
