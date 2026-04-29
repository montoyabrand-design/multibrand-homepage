import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '@/components/shared/Header';

const meta: Meta<typeof Header> = {
  title: 'Shared/Header',
  component: Header,
  argTypes: {
    brand:    { control: 'select', options: ['elyzior', 'vibe'] },
    userType: { control: 'select', options: ['first-time', 'loyalty'] },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// ── Playground ────────────────────────────────────────────────────────────────
// Switch brand to see layout, colors, and CTA change.

export const Playground: Story = {
  decorators: [
    (Story, { args }) => (
      <div data-brand={args.brand} style={{ minHeight: '120px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    brand:    'vibe',
    userType: 'first-time',
  },
};

// ── Curated: Elyzior ──────────────────────────────────────────────────────────

export const ElyziorExample: Story = {
  decorators: [
    (Story) => (
      <div
        data-brand="elyzior"
        style={{
          minHeight:       '120px',
          position:        'relative',
          backgroundColor: '#03091a',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <div style={{ marginBottom: '16px', fontFamily: 'monospace', fontSize: '11px', color: '#888', padding: '8px 16px' }}>
        first-time
      </div>
      <Header brand="elyzior" userType="first-time" />
    </>
  ),
};

// ── Curated: Vibe ─────────────────────────────────────────────────────────────

export const VibeExample: Story = {
  decorators: [
    (Story) => (
      <div data-brand="vibe">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#888', padding: '0 48px 8px' }}>first-time</div>
        <Header brand="vibe" userType="first-time" />
      </div>
      <div>
        <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#888', padding: '0 48px 8px' }}>loyalty</div>
        <Header brand="vibe" userType="loyalty" />
      </div>
    </div>
  ),
};

// ── Comparison ────────────────────────────────────────────────────────────────
// Both brands stacked — spot layout, color, and CTA differences.

export const Comparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <div data-brand="elyzior" style={{ position: 'relative', backgroundColor: '#03091a', minHeight: '88px' }}>
        <span style={{ position: 'absolute', top: 4, left: 16, fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)', zIndex: 50 }}>
          elyzior
        </span>
        <Header brand="elyzior" userType="first-time" />
      </div>
      <div data-brand="vibe" style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', top: 4, left: 16, fontFamily: 'monospace', fontSize: '10px', color: '#aaa', zIndex: 50 }}>
          vibe
        </span>
        <Header brand="vibe" userType="first-time" />
      </div>
    </div>
  ),
};
