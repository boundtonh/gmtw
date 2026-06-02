import type { Metadata } from 'next'
import { PhoneProvider } from '@/components/layout/PhoneProvider'
import Script from 'next/script'
import '../globals.css'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AdsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/hvg4oyp.css" />
      </head>
      <body>
        <PhoneProvider>
          {children}
        </PhoneProvider>

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-GQ9WSJFRDH" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GQ9WSJFRDH');
        `}</Script>
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
