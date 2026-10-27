'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSidebarSlot } from '../SidebarContext'
import { useCurrentUser } from '../useCurrentUser'

interface Entry {
  _id: string
  name: string
  title: string
  email: string
  phone: string
  company: string
  timestamp: string
  confirmed?: boolean
}

export default function RafflePage() {
  const [authToken, setAuthToken] = useState('')
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(false)
  const [winner, setWinner] = useState<Entry | null>(null)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isPickingWinner, setIsPickingWinner] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  // Drawing and confirming a winner both write (and confirming emails the winner),
  // so they require edit. The API enforces this too — see api/raffle/winner.
  const { can } = useCurrentUser()
  const canEdit = can('raffle', 'edit')
  const [showReveal, setShowReveal] = useState(false)
  const [shuffleName, setShuffleName] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [error, setError] = useState('')
  const { setExtras } = useSidebarSlot()

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
    try {
      const res = await fetch('/api/raffle', { headers: { 'x-admin-key': key } })
      const data = await res.json()
      if (data.success) setEntries(data.entries)

      const winnerRes = await fetch('/api/raffle/winner', { headers: { 'x-admin-key': key, 'x-check-winner': 'true' } })
      const winnerData = await winnerRes.json()
      if (winnerData.success && winnerData.winner) {
        setWinner(winnerData.winner)
        setIsConfirmed(!!winnerData.winner.confirmed)
      }
    } catch (err) {
      console.error('Failed to fetch entries:', err)
    } finally {
      setLoading(false)
    }
  }

  const pickWinner = async () => {
    setIsPickingWinner(true)
    setWinner(null)
    setIsConfirmed(false)
    setShowReveal(true)
    setShowConfetti(false)

    const names = entries.map(e => e.name)
    let shuffleCount = 0
    const shuffleInterval = setInterval(() => {
      setShuffleName(names[Math.floor(Math.random() * names.length)])
      shuffleCount++
      if (shuffleCount > 30) clearInterval(shuffleInterval)
    }, 100)

    try {
      await new Promise(r => setTimeout(r, 3500))
      clearInterval(shuffleInterval)

      const res = await fetch('/api/raffle/winner', { headers: { 'x-admin-key': authToken } })
      const data = await res.json()
      if (data.success) {
        setShuffleName(data.winner.name)
        await new Promise(r => setTimeout(r, 500))
        setWinner(data.winner)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 6000)
      }
    } catch (err) {
      console.error('Failed to pick winner:', err)
      setShowReveal(false)
    } finally {
      setIsPickingWinner(false)
    }
  }

  const confirmWinner = async () => {
    setIsConfirming(true)
    setError('')
    try {
      const res = await fetch('/api/raffle/winner/confirm', {
        method: 'POST',
        headers: { 'x-admin-key': authToken },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to confirm winner')
      if (data.success) setIsConfirmed(true)
    } catch (err: any) {
      setError(err.message || 'Failed to confirm winner')
      console.error('Failed to confirm winner:', err)
    } finally {
      setIsConfirming(false)
    }
  }

  const exportCSV = () => {
    const headers = ['Name', 'Title', 'Email', 'Phone', 'Company', 'Submitted']
    const rows = entries.map(e => [e.name, e.title || '', e.email, e.phone, e.company, new Date(e.timestamp).toLocaleString()])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `raffle-entries-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  // Push stats / winner card / actions into the layout's sidebar slot
  useEffect(() => {
    setExtras(
      <div className="flex flex-col h-full">
        <div className="p-5 space-y-4 flex-1">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-white/40 text-[10px] font-semibold tracking-widest uppercase mb-1">Total Entries</p>
            <p className="text-5xl font-bold text-white">{entries.length}</p>
          </div>

          {winner && (
            <div className={`${isConfirmed ? 'bg-green-500/10 border-green-500/30' : 'bg-[#D4AF37]/10 border-[#D4AF37]/30'} border rounded-xl p-4 text-center`}>
              <p className={`text-[10px] font-bold tracking-widest uppercase mb-2 ${isConfirmed ? 'text-green-400' : 'text-[#D4AF37]'}`}>
                {isConfirmed ? 'Confirmed Winner' : 'Selected Winner'}
              </p>
              <p className="text-white font-bold text-lg truncate">{winner.name}</p>
              <p className="text-white/30 text-xs mt-0.5 truncate">{winner.company}</p>
            </div>
          )}

          {!isConfirmed && canEdit && (
            <button
              onClick={pickWinner}
              disabled={entries.length === 0 || isPickingWinner}
              className="w-full py-3.5 bg-[#D4AF37] text-[#1d2653] font-bold text-sm rounded-xl hover:bg-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isPickingWinner ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Picking...
                </span>
              ) : winner ? 'Pick Again' : 'Pick Winner'}
            </button>
          )}

          {winner && !isConfirmed && canEdit && (
            <button
              onClick={confirmWinner}
              disabled={isConfirming}
              className="w-full py-3 bg-green-500 text-white font-bold text-sm rounded-xl hover:bg-green-600 transition-all duration-300 disabled:opacity-50"
            >
              {isConfirming ? 'Confirming...' : 'Confirm Winner'}
            </button>
          )}

          {!canEdit && (
            <p className="text-[11px] text-white/50 text-center leading-relaxed">
              View-only access — drawing and confirming a winner require edit permission.
            </p>
          )}
        </div>

        <div className="p-5 border-t border-white/5 space-y-2">
          <button
            onClick={() => fetchEntries()}
            className="w-full py-2.5 text-xs font-medium text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
          <button
            onClick={exportCSV}
            disabled={entries.length === 0}
            className="w-full py-2.5 text-xs font-medium text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors disabled:opacity-30 flex items-center justify-center gap-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>
    )
    return () => setExtras(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries, winner, isConfirmed, isPickingWinner, isConfirming])

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="p-4 md:p-6 lg:p-8 pl-16 lg:pl-8">
        {error && (
          <div className="mb-4 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        {/* Winner banner */}
        <AnimatePresence>
          {winner && !showReveal && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6"
            >
              <div className="bg-[#1d2653] rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-4 sm:gap-5 min-w-0 w-full">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1d2653] text-lg sm:text-xl font-bold flex-shrink-0">
                    {winner.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-1">
                      {isConfirmed ? 'Confirmed Winner' : 'Winner'}
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold text-white truncate">{winner.name}</h2>
                    <p className="text-white/40 text-xs sm:text-sm truncate">{winner.company} &middot; {winner.email}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Entries table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden max-w-full">
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 flex items-center justify-between gap-3">
            <h2 className="text-base font-bold text-gray-900">All Entries</h2>
            <span className="text-[11px] text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-medium whitespace-nowrap">
              {entries.length} entries
            </span>
          </div>

          {loading ? (
            <div className="px-6 py-20 text-center">
              <svg className="w-8 h-8 animate-spin text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : entries.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <p className="text-gray-300 text-sm">No entries yet</p>
            </div>
          ) : (
            <>
              {/* Mobile + tablet cards */}
              <ul className="lg:hidden divide-y divide-gray-100">
                {entries.map((entry, i) => (
                  <li
                    key={entry._id}
                    className={`px-4 py-4 ${winner?.email === entry.email ? 'bg-[#D4AF37]/5' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#1d2653] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {entry.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-900 truncate">{entry.name}</p>
                          <span className="text-[11px] text-gray-300 font-medium flex-shrink-0">#{i + 1}</span>
                        </div>
                        {entry.title && <p className="text-xs text-gray-400 truncate">{entry.title}</p>}
                        <p className="text-xs text-gray-500 truncate mt-1">{entry.company}</p>
                        <p className="text-xs text-gray-500 truncate">{entry.email}</p>
                        <p className="text-xs text-gray-500 truncate">{entry.phone}</p>
                        <p className="text-[11px] text-gray-400 mt-1">
                          {new Date(entry.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Desktop table (lg and up) */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="bg-gray-50/50">
                      {['#', 'Name', 'Email', 'Phone', 'Company', 'Title', 'Submitted'].map(h => (
                        <th key={h} className="text-left px-6 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry, i) => (
                      <tr
                        key={entry._id}
                        className={`border-t border-gray-50 hover:bg-[#D4AF37]/[0.03] transition-colors ${winner?.email === entry.email ? 'bg-[#D4AF37]/5' : ''}`}
                      >
                        <td className="px-6 py-4 text-sm text-gray-300 font-medium">{i + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#1d2653] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {entry.name.charAt(0)}
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{entry.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{entry.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{entry.phone}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{entry.company}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{entry.title || '—'}</td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {new Date(entry.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Fullscreen winner reveal overlay */}
      <AnimatePresence>
        {showReveal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#1d2653] flex items-center justify-center"
          >
            {showConfetti && (
              <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                {Array.from({ length: 60 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: '50vw', y: '40vh', scale: 0, rotate: 0 }}
                    animate={{
                      x: `${Math.random() * 100}vw`,
                      y: `${Math.random() * 100}vh`,
                      scale: [0, 1, 1, 0.5],
                      rotate: Math.random() * 720 - 360,
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      delay: Math.random() * 0.5,
                      ease: 'easeOut',
                    }}
                    className="absolute"
                    style={{
                      width: `${8 + Math.random() * 12}px`,
                      height: `${8 + Math.random() * 12}px`,
                      backgroundColor: ['#D4AF37', '#FFD700', '#FFA500', '#FFFFFF', '#87CEEB', '#FF6B6B', '#4ADE80'][Math.floor(Math.random() * 7)],
                      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    }}
                  />
                ))}
              </div>
            )}

            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 blur-[200px] rounded-full" />

            <div className="relative z-10 text-center px-6">
              {!winner ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="text-[#D4AF37] text-[11px] font-bold tracking-[0.5em] uppercase mb-6">Selecting Winner</p>
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight"
                  >
                    {shuffleName || '...'}
                  </motion.div>
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, type: 'spring', stiffness: 150 }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
                    className="w-24 h-24 rounded-full bg-[#D4AF37] flex items-center justify-center mx-auto mb-8 shadow-[0_0_60px_rgba(212,175,55,0.4)]"
                  >
                    <span className="text-[#1d2653] text-4xl font-bold">{winner.name.charAt(0)}</span>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-[#D4AF37] text-sm font-bold tracking-[0.5em] uppercase mb-4"
                  >
                    Winner
                  </motion.p>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-4"
                  >
                    {winner.name}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-white/40 text-xl mb-2"
                  >
                    {winner.company}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-white/25 text-sm"
                  >
                    {winner.email}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-10 flex items-center justify-center gap-4 flex-wrap"
                  >
                    {!isConfirmed && (
                      <>
                        <button
                          onClick={() => { setShowReveal(false); pickWinner(); }}
                          className="px-8 py-3 bg-[#D4AF37] text-[#1d2653] text-sm font-bold rounded-lg hover:bg-white transition-colors"
                        >
                          Pick Again
                        </button>
                        <button
                          onClick={() => { confirmWinner(); setShowReveal(false); }}
                          disabled={isConfirming}
                          className="px-8 py-3 bg-green-500 text-white text-sm font-bold rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                        >
                          {isConfirming ? 'Confirming...' : 'Confirm Winner'}
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setShowReveal(false)}
                      className="px-8 py-3 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/10"
                    >
                      Close
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
