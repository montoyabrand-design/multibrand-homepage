import { Badge } from './Badge';
import { Button } from './Button';

export type Amenity = {
  label: string;
  value: string;
};

export type HotelCardProps = {
  city: string;
  country: string;
  price: number;
  imageUrl: string;
  amenities: Amenity[];
  badge?: string;
};

export function HotelCard({
  city,
  country,
  price,
  imageUrl,
  amenities,
  badge,
}: HotelCardProps) {
  return (
    <article
      style={{
        display:         'flex',
        flexDirection:   'column',
        backgroundColor: 'var(--color-bg-page)',
      }}
    >
      {/* ── IMAGE + OVERLAYS ── */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div
          style={{
            height:              '354px',
            backgroundImage:     `url(${imageUrl})`,
            backgroundSize:      'cover',
            backgroundPosition:  'center',
          }}
        />

        {/* Price overlay — bottom-left of image */}
        <div
          style={{
            position:            'absolute',
            bottom:              0,
            left:                0,
            backgroundColor:     'var(--color-bg-page)',
            borderTop:           '1px solid var(--color-border-default)',
            borderRight:         '1px solid var(--color-border-default)',
            borderTopRightRadius:'var(--radius-md)',
            padding:             '4px 20px',
            display:             'flex',
            alignItems:          'flex-end',
            gap:                 '2px',
          }}
        >
          <div
            style={{
              display:       'flex',
              flexDirection: 'column',
              color:         'var(--color-text-primary)',
            }}
          >
            <span
              style={{
                fontFamily:  'var(--font-body)',
                fontSize:    'var(--size-body)',
                fontWeight:  'var(--font-weight-body)',
                lineHeight:  'var(--line-height-body)',
              }}
            >
              From
            </span>
            <span
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      '24px',
                fontWeight:    'var(--font-weight-display)',
                letterSpacing: '-2px',
                lineHeight:    'normal',
              }}
            >
              ${price}
            </span>
          </div>
          <span
            style={{
              fontFamily:  'var(--font-body)',
              fontSize:    'var(--size-body)',
              fontWeight:  'var(--font-weight-body)',
              lineHeight:  'var(--line-height-body)',
              color:       'var(--color-text-primary)',
              paddingBottom: '4px',
            }}
          >
            /night
          </span>
        </div>

        {/* Popular badge — top-left of image */}
        {badge && (
          <div style={{ position: 'absolute', top: '4px', left: '4px' }}>
            <Badge>{badge}</Badge>
          </div>
        )}
      </div>

      {/* ── CARD BODY ── */}
      <div
        style={{
          borderTop:       '1px solid var(--color-border-default)',
          padding:         '20px',
          display:         'flex',
          flexDirection:   'column',
          gap:             '8px',
          backgroundColor: 'var(--color-bg-page)',
          flex:            1,
        }}
      >
        {/* City + country */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            style={{
              fontFamily:  'var(--font-heading)',
              fontSize:    'var(--size-h2)',
              fontWeight:  'var(--font-weight-heading)',
              lineHeight:  'var(--line-height-display)',
              color:       'var(--color-text-primary)',
              display:     'block',
            }}
          >
            {city}
          </span>
          <span
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      'var(--size-body-sm)',
              fontWeight:    'var(--font-weight-body)',
              letterSpacing: 'var(--tracking-body-sm)',
              lineHeight:    'var(--line-height-body-sm)',
              color:         'var(--color-text-secondary)',
              textTransform: 'uppercase',
            }}
          >
            {country}
          </span>
        </div>

        {/* Amenity grid */}
        {amenities.length > 0 && (
          <div
            style={{
              borderTop:           '1px solid var(--color-border-subtle)',
              display:             'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              paddingTop:          '1px',
            }}
          >
            {amenities.slice(0, 3).map((amenity) => (
              <div
                key={amenity.label}
                style={{
                  padding:       '8px 0',
                  display:       'flex',
                  flexDirection: 'column',
                  gap:           '4px',
                }}
              >
                <span
                  style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      'var(--size-micro)',
                    fontWeight:    'var(--font-weight-body)',
                    color:         'var(--color-text-secondary)',
                    letterSpacing: 'var(--tracking-label)',
                  }}
                >
                  {amenity.label}
                </span>
                <span
                  style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      'var(--size-label)',
                    fontWeight:    'var(--font-weight-ui)',
                    color:         'var(--color-text-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--tracking-label)',
                  }}
                >
                  {amenity.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={{ paddingTop: '12px' }}>
          <Button variant="secondary" size="sm" icon={<span>→</span>}>
            View stay
          </Button>
        </div>
      </div>
    </article>
  );
}
