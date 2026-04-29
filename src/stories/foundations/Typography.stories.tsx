import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const SCALE: { token: string; weightToken: string; familyToken: string; label: string }[] = [
  { token: '--size-display',  weightToken: '--font-weight-display',    familyToken: '--font-display', label: 'Display' },
  { token: '--size-h1',       weightToken: '--font-weight-heading',     familyToken: '--font-heading', label: 'H1' },
  { token: '--size-h2',       weightToken: '--font-weight-heading',     familyToken: '--font-heading', label: 'H2' },
  { token: '--size-h3',       weightToken: '--font-weight-heading',     familyToken: '--font-heading', label: 'H3' },
  { token: '--size-h4',       weightToken: '--font-weight-heading',     familyToken: '--font-heading', label: 'H4' },
  { token: '--size-h5',       weightToken: '--font-weight-subheading',  familyToken: '--font-heading', label: 'H5' },
  { token: '--size-body-lg',  weightToken: '--font-weight-body',        familyToken: '--font-body',    label: 'Body LG' },
  { token: '--size-body',     weightToken: '--font-weight-body',        familyToken: '--font-body',    label: 'Body' },
  { token: '--size-body-sm',  weightToken: '--font-weight-body',        familyToken: '--font-body',    label: 'Body SM' },
  { token: '--size-label',    weightToken: '--font-weight-label',       familyToken: '--font-body',    label: 'Label' },
];

function TypographyPage() {
  return (
    <div style={{ padding: '48px', fontFamily: 'sans-serif', maxWidth: '1200px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px', color: '#111' }}>Typography</h1>
      <p style={{ color: '#888', margin: '0 0 48px', fontSize: '14px' }}>
        Switch brand in the toolbar ↑ to compare font families and scale.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {SCALE.map(({ token, weightToken, familyToken, label }) => (
          <div
            key={token}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              alignItems: 'center',
              gap: '32px',
              padding: '20px 0',
              borderBottom: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
              <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: '#333' }}>{label}</span>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#999' }}>{token}</span>
            </div>
            <span
              style={{
                fontFamily:  `var(${familyToken})`,
                fontSize:    `var(${token})`,
                fontWeight:  `var(${weightToken})` as React.CSSProperties['fontWeight'],
                lineHeight:  1.1,
                color:       'var(--color-text-primary)',
                overflow:    'hidden',
                whiteSpace:  'nowrap',
              }}
            >
              The quick brown fox
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Typography',
  component: TypographyPage,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TypeScale: Story = {};
