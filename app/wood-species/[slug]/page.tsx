import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'
import { woodSpeciesData } from '@/lib/woodSpecies.generated'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SpeciesPhotoMasonry } from '@/components/sections/wood-species/SpeciesPhotoMasonry'
import { CTABanner } from '@/components/ui/CTABanner'

export async function generateStaticParams() {
  return woodSpeciesData.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const species = woodSpeciesData.find((s) => s.slug === params.slug)
  if (!species) return {}
  return buildMetadata({
    title: `${species.name} Tables | Green Mountain Tableworx`,
    description: `See custom live edge, river, and ocean tables made with ${species.name}. ${species.photoCount} real finished pieces. Two New England showrooms — Concord NH & Smithfield RI.`,
    path: `/wood-species/${species.slug}`,
  })
}

export default function SpeciesDetailPage({ params }: { params: { slug: string } }) {
  const species = woodSpeciesData.find((s) => s.slug === params.slug)
  if (!species) notFound()

  const hasDirectPhotos = species.driveFileIds.length > 0
  const hasVarieties = species.varieties.length > 0

  return (
    <>
      {/* Header */}
      <section className="bg-gmt-forest py-16 md:py-24">
        <Container>
          <Link
            href="/wood-species"
            className="font-body text-gmt-sage text-sm hover:text-white transition-colors duration-200 inline-flex items-center gap-2 mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All species
          </Link>
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

      <CTABanner
        headline={`Love the look of ${species.name}?`}
        body="Get a custom estimate for your table — specify your dimensions, edge style, epoxy, and base."
        cta="Get an Instant Estimate"
        href="/estimate"
      />
    </>
  )
}
