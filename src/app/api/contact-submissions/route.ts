import { NextRequest, NextResponse } from 'next/server'
import { requirePermission } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  const gate = await requirePermission(request, 'contact-submissions', 'view')
  if (gate.error) return gate.error

  try {
    const db = gate.auth.db

    const submissions = await db
      .collection('contact_submissions')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({ success: true, submissions, total: submissions.length })
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return NextResponse.json({ error: 'Failed to fetch contact submissions' }, { status: 500 })
  }
}
