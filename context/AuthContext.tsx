'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  adminUsername: string | null;
  login: (username: string, pinOrPass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUsername, setAdminUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check saved session in localStorage
    try {
      const savedAuth = localStorage.getItem('salon_admin_auth');
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed.authenticated) {
          setIsAuthenticated(true);
          setAdminUsername(parsed.username || 'admin');
        }
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (username: string, pinOrPass: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: pinOrPass })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Invalid credentials' };
      }

      setIsAuthenticated(true);
      setAdminUsername(username);
      localStorage.setItem('salon_admin_auth', JSON.stringify({ authenticated: true, username }));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUsername(null);
    localStorage.removeItem('salon_admin_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminUsername, login, logout, isLoading }}>
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
