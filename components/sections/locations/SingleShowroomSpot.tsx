import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

interface SingleShowroomSpotProps {
  slug: 'concord-nh' | 'smithfield-ri'
  city: string
  state: string
  address: string
  zip: string
  phone: string
  coords: { lat: number; lng: number }
  mapEmbed: string
  bodyText: string
}

const LOCATION_DIRECTIONS: Record<string, string> = {
  'concord-nh': 'https://www.google.com/maps?cid=13034891393976729473&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYASAA&hl=en&gl=US&source=embed',
  'smithfield-ri': 'https://www.google.com/maps?cid=9369539338549098596&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYASAA&hl=en&gl=US&source=embed',
}

const LOCATION_IMAGES: Record<string, string> = {
  'concord-nh': '/images/locations/gmtw-nh-location.jpg',
  'smithfield-ri': '/images/locations/gmtw-ri-location.webp',
}

export function SingleShowroomSpot({
  slug,
  city,
  state,
  address,
  zip,
  phone,
  coords,
  mapEmbed,
  bodyText,
}: SingleShowroomSpotProps) {
  return (
    <section id="showroom" className="bg-gmt-green py-16 scroll-mt-20">
      <Container>
        <RevealOnScroll>
          <SectionLabel className="text-white/70 text-center">Visit Us In Person</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-white text-center mt-2">
            {city}, {state} Showroom
          </h2>
          <p className="font-body text-white/80 text-base text-center max-w-xl mx-auto mt-4">
            {bodyText}
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Showroom card */}
          <RevealOnScroll direction="left" delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={LOCATION_IMAGES[slug]}
                fill
                alt={`Green Mountain Tableworx ${city}, ${state} showroom`}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-gmt-charcoal/95 via-gmt-charcoal/60 to-gmt-charcoal/20" />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
                <h3 className="font-display text-2xl md:text-3xl text-white">
                  {city}, {state}
                </h3>

                <div className="flex gap-3 mt-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/90 flex-shrink-0 mt-0.5" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <p className="font-body text-white text-base leading-relaxed">
                    {address}<br />{city}, {state} {zip}
                  </p>
                </div>

                <div className="flex gap-3 mt-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/90 flex-shrink-0 mt-0.5" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a
                    href={`tel:${phone.replace(/\D/g, '')}`}
                    className="font-body text-white text-base hover:text-gmt-green transition-colors duration-200"
                  >
                    {phone}
                  </a>
                </div>

                <div className="flex gap-3 mt-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/90 flex-shrink-0 mt-0.5" aria-hidden="true">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  <a
                    href={LOCATION_DIRECTIONS[slug] ?? `https://maps.google.com/?q=${coords.lat},${coords.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-white text-sm underline underline-offset-4 hover:text-gmt-green transition-colors duration-200"
                  >
                    Get Directions →
                  </a>
                </div>

                <Link
                  href="/estimate"
                  className="mt-6 font-body text-sm text-white bg-gmt-forest px-6 py-3 hover:bg-gmt-charcoal transition-colors duration-300"
                >
                  Get an Instant Estimate
                </Link>
              </div>
            </div>
          </RevealOnScroll>

          {/* Map embed */}
          <RevealOnScroll direction="right" delay={0.1}>
            <div className="w-full h-full min-h-[300px] rounded-sm overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapEmbed}
                title={`${city}, ${state} showroom map`}
              />
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.2}>
          <p className="font-body text-white/70 text-sm text-center mt-10">
            In-room delivery available anywhere in New England
          </p>
        </RevealOnScroll>
      </Container>
    </section>
  )
}
