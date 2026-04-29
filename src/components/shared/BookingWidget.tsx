'use client';

import { motion } from 'framer-motion';
import type { Brand } from '@/tokens';
import { Button } from './Button';
import { getMotion } from './motion';

// ── Theme ──────────────────────────────────────────────────────────────────────

function getTheme(brand: Brand) {
  if (brand === 'elyzior') {
    return {
      paddingX:      '165px',
      paddingY:      '40px',
      fieldGap:      '24px',
      sectionBorder: '1px solid var(--color-action-primary-bg)',
      label: {
        fontSize:      '16px',
        fontWeight:    400,
        letterSpacing: '1.28px',
      },
      value: {
        fontSize:      '14px',
        letterSpacing: '1.68px',
      },
      ctaVariant: 'primary'  as const,
      ctaSize:    'lg'       as const,
      ctaLabel:   'Search',
    };
  }

  return {
    paddingX:      '48px',
    paddingY:      '24px',
    fieldGap:      '12px',
    sectionBorder: '1px solid var(--color-border-default)',
    label: {
      fontSize:      'var(--size-label)',
      fontWeight:    'var(--font-weight-ui)',
      letterSpacing: 'var(--tracking-button)',
    },
    value: {
      fontSize:      'var(--size-body-sm)',
      letterSpacing: '0px',
    },
    ctaVariant: 'primary'  as const,
    ctaSize:    'md'       as const,
    ctaLabel:   'Find a room',
  };
}

// ── Fields ─────────────────────────────────────────────────────────────────────

const FIELDS = [
  { key: 'location', label: 'DESTINATION', placeholder: 'Select a destination' },
  { key: 'dates',    label: 'ADD DATES',   placeholder: 'Check-in → Check-out' },
  { key: 'guests',   label: 'GUESTS',      placeholder: '2 adults, 0 children' },
];

// ── Component ──────────────────────────────────────────────────────────────────

export type BookingWidgetProps = {
  brand: Brand;
};

export function BookingWidget({ brand }: BookingWidgetProps) {
  const theme = getTheme(brand);
  const m     = getMotion(brand);

  return (
    <motion.section
      className="w-full"
      style={{
        borderBottom:    theme.sectionBorder,
        backgroundColor: 'var(--color-bg-page)',
      }}
      initial={{ opacity: 0, y: m.slightEntryY }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: m.slightEntryDuration, ease: m.ease, delay: 0.3 }}
    >
      {/* Inner container — capped at Figma's 1440px frame width */}
      <div
        className="flex items-center gap-8 w-full mx-auto max-sm:flex-col max-sm:!px-6 max-sm:!py-8"
        style={{
          maxWidth:      '1440px',
          paddingTop:    theme.paddingY,
          paddingBottom: theme.paddingY,
          paddingLeft:   theme.paddingX,
          paddingRight:  theme.paddingX,
        }}
      >

      {/* Fields */}
      <div
        className="flex flex-1 items-center max-sm:flex-col max-sm:w-full"
        style={{ gap: theme.fieldGap }}
      >
        {FIELDS.map((field) => (
          <div
            key={field.key}
            className="flex flex-1 flex-col gap-2 min-w-0 max-sm:w-full"
          >
            <span
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      theme.label.fontSize,
                fontWeight:    theme.label.fontWeight,
                letterSpacing: theme.label.letterSpacing,
                color:         'var(--color-text-primary)',
                textTransform: 'uppercase',
              }}
            >
              {field.label}
            </span>
            <div
              className="border-b flex items-center justify-between pb-2 pt-4"
              style={{ borderColor: 'var(--color-border-default)' }}
            >
              <span
                className="whitespace-nowrap overflow-hidden text-ellipsis"
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      theme.value.fontSize,
                  letterSpacing: theme.value.letterSpacing,
                  color:         'var(--color-text-secondary)',
                }}
              >
                {field.placeholder}
              </span>
              <i
                className="ri-arrow-down-s-line shrink-0"
                style={{ fontSize: '16px', color: 'var(--color-text-secondary)' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="shrink-0 max-sm:w-full max-sm:mt-2">
        <Button
          brand={brand}
          variant={theme.ctaVariant}
          size={theme.ctaSize}
          icon={<i className="ri-arrow-right-line" />}
          className="max-sm:w-full max-sm:justify-center"
        >
          {theme.ctaLabel}
        </Button>
      </div>

      </div>
    </motion.section>
  );
}
