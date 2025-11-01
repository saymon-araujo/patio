/**
 * Auth Context
 * Manages authentication state across the app
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { MockUser, UserRole } from '@/utils/mock-data/auth';
import {
  mockLogin,
  mockSignup,
  mockSocialLogin,
  mockUpdateRoles,
  type AuthResponse,
} from '@/utils/mock-data/auth';
import {
  getAuthToken,
  setAuthToken,
  clearAuthToken,
  getUserProfile,
  setUserProfile,
  clearAllAuthData,
  getUserRoles,
  setUserRoles,
} from '@/utils/auth-storage';

interface AuthContextValue {
  user: MockUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (name: string, email: string, password: string) => Promise<AuthResponse>;
  socialLogin: (provider: 'google' | 'apple') => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateUser: (user: MockUser) => Promise<void>;
  updateUserRoles: (roles: UserRole[]) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state from storage on mount
  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        getAuthToken(),
        getUserProfile(),
      ]);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await mockLogin(email, password);

    if (response.success && response.user && response.token) {
      setUser(response.user);
      setToken(response.token);
      await setAuthToken(response.token);
      await setUserProfile(response.user);
    }

    return response;
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const response = await mockSignup({ name, email, password });

    if (response.success && response.user && response.token) {
      setUser(response.user);
      setToken(response.token);
      await setAuthToken(response.token);
      await setUserProfile(response.user);
    }

    return response;
  };

  const socialLogin = async (provider: 'google' | 'apple'): Promise<AuthResponse> => {
    const response = await mockSocialLogin(provider);

    if (response.success && response.user && response.token) {
      setUser(response.user);
      setToken(response.token);
      await setAuthToken(response.token);
      await setUserProfile(response.user);
    }

    return response;
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await clearAllAuthData();
  };

  const updateUser = async (updatedUser: MockUser) => {
    setUser(updatedUser);
    await setUserProfile(updatedUser);
  };

  const updateUserRoles = async (roles: UserRole[]) => {
    if (!user) return;

    // Update local state
    const updatedUser = { ...user, roles };
    setUser(updatedUser);

    // Persist to storage
    await setUserProfile(updatedUser);
    await setUserRoles(roles);

    // Simulate API call
    await mockUpdateRoles(roles);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        signup,
        socialLogin,
        logout,
        updateUser,
        updateUserRoles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
