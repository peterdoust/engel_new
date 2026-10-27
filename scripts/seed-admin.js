const { MongoClient } = require('mongodb')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const envPath = path.join(__dirname, '..', '.env.local')
const envText = fs.readFileSync(envPath, 'utf8')
envText.split('\n').forEach(line => {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
  if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2]
})

const MIN_LENGTH = 12

// Password sources, in order: ADMIN_PASSWORD (shell or .env.local), then argv,
// then a generated one. There is deliberately no hardcoded fallback — this file
// is committed to a public repository.
function resolvePassword() {
  const supplied = process.env.ADMIN_PASSWORD || process.argv[3]
  if (!supplied) {
    // 24 base64url chars ~ 144 bits of entropy
    return { password: crypto.randomBytes(18).toString('base64url'), generated: true }
  }
  if (supplied.length < MIN_LENGTH) {
    console.error(`Password must be at least ${MIN_LENGTH} characters (got ${supplied.length}).`)
    process.exit(1)
  }
  return { password: supplied, generated: false }
}

const EMAIL = process.argv[2] || 'admin@engelandengel.com'
const { password: PASSWORD, generated: GENERATED } = resolvePassword()

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not found in .env.local')
    process.exit(1)
  }
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()
  const db = client.db('engelandengel')
  const hash = crypto.createHash('sha256').update(PASSWORD).digest('hex')
  const result = await db.collection('raffle_admin').updateOne(
    { email: EMAIL.trim().toLowerCase() },
    {
      $set: {
        email: EMAIL.trim().toLowerCase(),
        password: hash,
        // This script seeds the top-level administrator, who is defined by the role
        // rather than by a permissions map (see src/lib/permissions.ts).
        role: 'admin',
        permissions: {},
        updatedAt: new Date().toISOString(),
      },
      $setOnInsert: { createdAt: new Date().toISOString() },
    },
    { upsert: true }
  )
  console.log('Admin account ready:')
  console.log('  Email:   ', EMAIL)
  console.log('  Action:  ', result.upsertedCount ? 'created' : 'updated')
  if (GENERATED) {
    console.log('  Password:', PASSWORD)
    console.log('\nGenerated password — store it now, it is not recoverable.')
  } else {
    console.log('  Password: (the one you supplied)')
  }
  await client.close()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
