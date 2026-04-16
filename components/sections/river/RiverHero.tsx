'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const ease = [0.25, 0.46, 0.45, 0.94] as const

export function RiverHero() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative min-h-screen md:min-h-[calc(68vh+105px)] flex items-end overflow-hidden bg-gmt-charcoal pt-[105px]">
      {/* Hero image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: shouldReduce ? 1 : 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease }}
      >
        <Image
          src="/images/river/River-Table.jpg"
          fill
          alt="Custom river table with epoxy inlay handcrafted in New Hampshire — Green Mountain Tableworx"
          sizes="100vw"
          className="object-cover object-[center_60%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gmt-charcoal/90 via-gmt-charcoal/40 to-transparent" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-tr from-gmt-charcoal/75 via-gmt-charcoal/30 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 md:px-12 xl:px-24 pb-16 md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : 0.2, ease }}
          className="font-body text-xs tracking-[0.14em] uppercase text-gmt-green mb-4"
        >
          Green Mountain Tableworx
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.7, delay: shouldReduce ? 0 : 0.4, ease }}
          className="font-display text-[2.5rem] md:text-[4rem] text-white leading-tight max-w-3xl mb-6"
        >
          Custom River Tables — Handcrafted in New England
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.7, delay: shouldReduce ? 0 : 0.6, ease }}
          className="font-body text-base md:text-lg text-white/80 max-w-xl leading-relaxed mb-10"
        >
          Two live edge slabs united by a river of color. Every river table is built to your exact dimensions, epoxy color, and base — no two are ever the same.
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
