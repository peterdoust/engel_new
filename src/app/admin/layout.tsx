'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { SidebarProvider, useSidebarSlot } from './SidebarContext'
import { useCurrentUser, resetCurrentUserCache } from './useCurrentUser'
import type { SectionKey } from '@/lib/permissions'

const NAV: { name: string; href: string; section: SectionKey; icon: React.ReactNode }[] = [
  {
    name: 'Publication Requests',
    href: '/admin/publication-requests',
    section: 'publication-requests',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    name: 'Raffle Submissions',
    href: '/admin/raffle',
    section: 'raffle',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    name: 'Contact Inquiries',
    href: '/admin/contact-submissions',
    section: 'contact-submissions',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Unsubscribe List',
    href: '/admin/unsubscribes',
    section: 'unsubscribes',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeWidth={1.8} d="M4 4l16 16" />
      </svg>
    ),
  },
  {
    name: 'Career Applications',
    href: '/admin/career-applications',
    section: 'career-applications',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'SEO Meta',
    href: '/admin/seo',
    section: 'seo',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
      </svg>
    ),
  },
]

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { extras } = useSidebarSlot()
  const { user, loading: userLoading, can } = useCurrentUser()

  const isLoginPage = pathname === '/admin/login'

  // Only the sections this user may view, plus Users for admins.
  const visibleNav = user ? NAV.filter(item => can(item.section, 'view')) : []

  // Deep links and stale bookmarks must not leave a user staring at a section
  // they cannot load. Send them to their first permitted section instead.
  useEffect(() => {
    if (isLoginPage || userLoading || !user) return
    const current = NAV.find(item => pathname === item.href || pathname?.startsWith(item.href + '/'))
    if (current && !can(current.section, 'view')) {
      const fallback = visibleNav[0]?.href || (user.canManageUsers ? '/admin/users' : '/admin/no-access')
      router.replace(fallback)
      return
    }
    if (pathname?.startsWith('/admin/users') && !user.canManageUsers) {
      router.replace(visibleNav[0]?.href || '/admin/no-access')
    }
  }, [pathname, user, userLoading, isLoginPage, router, can, visibleNav])

  useEffect(() => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('raffle_token') : null
    if (token) {
      setIsAuthenticated(true)
    } else if (!isLoginPage) {
      router.replace('/admin/login')
      return
    }
    setAuthChecked(true)
  }, [pathname, isLoginPage, router])

  const handleLogout = () => {
    sessionStorage.removeItem('raffle_token')
    resetCurrentUserCache()
    setIsAuthenticated(false)
    router.replace('/admin/login')
  }

  if (isLoginPage) return <>{children}</>

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        Loading...
      </div>
    )
  }
  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1d2653] text-white rounded-lg shadow-lg"
        aria-label="Toggle sidebar"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {sidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-[#1d2653] text-white flex flex-col transform transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="block">
            <Image src="/images/brand/ee-logo-horizontal-white.png" alt="Engel & Engel LLP, Forensic Accountants" width={1084} height={177} className="h-8 w-auto" />
          </Link>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-1 border-b border-white/5">
          {visibleNav.map(item => {
            const active = pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-[#D4AF37] text-[#1d2653]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            )
          })}

          {user?.canManageUsers && (
            <Link
              href="/admin/users"
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                pathname?.startsWith('/admin/users')
                  ? 'bg-[#D4AF37] text-[#1d2653]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Users</span>
            </Link>
          )}
        </nav>

        {/* Page-specific extras */}
        <div className="flex-1 overflow-y-auto">
          {extras}
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          {user && (
            <div className="mb-3 px-1">
              <p className="text-[11px] font-semibold text-white truncate">{user.name || user.email}</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wide">
                {user.role === 'admin' ? 'Administrator' : 'User'}
              </p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminShell>{children}</AdminShell>
    </SidebarProvider>
  )
}
