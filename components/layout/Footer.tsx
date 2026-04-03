import Link from 'next/link'
import { Container } from './Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { locations } from '@/lib/locations'

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
            <p className="font-body text-gmt-stone text-sm leading-relaxed">
              Handcrafted in New England.
            </p>
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
                  <a
                    href={`tel:${loc.phone.replace(/\D/g, '')}`}
                    className="font-body text-gmt-stone text-sm hover:text-white transition-colors duration-200 mt-1 block"
                  >
                    {loc.phone}
                  </a>
                </div>
              ))}
              <p className="font-body text-gmt-stone text-sm">
                In-room delivery available across New England.
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
