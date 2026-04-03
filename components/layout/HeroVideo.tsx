'use client'
import { useEffect, useRef } from 'react'

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {
      // Poster image showing as fallback — silent fail is correct behavior
    })
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover"
    >
      {/* Mobile: lighter encode */}
      <source src="/videos/Hero-Mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
      {/* Desktop */}
      <source src="/videos/hero-desktop.mp4" type="video/mp4" />
    </video>
  )
}
