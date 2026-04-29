import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Printer, HelpCircle } from 'lucide-react';
import { useOrderStore } from '../store/orderStore';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { activeOrder } = useOrderStore();
  
  // Use active order or mock data if navigated directly
  const order = activeOrder || {
    id: orderId || 'HD-8829-2024',
    orderNumber: orderId || 'HD-8829-2024',
    total: 36.50,
    createdAt: new Date().toISOString(),
    deliveryAddress: '1242 Architectural Blvd\nStudio 402\nNew York, NY 10012',
    items: [
      { id: '1', name: 'Heirloom Tomato Bundle', farmerName: 'Green Valley Farm', unit: '5lb box • Organic', price: 24.00, quantity: 1, imageUrl: null },
      { id: '2', name: 'Wildflower Forest Honey', farmerName: 'Cedar Ridge Apiary', unit: '16oz Jar • Raw', price: 12.50, quantity: 1, imageUrl: null }
    ]
  };

  return (
    <div className="px-4 py-8 animate-fade-in flex flex-col items-center max-w-md mx-auto">
      {/* Success Icon */}
      <div className="w-16 h-16 rounded-full bg-[var(--color-elevated)] flex items-center justify-center mb-6 shadow-[var(--shadow-soft)]">
        <div className="w-8 h-8 rounded-full bg-[var(--color-text-primary)] flex items-center justify-center text-[var(--color-surface)]">
          <Check className="w-5 h-5" strokeWidth={3} />
        </div>
      </div>

      <h1 className="text-3xl font-black text-[var(--color-text-primary)] mb-3 text-center">Order Confirmed</h1>
      <p className="text-sm text-[var(--color-text-secondary)] text-center mb-8 px-4 leading-relaxed">
        Your fresh harvest is being prepared. We've sent a confirmation email to <span className="font-bold text-[var(--color-text-primary)]">user@example.com</span>
      </p>

      {/* Order Summary Card */}
      <div className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-[var(--shadow-card)] overflow-hidden mb-6">
        {/* Header Info */}
        <div className="flex justify-between items-start p-5 border-b border-[var(--color-border)]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Order Number</p>
            <p className="text-sm font-bold text-[var(--color-text-primary)]">{order.orderNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Date</p>
            <p className="text-sm font-medium text-[var(--color-text-primary)]">{formatDate(order.createdAt)}</p>
          </div>
        </div>

        {/* Items */}
        <div className="p-5 space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-12 h-12 rounded bg-[var(--color-elevated)] flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-bold text-[var(--color-text-primary)]">{item.name}</p>
                <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{item.unit || item.farmerName}</p>
              </div>
              <p className="text-sm font-bold text-[var(--color-text-primary)]">{formatCurrency(item.price * (item.quantity || 1))}</p>
            </div>
          ))}
        </div>

        {/* Total & Delivery Method */}
        <div className="p-5 bg-[var(--color-elevated)] border-t border-[var(--color-border)] flex justify-between items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Delivery Method</p>
            <p className="text-sm font-medium text-[var(--color-text-primary)]">Farm-to-Door Courier</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium text-[var(--color-text-muted)] mb-0.5">Total (Inc. Tax)</p>
            <p className="text-2xl font-black text-[var(--color-text-primary)]">{formatCurrency(order.total)}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full space-y-4">
        {/* Track Order Map Button Placeholder */}
        <button 
          onClick={() => navigate(`/order-tracking/${order.id}`)}
          className="w-full aspect-[3/1] bg-[var(--color-elevated)] rounded-xl border border-[var(--color-border)] flex items-center justify-center relative overflow-hidden cursor-pointer"
        >
          {/* Faint map pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-text-primary) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="bg-[var(--color-text-primary)] text-[var(--color-surface)] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest z-10">
            Track Order
          </div>
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full py-4 bg-[var(--color-text-primary)] text-[var(--color-surface)] text-xs font-bold uppercase tracking-widest rounded-lg hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span className="text-lg leading-none mb-0.5">⌂</span>
          Back to Home
        </button>

        <div className="flex justify-center gap-8 pt-4">
          <button className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer">
            <Printer className="w-3.5 h-3.5" />
            Print Receipt
          </button>
          <button className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer">
            <HelpCircle className="w-3.5 h-3.5" />
            Need Help?
          </button>
        </div>
      </div>
    </div>
  );
}
