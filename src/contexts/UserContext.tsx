import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ROUTES } from '@/services/utils';

interface User {
  id: string;
  username: string;
  email: string;
  is_host: boolean;
  role: 'host' | 'player' | 'admin';
  // Add other user properties as needed
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  refetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [serverDown, setServerDown] = useState(false);
  const navigate = useNavigate();
  const location = window.location;

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await authService.checkAuth();
      
      if (response.serverDown) {
        setServerDown(true);
        setError(new Error(response.error));
        if (location.pathname !== '/error') {
          navigate(ROUTES.ERROR);
        }
        return;
      }

      if (response.isAuthenticated && response.user) {
        // Map backend user fields to User object
        setUser({
          id: String(response.user.id),
          username: response.user.name,
          email: response.user.email,
          is_host: !!response.user.is_host,
          role: response.user.is_host ? 'host' : 'player',
        });
        setServerDown(false);
      }
    } catch (err) {
      setError(err as Error);
      setServerDown(true);
      if (location.pathname !== ROUTES.ERROR) {
        navigate(ROUTES.ERROR);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    // Prevent navigation to other routes if server is down
    if (serverDown && location.pathname !== ROUTES.ERROR) {
      navigate(ROUTES.ERROR);
    }
  }, [serverDown, location.pathname, navigate]);

  const value = {
    user,
    loading,
    error,
    serverDown,
    refetchUser: fetchUser,
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
