import { buildMetadata } from '@/lib/seo'
import { woodSpeciesData } from '@/lib/woodSpecies.generated'
import { SpeciesHero } from '@/components/sections/wood-species/SpeciesHero'
import { SpeciesGrid } from '@/components/sections/wood-species/SpeciesGrid'
import { CTABanner } from '@/components/ui/CTABanner'

export const metadata = buildMetadata({
  title: 'Wood Species | Green Mountain Tableworx',
  description:
    'Browse all available wood species for custom live edge, river, and ocean tables — from Black Walnut to Cherry, Maple, and beyond. Two New England showrooms.',
  path: '/wood-species',
})

export default function WoodSpeciesPage() {
  return (
    <>
      <SpeciesHero />
      <SpeciesGrid species={woodSpeciesData} />
      <CTABanner
        headline="Ready to choose your wood?"
        body="Visit a showroom to see slabs in person, or get started with our online estimate — specify your species, dimensions, and style."
        cta="Get an Instant Estimate"
        href="/estimate"
      />
    </>
  )
}
