'use client'

import { FadeUp } from '@/components/ui/FadeUp'
import Link from 'next/link'

export function BasesHero() {
  return (
    <section className="bg-gmt-forest py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1320px] px-6 md:px-12 xl:px-24">
        <div className="max-w-3xl">
          <FadeUp delay={0.1}>
            <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-sage mb-4">
              Table Bases
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6">
              The foundation of every great table
            </h1>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="font-body text-base md:text-lg text-gmt-sage leading-relaxed mb-10 max-w-xl">
              Choose from durable black iron standards, refined Flowyline elegant iron, or fully custom handcrafted wood bases matched to your slab.
            </p>
          </FadeUp>
          <FadeUp delay={0.55}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/estimate"
                className="font-body text-sm tracking-[0.08em] uppercase px-8 py-4 bg-gmt-green text-white hover:bg-white hover:text-gmt-forest transition-colors duration-300"
              >
                Get an Instant Estimate
              </Link>
              <a
                href="#gallery"
                className="font-body text-sm tracking-[0.08em] uppercase px-8 py-4 border border-white/40 text-white hover:border-white transition-colors duration-300"
              >
                Browse Bases
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
