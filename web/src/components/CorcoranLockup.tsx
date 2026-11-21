import { CORCORAN_COMPANY, CORCORAN_SITE_URL } from '../compliance/corcoran';

type CorcoranLockupProps = {
  className?: string;
};

/** Linked company name. Official artwork can replace this after Ad Department markup. */
export function CorcoranLockup({ className }: CorcoranLockupProps) {
  return (
    <a
      href={CORCORAN_SITE_URL}
      className={className ? `corcoran-lockup ${className}` : 'corcoran-lockup'}
      rel="noopener noreferrer"
    >
      <span className="corcoran-lockup-name">{CORCORAN_COMPANY}</span>
    </a>
  );
}
