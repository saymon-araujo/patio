/**
 * Orders Management Screen
 * View and manage bookings (rentals) and orders (buy/sell)
 */

import React, { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Box } from '@/components/ui/box';
import { ScrollView } from '@/components/ui/scroll-view';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Pressable } from '@/components/ui/pressable';
import { Header } from '@/components/navigation/header';
import { Calendar, Package, CheckCircle2 } from 'lucide-react-native';
import { useBooking } from '@/contexts/booking-context';
import { getListingById } from '@/utils/mock-data/listings';

type TabType = 'upcoming' | 'active' | 'past';

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const { bookings, orders } = useBooking();

  // Categorize bookings
  const upcomingBookings = bookings.filter(
    (b) => b.status === 'confirmed' || b.status === 'pending'
  );
  const activeBookings = bookings.filter((b) => b.status === 'active');
  const pastBookings = bookings.filter((b) => b.status === 'completed');

  // Categorize orders
  const upcomingOrders = orders.filter(
    (o) => o.status === 'paid' || o.status === 'pending'
  );
  const activeOrders = orders.filter((o) => o.status === 'shipped');
  const pastOrders = orders.filter((o) => o.status === 'delivered' || o.status === 'completed');

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'paid':
        return <Badge action="success"><BadgeText>Confirmed</BadgeText></Badge>;
      case 'active':
      case 'shipped':
        return <Badge action="info"><BadgeText>Active</BadgeText></Badge>;
      case 'completed':
      case 'delivered':
        return <Badge action="muted"><BadgeText>Completed</BadgeText></Badge>;
      case 'pending':
        return <Badge action="warning"><BadgeText>Pending</BadgeText></Badge>;
      default:
        return <Badge><BadgeText>{status}</BadgeText></Badge>;
    }
  };

  const renderBookingCard = (booking: typeof bookings[0]) => {
    const listing = getListingById(booking.listingId);
    if (!listing) return null;

    return (
      <Box key={booking.id} className="bg-white rounded-lg p-4 border border-outline-200">
        <VStack className="gap-3">
          <HStack className="items-start justify-between gap-3">
            <VStack className="flex-1 gap-1">
              <Text className="font-semibold text-typography-950">{listing.title}</Text>
              <Text size="sm" className="text-typography-600">
                Rental • {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
              </Text>
              <Text size="sm" className="text-typography-600">
                {booking.duration} {booking.duration === 1 ? 'day' : 'days'}
              </Text>
            </VStack>
            {getStatusBadge(booking.status)}
          </HStack>

          <HStack className="items-center justify-between">
            <Text className="font-bold text-primary-600">
              ${booking.totalCharged.toFixed(2)}
            </Text>

            {booking.status === 'confirmed' && (
              <Text size="sm" className="text-success-600">
                Show QR at pickup
              </Text>
            )}

            {booking.status === 'active' && (
              <Text size="sm" className="text-info-600">
                {Math.ceil(
                  (new Date(booking.endDate).getTime() - new Date().getTime()) /
                    (24 * 60 * 60 * 1000)
                )}{' '}
                days remaining
              </Text>
            )}
          </HStack>

          {booking.status === 'completed' && !booking.renterReviewed && (
            <Button size="sm" variant="outline">
              <ButtonText>Leave Review</ButtonText>
            </Button>
          )}
        </VStack>
      </Box>
    );
  };

  const renderOrderCard = (order: typeof orders[0]) => {
    const listing = getListingById(order.listingId);
    if (!listing) return null;

    return (
      <Box key={order.id} className="bg-white rounded-lg p-4 border border-outline-200">
        <VStack className="gap-3">
          <HStack className="items-start justify-between gap-3">
            <VStack className="flex-1 gap-1">
              <Text className="font-semibold text-typography-950">{listing.title}</Text>
              <Text size="sm" className="text-typography-600">
                Purchase • {order.shippingMethod === 'pickup' ? 'Pickup' : 'Shipping'}
              </Text>
              {order.trackingNumber && (
                <Text size="sm" className="text-typography-600">
                  Tracking: {order.trackingNumber}
                </Text>
              )}
            </VStack>
            {getStatusBadge(order.status)}
          </HStack>

          <HStack className="items-center justify-between">
            <Text className="font-bold text-primary-600">
              ${order.totalPrice.toFixed(2)}
            </Text>

            {order.status === 'shipped' && order.trackingNumber && (
              <Text size="sm" className="text-info-600">
                Track shipment
              </Text>
            )}
          </HStack>

          {(order.status === 'delivered' || order.status === 'completed') &&
            !order.buyerReviewed && (
              <Button size="sm" variant="outline">
                <ButtonText>Leave Review</ButtonText>
              </Button>
            )}
        </VStack>
      </Box>
    );
  };

  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-white">
        <Header variant="navigation" title="My Orders" onBack={() => router.back()} />
      </SafeAreaView>

      {/* Tab Navigation */}
      <HStack className="px-4 py-3 bg-white border-b border-outline-100 gap-2">
        <Pressable onPress={() => setActiveTab('upcoming')} style={{ flex: 1 }}>
          <Box
            className={`px-3 py-2 rounded-lg ${
              activeTab === 'upcoming' ? 'bg-primary-500' : 'bg-background-50'
            }`}
          >
            <Text
              size="sm"
              className={`text-center font-semibold ${
                activeTab === 'upcoming' ? 'text-white' : 'text-typography-600'
              }`}
            >
              Upcoming
            </Text>
          </Box>
        </Pressable>

        <Pressable onPress={() => setActiveTab('active')} style={{ flex: 1 }}>
          <Box
            className={`px-3 py-2 rounded-lg ${
              activeTab === 'active' ? 'bg-primary-500' : 'bg-background-50'
            }`}
          >
            <Text
              size="sm"
              className={`text-center font-semibold ${
                activeTab === 'active' ? 'text-white' : 'text-typography-600'
              }`}
            >
              Active
            </Text>
          </Box>
        </Pressable>

        <Pressable onPress={() => setActiveTab('past')} style={{ flex: 1 }}>
          <Box
            className={`px-3 py-2 rounded-lg ${
              activeTab === 'past' ? 'bg-primary-500' : 'bg-background-50'
            }`}
          >
            <Text
              size="sm"
              className={`text-center font-semibold ${
                activeTab === 'past' ? 'text-white' : 'text-typography-600'
              }`}
            >
              Past
            </Text>
          </Box>
        </Pressable>
      </HStack>

      <ScrollView className="flex-1 bg-background-50">
        <VStack className="p-4 gap-3 pb-8">
          {/* Upcoming Tab */}
          {activeTab === 'upcoming' && (
            <>
              {upcomingBookings.length === 0 && upcomingOrders.length === 0 ? (
                <Box className="p-12 items-center">
                  <Calendar size={48} className="text-typography-300 mb-4" />
                  <Text className="text-typography-500 text-center">
                    No upcoming bookings or orders
                  </Text>
                </Box>
              ) : (
                <VStack className="gap-3">
                  {upcomingBookings.map(renderBookingCard)}
                  {upcomingOrders.map(renderOrderCard)}
                </VStack>
              )}
            </>
          )}

          {/* Active Tab */}
          {activeTab === 'active' && (
            <>
              {activeBookings.length === 0 && activeOrders.length === 0 ? (
                <Box className="p-12 items-center">
                  <Package size={48} className="text-typography-300 mb-4" />
                  <Text className="text-typography-500 text-center">
                    No active rentals or orders
                  </Text>
                </Box>
              ) : (
                <VStack className="gap-3">
                  {activeBookings.map(renderBookingCard)}
                  {activeOrders.map(renderOrderCard)}
                </VStack>
              )}
            </>
          )}

          {/* Past Tab */}
          {activeTab === 'past' && (
            <>
              {pastBookings.length === 0 && pastOrders.length === 0 ? (
                <Box className="p-12 items-center">
                  <CheckCircle2 size={48} className="text-typography-300 mb-4" />
                  <Text className="text-typography-500 text-center">
                    No past orders or rentals
                  </Text>
                </Box>
              ) : (
                <VStack className="gap-3">
                  {pastBookings.map(renderBookingCard)}
                  {pastOrders.map(renderOrderCard)}
                </VStack>
              )}
            </>
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
}
