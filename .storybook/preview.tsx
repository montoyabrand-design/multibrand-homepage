import type { Preview, Decorator } from '@storybook/react';
import './preview-fonts.css';
import '../src/app/globals.css';
import 'remixicon/fonts/remixicon.css';

const withBrand: Decorator = (Story, context) => {
  const brand = (context.globals.brand as string) ?? 'vibe';
  return (
    <div data-brand={brand} style={{ minHeight: '100vh', background: 'var(--color-bg-page)' }}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'Brand token set',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'elyzior', title: 'Elyzior' },
          { value: 'vibe', title: 'Vibe' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    brand: 'vibe',
  },
  decorators: [withBrand],
  parameters: {
    layout: 'fullscreen',
  },
};

export default preview;
