type ButtonProps = {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className,
}: ButtonProps) {
  const padding = size === 'md' ? '20px 32px' : '12px 16px';
  const fontSize = size === 'md' ? 'var(--size-body-sm)' : 'var(--size-label)';

  return (
    <button
      className={className}
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        gap:             '8px',
        padding,
        backgroundColor: variant === 'primary'
          ? 'var(--color-action-primary-bg)'
          : 'var(--color-action-secondary-bg)',
        color: variant === 'primary'
          ? 'var(--color-action-primary-fg)'
          : 'var(--color-action-secondary-fg)',
        border: variant === 'secondary'
          ? '1px solid var(--color-border-default)'
          : 'none',
        borderRadius:  'var(--radius-none)',
        fontFamily:    'var(--font-ui)',
        fontSize,
        fontWeight:    'var(--font-weight-ui)',
        letterSpacing: 'var(--tracking-button)',
        textTransform: 'uppercase',
        cursor:        'pointer',
        whiteSpace:    'nowrap',
        lineHeight:    'normal',
      }}
    >
      {children}
      {icon}
    </button>
  );
}
