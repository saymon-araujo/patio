/**
 * Role Card Component
 * Selectable card for user role selection
 */

import React from 'react';
import { Pressable } from '@/components/ui/pressable';
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Checkbox, CheckboxIndicator, CheckboxIcon } from '@/components/ui/checkbox';
import { Check } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  selected: boolean;
  onPress: () => void;
}

export function RoleCard({ title, description, icon: Icon, selected, onPress }: RoleCardProps) {
  return (
    <Pressable onPress={onPress}>
      <Card
        variant="outline"
        className={`p-4 ${
          selected ? 'border-primary-500 border-2 bg-primary-50' : 'border-outline-200'
        }`}
      >
        <HStack className="gap-4 items-start">
          {/* Icon */}
          <VStack className={`w-12 h-12 rounded-full items-center justify-center ${
            selected ? 'bg-primary-500' : 'bg-background-100'
          }`}>
            <Icon
              size={24}
              className={selected ? 'text-white' : 'text-typography-500'}
            />
          </VStack>

          {/* Content */}
          <VStack className="flex-1 gap-1">
            <Text className="font-semibold text-lg text-typography-950">
              {title}
            </Text>
            <Text className="text-sm text-typography-600">
              {description}
            </Text>
          </VStack>

          {/* Checkbox */}
          <Checkbox
            value={title}
            isChecked={selected}
            onChange={onPress}
            aria-label={`Select ${title} role`}
          >
            <CheckboxIndicator>
              <CheckboxIcon as={Check} />
            </CheckboxIndicator>
          </Checkbox>
        </HStack>
      </Card>
    </Pressable>
  );
}
