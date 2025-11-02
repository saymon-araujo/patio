/**
 * Course Progress Component
 * Displays progress bar and percentage for enrolled courses
 */

import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';

interface CourseProgressProps {
  progress: number; // 0-1
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const CourseProgress = ({
  progress,
  showPercentage = true,
  size = 'md',
}: CourseProgressProps) => {
  const height = size === 'sm' ? 4 : size === 'md' ? 6 : 8;
  const percentage = Math.round(progress * 100);

  return (
    <VStack className="gap-1">
      <HStack className="bg-outline-200 rounded-full overflow-hidden" style={{ height }}>
        <HStack
          className="bg-primary-500 h-full rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </HStack>
      {showPercentage && (
        <Text size="xs" className="text-typography-600">
          {percentage}% complete
        </Text>
      )}
    </VStack>
  );
};
