/**
 * Quiz Question Component
 * Wrapper for quiz questions with progress indicator
 */

import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Image } from 'expo-image';

interface QuizQuestionProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  imageUrl?: string;
  children: React.ReactNode;
}

export const QuizQuestion = ({
  questionNumber,
  totalQuestions,
  question,
  imageUrl,
  children,
}: QuizQuestionProps) => {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <VStack className="gap-6">
      {/* Progress */}
      <VStack className="gap-2">
        <HStack className="justify-between items-center">
          <Text size="sm" className="text-typography-600">
            Question {questionNumber} of {totalQuestions}
          </Text>
          <Text size="sm" className="text-primary-500 font-semibold">
            {Math.round(progress)}%
          </Text>
        </HStack>
        <HStack className="bg-outline-200 h-2 rounded-full overflow-hidden">
          <HStack className="bg-primary-500 h-full" style={{ width: `${progress}%` }} />
        </HStack>
      </VStack>

      {/* Question */}
      <Card className="p-5 bg-primary-50">
        <VStack className="gap-3">
          <Heading size="xl" className="text-typography-950">
            {question}
          </Heading>
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={{ width: '100%', height: 180, borderRadius: 8 }}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
          )}
        </VStack>
      </Card>

      {/* Answer Options */}
      {children}
    </VStack>
  );
};
