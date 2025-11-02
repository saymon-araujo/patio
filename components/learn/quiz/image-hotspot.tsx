/**
 * Image Hotspot Component
 * Tappable image zones for interactive quizzes (Simplified for prototype)
 */

import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Image } from 'expo-image';

interface ImageHotspotProps {
  imageUrl: string;
  instruction: string;
}

export const ImageHotspot = ({ imageUrl, instruction }: ImageHotspotProps) => {
  return (
    <Card className="p-4">
      <VStack className="gap-4">
        <Text size="sm" className="text-typography-600">
          {instruction}
        </Text>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: '100%', height: 300, borderRadius: 8 }}
          contentFit="contain"
          cachePolicy="memory-disk"
        />
        <Text size="xs" className="text-typography-500 text-center">
          Tap the correct area on the image
        </Text>
      </VStack>
    </Card>
  );
};
