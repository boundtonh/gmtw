'use client'

import { usePathname } from 'next/navigation'
import { TopBanner } from '@/components/layout/TopBanner'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/layout/ScrollToTop'

const NO_CHROME_ROUTES = ['/ads']

export function MainChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showChrome = !NO_CHROME_ROUTES.includes(pathname)

  return (
    <>
      {showChrome && <ScrollToTop />}
      {showChrome && <TopBanner />}
      {showChrome && <Header />}
      <main id="main-content">{children}</main>
      {showChrome && <Footer />}
    </>
  )
}
