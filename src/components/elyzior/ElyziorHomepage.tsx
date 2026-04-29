'use client';

import { motion } from 'framer-motion';
import type { UserType } from "@/tokens";
import { Header } from "@/components/shared/Header";
import { Button } from "@/components/shared/Button";
import { HeroSection } from "./HeroSection";
import { BookingWidget } from "@/components/shared/BookingWidget";
import { HotelsCarousel } from "./HotelsCarousel";
import { StorySection } from "./StorySection";
import { ExperiencesSection } from "./ExperiencesSection";
import { PrivilegeSection } from "./PrivilegeSection";
import { Footer } from "@/components/shared/Footer";
import { EASE, fadeUp, staggerContainer, staggerContainerDelayed, VP } from "./animations";
import { useMediaQuery } from '@/hooks/useMediaQuery';

/* ── LOYALTY DATA ─────────────────────────────────────────── */

const curatedExperiences = [
  { name: 'Monaco Grand Prix', detail: 'May 2026' },
  { name: 'Private Yacht Charter', detail: 'May 2026' },
];

/* ── TEXT LINK ────────────────────────────────────────────── */

function TextLink({ label, href = '#' }: { label: string; href?: string }) {
  return (
    <motion.a
      variants={fadeUp}
      href={href}
      className="group flex items-center gap-2 w-fit"
    >
      <span
        className="relative"
        style={{
          fontFamily:    'var(--font-ui)',
          fontSize:      'var(--size-label)',
          fontWeight:    'var(--font-weight-label)',
          letterSpacing: 'var(--tracking-label)',
          color:         'var(--color-text-on-inverse)',
          textTransform: 'uppercase',
        }}
      >
        {label}
        <span
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
          style={{ backgroundColor: 'var(--color-text-on-inverse)' }}
        />
      </span>
      <i
        className="ri-arrow-right-line transition-transform duration-300 ease-out group-hover:translate-x-1"
        style={{ fontSize: 'var(--size-body)', color: 'var(--color-text-accent)' }}
      />
    </motion.a>
  );
}

/* ── LOYALTY CONCIERGE HERO ───────────────────────────────── */

function LoyaltyConciergeHero({ userType }: { userType: UserType }) {
  const isMobile = useMediaQuery('(max-width: 639px)');

  return (
    <section className="relative w-full" style={{ minHeight: isMobile ? 'auto' : '100vh' }}>

      {/* Nav background band — desktop only, sits behind the transparent absolute nav */}
      {!isMobile && (
        <div
          className="absolute inset-x-0 top-0 z-10"
          style={{
            height:          '88px',
            backgroundColor: 'var(--color-bg-inverse-deepest)',
            borderBottom:    '1px solid var(--color-border-emphasis)',
          }}
        />
      )}

      {/* Nav floats absolutely over the grid (Elyzior header positions itself) */}
      <Header brand="elyzior" userType={userType} />

      {/* Grid: 2-col asymmetric on desktop, single column stacked on mobile */}
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: isMobile ? '1fr' : '55fr 45fr',
          gridTemplateRows:    isMobile ? 'auto' : '1fr 1fr',
          minHeight:           isMobile ? 'auto' : '100vh',
        }}
      >

        {/* ── 1. CONCIERGE (primary, full height) ───────────── */}
        <motion.div
          variants={staggerContainerDelayed}
          initial="hidden"
          animate="visible"
          style={{
            gridColumn:      isMobile ? undefined : '1',
            gridRow:         isMobile ? undefined : '1 / 3',
            backgroundColor: 'var(--color-bg-inverse-deepest)',
            borderRight:     isMobile ? undefined : '1px solid var(--color-border-emphasis)',
            borderBottom:    isMobile ? '1px solid var(--color-border-emphasis)' : undefined,
            paddingTop:      isMobile ? '80px' : 'var(--section-h)',
            paddingBottom:   'var(--section-h)',
            paddingLeft:     isMobile ? '24px' : 'var(--section-h)',
            paddingRight:    isMobile ? '24px' : 'var(--section-h)',
            display:         'flex',
            flexDirection:   'column',
            justifyContent:  'space-between',
            gap:             isMobile ? '48px' : undefined,
          }}
        >
          {/* Eyebrow */}
          <motion.span
            variants={fadeUp}
            style={{
              fontFamily:    'var(--font-ui)',
              fontSize:      'var(--size-label)',
              fontWeight:    'var(--font-weight-label)',
              letterSpacing: 'var(--tracking-label)',
              color:         'var(--color-text-accent)',
              textTransform: 'uppercase',
            }}
          >
            Elyzior Privilege
          </motion.span>

          {/* Core content */}
          <motion.div
            variants={staggerContainerDelayed}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 'var(--layout-gap)', alignItems: 'flex-start' }}
          >
            {/* Privilege key image — portrait, left of text */}
            <motion.div variants={fadeUp} style={{ flexShrink: 0 }}>
              <img
                src="/elyzior/privilege-key.png"
                alt=""
                style={{ height: '160px', width: 'auto', objectFit: 'contain' }}
              />
            </motion.div>

            {/* Text column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--layout-gap)' }}>
              {/* Gold rule + heading */}
              <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                <div
                  style={{
                    width:           '40px',
                    height:          '1px',
                    backgroundColor: 'var(--color-border-accent)',
                    marginBottom:    'var(--comp-lg)',
                  }}
                />
                <h1
                  style={{
                    fontFamily:    'var(--font-display)',
                    fontSize:      'var(--size-h1)',
                    letterSpacing: 'var(--tracking-h1)',
                    lineHeight:    'var(--line-height-h1)',
                    color:         'var(--color-text-on-inverse)',
                    margin:        0,
                  }}
                >
                  Your concierge<br />
                  <em style={{ fontStyle: 'italic' }}>is ready.</em>
                </h1>
              </motion.div>

              {/* Body */}
              <motion.p
                variants={fadeUp}
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      'var(--size-body-lg)',
                  lineHeight:    'var(--line-height-body-lg)',
                  letterSpacing: 'var(--tracking-body)',
                  color:         'var(--color-text-on-inverse-muted)',
                  maxWidth:      '400px',
                  margin:        0,
                }}
              >
                A dedicated liaison, available at any hour. Your preferences are known before you arrive.
              </motion.p>

              {/* CTA */}
              <motion.div variants={fadeUp}>
                <Button brand="elyzior" variant="tertiary" size="md">
                  Contact Concierge
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Membership footnote */}
          <motion.span
            variants={fadeUp}
            style={{
              fontFamily:    'var(--font-ui)',
              fontSize:      'var(--size-label)',
              fontWeight:    'var(--font-weight-body)',
              letterSpacing: 'var(--tracking-label)',
              color:         'var(--color-text-on-inverse-muted)',
              textTransform: 'uppercase',
            }}
          >
            ★ Privilege Member · Since 2022
          </motion.span>
        </motion.div>

        {/* ── 2. UPCOMING STAY (secondary, top-right) ───────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          style={{
            gridColumn:      isMobile ? undefined : '2',
            gridRow:         isMobile ? undefined : '1',
            backgroundColor: 'var(--color-bg-inverse-deep)',
            borderBottom:    '1px solid var(--color-border-emphasis)',
            paddingTop:      isMobile ? '40px' : '104px',
            paddingBottom:   '56px',
            paddingLeft:     isMobile ? '24px' : '72px',
            paddingRight:    isMobile ? '24px' : '72px',
            display:         'flex',
            flexDirection:   'column',
            justifyContent:  'space-between',
            gap:             isMobile ? '32px' : undefined,
          }}
        >
          {/* Eyebrow */}
          <motion.span
            variants={fadeUp}
            style={{
              fontFamily:    'var(--font-ui)',
              fontSize:      'var(--size-label)',
              fontWeight:    'var(--font-weight-label)',
              letterSpacing: 'var(--tracking-label)',
              color:         'var(--color-text-accent)',
              textTransform: 'uppercase',
            }}
          >
            Upcoming Stay
          </motion.span>

          {/* Location + dates */}
          <motion.div variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <h2
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'var(--size-h2)',
                  letterSpacing: 'var(--tracking-h2)',
                  lineHeight:    '1',
                  color:         'var(--color-text-on-inverse)',
                  margin:        0,
                }}
              >
                Monaco
              </h2>
              <span
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      'var(--size-body-sm)',
                  letterSpacing: 'var(--tracking-body)',
                  color:         'var(--color-text-on-inverse-muted)',
                  textTransform: 'uppercase',
                }}
              >
                Côte d&apos;Azur
              </span>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      'var(--size-body)',
                  letterSpacing: 'var(--tracking-body)',
                  color:         'var(--color-text-on-inverse)',
                }}
              >
                May 22–28, 2026 · 6 nights
              </span>
              <em
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'var(--size-body)',
                  letterSpacing: 'var(--tracking-body)',
                  color:         'var(--color-text-accent)',
                  fontStyle:     'italic',
                }}
              >
                Grand Horizon Suite
              </em>
            </motion.div>

            <TextLink label="View Itinerary" />
          </motion.div>
        </motion.div>

        {/* ── 3. CURATED EXPERIENCES (tertiary, bottom-right) ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          style={{
            gridColumn:      isMobile ? undefined : '2',
            gridRow:         isMobile ? undefined : '2',
            backgroundColor: 'var(--color-bg-inverse)',
            paddingTop:      '56px',
            paddingBottom:   'var(--section-h)',
            paddingLeft:     isMobile ? '24px' : '72px',
            paddingRight:    isMobile ? '24px' : '72px',
            display:         'flex',
            flexDirection:   'column',
            justifyContent:  'space-between',
            gap:             isMobile ? '32px' : undefined,
          }}
        >
          {/* Eyebrow */}
          <motion.span
            variants={fadeUp}
            style={{
              fontFamily:    'var(--font-ui)',
              fontSize:      'var(--size-label)',
              fontWeight:    'var(--font-weight-label)',
              letterSpacing: 'var(--tracking-label)',
              color:         'var(--color-text-accent)',
              textTransform: 'uppercase',
            }}
          >
            Curated for You
          </motion.span>

          {/* Heading + list */}
          <motion.div variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--comp-gap-md)' }}>
            <motion.h3
              variants={fadeUp}
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'var(--size-h3)',
                letterSpacing: 'var(--tracking-h3)',
                lineHeight:    '1',
                color:         'var(--color-text-on-inverse)',
                margin:        0,
              }}
            >
              Experiences curated<br />
              <em style={{ fontStyle: 'italic' }}>for you.</em>
            </motion.h3>

            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column' }}>
              {curatedExperiences.map((exp, i) => (
                <div
                  key={exp.name}
                  style={{
                    display:       'flex',
                    alignItems:    'center',
                    justifyContent:'space-between',
                    paddingTop:    '12px',
                    paddingBottom: '12px',
                    borderTop:     i === 0 ? '1px solid var(--color-border-emphasis)' : undefined,
                    borderBottom:  '1px solid var(--color-border-emphasis)',
                  }}
                >
                  <span
                    style={{
                      fontFamily:    'var(--font-display)',
                      fontSize:      'var(--size-body-lg)',
                      letterSpacing: 'var(--tracking-body)',
                      color:         'var(--color-text-on-inverse)',
                    }}
                  >
                    {exp.name}
                  </span>
                  <span
                    style={{
                      fontFamily:    'var(--font-display)',
                      fontSize:      'var(--size-body-lg)',
                      letterSpacing: 'var(--tracking-body)',
                      color:         'var(--color-text-on-inverse)',
                    }}
                  >
                    {exp.detail}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <TextLink label="Explore Experiences" />
        </motion.div>

      </div>
    </section>
  );
}

/* ── COMPONENT ────────────────────────────────────────────── */

export function ElyziorHomepage({ userType }: { userType: UserType }) {
  const isLoyalty = userType === 'loyalty';

  if (isLoyalty) {
    return (
      <main className="flex flex-col w-full">
        <LoyaltyConciergeHero userType={userType} />

        {/* Their curated hotels */}
        <HotelsCarousel userType={userType} />

        {/* Experiences */}
        <ExperiencesSection />

        {/* Accommodations story */}
        <StorySection
          eyebrow="ACCOMMODATIONS"
          heading={["A Room", "That Breathes"]}
          body="Every suite is a private sanctuary, with unique design. Natural materials, curated light, and silence that restores. This is not a room you stay in. It is a room that stays with you."
          ctaLabel="DISCOVER OUR SUITES"
          imageUrl="/elyzior/accomodations.png"
          imageRight={false}
        />

        {/* Brand storytelling — lower in hierarchy */}
        <StorySection
          eyebrow="LE LOUIS XV / MONACO BY"
          heading={["Antoine", "Gasseau"]}
          body='"An unforgettable experience. Each dish felt like a personal retreat, crafted with the finest Mediterranean ingredients and an artistry that transcends the senses."'
          ctaLabel="EXPLORE MENU"
          imageUrl="/elyzior/antoine.png"
          imageRight={true}
          quote={true}
        />

        <PrivilegeSection userType={userType} />
        <Footer brand="elyzior" />
      </main>
    );
  }

  return (
    <main className="flex flex-col w-full">
      <HeroSection userType={userType} />
      <BookingWidget brand="elyzior" />
      <HotelsCarousel userType={userType} />

      <StorySection
        eyebrow="ACCOMMODATIONS"
        heading={["A Room", "That Breathes"]}
        body="Every suite is a private sanctuary, with unique design. Natural materials, curated light, and silence that restores. This is not a room you stay in. It is a room that stays with you."
        ctaLabel="DISCOVER OUR SUITES"
        imageUrl="/elyzior/accomodations.png"
        imageRight={false}
      />

      <ExperiencesSection />

      <StorySection
        eyebrow="SANTUARIO / NEW YORK BY"
        heading={["Antoine", "Gasseau"]}
        body='"An unforgettable experience. Each dish felt like a personal retreat, crafted with fresh, natural ingredients that delighted the senses."'
        ctaLabel="EXPLORE MENU"
        imageUrl="/elyzior/antoine.png"
        imageRight={true}
        quote={true}
      />

      <PrivilegeSection userType={userType} />
      <Footer brand="elyzior" />
    </main>
  );
}
