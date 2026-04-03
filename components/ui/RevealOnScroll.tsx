'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'left' | 'right'

interface RevealOnScrollProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: Direction
}

const variants = {
  up:    { hidden: { opacity: 0, y: 32 },  visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 32 },  visible: { opacity: 1, x: 0 } },
}

export function RevealOnScroll({ children, delay = 0, className, direction = 'up' }: RevealOnScrollProps) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: shouldReduce ? 0 : 0.7,
        delay: shouldReduce ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      variants={variants[direction]}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
