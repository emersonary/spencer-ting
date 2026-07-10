import { AccountMenu, AccountSignInIcon } from '@emersonary/appkit-accounts';
import { AppLink } from '../../components/routing/AppLink';
import { useTranslation } from 'react-i18next';
import { useAccount } from '../context/AccountContext';
import './HeaderAccountMenu.css';

export function HeaderAccountMenu() {
  const { t } = useTranslation();
  const { account, hasAccount, logout } = useAccount();

  // Sign-in icon hidden for now; show account menu only when signed in.
  if (!hasAccount) {
    return null;
  }

  return (
    <div className="header-account-menu">
      <AccountMenu
        account={
          account
            ? {
                id: account.id,
                email: account.email,
                firstName: account.firstName,
                lastName: account.lastName,
                avatarUrl: account.avatarUrl,
                isAdmin: account.isAdmin,
              }
            : null
        }
        hasAccount={hasAccount}
        onLogout={logout}
        hidePanelHeader
        labels={{
          accountMenu: t('nav.accountMenu'),
          signIn: t('common.login'),
          signOut: t('common.logOut'),
        }}
        renderSignInTrigger={(className) => (
          <AppLink
            to="/login"
            className={className}
            title={t('common.login')}
            aria-label={t('common.login')}
          >
            <AccountSignInIcon />
          </AppLink>
        )}
      />
    </div>
  );
}
