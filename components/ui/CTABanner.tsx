import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'

interface CTABannerProps {
  headline: string
  body: string
  cta: string
  href: string
}

export function CTABanner({ headline, body, cta, href }: CTABannerProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/start-build-bg.jpg"
        fill
        alt="Custom furniture building"
        className="object-cover absolute inset-0"
        priority
      />

      {/* Dark green overlay — almost black */}
      <div className="absolute inset-0 bg-[#0a1f14]/70" />

      {/* Content */}
      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
            {headline}
          </h2>
          <p className="font-body text-white/90 mt-4 text-base leading-relaxed">
            {body}
          </p>
          <Link
            href={href}
            className="inline-block mt-8 font-body text-white bg-gmt-green px-8 py-4 hover:bg-gmt-charcoal transition-colors duration-300"
          >
            {cta}
          </Link>
        </div>
      </Container>
    </section>
  )
}
