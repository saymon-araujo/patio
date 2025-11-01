/**
 * Signup Location Screen
 * Request location permission during signup flow
 */

import React, { useState } from 'react';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { useLocation } from '@/contexts/location-context';
import { router } from 'expo-router';
import { MapPin } from 'lucide-react-native';

export default function SignupLocationScreen() {
  const { requestPermission, isLoading } = useLocation();
  const [permissionRequested, setPermissionRequested] = useState(false);

  const handleAllowLocation = async () => {
    setPermissionRequested(true);
    const granted = await requestPermission();

    if (granted) {
      // Permission granted, proceed to role selection
      router.push('/(auth)/signup-role');
    } else {
      // Permission denied, but user can still continue
      alert('Location access denied. You can enable this later in settings.');
    }
  };

  const handleSkip = () => {
    router.push('/(auth)/signup-role');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <VStack className="flex-1 justify-between p-8">
        {/* Content */}
        <VStack className="flex-1 justify-center gap-8">
          {/* Icon */}
          <Center>
            <Center className="w-32 h-32 rounded-full bg-primary-50">
              <MapPin size={64} className="text-primary-500" />
            </Center>
          </Center>

          {/* Text */}
          <VStack className="gap-4">
            <Heading size="3xl" className="text-center text-typography-950">
              Enable Location
            </Heading>
            <Text size="lg" className="text-center text-typography-600">
              Help us connect you with nearby tool rentals, local clubs, and DIY events in your area.
            </Text>
            <VStack className="gap-2 mt-4">
              <Text size="sm" className="text-typography-700">
                We use your location to:
              </Text>
              <Text size="sm" className="text-typography-600">
                • Find tools available near you
              </Text>
              <Text size="sm" className="text-typography-600">
                • Discover local DIY clubs and events
              </Text>
              <Text size="sm" className="text-typography-600">
                • Show distance in search results
              </Text>
            </VStack>
          </VStack>
        </VStack>

        {/* Buttons */}
        <VStack className="gap-3">
          <Button
            action="primary"
            size="lg"
            onPress={handleAllowLocation}
            isDisabled={isLoading}
          >
            <ButtonText>
              {isLoading ? 'Requesting...' : 'Allow Location'}
            </ButtonText>
          </Button>

          <Button
            variant="link"
            onPress={handleSkip}
            isDisabled={isLoading}
          >
            <ButtonText>Skip for now</ButtonText>
          </Button>

          <Text size="xs" className="text-center text-typography-500 mt-2">
            You can change this in your settings anytime
          </Text>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
