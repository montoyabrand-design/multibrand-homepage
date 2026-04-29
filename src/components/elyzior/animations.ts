/**
 * Elyzior animation constants — thin re-export layer over the shared motion system.
 * All values are sourced from getMotion('elyzior'); edit motion.ts to change them.
 */
import { getMotion } from '@/components/shared/motion';

const m = getMotion('elyzior');

export const EASE = m.ease;
export const VP   = m.vp;

export const fadeIn              = m.fadeIn;
export const fadeUp              = m.fadeUp;
export const fadeUpSlight        = m.fadeUpSlight;
export const slideInLeft         = m.slideInLeft;
export const slideInRight        = m.slideInRight;
export const scaleIn             = m.scaleIn;
export const staggerContainer        = m.stagger;
export const staggerContainerDelayed = m.staggerDelayed;
export const hoverScaleCard      = m.hover.card;
export const hoverScaleImage     = m.hover.image;
export const slowZoom            = m.slowZoom;
