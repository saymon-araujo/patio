/**
 * Listing Card Component
 * Enhanced listing display card with photo, owner info, and save button
 */

import React from 'react';
import { router } from 'expo-router';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Pressable } from '@/components/ui/pressable';
import { Image } from 'expo-image';
import { Heart, MapPin, Star } from 'lucide-react-native';
import type { Listing } from '@/utils/mock-data/listings';
import { useMarketplace } from '@/contexts/marketplace-context';

interface ListingCardProps {
  listing: Listing & { distance?: number };
  variant?: 'grid' | 'list';
}

export function ListingCard({ listing, variant = 'list' }: ListingCardProps) {
  const { isSaved, saveListing, unsaveListing } = useMarketplace();
  const saved = isSaved(listing.id);

  const handleToggleSave = async (e: any) => {
    e.stopPropagation();
    if (saved) {
      await unsaveListing(listing.id);
    } else {
      await saveListing(listing.id);
    }
  };

  const handlePress = () => {
    router.push(`/marketplace/listing/${listing.id}`);
  };

  return (
    <Pressable onPress={handlePress}>
      <Box className="bg-white rounded-lg overflow-hidden border border-outline-200">
        {/* Photo */}
        <Box className="relative">
          <Box style={{ height: variant === 'grid' ? 150 : 120 }}>
            <Image
              source={{ uri: listing.photos[0] }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
          </Box>

          {/* Save Button */}
          <Pressable onPress={handleToggleSave} className="absolute top-2 right-2">
            <Box className="w-9 h-9 bg-white/90 rounded-full items-center justify-center">
              <Heart
                size={20}
                className={saved ? 'text-error-500' : 'text-typography-400'}
                fill={saved ? '#E63535' : 'transparent'}
              />
            </Box>
          </Pressable>

          {/* Type Badge */}
          <Box className="absolute top-2 left-2">
            <Box
              className={`px-2 py-1 rounded ${
                listing.type === 'rental' ? 'bg-primary-500' : 'bg-success-500'
              }`}
            >
              <Text size="xs" className="text-white font-semibold">
                {listing.type === 'rental' ? 'RENT' : 'SALE'}
              </Text>
            </Box>
          </Box>

          {/* Available Indicator */}
          {listing.status === 'active' && (
            <Box className="absolute bottom-2 left-2">
              <Box className="px-2 py-1 bg-success-500 rounded">
                <Text size="xs" className="text-white font-semibold">
                  Available
                </Text>
              </Box>
            </Box>
          )}
        </Box>

        {/* Content */}
        <VStack className="p-3 gap-2">
          <VStack className="gap-1">
            <Text className="font-semibold text-typography-950" numberOfLines={2}>
              {listing.title}
            </Text>
            <Text size="sm" className="text-typography-600">
              {listing.category}
            </Text>
          </VStack>

          {/* Price & Rating */}
          <HStack className="items-center justify-between">
            <Text className="font-bold text-primary-600 text-lg">
              {listing.type === 'rental' ? `$${listing.dailyRate}/day` : `$${listing.price}`}
            </Text>
            <HStack className="items-center gap-1">
              <Star size={14} className="text-warning-500" fill="#F97316" />
              <Text size="sm" className="text-typography-700">
                {listing.rating}
              </Text>
            </HStack>
          </HStack>

          {/* Owner & Location */}
          <HStack className="items-center justify-between">
            <HStack className="items-center gap-2">
              <Avatar size="xs">
                <AvatarImage source={{ uri: listing.owner.avatar }} />
              </Avatar>
              <Text size="sm" className="text-typography-600">
                {listing.owner.name}
              </Text>
            </HStack>

            {listing.distance !== undefined && (
              <HStack className="items-center gap-1">
                <MapPin size={12} className="text-typography-400" />
                <Text size="xs" className="text-typography-500">
                  {listing.distance} mi
                </Text>
              </HStack>
            )}
          </HStack>

          {/* Badges */}
          {(listing.isNew || listing.verification.idVerified) && (
            <HStack className="gap-2">
              {listing.isNew && (
                <Badge action="success">
                  <BadgeText>NEW</BadgeText>
                </Badge>
              )}
              {listing.verification.idVerified && (
                <Badge action="info">
                  <BadgeText>Verified</BadgeText>
                </Badge>
              )}
            </HStack>
          )}
        </VStack>
      </Box>
    </Pressable>
  );
}
