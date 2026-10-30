import type { ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

type RevealProps = {
  children: ReactNode
  className?: string
  /** Seconds. Use small steps to stagger neighbouring items. */
  delay?: number
  /** Distance travelled, in pixels. */
  y?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'figure' | 'p' | 'span'
}

/**
 * Fades and lifts its children the first time they scroll into view.
 *
 * With `prefers-reduced-motion` the content is simply rendered in place, which
 * matters here: the page is long and almost every section uses this.
 */
export function Reveal({ children, className, delay = 0, y = 26, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion()
  const Tag = motion[as]

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-72px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/** Variants for a parent that staggers its own children. */
export const staggerParent: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

export { EASE }
