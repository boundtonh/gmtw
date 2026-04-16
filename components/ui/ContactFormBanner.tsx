'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

interface ContactFormBannerProps {
  headline: string
}

export function ContactFormBanner({ headline }: ContactFormBannerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
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
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to submit form')

      setSubmitSuccess(true)
      setFormData({ name: '', email: '', phone: '', city: '', project: '' })
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

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

      {/* Dark green overlay */}
      <div className="absolute inset-0 bg-[#0a1f14]/70" />

      {/* Content */}
      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight text-center mb-12">
            {headline}
          </h2>

          {submitSuccess ? (
            <div className="bg-gmt-green text-white rounded-sm px-6 py-8 text-center">
              <p className="font-body text-lg mb-2">Thank you for reaching out!</p>
              <p className="font-body text-sm text-white/90">
                We'll review your project details and contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full font-body text-base bg-white px-4 py-3 rounded-sm placeholder:text-gmt-stone/60 focus:outline-none focus:ring-2 focus:ring-gmt-green"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full font-body text-base bg-white px-4 py-3 rounded-sm placeholder:text-gmt-stone/60 focus:outline-none focus:ring-2 focus:ring-gmt-green"
                />
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full font-body text-base bg-white px-4 py-3 rounded-sm placeholder:text-gmt-stone/60 focus:outline-none focus:ring-2 focus:ring-gmt-green"
                />
              </div>

              {/* City */}
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full font-body text-base bg-white px-4 py-3 rounded-sm placeholder:text-gmt-stone/60 focus:outline-none focus:ring-2 focus:ring-gmt-green"
                />
              </div>

              {/* Project Details */}
              <div>
                <textarea
                  name="project"
                  placeholder="Tell Us About Your Project"
                  value={formData.project}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full font-body text-base bg-white px-4 py-3 rounded-sm placeholder:text-gmt-stone/60 focus:outline-none focus:ring-2 focus:ring-gmt-green resize-none"
                />
              </div>

              {/* Error message */}
              {submitError && (
                <p className="font-body text-sm text-red-300">{submitError}</p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'w-full font-body text-base py-3 rounded-sm transition-colors duration-300',
                  isSubmitting
                    ? 'bg-gmt-stone text-white cursor-not-allowed'
                    : 'bg-gmt-green text-white hover:bg-gmt-forest'
                )}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}
