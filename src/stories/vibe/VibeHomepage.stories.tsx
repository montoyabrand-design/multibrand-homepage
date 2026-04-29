import type { Meta, StoryObj } from '@storybook/react';
import { VibeHomepage } from '@/components/vibe/VibeHomepage';

const meta: Meta<typeof VibeHomepage> = {
  title: 'Vibe/Homepage',
  component: VibeHomepage,
  decorators: [
    (Story) => (
      <div data-brand="vibe">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof VibeHomepage>;

export const FirstTime: Story = {
  args: { userType: 'first-time' },
};

export const Loyalty: Story = {
  args: { userType: 'loyalty' },
};
