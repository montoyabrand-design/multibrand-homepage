export const elyzior = {
  colors: {
    primitive: {
      navy: { 900: '#0b183d', 950: '#03091a', 1000: '#01040c' },
      gold: { 300: '#c3a882', 500: '#ac7d4f', 700: '#693f1f' },
      neutral: { 0: '#ffffff', 50: '#f3f3f3', 200: '#c2c7d7', 500: '#636363' },
    },
    semantic: {
      background: {
        page: '#ffffff',
        surface: '#f3f3f3',
        highlight: '#f3f3f3',
        inverse: '#0b183d',
        inverseDeep: '#03091a',
        inverseDeepest: '#01040c',
      },
      text: {
        primary: '#0b183d',
        secondary: '#636363',
        muted: 'rgba(255,255,255,0.5)',
        disabled: 'rgba(11,24,61,0.3)',
        placeholder: '#636363',
        onInverse: '#ffffff',
        onInverseMuted: 'rgba(255,255,255,0.5)',
        accent: '#ac7d4f',
        accentWarm: '#c3a882',
      },
      icon: {
        primary: '#0b183d',
        secondary: '#636363',
      },
      border: {
        default: '#c2c7d7',
        accent: '#ac7d4f',
        emphasis: '#693f1f',
        emphasisSubtle: 'rgba(105,63,31,0.4)',
      },
      action: {
        primary: {
          background: '#0b183d',
          foreground: '#ffffff',
          hover: '#1a2f5a',
          disabledBackground: 'rgba(11,24,61,0.3)',
          disabledForeground: 'rgba(255,255,255,0.5)',
        },
        secondary: {
          background: '#ffffff',
          foreground: '#0b183d',
          hover: '#f3f3f3',
        },
        tertiary: {
          background: '#ffffff',
          foreground: '#01040c',
          hover: '#f3f3f3',
        },
      },
    },
  },
  typography: {
    fonts: {
      display: 'Instrument Serif',
      heading: 'Instrument Serif',
      body: 'Geist',
      label: 'Geist',
      ui: 'Libre Franklin',
    },
    sizes: {
      display: '120px', h1: '80px', h2: '72px', h3: '48px',
      h4: '36px', h5: '24px', bodyLg: '20px', body: '16px',
      bodySm: '14px', label: '14px',
    },
    tracking: {
      display: '9.6px', h1: '6.4px', h2: '8px', h3: '2px',
      body: '1px', label: '4px', nav: '1.12px',
    },
    lineHeight: {
      display: '1', h2: '72px', body: '24px', bodySm: '20px',
    },
  },
  spacing: {
    section: { vertical: '160px', horizontal: '120px', gap: '80px' },
    layout: { containerGap: '48px', cardGap: '24px' },
    component: { lg: '32px', md: '16px', sm: '8px', gapLg: '40px', gapMd: '24px', gapSm: '8px' },
  },
  radius: {
    none: '0px',
    sm: '4px',
    md: '8px',
    pill: '100px',
  },
  elevation: {
    card: '0px 8px 32px rgba(0,0,0,0.08)',
    modal: '0px 24px 48px rgba(0,0,0,0.16)',
  },
  opacity: {
    dim: 0.5,
    subtle: 0.3,
    border: 0.4,
    page: 0.1,
  },
} as const;
