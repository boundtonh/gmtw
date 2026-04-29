import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const basePlaceholders = [
  { id: 1, name: 'Haru Pedestal', img: 'haru-pedestal.webp' },
  { id: 2, name: 'Wine Glass', img: 'wine-glass.webp' },
  { id: 3, name: 'Lithe Pedestal', img: 'lithe-pedestal.webp' },
  { id: 4, name: 'Summa', img: 'summa.webp' },
]

export function TableBasesCallout() {
  return (
    <section className="bg-gmt-mist py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <RevealOnScroll direction="left">
            <SectionLabel>Complete the Piece</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl text-gmt-forest mt-2 leading-tight">
              The Right Base Makes All the Difference
            </h2>
            <p className="font-body text-gmt-stone text-base leading-relaxed mt-4">
              From sleek steel hairpins to solid wood trestles — every base is matched to the slab above it.
            </p>
            <Link
              href="/table-bases"
              className="inline-block font-body text-gmt-green text-sm mt-6 hover:text-gmt-forest transition-colors duration-200"
            >
              Explore Table Bases →
            </Link>
          </RevealOnScroll>

          {/* Right — base thumbnails */}
          <RevealOnScroll direction="right">
            <div className="grid grid-cols-2 gap-3">
              {basePlaceholders.map((base) => (
                <div key={base.id}>
                  <Image
                    src={`/images/bases/${base.img}`}
                    width={300}
                    height={300}
                    alt={`${base.name} table base`}
                    className="object-cover w-full aspect-square rounded-sm"
                  />
                  <p className="font-body text-gmt-stone text-xs mt-2">{base.name}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  )
}
