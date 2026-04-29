import type { Brand } from '@/tokens';
import type { Easing, Variants } from 'framer-motion';

// ── Types ──────────────────────────────────────────────────────────────────────

type HoverConfig = {
  whileHover: {
    scale:      number;
    transition: { duration: number; ease: readonly [number, number, number, number] };
  };
};

type SlowZoomConfig = {
  initial:    { scale: number };
  animate:    { scale: number };
  transition: { duration: number; ease: Easing };
};

export type MotionConfig = {
  ease:                readonly [number, number, number, number];
  vp:                  { once: boolean; margin: string };
  // ── Entrance variants ──
  fadeIn:              Variants;
  fadeUp:              Variants;
  fadeUpSlight:        Variants;
  slideInLeft:         Variants;
  slideInRight:        Variants;
  scaleIn:             Variants;
  // ── Stagger containers ──
  stagger:             Variants;
  staggerDelayed:      Variants;
  // ── Hover (spread onto motion elements) ──
  hover: {
    card:  HoverConfig;
    image: HoverConfig;
  };
  // ── Ken Burns background zoom (spread onto motion element) ──
  slowZoom:            SlowZoomConfig;
  // ── Scalar values for inline transitions ──
  drawer:              { duration: number };
  slightEntryY:        number;
  slightEntryDuration: number;
};

// ── Easing curves ──────────────────────────────────────────────────────────────

const ELYZIOR_EASE = [0.25, 0.1, 0.25, 1] as const; // smooth, deliberate
const VIBE_EASE    = [0.2,  0,    0.2,  1] as const; // ease-out, snappier

// ── getMotion ──────────────────────────────────────────────────────────────────

export function getMotion(brand: Brand): MotionConfig {
  if (brand === 'elyzior') {
    const ease = ELYZIOR_EASE;
    return {
      ease,
      vp: { once: true, margin: '-100px' },
      fadeIn: {
        hidden:  { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1.2, ease } },
      },
      fadeUp: {
        hidden:  { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease } },
      },
      fadeUpSlight: {
        hidden:  { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease } },
      },
      slideInLeft: {
        hidden:  { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0, transition: { duration: 1.0, ease } },
      },
      slideInRight: {
        hidden:  { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0, transition: { duration: 1.0, ease } },
      },
      scaleIn: {
        hidden:  { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease } },
      },
      stagger: {
        hidden:  {},
        visible: { transition: { staggerChildren: 0.15 } },
      },
      staggerDelayed: {
        hidden:  {},
        visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
      },
      hover: {
        card:  { whileHover: { scale: 1.03, transition: { duration: 0.4, ease } } },
        image: { whileHover: { scale: 1.08, transition: { duration: 0.6, ease } } },
      },
      slowZoom: {
        initial:    { scale: 1 },
        animate:    { scale: 1.05 },
        transition: { duration: 10, ease: 'easeOut' },
      },
      drawer:              { duration: 0.35 },
      slightEntryY:        20,
      slightEntryDuration: 1.0,
    };
  }

  // Vibe: same patterns — faster, sharper ease, reduced scale/movement
  const ease = VIBE_EASE;
  return {
    ease,
    vp: { once: true, margin: '-80px' },
    fadeIn: {
      hidden:  { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.85, ease } },
    },
    fadeUp: {
      hidden:  { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
    },
    fadeUpSlight: {
      hidden:  { opacity: 0, y: 12 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
    },
    slideInLeft: {
      hidden:  { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
    },
    slideInRight: {
      hidden:  { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
    },
    scaleIn: {
      hidden:  { opacity: 0, scale: 0.99 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease } },
    },
    stagger: {
      hidden:  {},
      visible: { transition: { staggerChildren: 0.1 } },
    },
    staggerDelayed: {
      hidden:  {},
      visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    },
    hover: {
      card:  { whileHover: { scale: 1.01, transition: { duration: 0.25, ease } } },
      image: { whileHover: { scale: 1.03, transition: { duration: 0.35, ease } } },
    },
    slowZoom: {
      initial:    { scale: 1 },
      animate:    { scale: 1.03 },
      transition: { duration: 7, ease: 'easeOut' },
    },
    drawer:              { duration: 0.25 },
    slightEntryY:        12,
    slightEntryDuration: 0.65,
  };
}
