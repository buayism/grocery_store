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

  const tax = subtotal * 0.05; // Mock 5% tax to match screenshot
  const finalTotal = total + tax;

  return (
    <div className="bg-[#F5F5F5] dark:bg-[var(--color-elevated)] p-8">
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-5">Order Summary</h3>
      <div className="w-full h-px bg-[var(--color-border)] mb-6"></div>

      {/* Summary Lines */}
      <div className="space-y-4 text-sm mb-6">
        <div className="flex justify-between text-[var(--color-text-secondary)]">
          <span>Subtotal</span>
          <span className="font-bold text-[var(--color-text-primary)]">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[var(--color-text-secondary)]">
          <span>Est. Shipping</span>
          {deliveryFee === 0 ? (
            <span className="font-bold text-[var(--color-success)]">FREE</span>
          ) : (
            <span className="font-bold text-[var(--color-text-primary)]">{formatCurrency(deliveryFee)}</span>
          )}
        </div>
        <div className="flex justify-between text-[var(--color-text-secondary)]">
          <span>Tax</span>
          <span className="font-bold text-[var(--color-text-primary)]">{formatCurrency(tax)}</span>
        </div>
      </div>

      <div className="w-full h-px bg-[var(--color-border)] mb-6"></div>

      <div className="flex justify-between items-baseline mb-8">
        <span className="font-bold text-[var(--color-text-primary)] text-lg">Total</span>
        <span className="text-2xl font-black text-[var(--color-text-primary)]">
          {formatCurrency(finalTotal)}
        </span>
      </div>

      {/* Checkout Button */}
      {showCheckout && onCheckout && (
        <button
          onClick={onCheckout}
          className="w-full px-6 py-4 bg-black dark:bg-[var(--color-text-primary)] text-white dark:text-[var(--color-surface)] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 dark:hover:opacity-90 transition-all duration-200 cursor-pointer rounded-none"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}
