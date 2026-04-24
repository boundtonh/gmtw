import Link from 'next/link'
import Image from 'next/image'
import { HeroVideo } from '@/components/layout/HeroVideo'
import { FadeUp } from '@/components/ui/FadeUp'

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Video layer */}
      <HeroVideo />

      {/* Dark green overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content — centered in visible area below nav */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pt-[126px] lg:pt-[72px] text-center px-6">
        <FadeUp delay={0.1}>
          <Image
            src="/images/logo/Untitled.png"
            alt="Green Mountain Tableworx logo"
            width={140}
            height={81}
            className="min-w-[15rem] mb-6"
          />
        </FadeUp>

        <FadeUp delay={0.25}>
          {/* TODO: Confirm final hero headline with client */}
          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-tight max-w-4xl mx-auto mb-6"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}
          >
            One of a Kind<br />Wood Furniture
          </h1>
        </FadeUp>

        <FadeUp delay={0.4}>
          <p className="font-body text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-6">
            Custom live edge, river &amp; ocean tables.<br />Handcrafted in New England.
          </p>
        </FadeUp>

        <FadeUp delay={0.55}>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/estimate"
              className="font-body text-white bg-gmt-green px-8 py-4 hover:bg-gmt-forest transition-colors duration-300"
            >
              Get an Instant Estimate
            </Link>
            <Link
              href="#locations"
              className="font-body text-white border border-white/60 px-8 py-4 hover:border-white transition-colors duration-200"
            >
              Visit a Showroom
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.65}>
          <p className="mt-6 font-body text-sm text-white/50 tracking-[0.2em] uppercase">
            Concord, NH &nbsp;·&nbsp; Smithfield, RI
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
