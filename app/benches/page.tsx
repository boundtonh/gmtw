import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { BenchesHero } from '@/components/sections/benches/BenchesHero'
import { BenchesAbout } from '@/components/sections/benches/BenchesAbout'
import { BenchesEstimatePromo } from '@/components/sections/benches/BenchesEstimatePromo'
import { BenchesGallery } from '@/components/sections/benches/BenchesGallery'
import { CTABanner } from '@/components/ui/CTABanner'
import { AllFurnitureTypes } from '@/components/sections/home/AllFurnitureTypes'
import { ReviewsSection } from '@/components/ui/ReviewsSection'

export const metadata: Metadata = buildMetadata({
  title: 'Custom Live Edge Benches | Green Mountain Tableworx — NH & RI',
  description:
    'Handcrafted live edge benches starting at $500. Custom dimensions, wood species, and base styles. Dining, entryway, and accent benches. Showrooms in Concord NH & Smithfield RI.',
  path: '/benches',
})

export default function BenchesPage() {
  return (
    <>
      <BenchesHero />
      <BenchesAbout />
      <BenchesEstimatePromo />
      <section id="gallery" className="scroll-mt-20">
        <BenchesGallery />
      </section>
      <AllFurnitureTypes />
      <ReviewsSection />
      <CTABanner
        headline="Start Your Custom Bench"
        body="Choose your wood species, dimensions, edge style, and base — get an instant quote starting at $500."
        cta="Get an Instant Estimate"
        href="/estimate"
      />
    </>
  )
}
