import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, FileText } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import Input from '../components/common/Input';
import { formatCurrency } from '../utils/formatters';

export default function DeliveryDetailsPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { setActiveOrder } = useOrderStore();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    address: user?.address || '',
    phone: user?.phone || '',
    notes: '',
  });

  const subtotal = getSubtotal();
  const deliveryFee = subtotal >= 50 ? 0 : 5;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock API call to place order
    setTimeout(() => {
      const orderId = `HD-${Math.floor(1000 + Math.random() * 9000)}-2024`;
      setActiveOrder({
        id: orderId,
        orderNumber: orderId,
        status: 'PLACED',
        total,
        items: [...items],
        createdAt: new Date().toISOString(),
        deliveryAddress: form.address,
      });
      clearCart();
      setLoading(false);
      navigate(`/order-confirmation/${orderId}`);
    }, 1500);
  };

  return (
    <div className="px-4 py-4 animate-fade-in pb-24">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
          Checkout Journey
        </p>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] leading-tight">
          Finalize your harvest delivery details.
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">
          Ensure your local farm fresh products reach your doorstep exactly how you want them. Our partners prioritize precision and care.
        </p>
      </div>

      {/* Map Placeholder */}
      <div className="w-full aspect-[4/3] bg-[var(--color-elevated)] rounded-xl border border-[var(--color-border)] mb-6 flex items-center justify-center relative overflow-hidden">
        {/* Diagonal lines for placeholder effect */}
        <div className="absolute inset-0 border-t border-[var(--color-border)] transform rotate-[36.87deg] scale-150 origin-top-left" />
        <div className="absolute inset-0 border-t border-[var(--color-border)] transform -rotate-[36.87deg] scale-150 origin-bottom-left" />
        
        <div className="bg-[var(--color-surface)] px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] border border-[var(--color-border)] z-10 shadow-[var(--shadow-soft)]">
          MAP
        </div>
      </div>

      {/* Form */}
      <form id="delivery-form" onSubmit={handleSubmit} className="space-y-5 bg-[var(--color-surface)] p-5 rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)]">
        <Input
          label="Delivery Location"
          placeholder="Street Address, City, Zip"
          icon={MapPin}
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />
        
        <Input
          label="Contact Number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          icon={Phone}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)] mb-1.5 block">
            Delivery Notes
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-4 h-4 text-[var(--color-text-muted)]" />
            <textarea
              placeholder="Gate codes, porch drop-off instructions, or specific farm handling requests..."
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="input-base pl-10 resize-none"
            />
          </div>
        </div>
      </form>

      {/* Summary Box */}
      <div className="mt-6 p-4 bg-[var(--color-elevated)] rounded-xl border border-[var(--color-border)] space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-[var(--color-text-primary)]">Marketplace Total</span>
          <span className="font-bold text-[var(--color-text-primary)]">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-[var(--color-text-secondary)]">Est. Delivery Fee</span>
          <span className="text-[var(--color-text-secondary)]">{formatCurrency(deliveryFee)}</span>
        </div>
      </div>

      {/* Floating Complete Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-surface)] border-t border-[var(--color-border)] safe-bottom max-w-lg mx-auto z-10 shadow-[var(--shadow-nav)]">
        <button
          type="submit"
          form="delivery-form"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-text-primary)] text-[var(--color-surface)] text-xs font-bold uppercase tracking-widest rounded-lg hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Processing...' : 'Complete Order'}
          {!loading && <span className="text-lg leading-none ml-1">→</span>}
        </button>
        <p className="text-[9px] text-center text-[var(--color-text-muted)] mt-3 px-4 leading-relaxed">
          By completing this order, you agree to the HarvestDirect local farmer partnership agreements and seasonal delivery policies.
        </p>
      </div>
    </div>
  );
}
