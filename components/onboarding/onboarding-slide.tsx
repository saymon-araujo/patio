/**
 * Onboarding Slide Component
 * Individual slide for onboarding carousel
 */

import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { Center } from '@/components/ui/center';

interface OnboardingSlideProps {
  title: string;
  subtitle: string;
  image?: string;
  imagePlaceholder?: React.ReactNode;
}

export function OnboardingSlide({ title, subtitle, image, imagePlaceholder }: OnboardingSlideProps) {
  return (
    <VStack className="flex-1 justify-center items-center px-8 gap-8">
      {/* Image or Placeholder */}
      <Center className="h-64 w-full">
        {image ? (
          <Image
            source={{ uri: image }}
            alt={title}
            className="w-full h-full"
            contentFit="contain"
          />
        ) : imagePlaceholder ? (
          imagePlaceholder
        ) : (
          <Center className="w-full h-full bg-background-50 rounded-xl">
            <Text className="text-typography-400">Illustration</Text>
          </Center>
        )}
      </Center>

      {/* Content */}
      <VStack className="gap-4 items-center">
        <Heading size="3xl" className="text-center text-typography-950">
          {title}
        </Heading>
        <Text size="lg" className="text-center text-typography-600">
          {subtitle}
        </Text>
      </VStack>
    </VStack>
  );
}
