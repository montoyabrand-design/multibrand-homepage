import type { Brand } from '@/tokens';

// ── Theme ──────────────────────────────────────────────────────────────────────

type FooterTheme = {
  padding:      string;
  logo:         { src: string; alt: string; height: string; filter?: string };
  tagline?:     string;
  columns:      { heading: string; links: string[] }[];
  columnGap:    string;
  rowPbottom:   string;
  dividerColor: string;
  heading: {
    fontFamily:    string;
    fontSize:      string;
    fontWeight:    string | number;
    letterSpacing: string;
    textTransform: 'uppercase' | 'none';
    fontStyle?:    'italic';
    color:         string;
  };
  linkSpacing:  string;
  linkGap:      string;
  copyright:    string;
  legalRight:   string;
};

function getTheme(brand: Brand): FooterTheme {
  if (brand === 'elyzior') {
    return {
      padding:    '80px 100px 40px',
      logo:       { src: '/elyzior/elizior-logo.svg', alt: 'Elyzior', height: '56px' },
      tagline:    'By Skyline Hotels',
      columns: [
        { heading: 'DESTINATIONS', links: ['New York', 'Paris', 'Milano', 'Monaco', 'Prague'] },
        { heading: 'DISCOVER',     links: ['Our Hotels', 'Accommodations', 'Gastronomy', 'Experiences', 'Events'] },
        { heading: 'ELYZIOR',      links: ['Our Story', 'Elyzior Privilege', 'Press', 'Careers'] },
        { heading: 'CONTACT',      links: ['Chat with us', 'Call us', 'Write us'] },
      ],
      columnGap:   '64px',
      rowPbottom:  '61px',
      dividerColor:'var(--color-border-emphasis)',
      heading: {
        fontFamily:    'var(--font-display)',
        fontSize:      '14px',
        fontWeight:    400,
        letterSpacing: '2px',
        textTransform: 'none',
        fontStyle:     'italic',
        color:         'var(--color-text-accent)',
      },
      linkSpacing: '1.68px',
      linkGap:     '16px',
      copyright:   '© 2026 Elyzior Hotels & Resorts. All rights reserved.',
      legalRight:  'Privacy · Terms · Cookies',
    };
  }

  return {
    padding:    '65px 48px 32px',
    logo:       { src: '/vibe/Vibe%20Logo.svg', alt: 'Vibe', height: '28px', filter: 'brightness(0) invert(1)' },
    columns: [
      { heading: 'CITIES',   links: ['São Paulo', 'New York', 'CDMX', 'Madrid', 'Medellín'] },
      { heading: 'STAY',     links: ['Rooms', 'Coworking', 'Events', 'Long stays'] },
      { heading: 'COMPANY',  links: ['About', 'Careers', 'Press', 'Contact'] },
    ],
    columnGap:   '120px',
    rowPbottom:  '48px',
    dividerColor:'var(--color-border-accent)',
    heading: {
      fontFamily:    'var(--font-body)',
      fontSize:      'var(--size-nano)',
      fontWeight:    'var(--font-weight-ui)',
      letterSpacing: 'var(--tracking-footer-label)',
      textTransform: 'uppercase',
      color:         'var(--color-text-secondary)',
    },
    linkSpacing: '0px',
    linkGap:     '10px',
    copyright:   '© 2026 VIBE HOTELS',
    legalRight:  'BY Skyline Hotels',
  };
}

// ── Component ──────────────────────────────────────────────────────────────────

export type FooterProps = {
  brand: Brand;
};

export function Footer({ brand }: FooterProps) {
  const theme = getTheme(brand);

  return (
    <footer
      className="w-full flex flex-col max-sm:!px-6 max-sm:!pt-12 max-sm:!pb-8"
      style={{ backgroundColor: 'var(--color-bg-inverse-deepest)', padding: theme.padding }}
    >
      {/* ── MAIN ROW ── */}
      <div
        className="flex items-start justify-between max-sm:flex-col max-sm:gap-10"
        style={{ paddingBottom: theme.rowPbottom, borderBottom: `1px solid ${theme.dividerColor}` }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <img
            src={theme.logo.src}
            alt={theme.logo.alt}
            style={{ height: theme.logo.height, display: 'block', objectFit: 'contain', filter: theme.logo.filter }}
          />
          {theme.tagline && (
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize:   '16px',
                letterSpacing: '0.72px',
                fontStyle:  'italic',
                color:      'var(--color-text-on-inverse)',
              }}
            >
              {theme.tagline}
            </span>
          )}
        </div>

        {/* Link columns */}
        <div
          className="max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-8 max-sm:gap-y-10 max-sm:w-full"
          style={{ display: 'flex', gap: theme.columnGap }}
        >
          {theme.columns.map((col) => (
            <div key={col.heading} style={{ display: 'flex', flexDirection: 'column', gap: theme.linkGap }}>
              <span style={{ ...theme.heading }}>{col.heading}</span>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: theme.linkGap, listStyle: 'none', margin: 0, padding: 0 }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily:     'var(--font-body)',
                        fontSize:       'var(--size-body-sm)',
                        letterSpacing:  theme.linkSpacing,
                        color:          'var(--color-text-on-inverse)',
                        textDecoration: 'none',
                        display:        'block',
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── LEGAL ROW ── */}
      <div
        className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-1"
        style={{
          paddingTop:    '25px',
          fontFamily:    'var(--font-body)',
          fontSize:      'var(--size-label)',
          letterSpacing: '0.72px',
          color:         'var(--color-border-default)',
        }}
      >
        <span>{theme.copyright}</span>
        <span>{theme.legalRight}</span>
      </div>
    </footer>
  );
}
