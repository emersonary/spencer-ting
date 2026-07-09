import { Link, NavLink, type LinkProps, type NavLinkProps } from 'react-router-dom';
import { withLangQuery } from '../../i18n/urlLanguage';

export function AppLink({ to, ...props }: LinkProps) {
  return <Link to={withLangQuery(to)} {...props} />;
}

export function AppNavLink({ to, ...props }: NavLinkProps) {
  return <NavLink to={withLangQuery(to)} {...props} />;
}
