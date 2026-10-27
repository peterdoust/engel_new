'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LegacyDashboardRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/admin/raffle')
  }, [router])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-gray-400 text-sm">Redirecting...</div>
    </div>
  )
}
