/**
 * Lesson Player Screen
 * Full-screen immersive lesson player for video/text content
 */

import React, { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Box } from '@/components/ui/box';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { ScrollView } from '@/components/ui/scroll-view';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/navigation/header';
import { VideoPlayer } from '@/components/learn/lesson/video-player';
import { TextStepView } from '@/components/learn/lesson/text-step-view';
import { QuickCheck } from '@/components/learn/lesson/quick-check';
import { GlossaryPanel } from '@/components/learn/lesson/glossary-panel';
import { ResourceList } from '@/components/learn/lesson/resource-list';
import { XPBadge } from '@/components/learn/gamification/xp-badge';
import { getLessonById, getNextLesson, getPreviousLesson } from '@/utils/mock-data/lessons';
import { useLearn } from '@/contexts/learn-context';
import { useGamification } from '@/contexts/gamification-context';
import { ChevronLeft, ChevronRight, BookmarkCheck, Bookmark } from 'lucide-react-native';

export default function LessonPlayerScreen() {
  const { id } = useLocalSearchParams();
  const { completeLesson, isLessonCompleted, updateCurrentLesson } = useLearn();
  const { addXP, incrementLessonsCompleted } = useGamification();
  const [showQuickCheck, setShowQuickCheck] = useState(false);
  const [currentQuickCheckIndex, setCurrentQuickCheckIndex] = useState(0);

  const lesson = getLessonById(id as string);

  if (!lesson) {
    return (
      <Box className="flex-1 bg-white items-center justify-center">
        <Text>Lesson not found</Text>
      </Box>
    );
  }

  const isCompleted = isLessonCompleted(lesson.id);
  const nextLesson = getNextLesson(lesson.id, lesson.courseId);
  const previousLesson = getPreviousLesson(lesson.id, lesson.courseId);

  const handleComplete = async () => {
    if (!isCompleted) {
      await completeLesson(lesson.id, lesson.courseId);
      await addXP(lesson.xpReward, `Completed ${lesson.title}`);
      await incrementLessonsCompleted();
    }

    // Navigate to next lesson or back to course
    if (nextLesson) {
      router.replace(`/learn/lesson/${nextLesson.id}`);
    } else {
      router.back();
    }
  };

  const handleQuickCheckComplete = (isCorrect: boolean) => {
    setShowQuickCheck(false);
    if (isCorrect) {
      // Award bonus XP for correct answer
      addXP(10, 'Quick check correct');
    }
  };

  const showQuickCheckModal = () => {
    if (lesson.quickChecks.length > 0) {
      setShowQuickCheck(true);
      setCurrentQuickCheckIndex(0);
    }
  };

  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-white">
        <Header
          variant="navigation"
          title={`Lesson ${lesson.order}`}
          onBack={() => router.back()}
          actions={[
            {
              icon: Bookmark,
              onPress: () => console.log('Bookmark lesson'),
            },
          ]}
        />
      </SafeAreaView>

      <ScrollView className="flex-1 bg-background-50">
        <VStack className="p-6 gap-6">
          {/* Lesson Header */}
          <VStack className="gap-2">
            <Heading size="2xl" className="text-typography-950">
              {lesson.title}
            </Heading>
            <HStack className="gap-3 items-center">
              <Text size="sm" className="text-typography-500">
                {lesson.duration} min
              </Text>
              <Text size="sm" className="text-typography-400">
                •
              </Text>
              <XPBadge xp={lesson.xpReward} size="sm" />
            </HStack>
          </VStack>

          {/* Video Player */}
          {lesson.type === 'video' && lesson.videoUrl && (
            <VideoPlayer videoUrl={lesson.videoUrl} thumbnail={lesson.thumbnail} />
          )}

          {/* Text Steps */}
          {lesson.type === 'text' && lesson.steps && (
            <VStack className="gap-4">
              {lesson.steps.map((step) => (
                <TextStepView key={step.stepNumber} step={step} />
              ))}
            </VStack>
          )}

          {/* Quick Check Button */}
          {lesson.quickChecks.length > 0 && !isCompleted && (
            <Button action="secondary" onPress={showQuickCheckModal}>
              <ButtonText>Take Quick Check ({lesson.quickChecks.length})</ButtonText>
            </Button>
          )}

          {/* Resources */}
          {lesson.resources.length > 0 && (
            <ResourceList
              resources={lesson.resources}
              onResourcePress={(resource) => console.log('Open resource:', resource)}
            />
          )}

          {/* Glossary */}
          {lesson.glossaryTerms.length > 0 && (
            <GlossaryPanel terms={lesson.glossaryTerms} />
          )}
        </VStack>
      </ScrollView>

      {/* Bottom Navigation */}
      <Box className="bg-white border-t border-outline-200 p-4">
        <SafeAreaView edges={['bottom']}>
          <HStack className="gap-3">
            {previousLesson ? (
              <Button
                action="secondary"
                size="md"
                className="flex-1"
                onPress={() => router.replace(`/learn/lesson/${previousLesson.id}`)}
              >
                <ChevronLeft size={18} color="#6B7280" />
                <ButtonText>Previous</ButtonText>
              </Button>
            ) : (
              <Box className="flex-1" />
            )}

            <Button
              action="primary"
              size="md"
              className="flex-1"
              onPress={handleComplete}
            >
              <ButtonText>{isCompleted ? 'Next Lesson' : 'Mark Complete'}</ButtonText>
              {nextLesson && <ChevronRight size={18} color="#FFFFFF" />}
            </Button>
          </HStack>
        </SafeAreaView>
      </Box>

      {/* Quick Check Modal */}
      {lesson.quickChecks.length > 0 && (
        <QuickCheck
          isOpen={showQuickCheck}
          question={lesson.quickChecks[currentQuickCheckIndex]}
          onComplete={handleQuickCheckComplete}
        />
      )}
    </Box>
  );
}
