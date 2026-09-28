import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthSession } from '../types/user';
import { CURRENT_USER, MOCK_USERS } from '../data/mockData';

interface AuthContextType extends AuthSession {
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, team?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchUser: (userId: string) => void;
  availableUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('syncdoc_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return CURRENT_USER;
      }
    }
    return CURRENT_USER;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('syncdoc_token') || 'mock_jwt_token_development';
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('syncdoc_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('syncdoc_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('syncdoc_token', token);
    } else {
      localStorage.removeItem('syncdoc_token');
    }
  }, [token]);

  const login = async (email: string, _password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // BACKEND_INTEGRATION_POINT: Connect to POST /api/auth/login
    await new Promise((res) => setTimeout(res, 600)); // simulate network latency
    setIsLoading(false);

    const matchedUser = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (matchedUser) {
      setUser(matchedUser);
      setToken(`mock_jwt_${matchedUser.id}_${Date.now()}`);
      return { success: true };
    }

    // Default mock fallback for test credentials
    const fallbackUser: User = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0] || 'Engineer',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'editor',
      team: 'Engineering',
      color: '#3b82f6',
    };
    setUser(fallbackUser);
    setToken(`mock_jwt_${fallbackUser.id}_${Date.now()}`);
    return { success: true };
  };

  const register = async (name: string, email: string, _password: string, team?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // BACKEND_INTEGRATION_POINT: Connect to POST /api/auth/register
    await new Promise((res) => setTimeout(res, 700));
    setIsLoading(false);

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'editor',
      team: team || 'Core Engineering',
      color: '#3b82f6',
    };
    setUser(newUser);
    setToken(`mock_jwt_${newUser.id}_${Date.now()}`);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('syncdoc_user');
    localStorage.removeItem('syncdoc_token');
  };

  const switchUser = (userId: string) => {
    const found = MOCK_USERS.find((u) => u.id === userId);
    if (found) {
      setUser(found);
      setToken(`mock_jwt_${found.id}_${Date.now()}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        switchUser,
        availableUsers: MOCK_USERS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
