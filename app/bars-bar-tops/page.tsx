import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { BarsHero } from '@/components/sections/bars-bar-tops/BarsHero'
import { BarsAbout } from '@/components/sections/bars-bar-tops/BarsAbout'
import { BarsGallery } from '@/components/sections/bars-bar-tops/BarsGallery'
import { ContactFormBanner } from '@/components/ui/ContactFormBanner'
import { AllFurnitureTypes } from '@/components/sections/home/AllFurnitureTypes'
import { ReviewsSection } from '@/components/ui/ReviewsSection'

export const metadata: Metadata = buildMetadata({
  title: 'Custom Bars & Bar Tops | Green Mountain Tableworx — NH & RI',
  description:
    'Custom standalone bars and live edge bar tops for home and commercial spaces. River, ocean, and live edge styles in any wood species. Showrooms in Concord NH & Smithfield RI.',
  path: '/bars-bar-tops',
})

export default function BarsPage() {
  return (
    <>
      <BarsHero />
      <BarsAbout />
      <section id="gallery" className="scroll-mt-20">
        <BarsGallery />
      </section>
      <AllFurnitureTypes />
      <ReviewsSection />
      <ContactFormBanner
        headline="Start Your Custom Bar Top"
        subtitle="Leave your information, or build your table online and receive an instant quote to your email."
      />
    </>
  )
}
