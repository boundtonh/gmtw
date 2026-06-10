import { google } from 'googleapis'
import { type NextRequest } from 'next/server'

// Cache authenticated Drive client across warm invocations
let driveClient: ReturnType<typeof google.drive> | null = null

function getDriveClient() {
  if (driveClient) return driveClient

  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!keyJson) return null

  let credentials: object
  try {
    credentials = JSON.parse(keyJson)
  } catch {
    return null
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  })

  driveClient = google.drive({ version: 'v3', auth })
  return driveClient
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { fileId: string } }
) {
  const { fileId } = params

  if (!fileId || !/^[\w-]{10,}$/.test(fileId)) {
    return new Response('Invalid file ID', { status: 400 })
  }

  const drive = getDriveClient()
  if (!drive) {
    return new Response('Drive not configured', { status: 503 })
  }

  try {
    const res = await drive.files.get(
      { fileId, alt: 'media', supportsAllDrives: true },
      { responseType: 'arraybuffer' }
    )

    const contentType = (res.headers as Record<string, string>)['content-type'] ?? 'image/jpeg'
    const buffer = Buffer.from(res.data as ArrayBuffer)

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (err: unknown) {
    const status = (err as { code?: number })?.code === 404 ? 404 : 500
    return new Response('Failed to fetch image', { status })
  }
}
