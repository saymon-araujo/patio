/**
 * Mock Authentication Data
 * This file contains mock user data and authentication functions for prototype development.
 * No real API calls are made - all operations are simulated with setTimeout.
 */

export type UserRole = 'learner' | 'renter' | 'owner' | 'leader';

export interface MockUser {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar: string;
  roles: UserRole[];
  onboardingCompleted: boolean;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

// Default mock user for testing
export const MOCK_USER: MockUser = {
  id: 'user-1',
  email: 'demo@patio.so',
  name: 'Alex Martinez',
  username: 'alexdiy',
  avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Alex',
  roles: ['learner', 'renter'],
  onboardingCompleted: true,
};

// Mock authentication responses
export interface AuthResponse {
  success: boolean;
  user?: MockUser;
  token?: string;
  error?: string;
}

/**
 * Simulates a login API call
 * Valid credentials: email=demo@patio.so, password=password
 */
export const mockLogin = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (email === 'demo@patio.so' && password === 'password') {
    return {
      success: true,
      user: MOCK_USER,
      token: 'mock-jwt-token-' + Date.now(),
    };
  }

  return {
    success: false,
    error: 'Invalid email or password',
  };
};

/**
 * Simulates a signup API call
 */
export const mockSignup = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Create a new mock user
  const newUser: MockUser = {
    id: 'user-' + Date.now(),
    email: data.email,
    name: data.name,
    username: data.email.split('@')[0],
    avatar: `https://api.dicebear.com/7.x/avataaars/png?seed=${data.name}`,
    roles: [],
    onboardingCompleted: false,
  };

  return {
    success: true,
    user: newUser,
    token: 'mock-jwt-token-' + Date.now(),
  };
};

/**
 * Simulates a social login API call (Google/Apple)
 */
export const mockSocialLogin = async (
  provider: 'google' | 'apple'
): Promise<AuthResponse> => {
  // Simulate OAuth flow delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const socialUser: MockUser = {
    id: 'user-social-' + Date.now(),
    email: `${provider}user@example.com`,
    name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
    username: `${provider}user`,
    avatar: `https://api.dicebear.com/7.x/avataaars/png?seed=${provider}`,
    roles: [],
    onboardingCompleted: false,
  };

  return {
    success: true,
    user: socialUser,
    token: 'mock-jwt-token-' + Date.now(),
  };
};

/**
 * Simulates a forgot password API call
 */
export const mockForgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: `Password reset link has been sent to ${email}`,
  };
};

/**
 * Simulates updating user roles
 */
export const mockUpdateRoles = async (roles: UserRole[]): Promise<{ success: boolean }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
  };
};

/**
 * Simulates updating user location
 */
export const mockUpdateLocation = async (location: {
  latitude: number;
  longitude: number;
  address: string;
}): Promise<{ success: boolean }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
  };
};
