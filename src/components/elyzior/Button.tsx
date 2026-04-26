'use client';

import { useState } from 'react';

interface ButtonProps {
  hierarchy?: 'primary' | 'secondary' | 'tertiary';
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

const sizeStyles: Record<NonNullable<ButtonProps['size']>, { padding: string; fontSize: string; tracking: string }> = {
  large:  { padding: '20px 40px', fontSize: '14px', tracking: '2px' },
  medium: { padding: '16px 32px', fontSize: '14px', tracking: '1.92px' },
  small:  { padding: '12px 24px', fontSize: '12px', tracking: '1.5px' },
};

const hierarchyBase: Record<NonNullable<ButtonProps['hierarchy']>, { bg: string; fg: string; border?: string; hoverBg: string }> = {
  primary:   { bg: 'var(--color-action-primary-bg)',   fg: 'var(--color-action-primary-fg)',   hoverBg: 'var(--color-action-primary-hover)' },
  secondary: { bg: 'transparent',                      fg: 'var(--color-action-secondary-fg)', hoverBg: 'var(--color-action-secondary-hover)', border: '1px solid var(--color-action-primary-bg)' },
  tertiary:  { bg: 'var(--color-action-tertiary-bg)',  fg: 'var(--color-action-tertiary-fg)',  hoverBg: 'var(--color-action-tertiary-hover)' },
};

export function Button({
  hierarchy = 'primary',
  size = 'medium',
  disabled = false,
  children,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);
  const { padding, fontSize, tracking } = sizeStyles[size];
  const { bg, fg, border, hoverBg } = hierarchyBase[hierarchy];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`transition-colors duration-200 ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''} ${className}`}
      style={{
        padding,
        fontSize,
        letterSpacing: tracking,
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        borderRadius: 'var(--radius-pill)',
        backgroundColor: hovered && !disabled ? hoverBg : bg,
        color: fg,
        border: border ?? 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {children}
    </button>
  );
}
