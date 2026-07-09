import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AccountsError,
  AccountsErrorCode,
  ConnectedLoginWorkflow,
  type LoginWorkflowStep,
} from '@emersonary/appkit-accounts';
import { AppLink } from '../../components/routing/AppLink';
import { useAppNavigate } from '../../hooks/useAppNavigate';
import { useTranslation } from 'react-i18next';
import { useAccount } from '../context/AccountContext';
import { resolveApiBaseUrl } from '../../services/api/transport';

const accountClassNames = {
  card: 'card',
  form: '',
  field: 'form-group',
  label: '',
  input: '',
  error: 'alert alert-warning',
  success: 'alert alert-success',
  muted: '',
  instructions: '',
  submit: 'btn btn-primary',
  link: '',
  oauthButton: 'btn btn-outline account-google-btn',
};

function safeReturnUrl(raw: string | null): string | null {
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw);
    if (decoded.startsWith('/') && !decoded.startsWith('//')) return decoded;
  } catch {
    /* ignore malformed param */
  }
  return null;
}

type AccountWorkflowProps = {
  step: LoginWorkflowStep;
};

export function AccountWorkflow({ step: routeStep }: AccountWorkflowProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resetSuccess, setResetSuccess] = useState(false);
  const verifyEmailParam = searchParams.get('email') ?? '';
  const verifyEmailStatus = searchParams.get('verified');
  const [emailVerified, setEmailVerified] = useState(
    verifyEmailStatus === 'verified' || verifyEmailStatus === 'already',
  );
  const { login, register, isLoading, lastErrorKey, clearError, handleAccountError } = useAccount();
  const navigate = useAppNavigate();
  const { t } = useTranslation();

  const returnUrl = safeReturnUrl(searchParams.get('returnUrl'));
  const resetToken = searchParams.get('token') ?? '';

  const signStep: LoginWorkflowStep =
    routeStep === 'sign-in' || routeStep === 'sign-up'
      ? searchParams.get('mode') === 'register'
        ? 'sign-up'
        : 'sign-in'
      : routeStep;

  const verifiedStatus = searchParams.get('verified');
  const verifiedBannerKey =
    routeStep === 'sign-in' || routeStep === 'sign-up'
      ? verifiedStatus === 'verified'
        ? 'pages.login.emailVerified'
        : verifiedStatus === 'invalid'
          ? 'pages.login.emailVerifyInvalid'
          : null
      : null;

  const containerMaxWidth = routeStep === 'verify-email' ? '520px' : '420px';

  function handleSignModeChange(next: LoginWorkflowStep) {
    clearError();
    const params = new URLSearchParams(searchParams);
    if (next === 'sign-up') {
      params.set('mode', 'register');
    } else {
      params.delete('mode');
    }
    setSearchParams(params, { replace: true });
  }

  async function handleLogin(email: string, password: string) {
    clearError();
    try {
      await login(email, password);
      navigate(returnUrl ?? '/');
    } catch {
      /* error surfaced via lastErrorKey */
    }
  }

  async function handleRegister(email: string, password: string, firstName: string, lastName?: string) {
    clearError();
    try {
      const result = await register(email, password, firstName, lastName);
      if (result.verificationRequired) {
        navigate(`/verify-email?email=${encodeURIComponent(result.email)}`);
        return;
      }
      navigate(returnUrl ?? '/');
    } catch {
      /* error surfaced via lastErrorKey */
    }
  }

  const hero =
    routeStep === 'verify-email' ? (
      emailVerified ? (
        <>
          <h1>{t('pages.verifyEmail.verifiedTitle')}</h1>
          <p>{t('pages.verifyEmail.verifiedHero')}</p>
        </>
      ) : (
        <>
          <h1>{t('pages.verifyEmail.title')}</h1>
          <p>{t('pages.verifyEmail.hero')}</p>
        </>
      )
    ) : routeStep === 'forgot' ? (
      <>
        <h1>{t('pages.forgotPassword.title')}</h1>
        <p>{t('pages.forgotPassword.hero')}</p>
      </>
    ) : routeStep === 'reset' ? (
      resetSuccess ? (
        <>
          <h1>{t('pages.resetPassword.successTitle')}</h1>
          <p>{t('pages.resetPassword.successHero')}</p>
        </>
      ) : (
        <>
          <h1>{t('pages.resetPassword.title')}</h1>
          <p>{t('pages.resetPassword.hero')}</p>
        </>
      )
    ) : signStep === 'sign-up' ? (
      <>
        <h1>{t('common.register')}</h1>
        <p>{t('pages.login.hero')}</p>
      </>
    ) : (
      <>
        <h1>{t('common.login')}</h1>
        <p>{t('pages.login.hero')}</p>
      </>
    );

  const workflowLabels =
    routeStep === 'verify-email'
      ? {
          verifyEmailInstructions: t('pages.verifyEmail.instructions'),
          verifyEmailCheckSpam: t('pages.verifyEmail.checkSpam'),
          verifyEmailAnyBrowser: t('pages.verifyEmail.anyBrowser'),
          verifyEmailResend: t('pages.verifyEmail.resend'),
          verifyEmailResent: t('pages.verifyEmail.resent'),
          verifyEmailBackToLogin: t('pages.verifyEmail.backToLogin'),
          verifyEmailVerified: t('pages.verifyEmail.verified'),
          verifyEmailAlreadyVerified: t('pages.verifyEmail.alreadyVerified'),
          verifyEmailInvalidLink: t('pages.verifyEmail.invalidLink'),
          verifyEmailReturnToSignIn: t('pages.verifyEmail.returnToSignIn'),
          verifyEmailGoToSignIn: t('pages.verifyEmail.goToSignIn'),
          sending: t('account.signingIn'),
          genericError: t('account.errors.generic'),
        }
      : routeStep === 'forgot'
        ? {
            email: t('common.email'),
            forgotPasswordInstructions: t('pages.forgotPassword.instructions'),
            forgotPasswordSubmit: t('pages.forgotPassword.submit'),
            forgotPasswordSent: t('pages.forgotPassword.sent'),
            forgotPasswordCheckSpam: t('pages.forgotPassword.checkSpam'),
            backToLogin: t('pages.forgotPassword.backToLogin'),
            sending: t('account.signingIn'),
            genericError: t('account.errors.generic'),
            requiredMarker: ' (*)',
          }
        : routeStep === 'reset'
          ? {
              password: t('common.password'),
              confirmPassword: t('common.confirmPassword'),
              resetPasswordSubmit: t('pages.resetPassword.submit'),
              resetPasswordSuccess: t('pages.resetPassword.success'),
              resetPasswordInvalidLink: t('pages.resetPassword.invalidLink'),
              resetPasswordRequestNew: t('pages.resetPassword.requestNew'),
              backToLogin: t('pages.resetPassword.backToLogin'),
              goToSignIn: t('pages.resetPassword.goToSignIn'),
              passwordMismatch: t('account.errors.passwordMismatch'),
              sending: t('account.signingIn'),
              genericError: t('account.errors.generic'),
              requiredMarker: ' (*)',
            }
          : {
              signIn: t('common.login'),
              registerTitle: t('common.register'),
              email: t('common.email'),
              firstName: t('common.firstName'),
              lastName: t('common.lastName'),
              password: t('common.password'),
              confirmPassword: t('common.confirmPassword'),
              logInAction: t('common.logInAction'),
              createAccount: t('common.createAccount'),
              forgotPassword: t('pages.login.forgotPassword'),
              orDivider: t('pages.login.orContinueWith'),
              continueWithGoogle: t('pages.login.continueWithGoogle'),
              passwordMismatch: t('account.errors.passwordMismatch'),
              signingIn: t('account.signingIn'),
              requiredMarker: ' (*)',
            };

  return (
    <>
      <div className="page-hero">
        <div className="container">{hero}</div>
      </div>
      <section className="section">
        <div className="container account-workflow" style={{ maxWidth: containerMaxWidth }}>
          <ConnectedLoginWorkflow
            apiBaseUrl={resolveApiBaseUrl()}
            step={routeStep === 'sign-in' || routeStep === 'sign-up' ? signStep : routeStep}
            onStepChange={handleSignModeChange}
            resetToken={resetToken}
            isLoading={isLoading}
            onAccountError={handleAccountError}
            onLogin={handleLogin}
            onRegister={handleRegister}
            errorMessage={
              routeStep === 'sign-in' || routeStep === 'sign-up'
                ? lastErrorKey
                  ? t(lastErrorKey)
                  : undefined
                : undefined
            }
            verifiedBanner={
              verifiedBannerKey ? (
                <div className={`alert ${verifiedStatus === 'verified' ? 'alert-success' : 'alert-warning'}`}>
                  {t(verifiedBannerKey)}
                </div>
              ) : undefined
            }
            onResetSuccess={() => setResetSuccess(true)}
            onGoToSignIn={() => navigate('/login')}
            classifyResetError={(err) => {
              if (err instanceof AccountsError && err.code === AccountsErrorCode.INVALID_ARGUMENT) {
                return t('pages.resetPassword.invalidLink');
              }
              return t('account.errors.generic');
            }}
            labels={workflowLabels}
            classNames={
              routeStep === 'forgot'
                ? { ...accountClassNames, muted: 'forgot-password-muted' }
                : routeStep === 'verify-email'
                  ? { ...accountClassNames, muted: 'verify-email-muted' }
                  : accountClassNames
            }
            renderForgotPasswordLink={(className) => (
              <AppLink to="/forgot-password" className={className}>
                {t('pages.login.forgotPassword')}
              </AppLink>
            )}
            renderBackToSignIn={(className) => (
              <AppLink to="/login" className={className}>
                {routeStep === 'verify-email'
                  ? t('pages.verifyEmail.backToLogin')
                  : routeStep === 'forgot'
                    ? t('pages.forgotPassword.backToLogin')
                    : t('pages.resetPassword.backToLogin')}
              </AppLink>
            )}
            renderRequestNewReset={(className) => (
              <AppLink to="/forgot-password" className={className}>
                {t('pages.resetPassword.requestNew')}
              </AppLink>
            )}
            verifyEmail={verifyEmailParam}
            verifyEmailStatus={verifyEmailStatus}
            onVerifiedChange={setEmailVerified}
          />
        </div>
      </section>
      <style>{`
        .account-workflow .appkit-login-workflow__tabs {
          --appkit-account-border: var(--color-border);
          --appkit-account-surface: var(--color-surface);
          --appkit-account-primary: var(--color-primary);
          --appkit-account-on-primary: var(--color-cream);
          --appkit-account-radius: var(--radius);
          --appkit-account-muted: var(--color-muted);
        }
        .account-workflow .appkit-login-workflow__divider {
          --appkit-account-muted: var(--color-muted);
        }
        .account-workflow .account-google-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .account-workflow .card button.btn.btn-primary.appkit-login-workflow__submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .forgot-password-muted,
        .verify-email-muted {
          font-size: 0.95rem;
          color: var(--color-muted);
        }
        .account-workflow .card button.btn.btn-primary[type="submit"],
        .account-workflow .card button.btn.btn-primary[type="button"] {
          width: 100%;
        }
        .account-workflow .card button.btn.btn-primary[type="button"] {
          margin-top: 1rem;
        }
      `}</style>
    </>
  );
}
