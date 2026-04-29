import React from 'react';
import { Banknote } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatCurrency } from '../../utils/formatters';

const DELIVERY_FEE = 5;
const FREE_DELIVERY_THRESHOLD = 50;

export default function CartSummary({ showCheckout = true, onCheckout }) {
  const subtotal = useCartStore((s) => s.getSubtotal());
  const itemCount = useCartStore((s) => s.getItemCount());
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  if (itemCount === 0) return null;

  return (
    <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 shadow-[var(--shadow-soft)]">
      <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-4">Order Summary</h3>

      {/* Summary Lines */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-[var(--color-text-secondary)]">
          <span>Subtotal</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[var(--color-text-secondary)]">
          <span>Est. Shipping</span>
          {deliveryFee === 0 ? (
            <span className="font-semibold text-[var(--color-success)]">FREE</span>
          ) : (
            <span className="font-medium">{formatCurrency(deliveryFee)}</span>
          )}
        </div>

        <div className="border-t border-[var(--color-border)] pt-3 flex justify-between items-baseline">
          <span className="font-bold text-[var(--color-text-primary)]">Total</span>
          <span className="text-2xl font-bold text-[var(--color-text-primary)]">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* CoD indicator */}
      <div className="mt-4 flex items-center gap-2 p-3 bg-[var(--color-primary-soft)] rounded-lg">
        <Banknote className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
        <p className="text-xs font-medium text-[var(--color-primary)]">
          Cash on Delivery — pay when you receive
        </p>
      </div>

      {/* Checkout Button */}
      {showCheckout && onCheckout && (
        <button
          onClick={onCheckout}
          className="w-full mt-4 px-6 py-4 bg-[var(--color-text-primary)] text-[var(--color-surface)] text-xs font-bold uppercase tracking-[0.2em] rounded-lg hover:opacity-90 transition-all duration-200 cursor-pointer"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}
