/**
 * Quiz Results Component
 * Displays quiz score, pass/fail, XP earned, and badges
 */

import React, { useEffect, useRef } from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Trophy, RotateCcw, ArrowRight } from 'lucide-react-native';
import LottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';

interface QuizResultsProps {
  score: number; // 0-100
  totalQuestions: number;
  correctAnswers: number;
  xpEarned: number;
  passingScore?: number; // Default 70
  onRetake?: () => void;
  onContinue?: () => void;
  badges?: string[]; // Newly unlocked badge IDs
}

export const QuizResults = ({
  score,
  totalQuestions,
  correctAnswers,
  xpEarned,
  passingScore = 70,
  onRetake,
  onContinue,
  badges = [],
}: QuizResultsProps) => {
  const passed = score >= passingScore;
  const confettiRef = useRef<LottieView>(null);

  useEffect(() => {
    if (passed && confettiRef.current) {
      confettiRef.current.play();
    }
  }, [passed]);

  return (
    <VStack className="gap-6">
      {/* Confetti Animation */}
      {passed && (
        <LottieView
          ref={confettiRef}
          source={require('@/assets/animations/confetti.json')}
          style={styles.confetti}
          autoPlay
          loop={false}
        />
      )}

      {/* Score Circle */}
      <VStack className="items-center gap-4 py-8">
        <VStack
          className={`w-40 h-40 rounded-full items-center justify-center ${
            passed ? 'bg-success-50' : 'bg-error-50'
          }`}
        >
          <Heading size="4xl" className={passed ? 'text-success-500' : 'text-error-500'}>
            {score}%
          </Heading>
          <Text size="sm" className={passed ? 'text-success-600' : 'text-error-600'}>
            {correctAnswers}/{totalQuestions} correct
          </Text>
        </VStack>

        <Badge action={passed ? 'success' : 'error'} className="px-4 py-2">
          <BadgeText className="text-lg font-bold">
            {passed ? '✓ PASSED' : '✗ FAILED'}
          </BadgeText>
        </Badge>
      </VStack>

      {/* XP Earned */}
      <Card className="p-6 bg-primary-50">
        <VStack className="items-center gap-2">
          <Trophy size={32} color="#0066FF" />
          <Text size="sm" className="text-typography-600">
            XP Earned
          </Text>
          <Heading size="3xl" className="text-primary-500">
            +{xpEarned} XP
          </Heading>
        </VStack>
      </Card>

      {/* Badges Unlocked */}
      {badges.length > 0 && (
        <Card className="p-4">
          <VStack className="gap-3">
            <Heading size="md" className="text-typography-950">
              Badges Unlocked!
            </Heading>
            <HStack className="gap-2 flex-wrap">
              {badges.map((badgeId) => (
                <Badge key={badgeId} action="success">
                  <BadgeText>🏆 {badgeId}</BadgeText>
                </Badge>
              ))}
            </HStack>
          </VStack>
        </Card>
      )}

      {/* Pass/Fail Message */}
      <Card className="p-4">
        <VStack className="gap-2">
          <Text size="md" className="text-typography-700 text-center">
            {passed
              ? 'Great job! You passed the quiz and can continue to the next lesson.'
              : `You need ${passingScore}% to pass. Review the material and try again.`}
          </Text>
        </VStack>
      </Card>

      {/* Action Buttons */}
      <VStack className="gap-3">
        {passed ? (
          <Button action="primary" size="lg" onPress={onContinue}>
            <ButtonText>Continue to Next Lesson</ButtonText>
            <ArrowRight size={18} color="#FFFFFF" />
          </Button>
        ) : (
          <Button action="primary" size="lg" onPress={onRetake}>
            <RotateCcw size={18} color="#FFFFFF" />
            <ButtonText>Retake Quiz</ButtonText>
          </Button>
        )}

        {passed && onRetake && (
          <Button action="secondary" size="md" onPress={onRetake}>
            <ButtonText>Review Answers</ButtonText>
          </Button>
        )}
      </VStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  confetti: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    pointerEvents: 'none',
  },
});
