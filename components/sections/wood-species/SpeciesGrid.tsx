import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import type { WoodSpecies } from '@/lib/woodSpecies.generated'

interface SpeciesGridProps {
  species: WoodSpecies[]
}

export function SpeciesGrid({ species }: SpeciesGridProps) {
  if (species.length === 0) {
    return (
      <section className="bg-gmt-offwhite py-24 md:py-32">
        <Container>
          <p className="font-body text-gmt-stone text-center text-base">
            Wood species photos are loading. Run{' '}
            <code className="font-mono text-sm bg-gmt-mist px-1 py-0.5">node scripts/sync-wood-species.mjs</code>{' '}
            to sync from Google Drive.
          </p>
        </Container>
      </section>
    )
  }

  return (
    <section className="bg-gmt-offwhite py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {species.map((item, index) => (
            <RevealOnScroll key={item.slug} delay={Math.min(index % 4, 3) * 0.08}>
              <Link
                href={`/wood-species/${item.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-gmt-mist">
                  {item.coverImage ? (
                    <Image
                      src={item.coverImage}
                      fill
                      alt={`${item.name} custom table example`}
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gmt-mist to-gmt-sage">
                      <span className="font-body text-gmt-stone text-xs tracking-[0.1em] uppercase">
                        Photo coming soon
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="font-display text-white text-base md:text-lg leading-tight">
                      {item.name}
                    </h2>
                    {item.photoCount > 0 && (
                      <p className="font-body text-white/60 text-xs mt-0.5">
                        {item.photoCount} {item.photoCount === 1 ? 'photo' : 'photos'}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}
