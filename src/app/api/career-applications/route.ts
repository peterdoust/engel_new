import { NextRequest, NextResponse } from 'next/server'
import { requirePermission } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  const gate = await requirePermission(request, 'career-applications', 'view')
  if (gate.error) return gate.error

  try {
    const db = gate.auth.db

    const submissions = await db
      .collection('career_applications')
      .find({}, {
        projection: {
          'resume.data': 0,
        },
      })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({ success: true, submissions, total: submissions.length })
  } catch (error) {
    console.error('Error fetching career applications:', error)
    return NextResponse.json({ error: 'Failed to fetch career applications' }, { status: 500 })
  }
}
