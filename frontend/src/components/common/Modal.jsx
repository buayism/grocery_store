import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      {/* Content — bottom sheet on mobile */}
      <div className="relative w-full sm:max-w-md bg-[var(--color-surface)] rounded-t-2xl sm:rounded-2xl animate-slide-up safe-bottom z-10 shadow-[var(--shadow-elevated)]">
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-[var(--color-border)]" />
        </div>
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full hover:bg-[var(--color-border)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-[var(--color-text-muted)]" />
          </button>
        </div>
        <div className="px-5 pb-6">{children}</div>
      </div>
    </div>
  );
}
