/**
 * Welcome Screen
 * Landing page with Sign Up and Log In options
 */

import React from 'react';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Center } from '@/components/ui/center';
import { router } from 'expo-router';
import { Hammer } from 'lucide-react-native';

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <VStack className="flex-1 justify-between p-8">
        {/* Logo and Tagline */}
        <VStack className="flex-1 justify-center gap-8">
          {/* Logo Placeholder */}
          <Center>
            <VStack className="items-center gap-4">
              <Center className="w-24 h-24 rounded-full bg-primary-500">
                <Hammer size={48} className="text-white" />
              </Center>
              <Heading size="4xl" className="text-typography-950">
                Patio
              </Heading>
            </VStack>
          </Center>

          {/* Tagline */}
          <VStack className="gap-2">
            <Heading size="2xl" className="text-center text-typography-950">
              DIY Made Easy
            </Heading>
            <Text size="lg" className="text-center text-typography-600">
              Learn skills, share tools, join clubs, and get expert help from your local DIY community.
            </Text>
          </VStack>
        </VStack>

        {/* Auth Buttons */}
        <VStack className="gap-3">
          <Button
            action="primary"
            size="lg"
            onPress={() => router.push('/(auth)/signup')}
          >
            <ButtonText>Sign Up</ButtonText>
          </Button>

          <Button
            action="secondary"
            size="lg"
            onPress={() => router.push('/(auth)/login')}
          >
            <ButtonText>Log In</ButtonText>
          </Button>

          {/* Terms */}
          <Text size="xs" className="text-center text-typography-500 mt-2">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
