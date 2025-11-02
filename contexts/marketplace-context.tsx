/**
 * Marketplace Context
 * Manages listings, filters, search, and saved items
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ListingType = 'rental' | 'sale';
export type ListingCondition = 'new' | 'like-new' | 'good' | 'fair';
export type DeliveryOption = 'pickup' | 'delivery' | 'meet-halfway';
export type SortOption = 'distance' | 'price-low' | 'price-high' | 'rating' | 'newest';

export interface MarketplaceFilters {
  type: 'rental' | 'sale' | 'all';
  category: string;
  distance: number; // in miles
  priceRange: { min: number; max: number };
  depositRange?: { min: number; max: number }; // rental only
  condition: ListingCondition | 'all';
  verifiedOnly: boolean;
  deliveryOptions: DeliveryOption[];
  availability?: { start: Date; end: Date }; // rental only
}

interface MarketplaceContextValue {
  // Filters
  filters: MarketplaceFilters;
  updateFilters: (filters: Partial<MarketplaceFilters>) => void;
  resetFilters: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Saved listings
  savedListings: Set<string>;
  saveListing: (listingId: string) => Promise<void>;
  unsaveListing: (listingId: string) => Promise<void>;
  isSaved: (listingId: string) => boolean;

  // View mode
  viewMode: 'grid' | 'list' | 'map';
  setViewMode: (mode: 'grid' | 'list' | 'map') => void;

  // Sort
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;

  // Loading state
  isLoading: boolean;
}

const MarketplaceContext = createContext<MarketplaceContextValue | undefined>(undefined);

const DEFAULT_FILTERS: MarketplaceFilters = {
  type: 'all',
  category: 'all',
  distance: 25, // 25 miles default
  priceRange: { min: 0, max: 500 },
  depositRange: { min: 0, max: 500 },
  condition: 'all',
  verifiedOnly: false,
  deliveryOptions: ['pickup', 'delivery', 'meet-halfway'],
};

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<MarketplaceFilters>(DEFAULT_FILTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedListings, setSavedListings] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('distance');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved listings from AsyncStorage
  useEffect(() => {
    loadSavedListings();
  }, []);

  const loadSavedListings = async () => {
    try {
      const saved = await AsyncStorage.getItem('marketplace_saved_listings');
      if (saved) {
        setSavedListings(new Set(JSON.parse(saved)));
      }
    } catch (error) {
      console.error('Error loading saved listings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSavedListings = async (listings: Set<string>) => {
    try {
      await AsyncStorage.setItem(
        'marketplace_saved_listings',
        JSON.stringify(Array.from(listings))
      );
    } catch (error) {
      console.error('Error saving listings:', error);
    }
  };

  const updateFilters = (newFilters: Partial<MarketplaceFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const saveListing = async (listingId: string) => {
    const newSaved = new Set(savedListings);
    newSaved.add(listingId);
    setSavedListings(newSaved);
    await saveSavedListings(newSaved);
  };

  const unsaveListing = async (listingId: string) => {
    const newSaved = new Set(savedListings);
    newSaved.delete(listingId);
    setSavedListings(newSaved);
    await saveSavedListings(newSaved);
  };

  const isSaved = (listingId: string): boolean => {
    return savedListings.has(listingId);
  };

  return (
    <MarketplaceContext.Provider
      value={{
        filters,
        updateFilters,
        resetFilters,
        searchQuery,
        setSearchQuery,
        savedListings,
        saveListing,
        unsaveListing,
        isSaved,
        viewMode,
        setViewMode,
        sortBy,
        setSortBy,
        isLoading,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
