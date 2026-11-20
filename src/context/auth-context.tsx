'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email?: string; password?: string; role?: UserRole }) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => Promise<void>;
  switchDemoUser: (role: UserRole) => Promise<User | null>;
  demoUsers: { role: UserRole; name: string; email: string; title: string; portalUrl: string }[];
}

const DEMO_USERS: { role: UserRole; name: string; email: string; title: string; portalUrl: string }[] = [
  {
    role: 'admin',
    name: 'Dr. Tariq Al-Mansoor',
    email: 'admin@giflri.org',
    title: 'Executive Director & Chief Registrar',
    portalUrl: '/admin',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_STORAGE_KEY = 'giflri_session_user';
const SESSION_TOKEN_KEY = 'giflri_session_token';
const OLD_STORAGE_KEY = 'giflri_auth_user';
const OLD_TOKEN_KEY = 'giflri_auth_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from sessionStorage only for the active session, clear persistent localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // Clear persistent localStorage to ensure visiting /admin requires explicit login
        localStorage.removeItem(OLD_STORAGE_KEY);
        localStorage.removeItem(OLD_TOKEN_KEY);

        const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
        } else {
          setUser(null);
        }
      }
    } catch (e) {
      console.error('Failed to parse stored auth user:', e);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async ({ email, password, role }: { email?: string; password?: string; role?: UserRole }) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();
      const userData = data.data || data.user;

      if (data.success && userData) {
        setUser(userData);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userData));
          if (data.token) {
            sessionStorage.setItem(SESSION_TOKEN_KEY, data.token);
          }
        }
        return { success: true, user: userData };
      }
      return { success: false, error: data.error || 'Authentication failed' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during login' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    } finally {
      setUser(null);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        sessionStorage.removeItem(SESSION_TOKEN_KEY);
        localStorage.removeItem(OLD_STORAGE_KEY);
        localStorage.removeItem(OLD_TOKEN_KEY);
      }
      setIsLoading(false);
    }
  }, []);

  const switchDemoUser = useCallback(async (role: UserRole) => {
    const demo = DEMO_USERS.find((d) => d.role === role);
    if (!demo) return null;

    const res = await login({ email: demo.email, role });
    if (res.success && res.user) {
      return res.user;
    }
    return null;
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchDemoUser,
        demoUsers: DEMO_USERS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

