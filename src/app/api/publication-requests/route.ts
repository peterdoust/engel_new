import { NextRequest, NextResponse } from 'next/server'
import { requirePermission } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  const gate = await requirePermission(request, 'publication-requests', 'view')
  if (gate.error) return gate.error

  try {
    const db = gate.auth.db

    const requests = await db
      .collection('publication_requests')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({ success: true, requests, total: requests.length })
  } catch (error) {
    console.error('Error fetching publication requests:', error)
    return NextResponse.json({ error: 'Failed to fetch publication requests' }, { status: 500 })
  }
}
