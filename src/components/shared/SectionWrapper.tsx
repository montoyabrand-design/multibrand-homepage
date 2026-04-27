type SectionWrapperProps = {
  inverse?: boolean;
  children: React.ReactNode;
  className?: string;
  as?: 'section' | 'div' | 'footer' | 'header';
};

export function SectionWrapper({
  inverse = false,
  children,
  className,
  as: Tag = 'section',
}: SectionWrapperProps) {
  return (
    <Tag
      className={className}
      style={{
        paddingTop:      'var(--section-v)',
        paddingBottom:   'var(--section-v)',
        paddingLeft:     'var(--section-h)',
        paddingRight:    'var(--section-h)',
        backgroundColor: inverse ? 'var(--color-bg-inverse)' : 'var(--color-bg-page)',
        color:           inverse ? 'var(--color-text-on-inverse)' : 'var(--color-text-primary)',
      }}
    >
      {children}
    </Tag>
  );
}
