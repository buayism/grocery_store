import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Banknote, MapPin, Wallet } from 'lucide-react';
import CartSummary from '../components/cart/CartSummary';
import { useAuthStore } from '../store/authStore';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  // Fake address for UI if user doesn't have one
  const address = user?.address || '42 Architect Way, Studio 3B\nGrey District, Industrial Park\nBE 1000, Antwerp';

  return (
    <div className="px-4 py-4 animate-fade-in pb-24">
      {/* Header */}
      <div className="mb-6 border-b-2 border-[var(--color-border)] pb-2 flex justify-between items-end">
        <h2 className="text-3xl font-black tracking-tight text-[var(--color-text-primary)] uppercase">Checkout</h2>
        <div className="flex gap-2 text-[10px] font-bold uppercase text-[var(--color-text-muted)] tracking-widest">
          <span className="text-[var(--color-text-primary)]">Shipping</span>
          <span>Payment</span>
          <span>Review</span>
        </div>
      </div>

      <div className="space-y-8">
        {/* Shipping Address */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-primary)]">01. Shipping Address</h3>
            <button className="text-xs font-bold underline text-[var(--color-text-primary)] cursor-pointer">Edit</button>
          </div>
          <div className="bg-[var(--color-elevated)] p-4 rounded-xl border border-[var(--color-border)]">
            <p className="font-bold text-sm text-[var(--color-text-primary)] mb-1">{user?.name || 'Alex Rivers'}</p>
            <p className="text-sm text-[var(--color-text-secondary)] whitespace-pre-line leading-relaxed">
              {address}
            </p>
          </div>
        </section>

        {/* Payment Method */}
        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-primary)] mb-3">02. Payment Method</h3>
          
          <div className="space-y-3">
            {/* Cash on Delivery (Selected by default/only available option based on requirements) */}
            <label className={`
              flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer
              ${paymentMethod === 'cod' 
                ? 'border-[var(--color-text-primary)] bg-[var(--color-surface)] shadow-[var(--shadow-soft)]' 
                : 'border-[var(--color-border)] bg-[var(--color-elevated)] opacity-70'}
            `}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'cod' ? 'border-[var(--color-text-primary)]' : 'border-[var(--color-text-muted)]'
              }`}>
                {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-[var(--color-text-primary)]" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[var(--color-text-primary)]">Cash on Delivery</p>
                <p className="text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)] mt-0.5">Pay when you receive your order</p>
              </div>
              <Banknote className="w-5 h-5 text-[var(--color-text-primary)]" />
            </label>

            {/* Credit Card - Disabled/Mock per requirements */}
            <label className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-elevated)] opacity-50 cursor-not-allowed">
              <div className="w-4 h-4 rounded-full border-2 border-[var(--color-text-muted)] flex items-center justify-center"></div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[var(--color-text-primary)]">Credit / Debit Card</p>
                <p className="text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)] mt-0.5">Visa, Mastercard, Amex</p>
              </div>
              <CreditCard className="w-5 h-5 text-[var(--color-text-muted)]" />
            </label>

            {/* Digital Wallet - Disabled/Mock per requirements */}
            <label className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-elevated)] opacity-50 cursor-not-allowed">
              <div className="w-4 h-4 rounded-full border-2 border-[var(--color-text-muted)] flex items-center justify-center"></div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[var(--color-text-primary)]">Digital Wallet</p>
                <p className="text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)] mt-0.5">Apple Pay, Google Pay</p>
              </div>
              <Wallet className="w-5 h-5 text-[var(--color-text-muted)]" />
            </label>
          </div>
        </section>

        {/* Order Summary (Smaller version) */}
        <section>
          <CartSummary showCheckout={false} />
        </section>
      </div>

      {/* Floating Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-surface)] border-t border-[var(--color-border)] safe-bottom max-w-lg mx-auto z-10 shadow-[var(--shadow-nav)]">
        <button
          onClick={() => navigate('/delivery-details')}
          className="w-full flex items-center justify-between px-6 py-4 bg-[var(--color-text-primary)] text-[var(--color-surface)] text-xs font-bold uppercase tracking-widest rounded-lg hover:opacity-90 transition-all cursor-pointer"
        >
          <span>Continue to Confirmation</span>
          <span className="text-lg leading-none">→</span>
        </button>
      </div>
    </div>
  );
}
