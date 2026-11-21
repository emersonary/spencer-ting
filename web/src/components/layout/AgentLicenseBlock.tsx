import { useTranslation } from 'react-i18next';
import {
  AGENT_EMAIL,
  AGENT_MAILTO,
  AGENT_MOBILE_PHONE,
  AGENT_MOBILE_TEL,
  AGENT_OFFICE_ADDRESS,
  AGENT_OFFICE_PHONE,
  AGENT_OFFICE_TEL,
} from '../../compliance/corcoran';

type AgentLicenseBlockProps = {
  className?: string;
  omitName?: boolean;
};

export function AgentLicenseBlock({ className, omitName = false }: AgentLicenseBlockProps) {
  const { t } = useTranslation();

  return (
    <address className={className ? `agent-license ${className}` : 'agent-license'}>
      {omitName ? null : <p className="agent-license-name">{t('brand.name')}</p>}
      <p>{t('brand.licenseTitle')}</p>
      <p>{AGENT_OFFICE_ADDRESS}</p>
      <p>
        <span>
          {t('brand.officePhone')}:{' '}
          <a href={AGENT_OFFICE_TEL}>{AGENT_OFFICE_PHONE}</a>
        </span>
        {' · '}
        <span>
          {t('brand.mobilePhone')}:{' '}
          <a href={AGENT_MOBILE_TEL}>{AGENT_MOBILE_PHONE}</a>
        </span>
      </p>
      <p>
        <a href={AGENT_MAILTO}>{AGENT_EMAIL}</a>
      </p>
    </address>
  );
}
