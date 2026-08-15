import { motion } from 'motion/react';
import type { Key, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** React key (used when rendering Reveal inside a list). */
  key?: Key;
  /** Delay in seconds before the reveal starts (used for staggering). */
  delay?: number;
  /** Vertical offset in px the element starts from. */
  y?: number;
  /** Extra className applied to the wrapper (e.g. grid col-spans). */
  className?: string;
}

/**
 * Fade-up reveal when the element scrolls into view. Fires once — used across
 * sections to give the page a gentle sense of life without altering layout.
 */
export default function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
