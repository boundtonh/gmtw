'use client'
import Image from 'next/image'
import { FadeUp } from '@/components/ui/FadeUp'

export function DiningTablesHero() {
  return (
    <section className="relative min-h-screen md:min-h-[calc(68vh+105px)] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/furniture-types/dining-table.jpg"
          alt="Handcrafted dining table with custom wood and epoxy inlay"
          fill
          priority
          className="object-cover object-[center_92%] md:object-[center_92%]"
          sizes="100vw"
        />
        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent md:bg-gradient-to-br md:from-black/50 md:via-transparent md:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 md:px-12 py-20">
        <div className="max-w-[1320px] mx-auto w-full">
          <FadeUp delay={0.1}>
            <p className="section-label text-gmt-sage md:text-white mb-4">Premium Dining</p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <h1 className="font-display text-[2.5rem] md:text-[4rem] text-white leading-tight mb-6 max-w-2xl">
              Custom Dining Tables Built for Your Home
            </h1>
          </FadeUp>

          <FadeUp delay={0.4}>
            <p className="font-body text-base md:text-lg text-white/90 max-w-md">
              Handcrafted solid wood dining tables with live edge, river inlay, or ocean wave designs. Custom dimensions, wood species, and finishes. Pieces that become heirlooms.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
