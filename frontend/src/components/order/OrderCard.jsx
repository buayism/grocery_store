import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ORDER_STATUSES } from '../../utils/constants';
import { formatCurrency, formatDate, formatOrderId } from '../../utils/formatters';
import Badge from '../common/Badge';

export default function OrderCard({ order }) {
  const navigate = useNavigate();
  const statusConfig = ORDER_STATUSES[order.status] || ORDER_STATUSES.PLACED;

  const badgeVariant =
    order.status === 'DELIVERED' ? 'success' :
    order.status === 'FAILED' ? 'error' :
    order.status === 'CANCELLED' ? 'muted' :
    order.status === 'OUT_FOR_DELIVERY' ? 'cta' : 'primary';

  return (
    <button
      onClick={() => navigate(`/order-tracking/${order.id}`)}
      className="w-full text-left bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-4 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-all duration-200 animate-fade-in cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-[var(--color-text-muted)] font-medium">{formatOrderId(order.orderNumber)}</p>
          <p className="text-base font-bold text-[var(--color-text-primary)] mt-0.5">{formatCurrency(order.total)}</p>
        </div>
        <Badge variant={badgeVariant} dot>{statusConfig.label}</Badge>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-border)]">
        <p className="text-xs text-[var(--color-text-muted)]">{formatDate(order.createdAt)} · {order.itemCount || '–'} items</p>
        <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)]" />
      </div>
    </button>
  );
}
