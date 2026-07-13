import { useTranslation } from 'react-i18next';

type BrandWordmarkProps = {
  className?: string;
};

/** Renders "Spencer Ting" with the last name in gold. */
export function BrandWordmark({ className }: BrandWordmarkProps) {
  const { t } = useTranslation();
  const name = t('brand.name').trim();
  const parts = name.split(/\s+/);

  if (parts.length < 2) {
    return <span className={className}>{name}</span>;
  }

  const lastName = parts.pop()!;
  const firstName = parts.join(' ');

  return (
    <span className={className}>
      {firstName} <span className="brand-lastname">{lastName}</span>
    </span>
  );
}
