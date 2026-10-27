/**
 * One-time migration for the permission system.
 *
 * Existing accounts in raffle_admin predate roles: they have no `role` field, which
 * hasPermission() treats as a non-admin with no grants. Left alone, everyone —
 * including the original administrator — would be locked out of every section.
 *
 * This promotes existing accounts to role:'admin' so current behaviour is preserved,
 * and is safe to re-run: accounts that already have a role are left untouched.
 *
 *   node scripts/migrate-user-roles.js          # promote all pre-existing accounts
 *   node scripts/migrate-user-roles.js a@b.com  # promote only this account
 */
const { MongoClient } = require('mongodb')
const fs = require('fs')
const path = require('path')

const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2]
  })
}

const ONLY_EMAIL = process.argv[2] ? process.argv[2].trim().toLowerCase() : null

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not found in .env.local')
    process.exit(1)
  }

  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()
  const collection = client.db('engelandengel').collection('raffle_admin')

  const filter = { role: { $exists: false } }
  if (ONLY_EMAIL) filter.email = ONLY_EMAIL

  const pending = await collection.find(filter).toArray()
  if (pending.length === 0) {
    console.log('Nothing to migrate — every matching account already has a role.')
  } else {
    const result = await collection.updateMany(filter, {
      $set: { role: 'admin', permissions: {}, updatedAt: new Date().toISOString() },
    })
    console.log(`Promoted ${result.modifiedCount} account(s) to admin:`)
    pending.forEach(doc => console.log('  -', doc.email))
  }

  const summary = await collection
    .find({}, { projection: { email: 1, role: 1 } })
    .toArray()
  console.log('\nCurrent accounts:')
  summary.forEach(doc => console.log(`  ${doc.email}  ->  ${doc.role || '(none)'}`))

  await client.close()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
