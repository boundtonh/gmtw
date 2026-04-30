import type { Metadata } from 'next'
import Script from 'next/script'
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PG55ZWFL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

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

        {/* GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GQ9WSJFRDH"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GQ9WSJFRDH');
        `}</Script>

        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PG55ZWFL');
        `}</Script>
      </body>
    </html>
  )
}
