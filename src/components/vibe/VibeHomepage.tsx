'use client';

import { motion } from 'framer-motion';
import type { UserType } from '@/tokens';
import { HotelCard, type HotelCardProps } from '@/components/shared/HotelCard';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { Button } from '@/components/shared/Button';
import { Badge } from '@/components/shared/Badge';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { BookingWidget } from '@/components/shared/BookingWidget';
import { getMotion } from '@/components/shared/motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/* ── DATA ─────────────────────────────────────────────────── */

const hotels: (Omit<HotelCardProps, 'brand'> & { id: string })[] = [
  {
    id: 'lisbon',
    city: 'Lisbon',
    country: 'Portugal',
    price: 49,
    imageUrl: '/vibe/lisbon.png',
    amenities: [
      { label: 'Coworking', value: 'Included' },
      { label: 'Events', value: 'Weekly' },
      { label: 'Breakfast', value: 'Included' },
    ],
    badge: 'POPULAR',
  },
  {
    id: 'medellin',
    city: 'Medellín',
    country: 'Colombia',
    price: 29,
    imageUrl: '/vibe/medellin.png',
    amenities: [
      { label: 'Coworking', value: 'Included' },
      { label: 'Events', value: 'Weekly' },
      { label: 'Breakfast', value: 'Included' },
    ],
    badge: 'POPULAR',
  },
  {
    id: 'buenos-aires',
    city: 'Buenos Aires',
    country: 'Argentina',
    price: 39,
    imageUrl: '/vibe/buenos%20aires.png',
    amenities: [
      { label: 'Coworking', value: 'Available' },
      { label: 'Events', value: 'Weekly' },
      { label: 'Breakfast', value: 'Included' },
    ],
  },
  {
    id: 'madrid',
    city: 'Madrid',
    country: 'Spain',
    price: 49,
    imageUrl: '/vibe/madrid.png',
    amenities: [
      { label: 'Coworking', value: 'Available' },
      { label: 'Events', value: 'Weekly' },
      { label: 'Breakfast', value: 'Extra' },
    ],
  },
  {
    id: 'mexico-city',
    city: 'Mexico City',
    country: 'Mexico',
    price: 39,
    imageUrl: '/vibe/mexicocity.png',
    amenities: [
      { label: 'Coworking', value: 'Included' },
      { label: 'Events', value: 'Bi-Weekly' },
      { label: 'Breakfast', value: 'Included' },
    ],
  },
  {
    id: 'sao-paulo',
    city: 'São Paulo',
    country: 'Brazil',
    price: 49,
    imageUrl: '/vibe/saopaulo.png',
    amenities: [
      { label: 'Coworking', value: 'Included' },
      { label: 'Events', value: 'Bi-Weekly' },
      { label: 'Breakfast', value: 'Extra' },
    ],
  },
];

const amenitiesList = [
  '24-Hour Front Desk With Concierge Services',
  'Free Highspeed Wifi Throughout The Premises',
  'Premium Toiletries In Every Room',
  'Custom Furniture + Local Artwork',
  'In-Room Safe + Smart TV',
  'Unique Snack + Beverage Selection',
  'Room Service Available',
  'Curated Packages For Culture Seekers',
  'Dedicated Coworking Spaces',
  'Rooftop Access At Select Locations',
  'Community Events + City Tours',
  'Private Meeting Rooms',
];

const weekEvents = [
  { name: 'Arte BA Opening', location: 'Palermo' },
  { name: 'San Telmo Market', location: 'San Telmo' },
  { name: 'BA Night Run', location: 'Puerto Madero' },
];

/* ── HEADING BLOCK ─────────────────────────────────────────── */

type WordBlockProps = {
  word: string;
  corners: {
    tl?: boolean;
    tr?: boolean;
    bl?: boolean;
    br?: boolean;
  };
  size?: 'display' | 'h1';
};

function WordBlock({ word, corners, size = 'display' }: WordBlockProps) {
  const isMobile = useMediaQuery('(max-width: 639px)');

  const fontSize   = isMobile
    ? (size === 'display' ? '36px' : '28px')
    : (size === 'display' ? 'var(--size-display)' : 'var(--size-h1)');
  const lineHeight = isMobile ? '1.1'
    : (size === 'display' ? 'var(--line-height-display)' : 'var(--line-height-h1)');
  const tracking   = isMobile ? '-0.5px'
    : (size === 'display' ? 'var(--tracking-display)' : 'var(--tracking-h1)');
  const radius     = `${corners.tl ? 'var(--radius-md)' : '0'} ${corners.tr ? 'var(--radius-md)' : '0'} ${corners.br ? 'var(--radius-md)' : '0'} ${corners.bl ? 'var(--radius-lg)' : '0'}`;

  return (
    <div
      style={{
        border:       '2px solid var(--color-border-default)',
        borderRadius: radius,
        padding:      size === 'display' ? '14px' : '10px 18px',
        marginRight:  '-2px',
        marginBottom: '-2px',
      }}
    >
      <span
        style={{
          fontFamily:    'var(--font-display)',
          fontSize,
          fontWeight:    'var(--font-weight-display)',
          lineHeight,
          letterSpacing: tracking,
          color:         'var(--color-text-primary)',
          display:       'block',
          whiteSpace:    isMobile ? 'normal' : 'nowrap',
        }}
      >
        {word}
      </span>
    </div>
  );
}

/* ── LOYALTY BENTO HERO ────────────────────────────────────── */

function LoyaltyBentoHero() {
  const m = getMotion('vibe');
  const isMobile = useMediaQuery('(max-width: 639px)');

  return (
    <section
      style={{
        paddingTop:      isMobile ? '72px' : '32px',
        paddingBottom:   '48px',
        paddingLeft:     isMobile ? '16px' : 'var(--section-h)',
        paddingRight:    isMobile ? '16px' : 'var(--section-h)',
        backgroundColor: 'var(--color-bg-page)',
      }}
    >
      {/* Greeting bar */}
      <motion.div
        variants={m.stagger}
        initial="hidden"
        animate="visible"
        style={{
          display:        'flex',
          alignItems:     'baseline',
          justifyContent: 'space-between',
          marginBottom:   '20px',
        }}
      >
        <motion.span
          variants={m.fadeUp}
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'var(--size-h2)',
            fontWeight:    'var(--font-weight-display)',
            letterSpacing: 'var(--tracking-h1)',
            color:         'var(--color-text-primary)',
            lineHeight:    '1',
          }}
        >
          Hey, Alex.
        </motion.span>
        <motion.span
          variants={m.fadeUp}
          style={{
            fontFamily:    'var(--font-body)',
            fontSize:      'var(--size-label)',
            fontWeight:    'var(--font-weight-label)',
            letterSpacing: 'var(--tracking-eyebrow)',
            color:         'var(--color-text-secondary)',
          }}
        >
          MONDAY, APR 28
        </motion.span>
      </motion.div>

      {/* Bento grid — 3-col named areas on desktop, single column on mobile */}
      <motion.div
        variants={m.staggerDelayed}
        initial="hidden"
        animate="visible"
        style={{
          display:             'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
          gridTemplateRows:    isMobile ? 'auto' : '230px 130px 244px',
          gap:                 '10px',
          ...(isMobile ? {} : {
            gridTemplateAreas: `
              "bookagain bookagain search"
              "bookagain bookagain rewards"
              "deals     events    workspace"
            `,
          }),
        }}
      >

        {/* ── 1. BOOK AGAIN (primary) ────────────────────────── */}
        <motion.div
          variants={m.scaleIn}
          style={{
            gridArea:  isMobile ? undefined : 'bookagain',
            display:   'flex',
            flexDirection: isMobile ? 'column' : 'row',
            overflow:  'hidden',
            minHeight: isMobile ? '280px' : undefined,
          }}
        >
          {/* Left: dark content panel */}
          <div
            style={{
              flex:            isMobile ? 'none' : '0 0 58%',
              backgroundColor: 'var(--color-bg-inverse)',
              padding:         '32px',
              display:         'flex',
              flexDirection:   'column',
              justifyContent:  'space-between',
              gap:             isMobile ? '24px' : undefined,
            }}
          >
            <div>
              <Badge>Last Stay</Badge>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontFamily:    'var(--font-display)',
                    fontSize:      'var(--size-h2)',
                    fontWeight:    'var(--font-weight-display)',
                    letterSpacing: 'var(--tracking-h1)',
                    color:         'var(--color-text-on-inverse)',
                    lineHeight:    '1',
                  }}
                >
                  Buenos Aires
                </span>
                <span
                  style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      'var(--size-body-sm)',
                    letterSpacing: 'var(--tracking-body-sm)',
                    color:         'var(--color-text-on-inverse-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  Argentina &nbsp;·&nbsp; Mar 12–18 &nbsp;·&nbsp; 6 nights
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Button brand="vibe" variant="secondary" size="sm" icon={<i className="ri-arrow-right-line" />}>
                  Book again
                </Button>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span
                    style={{
                      fontFamily:    'var(--font-display)',
                      fontSize:      'var(--size-h4)',
                      fontWeight:    'var(--font-weight-display)',
                      letterSpacing: 'var(--tracking-price)',
                      color:         'var(--color-text-accent)',
                      lineHeight:    '1',
                    }}
                  >
                    $39
                  </span>
                  <span
                    style={{
                      fontFamily:    'var(--font-body)',
                      fontSize:      'var(--size-label)',
                      letterSpacing: 'var(--tracking-eyebrow-sm)',
                      color:         'var(--color-text-on-inverse-muted)',
                    }}
                  >
                    /night
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: city photo */}
          <div
            style={{
              flex:               '1',
              height:             isMobile ? '160px' : undefined,
              backgroundImage:    'url(/vibe/buenos%20aires.png)',
              backgroundSize:     'cover',
              backgroundPosition: 'center',
              position:           'relative',
            }}
          >
            {/* subtle left-edge fade into the dark panel */}
            <div
              style={{
                position:   'absolute',
                inset:      0,
                background: 'linear-gradient(to right, var(--color-bg-inverse) 0%, transparent 30%)',
              }}
            />
          </div>
        </motion.div>

        {/* ── 2. SEARCH ─────────────────────────────────────── */}
        <motion.div
          variants={m.fadeUp}
          style={{
            gridArea:        isMobile ? undefined : 'search',
            backgroundColor: 'var(--color-bg-surface)',
            border:          '1px solid var(--color-border-default)',
            padding:         '24px',
            display:         'flex',
            flexDirection:   'column',
            justifyContent:  'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <i
              className="ri-map-pin-2-line"
              style={{ fontSize: 'var(--size-body-lg)', color: 'var(--color-text-primary)' }}
            />
            <span
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      'var(--size-label)',
                fontWeight:    'var(--font-weight-ui)',
                letterSpacing: 'var(--tracking-eyebrow)',
                color:         'var(--color-text-secondary)',
              }}
            >
              WHERE NEXT?
            </span>
            <div
              style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
                borderBottom:   '1px solid var(--color-border-default)',
                paddingBottom:  '8px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   'var(--size-body)',
                  color:      'var(--color-text-secondary)',
                }}
              >
                Destination...
              </span>
              <i
                className="ri-search-line"
                style={{ fontSize: 'var(--size-body)', color: 'var(--color-text-secondary)' }}
              />
            </div>
          </div>
          <Button brand="vibe" variant="secondary" size="sm" icon={<i className="ri-arrow-right-line" />} className="w-full justify-center">
            Search stays
          </Button>
        </motion.div>

        {/* ── 3. REWARDS ────────────────────────────────────── */}
        <motion.div
          variants={m.fadeUp}
          style={{
            gridArea:        isMobile ? undefined : 'rewards',
            backgroundColor: 'var(--color-bg-accent)',
            padding:         '20px 24px',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'space-between',
            gap:             '16px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'var(--size-h3)',
                fontWeight:    'var(--font-weight-display)',
                letterSpacing: 'var(--tracking-stat)',
                color:         'var(--color-text-primary)',
                lineHeight:    '1',
              }}
            >
              2,450 pts
            </span>
            <span
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      'var(--size-label)',
                letterSpacing: 'var(--tracking-eyebrow-sm)',
                color:         'var(--color-text-primary)',
              }}
            >
              Enough for a free night
            </span>
          </div>
          <Button brand="vibe" variant="primary" size="sm" icon={<i className="ri-arrow-right-line" />}>
            Use rewards
          </Button>
        </motion.div>

        {/* ── 4. DEALS ──────────────────────────────────────── */}
        <motion.div
          variants={m.fadeUp}
          style={{
            gridArea:        isMobile ? undefined : 'deals',
            backgroundColor: 'var(--color-bg-page)',
            border:          '1px solid var(--color-border-default)',
            padding:         '24px',
            display:         'flex',
            flexDirection:   'column',
            justifyContent:  'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <i
              className="ri-price-tag-3-line"
              style={{ fontSize: 'var(--size-body-lg)', color: 'var(--color-text-primary)' }}
            />
            <span
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      'var(--size-label)',
                fontWeight:    'var(--font-weight-ui)',
                letterSpacing: 'var(--tracking-eyebrow)',
                color:         'var(--color-text-secondary)',
              }}
            >
              YOUR DEALS
            </span>
            <span
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'var(--size-h5)',
                fontWeight:    'var(--font-weight-display)',
                color:         'var(--color-text-primary)',
                lineHeight:    'normal',
              }}
            >
              3 personalized offers
            </span>
          </div>
          <Button brand="vibe" variant="secondary" size="sm" icon={<i className="ri-arrow-right-line" />} className="w-full justify-center">
            View deals
          </Button>
        </motion.div>

        {/* ── 5. EVENTS ─────────────────────────────────────── */}
        <motion.div
          variants={m.fadeUp}
          style={{
            gridArea:        isMobile ? undefined : 'events',
            backgroundColor: 'var(--color-bg-inverse)',
            padding:         '24px',
            display:         'flex',
            flexDirection:   'column',
            justifyContent:  'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      'var(--size-label)',
                fontWeight:    'var(--font-weight-ui)',
                letterSpacing: 'var(--tracking-eyebrow)',
                color:         'var(--color-text-on-inverse-muted)',
              }}
            >
              HAPPENING THIS WEEK
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
              {weekEvents.map((event, i) => (
                <div
                  key={event.name}
                  style={{
                    display:       'flex',
                    alignItems:    'center',
                    justifyContent:'space-between',
                    padding:       '8px 0',
                    borderBottom:  i < weekEvents.length - 1
                      ? '1px solid var(--color-border-subtle)'
                      : 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily:    'var(--font-body)',
                      fontSize:      'var(--size-body-sm)',
                      color:         'var(--color-text-on-inverse)',
                      letterSpacing: 'var(--tracking-body-sm)',
                    }}
                  >
                    {event.name}
                  </span>
                  <span
                    style={{
                      fontFamily:    'var(--font-body)',
                      fontSize:      'var(--size-label)',
                      color:         'var(--color-text-on-inverse-muted)',
                      letterSpacing: 'var(--tracking-eyebrow-sm)',
                    }}
                  >
                    {event.location}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Button brand="vibe" variant="secondary" size="sm" icon={<i className="ri-arrow-right-line" />} className="w-full justify-center">
            See events
          </Button>
        </motion.div>

        {/* ── 6. WORKSPACE ──────────────────────────────────── */}
        <motion.div
          variants={m.fadeUp}
          style={{
            gridArea:        isMobile ? undefined : 'workspace',
            backgroundColor: 'var(--color-bg-page)',
            border:          '1px solid var(--color-border-default)',
            padding:         '24px',
            display:         'flex',
            flexDirection:   'column',
            justifyContent:  'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <i
              className="ri-computer-line"
              style={{ fontSize: 'var(--size-body-lg)', color: 'var(--color-text-primary)' }}
            />
            <span
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      'var(--size-label)',
                fontWeight:    'var(--font-weight-ui)',
                letterSpacing: 'var(--tracking-eyebrow)',
                color:         'var(--color-text-secondary)',
              }}
            >
              NEED A WORKSPACE?
            </span>
            <span
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'var(--size-h5)',
                fontWeight:    'var(--font-weight-display)',
                color:         'var(--color-text-primary)',
                lineHeight:    'normal',
              }}
            >
              Coworking included
            </span>
          </div>
          <Button brand="vibe" variant="secondary" size="sm" icon={<i className="ri-arrow-right-line" />} className="w-full justify-center">
            Book workspace
          </Button>
        </motion.div>

      </motion.div>
    </section>
  );
}

/* ── COMPONENT ─────────────────────────────────────────────── */

export function VibeHomepage({ userType }: { userType: UserType }) {
  const isLoyalty = userType === 'loyalty';
  const m = getMotion('vibe');
  const isMobile = useMediaQuery('(max-width: 639px)');

  return (
    <main style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', backgroundColor: 'var(--color-bg-page)' }}>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <Header brand="vibe" userType={userType} />

      {isLoyalty ? (

        /* ── LOYALTY: BENTO CONTROL SURFACE ─────────────────── */
        <LoyaltyBentoHero />

      ) : (

        /* ── FIRST-TIME: HERO ────────────────────────────────── */
        <>
          <section
            style={{
              display:         'flex',
              flexDirection:   isMobile ? 'column' : 'row',
              gap:             isMobile ? '24px' : '48px',
              alignItems:      'center',
              paddingTop:      isMobile ? '72px' : '80px',
              paddingBottom:   '40px',
              paddingLeft:     isMobile ? '24px' : '48px',
              paddingRight:    isMobile ? '24px' : '48px',
              backgroundColor: 'var(--color-bg-page)',
            }}
          >
            {/* Left content — stagger entrance */}
            <motion.div
              variants={m.staggerDelayed}
              initial="hidden"
              animate="visible"
              style={{
                flex:          isMobile ? 'none' : 1,
                width:         isMobile ? '100%' : undefined,
                display:       'flex',
                flexDirection: 'column',
                gap:           isMobile ? '24px' : '48px',
                paddingBottom: isMobile ? 0 : '64px',
              }}
            >
              <motion.span
                variants={m.fadeUp}
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'var(--size-body)',
                  fontWeight:    'var(--font-weight-subheading)',
                  letterSpacing: 'var(--tracking-eyebrow)',
                  color:         'var(--color-text-secondary)',
                }}
              >
                15 CITIES · URBAN STYLE · EST. 2024
              </motion.span>

              <motion.div variants={m.fadeUp}>
                <div>
                  <div style={{ display: 'flex', marginBottom: '-2px' }}>
                    <WordBlock word="Stay" corners={{ tl: true }} />
                    <WordBlock word="Smart," corners={{ tr: true }} />
                  </div>
                  <div style={{ display: 'flex' }}>
                    <WordBlock word="Travel" corners={{ bl: true }} />
                    <WordBlock word="Bold" corners={{ br: true }} />
                  </div>
                </div>
              </motion.div>

              <motion.p
                variants={m.fadeUp}
                style={{
                  fontFamily:  'var(--font-body)',
                  fontSize:    'var(--size-body-lg)',
                  fontWeight:  'var(--font-weight-body)',
                  lineHeight:  'var(--line-height-body-lg)',
                  color:       'var(--color-text-secondary)',
                  maxWidth:    '503px',
                  margin:      0,
                }}
              >
                Everything you need. Nothing you don&apos;t.<br />
                Affordable stays in top locations, ready when you are.
              </motion.p>

              <motion.div variants={m.fadeUp} style={{ display: 'contents' }}>
                <Button brand="vibe" variant="secondary" size="md" className="self-start">
                  Find your stay
                </Button>
              </motion.div>
            </motion.div>

            {/* Right — hero image with Ken Burns zoom (hidden on mobile) */}
            <div
              className="max-sm:hidden"
              style={{
                width:      '709px',
                height:     '808px',
                flexShrink: 0,
                position:   'relative',
                overflow:   'hidden',
              }}
            >
              <motion.div
                {...m.slowZoom}
                style={{
                  width:              '100%',
                  height:             '100%',
                  backgroundImage:    'url(/vibe/hero:vibe.png)',
                  backgroundSize:     'cover',
                  backgroundPosition: 'center',
                }}
              />

              <div
                style={{
                  position:   'absolute',
                  inset:      0,
                  background: 'linear-gradient(to bottom, rgba(26,26,24,0.9) 0%, rgba(102,102,102,0) 27%)',
                }}
              />

              <motion.div
                variants={m.fadeUpSlight}
                initial="hidden"
                animate="visible"
                style={{
                  position:      'absolute',
                  top:           '16px',
                  left:          '16px',
                  display:       'flex',
                  flexDirection: 'column',
                  gap:           '2px',
                  letterSpacing: 'var(--tracking-eyebrow)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--size-h5)', fontWeight: 'var(--font-weight-subheading)', color: 'var(--color-text-on-inverse)' }}>
                  BUENOS AIRES,
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body)', fontWeight: 'var(--font-weight-body)', color: 'var(--color-text-on-inverse)' }}>
                  Santelmo Area
                </span>
              </motion.div>

              <motion.div
                variants={m.fadeUpSlight}
                initial="hidden"
                animate="visible"
                style={{
                  position:            'absolute',
                  bottom:              '120px',
                  left:                '-16px',
                  backgroundColor:     'var(--color-bg-accent)',
                  padding:             '24px 32px',
                  borderTopRightRadius:'var(--radius-md)',
                  display:             'flex',
                  flexDirection:       'column',
                  gap:                 '4px',
                  color:               'var(--color-text-primary)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body)', lineHeight: 'var(--line-height-body)' }}>From</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--size-h2)', fontWeight: 'var(--font-weight-display)', letterSpacing: 'var(--tracking-price)' }}>$49</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body)', lineHeight: 'var(--line-height-body)' }}>/night</span>
              </motion.div>

              <div style={{ position: 'absolute', bottom: '120px', left: '145px' }}>
                <Button brand="vibe" variant="primary" size="md" icon={<i className="ri-arrow-right-line" />}>
                  Book now
                </Button>
              </div>
            </div>
          </section>

          {/* ── BOOKING WIDGET ──────────────────────────────── */}
          <BookingWidget brand="vibe" />
        </>
      )}

      {/* ── EXPLORE CITIES / YOUR STAYS ─────────────────────── */}
      <div
        style={{
          paddingTop:      isLoyalty ? '64px' : 'var(--section-v)',
          paddingBottom:   'var(--section-v)',
          paddingLeft:     isMobile ? '24px' : 'var(--section-h)',
          paddingRight:    isMobile ? '24px' : 'var(--section-h)',
          backgroundColor: 'var(--color-bg-subtle)',
        }}
      >
        <motion.div
          variants={m.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={m.vp}
          style={{ display: 'flex', marginBottom: '40px' }}
        >
          <WordBlock word="Explore" corners={{ tl: true }} size="h1" />
          <WordBlock word={isLoyalty ? 'Your Stays' : 'Cities'} corners={{ br: true }} size="h1" />
        </motion.div>

        <motion.div
          variants={m.staggerDelayed}
          initial="hidden"
          whileInView="visible"
          viewport={m.vp}
          style={{
            display:             'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap:                 'var(--card-gap)',
          }}
        >
          {hotels.map(({ id, ...cardProps }) => (
            <motion.div key={id} variants={m.fadeUp}>
              <HotelCard brand="vibe" ctaLabel="View stay" {...cardProps} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={m.scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={m.vp}
          style={{ display: 'flex', justifyContent: 'center', paddingTop: '32px' }}
        >
          <a
            href="#"
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '8px',
              fontFamily:    'var(--font-body)',
              fontSize:      'var(--size-body-sm)',
              fontWeight:    'var(--font-weight-label)',
              letterSpacing: 'var(--tracking-eyebrow)',
              color:         'var(--color-text-primary)',
              textDecoration:'none',
            }}
          >
            DISCOVER MORE CITIES <i className="ri-arrow-right-line" />
          </a>
        </motion.div>
      </div>

      {/* ── BOOK DIRECT & SKIP EXTRAS ───────────────────────── */}
      <SectionWrapper inverse className="max-sm:!px-6 max-sm:!py-12">
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '32px' : '48px', alignItems: 'center' }}>

          <motion.div
            variants={m.slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={m.vp}
            style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
          >
            <div>
              <div style={{ display: 'flex', marginBottom: '-2px' }}>
                {['Book', 'Direct'].map((word, i) => (
                  <div
                    key={word}
                    style={{
                      border:       '2px solid var(--color-text-on-inverse)',
                      borderRadius: i === 0 ? 'var(--radius-md) 0 0 0' : '0 var(--radius-md) 0 0',
                      padding:      '10px 18px',
                      marginRight:  '-2px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily:    'var(--font-display)',
                        fontSize:      'var(--size-h1)',
                        fontWeight:    'var(--font-weight-display)',
                        lineHeight:    'var(--line-height-h1)',
                        letterSpacing: 'var(--tracking-h1)',
                        color:         'var(--color-text-on-inverse)',
                        whiteSpace:    'nowrap',
                        display:       'block',
                      }}
                    >
                      {word}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex' }}>
                {['& Skip', 'Extras'].map((word, i) => (
                  <div
                    key={word}
                    style={{
                      border:       '2px solid var(--color-text-on-inverse)',
                      borderRadius: i === 0 ? '0 0 0 var(--radius-lg)' : '0 0 var(--radius-md) 0',
                      padding:      '10px 18px',
                      marginRight:  '-2px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily:    'var(--font-display)',
                        fontSize:      'var(--size-h1)',
                        fontWeight:    'var(--font-weight-display)',
                        lineHeight:    'var(--line-height-h1)',
                        letterSpacing: 'var(--tracking-h1)',
                        color:         'var(--color-text-on-inverse)',
                        whiteSpace:    'nowrap',
                        display:       'block',
                      }}
                    >
                      {word}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p
                style={{
                  fontFamily:  'var(--font-body)',
                  fontSize:    'var(--size-body-lg)',
                  fontWeight:  'var(--font-weight-body)',
                  lineHeight:  'var(--line-height-body-lg)',
                  color:       'var(--color-text-on-inverse)',
                  margin:      0,
                  maxWidth:    '446px',
                }}
              >
                Better rates, built-in perks, and everything you need from the start.
              </p>
              <Button brand="vibe" variant="secondary" size="md" icon={<i className="ri-arrow-right-line" />}>
                Book stay now
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={m.staggerDelayed}
            initial="hidden"
            whileInView="visible"
            viewport={m.vp}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {[
              { label: 'BEST RATES',        desc: 'Guaranteed lowest price when you book with us.' },
              { label: 'FREE COWORKING',    desc: 'Comfortable spaces to work, included in your stay.' },
              { label: 'GIGABIT WIFI',      desc: 'Fast, reliable internet in every room.' },
              { label: 'COMMUNITY EVENTS',  desc: 'Meet other travelers through curated local events.' },
              { label: 'FLEXIBLE CANCEL',   desc: 'Change plans easily when things shift.' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                variants={m.fadeUp}
                style={{
                  display:     'flex',
                  gap:         '32px',
                  alignItems:  'center',
                  padding:     '33px 0',
                  borderTop:   i === 0 ? '1px solid var(--color-border-subtle)' : undefined,
                  borderBottom:'1px solid var(--color-border-subtle)',
                }}
              >
                <span
                  style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      'var(--size-body)',
                    fontWeight:    'var(--font-weight-ui)',
                    letterSpacing: 'var(--tracking-feature-label)',
                    textTransform: 'uppercase',
                    color:         'var(--color-text-accent)',
                    width:         '160px',
                    flexShrink:    0,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      'var(--size-label)',
                    fontWeight:    'var(--font-weight-body)',
                    letterSpacing: 'var(--tracking-feature-desc)',
                    color:         'var(--color-text-on-inverse)',
                    textTransform: 'lowercase',
                  }}
                >
                  {item.desc}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </SectionWrapper>

      {/* ── WHERE COMFORT MEETS COMMUNITY ───────────────────── */}
      <SectionWrapper className="max-sm:!px-6 max-sm:!py-12">
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '32px' : '48px', alignItems: 'center' }}>

          <motion.div
            variants={m.slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={m.vp}
            style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      'var(--size-label)',
                  fontWeight:    'var(--font-weight-body)',
                  letterSpacing: 'var(--tracking-eyebrow-sm)',
                  textTransform: 'uppercase',
                  color:         'var(--color-text-secondary)',
                }}
              >
                EXPERIENCE VIBE
              </span>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', marginBottom: '-2px' }}>
                  <div
                    style={{
                      border:       '2px solid var(--color-border-default)',
                      borderRadius: '0 var(--radius-md) 0 0',
                      padding:      '10px 18px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily:    'var(--font-display)',
                        fontSize:      'var(--size-h1)',
                        fontWeight:    'var(--font-weight-display)',
                        lineHeight:    'var(--line-height-h1)',
                        letterSpacing: 'var(--tracking-h1)',
                        color:         'var(--color-text-primary)',
                        whiteSpace:    'nowrap',
                        display:       'block',
                      }}
                    >
                      Where Comfort
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  {[
                    { word: 'Meets',     radius: '0 0 0 var(--radius-lg)' },
                    { word: 'Community', radius: '0 0 var(--radius-md) 0' },
                  ].map(({ word, radius }) => (
                    <div
                      key={word}
                      style={{
                        border:       '2px solid var(--color-border-default)',
                        borderRadius: radius,
                        padding:      '10px 18px',
                        marginRight:  '-2px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily:    'var(--font-display)',
                          fontSize:      'var(--size-h1)',
                          fontWeight:    'var(--font-weight-display)',
                          lineHeight:    'var(--line-height-h1)',
                          letterSpacing: 'var(--tracking-h1)',
                          color:         'var(--color-text-primary)',
                          whiteSpace:    'nowrap',
                          display:       'block',
                        }}
                      >
                        {word}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '8px' }}>
                <p
                  style={{
                    fontFamily:  'var(--font-body)',
                    fontSize:    'var(--size-body-lg)',
                    fontWeight:  'var(--font-weight-body)',
                    lineHeight:  'var(--line-height-body-lg)',
                    color:       'var(--color-text-secondary)',
                    margin:      0,
                    maxWidth:    '497px',
                  }}
                >
                  Everything you need to feel at home, plus spaces to connect. Stay productive, meet people, or just unwind.
                </p>
                <Button brand="vibe" variant="primary" size="md" icon={<i className="ri-arrow-right-line" />}>
                  Join the community
                </Button>
              </div>
            </div>

            <div
              style={{
                display:   'flex',
                gap:       '48px',
                borderTop: '1px solid var(--color-border-subtle)',
                paddingTop:'29px',
              }}
            >
              {[
                { value: '12k+', label: 'GUESTS HOSTED' },
                { value: '15',   label: 'CITIES' },
                { value: '4.8',  label: 'AVG RATING' },
              ].map((stat) => (
                <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span
                    style={{
                      fontFamily:    'var(--font-display)',
                      fontSize:      'var(--size-h3)',
                      fontWeight:    'var(--font-weight-display)',
                      letterSpacing: 'var(--tracking-stat)',
                      color:         'var(--color-text-primary)',
                      lineHeight:    'normal',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontFamily:    'var(--font-body)',
                      fontSize:      'var(--size-label)',
                      fontWeight:    'var(--font-weight-body)',
                      letterSpacing: 'var(--tracking-eyebrow-sm)',
                      textTransform: 'uppercase',
                      color:         'var(--color-text-secondary)',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={m.slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={m.vp}
            style={{ position: 'relative' }}
          >
            {!isMobile && (
              <div
                style={{
                  position:        'absolute',
                  width:           '177px',
                  height:          '177px',
                  borderRadius:    '50%',
                  backgroundColor: 'var(--color-bg-accent)',
                  top:             '-40px',
                  left:            '-40px',
                  zIndex:          0,
                }}
              />
            )}
            <div
              style={{
                position:           'relative',
                zIndex:             1,
                height:             isMobile ? '280px' : '700px',
                backgroundImage:    'url(/vibe/community.png)',
                backgroundSize:     'cover',
                backgroundPosition: 'top center',
              }}
            />
          </motion.div>

        </div>
      </SectionWrapper>

      {/* ── AMENITIES ────────────────────────────────────────── */}
      <SectionWrapper className="max-sm:!px-6 max-sm:!py-12">
        <motion.div
          variants={m.stagger}
          initial="hidden"
          whileInView="visible"
          viewport={m.vp}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}
        >
          <motion.div variants={m.fadeUp} style={{ display: 'flex' }}>
            <WordBlock word="Amenities" corners={{ tl: true }} size="h1" />
          </motion.div>
          <motion.span
            variants={m.fadeUp}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--size-body-lg)',
              fontWeight: 'var(--font-weight-body)',
              color:      'var(--color-text-secondary)',
            }}
          >
            We have everything you need
          </motion.span>
        </motion.div>

        <motion.div
          variants={m.staggerDelayed}
          initial="hidden"
          whileInView="visible"
          viewport={m.vp}
          style={{
            display:             'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            borderTop:           '1px solid var(--color-border-subtle)',
          }}
        >
          {amenitiesList.map((label) => (
            <motion.div
              key={label}
              variants={m.fadeUp}
              style={{
                padding:      '24px 40px 24px 0',
                borderBottom: '1px solid var(--color-border-subtle)',
              }}
            >
              <span
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      'var(--size-label)',
                  fontWeight:    'var(--font-weight-body)',
                  color:         'var(--color-text-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-label)',
                }}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <Footer brand="vibe" />

    </main>
  );
}
