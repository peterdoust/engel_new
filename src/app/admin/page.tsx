'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SECTIONS } from '@/lib/permissions'
import { useCurrentUser } from './useCurrentUser'

export default function AdminPage() {
  const router = useRouter()
  const { user, loading, unauthorized } = useCurrentUser()

  useEffect(() => {
    if (loading) return
    if (unauthorized || !user) {
      router.replace('/admin/login')
      return
    }
    // Land on a section this user can actually open — a fixed destination would
    // bounce anyone without that particular permission.
    const first = SECTIONS.find(s => user.sections.includes(s.key))
    if (first) router.replace(first.href)
    else if (user.canManageUsers) router.replace('/admin/users')
    else router.replace('/admin/no-access')
  }, [router, user, loading, unauthorized])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-400 text-sm animate-pulse">
        Redirecting...
      </div>
    </div>
  )
}
