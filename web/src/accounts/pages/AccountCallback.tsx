import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAccount } from '../context/AccountContext';
import { useAppNavigate } from '../../hooks/useAppNavigate';

export function AccountCallback() {
  const [searchParams] = useSearchParams();
  const { completeOAuthLogin } = useAccount();
  const navigate = useAppNavigate();

  useEffect(() => {
    const token = searchParams.get('access_token');
    if (!token) {
      navigate('/login');
      return;
    }
    void completeOAuthLogin(token)
      .then(() => navigate('/'))
      .catch(() => navigate('/login'));
  }, [searchParams, completeOAuthLogin, navigate]);

  return <div className="page-loading">Signing in...</div>;
}
