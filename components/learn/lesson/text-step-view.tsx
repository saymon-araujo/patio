/**
 * Text Step View Component
 * Displays text-based lesson steps with images and tool callouts
 */

import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Image } from 'expo-image';
import { TextStep } from '@/utils/mock-data/lessons';
import { AlertTriangle, Wrench } from 'lucide-react-native';

interface TextStepViewProps {
  step: TextStep;
}

export const TextStepView = ({ step }: TextStepViewProps) => {
  return (
    <Card className="p-4">
      <VStack className="gap-4">
        {/* Step Number and Title */}
        <HStack className="gap-3 items-center">
          <HStack className="w-8 h-8 rounded-full bg-primary-500 items-center justify-center">
            <Text size="sm" className="text-white font-bold">
              {step.stepNumber}
            </Text>
          </HStack>
          <Heading size="lg" className="text-typography-950 flex-1">
            {step.title}
          </Heading>
        </HStack>

        {/* Step Content */}
        <Text size="md" className="text-typography-700 leading-relaxed">
          {step.content}
        </Text>

        {/* Step Image */}
        {step.imageUrl && (
          <Image
            source={{ uri: step.imageUrl }}
            style={{ width: '100%', height: 200, borderRadius: 8 }}
            contentFit="cover"
            cachePolicy="memory-disk"
          />
        )}

        {/* Safety Note */}
        {step.safetyNote && (
          <HStack className="gap-3 p-3 bg-warning-50 rounded-lg">
            <AlertTriangle size={20} color="#F59E0B" />
            <VStack className="flex-1 gap-1">
              <Text size="sm" className="text-warning-700 font-semibold">
                Safety Note
              </Text>
              <Text size="sm" className="text-warning-600">
                {step.safetyNote}
              </Text>
            </VStack>
          </HStack>
        )}

        {/* Tools Used */}
        {step.toolsUsed && step.toolsUsed.length > 0 && (
          <VStack className="gap-2">
            <HStack className="gap-2 items-center">
              <Wrench size={16} color="#6B7280" />
              <Text size="sm" className="text-typography-600 font-semibold">
                Tools Needed
              </Text>
            </HStack>
            <HStack className="gap-2 flex-wrap">
              {step.toolsUsed.map((tool, index) => (
                <Badge key={index} action="muted">
                  <BadgeText>{tool}</BadgeText>
                </Badge>
              ))}
            </HStack>
          </VStack>
        )}
      </VStack>
    </Card>
  );
};
