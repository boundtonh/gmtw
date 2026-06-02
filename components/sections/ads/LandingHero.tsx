'use client'

import { HeroVideo } from '@/components/layout/HeroVideo'
import { FadeUp } from '@/components/ui/FadeUp'
import Image from 'next/image'

export function LandingHero() {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <HeroVideo />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-8">
        <FadeUp delay={0.1}>
          <Image
            src="/images/logo/new-logo.jpg"
            alt="Green Mountain Tableworx"
            width={220}
            height={128}
            className="mb-8 w-44 md:w-56"
          />
        </FadeUp>

        <FadeUp delay={0.25}>
          <h1
            className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-tight max-w-4xl mx-auto mb-6"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.6)' }}
          >
            One Of A Kind<br />Custom Wood Furniture
          </h1>
        </FadeUp>

        <FadeUp delay={0.4}>
          <p className="font-body text-lg md:text-xl text-white/85 max-w-xl mx-auto mb-8">
            Live Edge &nbsp;·&nbsp; River Tables &nbsp;·&nbsp; Ocean Tables<br />
            Handcrafted in New England
          </p>
        </FadeUp>

        <FadeUp delay={0.55}>
          <a
            href="#contact-form"
            className="font-body text-base text-white bg-gmt-green px-10 py-4 hover:bg-gmt-forest transition-colors duration-300 inline-block"
          >
            Get a Free Quote
          </a>
        </FadeUp>

        <FadeUp delay={0.7}>
          <div className="mt-8 flex items-center gap-2">
            <span className="text-yellow-400 text-lg">★★★★★</span>
            <span className="font-body text-sm text-white/80">
              4.9 — 75+ Five Star Reviews
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
