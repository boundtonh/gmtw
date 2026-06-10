import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { woodSpeciesData } from '@/lib/woodSpecies.generated'

const FEATURED_SLUGS = [
  'black-walnut',
  'cherry',
  'hickory',
  'english-walnut',
  'flaming-box-elder',
  'maple',
]

export function WoodSpeciesCallout() {
  const featured = FEATURED_SLUGS
    .map((slug) => woodSpeciesData.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => !!s && !!s.coverImage)

  return (
    <section className="bg-gmt-cream py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left — species grid */}
          <RevealOnScroll direction="left">
            <div className="grid grid-cols-3 gap-2">
              {featured.map((species, i) => (
                <Link
                  key={species.slug}
                  href={`/wood-species/${species.slug}`}
                  className="group block"
                >
                  <RevealOnScroll delay={i * 0.07}>
                    <div className="relative aspect-square overflow-hidden rounded-sm">
                      <Image
                        src={species.coverImage!}
                        fill
                        alt={`${species.name} live edge table`}
                        sizes="(max-width: 768px) 33vw, 18vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </RevealOnScroll>
                </Link>
              ))}
            </div>
          </RevealOnScroll>

          {/* Right — text */}
          <RevealOnScroll direction="right">
            <SectionLabel>Wood Species</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl text-gmt-forest mt-2 leading-tight">
              Every Slab Is One of a Kind
            </h2>
            <p className="font-body text-gmt-stone text-base leading-relaxed mt-4">
              We work with over <strong className="text-gmt-forest font-semibold">34 species</strong> — Black Walnut, Cherry, Maple, White Oak, Hickory, English Walnut, and more. Each slab has its own grain character, color, and history. Browse the full gallery to find the wood that speaks to your space.
            </p>
            <Link
              href="/wood-species"
              className="inline-block font-body text-gmt-green text-sm mt-6 hover:text-gmt-forest transition-colors duration-200"
            >
              Explore All Wood Species →
            </Link>
          </RevealOnScroll>

        </div>
      </Container>
    </section>
  )
}
