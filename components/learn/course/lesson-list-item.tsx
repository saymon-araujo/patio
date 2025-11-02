/**
 * Lesson List Item Component
 * Displays lesson with lock/check states in course detail
 */

import React from 'react';
import { Pressable } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Lesson } from '@/utils/mock-data/lessons';
import { Check, Lock, PlayCircle, FileText } from 'lucide-react-native';
import { router } from 'expo-router';

interface LessonListItemProps {
  lesson: Lesson;
  lessonNumber: number;
  isCompleted: boolean;
  isLocked: boolean;
  onPress?: () => void;
}

export const LessonListItem = ({
  lesson,
  lessonNumber,
  isCompleted,
  isLocked,
  onPress,
}: LessonListItemProps) => {
  const handlePress = () => {
    if (isLocked) return;
    if (onPress) {
      onPress();
    } else {
      router.push(`/learn/lesson/${lesson.id}`);
    }
  };

  const getTypeIcon = () => {
    if (lesson.type === 'video') {
      return <PlayCircle size={20} color="#6B7280" />;
    }
    return <FileText size={20} color="#6B7280" />;
  };

  return (
    <Pressable onPress={handlePress} disabled={isLocked}>
      <HStack
        className={`p-4 mb-2 rounded-lg border ${
          isLocked
            ? 'bg-background-50 border-outline-200'
            : isCompleted
            ? 'bg-success-50 border-success-200'
            : 'bg-white border-outline-200'
        }`}
      >
        <HStack className="gap-3 items-center flex-1">
          {/* Status Icon */}
          <Box
            className={`w-8 h-8 rounded-full items-center justify-center ${
              isCompleted
                ? 'bg-success-500'
                : isLocked
                ? 'bg-outline-300'
                : 'bg-primary-50'
            }`}
          >
            {isCompleted ? (
              <Check size={18} color="#FFFFFF" />
            ) : isLocked ? (
              <Lock size={16} color="#9CA3AF" />
            ) : (
              <Text size="sm" className="text-primary-500 font-semibold">
                {lessonNumber}
              </Text>
            )}
          </Box>

          {/* Lesson Info */}
          <VStack className="flex-1 gap-1">
            <Text
              size="md"
              className={`font-semibold ${
                isLocked ? 'text-typography-400' : 'text-typography-950'
              }`}
            >
              {lesson.title}
            </Text>
            <HStack className="gap-2 items-center">
              {getTypeIcon()}
              <Text
                size="xs"
                className={isLocked ? 'text-typography-400' : 'text-typography-600'}
              >
                {lesson.duration} min
              </Text>
              {lesson.xpReward > 0 && (
                <Text size="xs" className="text-primary-500 font-semibold">
                  +{lesson.xpReward} XP
                </Text>
              )}
            </HStack>
          </VStack>
        </HStack>
      </HStack>
    </Pressable>
  );
};
