'use client';

import { motion } from 'framer-motion';
import { Badge } from './Badge';
import { Button } from './Button';
import { getMotion } from './motion';

export type Amenity = {
  label: string;
  value: string;
};

export type HotelCardProps = {
  brand: 'elyzior' | 'vibe';
  city: string;
  imageUrl: string;
  country?: string;
  description?: string;
  price?: number;
  currency?: string;
  amenities?: Amenity[];
  maxAmenities?: number;
  badge?: string;
  ctaLabel?: string;
  href?: string;
  onClick?: () => void;
};

export function HotelCard({
  brand,
  city,
  imageUrl,
  country,
  description,
  price,
  currency = '$',
  amenities = [],
  maxAmenities = 3,
  badge,
  ctaLabel,
  href,
  onClick,
}: HotelCardProps) {
  const isElyzior = brand === 'elyzior';
  const visibleAmenities = amenities.slice(0, maxAmenities);
  const m = getMotion(brand);

  return (
    <motion.article
      {...m.hover.card}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-bg-page)',
        boxShadow: isElyzior ? 'var(--elevation-card)' : undefined,
        overflow: 'hidden',
        ...(isElyzior && { width: '359px' }),
      }}
      className={isElyzior ? 'max-sm:w-[85vw]' : undefined}
    >
      {/* IMAGE ZONE */}
      <div style={{ position: 'relative', flexShrink: 0, overflow: 'hidden', height: '354px' }}
           className="max-sm:!h-[240px]">
        <motion.img
          src={imageUrl}
          alt={city}
          {...m.hover.image}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {price != null && (
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
            <div style={{ display: 'flex', flexDirection: 'column', color: 'var(--color-text-primary)' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body)', fontWeight: 'var(--font-weight-body)', lineHeight: 'var(--line-height-body)' }}>
                From
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 'var(--font-weight-display)', letterSpacing: '-2px', lineHeight: 'normal' }}>
                {currency}{price}
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body)', fontWeight: 'var(--font-weight-body)', lineHeight: 'var(--line-height-body)', color: 'var(--color-text-primary)', paddingBottom: '4px' }}>
              /night
            </span>
          </div>
        )}

        {badge && (
          <div style={{ position: 'absolute', top: '4px', left: '4px' }}>
            <Badge>{badge}</Badge>
          </div>
        )}
      </div>

      {/* CARD BODY */}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            className="max-sm:!text-[22px] max-sm:!leading-tight"
            style={{
              fontFamily:  isElyzior ? 'var(--font-display)' : 'var(--font-heading)',
              fontSize:    isElyzior ? 'var(--size-h3)'      : 'var(--size-h2)',
              fontWeight:  isElyzior ? undefined             : 'var(--font-weight-heading)',
              letterSpacing: isElyzior ? '0px'              : undefined,
              lineHeight:  isElyzior ? 'none'               : 'var(--line-height-display)',
              color:       'var(--color-text-primary)',
              display:     'block',
            }}
          >
            {city}
          </span>

          {country && (
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
          )}

          {description && (
            <p
              className="text-[14px] leading-5 tracking-[1.68px]"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)', margin: 0 }}
            >
              {description}
            </p>
          )}
        </div>

        {visibleAmenities.length > 0 && (
          <div
            style={{
              borderTop:           '1px solid var(--color-border-subtle)',
              display:             'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              paddingTop:          '1px',
            }}
          >
            {visibleAmenities.map((amenity) => (
              <div key={amenity.label} style={{ padding: '8px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-micro)', fontWeight: 'var(--font-weight-body)', color: 'var(--color-text-secondary)', letterSpacing: 'var(--tracking-label)' }}>
                  {amenity.label}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-label)', fontWeight: 'var(--font-weight-ui)', color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)' }}>
                  {amenity.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {ctaLabel && (
          <div style={{ paddingTop: '12px' }}>
            {href ? (
              <a href={href}>
                <Button brand={brand} variant="secondary" size="sm" icon={<i className="ri-arrow-right-line" />}>
                  {ctaLabel}
                </Button>
              </a>
            ) : (
              <Button brand={brand} variant="secondary" size="sm" icon={<i className="ri-arrow-right-line" />} onClick={onClick}>
                {ctaLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
