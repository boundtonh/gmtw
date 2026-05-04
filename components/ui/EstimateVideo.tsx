'use client'

import { useEffect, useRef } from 'react'

export function EstimateVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {
      // If autoplay is blocked, retry once on first user interaction
      const retry = () => {
        video.play().catch(() => {})
        document.removeEventListener('touchstart', retry)
        document.removeEventListener('click', retry)
      }
      document.addEventListener('touchstart', retry, { once: true })
      document.addEventListener('click', retry, { once: true })
    })
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      style={{ pointerEvents: 'none' }}
      className="w-full h-full object-cover"
    >
      <source src="/videos/instant-estimate-example.mov" type="video/mp4" />
    </video>
  )
}
