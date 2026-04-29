import type { Meta, StoryObj } from '@storybook/react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';

const meta: Meta<typeof SectionWrapper> = {
  title: 'Shared/SectionWrapper',
  component: SectionWrapper,
  decorators: [],
};

export default meta;

type Story = StoryObj<typeof SectionWrapper>;

export const Default: Story = {
  args: {
    children: (
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body-lg)', color: 'var(--color-text-secondary)', margin: 0 }}>
        Default section — light background with standard section padding applied via CSS tokens.
      </p>
    ),
  },
};

export const Inverse: Story = {
  args: {
    inverse: true,
    children: (
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body-lg)', color: 'var(--color-text-on-inverse)', margin: 0 }}>
        Inverse section — dark background using <code>--color-bg-inverse</code> token.
      </p>
    ),
  },
};
