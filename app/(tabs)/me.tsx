/**
 * Me Tab - Placeholder
 * Will be implemented in Plan 5
 */

import React from 'react';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Center } from '@/components/ui/center';
import { Header } from '@/components/navigation/header';
import { User, Bell, Settings } from 'lucide-react-native';

export default function MeScreen() {
  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-white">
        <Header
          title="Welcome Back"
          subtitle="Alex"
          showLogo={true}
          variant="greeting"
          actions={[
            {
              icon: Bell,
              onPress: () => console.log('Notifications'),
              badgeCount: 3,
            },
            {
              icon: Settings,
              onPress: () => console.log('Settings'),
            },
          ]}
        />
      </SafeAreaView>
      <VStack className="flex-1 justify-center items-center p-8 gap-6 bg-white">
        <Center className="w-32 h-32 rounded-full bg-primary-50">
          <User size={64} className="text-primary-500" />
        </Center>
        <VStack className="gap-2 items-center">
          <Heading size="3xl" className="text-center text-typography-950">
            Profile
          </Heading>
          <Text size="lg" className="text-center text-typography-600">
            Manage your profile, wallet, messages, and settings
          </Text>
          <Text size="sm" className="text-center text-typography-500 mt-4">
            Coming soon in Plan 5
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
