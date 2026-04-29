import React, { useEffect, useState } from 'react';
import { ClipboardList } from 'lucide-react';
import { useOrderStore } from '../store/orderStore';
import OrderCard from '../components/order/OrderCard';

export default function OrdersPage() {
  const { fetchOrders, loading } = useOrderStore();
  
  // Create mock order history for UI
  const [mockOrders, setMockOrders] = useState([
    {
      id: 'HD-8829-2024',
      orderNumber: 'HD-8829-2024',
      status: 'DELIVERED',
      total: 36.50,
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      itemCount: 3
    },
    {
      id: 'HD-7114-2024',
      orderNumber: 'HD-7114-2024',
      status: 'FAILED',
      total: 12.00,
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
      itemCount: 1
    },
    {
      id: 'HD-5002-2024',
      orderNumber: 'HD-5002-2024',
      status: 'DELIVERED',
      total: 45.20,
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
      itemCount: 5
    }
  ]);

  useEffect(() => {
    // In real app, we would fetch here
    // fetchOrders();
  }, [fetchOrders]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--color-primary)] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (mockOrders.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-[var(--color-elevated)] flex items-center justify-center mb-4">
          <ClipboardList className="w-6 h-6 text-[var(--color-text-muted)]" />
        </div>
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">No orders yet</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">When you place orders, they will appear here.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
          History
        </p>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">My Orders</h2>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
