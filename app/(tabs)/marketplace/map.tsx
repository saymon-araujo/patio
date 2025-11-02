/**
 * Map View Screen
 * Interactive map with clustered listing markers using expo-maps
 */

import React, { useState, useRef, useMemo, useCallback } from 'react';
import { router } from 'expo-router';
import { Platform, Dimensions } from 'react-native';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Pressable } from '@/components/ui/pressable';
import { Header } from '@/components/navigation/header';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import Supercluster from 'supercluster';
import { MapPin, Navigation, Star } from 'lucide-react-native';
import { useLocation } from '@/contexts/location-context';
import { MOCK_LISTINGS, getListingById } from '@/utils/mock-data/listings';
import { Modal, ModalBackdrop, ModalContent, ModalBody } from '@/components/ui/modal';

const { width, height } = Dimensions.get('window');

// Default to San Francisco if no user location
const DEFAULT_COORDINATES = {
  latitude: 37.7749,
  longitude: -122.4194,
};

const DEFAULT_ZOOM = 12;

type MarkerData = {
  id: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  title: string;
  snippet?: string;
  color?: string;
  isCluster?: boolean;
  clusterCount?: number;
  pointIndices?: number[];
};

export default function MapViewScreen() {
  const { userLocation } = useLocation();
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Camera state
  const [camera, setCamera] = useState({
    coordinates: userLocation || DEFAULT_COORDINATES,
    zoom: DEFAULT_ZOOM,
  });

  // Prepare points for clustering
  const points = useMemo(() => {
    return MOCK_LISTINGS.filter((listing) => listing.status === 'active').map((listing, index) => ({
      type: 'Feature' as const,
      properties: {
        cluster: false,
        listingId: listing.id,
        listingType: listing.type,
        index,
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [listing.location.lng, listing.location.lat],
      },
    }));
  }, []);

  // Initialize Supercluster
  const supercluster = useMemo(() => {
    const cluster = new Supercluster({
      radius: 60,
      maxZoom: 20,
      minZoom: 0,
    });
    cluster.load(points);
    return cluster;
  }, [points]);

  // Get clusters for current viewport
  const clusters = useMemo(() => {
    const zoom = Math.floor(camera.zoom);
    const { coordinates } = camera;

    // Calculate bounding box from center and zoom
    const latDelta = 180 / Math.pow(2, zoom);
    const lngDelta = 360 / Math.pow(2, zoom);

    const bbox = [
      coordinates.longitude - lngDelta / 2, // west
      coordinates.latitude - latDelta / 2, // south
      coordinates.longitude + lngDelta / 2, // east
      coordinates.latitude + latDelta / 2, // north
    ] as [number, number, number, number];

    return supercluster.getClusters(bbox, zoom);
  }, [camera, supercluster]);

  // Convert clusters to markers
  const markers: MarkerData[] = useMemo(() => {
    return clusters.map((cluster) => {
      const [longitude, latitude] = cluster.geometry.coordinates;

      if (cluster.properties.cluster) {
        // Cluster marker
        return {
          id: `cluster-${cluster.properties.cluster_id}`,
          coordinates: { latitude, longitude },
          title: `${cluster.properties.point_count} tools`,
          isCluster: true,
          clusterCount: cluster.properties.point_count,
          color: '#0066FF', // primary-500
        };
      } else {
        // Individual listing marker
        const listing = getListingById(cluster.properties.listingId);
        return {
          id: cluster.properties.listingId,
          coordinates: { latitude, longitude },
          title: listing?.title || 'Tool',
          snippet: listing?.type === 'rental' ? `$${listing.dailyRate}/day` : `$${listing.price}`,
          color: listing?.type === 'rental' ? '#0066FF' : '#348352', // primary-500 : success-500
          isCluster: false,
        };
      }
    });
  }, [clusters]);

  const handleMarkerClick = useCallback(
    (marker: any) => {
      const markerData = markers.find((m) => m.id === marker.id);
      if (!markerData) return;

      if (markerData.isCluster) {
        // Zoom into cluster
        const cluster = clusters.find((c) =>
          c.properties.cluster && `cluster-${c.properties.cluster_id}` === marker.id
        );
        if (cluster) {
          const expansionZoom = Math.min(
            supercluster.getClusterExpansionZoom(cluster.properties.cluster_id),
            20
          );
          setCamera({
            coordinates: markerData.coordinates,
            zoom: expansionZoom,
          });
        }
      } else {
        // Show listing details
        setSelectedListingId(marker.id);
        setShowModal(true);
      }
    },
    [markers, clusters, supercluster]
  );

  const handleCameraMove = useCallback((event: any) => {
    if (event.cameraPosition) {
      setCamera({
        coordinates: event.cameraPosition.coordinates,
        zoom: event.cameraPosition.zoom,
      });
    }
  }, []);

  const handleRecenterMap = () => {
    if (userLocation) {
      setCamera({
        coordinates: userLocation,
        zoom: DEFAULT_ZOOM,
      });
    }
  };

  const handleViewListing = () => {
    if (selectedListingId) {
      setShowModal(false);
      router.push(`/marketplace/listing/${selectedListingId}`);
    }
  };

  const selectedListing = selectedListingId ? getListingById(selectedListingId) : null;

  // Map properties common to both platforms
  const mapProps = {
    style: { width, height: height - 100 },
    cameraPosition: {
      coordinates: camera.coordinates,
      zoom: camera.zoom,
    },
    markers,
    onCameraMove: handleCameraMove,
    onMarkerClick: handleMarkerClick,
    properties: {
      isMyLocationEnabled: true,
    },
    uiSettings: {
      compassEnabled: true,
      zoomControlsEnabled: Platform.OS === 'android',
    },
  };

  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-white">
        <Header variant="navigation" title="Map View" onBack={() => router.back()} />
      </SafeAreaView>

      <Box className="flex-1">
        {Platform.OS === 'ios' ? (
          <AppleMaps.View {...mapProps} />
        ) : (
          <GoogleMaps.View {...mapProps} />
        )}

        {/* Recenter Button */}
        <Box className="absolute top-4 right-4">
          <Pressable onPress={handleRecenterMap}>
            <Box className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg border border-outline-200">
              <Navigation size={20} className="text-primary-600" />
            </Box>
          </Pressable>
        </Box>

        {/* Listings Count */}
        <Box className="absolute top-4 left-4">
          <Box className="bg-white px-4 py-2 rounded-full shadow-lg border border-outline-200">
            <Text className="font-semibold text-typography-950">{points.length} tools</Text>
          </Box>
        </Box>
      </Box>

      {/* Listing Quick Preview Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
        <ModalBackdrop />
        <ModalContent>
          <ModalBody>
            <Box className="p-4">
              {selectedListing && (
                <VStack className="gap-4">
                  {/* Listing Preview */}
                  <HStack className="gap-3">
                    <Box className="w-24 h-24 bg-background-100 rounded-lg" />
                    <VStack className="flex-1 gap-1">
                      <Text className="font-semibold text-typography-950 text-lg">
                        {selectedListing.title}
                      </Text>
                      <Text size="sm" className="text-typography-600">
                        {selectedListing.category}
                      </Text>
                      <HStack className="items-center gap-2 mt-1">
                        <Text className="font-bold text-primary-600 text-lg">
                          {selectedListing.type === 'rental'
                            ? `$${selectedListing.dailyRate}/day`
                            : `$${selectedListing.price}`}
                        </Text>
                        <HStack className="items-center gap-1">
                          <Star size={14} className="text-warning-500" fill="#F97316" />
                          <Text size="sm" className="text-typography-700">
                            {selectedListing.rating}
                          </Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </HStack>

                  {/* Owner & Location */}
                  <HStack className="gap-2">
                    <Badge action="info">
                      <BadgeText>{selectedListing.location.neighborhood}</BadgeText>
                    </Badge>
                    {selectedListing.verification.idVerified && (
                      <Badge action="success">
                        <BadgeText>Verified</BadgeText>
                      </Badge>
                    )}
                  </HStack>

                  {/* Actions */}
                  <HStack className="gap-3">
                    <Button variant="outline" className="flex-1" onPress={() => setShowModal(false)}>
                      <ButtonText>Close</ButtonText>
                    </Button>
                    <Button className="flex-1" onPress={handleViewListing}>
                      <ButtonText>View Details</ButtonText>
                    </Button>
                  </HStack>
                </VStack>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
