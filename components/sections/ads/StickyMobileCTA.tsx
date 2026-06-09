'use client'

import { useTrackingPhone } from '@/components/layout/PhoneProvider'

interface StickyMobileCTAProps {
  defaultPhone?: string
}

export function StickyMobileCTA({ defaultPhone = '(401) 354-9600' }: StickyMobileCTAProps) {
  const phone = useTrackingPhone(defaultPhone)
  const digits = phone.replace(/\D/g, '')

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-gmt-green border-t border-gmt-forest/30">
      <div className="grid grid-cols-2">
        <a
          href={`tel:+1${digits}`}
          className="flex items-center justify-center gap-2 py-4 font-body text-sm text-white font-medium border-r border-gmt-forest/30 hover:bg-gmt-forest transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12 19.79 19.79 0 0 1 1.06 3.4a2 2 0 0 1 2-1.72h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call Now
        </a>
        <a
          href="#contact-form"
          className="flex items-center justify-center gap-2 py-4 font-body text-sm text-white font-medium hover:bg-gmt-forest transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Get a Free Quote
        </a>
      </div>
    </div>
  )
}
