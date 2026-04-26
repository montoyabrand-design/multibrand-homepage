# Elyzior Mobile Responsive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add mobile-responsive layout (375–390px) to all Elyzior homepage sections using Tailwind v4 `max-sm:` prefixes, a shared `useMediaQuery` hook, and targeted Framer Motion adaptations.

**Architecture:** Inline responsive approach — `max-sm:` Tailwind prefixes override desktop layout on screens < 640px. Components needing JS-side breakpoint awareness (HeroSection, StorySection) use a shared `useMediaQuery` hook. Swipe carousels (Hotels, Experiences) use native `overflow-x: auto` + CSS scroll-snap with a React `scrollLeft` listener for dot indicators. The mobile nav drawer is an `AnimatePresence`-driven `motion.div` added inside `Navigation.tsx`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4 (`max-sm:` / `sm:` variants), Framer Motion 12 (`useScroll`, `useMotionValueEvent`, `AnimatePresence`), Remixicon

---

## File Map

| Action | File | Change |
|--------|------|--------|
| **Create** | `src/hooks/useMediaQuery.ts` | SSR-safe breakpoint detection hook |
| **Modify** | `src/components/elyzior/Navigation.tsx` | Add `'use client'`, mobile bar + animated drawer |
| **Modify** | `src/components/elyzior/HeroSection.tsx` | 70vh, centered 48px headline, dynamic EXIT_END |
| **Modify** | `src/components/elyzior/BookingWidget.tsx` | Vertical stacked fields, full-width button |
| **Modify** | `src/components/elyzior/HotelsCarousel.tsx` | 16px padding, scroll-snap, dot indicators |
| **Modify** | `src/components/elyzior/HotelCard.tsx` | `max-sm:w-[85vw]`, shorter image |
| **Modify** | `src/components/elyzior/StorySection.tsx` | Image-top stack, smaller heading, `fadeUp` on mobile |
| **Modify** | `src/components/elyzior/ExperiencesSection.tsx` | Horizontal swipe, always-visible overlay, dots |
| **Modify** | `src/components/elyzior/PrivilegeSection.tsx` | Single-column pillars, scaled headings, full-width CTA |
| **Modify** | `src/components/elyzior/Footer.tsx` | 2-col link grid, stacked legal, 24px padding |

---

## Task 1: Create `useMediaQuery` hook

**Files:**
- Create: `src/hooks/useMediaQuery.ts`

- [ ] **Step 1: Create the hook**

```typescript
// src/hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
```

- [ ] **Step 2: Verify the file exists**

```bash
cat "src/hooks/useMediaQuery.ts"
```

Expected: the hook content above.

- [ ] **Step 3: Start the dev server and confirm no type errors**

```bash
cd "/Users/andresmontoya/Desktop/Multibrand Ai Project/multibrand-homepage" && npm run dev
```

Open http://localhost:3000 in browser. Page should load with no console errors.

- [ ] **Step 4: Commit**

```bash
cd "/Users/andresmontoya/Desktop/Multibrand Ai Project/multibrand-homepage"
git add src/hooks/useMediaQuery.ts
git commit -m "feat: add useMediaQuery hook for mobile breakpoint detection"
```

---

## Task 2: Navigation — Mobile bar + hamburger drawer

**Files:**
- Modify: `src/components/elyzior/Navigation.tsx`

The current Navigation is a server component with no state. It needs to become a client component to support scroll detection and drawer state. The desktop layout moves to `sm:` prefixed classes; mobile layout uses `max-sm:` classes.

- [ ] **Step 1: Replace `Navigation.tsx` completely**

```tsx
// src/components/elyzior/Navigation.tsx
'use client';

import { useState, useEffect } from 'react';
import { useScroll, motion, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import type { UserType } from "@/tokens";

const logo = "/elyzior/elizior-logo.svg";

const ALL_LINKS = [
  "OUR HOTELS",
  "ACCOMMODATIONS",
  "GASTRONOMY",
  "EVENTS",
  "ELYZIOR PRIVILEGE",
  "EXPERIENCES",
];

function NavLink({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href="#"
      className={`group relative whitespace-nowrap transition-opacity hover:opacity-90 ${className}`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-full bg-white origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  );
}

export function Navigation({ userType }: { userType: UserType }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 80));

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  return (
    <>
      <nav
        className={[
          'z-20 flex items-center justify-between',
          // Desktop
          'sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-[16px] sm:w-[1344px] sm:py-2',
          // Mobile
          'max-sm:fixed max-sm:inset-x-0 max-sm:top-0 max-sm:px-4 max-sm:py-3',
          'transition-colors duration-300',
          scrolled ? 'max-sm:bg-[#01040c] max-sm:backdrop-blur-sm' : 'max-sm:bg-transparent',
        ].join(' ')}
        aria-label="Main navigation"
      >
        {/* Left links — desktop only */}
        <div className="flex gap-[40px] items-center max-sm:hidden">
          {["OUR HOTELS", "ACCOMMODATIONS", "GASTRONOMY"].map((item) => (
            <NavLink key={item} className="text-white text-[14px] tracking-[1.12px]">
              {item}
            </NavLink>
          ))}
        </div>

        {/* Logo */}
        <img
          src={logo}
          alt="ELYZIOR"
          className="h-[56px] w-[211px] shrink-0 object-contain max-sm:h-[36px] max-sm:w-[135px]"
        />

        {/* Right links — desktop only */}
        <div className="flex gap-[40px] items-center max-sm:hidden">
          {["EVENTS", "ELYZIOR PRIVILEGE", "EXPERIENCES"].map((item) => (
            <NavLink key={item} className="text-white text-[14px] tracking-[1.12px]">
              {item}
            </NavLink>
          ))}
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="hidden max-sm:flex flex-col gap-[5px] p-2 ml-auto"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
        >
          <span className="block w-[22px] h-[1.5px] bg-white" />
          <span className="block w-[22px] h-[1.5px] bg-white" />
          <span className="block w-[16px] h-[1.5px] bg-white" />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-30 bg-black/60 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed inset-y-0 right-0 z-40 w-[75vw] max-w-[300px] flex flex-col sm:hidden"
              style={{ backgroundColor: 'var(--color-bg-inverse-deep)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Close */}
              <div className="flex justify-end p-4">
                <button onClick={() => setDrawerOpen(false)} aria-label="Close navigation menu">
                  <i
                    className="ri-close-line text-[24px]"
                    style={{ color: 'var(--color-text-on-inverse)' }}
                  />
                </button>
              </div>

              {/* Gold divider */}
              <div
                style={{
                  height: '1px',
                  backgroundColor: 'var(--color-border-accent)',
                  margin: '0 24px 24px',
                }}
              />

              {/* Links */}
              <nav className="flex flex-col px-6 gap-6">
                {ALL_LINKS.map((item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={() => setDrawerOpen(false)}
                    className="text-[14px] tracking-[2px] hover:opacity-70 transition-opacity"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-text-on-inverse)',
                    }}
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
```

- [ ] **Step 2: Verify in browser at mobile viewport**

Open http://localhost:3000 in browser. Open DevTools → toggle device toolbar → set to iPhone 14 Pro (393×852). Confirm:
- Logo and hamburger icon visible in the nav bar
- Tapping hamburger opens drawer from the right
- All 6 links appear in drawer
- Tapping backdrop or ✕ closes drawer
- Scrolling past hero solidifies the nav bar to dark
- Desktop (> 640px) is unchanged

- [ ] **Step 3: Commit**

```bash
cd "/Users/andresmontoya/Desktop/Multibrand Ai Project/multibrand-homepage"
git add src/components/elyzior/Navigation.tsx
git commit -m "feat(mobile): add hamburger drawer nav for mobile"
```

---

## Task 3: Hero Section — 70vh, centered headline, dynamic EXIT_END

**Files:**
- Modify: `src/components/elyzior/HeroSection.tsx`

Key changes:
1. Section height: `min-h-screen` desktop stays, `max-sm:min-h-[70vh]` overrides inline style — but since inline style wins over classes, use `useMediaQuery` to set it conditionally.
2. Content wrapper: reposition from `top: 537px` to vertically centered on mobile.
3. Headline font: `120px` → `48px` on mobile.
4. EXIT_END: use `useTransform` function overload so it reads current viewport on every scroll tick.

- [ ] **Step 1: Replace `HeroSection.tsx` completely**

```tsx
// src/components/elyzior/HeroSection.tsx
'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import type { UserType } from "@/tokens";
import { Navigation } from "./Navigation";
import { EASE, slowZoom } from "./animations";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const DESKTOP_H = 855;
const heroImage = "/elyzior/hero.png";

export function HeroSection({ userType }: { userType: UserType }) {
  const headline = userType === "loyalty" ? "Welcome Back" : "A Sublime Experience";
  const isMobile = useMediaQuery('(max-width: 639px)');

  const { scrollY } = useScroll();

  // Dynamic EXIT_END: 20% of section height on both breakpoints
  const exitOpacity = useTransform(scrollY, (y) => {
    const end = isMobile
      ? window.innerHeight * 0.7 * 0.2
      : DESKTOP_H * 0.2;
    return 1 - Math.min(y / end, 1);
  });

  const exitY = useTransform(scrollY, (y) => {
    const end = isMobile
      ? window.innerHeight * 0.7 * 0.2
      : DESKTOP_H * 0.2;
    return Math.min(y / end, 1) * -40;
  });

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: isMobile ? '70vh' : `${DESKTOP_H}px` }}
    >
      {/* Background with slow zoom */}
      <motion.div className="absolute inset-0" {...slowZoom}>
        <img src={heroImage} alt="" className="w-full h-full object-cover" />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(3,9,26) 0%, rgba(7,17,44,0.5) 37.74%, rgba(7,17,44,0.5) 64.42%, rgb(3,9,26) 100%)",
        }}
      />

      <Navigation userType={userType} />

      {/* Content: desktop absolute at top:537px, mobile centered */}
      <motion.div
        className={[
          'absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2',
          isMobile
            ? 'top-1/2 -translate-y-1/2'
            : 'top-[537px]',
        ].join(' ')}
        style={{ opacity: exitOpacity, y: exitY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isMobile ? '48px' : '120px',
            letterSpacing: isMobile ? '3px' : '9.6px',
            lineHeight: "normal",
          }}
          className="text-white text-center max-sm:whitespace-normal whitespace-nowrap max-sm:px-6"
        >
          {headline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.4 }}
        >
          <button
            className="border px-8 py-5 rounded-full uppercase text-[14px] tracking-[1.92px] transition-opacity hover:opacity-80"
            style={{
              borderColor: "var(--color-border-default)",
              color: "var(--color-text-on-inverse)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
            }}
          >
            BOOK A ROOM
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser at mobile viewport**

At iPhone 14 Pro size, confirm:
- Hero fills ~70% of screen height
- Headline is ~48px, centered horizontally and vertically in the hero
- "BOOK A ROOM" button sits below the headline
- Booking widget is partially visible below the fold
- Desktop (> 640px): hero reverts to 855px, headline at top: 537px at 120px

- [ ] **Step 3: Commit**

```bash
cd "/Users/andresmontoya/Desktop/Multibrand Ai Project/multibrand-homepage"
git add src/components/elyzior/HeroSection.tsx
git commit -m "feat(mobile): 70vh hero with centered headline on mobile"
```

---

## Task 4: Booking Widget — Vertical stacked fields

**Files:**
- Modify: `src/components/elyzior/BookingWidget.tsx`

Change the horizontal `flex` row to a vertical `flex-col` on mobile. Convert hardcoded `paddingLeft/Right: 165px` to Tailwind so `max-sm:` can override.

- [ ] **Step 1: Replace `BookingWidget.tsx` completely**

```tsx
// src/components/elyzior/BookingWidget.tsx
'use client';

import { motion } from 'framer-motion';
import { EASE } from "./animations";

const fields = [
  { label: "DESTINATION", placeholder: "Select a destination" },
  { label: "ADD DATES",   placeholder: "Select dates" },
  { label: "GUESTS",      placeholder: "2 adults, 0 children" },
];

export function BookingWidget() {
  return (
    <motion.section
      className="w-full border-b flex items-center justify-center gap-8 px-[165px] py-[40px] max-sm:flex-col max-sm:px-6 max-sm:gap-0"
      style={{
        borderColor: "var(--color-action-primary-bg)",
        backgroundColor: "var(--color-bg-page)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
    >
      {/* Fields */}
      <div className="flex flex-1 items-center gap-6 max-sm:flex-col max-sm:w-full max-sm:gap-0">
        {fields.map((field) => (
          <div
            key={field.label}
            className="flex flex-1 flex-col gap-2 min-w-0 max-sm:w-full"
          >
            <span
              className="text-[16px] tracking-[1.28px]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "var(--color-text-primary)",
              }}
            >
              {field.label}
            </span>
            <div
              className="border-b flex items-center justify-between pb-2 pt-4"
              style={{ borderColor: "var(--color-border-default)" }}
            >
              <span
                className="text-[14px] leading-5 tracking-[1.68px] whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {field.placeholder}
              </span>
              <i
                className="ri-arrow-down-s-line shrink-0"
                style={{ fontSize: "16px", color: "var(--color-text-secondary)" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Search button */}
      <button
        className="flex items-center justify-center gap-3 rounded-full shrink-0 transition-opacity hover:opacity-80 max-sm:w-full max-sm:mt-6"
        style={{
          backgroundColor: "var(--color-action-primary-bg)",
          color: "var(--color-action-primary-fg)",
          paddingLeft: "32px",
          paddingRight: "32px",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <span
          className="text-[12px] tracking-[1.92px] uppercase leading-none"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          SEARCH
        </span>
        <i
          className="ri-arrow-right-line leading-6"
          style={{ fontSize: "16px" }}
        />
      </button>
    </motion.section>
  );
}
```

- [ ] **Step 2: Verify in browser at mobile viewport**

At mobile size, confirm:
- Three fields stack vertically with full width
- SEARCH button is full-width below the fields
- Desktop: horizontal layout unchanged

- [ ] **Step 3: Commit**

```bash
cd "/Users/andresmontoya/Desktop/Multibrand Ai Project/multibrand-homepage"
git add src/components/elyzior/BookingWidget.tsx
git commit -m "feat(mobile): stack booking widget fields vertically on mobile"
```

---

## Task 5: Hotels Carousel — 16px padding, scroll-snap, dot indicators

**Files:**
- Modify: `src/components/elyzior/HotelsCarousel.tsx`
- Modify: `src/components/elyzior/HotelCard.tsx`

Add scroll-snap to the card container. Add a dot indicator that syncs with scroll position. Card width becomes `85vw` on mobile.

- [ ] **Step 1: Replace `HotelCard.tsx` completely**

```tsx
// src/components/elyzior/HotelCard.tsx
'use client';

import { motion } from 'framer-motion';
import { hoverScaleCard, hoverScaleImage } from "./animations";

interface HotelCardProps {
  city: string;
  description: string;
  imageUrl?: string;
}

export function HotelCard({ city, description, imageUrl }: HotelCardProps) {
  return (
    <motion.article
      className="flex flex-col shrink-0 w-[359px] overflow-hidden max-sm:w-[85vw]"
      style={{
        backgroundColor: "var(--color-bg-page)",
        boxShadow: "var(--elevation-card)",
      }}
      {...hoverScaleCard}
    >
      {/* Image */}
      <div className="relative h-[349px] w-full overflow-hidden max-sm:h-[240px]">
        <motion.img
          src={imageUrl}
          alt={city}
          className="absolute inset-0 w-full h-full object-cover"
          {...hoverScaleImage}
        />
      </div>

      {/* Card body */}
      <div
        className="flex flex-col gap-2 p-4 border-t"
        style={{ borderColor: "var(--color-border-default)" }}
      >
        <h3
          className="leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--size-h3)",
            letterSpacing: "0px",
            color: "var(--color-text-primary)",
          }}
        >
          {city}
        </h3>
        <p
          className="text-[14px] leading-5 tracking-[1.68px]"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-secondary)",
          }}
        >
          {description}
        </p>
      </div>
    </motion.article>
  );
}
```

- [ ] **Step 2: Replace `HotelsCarousel.tsx` completely**

```tsx
// src/components/elyzior/HotelsCarousel.tsx
'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { UserType } from "@/tokens";
import { HotelCard } from "./HotelCard";
import { fadeUp, staggerContainer, staggerContainerDelayed, VP } from "./animations";

const hotels = [
  {
    city: "New York",
    description: "A landmark of refined elegance in the heart of Manhattan, where the city's energy meets serene luxury.",
    imageUrl: "/elyzior/newyork-hotel.png",
  },
  {
    city: "Paris",
    description: "Nestled along the Seine, a timeless Parisian escape where art de vivre is woven into every detail.",
    imageUrl: "/elyzior/paris-hotel.png",
  },
  {
    city: "Milano",
    description: "Italian elegance redefined — a luxurious palazzo nestled in the heart of the world's fashion capital.",
    imageUrl: "/elyzior/milano-hotel.png",
  },
  {
    city: "Monaco",
    description: "Monaco's elegance redefined, a modern palace of luxury in the heart of the Riviera.",
    imageUrl: "/elyzior/monaco-hotel.png",
  },
  {
    city: "Prague",
    description: "Experience the elegance of Prague, a modern palace of luxury nestled in the heart of this historic city.",
    imageUrl: "/elyzior/prague-hotel.png",
  },
];

const loyaltyOrder = ["Paris", "New York", "Monaco", "Milano", "Prague"];

export function HotelsCarousel({ userType }: { userType: UserType }) {
  const orderedHotels =
    userType === "loyalty"
      ? [...hotels].sort(
          (a, b) => loyaltyOrder.indexOf(a.city) - loyaltyOrder.indexOf(b.city)
        )
      : hotels;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / orderedHotels.length;
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  }, [orderedHotels.length]);

  return (
    <section
      className="relative overflow-hidden max-sm:pl-4 max-sm:pr-0"
      style={{
        backgroundColor: "var(--color-bg-surface)",
        paddingTop: "120px",
        paddingBottom: "120px",
        paddingLeft: "var(--section-h)",
      }}
    >
      {/* Heading + description */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-2 mb-12 max-sm:pr-4"
        style={{ maxWidth: "646px" }}
      >
        <motion.h2
          variants={fadeUp}
          className="leading-none max-sm:text-[40px]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--size-h1)",
            letterSpacing: "var(--tracking-h1)",
            color: "var(--color-text-primary)",
          }}
        >
          {userType === "loyalty" ? "Your Hotels" : "Our Hotels"}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-[16px] leading-5 tracking-[1.92px] max-sm:w-full"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-secondary)",
            width: "486px",
          }}
        >
          {userType === "loyalty"
            ? "Your favourites, and a few new destinations curated for you."
            : "Come enjoy a mix of luxury and authenticity, where warm hospitality meets timeless style."}
        </motion.p>
      </motion.div>

      {/* Cards */}
      <motion.div
        ref={scrollRef}
        onScroll={handleScroll}
        variants={staggerContainerDelayed}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex gap-6 overflow-x-auto pb-4 pr-16 max-sm:snap-x max-sm:snap-mandatory max-sm:gap-3 max-sm:pr-4"
        style={{ scrollbarWidth: "none" }}
      >
        {orderedHotels.map((hotel) => (
          <motion.div
            key={hotel.city}
            variants={fadeUp}
            className="max-sm:snap-start max-sm:shrink-0"
          >
            <HotelCard {...hotel} />
          </motion.div>
        ))}
      </motion.div>

      {/* Dot indicators — mobile only */}
      <div className="hidden max-sm:flex gap-2 justify-center mt-4 pr-4">
        {orderedHotels.map((_, i) => (
          <div
            key={i}
            className="h-[2px] rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? '14px' : '5px',
              backgroundColor: i === activeIndex
                ? 'var(--color-text-primary)'
                : 'var(--color-border-default)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify in browser at mobile viewport**

At mobile size, confirm:
- Cards are ~85vw wide with the next card peeking from the right
- Swiping snaps card-by-card
- Active dot updates as you swipe
- Section heading and description are full-width
- Desktop: unchanged horizontal scroll

- [ ] **Step 4: Commit**

```bash
cd "/Users/andresmontoya/Desktop/Multibrand Ai Project/multibrand-homepage"
git add src/components/elyzior/HotelsCarousel.tsx src/components/elyzior/HotelCard.tsx
git commit -m "feat(mobile): swipeable hotels carousel with scroll-snap and dot indicators"
```

---

## Task 6: Story Sections — Image top, scaled heading, `fadeUp` animation on mobile

**Files:**
- Modify: `src/components/elyzior/StorySection.tsx`

On mobile: image always on top, text below. The `slideInLeft`/`slideInRight` variants cause jarring horizontal movement on narrow screens — replace with `fadeUp` on mobile using `useMediaQuery`.

- [ ] **Step 1: Replace `StorySection.tsx` completely**

```tsx
// src/components/elyzior/StorySection.tsx
'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, slideInLeft, slideInRight, VP } from "./animations";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface StorySectionProps {
  eyebrow: string;
  heading: string[];
  body: string;
  ctaLabel: string;
  imageUrl: string;
  imageRight?: boolean;
  quote?: boolean;
}

export function StorySection({
  eyebrow,
  heading,
  body,
  ctaLabel,
  imageUrl,
  imageRight = false,
  quote = false,
}: StorySectionProps) {
  const isMobile = useMediaQuery('(max-width: 639px)');

  // On mobile, always use fadeUp regardless of imageRight
  const textVariant = isMobile ? fadeUp : (imageRight ? slideInLeft : slideInRight);
  const imageVariant = isMobile ? fadeUp : (imageRight ? slideInRight : slideInLeft);

  const textBlock = (
    <motion.div
      variants={textVariant}
      initial="hidden"
      whileInView="visible"
      viewport={VP}
      style={{
        paddingTop: "var(--section-v)",
        paddingBottom: "var(--section-v)",
        paddingLeft: "var(--section-h)",
        paddingRight: "var(--section-h)",
        backgroundColor: "var(--color-bg-page)",
      }}
      className="w-1/2 shrink-0 flex flex-col justify-center max-sm:w-full max-sm:pt-12 max-sm:pb-12 max-sm:px-6"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        className="flex flex-col"
      >
        <motion.p
          variants={fadeUp}
          className="mb-5 text-[14px] tracking-[4px] uppercase"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text-secondary)",
          }}
        >
          {eyebrow}
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="mb-8 leading-none max-sm:text-[36px] max-sm:tracking-[2px]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--size-h2)",
            letterSpacing: "var(--tracking-h2)",
            color: "var(--color-text-primary)",
            lineHeight: "var(--size-h2)",
          }}
        >
          {heading.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </motion.h2>

        <div className="flex flex-col gap-10 max-w-[440px] max-sm:max-w-full">
          <motion.p
            variants={fadeUp}
            className="text-[16px] leading-6 tracking-[1px]"
            style={{
              fontFamily: quote ? "var(--font-display)" : "var(--font-body)",
              color: "var(--color-text-secondary)",
              fontStyle: quote ? "italic" : "normal",
            }}
          >
            {body}
          </motion.p>

          <motion.a
            variants={fadeUp}
            href="#"
            className="group flex items-center gap-2 w-fit"
          >
            <span
              className="relative text-[14px] tracking-[4px] uppercase"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                color: "var(--color-text-primary)",
              }}
            >
              {ctaLabel}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                style={{ backgroundColor: "var(--color-text-primary)" }}
              />
            </span>
            <i
              className="ri-arrow-right-line text-lg transition-transform duration-300 ease-out group-hover:translate-x-1"
              style={{ color: "var(--color-text-primary)" }}
            />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );

  const imageBlock = (
    <motion.div
      variants={imageVariant}
      initial="hidden"
      whileInView="visible"
      viewport={VP}
      className="w-1/2 shrink-0 overflow-hidden max-sm:w-full max-sm:h-[280px]"
    >
      <img
        src={imageUrl}
        alt=""
        className="w-full h-full object-cover"
      />
    </motion.div>
  );

  return (
    <section
      className="flex w-full max-sm:flex-col"
      style={{ overflow: 'clip', minHeight: 'var(--min-h, 100vh)' }}
    >
      {/* Mobile: image always on top. Desktop: respect imageRight prop */}
      {isMobile ? (
        <>{imageBlock}{textBlock}</>
      ) : imageRight ? (
        <>{textBlock}{imageBlock}</>
      ) : (
        <>{imageBlock}{textBlock}</>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser at mobile viewport**

At mobile size, confirm:
- Both story sections show image on top, text below
- Headings are ~36px
- No horizontal slide animation (should be fadeUp)
- Desktop: left/right alternation preserved

- [ ] **Step 3: Commit**

```bash
cd "/Users/andresmontoya/Desktop/Multibrand Ai Project/multibrand-homepage"
git add src/components/elyzior/StorySection.tsx
git commit -m "feat(mobile): story sections stack image-top with fadeUp animation"
```

---

## Task 7: Experiences Section — Horizontal swipe, always-visible overlay, dot indicators

**Files:**
- Modify: `src/components/elyzior/ExperiencesSection.tsx`

On mobile: cards become an `85vw`-wide horizontal swipe carousel. The hover-reveal behavior is replaced with a permanently visible text overlay (since touch has no hover state). Desktop hover behavior is fully preserved.

- [ ] **Step 1: Replace `ExperiencesSection.tsx` completely**

```tsx
// src/components/elyzior/ExperiencesSection.tsx
'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { EASE, fadeUp, staggerContainer, staggerContainerDelayed, VP } from "./animations";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const experiences = [
  {
    title: "Monaco Grand Prix",
    description: "The race, observed from a world apart.",
    imageUrl: "/elyzior/monacograndprix.png",
    objectPosition: "bottom",
  },
  {
    title: "NY Skyline Dinner",
    description: "Dine where the city becomes a backdrop.",
    imageUrl: "/elyzior/nyskiline.png",
    objectPosition: "center",
  },
  {
    title: "Venice Private Passage",
    description: "A moment suspended between water and light.",
    imageUrl: "/elyzior/venice.png",
    objectPosition: "center",
  },
];

function ExperienceCard({
  title,
  description,
  imageUrl,
  objectPosition,
  alwaysShowText,
}: {
  title: string;
  description: string;
  imageUrl: string;
  objectPosition: string;
  alwaysShowText: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const showContent = alwaysShowText || hovered;

  return (
    <motion.article
      variants={fadeUp}
      className="relative overflow-hidden flex-1 shrink-0 max-sm:w-[85vw] max-sm:flex-none"
      style={{ height: "498px" }}
      onHoverStart={() => !alwaysShowText && setHovered(true)}
      onHoverEnd={() => !alwaysShowText && setHovered(false)}
    >
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: "cover",
          objectPosition,
          opacity: hovered && !alwaysShowText ? 0.8 : 1,
          transition: `opacity 0.55s cubic-bezier(0.25,0.1,0.25,1)`,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: showContent
            ? "linear-gradient(to bottom, rgba(199,204,224,0.5) 0%, rgba(10,23,61,0.8) 86.5%)"
            : "linear-gradient(to bottom, rgba(199,204,224,0) 0%, rgba(10,23,61,0.8) 89%)",
          transition: `background 0.55s cubic-bezier(0.25,0.1,0.25,1)`,
        }}
      />

      <div
        className="absolute inset-x-8 flex flex-col items-center gap-3"
        style={{ bottom: "48px" }}
      >
        <h3
          className="text-center w-full"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "36px",
            letterSpacing: "2px",
            lineHeight: "normal",
            color: "var(--color-text-on-inverse)",
          }}
        >
          {title}
        </h3>

        <div
          className="flex flex-col items-center gap-3 w-full overflow-hidden"
          style={{
            maxHeight: showContent ? "120px" : "0px",
            opacity: showContent ? 1 : 0,
            transition: "max-height 0.45s cubic-bezier(0.25,0.1,0.25,1), opacity 0.35s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <p
            className="text-center text-[13px] tracking-[1.04px] leading-5"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-text-on-inverse)" }}
          >
            {description}
          </p>

          <div
            className="border-b flex items-center justify-center"
            style={{
              borderColor: "var(--color-border-default)",
              width: "146px",
              paddingTop: "16px",
              paddingBottom: "4px",
            }}
          >
            <span
              className="text-[14px] leading-5 tracking-[1.68px] text-center"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-text-on-inverse)" }}
            >
              EXPLORE MORE
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ExperiencesSection() {
  const isMobile = useMediaQuery('(max-width: 639px)');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / experiences.length;
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  }, []);

  return (
    <section
      className="w-full flex flex-col items-center gap-6 max-sm:px-0 max-sm:items-start"
      style={{
        backgroundColor: "var(--color-bg-inverse)",
        paddingTop: "var(--section-v)",
        paddingBottom: "var(--section-v)",
        paddingLeft: isMobile ? "24px" : "100px",
        paddingRight: isMobile ? "0" : "100px",
      }}
    >
      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        className="flex flex-col items-center gap-6 max-sm:items-start max-sm:pr-6"
      >
        <motion.p
          variants={fadeUp}
          className="text-[14px] tracking-[4px] uppercase text-center max-sm:text-left"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-border-default)",
          }}
        >
          FOR YOUR SOUL
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex gap-6 items-start justify-center overflow-hidden max-sm:flex-col max-sm:gap-0"
          style={{
            fontSize: "var(--size-h2)",
            lineHeight: "var(--size-h2)",
            letterSpacing: "var(--tracking-h2)",
            color: "var(--color-text-on-inverse)",
            textAlign: "center",
          }}
        >
          <span style={{ fontFamily: "var(--font-display)" }}>Transformational</span>
          <em style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>Experiences</em>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-[16px] text-center leading-6 tracking-[1px] max-w-[570px] max-sm:text-left"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-border-default)",
          }}
        >
          Each Elyzior destination offers journeys that awaken the senses, crafted for those who seek meaning.
        </motion.p>
      </motion.div>

      {/* Cards */}
      <motion.div
        ref={scrollRef}
        onScroll={handleScroll}
        variants={staggerContainerDelayed}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        className="flex w-full max-w-[1200px] py-10 max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory max-sm:gap-3 max-sm:py-4 max-sm:max-w-none"
        style={{ gap: "4px", scrollbarWidth: "none" }}
      >
        {experiences.map((exp) => (
          <motion.div
            key={exp.title}
            variants={fadeUp}
            className="max-sm:snap-start max-sm:shrink-0"
          >
            <ExperienceCard {...exp} alwaysShowText={isMobile} />
          </motion.div>
        ))}
      </motion.div>

      {/* Dot indicators — mobile only */}
      <div className="hidden max-sm:flex gap-2 justify-center w-full pr-6">
        {experiences.map((_, i) => (
          <div
            key={i}
            className="h-[2px] rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? '14px' : '5px',
              backgroundColor: i === activeIndex
                ? 'rgba(255,255,255,0.8)'
                : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>

      {/* CTA link */}
      <motion.a
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        href="#"
        className="group flex items-center gap-2 max-sm:pl-0 max-sm:pr-6"
      >
        <span
          className="text-[14px] tracking-[4px] uppercase"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            color: "var(--color-text-on-inverse)",
          }}
        >
          EXPLORE ALL EXPERIENCES
        </span>
        <i
          className="ri-arrow-right-line transition-transform duration-300 ease-out group-hover:translate-x-1"
          style={{ fontSize: "20px", color: "var(--color-text-accent)" }}
        />
      </motion.a>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser at mobile viewport**

At mobile size, confirm:
- Cards swipe horizontally, each ~85vw wide
- Description text and "EXPLORE MORE" are always visible (no hover needed)
- Dot indicators update as you swipe
- Desktop: 3-column side-by-side layout with hover-reveal behavior preserved

- [ ] **Step 3: Commit**

```bash
cd "/Users/andresmontoya/Desktop/Multibrand Ai Project/multibrand-homepage"
git add src/components/elyzior/ExperiencesSection.tsx
git commit -m "feat(mobile): experiences as horizontal swipe carousel with persistent overlay"
```

---

## Task 8: Privilege Section — Single-column pillars, scaled headings

**Files:**
- Modify: `src/components/elyzior/PrivilegeSection.tsx`

Change `grid-cols-4` → `grid-cols-1` on mobile, scale heading sizes, make CTA button full-width.

- [ ] **Step 1: Replace `PrivilegeSection.tsx` completely**

```tsx
// src/components/elyzior/PrivilegeSection.tsx
'use client';

import { motion } from 'framer-motion';
import type { UserType } from "@/tokens";
import { fadeUp, scaleIn, staggerContainer, staggerContainerDelayed, VP } from "./animations";
import { Button } from "./Button";

const pillars = [
  {
    numeral: "I",
    title: "Guaranteed Availability",
    body: "Your suite awaits, always, anywhere. Priority access to every Elyzior destination worldwide.",
  },
  {
    numeral: "II",
    title: "Personal Concierge",
    body: "A dedicated liaison who knows your preferences before you speak them.",
  },
  {
    numeral: "III",
    title: "Private Experiences",
    body: "Closed-door tastings, after-hours gallery viewings, crafted only for Privilege members.",
  },
  {
    numeral: "IV",
    title: "Seamless Transfers",
    body: "From runway to lobby without a single wait. Private arrivals at every property.",
  },
];

export function PrivilegeSection({ userType }: { userType: UserType }) {
  return (
    <section
      className="w-full flex flex-col border-t border-b"
      style={{
        backgroundColor: "var(--color-bg-inverse-deepest)",
        borderColor: "var(--color-border-emphasis)",
      }}
    >
      {/* Hero area */}
      <div className="flex flex-col items-center pt-[120px] pb-[80px] gap-6 max-sm:pt-16 max-sm:pb-10 max-sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="flex flex-col items-center gap-10"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center shrink-0"
            style={{ width: "163.6px", height: "64px" }}
          >
            <div className="rotate-90 flex-none">
              <img
                src="/elyzior/privilege-key.png"
                alt=""
                className="object-cover"
                style={{ width: "64px", height: "163.6px" }}
              />
            </div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-center max-sm:text-[32px]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--size-h2)",
              lineHeight: "var(--size-h2)",
              letterSpacing: "var(--tracking-h2)",
              color: "var(--color-text-on-inverse)",
            }}
          >
            {userType === "loyalty" ? "Welcome to Privilege" : "The key to Privilege"}
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="text-center w-full"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "24px",
            letterSpacing: "1px",
            color: "var(--color-text-on-inverse)",
          }}
        >
          {userType === "loyalty" ? (
            <p className="max-sm:text-[16px]">
              As a Privilege member, every arrival is a homecoming<br className="max-sm:hidden" />
              {" "}and every wish is already understood.
            </p>
          ) : (
            <p className="max-sm:text-[16px]">
              A world beyond reservation for those who seek belonging,<br className="max-sm:hidden" />
              {" "}a quiet circle where every arrival is a homecoming.
            </p>
          )}
        </motion.div>
      </div>

      {/* Pillars */}
      <motion.div
        variants={staggerContainerDelayed}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        className="grid grid-cols-4 w-full max-sm:grid-cols-1"
      >
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.numeral}
            variants={fadeUp}
            className="flex flex-col gap-6 border-r last:border-r-0 max-sm:border-r-0 max-sm:border-t first:max-sm:border-t-0"
            style={{
              borderColor: "var(--color-border-emphasis)",
              paddingTop: "56px",
              paddingBottom: "80px",
              paddingLeft: "48px",
              paddingRight: "48px",
            }}
          >
            <span
              className="text-[48px] leading-none max-sm:text-[40px]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-border-emphasis)",
              }}
            >
              {pillar.numeral}
            </span>
            <div className="flex flex-col gap-3">
              <h4
                className="text-[24px] tracking-[1px]"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-on-inverse)",
                }}
              >
                {pillar.title}
              </h4>
              <p
                className="text-[14px] leading-5 tracking-[1.68px]"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-on-inverse-muted)",
                }}
              >
                {pillar.body}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        className="flex items-center justify-center pt-14 pb-20 max-sm:px-6 max-sm:pt-10 max-sm:pb-14"
        style={{ backgroundColor: "var(--color-bg-inverse-deepest)" }}
      >
        <Button hierarchy="tertiary" size="large" className="max-sm:w-full max-sm:justify-center">
          {userType === "loyalty" ? "VIEW YOUR BENEFITS" : "REQUEST AN INVITATION"}
        </Button>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser at mobile viewport**

At mobile size, confirm:
- All 4 pillars stack in a single column with gold top borders between them
- Heading "The key to Privilege" is ~32px
- CTA button spans full width
- Desktop: 4-column grid unchanged

- [ ] **Step 3: Commit**

```bash
cd "/Users/andresmontoya/Desktop/Multibrand Ai Project/multibrand-homepage"
git add src/components/elyzior/PrivilegeSection.tsx
git commit -m "feat(mobile): single-column privilege pillars with full-width CTA"
```

---

## Task 9: Footer — 2-column link grid, stacked legal

**Files:**
- Modify: `src/components/elyzior/Footer.tsx`

Collapse 4-column desktop link layout to a 2-column grid on mobile. Stack logo and links vertically. Reduce side padding.

- [ ] **Step 1: Replace `Footer.tsx` completely**

```tsx
// src/components/elyzior/Footer.tsx
const logo = "/elyzior/elizior-logo.svg";

const columns = [
  {
    heading: "DESTINATIONS",
    links: ["New York", "Paris", "Milano", "Monaco", "Prague"],
  },
  {
    heading: "DISCOVER",
    links: ["Our Hotels", "Accommodations", "Gastronomy", "Experiences", "Events"],
  },
  {
    heading: "ELYZIOR",
    links: ["Our Story", "Elyzior Privilege", "Press", "Careers"],
  },
  {
    heading: "CONTACT",
    links: ["Chat with us", "Call us", "Write us"],
  },
];

export function Footer() {
  return (
    <footer
      className="w-full flex flex-col px-[100px] pt-[80px] pb-[40px] max-sm:px-6 max-sm:pt-12 max-sm:pb-8"
      style={{ backgroundColor: "var(--color-bg-inverse-deepest)" }}
    >
      {/* Main row */}
      <div
        className="flex items-start justify-between pb-[61px] border-b mb-0 max-sm:flex-col max-sm:gap-10 max-sm:pb-10"
        style={{ borderColor: "var(--color-border-emphasis)" }}
      >
        {/* Brand */}
        <div className="flex flex-col gap-1">
          <img src={logo} alt="ELYZIOR" className="h-[56px] w-[211px] object-contain max-sm:h-[36px] max-sm:w-[135px]" />
          <span
            className="text-[16px] tracking-[0.72px] italic"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-on-inverse)",
            }}
          >
            By Skyline Hotels
          </span>
        </div>

        {/* Link columns: 4-col desktop → 2-col mobile */}
        <div className="flex gap-16 max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-8 max-sm:gap-y-10 max-sm:w-full">
          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-6">
              <span
                className="text-[14px] tracking-[2px] italic"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-accent)",
                }}
              >
                {col.heading}
              </span>
              <ul className="flex flex-col gap-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[14px] leading-5 tracking-[1.68px] hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--color-text-on-inverse)",
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Legal row */}
      <div
        className="flex items-center justify-between text-[12px] tracking-[0.72px] py-8 max-sm:flex-col max-sm:items-start max-sm:gap-1 max-sm:py-6"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--color-border-default)",
        }}
      >
        <span>© 2026 Elyzior Hotels &amp; Resorts. All rights reserved.</span>
        <span>Privacy · Terms · Cookies</span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify in browser at mobile viewport**

At mobile size, confirm:
- Logo scales down, sits at top
- 4 link columns collapse to a 2×2 grid (Destinations + Discover on left, Elyzior + Contact on right)
- Legal copyright and Privacy links stack on two separate lines
- Side padding is 24px
- Desktop: original layout unchanged

- [ ] **Step 3: Full page scroll-through on mobile**

At iPhone 14 Pro (393×852) scroll through the entire page and verify each section in sequence:
1. ✓ Hero 70vh, headline centered
2. ✓ Booking widget stacked
3. ✓ Hotels carousel swipes, dots update
4. ✓ Story section 1: image top, text below
5. ✓ Experiences carousel swipes, text always visible, dots update
6. ✓ Story section 2: image top, text below
7. ✓ Privilege: single column pillars, full-width CTA
8. ✓ Footer: 2-col grid

- [ ] **Step 4: Commit**

```bash
cd "/Users/andresmontoya/Desktop/Multibrand Ai Project/multibrand-homepage"
git add src/components/elyzior/Footer.tsx
git commit -m "feat(mobile): 2-column footer link grid with stacked legal"
```

---

## Self-Review Checklist

| Spec requirement | Covered by task |
|-----------------|-----------------|
| Nav: transparent → solid on scroll, hamburger drawer | Task 2 |
| Hero: 70vh, 48px headline centered | Task 3 |
| Booking: stacked fields, full-width button | Task 4 |
| Hotels: 85vw swipe, peek, dots | Task 5 |
| Story: image top, text below, fadeUp animation | Task 6 |
| Experiences: swipe, always-visible text, dots | Task 7 |
| Privilege: single-column, gold dividers, full-width CTA | Task 8 |
| Footer: 2-col grid, stacked legal, 24px padding | Task 9 |
| `useMediaQuery` shared hook | Task 1 |
| EXIT_END dynamic for 70vh hero | Task 3 |
| scroll-snap on carousels | Tasks 5, 7 |
| Body scroll lock during drawer | Task 2 |
