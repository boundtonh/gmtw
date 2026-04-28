import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { ConsoleTablesHero } from '@/components/sections/console-tables/ConsoleTablesHero'
import { ConsoleTablesAbout } from '@/components/sections/console-tables/ConsoleTablesAbout'
import { ConsoleTablesEstimatePromo } from '@/components/sections/console-tables/ConsoleTablesEstimatePromo'
import { ConsoleTablesGallery } from '@/components/sections/console-tables/ConsoleTablesGallery'
import { CTABanner } from '@/components/ui/CTABanner'
import { FurnitureByType } from '@/components/ui/FurnitureByType'
import { ReviewsSection } from '@/components/ui/ReviewsSection'

export const metadata: Metadata = buildMetadata({
  title: 'Custom Console Tables | Green Mountain Tableworx — NH & RI',
  description:
    'Handcrafted live edge console tables starting at $750. Custom dimensions and wood species for entryways, hallways, and living spaces. Showrooms in Concord NH & Smithfield RI.',
  path: '/console-tables',
})

export default function ConsoleTablesPage() {
  return (
    <>
      <ConsoleTablesHero />
      <ConsoleTablesAbout />
      <ConsoleTablesEstimatePromo />
      <section id="gallery" className="scroll-mt-20">
        <ConsoleTablesGallery />
      </section>
      <FurnitureByType />
      <ReviewsSection />
      <CTABanner
        headline="Start Your Custom Console Table"
        body="Choose your wood species, dimensions, edge style, and base — get an instant quote starting at $750."
        cta="Get an Instant Estimate"
        href="/estimate"
      />
    </>
  )
}
