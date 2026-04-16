'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Container } from '@/components/layout/Container'
import { Lightbox } from '@/components/ui/Lightbox'

type Category = 'standard' | 'elegant' | 'wood'

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'standard', label: 'Standard Black Iron' },
  { id: 'elegant',  label: 'Elegant Iron' },
  { id: 'wood',     label: 'Handcrafted Wood' },
]

const STANDARD_BASES = [
  { src: '/images/bases/iron-trapezoid.webp',    alt: 'Iron Trapezoid base',    label: 'Iron Trapezoid' },
  { src: '/images/bases/iron-a-frame.webp',      alt: 'Iron A-Frame base',      label: 'Iron A-Frame' },
  { src: '/images/bases/iron-h-design.webp',     alt: 'Iron H-Design base',     label: 'Iron H-Design' },
  { src: '/images/bases/rectangle.webp',         alt: 'Rectangle iron base',    label: 'Rectangle' },
  { src: '/images/bases/reverse-trapezoid.webp', alt: 'Reverse Trapezoid base', label: 'Reverse Trapezoid' },
]

const ELEGANT_BASES = [
  { src: '/images/bases/Flowyline/Haru.jpg',               alt: 'Haru elegant iron base',               label: 'Haru' },
  { src: '/images/bases/Flowyline/Haru Pedestal.jpg',      alt: 'Haru Pedestal elegant iron base',      label: 'Haru Pedestal' },
  { src: '/images/bases/Flowyline/Lithe.jpg',              alt: 'Lithe elegant iron base',              label: 'Lithe' },
  { src: '/images/bases/Flowyline/Lithe dining.jpg',       alt: 'Lithe Dining iron base',               label: 'Lithe Dining' },
  { src: '/images/bases/Flowyline/Namu.jpg',               alt: 'Namu elegant iron base',               label: 'Namu' },
  { src: '/images/bases/Flowyline/Namu coffee.jpg',        alt: 'Namu Coffee elegant iron base',        label: 'Namu Coffee' },
  { src: '/images/bases/Flowyline/Wineglass.jpg',          alt: 'Wineglass elegant iron base',          label: 'Wineglass' },
  { src: '/images/bases/Flowyline/Wishbone.jpg',           alt: 'Wishbone elegant iron base',           label: 'Wishbone' },
  { src: '/images/bases/Flowyline/Wishbone Pedestal.jpg',  alt: 'Wishbone Pedestal iron base',          label: 'Wishbone Pedestal' },
  { src: '/images/bases/Flowyline/Wishbone coffee pedestal.jpg', alt: 'Wishbone Coffee Pedestal',       label: 'Wishbone Coffee Pedestal' },
  { src: '/images/bases/Flowyline/Tulipe Dining.webp',     alt: 'Tulipe Dining elegant iron base',      label: 'Tulipe Dining' },
  { src: '/images/bases/Flowyline/Tulipe Pedestal.webp',   alt: 'Tulipe Pedestal iron base',            label: 'Tulipe Pedestal' },
  { src: '/images/bases/Flowyline/Tulipe.jpg',             alt: 'Tulipe elegant iron base',             label: 'Tulipe' },
  { src: '/images/bases/Flowyline/Cleo.jpg',               alt: 'Cleo elegant iron base',               label: 'Cleo' },
  { src: '/images/bases/Flowyline/Curva.jpg',              alt: 'Curva elegant iron base',              label: 'Curva' },
  { src: '/images/bases/Flowyline/Draco.jpg',              alt: 'Draco elegant iron base',              label: 'Draco' },
  { src: '/images/bases/Flowyline/GMT Draco.jpg',          alt: 'GMT Draco custom iron base',           label: 'GMT Draco' },
  { src: '/images/bases/Flowyline/Draco coffee.jpg',       alt: 'Draco Coffee iron base',               label: 'Draco Coffee' },
  { src: '/images/bases/Flowyline/Faras.jpg',              alt: 'Faras elegant iron base',              label: 'Faras' },
  { src: '/images/bases/Flowyline/Kheops.jpg',             alt: 'Kheops elegant iron base',             label: 'Kheops' },
  { src: '/images/bases/Flowyline/Kheops coffee.jpg',      alt: 'Kheops Coffee iron base',              label: 'Kheops Coffee' },
  { src: '/images/bases/Flowyline/kheops cookie.jpg',      alt: 'Kheops Cookie iron base',              label: 'Kheops Cookie' },
  { src: '/images/bases/Flowyline/Luma.jpg',               alt: 'Luma elegant iron base',               label: 'Luma' },
  { src: '/images/bases/Flowyline/Mamba.jpg',              alt: 'Mamba elegant iron base',              label: 'Mamba' },
  { src: '/images/bases/Flowyline/Norah.jpg',              alt: 'Norah elegant iron base',              label: 'Norah' },
  { src: '/images/bases/Flowyline/Norah Dining.jpg',       alt: 'Norah Dining iron base',               label: 'Norah Dining' },
  { src: '/images/bases/Flowyline/Nura.jpg',               alt: 'Nura elegant iron base',               label: 'Nura' },
  { src: '/images/bases/Flowyline/Oria.jpg',               alt: 'Oria elegant iron base',               label: 'Oria' },
  { src: '/images/bases/Flowyline/Suma.jpg',               alt: 'Suma elegant iron base',               label: 'Suma' },
  { src: '/images/bases/Flowyline/Udo.jpg',                alt: 'Udo elegant iron base',                label: 'Udo' },
  { src: '/images/bases/Flowyline/Uta.jpg',                alt: 'Uta elegant iron base',                label: 'Uta' },
  { src: '/images/bases/Flowyline/Uzar.jpg',               alt: 'Uzar elegant iron base',               label: 'Uzar' },
  { src: '/images/bases/Flowyline/Xeni.jpg',               alt: 'Xeni elegant iron base',               label: 'Xeni' },
  { src: '/images/bases/Flowyline/Yami.jpg',               alt: 'Yami elegant iron base',               label: 'Yami' },
  { src: '/images/bases/Flowyline/Yami Dining.jpg',        alt: 'Yami Dining iron base',                label: 'Yami Dining' },
  { src: '/images/bases/Flowyline/Akro GOLD.jpg',          alt: 'Akro Gold elegant iron base',          label: 'Akro Gold' },
  { src: '/images/bases/Flowyline/Botas.jpg',              alt: 'Botas elegant iron base',              label: 'Botas' },
]

const WOOD_BASES = [
  { src: '/images/bases/slab-post-tressle.webp',  alt: 'Slab Post Trestle wood base',   label: 'Slab Post Trestle' },
  { src: '/images/bases/arch-trestle.webp',        alt: 'Arch Trestle wood base',        label: 'Arch Trestle' },
  { src: '/images/bases/stump-base.webp',          alt: 'Stump Base wood base',          label: 'Stump Base' },
  { src: '/images/bases/classic-turned-legs.webp', alt: 'Classic Turned Legs wood base', label: 'Classic Turned Legs' },
  { src: '/images/bases/namu-pedestal.webp',       alt: 'Namu Pedestal wood base',       label: 'Namu Pedestal' },
]

const GALLERIES = { standard: STANDARD_BASES, elegant: ELEGANT_BASES, wood: WOOD_BASES }

const DESCRIPTIONS: Record<Category, string> = {
  standard: 'Durable powder-coated black iron bases included in your table price. Built to last and available in a range of classic profiles.',
  elegant:  'Premium Flowyline iron bases with refined silhouettes and sophisticated design. Priced separately — inquire for availability.',
  wood:     'Fully custom handcrafted wood bases matched to your table\'s species and finish. Pricing determined by project — our team will reach out.',
}

export function BasesGallery() {
  const [active, setActive] = useState<Category>('standard')
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  const items = GALLERIES[active]

  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>

        {/* Category tabs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          {CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={cn(
                'font-body text-sm px-8 py-3 border transition-colors duration-200',
                active === id
                  ? 'bg-gmt-green text-white border-gmt-green'
                  : 'bg-white text-gmt-forest border-gmt-forest/30 hover:border-gmt-green hover:text-gmt-green'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Description */}
        <p className="font-body text-sm text-gmt-stone text-center max-w-2xl mx-auto mb-14">
          {DESCRIPTIONS[active]}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {items.map((item) => (
            <button
              key={item.src}
              onClick={() => setLightbox({ src: item.src, alt: item.alt })}
              className="group relative overflow-hidden rounded-sm bg-white ring-1 ring-gmt-stone/15 hover:ring-gmt-green transition-all duration-200 flex flex-col"
            >
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="px-3 py-2 text-center">
                <p className="font-body text-xs text-gmt-forest">{item.label}</p>
              </div>
            </button>
          ))}
        </div>

      </Container>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          isOpen={true}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  )
}
