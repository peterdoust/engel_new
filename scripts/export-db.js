// Export a MongoDB database to line-delimited canonical EJSON, one file per
// collection plus a _metadata.json describing counts and indexes.
//
//   node scripts/export-db.js                        # MONGODB_URI from .env.local
//   MONGODB_URI="mongodb+srv://..." node scripts/export-db.js
//   node scripts/export-db.js "<uri>" DB/my-export   # explicit uri and output dir
//
// Note the active MONGODB_URI in .env.local points at localhost; exporting Atlas
// means passing that URI explicitly (via the shell or argv), not editing .env.local.
//
// The exported files are raw documents: raffle_admin carries admin password hashes
// and session tokens. The default output directory lives under DB/, which .gitignore
// excludes — an explicit output directory elsewhere needs its own ignore rule.
//
// Restore with DB/restore.sh, or per collection:
//   mongoimport --uri "<uri>" --collection <name> --file <name>.json
// mongoimport restores documents but never indexes, which is why _metadata.json
// records them — including for empty collections, whose only content IS the index
// (e.g. the unique constraint on page_seo.path).
const { MongoClient, BSON } = require('mongodb')
const fs = require('fs')
const path = require('path')

const { EJSON } = BSON

const envPath = path.join(__dirname, '..', '.env.local')
const envText = fs.readFileSync(envPath, 'utf8')
envText.split('\n').forEach(line => {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
  if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2]
})

const URI = (process.argv[2] || process.env.MONGODB_URI || '').trim()
const DEFAULT_DB = 'engelandengel'

// The URI carries a password whenever it points at Atlas, and _metadata.json is
// written to disk — keep host and database only.
function redact(uri) {
  return uri.replace(/\/\/[^@]*@/, '//').split('?')[0]
}

function databaseFrom(uri) {
  const m = uri.match(/^mongodb(?:\+srv)?:\/\/[^/]+\/([^?]+)/)
  return m ? decodeURIComponent(m[1]) : DEFAULT_DB
}

async function main() {
  if (!URI) {
    console.error('No URI: pass one as the first argument or set MONGODB_URI in .env.local')
    process.exit(1)
  }

  const dbName = databaseFrom(URI)
  const outDir = path.resolve(
    process.argv[3] ||
      path.join(__dirname, '..', 'DB', `export-${new Date().toISOString().slice(0, 10)}`)
  )
  fs.mkdirSync(outDir, { recursive: true })

  const client = new MongoClient(URI)
  await client.connect()

  // Print the resolved hosts: .env.local holds both a localhost and an Atlas URI,
  // and exporting the wrong one is otherwise silent — the output looks identical.
  console.log('Host(s):  ', [...client.topology.s.description.servers.keys()].join(', '))
  console.log('Database: ', dbName)
  console.log('Output:   ', outDir)

  const db = client.db(dbName)
  const names = (await db.listCollections({}, { nameOnly: true }).toArray())
    .map(c => c.name)
    .sort()

  const collections = []
  const emptyCollections = []

  for (const name of names) {
    const coll = db.collection(name)
    const indexes = await coll.indexes()
    const count = await coll.countDocuments()

    if (count === 0) {
      emptyCollections.push({ name, note: 'empty at export time', indexes })
      console.log(`  ${name}: empty`)
      continue
    }

    const file = `${name}.json`
    const out = fs.createWriteStream(path.join(outDir, file), { encoding: 'utf8' })
    let written = 0
    for await (const doc of coll.find({})) {
      // Canonical (relaxed: false) so ObjectIds and Dates survive the round trip
      // as $oid/$date instead of degrading to strings.
      out.write(EJSON.stringify(doc, { relaxed: false }) + '\n')
      written++
    }
    await new Promise((resolve, reject) => out.end(resolve).on('error', reject))

    // count is read before the cursor, so a write landing mid-export shows up as a
    // mismatch here rather than passing unnoticed.
    collections.push({ name, count, written, file, indexes })
    console.log(`  ${name}: ${written} of ${count} documents -> ${file}`)
    if (written !== count) {
      console.log(`    warning: count changed during export (${count} -> ${written})`)
    }
  }

  const metadata = {
    exportedAt: new Date().toISOString(),
    sourceUri: redact(URI),
    database: dbName,
    format: 'line-delimited canonical EJSON (one document per line)',
    restoreHint: 'mongoimport --uri "<uri>" --collection <name> --file <name>.json',
    collections,
    emptyCollections,
  }
  fs.writeFileSync(path.join(outDir, '_metadata.json'), JSON.stringify(metadata, null, 2))

  await client.close()
  console.log('Done.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
