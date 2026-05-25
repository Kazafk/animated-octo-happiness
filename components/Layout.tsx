import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-light">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-dark text-white py-6 text-center">
        <p>&copy; 2026 Portfolio Vitrine. All rights reserved.</p>
      </footer>
    </div>
  );
}
