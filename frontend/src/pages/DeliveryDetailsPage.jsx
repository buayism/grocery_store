import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, FileText, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
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
  const deliveryFee = subtotal >= 50 ? 0 : 8; // Match the $8.00 from the screenshot
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
    <div className="px-4 md:px-8 py-8 md:py-16 max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        
        {/* LEFT COLUMN */}
        <div className="flex-1 w-full lg:max-w-xl">
          <div className="mb-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-primary)] mb-4">
              Checkout Journey
            </p>
            <h2 className="text-4xl md:text-[3.5rem] font-bold text-[var(--color-text-primary)] leading-[1.1] mb-6 tracking-tight">
              Finalize your harvest<br />delivery details.
            </h2>
            <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed max-w-md font-medium">
              Ensure your local farm fresh products reach your doorstep exactly how you want them. Our partners prioritize precision and care.
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="w-full aspect-[4/3] md:aspect-[16/10] bg-[#F5F5F5] dark:bg-[var(--color-elevated)] rounded-xl mb-8 flex items-center justify-center relative overflow-hidden">
            {/* Diagonal lines for placeholder effect */}
            <div className="absolute w-[200%] h-px bg-[var(--color-border)] opacity-50 transform rotate-[30deg] origin-center" />
            <div className="absolute w-[200%] h-px bg-[var(--color-border)] opacity-50 transform -rotate-[30deg] origin-center" />
            
            <div className="bg-white dark:bg-[var(--color-surface)] px-6 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-text-muted)] z-10 shadow-sm border border-transparent dark:border-[var(--color-border)]">
              MAP
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-[#F5F5F5] dark:bg-[var(--color-elevated)] p-6 md:p-8 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[15px] font-bold text-[var(--color-text-primary)]">Marketplace Total</span>
              <span className="font-black text-[var(--color-text-primary)]">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[var(--color-text-secondary)] font-medium">Est. Delivery Fee</span>
              <span className="text-[var(--color-text-secondary)] font-medium">{formatCurrency(deliveryFee)}</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-[480px] xl:w-[500px]">
          <div className="bg-white dark:bg-[var(--color-surface)] p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-[var(--color-border)]">
            <form id="delivery-form" onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-primary)] mb-4 block">
                  Delivery Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" strokeWidth={2.5} />
                  <input
                    type="text"
                    placeholder="Street Address, City, Zip"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full h-14 pl-12 pr-4 bg-transparent border border-[#E5E5E5] dark:border-[var(--color-border)] rounded-xl text-[13px] font-medium focus:outline-none focus:border-black dark:focus:border-[var(--color-primary)] transition-colors placeholder-[#B0B0B0]"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-primary)] mb-4 block">
                  Contact Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" strokeWidth={2.5} />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full h-14 pl-12 pr-4 bg-transparent border border-[#E5E5E5] dark:border-[var(--color-border)] rounded-xl text-[13px] font-medium focus:outline-none focus:border-black dark:focus:border-[var(--color-primary)] transition-colors placeholder-[#B0B0B0]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-primary)] mb-4 block">
                  Delivery Notes
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-5 w-4 h-4 text-[var(--color-text-muted)]" strokeWidth={2.5} />
                  <textarea
                    placeholder="Gate codes, porch drop-off instructions, or specific farm handling requests..."
                    rows={4}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full pl-12 pr-4 py-5 bg-transparent border border-[#E5E5E5] dark:border-[var(--color-border)] rounded-xl text-[13px] font-medium focus:outline-none focus:border-black dark:focus:border-[var(--color-primary)] transition-colors placeholder-[#B0B0B0] resize-none"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-black dark:bg-[var(--color-text-primary)] text-white dark:text-[var(--color-surface)] text-[11px] font-black uppercase tracking-[0.15em] rounded-xl hover:bg-gray-900 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Processing...' : 'Complete Order'}
                  {!loading && <ArrowRight className="w-5 h-5" strokeWidth={3} />}
                </button>
                <p className="text-[9px] text-center font-medium text-[#888888] mt-6 leading-relaxed px-2">
                  By completing this order, you agree to the HarvestDirect local farmer partnership agreements and seasonal delivery policies.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
