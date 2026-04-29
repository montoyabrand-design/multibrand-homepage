'use client';

import { useState, useEffect } from 'react';
import { useScroll, motion, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import type { Brand, UserType } from '@/tokens';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from './Button';
import { Badge } from './Badge';
import { getMotion } from './motion';

// ── Theme ──────────────────────────────────────────────────────────────────────

type HeaderTheme = {
  logo:           { src: string; alt: string; className: string };
  links:          string[];
  linksLeft:      string[];
  linksRight:     string[];
  layout:         'split' | 'bar';
  navClassName:   string;
  background:     string;
  scrollMobileBg: string;
  borderBottom:   string | undefined;
  textColor:      string;
  link:           { fontSize: string; letterSpacing: string; fontFamily: string };
  showCta:        boolean;
  ctaLabel:       string;
  drawerBg:       string;
};

function getTheme(brand: Brand): HeaderTheme {
  if (brand === 'elyzior') {
    return {
      logo:           { src: '/elyzior/elizior-logo.svg', alt: 'Elyzior', className: 'h-[56px] w-[211px] shrink-0 object-contain max-sm:h-[36px] max-sm:w-[135px]' },
      links:          ['OUR HOTELS', 'ACCOMMODATIONS', 'GASTRONOMY', 'EVENTS', 'ELYZIOR PRIVILEGE', 'EXPERIENCES'],
      linksLeft:      ['OUR HOTELS', 'ACCOMMODATIONS', 'GASTRONOMY'],
      linksRight:     ['EVENTS', 'ELYZIOR PRIVILEGE', 'EXPERIENCES'],
      layout:         'split',
      navClassName:   'sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-[16px] sm:w-[1344px] sm:py-2',
      background:     'transparent',
      scrollMobileBg: '#01040c',
      borderBottom:   undefined,
      textColor:      '#ffffff',
      link:           { fontSize: '14px', letterSpacing: '1.12px', fontFamily: 'var(--font-body)' },
      showCta:        false,
      ctaLabel:       '',
      drawerBg:       'var(--color-bg-inverse-deep)',
    };
  }

  return {
    logo:           { src: '/vibe/Vibe%20Logo.svg', alt: 'Vibe', className: 'h-[28px] block shrink-0' },
    links:          ['CITIES', 'WHY VIBE', 'COMMUNITY', 'AMENITIES'],
    linksLeft:      [],
    linksRight:     [],
    layout:         'bar',
    navClassName:   'sm:px-12 sm:py-5',
    background:     'var(--color-bg-page)',
    scrollMobileBg: 'var(--color-bg-page)',
    borderBottom:   '1px solid var(--color-border-default)',
    textColor:      'var(--color-text-primary)',
    link:           { fontSize: 'var(--size-body-sm)', letterSpacing: 'var(--tracking-nav)', fontFamily: 'var(--font-body)' },
    showCta:        true,
    ctaLabel:       'Book a room',
    drawerBg:       'var(--color-bg-inverse)',
  };
}

// ── NavLink ────────────────────────────────────────────────────────────────────

function NavLink({ children, textColor, linkStyle }: {
  children: React.ReactNode;
  textColor: string;
  linkStyle: { fontSize: string; letterSpacing: string; fontFamily: string };
}) {
  return (
    <a
      href="#"
      className="group relative whitespace-nowrap transition-opacity hover:opacity-90"
      style={{ color: textColor, fontFamily: linkStyle.fontFamily, fontSize: linkStyle.fontSize, letterSpacing: linkStyle.letterSpacing }}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-full bg-current origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  );
}

// ── Header ─────────────────────────────────────────────────────────────────────

export type HeaderProps = {
  brand:     Brand;
  userType?: UserType;
};

export function Header({ brand, userType }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const isMobile = useMediaQuery('(max-width: 639px)');
  const theme    = getTheme(brand);
  const m        = getMotion(brand);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 80));

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const navBg = isMobile && scrolled ? theme.scrollMobileBg : theme.background;

  return (
    <>
      <nav
        className={[
          'z-20 flex items-center justify-between',
          theme.navClassName,
          'max-sm:fixed max-sm:inset-x-0 max-sm:top-0 max-sm:px-4 max-sm:py-3',
          'transition-colors duration-300',
          isMobile && scrolled ? 'backdrop-blur-sm' : '',
        ].join(' ')}
        style={{ backgroundColor: navBg, borderBottom: theme.borderBottom }}
        aria-label="Main navigation"
      >

        {/* ── LEFT SLOT (desktop only) ── */}
        <div className="flex gap-[40px] items-center max-sm:hidden">
          {theme.layout === 'split'
            ? theme.linksLeft.map((item) => (
                <NavLink key={item} textColor={theme.textColor} linkStyle={theme.link}>{item}</NavLink>
              ))
            : <img src={theme.logo.src} alt={theme.logo.alt} className={theme.logo.className} />
          }
        </div>

        {/* ── CENTER SLOT (desktop only) ── */}
        <div className="flex gap-[40px] items-center max-sm:hidden">
          {theme.layout === 'split'
            ? <img src={theme.logo.src} alt={theme.logo.alt} className={theme.logo.className} />
            : theme.links.map((item) => (
                <NavLink key={item} textColor={theme.textColor} linkStyle={theme.link}>{item}</NavLink>
              ))
          }
        </div>

        {/* ── RIGHT SLOT (desktop only) ── */}
        <div className="flex gap-[40px] items-center max-sm:hidden">
          {theme.layout === 'split'
            ? theme.linksRight.map((item) => (
                <NavLink key={item} textColor={theme.textColor} linkStyle={theme.link}>{item}</NavLink>
              ))
            : (
              <>
                {userType === 'loyalty' && <Badge>★ 2,450 PTS</Badge>}
                <Button brand={brand} variant="secondary" size="sm" icon={<i className="ri-arrow-right-line" />}>
                  {theme.ctaLabel}
                </Button>
              </>
            )
          }
        </div>

        {/* ── MOBILE: Logo ── */}
        <img
          src={theme.logo.src}
          alt={theme.logo.alt}
          className={`sm:hidden ${theme.logo.className}`}
        />

        {/* ── MOBILE: CTA (shown for brands with showCta, e.g. Vibe) ── */}
        {theme.showCta && (
          <div className="hidden max-sm:flex items-center ml-auto mr-3">
            <Button brand={brand} variant="secondary" size="sm">
              {theme.ctaLabel}
            </Button>
          </div>
        )}

        {/* ── MOBILE: Hamburger ── */}
        <button
          className={`hidden max-sm:flex flex-col gap-[5px] p-2${!theme.showCta ? ' ml-auto' : ''}`}
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
        >
          <span className="block w-[22px] h-[1.5px]" style={{ backgroundColor: theme.textColor }} />
          <span className="block w-[22px] h-[1.5px]" style={{ backgroundColor: theme.textColor }} />
          <span className="block w-[16px] h-[1.5px]" style={{ backgroundColor: theme.textColor }} />
        </button>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-30 bg-black/60 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            <motion.div
              className="fixed inset-y-0 right-0 z-40 w-[75vw] max-w-[300px] flex flex-col sm:hidden"
              style={{ backgroundColor: theme.drawerBg }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: m.drawer.duration, ease: m.ease }}
            >
              <div className="flex justify-end p-4">
                <button onClick={() => setDrawerOpen(false)} aria-label="Close navigation menu">
                  <i className="ri-close-line text-[24px]" style={{ color: 'var(--color-text-on-inverse)' }} />
                </button>
              </div>

              <div style={{ height: '1px', backgroundColor: 'var(--color-border-accent)', margin: '0 24px 24px' }} />

              <nav className="flex flex-col px-6 gap-6">
                {theme.links.map((item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={() => setDrawerOpen(false)}
                    className="text-[14px] tracking-[2px] hover:opacity-70 transition-opacity"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-on-inverse)' }}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
