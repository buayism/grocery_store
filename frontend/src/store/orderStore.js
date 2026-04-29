import { create } from 'zustand';

export const useOrderStore = create((set) => ({
  activeOrder: null,
  orders: [],
  loading: false,
  error: null,

  setActiveOrder: (order) => set({ activeOrder: order }),
  setOrders: (orders) => set({ orders }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchOrders: async () => {
    set({ loading: true });
    // Mock fetch
    setTimeout(() => {
      set({ loading: false });
    }, 500);
  },

  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status } : o
      ),
      activeOrder:
        state.activeOrder?.id === orderId
          ? { ...state.activeOrder, status }
          : state.activeOrder,
    })),
}));
