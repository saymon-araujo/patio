/**
 * Category Card Component
 * Displays course categories with icons and course counts
 */

import React from 'react';
import { Pressable } from 'react-native';
import { Card } from '@/components/ui/card';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { Category } from '@/utils/mock-data/courses';
import * as Icons from 'lucide-react-native';

interface CategoryCardProps {
  category: Category;
  onPress?: () => void;
}

export const CategoryCard = ({ category, onPress }: CategoryCardProps) => {
  const IconComponent = Icons[category.icon as keyof typeof Icons] as any;

  return (
    <Pressable onPress={onPress}>
      <Card className="p-4 bg-white items-center justify-center" style={{ minHeight: 120 }}>
        <VStack className="gap-2 items-center">
          <Box
            className="w-12 h-12 rounded-full items-center justify-center"
            style={{ backgroundColor: `${category.color}20` }}
          >
            {IconComponent && <IconComponent size={24} color={category.color} />}
          </Box>
          <Heading size="sm" className="text-typography-950 text-center">
            {category.name}
          </Heading>
          <Text size="xs" className="text-typography-500 text-center">
            {category.courseCount} {category.courseCount === 1 ? 'course' : 'courses'}
          </Text>
        </VStack>
      </Card>
    </Pressable>
  );
};
