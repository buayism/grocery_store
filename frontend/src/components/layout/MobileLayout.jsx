import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

export default function MobileLayout() {
  const location = useLocation();

  const hideBottomNav = ['/checkout', '/delivery-details', '/auth'].some((p) =>
    location.pathname.startsWith(p)
  );

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[var(--color-surface)] relative">
      <Header />
      <main className={`flex-1 w-full ${hideBottomNav ? 'pb-4 md:pb-8' : 'pb-20 md:pb-8'}`}>
        <Outlet />
      </main>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}
