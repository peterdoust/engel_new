const { MongoClient } = require('mongodb')
const fs = require('fs')
const path = require('path')

const envPath = path.join(__dirname, '..', '.env.local')
const envText = fs.readFileSync(envPath, 'utf8')
envText.split('\n').forEach(line => {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
  if (m) process.env[m[1]] = m[2]
})

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not found in .env.local')
    process.exit(1)
  }
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()
  const db = client.db('engelandengel')
  const collection = db.collection('publication_requests')
  const before = await collection.countDocuments()
  const result = await collection.deleteMany({})
  console.log(`publication_requests: deleted ${result.deletedCount} of ${before} documents`)
  await client.close()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
