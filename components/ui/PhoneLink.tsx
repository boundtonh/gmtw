'use client'

import { useTrackingPhone } from '@/components/layout/PhoneProvider'

interface PhoneLinkProps {
  number: string
  className?: string
}

export function PhoneLink({ number, className }: PhoneLinkProps) {
  const phone = useTrackingPhone(number)
  return (
    <a href={`tel:${phone.replace(/\D/g, '')}`} className={className}>
      {phone}
    </a>
  )
}
