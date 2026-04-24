'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const ease = [0.25, 0.46, 0.45, 0.94] as const

export function LiveEdgeHero() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative min-h-screen md:min-h-[calc(68vh+105px)] flex items-end overflow-hidden bg-gmt-charcoal pt-[105px]">
      {/* Hero image — scales down on load */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: shouldReduce ? 1 : 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease }}
      >
        <Image
          src="/images/live-edge/Live-Edge.jpg"
          fill
          alt="Custom live edge dining table handcrafted in New Hampshire — Green Mountain Tableworx"
          sizes="100vw"
          className="object-cover object-[center_92%]"
          priority
          aria-hidden="false"
        />
        {/* Dark gradient overlay — vertical */}
        <div className="absolute inset-0 bg-gradient-to-t from-gmt-charcoal/90 via-gmt-charcoal/40 to-transparent" />
        {/* Dark gradient overlay — bottom-left for text legibility on desktop */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-tr from-gmt-charcoal/75 via-gmt-charcoal/30 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 md:px-12 xl:px-24 pb-16 md:pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.7, delay: shouldReduce ? 0 : 0.4, ease }}
          className="font-display text-[2.5rem] md:text-[4rem] text-white leading-tight max-w-3xl mb-6"
        >
          Custom Live Edge Tables — Handcrafted in New England
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.7, delay: shouldReduce ? 0 : 0.6, ease }}
          className="font-body text-base md:text-lg text-white/80 max-w-xl leading-relaxed mb-10"
        >
          Every live edge table starts as a single slab — raw, organic, and one of a kind. We build to your exact dimensions across New England with two showrooms in NH and RI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : 0.8, ease }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="/estimate"
            className="font-body text-sm text-white bg-gmt-green px-8 py-4 hover:bg-gmt-forest transition-colors duration-300"
          >
            Get an Instant Estimate
          </Link>
          <a
            href="#gallery"
            className="font-body text-sm text-white border border-white/40 px-8 py-4 hover:border-white hover:bg-white/10 transition-colors duration-300"
          >
            View Gallery
          </a>
        </motion.div>
      </div>
    </section>
  )
}
