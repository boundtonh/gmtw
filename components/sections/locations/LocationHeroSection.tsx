import Link from 'next/link'
import Image from 'next/image'
import { HeroVideo } from '@/components/layout/HeroVideo'
import { FadeUp } from '@/components/ui/FadeUp'
import { PhoneLink } from '@/components/ui/PhoneLink'

interface LocationHeroSectionProps {
  headline: string
  subheadline: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  otherCity: string
  otherState: string
}

export function LocationHeroSection({
  headline,
  subheadline,
  address,
  city,
  state,
  zip,
  phone,
  otherCity,
  otherState,
}: LocationHeroSectionProps) {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <HeroVideo />
      <div className="absolute inset-0 bg-black/45" />

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
          <h1
            className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-tight max-w-4xl mx-auto mb-6"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}
          >
            {headline.split('\n').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>
        </FadeUp>

        <FadeUp delay={0.4}>
          <p className="font-body text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-6">
            {subheadline}
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
              href="#showroom"
              className="font-body text-white border border-white/60 px-8 py-4 hover:border-white transition-colors duration-200"
            >
              Visit the Showroom
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.65}>
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-5">
            <p className="font-body text-sm text-white/70">
              <span className="text-white/90 font-medium">{city}, {state}</span> — {address}, {city}, {state} {zip}
            </p>
            <span className="hidden sm:block text-white/30">·</span>
            <PhoneLink
              number={phone}
              className="font-body text-sm text-gmt-green hover:text-white transition-colors duration-200"
            />
          </div>
          <p className="font-body text-xs text-white/40 tracking-[0.15em] uppercase mt-3">
            Also serving {otherCity}, {otherState} &nbsp;·&nbsp; In-room delivery across New England
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
