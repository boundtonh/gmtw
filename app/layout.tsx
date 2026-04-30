import type { Metadata } from 'next'
import { TopBanner } from '@/components/layout/TopBanner'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { PhoneProvider } from '@/components/layout/PhoneProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Green Mountain Tableworx | Custom Live Edge Furniture — NH & RI',
  description:
    'Handcrafted live edge, river & ocean tables. Custom orders for New England homes. Two showrooms: Concord NH & Smithfield RI. In-room delivery across New England.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://greenmountaintable.com'
  ),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/hvg4oyp.css" />
      </head>
      <body>
        <PhoneProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-gmt-green focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>
        <ScrollToTop />
        <TopBanner />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        </PhoneProvider>
      </body>
    </html>
  )
}
