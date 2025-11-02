/**
 * Photo Gallery Component
 * Swipeable photo/video carousel for listings
 */

import React, { useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

interface PhotoGalleryProps {
  photos: string[];
  video?: string;
  height?: number;
}

export function PhotoGallery({ photos, video, height = 300 }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const media = video ? [video, ...photos] : photos;

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  };

  return (
    <Box style={{ height }}>
      <FlatList
        data={media}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        renderItem={({ item }) => (
          <Box style={{ width, height }}>
            <Image
              source={{ uri: item }}
              style={{ width, height }}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
          </Box>
        )}
        keyExtractor={(item, index) => `photo-${index}`}
      />

      {/* Pagination Indicator */}
      <Box className="absolute bottom-3 right-3 px-3 py-1 bg-black/70 rounded-full">
        <Text size="sm" className="text-white font-semibold">
          {currentIndex + 1} / {media.length}
        </Text>
      </Box>
    </Box>
  );
}
