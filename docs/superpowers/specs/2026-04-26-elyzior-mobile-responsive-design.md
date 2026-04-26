# Elyzior Mobile Responsive Design

**Date:** 2026-04-26
**Scope:** Elyzior brand homepage — mobile only (375–390px)
**Breakpoint:** `max-sm` (below 640px) — Tailwind v4 responsive prefixes inline on existing components
**Pages affected:** `/elyzior/first-time` and `/elyzior/loyalty` (shared components)

---

## Approach

Add `max-sm:` responsive prefixes directly to existing component JSX. No separate mobile components. No new files except a `MobileNav` drawer sub-component extracted from `Navigation.tsx`. The `sm` breakpoint (640px) serves as the mobile/desktop boundary throughout.

---

## Section Specs

### 1. Navigation (`Navigation.tsx`)

**Desktop:** Unchanged — absolute 1344px split layout with 6 links.

**Mobile:**
- Nav bar is `fixed` (not `absolute`) so it can solidify on scroll
- Logo centered, hamburger icon (`ri-menu-line`) top-right
- On scroll past ~80px: background transitions from `transparent` → `bg-inverse-deepest` with `backdrop-blur-sm`; implemented via `useScroll` + `useTransform` (already available in `HeroSection` — Navigation needs its own `useScroll` instance)
- Hamburger tap opens a drawer that slides in from the right using Framer Motion (`x: "100%" → x: 0`)
- Drawer: full-height, `bg-inverse-deep`, gold border divider at top, close button (✕) top-right, all 6 nav links stacked vertically at `text-[14px] tracking-[2px]`
- Body scroll locked while drawer is open (`overflow-hidden` on `<body>`)

---

### 2. Hero Section (`HeroSection.tsx`)

**Desktop:** `minHeight: 855px`, headline at `top: 537px`, `fontSize: 120px`.

**Mobile:**
- Height: `70vh` (replaces fixed 855px)
- Headline repositioned: centered vertically in the hero (remove absolute `top: 537px`; use flexbox centering on the content wrapper)
- Headline font size: `48px` (down from `120px`), letter-spacing `3px` (down from `9.6px`)
- "BOOK A ROOM" button: unchanged styling, sits below the headline
- Scroll-exit animation (`exitOpacity`, `exitY`): `EXIT_END` recalculated on mobile as `window.innerHeight * 0.7 * 0.2` (computed once on mount via `useEffect`)
- The section bottom naturally reveals the top of the BookingWidget as a scroll invitation

---

### 3. Booking Widget (`BookingWidget.tsx`)

**Desktop:** Horizontal flex row — 3 fields side by side + search button.

**Mobile:**
- Layout: vertical flex column, full-width
- Each field: full-width, underline border preserved, label + value + chevron on one row
- Fields order: DESTINATION → ADD DATES → GUESTS
- SEARCH button: full-width, pill shape, `py-4`, at the bottom
- Side padding collapses from `165px` → `24px`

---

### 4. Hotels Carousel (`HotelsCarousel.tsx`, `HotelCard.tsx`)

**Desktop:** Horizontal scroll of five 359px cards, `paddingLeft: 120px`.

**Mobile:**
- Section padding collapses: `paddingLeft: 16px`, `paddingRight: 0`
- Card width: `calc(85vw)` (down from fixed `359px`), so the next card peeks ~15% from the right edge
- Card image height: `240px` (down from `349px`)
- Section heading (`h2`): font size `40px` (down from `80px`)
- Description paragraph: `max-w-full` (remove fixed `486px` width), font size `14px`
- Scroll indicator dots added below the card row: 5 dots, active dot wider (`14px`), uses `scrollLeft` listener on the scroll container to update active index
- `HotelCard` gets a `max-sm:w-[85vw]` class

---

### 5. Story Sections (`StorySection.tsx`)

**Desktop:** 50/50 horizontal split, `min-h-screen`, alternating image left/right.

**Mobile:**
- Layout: vertical flex column — **image always on top**, text block below (regardless of `imageRight` prop)
- Image block: full-width, `height: 280px`, `object-cover`
- Text block: full-width, padding `48px 24px`, left-aligned
- Heading (`h2`): font size `36px` (down from `72px`), letter-spacing `2px`
- Body text and CTA link: unchanged font sizes
- `min-h-screen` removed on mobile — section height is content-driven
- Slide-in animations (`slideInLeft`/`slideInRight`) replaced with `fadeUp` on mobile (no horizontal slide on a narrow screen)

---

### 6. Experiences Section (`ExperiencesSection.tsx`, `ExperienceCard`)

**Desktop:** Three 498px-tall cards side by side with hover-reveal text.

**Mobile:**
- Layout: horizontal swipe (matching hotels carousel pattern)
- Card width: `85vw`, height: `320px`
- Next card peeks ~15% from right edge
- Description text and "EXPLORE MORE" link are **always visible** (persistent overlay layout — remove hover-toggled `maxHeight` animation; replace with static display)
- Gradient scrim always rendered at full opacity
- Section heading/subtitle: full-width, `paddingLeft: 24px`
- "EXPLORE ALL EXPERIENCES" link: full-width centered, below the swipe row
- Scroll indicator dots: 3 dots below the card row, active dot wider (`14px`), uses `scrollLeft` listener on the scroll container to update active index (same pattern as hotels carousel)

---

### 7. Privilege Section (`PrivilegeSection.tsx`)

**Desktop:** 4-column grid of pillars + hero area above.

**Mobile — Hero area:**
- Key image + title + subtitle: stack centered, full-width
- Title font size: `32px` (down from `72px`)
- Subtitle font size: `16px`, single line allowed to wrap

**Mobile — Pillars:**
- Layout: single column, each pillar full-width
- Separated by `border-top` in `var(--color-border-emphasis)` (gold)
- Roman numeral: `40px` (down from `48px`)
- Pillar padding: `32px 24px` (down from `56px 48px`)
- Remove `border-right` (replaces with `border-top` between items)
- `grid-cols-4` → `grid-cols-1` on mobile

**Mobile — CTA:**
- Button: full-width (remove `w-fit` / `shrink-0`)

---

### 8. Footer (`Footer.tsx`)

**Desktop:** Logo left + 4-column link grid right.

**Mobile:**
- Logo + "By Skyline Hotels" tagline: stacked, left-aligned, at top
- Link columns: 4 columns collapse to **2-column grid** (Destinations + Discover on left col; Elyzior + Contact on right col)
- Heading and link font sizes: unchanged
- Legal row: two lines — copyright on line 1, Privacy · Terms · Cookies on line 2
- Side padding: `100px` → `24px`

---

## Animations

- All existing Framer Motion entrance animations (`fadeUp`, `staggerContainer`, etc.) are preserved on mobile
- `slowZoom` on the hero background image: preserved
- `slideInLeft` / `slideInRight` in `StorySection`: replaced with `fadeUp` on mobile — detect via a `useMediaQuery("(max-width: 639px)")` hook and pass the appropriate variant object to the `motion.div`
- Nav drawer: `motion.div` with `initial={{ x: "100%" }}` / `animate={{ x: 0 }}` / `exit={{ x: "100%" }}`, `transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }`

---

## Components Changed

| File | Change type |
|------|-------------|
| `Navigation.tsx` | Add mobile nav bar + extract `MobileDrawer` sub-component |
| `HeroSection.tsx` | Mobile height, headline positioning + font size |
| `BookingWidget.tsx` | Stacked vertical layout |
| `HotelsCarousel.tsx` | Padding + card width + dots |
| `HotelCard.tsx` | Card width responsive |
| `StorySection.tsx` | Stack order + font sizes + animation swap |
| `ExperiencesSection.tsx` | Horizontal swipe + persistent text overlay |
| `ExperienceCard` (inline) | Remove hover, always-show description |
| `PrivilegeSection.tsx` | Single-column pillars + heading scale |
| `Footer.tsx` | 2-col link grid + stacked legal |

---

## Out of Scope

- Vibe brand mobile (separate effort)
- Loyalty variant differences on mobile (same layout decisions apply)
- Tablet breakpoints (768px)
- Touch gesture libraries (native CSS `overflow-x: auto` + `scroll-snap` handles swipe)
