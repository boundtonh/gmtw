import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function SpeciesHero() {
  return (
    <section className="bg-gmt-forest pt-[220px] pb-16 lg:pt-[169px]">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-body text-sm text-white/50 mb-8">
          <Link href="/" className="hover:text-white transition-colors duration-200">Home</Link>
          <span aria-hidden="true" className="text-white/30">/</span>
          <span className="text-white/80">Wood Species</span>
        </nav>

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
