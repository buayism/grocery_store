import React from 'react';
import { Plus, Minus, MoreVertical } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatCurrency } from '../../utils/formatters';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 md:gap-6 p-4 md:p-6 bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] animate-fade-in">
      {/* Image */}
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-[#EBEBEB] dark:bg-[var(--color-elevated)] flex-shrink-0 flex items-center justify-center">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-xl" />
        ) : (
          <span className="text-[10px] md:text-xs text-[var(--color-text-muted)] font-bold tracking-widest">IMG</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="pr-2">
            <h3 className="text-base font-bold text-[var(--color-text-primary)] truncate">
              {item.name}
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              {item.farmerName || 'Local Farm'} • {item.unit}
            </p>
          </div>
          <button
            onClick={() => removeItem(item.productId)}
            className="p-1 -mt-1 -mr-1 rounded-full hover:bg-[var(--color-border)] transition-colors cursor-pointer"
          >
            <MoreVertical className="w-5 h-5 text-[var(--color-text-muted)]" />
          </button>
        </div>

        <div className="flex items-end justify-between mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center bg-[#F5F5F5] dark:bg-[var(--color-elevated)] rounded-lg px-1">
            <button
              onClick={() =>
                item.quantity === 1
                  ? removeItem(item.productId)
                  : updateQuantity(item.productId, item.quantity - 1)
              }
              className="w-8 h-10 flex items-center justify-center hover:bg-[#E5E5E5] dark:hover:bg-[var(--color-border)] rounded-md transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
            </button>
            <span className="w-10 text-sm font-bold text-[var(--color-text-primary)] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              className="w-8 h-10 flex items-center justify-center hover:bg-[#E5E5E5] dark:hover:bg-[var(--color-border)] rounded-md transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
            </button>
          </div>

          {/* Line Total */}
          <div className="text-right">
            <p className="text-[10px] font-bold tracking-[0.15em] text-[var(--color-text-muted)] uppercase mb-0.5">Total</p>
            <p className="text-lg md:text-xl font-black text-[var(--color-text-primary)] leading-none">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
