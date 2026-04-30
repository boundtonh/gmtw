import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { PhoneLink } from '@/components/ui/PhoneLink'
import { locations } from '@/lib/locations'

// Map location slugs to their background images and Google Maps embeds
const LOCATION_IMAGES: Record<string, string> = {
  'concord-nh': 'gmtw-nh-location.jpg',
  'smithfield-ri': 'gmtw-ri-location.webp',
}

const LOCATION_DIRECTIONS: Record<string, string> = {
  'concord-nh': 'https://www.google.com/maps?cid=13034891393976729473&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYASAA&hl=en&gl=US&source=embed',
  'smithfield-ri': 'https://www.google.com/maps?cid=9369539338549098596&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYASAA&hl=en&gl=US&source=embed',
}

const LOCATION_MAPS: Record<string, string> = {
  'concord-nh': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.140430861595!2d-71.53601379999999!3d43.2065438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e1cb92b3099b75%3A0xb4e53ca937c77f81!2sGreen%20Mountain%20Tableworx!5e0!3m2!1sen!2sus!4v1775235502684!5m2!1sen!2sus',
  'smithfield-ri': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.74045656283!2d-71.50356788835644!3d41.87693026536748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e44774a0844d21%3A0x82074a62ef447864!2sGreen%20Mountain%20Tableworx!5e0!3m2!1sen!2sus!4v1775235527814!5m2!1sen!2sus',
}

export function ShowroomsStrip() {
  return (
    <section id="locations" className="bg-gmt-green py-16">
      <Container>
        <RevealOnScroll>
          <SectionLabel className="text-white/70 text-center">Visit Us In Person</SectionLabel>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {locations.map((loc, index) => {
            const bgImage = LOCATION_IMAGES[loc.slug]
            return (
              <RevealOnScroll
                key={loc.slug}
                direction={index === 0 ? 'left' : 'right'}
                delay={0.1}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  {bgImage && (
                    <Image
                      src={`/images/locations/${bgImage}`}
                      fill
                      alt={`${loc.city}, ${loc.state} showroom`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  )}

                  {/* Dark gradient overlay — bottom left to top right */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-gmt-charcoal/95 via-gmt-charcoal/60 to-gmt-charcoal/20" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
                    <h2 className="font-display text-2xl md:text-3xl text-white">
                      {loc.city}, {loc.state}
                    </h2>
                    <div className="flex gap-3 mt-4">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/90 flex-shrink-0 mt-0.5" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <p className="font-body text-white text-base leading-relaxed">
                        {loc.address}<br />
                        {loc.city}, {loc.state} {loc.zip}
                      </p>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/90 flex-shrink-0 mt-0.5" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <PhoneLink
                        number={loc.phone}
                        className="font-body text-white text-base hover:text-gmt-green transition-colors duration-200"
                      />
                    </div>

                    <div className="flex gap-3 mt-4">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/90 flex-shrink-0 mt-0.5" aria-hidden="true">
                        <polygon points="3 11 22 2 13 21 11 13 3 11" />
                      </svg>
                      <a
                        href={LOCATION_DIRECTIONS[loc.slug] ?? `https://maps.google.com/?q=${loc.coords.lat},${loc.coords.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-white text-sm underline underline-offset-4 hover:text-gmt-green transition-colors duration-200"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </div>
                </div>

                {/* Google Maps embed */}
                {LOCATION_MAPS[loc.slug] && (
                  <div className="w-full aspect-video rounded-sm overflow-hidden mt-4">
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={LOCATION_MAPS[loc.slug]}
                    />
                  </div>
                )}
              </RevealOnScroll>
            )
          })}
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
