'use client';

import { useState } from 'react';
import type { Brand } from '@/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize    = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  brand?:    Brand;
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  icon?:     React.ReactNode;
  children:  React.ReactNode;
  className?: string;
  onClick?:  () => void;
  disabled?: boolean;
  type?:     'button' | 'submit';
};

// ── Theme ──────────────────────────────────────────────────────────────────────

type VariantStyle = { bg: string; fg: string; border: string; hoverBg: string };

type ButtonTheme = {
  radius:     string;
  fontFamily: string;
  fontWeight: string | number;
  variants:   Record<ButtonVariant, VariantStyle>;
  sizes:      Record<ButtonSize, { padding: string; fontSize: string; letterSpacing: string }>;
};

function getTheme(brand: Brand): ButtonTheme {
  if (brand === 'elyzior') {
    return {
      radius:     'var(--radius-pill)',
      fontFamily: 'var(--font-ui)',
      fontWeight: 500,
      variants: {
        primary:   { bg: 'var(--color-action-primary-bg)',  fg: 'var(--color-action-primary-fg)',  border: 'none',                                    hoverBg: 'var(--color-action-primary-hover)'   },
        secondary: { bg: 'transparent',                     fg: 'var(--color-action-primary-bg)',  border: '1px solid var(--color-action-primary-bg)', hoverBg: 'var(--color-action-secondary-hover)' },
        tertiary:  { bg: 'var(--color-action-tertiary-bg)', fg: 'var(--color-action-tertiary-fg)', border: 'none',                                    hoverBg: 'var(--color-action-tertiary-hover)'  },
      },
      sizes: {
        sm: { padding: '12px 24px', fontSize: 'var(--size-label)',   letterSpacing: '1.5px'  },
        md: { padding: '16px 32px', fontSize: 'var(--size-body-sm)', letterSpacing: '1.92px' },
        lg: { padding: '20px 40px', fontSize: 'var(--size-body-sm)', letterSpacing: '2px'    },
      },
    };
  }

  return {
    radius:     'var(--radius-none)',
    fontFamily: 'var(--font-ui)',
    fontWeight: 'var(--font-weight-ui)',
    variants: {
      primary:   { bg: 'var(--color-action-primary-bg)',   fg: 'var(--color-action-primary-fg)',   border: 'none',                                 hoverBg: 'var(--color-action-primary-hover)'   },
      secondary: { bg: 'var(--color-action-secondary-bg)', fg: 'var(--color-action-secondary-fg)', border: '1px solid var(--color-border-default)', hoverBg: 'var(--color-action-secondary-hover)' },
      tertiary:  { bg: 'transparent',                      fg: 'var(--color-text-primary)',         border: 'none',                                 hoverBg: 'transparent'                         },
    },
    sizes: {
      sm: { padding: '12px 16px', fontSize: 'var(--size-label)',   letterSpacing: 'var(--tracking-button)' },
      md: { padding: '20px 32px', fontSize: 'var(--size-body-sm)', letterSpacing: 'var(--tracking-button)' },
      lg: { padding: '24px 40px', fontSize: 'var(--size-body-sm)', letterSpacing: 'var(--tracking-button)' },
    },
  };
}

// ── Component ──────────────────────────────────────────────────────────────────

export function Button({
  brand    = 'vibe',
  variant  = 'primary',
  size     = 'md',
  icon,
  children,
  className,
  onClick,
  disabled = false,
  type     = 'button',
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);
  const theme = getTheme(brand);
  const { bg, fg, border, hoverBg } = theme.variants[variant];
  const { padding, fontSize, letterSpacing } = theme.sizes[size];

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        gap:             '8px',
        padding,
        backgroundColor: hovered && !disabled ? hoverBg : bg,
        color:           fg,
        border,
        borderRadius:    theme.radius,
        fontFamily:      theme.fontFamily,
        fontSize,
        fontWeight:      theme.fontWeight,
        letterSpacing,
        textTransform:   'uppercase',
        cursor:          disabled ? 'not-allowed' : 'pointer',
        opacity:         disabled ? 0.4 : 1,
        whiteSpace:      'nowrap',
        lineHeight:      'normal',
        transition:      'background-color 200ms',
      }}
    >
      {children}
      {icon}
    </button>
  );
}
