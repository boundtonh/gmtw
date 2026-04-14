import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { LiveEdgeHero } from '@/components/sections/live-edge/LiveEdgeHero'
import { LiveEdgeAbout } from '@/components/sections/live-edge/LiveEdgeAbout'
import { LiveEdgeGallery } from '@/components/sections/live-edge/LiveEdgeGallery'
import { CTABanner } from '@/components/ui/CTABanner'

export const metadata: Metadata = buildMetadata({
  title: 'Custom Live Edge Tables | Green Mountain Tableworx — NH & RI',
  description:
    'Handcrafted live edge dining, conference & coffee tables starting at $1,500. Custom orders built to your exact dimensions. Two showrooms in Concord NH & Smithfield RI. In-room delivery across New England.',
  path: '/live-edge-tables',
})

export default function LiveEdgeTablesPage() {
  return (
    <>
      <LiveEdgeHero />
      <LiveEdgeAbout />
      <section id="gallery" className="scroll-mt-20">
        <LiveEdgeGallery />
      </section>
      <CTABanner
        headline="Start Your Custom Live Edge Table"
        body="Tell us your dimensions, wood species, edge style, and base — get an accurate quote in minutes without leaving home."
        cta="Get an Instant Estimate"
        href="/estimate"
      />
    </>
  )
}
