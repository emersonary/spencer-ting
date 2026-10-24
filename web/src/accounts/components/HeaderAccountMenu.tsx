import { useCallback, useState } from 'react';
import { AccountMenu, AccountSignInIcon } from '@emersonary/appkit-accounts';
import { AppLink } from '../../components/routing/AppLink';
import { useTranslation } from 'react-i18next';
import { useAccount } from '../context/AccountContext';
import { openPostsAdmin } from '../services/postsAdminLaunch';
import './HeaderAccountMenu.css';

export function HeaderAccountMenu() {
  const { t } = useTranslation();
  const { account, hasAccount, isAdmin, logout } = useAccount();
  const [adminErrorKey, setAdminErrorKey] = useState<string | null>(null);
  const [openingAdmin, setOpeningAdmin] = useState(false);

  const handleOpenAdmin = useCallback(async () => {
    setAdminErrorKey(null);
    setOpeningAdmin(true);
    try {
      const result = await openPostsAdmin();
      if (!result.ok) {
        setAdminErrorKey(result.message);
      }
    } finally {
      setOpeningAdmin(false);
    }
  }, []);

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
        renderPanelExtra={
          isAdmin
            ? (_account, close) => (
                <>
                  <button
                    type="button"
                    className="appkit-account-menu__menu-item"
                    disabled={openingAdmin}
                    onClick={() => {
                      close();
                      void handleOpenAdmin();
                    }}
                  >
                    {openingAdmin ? t('account.signingIn') : t('nav.postsManager')}
                  </button>
                  {adminErrorKey ? (
                    <p className="header-account-admin-error">{t(adminErrorKey)}</p>
                  ) : null}
                </>
              )
            : undefined
        }
      />
    </div>
  );
}
