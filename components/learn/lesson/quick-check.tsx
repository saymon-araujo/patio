/**
 * Quick Check Component
 * Inline quiz that appears during lessons
 */

import React, { useState } from 'react';
import { Modal, ModalBackdrop, ModalContent, ModalBody } from '@/components/ui/modal';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuickCheckQuestion } from '@/utils/mock-data/lessons';
import { Pressable } from 'react-native';
import { Check, X } from 'lucide-react-native';

interface QuickCheckProps {
  isOpen: boolean;
  question: QuickCheckQuestion;
  onComplete: (isCorrect: boolean) => void;
}

export const QuickCheck = ({ isOpen, question, onComplete }: QuickCheckProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setHasSubmitted(true);
  };

  const handleContinue = () => {
    const isCorrect = selectedAnswer === question.correctAnswer;
    onComplete(isCorrect);
    setSelectedAnswer(null);
    setHasSubmitted(false);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalBackdrop />
      <ModalContent>
        <ModalBody className="p-6">
          <VStack className="gap-6">
            {/* Header */}
            <VStack className="gap-2">
              <Heading size="sm" className="text-primary-500 uppercase">
                Quick Check
              </Heading>
              <Heading size="xl" className="text-typography-950">
                {question.question}
              </Heading>
            </VStack>

            {/* Options */}
            <VStack className="gap-2">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === question.correctAnswer;
                const showCorrect = hasSubmitted && isCorrectAnswer;
                const showIncorrect = hasSubmitted && isSelected && !isCorrect;

                return (
                  <Pressable
                    key={index}
                    onPress={() => !hasSubmitted && setSelectedAnswer(index)}
                    disabled={hasSubmitted}
                  >
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
                          className={`w-6 h-6 rounded-full items-center justify-center ${
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
                            <Check size={16} color="#FFFFFF" />
                          ) : showIncorrect ? (
                            <X size={16} color="#FFFFFF" />
                          ) : (
                            <Text
                              size="xs"
                              className={isSelected ? 'text-white' : 'text-typography-500'}
                            >
                              {String.fromCharCode(65 + index)}
                            </Text>
                          )}
                        </HStack>
                        <Text
                          size="md"
                          className={
                            showCorrect
                              ? 'text-success-700 flex-1'
                              : showIncorrect
                              ? 'text-error-700 flex-1'
                              : 'text-typography-950 flex-1'
                          }
                        >
                          {option}
                        </Text>
                      </HStack>
                    </Card>
                  </Pressable>
                );
              })}
            </VStack>

            {/* Explanation */}
            {hasSubmitted && (
              <Card className={`p-4 ${isCorrect ? 'bg-success-50' : 'bg-error-50'}`}>
                <VStack className="gap-2">
                  <Text size="sm" className="font-semibold text-typography-700">
                    {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                  </Text>
                  <Text size="sm" className="text-typography-600">
                    {question.explanation}
                  </Text>
                </VStack>
              </Card>
            )}

            {/* Action Button */}
            {hasSubmitted ? (
              <Button action="primary" onPress={handleContinue}>
                <ButtonText>Continue</ButtonText>
              </Button>
            ) : (
              <Button action="primary" onPress={handleSubmit} isDisabled={selectedAnswer === null}>
                <ButtonText>Submit Answer</ButtonText>
              </Button>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
