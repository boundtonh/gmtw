import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { BasesHero } from '@/components/sections/table-bases/BasesHero'
import { BasesGallery } from '@/components/sections/table-bases/BasesGallery'
import { CTABanner } from '@/components/ui/CTABanner'

export const metadata: Metadata = buildMetadata({
  title: 'Table Bases — Iron & Handcrafted Wood | Green Mountain Tableworx',
  description:
    'Browse standard black iron, elegant Flowyline iron, and fully custom handcrafted wood table bases. Paired with any live edge, river, or ocean table. Showrooms in Concord NH & Smithfield RI.',
  path: '/table-bases',
})

export default function TableBasesPage() {
  return (
    <>
      <BasesHero />
      <section id="gallery" className="scroll-mt-20">
        <BasesGallery />
      </section>
      <CTABanner
        headline="Ready to spec your table base?"
        body="Use our online estimator to choose your slab, dimensions, edge style, and base — get a quote in minutes."
        cta="Get an Instant Estimate"
        href="/estimate"
      />
    </>
  )
}
