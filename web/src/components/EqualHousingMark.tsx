type EqualHousingMarkProps = {
  className?: string;
  title: string;
};

/** Standard Equal Housing Opportunity house mark. */
export function EqualHousingMark({ className, title }: EqualHousingMarkProps) {
  return (
    <svg
      className={className ? `equal-housing-mark ${className}` : 'equal-housing-mark'}
      viewBox="0 0 64 64"
      width="40"
      height="40"
      aria-hidden={false}
      role="img"
    >
      <title>{title}</title>
      <rect x="2" y="2" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="3" />
      <path
        d="M12 34 L32 16 L52 34 V52 H12 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="miter"
      />
      <rect x="28" y="38" width="8" height="14" fill="currentColor" />
    </svg>
  );
}
