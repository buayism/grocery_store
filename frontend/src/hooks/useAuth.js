import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const { user, token, isAuthenticated, loading, setAuth, logout, setLoading } =
    useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    loading,
    setAuth,
    logout,
    setLoading,
  };
}
