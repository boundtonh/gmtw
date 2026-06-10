/**
 * Build-time script: syncs wood species data from Google Drive.
 *
 * Run with: node scripts/sync-wood-species.mjs
 * Vercel build command: node scripts/sync-wood-species.mjs && next build
 *
 * Requires env vars:
 *   GOOGLE_SERVICE_ACCOUNT_KEY  — JSON string of service account credentials
 *   DRIVE_WOOD_SPECIES_FOLDER_ID — Google Drive folder ID (root species folder)
 *
 * Outputs:
 *   /lib/woodSpecies.generated.ts  — species data with file IDs and metadata
 *   /public/images/wood-species/   — cover image for each species (first non-HEIC image)
 */

import { google } from 'googleapis'
import { createWriteStream, mkdirSync, existsSync } from 'fs'
import { writeFile } from 'fs/promises'
import { join, extname, dirname } from 'path'
import { fileURLToPath } from 'url'
import { pipeline } from 'stream/promises'
import https from 'https'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = join(__dirname, '..')

const FOLDER_ID = process.env.DRIVE_WOOD_SPECIES_FOLDER_ID || '17uGLUimp3ozCK54J4db-YVoCGWfTJQI8'
const KEY_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_KEY

const IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
])
const COVER_PREFERRED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

// ── Helpers ──────────────────────────────────────────────────────────────────

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function isImageFile(file) {
  if (!file.mimeType) return false
  return IMAGE_MIME_TYPES.has(file.mimeType) || file.mimeType.startsWith('image/')
}

function isCoverCandidate(file) {
  if (!isImageFile(file)) return false
  const ext = extname(file.name || '').toLowerCase()
  return COVER_PREFERRED_EXTS.has(ext)
}

async function listFolderContents(drive, folderId) {
  const files = []
  const subfolders = []
  let pageToken = undefined

  do {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, name, mimeType, imageMediaMetadata)',
      pageSize: 100,
      pageToken,
      includeItemsFromAllDrives: true,
      supportsAllDrives: true,
    })

    for (const file of res.data.files || []) {
      if (file.mimeType === 'application/vnd.google-apps.folder') {
        subfolders.push(file)
      } else if (isImageFile(file)) {
        files.push({
          fileId: file.id,
          name: file.name,
          mimeType: file.mimeType,
          width: file.imageMediaMetadata?.width || null,
          height: file.imageMediaMetadata?.height || null,
        })
      }
    }

    pageToken = res.data.nextPageToken
  } while (pageToken)

  return { files, subfolders }
}

async function downloadCoverImage(drive, fileId, destPath) {
  mkdirSync(dirname(destPath), { recursive: true })

  // Use the googleapis drive client to download — handles auth automatically
  const res = await drive.files.get(
    { fileId, alt: 'media', supportsAllDrives: true },
    { responseType: 'stream' }
  )

  const writer = createWriteStream(destPath)
  await pipeline(res.data, writer)
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!KEY_JSON) {
    console.warn(
      '\n⚠  GOOGLE_SERVICE_ACCOUNT_KEY is not set.\n' +
      '   Skipping Drive sync — keeping existing woodSpecies.generated.ts.\n' +
      '   Set this env var and re-run to sync real data.\n'
    )
    process.exit(0)
  }

  let credentials
  try {
    credentials = JSON.parse(KEY_JSON)
  } catch {
    console.error('❌  GOOGLE_SERVICE_ACCOUNT_KEY is not valid JSON.')
    process.exit(1)
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  })

  const drive = google.drive({ version: 'v3', auth })

  console.log('🌲  Syncing wood species from Google Drive...')

  // List top-level species folders
  const { subfolders: speciesFolders } = await listFolderContents(drive, FOLDER_ID)
  console.log(`   Found ${speciesFolders.length} species folders`)

  const coverDir = join(ROOT_DIR, 'public', 'images', 'wood-species')
  mkdirSync(coverDir, { recursive: true })

  const speciesData = []
  let totalPhotos = 0

  for (const folder of speciesFolders.sort((a, b) => a.name.localeCompare(b.name))) {
    const slug = slugify(folder.name)
    process.stdout.write(`   Processing: ${folder.name}...`)

    const { files: directFiles, subfolders: varietyFolders } = await listFolderContents(drive, folder.id)

    // Process sub-varieties (e.g. Maple's Birdseye Maple, Spalted Maple, etc.)
    const varieties = []
    for (const varFolder of varietyFolders.sort((a, b) => a.name.localeCompare(b.name))) {
      const varSlug = slugify(varFolder.name)
      const { files: varFiles } = await listFolderContents(drive, varFolder.id)

      // Download cover for variety
      const varCoverFile = varFiles.find(isCoverCandidate) || varFiles[0]
      let varCoverImage = null
      if (varCoverFile) {
        const ext = extname(varCoverFile.name).toLowerCase() || '.jpg'
        const varCoverPath = join(coverDir, `${varSlug}-cover${ext}`)
        try {
          await downloadCoverImage(drive, varCoverFile.fileId, varCoverPath)
          varCoverImage = `/images/wood-species/${varSlug}-cover${ext}`
        } catch (err) {
          console.warn(`\n      ⚠  Could not download cover for ${varFolder.name}: ${err.message}`)
        }
      }

      varieties.push({
        name: varFolder.name,
        slug: varSlug,
        coverImage: varCoverImage,
        photoCount: varFiles.length,
        driveFileIds: varFiles.map(({ fileId, name, width, height }) => ({ fileId, name, width, height })),
        varieties: [],
      })
      totalPhotos += varFiles.length
    }

    // Download cover for species
    const coverFile = directFiles.find(isCoverCandidate) || directFiles[0]
    let coverImage = null
    if (coverFile) {
      const ext = extname(coverFile.name).toLowerCase() || '.jpg'
      const coverPath = join(coverDir, `${slug}-cover${ext}`)
      try {
        await downloadCoverImage(drive, coverFile.fileId, coverPath)
        coverImage = `/images/wood-species/${slug}-cover${ext}`
      } catch (err) {
        console.warn(`\n      ⚠  Could not download cover for ${folder.name}: ${err.message}`)
      }
    }

    // Fall back to first variety cover if species has no direct images
    if (!coverImage && varieties.length > 0 && varieties[0].coverImage) {
      coverImage = varieties[0].coverImage
    }

    const speciesPhotoCount = directFiles.length + varieties.reduce((n, v) => n + v.photoCount, 0)
    totalPhotos += directFiles.length

    speciesData.push({
      name: folder.name,
      slug,
      coverImage,
      photoCount: speciesPhotoCount,
      driveFileIds: directFiles.map(({ fileId, name, width, height }) => ({ fileId, name, width, height })),
      varieties,
    })

    console.log(` ${directFiles.length} photos${varieties.length ? ` + ${varieties.length} varieties` : ''}`)
  }

  // Write generated TypeScript file
  const generatedTs = `// This file is auto-generated by scripts/sync-wood-species.mjs
// Do not edit manually — run \`node scripts/sync-wood-species.mjs\` to regenerate.
// Last synced: ${new Date().toISOString()}

export interface SpeciesPhoto {
  fileId: string
  name: string
  width: number | null
  height: number | null
}

export interface WoodSpecies {
  name: string
  slug: string
  coverImage: string | null
  photoCount: number
  driveFileIds: SpeciesPhoto[]
  varieties: WoodSpecies[]
}

export const woodSpeciesData: WoodSpecies[] = ${JSON.stringify(speciesData, null, 2)}
`

  const outPath = join(ROOT_DIR, 'lib', 'woodSpecies.generated.ts')
  await writeFile(outPath, generatedTs, 'utf8')

  console.log(`\n✅  Synced ${speciesData.length} species, ${totalPhotos} total photos`)
  console.log(`   Output: lib/woodSpecies.generated.ts`)
  console.log(`   Cover images: public/images/wood-species/\n`)
}

main().catch((err) => {
  console.error('❌  Sync failed:', err.message)
  process.exit(1)
})
