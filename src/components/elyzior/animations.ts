/**
 * Elyzior Animation System
 *
 * Single source of truth for all Framer Motion variants and constants
 * used across the Elyzior homepage. Every component should import from here.
 *
 * Principles:
 *  - Ease [0.25, 0.1, 0.25, 1] on all transitions — slow, smooth, no bounce
 *  - Prefer opacity + slight movement over large transforms
 *  - viewport: { once: true, margin: "-100px" } on all whileInView triggers
 */

// ─── Core Constants ───────────────────────────────────────────────────────────

export const EASE = [0.25, 0.1, 0.25, 1] as const;
export const VP   = { once: true, margin: '-100px' } as const;

// ─── Entrance Variants ────────────────────────────────────────────────────────

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: EASE } },
};

/** Standard reveal: opacity + 40px upward movement */
export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE } },
};

/** Subtler reveal for body text and supporting elements: 20px */
export const fadeUpSlight = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: EASE } },
};

/** Split-section left block: slides in from the left */
export const slideInLeft = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.0, ease: EASE } },
};

/** Split-section right block: slides in from the right */
export const slideInRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.0, ease: EASE } },
};

/** CTA buttons and final elements: scale 0.98 → 1 */
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
};

// ─── Stagger Containers ───────────────────────────────────────────────────────

/** Stagger children by 0.15s — use on section wrappers */
export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/** Stagger with 0.3s initial delay — use on card grids */
export const staggerContainerDelayed = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

// ─── Hover Props ──────────────────────────────────────────────────────────────

/** Spread onto motion.article / motion.div for card hover lift */
export const hoverScaleCard = {
  whileHover: { scale: 1.03, transition: { duration: 0.4, ease: EASE } },
};

/** Spread onto motion.div for image zoom inside a hovered card */
export const hoverScaleImage = {
  whileHover: { scale: 1.08, transition: { duration: 0.6, ease: EASE } },
};

// ─── Hero Background ──────────────────────────────────────────────────────────

/**
 * Slow Ken Burns zoom for the hero background image wrapper.
 *
 * Usage:
 *   <motion.div className="absolute inset-0" {...slowZoom}>
 *     <img ... />
 *   </motion.div>
 */
export const slowZoom = {
  initial:    { scale: 1 },
  animate:    { scale: 1.05 },
  transition: { duration: 10, ease: 'easeOut' as const },
};
