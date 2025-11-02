/**
 * XP Badge Component
 * Displays XP counter with optional animation
 */

import React from 'react';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Zap } from 'lucide-react-native';

interface XPBadgeProps {
  xp: number;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const XPBadge = ({ xp, size = 'md', showIcon = true }: XPBadgeProps) => {
  const iconSize = size === 'sm' ? 14 : size === 'md' ? 16 : 20;
  const textSize = size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md';

  return (
    <HStack className="items-center gap-1 px-2 py-1 bg-primary-50 rounded-full">
      {showIcon && <Zap size={iconSize} color="#0066FF" fill="#0066FF" />}
      <Text size={textSize} className="text-primary-500 font-bold">
        +{xp} XP
      </Text>
    </HStack>
  );
};
