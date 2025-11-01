/**
 * Progress Dots Component
 * Displays progress indicator for onboarding carousel
 */

import React from 'react';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';

interface ProgressDotsProps {
  total: number;
  current: number;
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <HStack className="gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <Box
          key={index}
          className={`h-2 rounded-full transition-all ${
            index === current
              ? 'w-8 bg-primary-500'
              : 'w-2 bg-outline-200'
          }`}
        />
      ))}
    </HStack>
  );
}
