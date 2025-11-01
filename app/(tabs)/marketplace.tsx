/**
 * Marketplace Tab - Placeholder
 * Will be implemented in Plan 2
 */

import React from 'react';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Center } from '@/components/ui/center';
import { Header } from '@/components/navigation/header';
import { ShoppingBag, Search, Filter } from 'lucide-react-native';

export default function MarketplaceScreen() {
  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-white">
        <Header
          title="Marketplace"
          showLogo={true}
          actions={[
            {
              icon: Search,
              onPress: () => console.log('Search'),
            },
            {
              icon: Filter,
              onPress: () => console.log('Filter'),
            },
          ]}
        />
      </SafeAreaView>
      <VStack className="flex-1 justify-center items-center p-8 gap-6 bg-white">
        <Center className="w-32 h-32 rounded-full bg-primary-50">
          <ShoppingBag size={64} className="text-primary-500" />
        </Center>
        <VStack className="gap-2 items-center">
          <Heading size="3xl" className="text-center text-typography-950">
            Marketplace
          </Heading>
          <Text size="lg" className="text-center text-typography-600">
            Browse, rent, and buy tools from your local community
          </Text>
          <Text size="sm" className="text-center text-typography-500 mt-4">
            Coming soon in Plan 2
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
