import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function SpeciesHero() {
  return (
    <section className="bg-gmt-forest py-24 md:py-32">
      <Container>
        <SectionLabel className="text-gmt-sage text-center">Wood Species</SectionLabel>
        <h1 className="font-display text-4xl md:text-6xl text-white text-center mt-4 max-w-2xl mx-auto leading-tight">
          Find Your Perfect Wood
        </h1>
        <p className="font-body text-white/70 text-base md:text-lg text-center max-w-xl mx-auto mt-6 leading-relaxed">
          Browse all available species for custom tables. Click any species to see real finished pieces.
        </p>
      </Container>
    </section>
  )
}
