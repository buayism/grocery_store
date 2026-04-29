import React from 'react';
import { STOCK_LEVELS } from '../../utils/constants';

export default function StockBadge({ level }) {
  const config = STOCK_LEVELS[level] || STOCK_LEVELS.HIGH;

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]">
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
      <span className="text-[var(--color-text-secondary)]">Stock: {config.label}</span>
    </span>
  );
}
