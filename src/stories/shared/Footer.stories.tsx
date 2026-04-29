import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '@/components/shared/Footer';

const meta: Meta<typeof Footer> = {
  title: 'Shared/Footer',
  component: Footer,
  argTypes: {
    brand: { control: 'select', options: ['elyzior', 'vibe'] },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  decorators: [
    (Story, { args }) => (
      <div data-brand={args.brand}>
        <Story />
      </div>
    ),
  ],
  args: {
    brand: 'vibe',
  },
};

// ── Curated: Elyzior ──────────────────────────────────────────────────────────

export const ElyziorExample: Story = {
  decorators: [
    (Story) => (
      <div data-brand="elyzior">
        <Story />
      </div>
    ),
  ],
  render: () => <Footer brand="elyzior" />,
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
  render: () => <Footer brand="vibe" />,
};

// ── Comparison ────────────────────────────────────────────────────────────────

export const Comparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <div data-brand="elyzior">
        <Footer brand="elyzior" />
      </div>
      <div data-brand="vibe">
        <Footer brand="vibe" />
      </div>
    </div>
  ),
};
