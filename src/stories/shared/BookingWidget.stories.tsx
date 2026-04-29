import type { Meta, StoryObj } from '@storybook/react';
import { BookingWidget } from '@/components/shared/BookingWidget';

const meta: Meta<typeof BookingWidget> = {
  title: 'Shared/BookingWidget',
  component: BookingWidget,
  argTypes: {
    brand: { control: 'select', options: ['elyzior', 'vibe'] },
  },
};

export default meta;
type Story = StoryObj<typeof BookingWidget>;

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
  render: () => <BookingWidget brand="elyzior" />,
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
  render: () => <BookingWidget brand="vibe" />,
};

// ── Comparison ────────────────────────────────────────────────────────────────

export const Comparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div data-brand="elyzior">
        <BookingWidget brand="elyzior" />
      </div>
      <div data-brand="vibe">
        <BookingWidget brand="vibe" />
      </div>
    </div>
  ),
};
