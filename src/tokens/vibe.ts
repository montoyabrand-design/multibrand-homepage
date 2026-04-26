export const vibe = {
  colors: {
    primitive: {
      slate: { 700: '#1e2a3a', 900: '#0f1923', 950: '#080e15' },
      blue: { 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7' },
      amber: { 400: '#fbbf24' },
      neutral: { 0: '#ffffff', 50: '#f8fafc', 200: '#e2e8f0', 500: '#64748b' },
    },
    semantic: {
      background: {
        page: '#ffffff',
        surface: '#f8fafc',
        inverse: '#1e2a3a',
        inverseDeep: '#0f1923',
        inverseDeepest: '#080e15',
      },
      text: {
        primary: '#1e2a3a',
        secondary: '#64748b',
        onInverse: '#ffffff',
        onInverseMuted: 'rgba(255,255,255,0.6)',
        accent: '#0ea5e9',
        accentWarm: '#fbbf24',
      },
      border: {
        default: '#e2e8f0',
        accent: '#0ea5e9',
        emphasis: '#0284c7',
        emphasisSubtle: 'rgba(2,132,199,0.3)',
      },
      action: {
        primary: { background: '#0ea5e9', foreground: '#ffffff' },
        secondary: { background: '#ffffff', foreground: '#1e2a3a' },
        tertiary: { background: '#38bdf8', foreground: '#080e15' },
      },
    },
  },
  typography: {
    fonts: {
      display: 'Sora',
      heading: 'Sora',
      body: 'Geist',
      label: 'Geist',
      ui: 'Geist',
    },
    sizes: {
      display: '72px', h1: '64px', h2: '48px', h3: '36px',
      h4: '24px', h5: '20px', bodyLg: '16px', body: '16px',
      bodySm: '14px', label: '12px',
    },
    tracking: {
      display: '2px', h1: '1px', h2: '1px', h3: '0',
      body: '0', label: '1.12px', nav: '0',
    },
    lineHeight: {
      display: '1.1', h2: '52px', body: '24px', bodySm: '20px',
    },
  },
  spacing: {
    section: { vertical: '64px', horizontal: '80px', gap: '40px' },
    layout: { containerGap: '24px', cardGap: '16px' },
    component: { lg: '24px', md: '12px', sm: '8px', gapLg: '24px', gapMd: '16px', gapSm: '8px' },
  },
} as const;
