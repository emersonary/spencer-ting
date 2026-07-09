import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AccountProvider, AccountWorkflow, AccountCallback } from './accounts';
import { ScrollToTop } from './components/ScrollToTop';
import { LanguageFromUrl } from './components/LanguageFromUrl';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Properties } from './pages/Properties';
import { PropertyDetail } from './pages/PropertyDetail';
import { MortgageCalculatorPage } from './pages/MortgageCalculator';
import { BuyProcess, SellProcess } from './pages/Process';
import { Neighborhoods } from './pages/Neighborhoods';
import { Blog } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageFromUrl />
      <AccountProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="properties" element={<Properties />} />
            <Route path="properties/:slug" element={<PropertyDetail />} />
            <Route path="neighborhoods" element={<Neighborhoods />} />
            <Route path="buy" element={<BuyProcess />} />
            <Route path="sell" element={<SellProcess />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="mortgage-calculator" element={<MortgageCalculatorPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<AccountWorkflow step="sign-in" />} />
            <Route path="forgot-password" element={<AccountWorkflow step="forgot" />} />
            <Route path="reset-password" element={<AccountWorkflow step="reset" />} />
            <Route path="verify-email" element={<AccountWorkflow step="verify-email" />} />
            <Route path="account/callback" element={<AccountCallback />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AccountProvider>
    </BrowserRouter>
  );
}
