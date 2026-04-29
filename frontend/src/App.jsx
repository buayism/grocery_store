import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import { ToastProvider } from './components/common/Toast';

// Layouts
import MobileLayout from './components/layout/MobileLayout';

// Pages
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import DeliveryDetailsPage from './pages/DeliveryDetailsPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import OrdersPage from './pages/OrdersPage';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default function App() {
  const { checkAuth } = useAuthStore();
  const { initTheme } = useThemeStore();

  useEffect(() => {
    checkAuth();
    initTheme();
  }, [checkAuth, initTheme]);

  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected Routes inside Mobile Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MobileLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="delivery-details" element={<DeliveryDetailsPage />} />
            <Route path="order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            <Route path="order-tracking/:orderId" element={<OrderTrackingPage />} />
            <Route path="orders" element={<OrdersPage />} />
            
            {/* Profile placeholder */}
            <Route path="profile" element={
              <div className="p-6 text-center">
                <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Profile Page</h2>
                <p className="text-[var(--color-text-secondary)] mt-2">Coming soon</p>
                <button 
                  onClick={() => useAuthStore.getState().logout()}
                  className="mt-6 px-4 py-2 bg-[var(--color-error)] text-white rounded-lg cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            } />
          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
