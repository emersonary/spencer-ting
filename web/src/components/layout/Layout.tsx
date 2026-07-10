import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { DocumentHead } from '../DocumentHead';

export function Layout() {
  return (
    <>
      <DocumentHead />
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
