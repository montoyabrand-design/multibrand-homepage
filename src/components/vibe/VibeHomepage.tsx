import type { UserType } from '@/tokens';
import { HotelCard, type HotelCardProps } from '@/components/shared/HotelCard';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { Button } from '@/components/shared/Button';
import { Badge } from '@/components/shared/Badge';

/* ── DATA ─────────────────────────────────────────────────── */

const hotels: (HotelCardProps & { id: string })[] = [
  {
    id: 'lisbon',
    city: 'Lisbon',
    country: 'Portugal',
    price: 49,
    imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5702?w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1583622451288-24819b098f08?w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1545060894-6e1dd6a1c15f?w=800&q=80',
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
  const fontSize    = size === 'display' ? 'var(--size-display)' : 'var(--size-h1)';
  const lineHeight  = size === 'display' ? 'var(--line-height-display)' : 'var(--line-height-h1)';
  const tracking    = size === 'display' ? 'var(--tracking-display)' : 'var(--tracking-h1)';
  const radius      = `${corners.tl ? 'var(--radius-md)' : '0'} ${corners.tr ? 'var(--radius-md)' : '0'} ${corners.br ? 'var(--radius-md)' : '0'} ${corners.bl ? 'var(--radius-lg)' : '0'}`;

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
          whiteSpace:    'nowrap',
        }}
      >
        {word}
      </span>
    </div>
  );
}

/* ── COMPONENT ─────────────────────────────────────────────── */

export function VibeHomepage({ userType }: { userType: UserType }) {
  const isLoyalty = userType === 'loyalty';

  return (
    <main style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', backgroundColor: 'var(--color-bg-page)' }}>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        style={{
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          padding:         '20px 48px',
          backgroundColor: 'var(--color-bg-page)',
          borderBottom:    '1px solid var(--color-border-default)',
        }}
      >
        <span
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      '20px',
            fontWeight:    'var(--font-weight-display)',
            letterSpacing: '1px',
            color:         'var(--color-text-primary)',
          }}
        >
          VIBE
        </span>

        <div style={{ display: 'flex', gap: '0', alignItems: 'center' }}>
          {['CITIES', 'WHY VIBE', 'COMMUNITY', 'AMMENITIES'].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      'var(--size-body-sm)',
                fontWeight:    'var(--font-weight-body)',
                letterSpacing: 'var(--tracking-nav)',
                color:         'var(--color-text-primary)',
                padding:       '8px 16px',
                textDecoration:'none',
              }}
            >
              {item}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {isLoyalty && (
            <Badge>★ 2,450 PTS</Badge>
          )}
          <Button variant="secondary" size="sm" icon={<span>→</span>}>
            Book a room
          </Button>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          display:         'flex',
          gap:             '48px',
          alignItems:      'center',
          paddingTop:      '80px',
          paddingBottom:   '40px',
          paddingLeft:     '48px',
          paddingRight:    '48px',
          backgroundColor: 'var(--color-bg-page)',
        }}
      >
        <div
          style={{
            flex:          1,
            display:       'flex',
            flexDirection: 'column',
            gap:           '48px',
            paddingBottom: '64px',
          }}
        >
          <span
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'var(--size-body)',
              fontWeight:    'var(--font-weight-subheading)',
              letterSpacing: 'var(--tracking-eyebrow)',
              color:         'var(--color-text-secondary)',
            }}
          >
            {isLoyalty
              ? '★ 2,450 POINTS — ENOUGH FOR A FREE NIGHT!'
              : '15 CITIES · URBAN STYLE · EST. 2024'}
          </span>

          <div>
            {isLoyalty ? (
              <div>
                <div style={{ display: 'flex', marginBottom: '-2px' }}>
                  <WordBlock word="Welcome" corners={{ tl: true }} />
                  <WordBlock word="back," corners={{ tr: true }} />
                </div>
                <div style={{ display: 'flex' }}>
                  <WordBlock word="Alex" corners={{ bl: true }} />
                </div>
              </div>
            ) : (
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
            )}
          </div>

          <p
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
            {isLoyalty
              ? 'Your next stay in Berlin is 3 days away. Ready to explore more?'
              : <>Everything you need. Nothing you don&apos;t.<br />Affordable stays in top locations, ready when you are.</>}
          </p>

          <Button variant="secondary" size="md" className="self-start">
            {isLoyalty ? 'Manage my stays' : 'Find your stay'}
          </Button>
        </div>

        <div
          style={{
            width:    '709px',
            height:   '808px',
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width:               '100%',
              height:              '100%',
              backgroundImage:     'url(https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80)',
              backgroundSize:      'cover',
              backgroundPosition:  'center',
            }}
          />
          <div
            style={{
              position:   'absolute',
              inset:      0,
              background: 'linear-gradient(to bottom, rgba(26,26,24,0.9) 0%, rgba(102,102,102,0) 27%)',
            }}
          />
          <div
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
            <span
              style={{
                fontFamily:  'var(--font-display)',
                fontSize:    'var(--size-h5)',
                fontWeight:  'var(--font-weight-subheading)',
                color:       'var(--color-text-on-inverse)',
              }}
            >
              BUENOS AIRES,
            </span>
            <span
              style={{
                fontFamily:  'var(--font-body)',
                fontSize:    'var(--size-body)',
                fontWeight:  'var(--font-weight-body)',
                color:       'var(--color-text-on-inverse)',
              }}
            >
              Santelmo Area
            </span>
          </div>
          <div
            style={{
              position:        'absolute',
              bottom:          '120px',
              left:            '-16px',
              backgroundColor: 'var(--color-bg-accent)',
              padding:         '24px 32px',
              borderTopRightRadius: 'var(--radius-md)',
              display:         'flex',
              flexDirection:   'column',
              gap:             '4px',
              color:           'var(--color-text-primary)',
            }}
          >
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body)', lineHeight: 'var(--line-height-body)' }}>From</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--size-h2)', fontWeight: 'var(--font-weight-display)', letterSpacing: '-2px' }}>$49</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body)', lineHeight: 'var(--line-height-body)' }}>/night</span>
          </div>
          <div style={{ position: 'absolute', bottom: '120px', left: '145px' }}>
            <Button variant="primary" size="md" icon={<span>→</span>}>
              Book now
            </Button>
          </div>
        </div>
      </section>

      {/* ── EXPLORE CITIES ──────────────────────────────────── */}
      <div
        style={{
          paddingTop:      'var(--section-v)',
          paddingBottom:   'var(--section-v)',
          paddingLeft:     'var(--section-h)',
          paddingRight:    'var(--section-h)',
          backgroundColor: '#f3f3f1',
        }}
      >
        <div style={{ display: 'flex', marginBottom: '40px' }}>
          <WordBlock word="Explore" corners={{ tl: true }} size="h1" />
          <WordBlock word={isLoyalty ? 'Your Stays' : 'Cities'} corners={{ br: true }} size="h1" />
        </div>

        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 'var(--card-gap)',
          }}
        >
          {hotels.map(({ id, ...cardProps }) => (
            <HotelCard key={id} {...cardProps} />
          ))}
        </div>

        <div
          style={{
            display:        'flex',
            justifyContent: 'center',
            paddingTop:     '32px',
          }}
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
            DISCOVER MORE CITIES <span>→</span>
          </a>
        </div>
      </div>

      {/* ── BOOK DIRECT & SKIP EXTRAS ───────────────────────── */}
      <SectionWrapper inverse>
        <div
          style={{
            display:  'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:      '80px',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', marginBottom: '-2px' }}>
                <div
                  style={{
                    border:       '2px solid var(--color-text-on-inverse)',
                    borderRadius: `var(--radius-md) 0 0 0`,
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
                    }}
                  >
                    Book Direct
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    border:       '2px solid var(--color-text-on-inverse)',
                    borderRadius: `0 0 0 var(--radius-lg)`,
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
                    }}
                  >
                    & Skip Extras
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              'Best price guaranteed — always',
              'Free cancellation on all stays',
              'No booking fees, ever',
            ].map((item) => (
              <div
                key={item}
                style={{
                  display:     'flex',
                  alignItems:  'center',
                  gap:         '12px',
                  fontFamily:  'var(--font-body)',
                  fontSize:    'var(--size-body-lg)',
                  fontWeight:  'var(--font-weight-body)',
                  lineHeight:  'var(--line-height-body-lg)',
                  color:       'var(--color-text-on-inverse)',
                }}
              >
                <span style={{ color: 'var(--color-text-accent)', flexShrink: 0 }}>✓</span>
                {item}
              </div>
            ))}
            <div style={{ paddingTop: '8px' }}>
              <Button variant="secondary" size="md">
                Book now
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── WHERE COMFORT MEETS COMMUNITY ───────────────────── */}
      <SectionWrapper>
        <div
          style={{
            display:     'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:         '80px',
            alignItems:  'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {['Where Comfort', 'Meets', 'Community'].map((line, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily:    'var(--font-display)',
                      fontSize:      'var(--size-h1)',
                      fontWeight:    'var(--font-weight-display)',
                      lineHeight:    'var(--line-height-h1)',
                      letterSpacing: 'var(--tracking-h1)',
                      color:         'var(--color-text-primary)',
                      display:       'block',
                    }}
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>
            <p
              style={{
                fontFamily:  'var(--font-body)',
                fontSize:    'var(--size-body-lg)',
                fontWeight:  'var(--font-weight-body)',
                lineHeight:  'var(--line-height-body-lg)',
                color:       'var(--color-text-secondary)',
                margin:      0,
              }}
            >
              More than a place to sleep — a place to connect, explore, and feel at home wherever you go.
            </p>
            <a
              href="#"
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      'var(--size-body-sm)',
                fontWeight:    'var(--font-weight-label)',
                letterSpacing: 'var(--tracking-eyebrow)',
                color:         'var(--color-text-primary)',
                textDecoration:'none',
              }}
            >
              LEARN MORE →
            </a>
          </div>

          <div
            style={{
              height:             '560px',
              backgroundImage:    'url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80)',
              backgroundSize:     'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      </SectionWrapper>

      {/* ── AMENITIES ────────────────────────────────────────── */}
      <SectionWrapper>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
          <div style={{ display: 'flex' }}>
            <WordBlock word="Amenities" corners={{ tl: true }} size="h1" />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--size-body-lg)',
              fontWeight: 'var(--font-weight-body)',
              color:      'var(--color-text-secondary)',
            }}
          >
            We have everything you need
          </span>
        </div>

        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop:           '1px solid var(--color-border-subtle)',
          }}
        >
          {amenitiesList.map((label) => (
            <div
              key={label}
              style={{
                padding:     '24px 40px 24px 0',
                borderBottom:'1px solid var(--color-border-subtle)',
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
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer
        style={{
          display:         'flex',
          flexDirection:   'column',
          padding:         '65px 48px 32px',
          backgroundColor: 'var(--color-bg-inverse-deepest)',
        }}
      >
        {/* Top row: wordmark + nav columns */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '48px' }}>
          {/* Wordmark */}
          <span
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      '112px',
              fontWeight:    'var(--font-weight-display)',
              letterSpacing: '-4px',
              lineHeight:    1,
              color:         'var(--color-bg-inverse)',
            }}
          >
            VIBE
          </span>

          {/* Link columns */}
          <div style={{ display: 'flex', gap: '120px' }}>
            {[
              {
                heading: 'CITIES',
                links: ['São Paulo', 'New York', 'CDMX', 'Madrid', 'Medellín'],
              },
              {
                heading: 'STAY',
                links: ['Rooms', 'Coworking', 'Events', 'Long stays'],
              },
              {
                heading: 'COMPANY',
                links: ['About', 'Careers', 'Press', 'Contact'],
              },
            ].map((col) => (
              <div key={col.heading} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span
                  style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      '10px',
                    fontWeight:    'var(--font-weight-ui)',
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    color:         'var(--color-text-secondary)',
                  }}
                >
                  {col.heading}
                </span>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontFamily:    'var(--font-body)',
                      fontSize:      'var(--size-body-sm)',
                      fontWeight:    'var(--font-weight-body)',
                      color:         'var(--color-text-on-inverse)',
                      textDecoration:'none',
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop:      '1px solid var(--color-border-accent)',
            paddingTop:     '25px',
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
          }}
        >
          {['© 2026 VIBE HOTELS', 'BY Skyline HOTELS'].map((text) => (
            <span
              key={text}
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      'var(--size-label)',
                fontWeight:    'var(--font-weight-body)',
                letterSpacing: 'var(--tracking-label)',
                textTransform: 'uppercase',
                color:         'var(--color-text-secondary)',
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </footer>

    </main>
  );
}
