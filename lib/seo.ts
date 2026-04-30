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
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://greenmountaintable.com'

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
      images: [
        {
          url: `${siteUrl}/images/Gmtw-og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Green Mountain Tableworx — One Of A Kind Wood Furniture',
        },
      ],
    },
  }
}
