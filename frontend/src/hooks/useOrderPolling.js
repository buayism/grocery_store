import { useState, useEffect, useRef, useCallback } from 'react';
import { getOrderTracking } from '../api/orders.api';
import { TERMINAL_STATUSES } from '../utils/constants';

export function useOrderPolling(orderId, intervalMs = 10000) {
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);
  const backoffRef = useRef(intervalMs);

  const poll = useCallback(async () => {
    if (!orderId) return;
    try {
      const data = await getOrderTracking(orderId);
      setTracking(data);
      setError(null);
      backoffRef.current = intervalMs; // Reset backoff on success

      if (TERMINAL_STATUSES.includes(data.status)) {
        clearInterval(intervalRef.current);
      }
    } catch (err) {
      setError(err);
      // Exponential backoff on error, cap at 60s
      backoffRef.current = Math.min(backoffRef.current * 2, 60000);
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(poll, backoffRef.current);
    } finally {
      setLoading(false);
    }
  }, [orderId, intervalMs]);

  useEffect(() => {
    if (!orderId) return;

    poll();
    intervalRef.current = setInterval(poll, intervalMs);

    // Pause polling when tab is hidden
    const handleVisibility = () => {
      if (document.hidden) {
        clearInterval(intervalRef.current);
      } else {
        poll();
        intervalRef.current = setInterval(poll, backoffRef.current);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [orderId, intervalMs, poll]);

  return { tracking, loading, error, refetch: poll };
}
