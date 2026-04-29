import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderStatusStepper from '../components/order/OrderStatusStepper';
import FailureReasonBanner from '../components/order/FailureReasonBanner';
import ReviewForm from '../components/review/ReviewForm';
import { useOrderPolling } from '../hooks/useOrderPolling';
import { formatCurrency, formatOrderId } from '../utils/formatters';
import { TERMINAL_STATUSES } from '../utils/constants';

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [showReview, setShowReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Poll for updates (mocked locally in hook)
  const { order, loading, error } = useOrderPolling(orderId, {
    enabled: true,
  });

  const isTerminal = order && TERMINAL_STATUSES.includes(order.status);
  const canReview = order?.status === 'DELIVERED';

  if (loading && !order) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-[var(--color-primary)] border-t-transparent animate-spin mb-4" />
          <p className="text-sm font-medium text-[var(--color-text-muted)] tracking-widest uppercase">Loading Order...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-[var(--color-error)] mb-4">{error || 'Order not found'}</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-[var(--color-text-primary)] text-[var(--color-surface)] rounded-lg text-xs font-bold uppercase tracking-widest cursor-pointer"
        >
          Return Home
        </button>
      </div>
    );
  }

  // Review Flow View
  if (showReview && !reviewSubmitted) {
    return (
      <div className="px-4 py-6 animate-fade-in pb-24">
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 bg-[var(--color-elevated)] border border-[var(--color-border)] rounded-full text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-4">
            Review Session
          </span>
          <h2 className="text-3xl font-black text-[var(--color-text-primary)] leading-tight mb-2">How was your delivery?</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">Your feedback helps us improve the harvest experience.</p>
        </div>

        <ReviewForm
          onSubmit={(data) => {
            console.log('Review:', data);
            setReviewSubmitted(true);
            setTimeout(() => {
              navigate('/orders');
            }, 2000);
          }}
        />
      </div>
    );
  }

  if (reviewSubmitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] flex items-center justify-center mb-4 text-3xl">🌿</div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Thank You!</h2>
        <p className="text-[var(--color-text-secondary)] mt-2">Your feedback helps local farmers grow better.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 pb-24 animate-fade-in">
      {/* Header Info */}
      <div className="bg-[var(--color-surface)] p-5 rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-soft)] mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Order</p>
            <h2 className="text-xl font-black text-[var(--color-text-primary)]">{formatOrderId(order.orderNumber)}</h2>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Total</p>
            <p className="text-lg font-bold text-[var(--color-primary)]">{formatCurrency(order.total)}</p>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] pt-4">
           {/* Tracking Stepper */}
          <OrderStatusStepper currentStatus={order.status} />
        </div>
      </div>

      {/* Failure State */}
      {order.status === 'FAILED' && order.failureReason && (
        <div className="mb-6">
          <FailureReasonBanner
            reason={order.failureReason}
            onAction={() => alert('Action triggered')}
          />
        </div>
      )}

      {/* Items List */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-primary)] mb-3">Order Items</h3>
        <div className="space-y-3">
          {order.items?.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-[var(--color-elevated)] p-4 rounded-xl border border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-xs font-bold text-[var(--color-text-muted)]">
                  {item.quantity}x
                </div>
                <span className="text-sm font-bold text-[var(--color-text-primary)]">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      {isTerminal && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-surface)] border-t border-[var(--color-border)] safe-bottom max-w-lg mx-auto z-10 shadow-[var(--shadow-nav)]">
          {canReview ? (
            <button
              onClick={() => setShowReview(true)}
              className="w-full py-4 bg-[var(--color-primary)] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[var(--color-primary-hover)] transition-all cursor-pointer"
            >
              Rate Delivery
            </button>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="w-full py-4 bg-[var(--color-text-primary)] text-[var(--color-surface)] text-xs font-bold uppercase tracking-widest rounded-lg hover:opacity-90 transition-all cursor-pointer"
            >
              Back to Marketplace
            </button>
          )}
        </div>
      )}
    </div>
  );
}
