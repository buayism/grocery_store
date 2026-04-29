import React from 'react';
import { Plus, Minus, MoreVertical } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatCurrency } from '../../utils/formatters';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 p-4 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] animate-fade-in">
      {/* Image */}
      <div className="w-24 h-24 rounded-lg bg-[var(--color-elevated)] overflow-hidden flex-shrink-0 flex items-center justify-center">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs text-[var(--color-text-muted)] font-medium">IMG</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
              {item.name}
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              {item.farmerName || 'Local Farm'} • {item.unit}
            </p>
          </div>
          <button
            onClick={() => removeItem(item.productId)}
            className="p-1 rounded-full hover:bg-[var(--color-border)] transition-colors cursor-pointer"
          >
            <MoreVertical className="w-4 h-4 text-[var(--color-text-muted)]" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity Controls */}
          <div className="flex items-center border border-[var(--color-border)] rounded-lg overflow-hidden">
            <button
              onClick={() =>
                item.quantity === 1
                  ? removeItem(item.productId)
                  : updateQuantity(item.productId, item.quantity - 1)
              }
              className="w-9 h-9 flex items-center justify-center bg-[var(--color-elevated)] hover:bg-[var(--color-border)] transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
            </button>
            <span className="w-10 h-9 flex items-center justify-center text-sm font-bold text-[var(--color-text-primary)] bg-[var(--color-surface)]">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              className="w-9 h-9 flex items-center justify-center bg-[var(--color-elevated)] hover:bg-[var(--color-border)] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
            </button>
          </div>

          {/* Line Total */}
          <div className="text-right">
            <p className="text-[10px] text-[var(--color-text-muted)] uppercase">Total</p>
            <p className="text-base font-bold text-[var(--color-text-primary)]">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
