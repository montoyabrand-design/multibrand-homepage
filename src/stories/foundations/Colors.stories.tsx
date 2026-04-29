import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useEffect, useState } from 'react';

function ColorSwatch({ variable, label }: { variable: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [resolved, setResolved] = useState('');

  useEffect(() => {
    if (ref.current) {
      setResolved(getComputedStyle(ref.current).getPropertyValue(variable).trim());
    }
  }, [variable]);

  const isEmpty = !resolved;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '8px 0' }}>
      <div
        ref={ref}
        style={{
          width: '48px',
          height: '48px',
          flexShrink: 0,
          backgroundColor: isEmpty ? 'transparent' : `var(${variable})`,
          border: '1px solid rgba(0,0,0,0.12)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          color: '#999',
        }}
      >
        {isEmpty ? '—' : null}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 600, color: '#111' }}>{label}</span>
        <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#888' }}>{variable}</span>
        <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#888' }}>{resolved || '—'}</span>
      </div>
    </div>
  );
}

function ColorGroup({ title, tokens }: { title: string; tokens: { label: string; variable: string }[] }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <h3 style={{ fontFamily: 'sans-serif', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#888', margin: '0 0 16px' }}>
        {title}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '4px' }}>
        {tokens.map((t) => (
          <ColorSwatch key={t.variable} {...t} />
        ))}
      </div>
    </div>
  );
}

function ColorsPage() {
  return (
    <div style={{ padding: '48px', fontFamily: 'sans-serif', maxWidth: '1200px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px', color: '#111' }}>Colors</h1>
      <p style={{ color: '#888', margin: '0 0 48px', fontSize: '14px' }}>
        Switch brand in the toolbar ↑ to compare token sets. Tokens absent in a brand show —.
      </p>
      <ColorGroup title="Backgrounds" tokens={[
        { label: 'Page',            variable: '--color-bg-page' },
        { label: 'Surface',         variable: '--color-bg-surface' },
        { label: 'Subtle',          variable: '--color-bg-subtle' },
        { label: 'Accent',          variable: '--color-bg-accent' },
        { label: 'Inverse',         variable: '--color-bg-inverse' },
        { label: 'Inverse Deep',    variable: '--color-bg-inverse-deep' },
        { label: 'Inverse Deepest', variable: '--color-bg-inverse-deepest' },
      ]} />
      <ColorGroup title="Text" tokens={[
        { label: 'Primary',         variable: '--color-text-primary' },
        { label: 'Secondary',       variable: '--color-text-secondary' },
        { label: 'On Inverse',      variable: '--color-text-on-inverse' },
        { label: 'Accent',          variable: '--color-text-accent' },
        { label: 'Accent Warm',     variable: '--color-text-accent-warm' },
      ]} />
      <ColorGroup title="Borders" tokens={[
        { label: 'Default',         variable: '--color-border-default' },
        { label: 'Subtle',          variable: '--color-border-subtle' },
        { label: 'Accent',          variable: '--color-border-accent' },
      ]} />
      <ColorGroup title="Actions" tokens={[
        { label: 'Primary BG',      variable: '--color-action-primary-bg' },
        { label: 'Primary FG',      variable: '--color-action-primary-fg' },
        { label: 'Secondary BG',    variable: '--color-action-secondary-bg' },
        { label: 'Secondary FG',    variable: '--color-action-secondary-fg' },
      ]} />
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Colors',
  component: ColorsPage,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AllColors: Story = {};
