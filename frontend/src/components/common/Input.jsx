import React, { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { label, error, icon: Icon, className = '', ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold tracking-wide uppercase text-[var(--color-text-secondary)]">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
        )}
        <input
          ref={ref}
          className={`
            input-base
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-[var(--color-error)]! focus:border-[var(--color-error)]! focus:ring-[var(--color-error)]/20!' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-[var(--color-error)] mt-0.5">{error}</p>
      )}
    </div>
  );
});

export default Input;
