'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { Action, PermissionMap, SectionKey } from '@/lib/permissions'

export type CurrentUser = {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  permissions: PermissionMap
  sections: SectionKey[]
  canManageUsers: boolean
}

/**
 * Loads the signed-in user's identity and effective permissions.
 *
 * This drives what the UI offers — hiding a section the user cannot open is a
 * usability concern, not the security boundary. The API enforces the same rules
 * independently, so a user who forges this state still gets a 403 from the server.
 */
/**
 * Shared across every mount of this hook.
 *
 * React 18 Strict Mode mounts effects twice in development, and several components
 * (the layout plus each page) use this hook at once. Caching the in-flight promise
 * means one request per token, and — critically — a remount reuses the settled
 * result instead of discarding it. An earlier version aborted on cleanup, which in
 * Strict Mode threw away the only response and left the sidebar empty.
 */
let cachedToken: string | null = null
let cachedRequest: Promise<CurrentUser | null> | null = null

function fetchCurrentUser(token: string): Promise<CurrentUser | null> {
  if (cachedToken === token && cachedRequest) return cachedRequest
  cachedToken = token
  cachedRequest = fetch('/api/admin/me', { headers: { 'x-admin-key': token } })
    .then(res => (res.ok ? res.json() : null))
    .then(data => (data?.user as CurrentUser) ?? null)
    .catch(() => null)
  return cachedRequest
}

/** Call after login/logout so the next mount re-reads the identity. */
export function resetCurrentUserCache() {
  cachedToken = null
  cachedRequest = null
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [unauthorized, setUnauthorized] = useState(false)

  // The admin layout persists across client-side navigation, so this hook mounts
  // once — on the login page, before any token exists. Re-reading on pathname
  // change is what lets the sidebar populate after login without a full reload.
  const pathname = usePathname()

  useEffect(() => {
    const token = sessionStorage.getItem('raffle_token')
    if (!token) {
      setUser(null)
      setUnauthorized(true)
      setLoading(false)
      return
    }
    setUnauthorized(false)
    // No cancellation guard here on purpose: under Strict Mode the first mount's
    // cleanup would fire before the response arrives and drop it permanently.
    fetchCurrentUser(token).then(result => {
      if (result) setUser(result)
      else setUnauthorized(true)
      setLoading(false)
    })
  }, [pathname])

  const can = (section: SectionKey, action: Action = 'view') => {
    if (!user) return false
    if (user.role === 'admin') return true
    return user.permissions?.[section]?.[action] === true
  }

  return { user, loading, unauthorized, can }
}
