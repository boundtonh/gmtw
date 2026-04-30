import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { ConsoleTablesHero } from '@/components/sections/console-tables/ConsoleTablesHero'
import { ConsoleTablesAbout } from '@/components/sections/console-tables/ConsoleTablesAbout'
import { ConsoleTablesEstimatePromo } from '@/components/sections/console-tables/ConsoleTablesEstimatePromo'
import { ConsoleTablesGallery } from '@/components/sections/console-tables/ConsoleTablesGallery'
import { ContactFormBanner } from '@/components/ui/ContactFormBanner'
import { AllFurnitureTypes } from '@/components/sections/home/AllFurnitureTypes'
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
      <AllFurnitureTypes />
      <ReviewsSection />
      <ContactFormBanner
        headline="Start Your Custom Console Table"
        subtitle="Leave your information, or build your table online and receive an instant quote to your email."
      />
    </>
  )
}
