import React from 'react';

const variants = {
  success: 'bg-[color-mix(in_srgb,var(--color-success)_15%,transparent)] text-[var(--color-success)]',
  warning: 'bg-[color-mix(in_srgb,var(--color-warning)_15%,transparent)] text-[var(--color-warning)]',
  error: 'bg-[color-mix(in_srgb,var(--color-error)_15%,transparent)] text-[var(--color-error)]',
  info: 'bg-[color-mix(in_srgb,var(--color-info)_15%,transparent)] text-[var(--color-info)]',
  primary: 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]',
  cta: 'bg-[color-mix(in_srgb,var(--color-cta)_15%,transparent)] text-[var(--color-cta)]',
  muted: 'bg-[var(--color-border)] text-[var(--color-text-muted)]',
};

export default function Badge({
  children,
  variant = 'primary',
  dot = false,
  className = '',
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-0.5
        text-xs font-semibold rounded-full
        ${variants[variant]}
        ${className}
      `}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      )}
      {children}
    </span>
  );
}
