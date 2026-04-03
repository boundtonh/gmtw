import { buildMetadata } from '@/lib/seo'
import { HeroSection } from '@/components/sections/home/HeroSection'
import { EstimatePromo } from '@/components/sections/home/EstimatePromo'
import { ThreePillars } from '@/components/sections/home/ThreePillars'
import { AllFurnitureTypes } from '@/components/sections/home/AllFurnitureTypes'
import { HowItWorks } from '@/components/sections/home/HowItWorks'
import { GallerySection } from '@/components/sections/home/GallerySection'
import { TableBasesCallout } from '@/components/sections/home/TableBasesCallout'
import { Testimonials } from '@/components/sections/home/Testimonials'
import { ShowroomsStrip } from '@/components/sections/home/ShowroomsStrip'
import { CTABanner } from '@/components/ui/CTABanner'

export const metadata = buildMetadata({
  title: 'Green Mountain Tableworx | Custom Live Edge Furniture — NH & RI',
  description:
    'Handcrafted live edge, river & ocean tables. Custom orders for New England homes. Two showrooms: Concord NH & Smithfield RI. In-room delivery across New England.',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EstimatePromo />
      <ThreePillars />
      <AllFurnitureTypes />
      <HowItWorks />
      <GallerySection />
      <TableBasesCallout />
      <Testimonials />
      <ShowroomsStrip />
      <CTABanner
        headline="Start Your Custom Piece Today"
        body="Use our online estimator to spec your table — wood species, dimensions, epoxy color, edge style, and base. We'll be in touch within 24 hours."
        cta="Get an Instant Estimate"
        href="/estimate"
      />
    </>
  )
}
