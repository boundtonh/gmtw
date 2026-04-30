'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { UTM_PHONES } from '@/lib/tracking'

const PhoneContext = createContext<string | null>(null)

export function PhoneProvider({ children }: { children: React.ReactNode }) {
  const [trackingPhone, setTrackingPhone] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const utmSource = params.get('utm_source')

    if (utmSource && UTM_PHONES[utmSource]) {
      sessionStorage.setItem('gmt_tracking_phone', UTM_PHONES[utmSource])
      setTrackingPhone(UTM_PHONES[utmSource])
    } else {
      const stored = sessionStorage.getItem('gmt_tracking_phone')
      if (stored) setTrackingPhone(stored)
    }
  }, [])

  return (
    <PhoneContext.Provider value={trackingPhone}>
      {children}
    </PhoneContext.Provider>
  )
}

export function useTrackingPhone(fallback: string): string {
  const tracking = useContext(PhoneContext)
  return tracking ?? fallback
}
