import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAccount } from '../context/AccountContext';
import type { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
  requireAccount?: boolean;
  requireAdmin?: boolean;
};

export function ProtectedRoute({ children, requireAccount, requireAdmin }: ProtectedRouteProps) {
  const { t } = useTranslation();
  const { hasAccount, isAdmin, isInitialized, isLoading } = useAccount();

  if (!isInitialized || isLoading) {
    return <div className="page-loading">{t('common.loading')}</div>;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  if (requireAccount && !hasAccount) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
