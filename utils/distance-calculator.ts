/**
 * Distance Calculator Utility
 * Functions for calculating geographic distances
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in miles
 */
export const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = toRadians(coord2.lat - coord1.lat);
  const dLng = toRadians(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.lat)) *
      Math.cos(toRadians(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
};

/**
 * Convert degrees to radians
 */
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Convert miles to kilometers
 */
export const milesToKilometers = (miles: number): number => {
  return Math.round(miles * 1.60934 * 10) / 10;
};

/**
 * Convert kilometers to miles
 */
export const kilometersToMiles = (km: number): number => {
  return Math.round(km * 0.621371 * 10) / 10;
};

/**
 * Format distance for display
 */
export const formatDistance = (distance: number, unit: 'mi' | 'km' = 'mi'): string => {
  if (distance < 0.1) {
    return 'Nearby';
  }
  return `${distance} ${unit}`;
};

/**
 * Check if listing is within search radius
 */
export const isWithinRadius = (
  userLocation: Coordinates,
  listingLocation: Coordinates,
  radiusMiles: number
): boolean => {
  const distance = calculateDistance(userLocation, listingLocation);
  return distance <= radiusMiles;
};

/**
 * Sort listings by distance from user
 */
export const sortByDistance = <T extends { location: { lat: number; lng: number } }>(
  listings: T[],
  userLocation: Coordinates
): (T & { distance: number })[] => {
  return listings
    .map((listing) => ({
      ...listing,
      distance: calculateDistance(userLocation, {
        lat: listing.location.lat,
        lng: listing.location.lng,
      }),
    }))
    .sort((a, b) => a.distance - b.distance);
};

/**
 * Filter listings by distance radius
 */
export const filterByRadius = <T extends { location: { lat: number; lng: number } }>(
  listings: T[],
  userLocation: Coordinates,
  radiusMiles: number
): (T & { distance: number })[] => {
  return listings
    .map((listing) => ({
      ...listing,
      distance: calculateDistance(userLocation, {
        lat: listing.location.lat,
        lng: listing.location.lng,
      }),
    }))
    .filter((listing) => listing.distance <= radiusMiles)
    .sort((a, b) => a.distance - b.distance);
};

/**
 * Get distance category for display
 */
export const getDistanceCategory = (distance: number): string => {
  if (distance < 0.5) return 'Very Close';
  if (distance < 2) return 'Nearby';
  if (distance < 5) return 'Close';
  if (distance < 10) return 'Moderate';
  if (distance < 25) return 'Far';
  return 'Very Far';
};

/**
 * Calculate bounding box for map view
 * Returns coordinates for NE and SW corners
 */
export const getBoundingBox = (
  center: Coordinates,
  radiusMiles: number
): {
  northeast: Coordinates;
  southwest: Coordinates;
} => {
  const radiusDegrees = radiusMiles / 69; // Rough conversion: 1 degree ≈ 69 miles

  return {
    northeast: {
      lat: center.lat + radiusDegrees,
      lng: center.lng + radiusDegrees,
    },
    southwest: {
      lat: center.lat - radiusDegrees,
      lng: center.lng - radiusDegrees,
    },
  };
};

/**
 * Calculate midpoint between two coordinates
 */
export const getMidpoint = (coord1: Coordinates, coord2: Coordinates): Coordinates => {
  return {
    lat: (coord1.lat + coord2.lat) / 2,
    lng: (coord1.lng + coord2.lng) / 2,
  };
};
