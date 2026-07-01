import Link from 'next/link'
import { Container } from './Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { PhoneLink } from '@/components/ui/PhoneLink'
import { locations } from '@/lib/locations'

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/greenmountaintableworx/?hl=en',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/GreenMtnTableworx/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
]

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'Live Edge Tables', href: '/live-edge-tables' },
  { label: 'River Tables', href: '/river-tables' },
  { label: 'Ocean Tables', href: '/ocean-tables' },
  { label: 'All Furniture Types', href: '/dining-tables' },
  { label: 'Table Bases', href: '/table-bases' },
  { label: 'Locations', href: '/locations' },
  { label: 'Get an Estimate', href: '/estimate' },
]

const productLinks = [
  { label: 'Dining Tables', href: '/dining-tables' },
  { label: 'Conference Tables', href: '/conference-tables' },
  { label: 'Coffee Tables', href: '/coffee-tables' },
  { label: 'Benches', href: '/benches' },
  { label: 'Console Tables', href: '/console-tables' },
  { label: 'Countertops & Island Tops', href: '/countertops-island-tops' },
  { label: 'Bars & Bar Tops', href: '/bars-bar-tops' },
  { label: 'Shelves & Mantels', href: '/floating-shelves-mantels' },
  { label: 'Wall Art & Signage', href: '/wall-art-signage' },
]

export function Footer() {
  return (
    <footer className="bg-gmt-forest py-16 md:py-20">
      <Container>
        {/* Four columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1 — Brand */}
          <div>
            <p className="font-body text-white text-sm tracking-widest uppercase mb-3">
              {/* TODO: Replace with <Image> SVG logo */}
              Green Mountain Tableworx
            </p>
            <div className="w-8 h-[2px] bg-gmt-green mb-4" />
            <p className="font-body text-gmt-stone text-sm leading-relaxed mb-5">
              Handcrafted in New England.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gmt-stone hover:text-white transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Explore */}
          <div>
            <SectionLabel className="text-gmt-sage">Explore</SectionLabel>
            <ul className="flex flex-col gap-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-gmt-stone text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Products */}
          <div>
            <SectionLabel className="text-gmt-sage">Products</SectionLabel>
            <ul className="flex flex-col gap-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-gmt-stone text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Visit Us */}
          <div>
            <SectionLabel className="text-gmt-sage">Showrooms</SectionLabel>
            <div className="flex flex-col gap-6">
              {locations.map((loc) => (
                <div key={loc.slug}>
                  <p className="font-body text-white text-sm mb-1">
                    {loc.city}, {loc.state}
                  </p>
                  <p className="font-body text-gmt-stone text-sm leading-relaxed">
                    {loc.address}
                    <br />
                    {loc.city}, {loc.state} {loc.zip}
                  </p>
                  <PhoneLink
                    number={loc.phone}
                    className="font-body text-gmt-stone text-sm hover:text-white transition-colors duration-200 mt-1 block"
                  />
                </div>
              ))}
              <p className="font-body text-gmt-stone text-sm">
                In-home delivery available across New England.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-gmt-sage/20 mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-2">
          <p className="font-body text-gmt-stone text-xs">
            © {new Date().getFullYear()} Green Mountain Tableworx. All rights reserved.
          </p>
          <p className="font-body text-gmt-stone text-xs">
            Website by Inbound NH
          </p>
        </div>
      </Container>
    </footer>
  )
}
