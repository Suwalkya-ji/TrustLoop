import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-md text-on-surface">
      <Header />
      <main className="flex-1 w-full pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
