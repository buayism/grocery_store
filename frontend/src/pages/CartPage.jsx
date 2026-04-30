import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCartStore } from '../store/cartStore';

export default function CartPage() {
  const navigate = useNavigate();
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-[var(--color-elevated)] flex items-center justify-center mb-4">
          <ShoppingCart className="w-8 h-8 text-[var(--color-text-muted)]" />
        </div>
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Your cart is empty</h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1 max-w-xs">
          Browse our current harvest and add fresh produce to your cart.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-2.5 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer"
        >
          Browse Harvest
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-2">
          Shopping Cart
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-[var(--color-text-primary)]">Review Your Order</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        {/* Left Column: Cart Items */}
        <div className="flex-1 w-full space-y-4">
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        {/* Right Column: Summary */}
        <div className="w-full lg:w-[400px] xl:w-[450px] sticky top-24">
          <CartSummary
            showCheckout
            onCheckout={() => navigate('/checkout')}
          />
          
          {/* Continue Shopping */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mt-6 text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer w-full justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="uppercase tracking-[0.1em] text-xs">Continue Shopping</span>
          </button>
        </div>
      </div>
    </div>
  );
}
