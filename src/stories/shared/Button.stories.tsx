import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/shared/Button';

const arrow = <i className="ri-arrow-right-line" />;

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  argTypes: {
    brand:   { control: 'select', options: ['elyzior', 'vibe'] },
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary'] },
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── Playground ────────────────────────────────────────────────────────────────
// All controls live — switch brand to see radius, spacing, and color shift.

export const Playground: Story = {
  argTypes: {
    showIcon: { control: 'boolean', name: 'icon' },
  },
  decorators: [
    (Story, { args }) => (
      <div data-brand={args.brand} style={{ padding: '48px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    brand:    'vibe',
    variant:  'primary',
    size:     'md',
    children: 'Book a room',
    showIcon: false,
  } as Story['args'] & { showIcon: boolean },
  render: ({ showIcon, ...args }) => (
    <Button {...args} icon={showIcon ? arrow : undefined} />
  ),
};

// ── Curated: Elyzior ──────────────────────────────────────────────────────────

export const ElyziorExample: Story = {
  decorators: [
    (Story) => (
      <div data-brand="elyzior" style={{ padding: '48px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <Button brand="elyzior" variant="primary"   size="lg">Request an invitation</Button>
      <Button brand="elyzior" variant="secondary" size="md">Discover our suites</Button>
      <Button brand="elyzior" variant="tertiary"  size="md">View your benefits</Button>
      <Button brand="elyzior" variant="primary"   size="sm" icon={arrow}>Explore</Button>
    </>
  ),
};

// ── Curated: Vibe ─────────────────────────────────────────────────────────────

export const VibeExample: Story = {
  decorators: [
    (Story) => (
      <div data-brand="vibe" style={{ padding: '48px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <Button brand="vibe" variant="primary"   size="lg">Find your stay</Button>
      <Button brand="vibe" variant="secondary" size="md">Learn more</Button>
      <Button brand="vibe" variant="tertiary"  size="md">See all locations</Button>
      <Button brand="vibe" variant="secondary" size="sm" icon={arrow}>View stay</Button>
    </>
  ),
};

// ── Variant Comparison ────────────────────────────────────────────────────────
// Both brands × all variants × sizes — spot differences at a glance.

export const VariantComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '64px', padding: '48px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {(['elyzior', 'vibe'] as const).map((brand) => (
        <div key={brand} data-brand={brand} style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>
            {brand}
          </span>
          {(['primary', 'secondary', 'tertiary'] as const).map((variant) =>
            (['sm', 'md', 'lg'] as const).map((size) => (
              <Button key={`${variant}-${size}`} brand={brand} variant={variant} size={size}>
                {variant} / {size}
              </Button>
            ))
          )}
        </div>
      ))}
    </div>
  ),
};
