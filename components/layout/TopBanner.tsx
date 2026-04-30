'use client'

import { useTrackingPhone } from '@/components/layout/PhoneProvider'

const DEFAULT_SMS = '(401) 354-9600'
const SMS_BODY = encodeURIComponent("I'd like to know more about your furniture")

export function TopBanner() {
  const phone = useTrackingPhone(DEFAULT_SMS)
  const digits = phone.replace(/\D/g, '')
  const smsHref = `sms:+1${digits}?body=${SMS_BODY}`

  return (
    <div className="block lg:hidden fixed top-0 left-0 right-0 z-50 bg-gmt-green">
      <div className="flex items-center justify-center py-[1.2rem] px-4">
        <a
          href={smsHref}
          className="flex items-center gap-2 font-body text-xs text-white tracking-[0.08em] hover:text-white/80 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Text us to get started
        </a>
      </div>
    </div>
  )
}
