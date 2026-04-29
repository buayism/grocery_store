import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Search, ClipboardList, User } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import ThemeToggle from '../common/ThemeToggle';

const pageTitles = {
  '/': null,
  '/cart': 'Shopping Cart',
  '/checkout': 'Checkout',
  '/delivery-details': 'Delivery Details',
  '/orders': 'My Orders',
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const itemCount = useCartStore((s) => s.getItemCount());
  const isHome = location.pathname === '/';
  const title = pageTitles[location.pathname];
  const showBack = !isHome;

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-8 h-16 w-full">
        {/* Left */}
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-[var(--color-border)] transition-colors cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--color-text-primary)]" />
            </button>
          )}

          {isHome ? (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-sm">
                <span className="text-white text-base font-bold">H</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-[var(--color-text-primary)] leading-none tracking-tight">
                  HarvestDirect
                </h1>
                <p className="text-[10px] text-[var(--color-primary)] font-medium mt-0.5">
                  Farm Fresh to Your Door
                </p>
              </div>
            </div>
          ) : (
            <h1 className="text-lg font-bold text-[var(--color-text-primary)]">{title}</h1>
          )}
        </div>

        {/* Center Search Bar - DESKTOP ONLY */}
        {isHome && (
          <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
            <input 
              type="text" 
              placeholder="Search for fresh vegetables, fruits, and more..."
              className="w-full h-11 pl-4 pr-14 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] focus:outline-none focus:border-[var(--color-primary)] text-sm transition-colors text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]"
            />
            <button className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors flex items-center justify-center cursor-pointer">
              <Search className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* Right */}
        <div className="flex items-center gap-1 md:gap-3">
          {/* Mobile Search Icon */}
          {isHome && (
            <button
              className="md:hidden p-2 rounded-full hover:bg-[var(--color-border)] transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors" />
            </button>
          )}

          <ThemeToggle />

          {/* Desktop Nav Icons */}
          <button
            onClick={() => navigate('/orders')}
            className="hidden md:flex p-2 rounded-full hover:bg-[var(--color-border)] transition-colors cursor-pointer"
            aria-label="Orders"
          >
            <ClipboardList className="w-5 h-5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors" />
          </button>

          <button
            onClick={() => navigate('/profile')}
            className="hidden md:flex p-2 rounded-full hover:bg-[var(--color-border)] transition-colors cursor-pointer"
            aria-label="Profile"
          >
            <User className="w-5 h-5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors" />
          </button>

          <button
            onClick={() => navigate('/cart')}
            className="relative p-2 rounded-full hover:bg-[var(--color-border)] transition-colors cursor-pointer"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-5 h-5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[var(--color-cta)] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
