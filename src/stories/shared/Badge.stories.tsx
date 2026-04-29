import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/shared/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Shared/Badge',
  component: Badge,
  decorators: [
    (Story) => (
      <div style={{ padding: '48px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: 'NEW' },
};

export const Popular: Story = {
  args: { children: 'POPULAR' },
};
