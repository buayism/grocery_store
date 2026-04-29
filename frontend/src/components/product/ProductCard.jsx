import React from 'react';
import StockBadge from './StockBadge';
import { useCartStore } from '../../store/cartStore';
import { formatCurrency } from '../../utils/formatters';

export default function ProductCard({ product }) {
  const { items, addItem } = useCartStore();
  const cartItem = items.find((i) => i.productId === product.id);
  const isOutOfStock = product.stockLevel === 'OUT_OF_STOCK';
  const isInCart = !!cartItem;

  return (
    <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-shadow duration-300 animate-fade-in">
      {/* Product Image */}
      <div className="relative aspect-[4/3] bg-[var(--color-elevated)] overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--color-text-muted)] opacity-40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Category */}
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-0.5">
          {product.category || 'Produce'}
        </p>

        <h3 className="text-sm font-bold text-[var(--color-text-primary)] line-clamp-1 leading-tight">
          {product.name}
        </h3>

        {/* Price + Stock row */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-[var(--color-text-primary)]">
              {formatCurrency(product.price)}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              / {product.unit}
            </span>
          </div>
          <StockBadge level={product.stockLevel} />
        </div>

        {/* Add to Cart Button — CTA orange */}
        <button
          onClick={() => !isOutOfStock && addItem(product)}
          disabled={isOutOfStock}
          className={`
            w-full mt-3 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg
            transition-all duration-200 cursor-pointer
            ${
              isOutOfStock
                ? 'bg-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed'
                : isInCart
                ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]'
                : 'bg-[var(--color-text-primary)] text-[var(--color-surface)] hover:opacity-90'
            }
          `}
        >
          {isOutOfStock ? 'Out of Stock' : isInCart ? `In Cart (${cartItem.quantity})` : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
