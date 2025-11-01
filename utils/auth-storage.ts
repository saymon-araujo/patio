/**
 * Auth Storage Helpers
 * Utilities for managing authentication state in AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { MockUser, UserRole } from './mock-data/auth';

// Storage keys
const KEYS = {
  ONBOARDING_COMPLETED: '@patio:onboarding_completed',
  AUTH_TOKEN: '@patio:auth_token',
  USER_PROFILE: '@patio:user_profile',
  USER_ROLES: '@patio:user_roles',
} as const;

// Onboarding
export const getOnboardingStatus = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(KEYS.ONBOARDING_COMPLETED);
    return value === 'true';
  } catch (error) {
    console.error('Error reading onboarding status:', error);
    return false;
  }
};

export const setOnboardingCompleted = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.ONBOARDING_COMPLETED, 'true');
  } catch (error) {
    console.error('Error setting onboarding status:', error);
  }
};

// Auth Token
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error reading auth token:', error);
    return null;
  }
};

export const setAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.AUTH_TOKEN, token);
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
};

export const clearAuthToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error clearing auth token:', error);
  }
};

// User Profile
export const getUserProfile = async (): Promise<MockUser | null> => {
  try {
    const value = await AsyncStorage.getItem(KEYS.USER_PROFILE);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error reading user profile:', error);
    return null;
  }
};

export const setUserProfile = async (user: MockUser): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(user));
  } catch (error) {
    console.error('Error setting user profile:', error);
  }
};

export const clearUserProfile = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(KEYS.USER_PROFILE);
  } catch (error) {
    console.error('Error clearing user profile:', error);
  }
};

// User Roles
export const getUserRoles = async (): Promise<UserRole[]> => {
  try {
    const value = await AsyncStorage.getItem(KEYS.USER_ROLES);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    console.error('Error reading user roles:', error);
    return [];
  }
};

export const setUserRoles = async (roles: UserRole[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.USER_ROLES, JSON.stringify(roles));
  } catch (error) {
    console.error('Error setting user roles:', error);
  }
};

// Clear all auth data (for logout)
export const clearAllAuthData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      KEYS.AUTH_TOKEN,
      KEYS.USER_PROFILE,
      KEYS.USER_ROLES,
    ]);
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};
