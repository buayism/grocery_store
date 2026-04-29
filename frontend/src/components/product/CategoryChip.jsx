import React from 'react';

export default function CategoryChip({ category, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium
        whitespace-nowrap transition-all duration-200 flex-shrink-0 cursor-pointer
        ${
          isActive
            ? 'bg-[var(--color-text-primary)] text-[var(--color-surface)]'
            : 'bg-[var(--color-elevated)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
        }
      `}
    >
      <span className="text-base">{category.emoji}</span>
      <span className="uppercase tracking-wide text-xs">{category.label}</span>
    </button>
  );
}
