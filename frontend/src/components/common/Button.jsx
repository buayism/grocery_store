import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Button variants using CSS variable tokens:
 * - primary:   Green actions (confirm, save)
 * - secondary: Subtle green background
 * - cta:       Orange for Add to Cart / Checkout ONLY
 * - outline:   Bordered style
 * - danger:    Red destructive actions
 * - ghost:     Transparent background
 */

const variants = {
  primary:
    'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:opacity-90',
  secondary:
    'bg-[var(--color-primary-soft)] text-[var(--color-primary)] hover:opacity-80',
  cta:
    'bg-[var(--color-cta)] text-white hover:bg-[var(--color-cta-hover)] active:opacity-90',
  outline:
    'border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]',
  danger:
    'bg-[var(--color-error)] text-white hover:opacity-90',
  ghost:
    'text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2',
  xl: 'px-8 py-4 text-lg rounded-2xl gap-2.5',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-semibold
        transition-all duration-200 ease-out cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-[var(--shadow-soft)]
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </button>
  );
}
