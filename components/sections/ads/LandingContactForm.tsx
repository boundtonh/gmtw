'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

interface LandingContactFormProps {
  showroomNote?: string
}

export function LandingContactForm({ showroomNote }: LandingContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, city: '' }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error || 'Failed to submit')
      }

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'contact_form_submitted' })
      setSubmitSuccess(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact-form" className="bg-gmt-forest py-24 md:py-32 scroll-mt-0">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-sage mb-3">
            Get Started
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-4">
            Tell Us About Your Project
          </h2>
          <p className="font-body text-base text-white/70">
            {showroomNote ?? 'Leave your info and one of our team members will reach out within 24 hours to discuss your custom piece.'}
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {submitSuccess ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gmt-green rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-display text-3xl text-white mb-3">We&apos;ll Be In Touch!</h3>
              <p className="font-body text-white/70">
                Thank you for reaching out. A member of our team will contact you within 24 hours to discuss your custom piece.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lp-name" className="block font-body text-xs tracking-[0.12em] uppercase text-white/60 mb-2">
                    Full Name <span className="text-gmt-green">*</span>
                  </label>
                  <input
                    id="lp-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full font-body text-base bg-white/10 border border-white/20 text-white placeholder:text-white/30 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gmt-green"
                  />
                </div>
                <div>
                  <label htmlFor="lp-phone" className="block font-body text-xs tracking-[0.12em] uppercase text-white/60 mb-2">
                    Phone <span className="text-gmt-green">*</span>
                  </label>
                  <input
                    id="lp-phone"
                    type="tel"
                    name="phone"
                    required
                    placeholder="(603) 555-0100"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full font-body text-base bg-white/10 border border-white/20 text-white placeholder:text-white/30 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gmt-green"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lp-email" className="block font-body text-xs tracking-[0.12em] uppercase text-white/60 mb-2">
                  Email Address <span className="text-gmt-green">*</span>
                </label>
                <input
                  id="lp-email"
                  type="email"
                  name="email"
                  required
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full font-body text-base bg-white/10 border border-white/20 text-white placeholder:text-white/30 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gmt-green"
                />
              </div>

              <div>
                <label htmlFor="lp-project" className="block font-body text-xs tracking-[0.12em] uppercase text-white/60 mb-2">
                  Tell Us About Your Project <span className="text-gmt-green">*</span>
                </label>
                <textarea
                  id="lp-project"
                  name="project"
                  required
                  rows={4}
                  placeholder="What type of piece are you looking for? Any dimensions, wood species, or style preferences?"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full font-body text-base bg-white/10 border border-white/20 text-white placeholder:text-white/30 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gmt-green resize-none"
                />
              </div>

              {submitError && (
                <p className="font-body text-sm text-red-300" role="alert">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'w-full font-body text-base py-4 transition-colors duration-300',
                  isSubmitting
                    ? 'bg-gmt-stone text-white cursor-not-allowed'
                    : 'bg-gmt-green text-white hover:bg-gmt-charcoal'
                )}
              >
                {isSubmitting ? 'Sending...' : 'Get My Free Quote'}
              </button>

              <p className="font-body text-xs text-white/40 text-center">
                No obligation. We&apos;ll reach out within 24 hours.
              </p>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}
