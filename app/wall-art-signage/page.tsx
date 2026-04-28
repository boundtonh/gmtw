import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { WallArtHero } from '@/components/sections/wall-art-signage/WallArtHero'
import { WallArtAbout } from '@/components/sections/wall-art-signage/WallArtAbout'
import { WallArtGallery } from '@/components/sections/wall-art-signage/WallArtGallery'
import { CTABanner } from '@/components/ui/CTABanner'
import { AllFurnitureTypes } from '@/components/sections/home/AllFurnitureTypes'
import { ReviewsSection } from '@/components/ui/ReviewsSection'

export const metadata: Metadata = buildMetadata({
  title: 'Custom Wood Wall Art & Signage | Green Mountain Tableworx — NH & RI',
  description:
    'Custom handcrafted wood wall art, business signage, and personalized pieces. Every piece is unique — the grain alone makes it one of a kind. Showrooms in Concord NH & Smithfield RI.',
  path: '/wall-art-signage',
})

export default function WallArtPage() {
  return (
    <>
      <WallArtHero />
      <WallArtAbout />
      <section id="gallery" className="scroll-mt-20">
        <WallArtGallery />
      </section>
      <AllFurnitureTypes />
      <ReviewsSection />
      <CTABanner
        headline="Start Your Custom Wall Art or Sign"
        body="Tell us your size, species, and vision — we'll build a custom quote for your wood wall art or business signage."
        cta="Inquire for Pricing"
        href="/estimate"
      />
    </>
  )
}
