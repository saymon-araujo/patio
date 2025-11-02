/**
 * Level Progress Component
 * Displays level progress bar with current level and XP to next level
 */

import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';

interface LevelProgressProps {
  level: number;
  progress: number; // 0-1
  xpToNext: number;
  currentXP: number;
}

export const LevelProgress = ({ level, progress, xpToNext, currentXP }: LevelProgressProps) => {
  return (
    <VStack className="gap-2">
      <HStack className="justify-between items-center">
        <Heading size="md" className="text-typography-950">
          Level {level}
        </Heading>
        <Text size="sm" className="text-typography-600">
          {xpToNext} XP to Level {level + 1}
        </Text>
      </HStack>
      <HStack className="bg-outline-200 h-3 rounded-full overflow-hidden">
        <HStack
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full"
          style={{ width: `${Math.min(progress * 100, 100)}%` }}
        />
      </HStack>
      <Text size="xs" className="text-typography-500 text-right">
        {currentXP.toLocaleString()} XP
      </Text>
    </VStack>
  );
};
