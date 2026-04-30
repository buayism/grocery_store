import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Banknote, Wallet, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { formatCurrency } from '../utils/formatters';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items, getSubtotal } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  // Fake address for UI if user doesn't have one
  const address = user?.address || '42 Architect Way, Studio 3B\nGrey District, Industrial Park\nBE 1000, Antwerp';

  const subtotal = getSubtotal();
  const deliveryFee = subtotal >= 50 ? 0 : 5;
  const tax = subtotal * 0.08; // Mock 8% tax
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto animate-fade-in">
      {/* Header - Full Width */}
      <div className="w-full mb-12">
        <h2 className="text-4xl md:text-[3.5rem] leading-none font-black tracking-tight text-[var(--color-text-primary)] uppercase mb-6">
          Checkout
        </h2>
        
        {/* Progress Bar */}
        <div className="w-full lg:max-w-4xl">
          <div className="w-full h-1 bg-[#E0E0E0] dark:bg-[var(--color-border)] mb-4 flex">
            <div className="h-full bg-black dark:bg-[var(--color-text-primary)] w-[40%]"></div>
          </div>
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.15em]">
            <span className="text-[var(--color-text-primary)]">Shipping</span>
            <span className="text-[var(--color-text-primary)] text-center">Payment</span>
            <span className="text-[var(--color-text-muted)] text-right">Review</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        
        {/* LEFT COLUMN: SUMMARY */}
        <div className="w-full lg:w-[400px] xl:w-[420px] bg-[#F5F5F5] dark:bg-[var(--color-elevated)] p-6 md:p-8 rounded-2xl sticky top-24">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--color-text-primary)] mb-8">Order Summary</h3>
          
          <div className="space-y-6 mb-10">
            {items.map(item => (
              <div key={item.productId} className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-xl bg-[#EBEBEB] dark:bg-[var(--color-surface)] flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover grayscale mix-blend-multiply dark:mix-blend-normal" />
                  ) : (
                    <span className="text-[8px] font-bold text-[var(--color-text-muted)] tracking-widest">IMG</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-xs font-bold text-[var(--color-text-primary)] leading-snug">{item.name}</h4>
                    <span className="text-xs font-black text-[var(--color-text-primary)]">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.05em] text-[var(--color-text-secondary)] mt-1.5">
                    Qty: {item.quantity < 10 ? `0${item.quantity}` : item.quantity} — {item.unit}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-xs mb-8">
            <div className="flex justify-between text-[var(--color-text-secondary)]">
              <span>Subtotal</span>
              <span className="text-[var(--color-text-primary)]">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[var(--color-text-secondary)]">
              <span>Shipping Fee</span>
              {deliveryFee === 0 ? (
                <span className="font-bold text-[var(--color-text-primary)] uppercase tracking-wide">Free</span>
              ) : (
                <span className="text-[var(--color-text-primary)]">{formatCurrency(deliveryFee)}</span>
              )}
            </div>
            <div className="flex justify-between text-[var(--color-text-secondary)]">
              <span>Estimated Tax</span>
              <span className="text-[var(--color-text-primary)]">{formatCurrency(tax)}</span>
            </div>
          </div>

          <div className="flex justify-between items-baseline mb-4">
            <span className="text-[11px] font-black uppercase tracking-[0.15em] text-[var(--color-text-primary)]">Total Cost</span>
            <span className="text-2xl font-black text-[var(--color-text-primary)]">{formatCurrency(total)}</span>
          </div>
        </div>

        {/* RIGHT COLUMN: FORMS */}
        <div className="flex-1 w-full lg:max-w-3xl">
          <div className="space-y-10">
            {/* Shipping Address */}
            <section>
              <div className="flex items-center justify-between mb-4 pb-2">
                <h3 className="text-sm md:text-xs font-black uppercase tracking-[0.2em] text-[var(--color-text-primary)]">01. Shipping Address</h3>
                <button className="text-[10px] font-bold underline text-[var(--color-text-primary)] cursor-pointer hover:opacity-70 transition-opacity uppercase tracking-wider">Edit</button>
              </div>
              <div className="bg-[#F5F5F5] dark:bg-[var(--color-elevated)] p-6 md:p-8 rounded-xl">
                <p className="font-bold text-sm text-[var(--color-text-primary)] mb-1">{user?.name || 'Alex Rivers'}</p>
                <p className="text-sm text-[var(--color-text-secondary)] whitespace-pre-line leading-relaxed">
                  {address}
                </p>
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <div className="mb-4 pb-2">
                <h3 className="text-sm md:text-xs font-black uppercase tracking-[0.2em] text-[var(--color-text-primary)]">02. Payment Method</h3>
              </div>
              
              <div className="space-y-4">
                {/* Cash on Delivery */}
                <label className={`
                  flex items-center justify-between p-5 md:p-6 rounded-xl border-2 transition-all cursor-pointer
                  ${paymentMethod === 'cod' 
                    ? 'border-black dark:border-[var(--color-text-primary)] bg-white dark:bg-[var(--color-surface)] shadow-sm' 
                    : 'border-transparent bg-[#F5F5F5] dark:bg-[var(--color-elevated)]'}
                `}>
                  <div className="flex items-center gap-5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center border-4 ${
                      paymentMethod === 'cod' ? 'border-black dark:border-[var(--color-text-primary)] bg-white' : 'border-[var(--color-border)] bg-transparent'
                    }`}>
                      {paymentMethod === 'cod' && <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-[var(--color-text-primary)]" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--color-text-primary)]">Cash on Delivery</p>
                      <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)] mt-1.5">Pay when you receive your order</p>
                    </div>
                  </div>
                  <Banknote className={`w-6 h-6 ${paymentMethod === 'cod' ? 'text-black dark:text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'}`} />
                </label>

                {/* Credit Card */}
                <label className="flex items-center justify-between p-5 md:p-6 rounded-xl border-2 border-transparent bg-[#F5F5F5] dark:bg-[var(--color-elevated)] cursor-not-allowed">
                  <div className="flex items-center gap-5 opacity-40">
                    <div className="w-4 h-4 rounded-full border-2 border-[var(--color-text-muted)] bg-transparent"></div>
                    <div>
                      <p className="text-sm font-bold text-[var(--color-text-primary)]">Credit / Debit Card</p>
                      <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)] mt-1.5">Visa, Mastercard, Amex</p>
                    </div>
                  </div>
                  <CreditCard className="w-6 h-6 text-[var(--color-text-muted)] opacity-40" />
                </label>

                {/* Digital Wallet */}
                <label className="flex items-center justify-between p-5 md:p-6 rounded-xl border-2 border-transparent bg-[#F5F5F5] dark:bg-[var(--color-elevated)] cursor-not-allowed">
                  <div className="flex items-center gap-5 opacity-40">
                    <div className="w-4 h-4 rounded-full border-2 border-[var(--color-text-muted)] bg-transparent"></div>
                    <div>
                      <p className="text-sm font-bold text-[var(--color-text-primary)]">Digital Wallet</p>
                      <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)] mt-1.5">Apple Pay, Google Pay</p>
                    </div>
                  </div>
                  <Wallet className="w-6 h-6 text-[var(--color-text-muted)] opacity-40" />
                </label>
              </div>
            </section>
          </div>

          {/* Continue Button */}
          <div className="mt-12 mb-8">
            <button
              onClick={() => navigate('/delivery-details')}
              className="w-full flex items-center justify-between px-6 md:px-8 py-5 md:py-6 bg-black dark:bg-[var(--color-text-primary)] text-white dark:text-[var(--color-surface)] text-xs md:text-sm font-black uppercase tracking-[0.15em] rounded-lg hover:bg-gray-900 dark:hover:opacity-90 transition-colors cursor-pointer shadow-lg"
            >
              <span>Continue to Confirmation</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
