import React from 'react';
import { Header } from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Header />

      <section className="p-8 md:p-12">{children}</section>
    </main>
  );
};

export { Layout };
