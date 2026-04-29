import React, { useState, createContext, useContext, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 left-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const toastConfig = {
  success: { icon: CheckCircle, colorVar: '--color-success' },
  error: { icon: AlertCircle, colorVar: '--color-error' },
  info: { icon: Info, colorVar: '--color-info' },
};

function Toast({ toast, onDismiss }) {
  const config = toastConfig[toast.type] || toastConfig.info;
  const Icon = config.icon;

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] pointer-events-auto animate-slide-up shadow-[var(--shadow-elevated)]"
    >
      <Icon className="w-5 h-5 flex-shrink-0" style={{ color: `var(${config.colorVar})` }} />
      <p className="text-sm font-medium text-[var(--color-text-primary)] flex-1">
        {toast.message}
      </p>
      <button onClick={onDismiss} className="p-1 rounded-full hover:bg-[var(--color-border)] cursor-pointer">
        <X className="w-4 h-4 text-[var(--color-text-muted)]" />
      </button>
    </div>
  );
}
