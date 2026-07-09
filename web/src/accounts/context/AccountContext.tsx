import {
  AccountsError,
  AccountsErrorCode,
  AccountsProvider,
  useAccountsSession,
} from '@emersonary/appkit-accounts';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { spencerTingAccountClient } from '../connect/spencerTingAccountClient';

type Account = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  isAdmin?: boolean;
};

type AccountContextValue = {
  account: Account | null;
  accountEmail: string | null;
  hasAccount: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName?: string) => Promise<{ verificationRequired: boolean; email: string }>;
  logout: () => Promise<void>;
  completeOAuthLogin: (accessToken: string) => Promise<void>;
  lastErrorKey: string | null;
  clearError: () => void;
  handleAccountError: (err: unknown) => void;
};

const AccountContext = createContext<AccountContextValue | null>(null);

function accountsErrorI18nKey(code: AccountsErrorCode): string {
  switch (code) {
    case AccountsErrorCode.INVALID_ARGUMENT:
      return 'account.errors.invalidInput';
    case AccountsErrorCode.UNAUTHENTICATED:
      return 'account.errors.invalidCredentials';
    case AccountsErrorCode.ALREADY_EXISTS:
      return 'account.errors.emailInUse';
    case AccountsErrorCode.PERMISSION_DENIED:
      return 'account.errors.permissionDenied';
    case AccountsErrorCode.UNAVAILABLE:
      return 'account.errors.unavailable';
    case AccountsErrorCode.EMAIL_NOT_VERIFIED:
      return 'account.errors.emailNotVerified';
    default:
      return 'account.errors.generic';
  }
}

function SpencerTingAccountState({ children }: { children: ReactNode }) {
  const accounts = useAccountsSession();
  const [lastErrorKey, setLastErrorKey] = useState<string | null>(null);

  const handleAccountError = useCallback((err: unknown) => {
    if (err instanceof AccountsError) {
      setLastErrorKey(accountsErrorI18nKey(err.code));
    } else {
      setLastErrorKey('account.errors.generic');
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setLastErrorKey(null);
      try {
        await accounts.login(email, password);
      } catch (err) {
        handleAccountError(err);
        throw err;
      }
    },
    [accounts, handleAccountError],
  );

  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName?: string) => {
      setLastErrorKey(null);
      try {
        return await accounts.register(email, password, firstName, lastName);
      } catch (err) {
        handleAccountError(err);
        throw err;
      }
    },
    [accounts, handleAccountError],
  );

  const logout = useCallback(async () => {
    setLastErrorKey(null);
    await accounts.logout();
  }, [accounts]);

  const completeOAuthLogin = useCallback(
    async (accessToken: string) => {
      setLastErrorKey(null);
      try {
        await accounts.completeOAuthLogin(accessToken);
      } catch (err) {
        handleAccountError(err);
        throw err;
      }
    },
    [accounts, handleAccountError],
  );

  const clearError = useCallback(() => setLastErrorKey(null), []);
  const account = accounts.account as Account | null;

  const value = useMemo(
    () => ({
      account,
      accountEmail: account?.email ?? null,
      hasAccount: accounts.hasAccount,
      isAdmin: account?.isAdmin ?? false,
      isLoading: accounts.isLoading,
      isInitialized: accounts.isInitialized,
      login,
      register,
      logout,
      completeOAuthLogin,
      lastErrorKey,
      clearError,
      handleAccountError,
    }),
    [
      account,
      accounts.hasAccount,
      accounts.isLoading,
      accounts.isInitialized,
      login,
      register,
      logout,
      completeOAuthLogin,
      lastErrorKey,
      clearError,
      handleAccountError,
    ],
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function AccountProvider({ children }: { children: ReactNode }) {
  return (
    <AccountsProvider tenancy={{ enabled: false }} accountClient={spencerTingAccountClient}>
      <SpencerTingAccountState>{children}</SpencerTingAccountState>
    </AccountsProvider>
  );
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error('useAccount must be used within AccountProvider');
  return ctx;
}
