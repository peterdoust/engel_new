import { NextRequest, NextResponse } from 'next/server'
import { requirePermission } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  // A plain read of the current winner only needs view; actually drawing one
  // writes to raffle_winner, so that path is gated on edit further down.
  const checkOnly = request.headers.get('x-check-winner') === 'true'
  const gate = await requirePermission(request, 'raffle', checkOnly ? 'view' : 'edit')
  if (gate.error) return gate.error

  try {
    const db = gate.auth.db

    // Check if winner already selected
    const existingWinner = await db.collection('raffle_winner').findOne({})

    if (checkOnly) {
      return NextResponse.json({ success: true, winner: existingWinner || null, alreadySelected: !!existingWinner })
    }

    // Block re-picking if winner is already confirmed
    if (existingWinner?.confirmed) {
      return NextResponse.json({ success: true, winner: existingWinner, alreadySelected: true })
    }

    // Clear previous winner to allow re-picking
    const previousWinnerEmail = existingWinner?.email || null
    if (existingWinner) {
      await db.collection('raffle_winner').deleteMany({})
    }

    // Pick random winner (exclude previous winner if more than 1 entry)
    const allEntries = await db.collection('raffle_entries').find({}).toArray()
    if (allEntries.length === 0) {
      return NextResponse.json({ error: 'No entries found' }, { status: 404 })
    }

    // Filter out previous winner if possible
    let entries = allEntries
    if (previousWinnerEmail && allEntries.length > 1) {
      entries = allEntries.filter(e => e.email !== previousWinnerEmail)
    }

    // Fisher-Yates shuffle for fair randomness, then pick first
    for (let i = entries.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [entries[i], entries[j]] = [entries[j], entries[i]]
    }
    const winner = entries[0]

    // Save winner to database (not confirmed yet — no email sent)
    await db.collection('raffle_winner').insertOne({
      name: winner.name,
      email: winner.email,
      phone: winner.phone,
      company: winner.company,
      confirmed: false,
      selectedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, winner: { ...winner, confirmed: false }, totalEntries: entries.length })
  } catch (error) {
    console.error('Error selecting winner:', error)
    return NextResponse.json({ error: 'Failed to select winner' }, { status: 500 })
  }
}
