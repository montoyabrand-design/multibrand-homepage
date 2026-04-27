type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={className}
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        backgroundColor: 'var(--color-bg-accent)',
        color:           'var(--color-text-primary)',
        fontFamily:      'var(--font-ui)',
        fontSize:        'var(--size-label)',
        fontWeight:      'var(--font-weight-ui)',
        letterSpacing:   'var(--tracking-label)',
        textTransform:   'uppercase',
        padding:         '4px 12px',
        lineHeight:      'normal',
      }}
    >
      {children}
    </span>
  );
}
