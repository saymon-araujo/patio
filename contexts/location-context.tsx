/**
 * Location Context
 * Manages location permissions and coordinates
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as Location from 'expo-location';

export interface Coordinates {
  latitude: number;
  longitude: number;
  address?: string;
}

interface LocationContextValue {
  coordinates: Coordinates | null;
  userLocation: { lat: number; lng: number } | null; // Alias for distance calculator
  permissionStatus: Location.PermissionStatus | null;
  isLoading: boolean;
  requestPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<Coordinates | null>;
  setLocation: (coords: Coordinates) => void;
}

const LocationContext = createContext<LocationContextValue | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestPermission = async (): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Request foreground location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);

      if (status === Location.PermissionStatus.GRANTED) {
        // Get current location
        const location = await getCurrentLocation();
        return !!location;
      }

      return false;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = async (): Promise<Coordinates | null> => {
    try {
      setIsLoading(true);

      // Check if we have permission
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED) {
        return null;
      }

      // Get current position
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const coords: Coordinates = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      // Try to get address (reverse geocoding)
      try {
        const addresses = await Location.reverseGeocodeAsync({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        if (addresses && addresses.length > 0) {
          const addr = addresses[0];
          coords.address = [
            addr.street,
            addr.city,
            addr.region,
            addr.postalCode,
            addr.country,
          ]
            .filter(Boolean)
            .join(', ');
        }
      } catch (geocodeError) {
        console.log('Could not get address:', geocodeError);
      }

      setCoordinates(coords);
      return coords;
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const setLocation = (coords: Coordinates) => {
    setCoordinates(coords);
  };

  // Create userLocation alias for distance calculator
  const userLocation = coordinates
    ? { lat: coordinates.latitude, lng: coordinates.longitude }
    : null;

  return (
    <LocationContext.Provider
      value={{
        coordinates,
        userLocation,
        permissionStatus,
        isLoading,
        requestPermission,
        getCurrentLocation,
        setLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
