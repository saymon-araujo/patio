/**
 * Header Action Component
 * Icon button for header actions with optional badge indicator
 */

import React from 'react';
import { Pressable } from '@/components/ui/pressable';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import type { LucideIcon } from 'lucide-react-native';

interface HeaderActionProps {
  icon: LucideIcon;
  onPress: () => void;
  showBadge?: boolean;
  badgeCount?: number;
}

export function HeaderAction({ icon: Icon, onPress, showBadge = false, badgeCount }: HeaderActionProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-10 h-10 items-center justify-center rounded-full active:bg-background-100"
    >
      <Box className="relative">
        <Icon size={22} className="text-typography-700" strokeWidth={2} />

        {/* Badge indicator */}
        {showBadge && (
          <Box className="absolute -top-1 -right-1 w-2 h-2 bg-error-500 rounded-full" />
        )}

        {/* Badge with count */}
        {badgeCount !== undefined && badgeCount > 0 && (
          <Box className="absolute -top-2 -right-2 min-w-5 h-5 bg-error-500 rounded-full items-center justify-center px-1">
            <Text className="text-white text-xs font-semibold">
              {badgeCount > 99 ? '99+' : badgeCount}
            </Text>
          </Box>
        )}
      </Box>
    </Pressable>
  );
}
