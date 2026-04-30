'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrolled } from '@/lib/hooks/useScrolled'
import { getProduct, formatPrice } from '@/lib/products'
import { Container } from './Container'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href?: string
  dropdown?: { label: string; href: string }[]
  megaMenu?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Live Edge Tables', href: '/live-edge-tables' },
  {
    label: 'River & Ocean Tables',
    dropdown: [
      { label: 'River Tables', href: '/river-tables' },
      { label: 'Ocean Tables', href: '/ocean-tables' },
    ],
  },
  {
    label: 'All Furniture Types',
    megaMenu: true,
    // dropdown array used only for mobile accordion
    dropdown: [
      { label: 'Dining Tables', href: '/dining-tables' },
      { label: 'Conference Tables', href: '/conference-tables' },
      { label: 'Coffee Tables', href: '/coffee-tables' },
      { label: 'Benches', href: '/benches' },
      { label: 'Console Tables', href: '/console-tables' },
      { label: 'Countertops & Island Tops', href: '/countertops-island-tops' },
      { label: 'Standalone Bars & Bar Tops', href: '/bars-bar-tops' },
      { label: 'Floating Shelves & Mantels', href: '/floating-shelves-mantels' },
      { label: 'Wall Art & Signage', href: '/wall-art-signage' },
    ],
  },
  { label: 'Table Bases', href: '/table-bases' },
]

// Items for the desktop mega menu — matches the dropdown array above
// Map of slugs to their image filenames (matches ProductCard.tsx)
const IMAGE_MAP: Record<string, string | null> = {
  'dining-tables': 'dining-tables-main.jpg',
  'conference-tables': 'conference-table.jpg',
  'console-tables': 'console-tables-main.jpg',
  'benches': 'benches-main.jpg',
  'floating-shelves-mantels': 'mantels-main.jpg',
  'wall-art-signage': 'signs-main.jpg',
  'coffee-tables': 'coffee-table.webp',
  'countertops-island-tops': 'countertops-main.JPG',
  'bars-bar-tops': 'standalone-bartops-main.jpg',
}

const MEGA_MENU_ITEMS = [
  { label: 'Dining Tables',              href: '/dining-tables',            slug: 'dining-tables' },
  { label: 'Conference Tables',          href: '/conference-tables',         slug: 'conference-tables' },
  { label: 'Coffee Tables',              href: '/coffee-tables',             slug: 'coffee-tables' },
  { label: 'Benches',                    href: '/benches',                   slug: 'benches' },
  { label: 'Console Tables',             href: '/console-tables',            slug: 'console-tables' },
  { label: 'Countertops & Island Tops',  href: '/countertops-island-tops',   slug: 'countertops-island-tops' },
  { label: 'Standalone Bars & Bar Tops', href: '/bars-bar-tops',             slug: 'bars-bar-tops' },
  { label: 'Floating Shelves & Mantels', href: '/floating-shelves-mantels',  slug: 'floating-shelves-mantels' },
  { label: 'Wall Art & Signage',         href: '/wall-art-signage',          slug: 'wall-art-signage' },
]

export function Header() {
  const pathname = usePathname()
  const scrolled = useScrolled(80)
  const isHomepage = pathname === '/'

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedMobileItems, setExpandedMobileItems] = useState<Set<string>>(new Set())
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => document.body.classList.remove('overflow-hidden')
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
    setExpandedMobileItems(new Set())
    setActiveDropdown(null)
  }, [pathname])

  const handleMouseEnter = (label: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const toggleMobileItem = (label: string) => {
    setExpandedMobileItems((prev) => {
      const next = new Set(prev)
      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
      }
      return next
    })
  }

  const isSolid = !isHomepage || scrolled

  return (
    <>
      <header
        className={cn(
          'fixed top-[54px] lg:top-0 left-0 right-0 z-40 transition-colors duration-300',
          isSolid ? 'bg-gmt-charcoal' : 'bg-transparent'
        )}
      >
        {/* Main nav bar */}
        <div className="mx-auto w-full max-w-[1320px] px-6 md:px-12 xl:px-24">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo/Untitled.png"
                alt="Green Mountain Tableworx"
                width={140}
                height={81}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-6">
              {NAV_ITEMS.map((item) => {
                // Mega menu — desktop only trigger, no inline dropdown
                if (item.megaMenu) {
                  return (
                    <button
                      key={item.label}
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                      className="flex items-center gap-1 font-body text-white text-[0.85rem] tracking-wide hover:text-gmt-green transition-colors duration-200"
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown className={cn('w-3 h-3 opacity-60 transition-transform duration-200', activeDropdown === item.label && 'rotate-180')} />
                    </button>
                  )
                }

                // Regular dropdown
                if (item.dropdown) {
                  return (
                    <div
                      key={item.label}
                      className="relative cursor-pointer"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        className="flex items-center gap-1 font-body text-white text-[0.85rem] tracking-wide hover:text-gmt-green transition-colors duration-200"
                        aria-expanded={activeDropdown === item.label}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <ChevronDown className={cn('w-3 h-3 opacity-60 transition-transform duration-200', activeDropdown === item.label && 'rotate-180')} />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 z-50 bg-gmt-charcoal border-t-2 border-gmt-green py-4 px-6 min-w-[180px]"
                            onMouseEnter={() => handleMouseEnter(item.label)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <ul className="flex flex-col gap-3">
                              {item.dropdown.map((sub) => (
                                <li key={sub.href}>
                                  <Link
                                    href={sub.href}
                                    className="font-body text-white text-sm hover:text-gmt-green transition-colors duration-200 whitespace-nowrap"
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                // Plain link
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className="font-body text-white text-[0.85rem] tracking-wide hover:text-gmt-green transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )
              })}

              <Link
                href="/estimate"
                className="font-body text-white text-[0.85rem] bg-gmt-green px-5 py-2 rounded-sm hover:bg-gmt-forest transition-colors duration-300"
              >
                Get an Estimate →
              </Link>
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <span className="block w-6 h-[1.5px] bg-white" />
              <span className="block w-6 h-[1.5px] bg-white" />
              <span className="block w-6 h-[1.5px] bg-white" />
            </button>
          </div>
        </div>

        {/* Mega Menu — full width, anchored to bottom of header */}
        <AnimatePresence>
          {activeDropdown === 'All Furniture Types' && (
            <motion.div
              key="mega-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 z-50 bg-gmt-charcoal border-t-2 border-gmt-green"
              onMouseEnter={() => handleMouseEnter('All Furniture Types')}
              onMouseLeave={handleMouseLeave}
            >
              <Container className="py-6">
                <div className="grid grid-cols-5 gap-x-4 gap-y-6">
                  {MEGA_MENU_ITEMS.map((item) => {
                    const product = getProduct(item.slug)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group block"
                      >
                        {/* Thumbnail */}
                        <div className="relative aspect-[3/2] overflow-hidden bg-gmt-forest mb-2">
                          {IMAGE_MAP[item.slug] ? (
                            <Image
                              src={`/images/furniture-types/${IMAGE_MAP[item.slug]}`}
                              fill
                              alt={`${item.label} — custom live edge furniture`}
                              sizes="(max-width: 1320px) 20vw, 220px"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              style={
                                item.slug === 'benches'
                                  ? { objectPosition: '50% 98%' }
                                  : item.slug === 'dining-tables'
                                    ? { objectPosition: '50% 70%' }
                                    : undefined
                              }
                            />
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-br from-gmt-forest to-gmt-charcoal" />
                              <span className="absolute bottom-2 left-3 font-body text-gmt-stone text-[10px] tracking-[0.1em] uppercase">
                                Photo coming soon
                              </span>
                            </>
                          )}
                          <div className="absolute inset-0 bg-gmt-green/0 group-hover:bg-gmt-green/10 transition-colors duration-300" />
                        </div>

                        {/* Label */}
                        <p className="font-body text-white text-sm group-hover:text-gmt-green transition-colors duration-200 mb-0.5">
                          {item.label}
                        </p>
                        {product && (
                          <p className="font-body text-gmt-stone text-xs group-hover:text-white transition-colors duration-200">
                            {formatPrice(product.startingPrice)}
                          </p>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 right-0 bottom-0 top-[54px] lg:top-0 z-50 bg-gmt-charcoal flex flex-col overflow-y-auto"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-3 flex-shrink-0">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/images/logo/Untitled.png"
                  alt="Green Mountain Tableworx"
                  width={140}
                  height={81}
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="w-10 h-10 flex items-center justify-center text-white hover:text-gmt-green transition-colors duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Nav items */}
            <nav aria-label="Mobile navigation" className="flex flex-col px-6 py-8 gap-1 flex-1">
              {NAV_ITEMS.map((item) =>
                item.dropdown ? (
                  <div key={item.label}>
                    <button
                      onClick={() => toggleMobileItem(item.label)}
                      className="flex items-center justify-between w-full py-4 font-display text-white text-3xl text-left hover:text-gmt-green transition-colors duration-200"
                      aria-expanded={expandedMobileItems.has(item.label)}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'w-5 h-5 opacity-60 transition-transform duration-200',
                          expandedMobileItems.has(item.label) && 'rotate-180'
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedMobileItems.has(item.label) && (
                        <motion.ul
                          key={item.label}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden flex flex-col gap-3 pl-4 pb-4"
                        >
                          {item.dropdown.map((sub) => (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                className="font-body text-gmt-sage text-base hover:text-white transition-colors duration-200"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className="block py-4 font-display text-white text-3xl hover:text-gmt-green transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Mobile CTA */}
            <div className="px-6 pb-10 flex-shrink-0">
              <Link
                href="/estimate"
                className="block w-full text-center font-body text-white bg-gmt-green px-6 py-4 text-base hover:bg-gmt-forest transition-colors duration-300"
              >
                Get an Estimate →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden="true">
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
