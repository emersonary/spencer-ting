import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import 'flag-icons/css/flag-icons.min.css';
import './index.css';
import './styles/rtl.css';
import './styles/layout.css';
import './styles/pages.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
