/**
 * Marketplace Tab Stack Navigator
 * Handles nested navigation within the Marketplace tab
 */

import { Stack } from 'expo-router';

export default function MarketplaceLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Marketplace',
        }}
      />
      <Stack.Screen
        name="listing/[id]"
        options={{
          title: 'Listing Detail',
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: 'Create Listing',
        }}
      />
      <Stack.Screen
        name="book/[id]"
        options={{
          title: 'Book Rental',
        }}
      />
      <Stack.Screen
        name="checkout/[id]"
        options={{
          title: 'Checkout',
        }}
      />
      <Stack.Screen
        name="orders"
        options={{
          title: 'Orders',
        }}
      />
      <Stack.Screen
        name="map"
        options={{
          title: 'Map View',
        }}
      />
    </Stack>
  );
}
