/**
 * Streak Counter Component
 * Displays current streak with flame icon
 */

import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Flame } from 'lucide-react-native';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  variant?: 'compact' | 'detailed';
}

export const StreakCounter = ({
  currentStreak,
  longestStreak,
  variant = 'compact',
}: StreakCounterProps) => {
  if (variant === 'compact') {
    return (
      <HStack className="items-center gap-2 px-3 py-2 bg-error-50 rounded-lg">
        <Flame size={20} color="#EF4444" fill="#EF4444" />
        <Heading size="lg" className="text-error-500">
          {currentStreak}
        </Heading>
        <Text size="sm" className="text-error-600">
          day{currentStreak !== 1 ? 's' : ''}
        </Text>
      </HStack>
    );
  }

  return (
    <VStack className="gap-3 p-4 bg-error-50 rounded-xl">
      <HStack className="items-center gap-3">
        <Flame size={32} color="#EF4444" fill="#EF4444" />
        <VStack className="gap-1">
          <Heading size="2xl" className="text-error-500">
            {currentStreak} Days
          </Heading>
          <Text size="sm" className="text-typography-600">
            Current Streak
          </Text>
        </VStack>
      </HStack>
      <Text size="sm" className="text-typography-600">
        Longest streak: {longestStreak} days
      </Text>
    </VStack>
  );
};
