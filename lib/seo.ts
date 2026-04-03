import type { Metadata } from 'next'

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://greenmountaintableworx.com'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${path}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${path}`,
      siteName: 'Green Mountain Tableworx',
      type: 'website',
    },
  }
}
