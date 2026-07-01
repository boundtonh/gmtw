import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'
import { woodSpeciesData } from '@/lib/woodSpecies.generated'

const EXCLUDED_SLUGS = new Set(['rainbow-tulip'])
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SpeciesPhotoMasonry } from '@/components/sections/wood-species/SpeciesPhotoMasonry'
import { CTABanner } from '@/components/ui/CTABanner'

export async function generateStaticParams() {
  return woodSpeciesData
    .filter((s) => !EXCLUDED_SLUGS.has(s.slug))
    .map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  if (EXCLUDED_SLUGS.has(params.slug)) return {}
  const species = woodSpeciesData.find((s) => s.slug === params.slug)
  if (!species) return {}
  return buildMetadata({
    title: `${species.name} Tables | Green Mountain Tableworx`,
    description: `See custom live edge, river, and ocean tables made with ${species.name}. ${species.photoCount} real finished pieces. Two New England showrooms — Concord NH & Smithfield RI.`,
    path: `/wood-species/${species.slug}`,
  })
}

export default function SpeciesDetailPage({ params }: { params: { slug: string } }) {
  if (EXCLUDED_SLUGS.has(params.slug)) notFound()
  const species = woodSpeciesData.find((s) => s.slug === params.slug)
  if (!species) notFound()

  const hasDirectPhotos = species.driveFileIds.length > 0
  const hasVarieties = species.varieties.length > 0

  return (
    <>
      {/* Header */}
      <section className="bg-gmt-forest pt-[220px] pb-16 lg:pt-[169px]">
        <Container>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-body text-sm text-white/50 mb-8">
            <Link href="/" className="hover:text-white transition-colors duration-200">Home</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <Link href="/wood-species" className="hover:text-white transition-colors duration-200">Wood Species</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-white/80">{species.name}</span>
          </nav>

          <SectionLabel className="text-gmt-sage">Wood Species</SectionLabel>
          <h1 className="font-display text-4xl md:text-6xl text-white mt-4 leading-tight">
            {species.name}
          </h1>
          {species.photoCount > 0 && (
            <p className="font-body text-white/60 text-base mt-3">
              {species.photoCount} {species.photoCount === 1 ? 'photo' : 'photos'}
            </p>
          )}
        </Container>
      </section>

      {/* Photos */}
      <section className="bg-gmt-offwhite py-12 md:py-16">
        <Container>
          {hasDirectPhotos && (
            <SpeciesPhotoMasonry
              speciesName={species.name}
              photos={species.driveFileIds}
              sectionTitle={hasVarieties ? species.name : undefined}
            />
          )}

          {hasVarieties && species.varieties.map((variety) => (
            <SpeciesPhotoMasonry
              key={variety.slug}
              speciesName={variety.name}
              photos={variety.driveFileIds}
              sectionTitle={variety.name}
            />
          ))}

          {!hasDirectPhotos && !hasVarieties && (
            <p className="font-body text-gmt-stone text-center py-16">
              Photos for this species are coming soon.
            </p>
          )}
        </Container>
      </section>

      {/* Bottom breadcrumb */}
      <section className="bg-gmt-offwhite py-6 border-t border-gmt-mist">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-body text-sm text-gmt-stone">
            <Link href="/" className="hover:text-gmt-charcoal transition-colors duration-200">Home</Link>
            <span aria-hidden="true" className="text-gmt-stone/40">/</span>
            <Link href="/wood-species" className="hover:text-gmt-charcoal transition-colors duration-200">Wood Species</Link>
            <span aria-hidden="true" className="text-gmt-stone/40">/</span>
            <span className="text-gmt-charcoal">{species.name}</span>
          </nav>
        </Container>
      </section>

      <CTABanner
        headline={`Love the look of ${species.name}?`}
        body="Get a custom estimate for your table — specify your dimensions, edge style, epoxy, and base."
        cta="Get an Instant Estimate"
        href="/estimate"
      />
    </>
  )
}
