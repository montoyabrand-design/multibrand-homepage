import type { Meta, StoryObj } from '@storybook/react';
import { HotelCard } from '@/components/shared/HotelCard';

const meta: Meta<typeof HotelCard> = {
  title: 'Shared/HotelCard',
  component: HotelCard,
  argTypes: {
    brand: { control: 'select', options: ['elyzior', 'vibe'] },

    // Vibe-only controls — hidden when brand is elyzior
    price:        { control: { type: 'number' },             if: { arg: 'brand', eq: 'vibe' } },
    currency:     { control: 'text',                         if: { arg: 'brand', eq: 'vibe' } },
    country:      { control: 'text',                         if: { arg: 'brand', eq: 'vibe' } },
    amenities:    { control: 'object',                       if: { arg: 'brand', eq: 'vibe' } },
    maxAmenities: { control: { type: 'range', min: 1, max: 6 }, if: { arg: 'brand', eq: 'vibe' } },
    badge:        { control: 'text',                         if: { arg: 'brand', eq: 'vibe' } },
    ctaLabel:     { control: 'text',                         if: { arg: 'brand', eq: 'vibe' } },
    href:         { control: 'text',                         if: { arg: 'brand', eq: 'vibe' } },

    // Elyzior-only controls — hidden when brand is vibe
    description:  { control: 'text',                         if: { arg: 'brand', eq: 'elyzior' } },

    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof HotelCard>;

// ── Playground ────────────────────────────────────────────────────────────────
// Switch brand to see relevant controls appear/disappear automatically.
// Clear price → no price overlay. Clear ctaLabel → no CTA. Set amenities: [] → no grid.

export const Playground: Story = {
  decorators: [
    (Story, { args }) => (
      <div data-brand={args.brand} style={{ padding: '48px', maxWidth: '420px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    brand:        'vibe',
    city:         'Lisbon',
    imageUrl:     '/vibe/lisbon.png',
    country:      'Portugal',
    price:        49,
    currency:     '$',
    badge:        'POPULAR',
    amenities:    [
      { label: 'Coworking', value: 'Included' },
      { label: 'Events',    value: 'Weekly'   },
      { label: 'Breakfast', value: 'Included' },
    ],
    maxAmenities: 3,
    ctaLabel:     'View stay',
  },
};

// ── Curated: Vibe ─────────────────────────────────────────────────────────────

export const Vibe: Story = {
  decorators: [
    (Story) => (
      <div data-brand="vibe" style={{ padding: '48px', maxWidth: '420px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    brand:     'vibe',
    city:      'Madrid',
    country:   'Spain',
    price:     59,
    currency:  '$',
    imageUrl:  '/vibe/madrid.png',
    amenities: [
      { label: 'Coworking', value: 'Available' },
      { label: 'Events',    value: 'Weekly'    },
      { label: 'Breakfast', value: 'Extra'     },
    ],
    ctaLabel: 'View stay',
  },
};

// ── Curated: Elyzior ──────────────────────────────────────────────────────────

export const Elyzior: Story = {
  decorators: [
    (Story) => (
      <div data-brand="elyzior" style={{ padding: '48px', maxWidth: '420px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    brand:       'elyzior',
    city:        'Monaco',
    description: "Monaco's elegance redefined, a modern palace of luxury in the heart of the Riviera.",
    imageUrl:    '/elyzior/monaco-hotel.png',
  },
};

// ── Comparison ────────────────────────────────────────────────────────────────

export const Comparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', padding: '48px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div data-brand="vibe">
        <HotelCard
          brand="vibe"
          city="Lisbon"
          country="Portugal"
          price={49}
          imageUrl="/vibe/lisbon.png"
          badge="POPULAR"
          amenities={[
            { label: 'Coworking', value: 'Included' },
            { label: 'Events',    value: 'Weekly'   },
            { label: 'Breakfast', value: 'Included' },
          ]}
          ctaLabel="View stay"
        />
      </div>
      <div data-brand="elyzior">
        <HotelCard
          brand="elyzior"
          city="Paris"
          description="Nestled along the Seine, a timeless Parisian escape where art de vivre is woven into every detail."
          imageUrl="/elyzior/paris-hotel.png"
        />
      </div>
    </div>
  ),
};
