/**
 * MCQ Options Component
 * Multiple choice question options with selection state
 */

import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Pressable } from 'react-native';
import { Check, X } from 'lucide-react-native';

interface MCQOptionsProps {
  options: string[];
  selectedAnswer: number | null;
  correctAnswer?: number;
  hasSubmitted: boolean;
  onSelect: (index: number) => void;
}

export const MCQOptions = ({
  options,
  selectedAnswer,
  correctAnswer,
  hasSubmitted,
  onSelect,
}: MCQOptionsProps) => {
  return (
    <VStack className="gap-3">
      {options.map((option, index) => {
        const isSelected = selectedAnswer === index;
        const isCorrectAnswer = correctAnswer !== undefined && index === correctAnswer;
        const showCorrect = hasSubmitted && isCorrectAnswer;
        const showIncorrect = hasSubmitted && isSelected && !isCorrectAnswer;

        return (
          <Pressable key={index} onPress={() => !hasSubmitted && onSelect(index)} disabled={hasSubmitted}>
            <Card
              className={`p-4 ${
                showCorrect
                  ? 'bg-success-50 border-2 border-success-500'
                  : showIncorrect
                  ? 'bg-error-50 border-2 border-error-500'
                  : isSelected
                  ? 'bg-primary-50 border-2 border-primary-500'
                  : 'bg-white border border-outline-200'
              }`}
            >
              <HStack className="gap-3 items-center">
                <HStack
                  className={`w-7 h-7 rounded-full items-center justify-center ${
                    showCorrect
                      ? 'bg-success-500'
                      : showIncorrect
                      ? 'bg-error-500'
                      : isSelected
                      ? 'bg-primary-500'
                      : 'bg-outline-200'
                  }`}
                >
                  {showCorrect ? (
                    <Check size={18} color="#FFFFFF" />
                  ) : showIncorrect ? (
                    <X size={18} color="#FFFFFF" />
                  ) : (
                    <Text size="sm" className={isSelected ? 'text-white font-bold' : 'text-typography-500'}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  )}
                </HStack>
                <Text
                  size="md"
                  className={`flex-1 ${
                    showCorrect
                      ? 'text-success-700'
                      : showIncorrect
                      ? 'text-error-700'
                      : 'text-typography-950'
                  }`}
                >
                  {option}
                </Text>
              </HStack>
            </Card>
          </Pressable>
        );
      })}
    </VStack>
  );
};
