'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

interface GalleryLightboxProps {
  items: Array<{ id: number; img: string; alt: string }>
  initialIndex: number
}

export function GalleryLightbox({ items, initialIndex }: GalleryLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') setIsOpen(false)
      if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, items.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => {
          setCurrentIndex(initialIndex)
          setIsOpen(true)
        }}
        className="group relative w-full h-full block overflow-hidden rounded-sm"
        aria-label="View gallery"
      >
        <Image
          src={`/images/pieces-proud-of/${items[initialIndex].img}`}
          fill
          alt={items[initialIndex].alt}
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gmt-charcoal/0 group-hover:bg-gmt-charcoal/40 transition-colors duration-300 flex items-center justify-center">
          <span className="font-body text-white text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View
          </span>
        </div>
      </button>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 bg-gmt-charcoal/95 flex items-center justify-center"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-50 text-white hover:text-gmt-green transition-colors duration-200"
              aria-label="Close gallery"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Main image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center px-6"
            >
              <Image
                src={`/images/pieces-proud-of/${items[currentIndex].img}`}
                fill
                alt={items[currentIndex].alt}
                sizes="(max-width: 1280px) 90vw, 1024px"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Navigation buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-gmt-green transition-colors duration-200 p-2"
              aria-label="Previous image"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-gmt-green transition-colors duration-200 p-2"
              aria-label="Next image"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm tracking-widest uppercase">
              {currentIndex + 1} of {items.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
