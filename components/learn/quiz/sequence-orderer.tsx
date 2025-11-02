/**
 * Sequence Orderer Component
 * Drag-and-drop ordering for quiz questions (Simplified for prototype)
 */

import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { GripVertical } from 'lucide-react-native';

interface SequenceOrdererProps {
  items: string[];
  instruction: string;
}

export const SequenceOrderer = ({ items, instruction }: SequenceOrdererProps) => {
  return (
    <VStack className="gap-3">
      <Text size="sm" className="text-typography-600">
        {instruction}
      </Text>
      <VStack className="gap-2">
        {items.map((item, index) => (
          <Card key={index} className="p-4 bg-white">
            <HStack className="gap-3 items-center">
              <GripVertical size={20} color="#9CA3AF" />
              <HStack className="w-7 h-7 rounded-full bg-outline-200 items-center justify-center">
                <Text size="sm" className="text-typography-600 font-semibold">
                  {index + 1}
                </Text>
              </HStack>
              <Text size="md" className="text-typography-950 flex-1">
                {item}
              </Text>
            </HStack>
          </Card>
        ))}
      </VStack>
      <Text size="xs" className="text-typography-500 text-center">
        Drag to reorder the steps (Prototype: order is fixed)
      </Text>
    </VStack>
  );
};
