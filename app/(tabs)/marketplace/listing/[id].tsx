/**
 * Listing Detail Screen
 * Full listing details with gallery, owner info, reviews, and booking CTA
 */

import React, { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Box } from '@/components/ui/box';
import { ScrollView } from '@/components/ui/scroll-view';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Pressable } from '@/components/ui/pressable';
import { Header } from '@/components/navigation/header';
import {
  Heart,
  Share2,
  MapPin,
  CheckCircle2,
  Star,
  Calendar,
  Truck,
  Shield,
  MessageCircle,
} from 'lucide-react-native';
import { getListingById } from '@/utils/mock-data/listings';
import { useMarketplace } from '@/contexts/marketplace-context';
import { PhotoGallery } from '@/components/marketplace/listing/photo-gallery';
import { CalendarPickerComponent } from '@/components/marketplace/shared/calendar-picker';
import { ReviewsList } from '@/components/marketplace/listing/reviews-list';
import {
  getReviewsByListingId,
  calculateAverageRating,
  getRatingDistribution,
} from '@/utils/mock-data/listing-reviews';

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const listing = getListingById(id!);
  const { isSaved, saveListing, unsaveListing } = useMarketplace();
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'reviews'>('overview');

  // Get reviews data
  const reviews = listing ? getReviewsByListingId(listing.id) : [];
  const averageRating = listing ? calculateAverageRating(listing.id) : 0;
  const ratingDistribution = listing ? getRatingDistribution(listing.id) : { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  if (!listing) {
    return (
      <Box className="flex-1 bg-white items-center justify-center">
        <Text>Listing not found</Text>
      </Box>
    );
  }

  const saved = isSaved(listing.id);

  const handleToggleSave = async () => {
    if (saved) {
      await unsaveListing(listing.id);
    } else {
      await saveListing(listing.id);
    }
  };

  const handleBook = () => {
    if (listing.type === 'rental') {
      router.push(`/marketplace/book/${listing.id}`);
    } else {
      router.push(`/marketplace/checkout/${listing.id}`);
    }
  };

  const handleMessageOwner = () => {
    console.log('Message owner');
  };

  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-white">
        <Header
          variant="navigation"
          title={listing.category}
          onBack={() => router.back()}
          actions={[
            {
              icon: saved ? Heart : Heart,
              onPress: handleToggleSave,
            },
            {
              icon: Share2,
              onPress: () => console.log('Share'),
            },
          ]}
        />
      </SafeAreaView>

      <ScrollView className="flex-1">
        <VStack className="pb-24">
          {/* Photo Gallery */}
          <PhotoGallery photos={listing.photos} video={listing.video} height={280} />

          {/* Main Content */}
          <VStack className="p-4 gap-4">
            {/* Title & Price */}
            <VStack className="gap-2">
              <HStack className="items-start justify-between gap-3">
                <VStack className="flex-1 gap-1">
                  <Heading size="xl" className="text-typography-950">
                    {listing.title}
                  </Heading>
                  <HStack className="items-center gap-2">
                    <MapPin size={16} className="text-typography-500" />
                    <Text size="sm" className="text-typography-600">
                      {listing.location.neighborhood}
                    </Text>
                  </HStack>
                </VStack>
                {listing.verification.idVerified && (
                  <CheckCircle2 size={24} className="text-success-500" />
                )}
              </HStack>

              <HStack className="items-center gap-2">
                <Heading size="2xl" className="text-primary-600">
                  {listing.type === 'rental'
                    ? `$${listing.dailyRate}/day`
                    : `$${listing.price}`}
                </Heading>
                {listing.type === 'rental' && listing.deposit && (
                  <Text size="sm" className="text-typography-500">
                    + ${listing.deposit} deposit
                  </Text>
                )}
              </HStack>

              <HStack className="gap-2 flex-wrap">
                <Badge action="info">
                  <BadgeText>{listing.condition}</BadgeText>
                </Badge>
                {listing.isNew && (
                  <Badge action="success">
                    <BadgeText>NEW</BadgeText>
                  </Badge>
                )}
                <HStack className="items-center gap-1">
                  <Star size={14} className="text-warning-500" fill="#F97316" />
                  <Text size="sm" className="text-typography-700">
                    {listing.rating} ({listing.reviewCount})
                  </Text>
                </HStack>
              </HStack>
            </VStack>

            {/* Tabs */}
            <HStack className="gap-2 border-b border-outline-100 pb-2">
              <Pressable onPress={() => setActiveTab('overview')}>
                <Text
                  size="sm"
                  className={`font-semibold pb-2 ${
                    activeTab === 'overview'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-typography-600'
                  }`}
                >
                  Overview
                </Text>
              </Pressable>
              <Pressable onPress={() => setActiveTab('details')}>
                <Text
                  size="sm"
                  className={`font-semibold pb-2 ${
                    activeTab === 'details'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-typography-600'
                  }`}
                >
                  Details
                </Text>
              </Pressable>
              <Pressable onPress={() => setActiveTab('reviews')}>
                <Text
                  size="sm"
                  className={`font-semibold pb-2 ${
                    activeTab === 'reviews'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-typography-600'
                  }`}
                >
                  Reviews
                </Text>
              </Pressable>
            </HStack>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <VStack className="gap-4">
                {/* Description */}
                <VStack className="gap-2">
                  <Heading size="md" className="text-typography-950">
                    Description
                  </Heading>
                  <Text className="text-typography-700 leading-6">{listing.description}</Text>
                </VStack>

                {/* Owner Profile */}
                <Box className="bg-background-50 rounded-lg p-4">
                  <VStack className="gap-3">
                    <Heading size="md" className="text-typography-950">
                      Owner
                    </Heading>
                    <HStack className="items-center gap-3">
                      <Avatar size="lg">
                        <AvatarImage source={{ uri: listing.owner.avatar }} />
                      </Avatar>
                      <VStack className="flex-1 gap-1">
                        <HStack className="items-center gap-2">
                          <Text className="font-semibold text-typography-950">
                            {listing.owner.name}
                          </Text>
                          {listing.verification.idVerified && (
                            <CheckCircle2 size={16} className="text-success-500" />
                          )}
                        </HStack>
                        <HStack className="items-center gap-1">
                          <Star size={14} className="text-warning-500" fill="#F97316" />
                          <Text size="sm" className="text-typography-700">
                            {listing.owner.rating}
                          </Text>
                        </HStack>
                        <Text size="sm" className="text-typography-500">
                          {listing.owner.responseTime}
                        </Text>
                      </VStack>
                      <Button size="sm" variant="outline" onPress={handleMessageOwner}>
                        <MessageCircle size={18} className="text-primary-600" />
                      </Button>
                    </HStack>
                  </VStack>
                </Box>

                {/* Features */}
                <VStack className="gap-3">
                  <Heading size="md" className="text-typography-950">
                    Features
                  </Heading>
                  {listing.deliveryOptions.delivery && (
                    <HStack className="items-center gap-3">
                      <Box className="w-10 h-10 bg-primary-50 rounded-full items-center justify-center">
                        <Truck size={20} className="text-primary-600" />
                      </Box>
                      <VStack className="flex-1">
                        <Text className="font-semibold text-typography-950">
                          Delivery Available
                        </Text>
                        <Text size="sm" className="text-typography-600">
                          {listing.deliveryOptions.deliveryFee
                            ? `+$${listing.deliveryOptions.deliveryFee} delivery fee`
                            : 'Free delivery'}
                        </Text>
                      </VStack>
                    </HStack>
                  )}
                  {listing.insuranceAvailable && (
                    <HStack className="items-center gap-3">
                      <Box className="w-10 h-10 bg-info-50 rounded-full items-center justify-center">
                        <Shield size={20} className="text-info-600" />
                      </Box>
                      <VStack className="flex-1">
                        <Text className="font-semibold text-typography-950">
                          Insurance Available
                        </Text>
                        <Text size="sm" className="text-typography-600">
                          Protect your rental for $3/day
                        </Text>
                      </VStack>
                    </HStack>
                  )}
                  {listing.type === 'rental' && (
                    <HStack className="items-center gap-3">
                      <Box className="w-10 h-10 bg-success-50 rounded-full items-center justify-center">
                        <Calendar size={20} className="text-success-600" />
                      </Box>
                      <VStack className="flex-1">
                        <Text className="font-semibold text-typography-950">
                          Available Now
                        </Text>
                        <Text size="sm" className="text-typography-600">
                          Check calendar below for specific dates
                        </Text>
                      </VStack>
                    </HStack>
                  )}
                </VStack>

                {/* Availability Calendar (Rental Only) */}
                {listing.type === 'rental' && (
                  <VStack className="gap-3">
                    <Heading size="md" className="text-typography-950">
                      Availability
                    </Heading>
                    <CalendarPickerComponent
                      startDate={null}
                      endDate={null}
                      onDateChange={() => {}}
                      blockedDates={
                        listing.availability?.blackoutDates?.map((date) => new Date(date)) || []
                      }
                      allowRangeSelection={true}
                      minDate={new Date()}
                    />
                    <Text size="sm" className="text-typography-500">
                      Gray dates are unavailable. Select your dates to book.
                    </Text>
                  </VStack>
                )}
              </VStack>
            )}

            {/* Details Tab */}
            {activeTab === 'details' && (
              <VStack className="gap-4">
                <Heading size="md" className="text-typography-950">
                  Specifications
                </Heading>
                <VStack className="gap-3">
                  {listing.brand && (
                    <HStack className="justify-between">
                      <Text className="text-typography-600">Brand</Text>
                      <Text className="font-semibold text-typography-950">{listing.brand}</Text>
                    </HStack>
                  )}
                  {listing.model && (
                    <HStack className="justify-between">
                      <Text className="text-typography-600">Model</Text>
                      <Text className="font-semibold text-typography-950">{listing.model}</Text>
                    </HStack>
                  )}
                  <HStack className="justify-between">
                    <Text className="text-typography-600">Condition</Text>
                    <Text className="font-semibold text-typography-950">{listing.condition}</Text>
                  </HStack>
                  {Object.entries(listing.specs).map(([key, value]) => (
                    <HStack key={key} className="justify-between">
                      <Text className="text-typography-600">{key}</Text>
                      <Text className="font-semibold text-typography-950">{value}</Text>
                    </HStack>
                  ))}
                </VStack>

                {listing.safetyNotes && listing.safetyNotes !== 'N/A' && (
                  <VStack className="gap-2 mt-4">
                    <Heading size="md" className="text-typography-950">
                      Safety Notes
                    </Heading>
                    <Box className="bg-warning-50 p-3 rounded-lg border border-warning-200">
                      <Text className="text-typography-700">{listing.safetyNotes}</Text>
                    </Box>
                  </VStack>
                )}
              </VStack>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <ReviewsList
                reviews={reviews}
                averageRating={averageRating}
                ratingDistribution={ratingDistribution}
              />
            )}
          </VStack>
        </VStack>
      </ScrollView>

      {/* Sticky CTA */}
      <Box className="absolute bottom-0 left-0 right-0 bg-white border-t border-outline-100 p-4">
        <SafeAreaView edges={['bottom']}>
          <HStack className="gap-3">
            <Button variant="outline" className="flex-1" onPress={handleMessageOwner}>
              <ButtonText>Message</ButtonText>
            </Button>
            <Button className="flex-1" onPress={handleBook}>
              <ButtonText>{listing.type === 'rental' ? 'Book Now' : 'Buy Now'}</ButtonText>
            </Button>
          </HStack>
        </SafeAreaView>
      </Box>
    </Box>
  );
}
