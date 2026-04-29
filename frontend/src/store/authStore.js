import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('auth-token') || null,
  isAuthenticated: !!localStorage.getItem('auth-token'),
  loading: false,

  setAuth: (user, token) => {
    localStorage.setItem('auth-token', token);
    set({ user, token, isAuthenticated: true });
  },

  checkAuth: () => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      set({ isAuthenticated: true });
    } else {
      set({ isAuthenticated: false, user: null, token: null });
    }
  },

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem('auth-token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  setLoading: (loading) => set({ loading }),
}));
