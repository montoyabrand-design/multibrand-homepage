import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '@/components/shared/Header';
import { HeroSection } from '@/components/elyzior/HeroSection';
import { HotelsCarousel } from '@/components/elyzior/HotelsCarousel';
import { StorySection } from '@/components/elyzior/StorySection';
import { ExperiencesSection } from '@/components/elyzior/ExperiencesSection';
import { PrivilegeSection } from '@/components/elyzior/PrivilegeSection';
import { Footer } from '@/components/shared/Footer';

const meta: Meta = {
  title: 'Elyzior',
  decorators: [
    (Story) => (
      <div data-brand="elyzior">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const NavigationFirstTime: Story = {
  name: 'Navigation / First Time',
  render: () => <Header brand="elyzior" userType="first-time" />,
};

export const NavigationLoyalty: Story = {
  name: 'Navigation / Loyalty',
  render: () => <Header brand="elyzior" userType="loyalty" />,
};

export const HeroFirstTime: Story = {
  name: 'Hero / First Time',
  render: () => <HeroSection userType="first-time" />,
};

export const HeroLoyalty: Story = {
  name: 'Hero / Loyalty',
  render: () => <HeroSection userType="loyalty" />,
};

export const HotelsFirstTime: Story = {
  name: 'Hotels Carousel / First Time',
  render: () => <HotelsCarousel userType="first-time" />,
};

export const HotelsLoyalty: Story = {
  name: 'Hotels Carousel / Loyalty',
  render: () => <HotelsCarousel userType="loyalty" />,
};

export const StorySectionAccommodations: Story = {
  name: 'Story Section / Accommodations',
  render: () => (
    <StorySection
      eyebrow="ACCOMMODATIONS"
      heading={['A Room', 'That Breathes']}
      body="Every suite is a private sanctuary, with unique design. Natural materials, curated light, and silence that restores. This is not a room you stay in. It is a room that stays with you."
      ctaLabel="DISCOVER OUR SUITES"
      imageUrl="/elyzior/accomodations.png"
      imageRight={false}
    />
  ),
};

export const StorySectionQuote: Story = {
  name: 'Story Section / Quote',
  render: () => (
    <StorySection
      eyebrow="SANTUARIO / NEW YORK BY"
      heading={['Antoine', 'Gasseau']}
      body='"An unforgettable experience. Each dish felt like a personal retreat, crafted with fresh, natural ingredients that delighted the senses."'
      ctaLabel="EXPLORE MENU"
      imageUrl="/elyzior/antoine.png"
      imageRight={true}
      quote={true}
    />
  ),
};

export const Experiences: Story = {
  name: 'Experiences Section',
  render: () => <ExperiencesSection />,
};

export const PrivilegeFirstTime: Story = {
  name: 'Privilege / First Time',
  render: () => <PrivilegeSection userType="first-time" />,
};

export const PrivilegeLoyalty: Story = {
  name: 'Privilege / Loyalty',
  render: () => <PrivilegeSection userType="loyalty" />,
};

export const FooterComponent: Story = {
  name: 'Footer',
  render: () => <Footer brand="elyzior" />,
};
