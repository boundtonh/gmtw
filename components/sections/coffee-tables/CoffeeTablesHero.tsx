'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FadeUp } from '@/components/ui/FadeUp'

export function CoffeeTablesHero() {
  return (
    <section className="relative min-h-screen md:min-h-[calc(68vh+105px)] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/furniture-types/coffee-table.webp"
          alt="Elegant custom coffee table with live edge design"
          fill
          priority
          className="object-cover object-[center_92%] md:object-[center_92%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 py-20">
        <div className="max-w-[1320px] mx-auto w-full">
          <FadeUp delay={0.25}>
            <h1 className="font-display text-[2.5rem] md:text-[4rem] text-white leading-tight mb-6 max-w-3xl">
              Custom Coffee Tables Starting at $500
            </h1>
          </FadeUp>

          <FadeUp delay={0.4}>
            <p className="font-body text-base md:text-lg text-white/90 max-w-xl mb-10">
              Handcrafted coffee tables that anchor your living room. Live edge character, river epoxy drama, or ocean wave patterns. Built to last and admired by everyone who sees them.
            </p>
          </FadeUp>

          <FadeUp delay={0.55}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/estimate"
                className="font-body text-sm text-white bg-gmt-green px-8 py-4 hover:bg-gmt-forest transition-colors duration-300"
              >
                Get an Instant Estimate
              </Link>
              <a
                href="#gallery"
                className="font-body text-sm text-white border border-white/40 px-8 py-4 hover:border-white hover:bg-white/10 transition-colors duration-300"
              >
                View Gallery
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
