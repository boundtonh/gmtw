import type { Metadata } from 'next'
import Script from 'next/script'
import { MainChrome } from '@/components/layout/MainChrome'
import { PhoneProvider } from '@/components/layout/PhoneProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Green Mountain Tableworx | Custom Live Edge Furniture — NH & RI',
  description:
    'Handcrafted live edge, river & ocean tables. Custom orders for New England homes. Two showrooms: Concord NH & Smithfield RI. In-home delivery across New England.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://greenmountaintable.com'
  ),
  openGraph: {
    images: [
      {
        url: '/images/Gmtw-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Green Mountain Tableworx — One Of A Kind Wood Furniture',
      },
    ],
  },
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
          <MainChrome>{children}</MainChrome>
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
