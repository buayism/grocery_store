// Order status flow
export const ORDER_STATUSES = {
  PLACED: { label: 'Order Placed', icon: '📋', color: 'info', step: 1 },
  CONFIRMED: { label: 'Confirmed', icon: '✅', color: 'success', step: 2 },
  PREPARING: { label: 'Preparing', icon: '🥬', color: 'warning', step: 3 },
  OUT_FOR_DELIVERY: { label: 'Out for Delivery', icon: '🚗', color: 'cta', step: 4 },
  DELIVERED: { label: 'Delivered', icon: '🎉', color: 'success', step: 5 },
  FAILED: { label: 'Failed', icon: '❌', color: 'error', step: -1 },
  CANCELLED: { label: 'Cancelled', icon: '🚫', color: 'muted', step: -1 },
};

export const TERMINAL_STATUSES = ['DELIVERED', 'FAILED', 'CANCELLED'];

export const FAILURE_MESSAGES = {
  CUSTOMER_NOT_AVAILABLE: {
    title: "We couldn't reach you",
    message: 'We tried to deliver but couldn\'t reach you. Would you like to reschedule?',
    action: 'Reschedule Delivery',
  },
  CUSTOMER_REJECTED: {
    title: 'Delivery rejected',
    message: 'You chose not to accept this delivery. If there was an issue, please let us know.',
    action: 'Give Feedback',
  },
  ADDRESS_NOT_FOUND: {
    title: 'Address not found',
    message: "Our delivery person couldn't locate your address. Please update your delivery details.",
    action: 'Update Address',
  },
  FARMER_CANCELLED: {
    title: "Order couldn't be fulfilled",
    message: "Unfortunately, the farmer couldn't fulfill this order. We're sorry for the inconvenience.",
    action: 'Browse Similar Products',
  },
};

export const CATEGORIES = [
  { id: 'all', label: 'All Harvest', emoji: '🌾' },
  { id: 'leafy-greens', label: 'Leafy Vegetables', emoji: '🥬' },
  { id: 'fruits', label: 'Fruits', emoji: '🍎' },
  { id: 'roots', label: 'Roots & Tubers', emoji: '🥕' },
  { id: 'herbs', label: 'Herbs', emoji: '🌿' },
  { id: 'vegetables', label: 'Vegetables', emoji: '🥦' },
  { id: 'others', label: 'Others', emoji: '🍄' },
];

export const STOCK_LEVELS = {
  HIGH: { label: 'High', dotClass: 'bg-[var(--color-success)]' },
  LOW: { label: 'Low', dotClass: 'bg-[var(--color-warning)]' },
  LIMITED: { label: 'Limited', dotClass: 'bg-[var(--color-error)]' },
  SEASONAL: { label: 'Seasonal', dotClass: 'bg-[var(--color-info)]' },
  OUT_OF_STOCK: { label: 'Out of Stock', dotClass: 'bg-[var(--color-text-muted)]' },
};
