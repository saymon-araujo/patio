/**
 * Course Detail Screen
 * Displays course information with tabs: Overview, Lessons, Reviews
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
import { Divider } from '@/components/ui/divider';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody } from '@/components/ui/modal';
import { Header } from '@/components/navigation/header';
import { CourseHeader } from '@/components/learn/course/course-header';
import { LessonListItem } from '@/components/learn/course/lesson-list-item';
import { getCourseById } from '@/utils/mock-data/courses';
import { getLessonsByCourseId } from '@/utils/mock-data/lessons';
import { getReviewsByCourseId, getRatingDistribution } from '@/utils/mock-data/reviews';
import { useLearn } from '@/contexts/learn-context';
import { Pressable } from 'react-native';
import { Bookmark, BookmarkCheck, Share2, Clock, Award, Star, ThumbsUp } from 'lucide-react-native';

type CourseTab = 'overview' | 'lessons' | 'reviews';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const { enrollCourse, isEnrolled, getCourseProgress, isLessonCompleted, saveCourse, isSaved, courseProgress } =
    useLearn();
  const [activeTab, setActiveTab] = useState<CourseTab>('overview');
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showPrereqModal, setShowPrereqModal] = useState(false);

  const course = getCourseById(id as string);
  const lessons = getLessonsByCourseId(id as string);
  const reviews = getReviewsByCourseId(id as string);
  const ratingDistribution = getRatingDistribution(id as string);
  const progress = getCourseProgress(id as string);
  const enrolled = isEnrolled(id as string);
  const saved = isSaved(id as string);

  if (!course) {
    return (
      <Box className="flex-1 bg-white items-center justify-center">
        <Text>Course not found</Text>
      </Box>
    );
  }

  const handleEnroll = async () => {
    // Check prerequisites
    if (course.prerequisites.length > 0) {
      const prerequisitesMet = course.prerequisites.every((prereqId) => {
        const prereqProgress = courseProgress[prereqId];
        return prereqProgress && prereqProgress.progress === 1;
      });

      if (!prerequisitesMet) {
        setShowPrereqModal(true);
        return;
      }
    }

    setIsEnrolling(true);
    await enrollCourse(course.id);
    setIsEnrolling(false);
  };

  const handleSave = async () => {
    if (saved) {
      // In real app, would have unsave logic
    } else {
      await saveCourse(course.id);
    }
  };

  const handleContinue = () => {
    if (progress?.currentLessonId) {
      router.push(`/learn/lesson/${progress.currentLessonId}`);
    } else if (lessons.length > 0) {
      router.push(`/learn/lesson/${lessons[0].id}`);
    }
  };

  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-white">
        <Header
          variant="navigation"
          title="Course"
          onBack={() => router.back()}
          actions={[
            {
              icon: saved ? BookmarkCheck : Bookmark,
              onPress: handleSave,
            },
            {
              icon: Share2,
              onPress: () => console.log('Share'),
            },
          ]}
        />
      </SafeAreaView>

      <ScrollView className="flex-1 bg-background-50">
        <VStack className="p-6 gap-6">
          {/* Course Header */}
          <CourseHeader course={course} />

          {/* Tab Navigation */}
          <HStack className="gap-2">
            <Pressable onPress={() => setActiveTab('overview')} style={{ flex: 1 }}>
              <Box
                className={`p-3 rounded-lg ${
                  activeTab === 'overview'
                    ? 'bg-primary-500'
                    : 'bg-white border border-outline-200'
                }`}
              >
                <Text
                  size="sm"
                  className={`text-center font-semibold ${
                    activeTab === 'overview' ? 'text-white' : 'text-typography-600'
                  }`}
                >
                  Overview
                </Text>
              </Box>
            </Pressable>
            <Pressable onPress={() => setActiveTab('lessons')} style={{ flex: 1 }}>
              <Box
                className={`p-3 rounded-lg ${
                  activeTab === 'lessons'
                    ? 'bg-primary-500'
                    : 'bg-white border border-outline-200'
                }`}
              >
                <Text
                  size="sm"
                  className={`text-center font-semibold ${
                    activeTab === 'lessons' ? 'text-white' : 'text-typography-600'
                  }`}
                >
                  Lessons ({lessons.length})
                </Text>
              </Box>
            </Pressable>
            <Pressable onPress={() => setActiveTab('reviews')} style={{ flex: 1 }}>
              <Box
                className={`p-3 rounded-lg ${
                  activeTab === 'reviews'
                    ? 'bg-primary-500'
                    : 'bg-white border border-outline-200'
                }`}
              >
                <Text
                  size="sm"
                  className={`text-center font-semibold ${
                    activeTab === 'reviews' ? 'text-white' : 'text-typography-600'
                  }`}
                >
                  Reviews
                </Text>
              </Box>
            </Pressable>
          </HStack>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <VStack className="gap-4">
              {/* Description */}
              <Card className="p-4">
                <VStack className="gap-3">
                  <Heading size="md" className="text-typography-950">
                    About this course
                  </Heading>
                  <Text size="md" className="text-typography-700">
                    {course.description}
                  </Text>
                </VStack>
              </Card>

              {/* Learning Outcomes */}
              {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                <Card className="p-4">
                  <VStack className="gap-3">
                    <Heading size="md" className="text-typography-950">
                      What You'll Learn
                    </Heading>
                    <VStack className="gap-2">
                      {course.learningOutcomes.map((outcome, index) => (
                        <HStack key={index} className="gap-2">
                          <Text size="md" className="text-success-500 font-bold">
                            ✓
                          </Text>
                          <Text size="sm" className="text-typography-700 flex-1">
                            {outcome}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>
                </Card>
              )}

              {/* Course Info */}
              <Card className="p-4">
                <VStack className="gap-4">
                  <HStack className="gap-3 items-center">
                    <Clock size={20} color="#6B7280" />
                    <VStack className="flex-1">
                      <Text size="sm" className="text-typography-500">
                        Duration
                      </Text>
                      <Text size="md" className="text-typography-950 font-semibold">
                        {course.estimatedTime} minutes
                      </Text>
                    </VStack>
                  </HStack>
                  <Divider />
                  <HStack className="gap-3 items-center">
                    <Award size={20} color="#6B7280" />
                    <VStack className="flex-1">
                      <Text size="sm" className="text-typography-500">
                        Difficulty
                      </Text>
                      <Text size="md" className="text-typography-950 font-semibold capitalize">
                        {course.difficulty}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              </Card>

              {/* Tools Required */}
              {course.toolsList && course.toolsList.length > 0 && (
                <Card className="p-4">
                  <VStack className="gap-3">
                    <Heading size="md" className="text-typography-950">
                      Tools & Materials
                    </Heading>
                    <HStack className="gap-2 flex-wrap">
                      {course.toolsList.map((tool, index) => (
                        <Pressable
                          key={index}
                          onPress={() => console.log('Open Marketplace for:', tool)}
                        >
                          <HStack className="px-3 py-2 bg-primary-50 rounded-lg border border-primary-200">
                            <Text size="sm" className="text-primary-700">
                              {tool}
                            </Text>
                          </HStack>
                        </Pressable>
                      ))}
                    </HStack>
                    <Text size="xs" className="text-primary-500">
                      Tap to find tools on Marketplace
                    </Text>
                  </VStack>
                </Card>
              )}

              {/* Instructor Info */}
              {course.instructor.bio && (
                <Card className="p-4">
                  <VStack className="gap-3">
                    <Heading size="md" className="text-typography-950">
                      About the Instructor
                    </Heading>
                    <HStack className="gap-3 items-start">
                      <Avatar size="lg">
                        <AvatarFallbackText>{course.instructor.name}</AvatarFallbackText>
                      </Avatar>
                      <VStack className="flex-1 gap-2">
                        <VStack className="gap-0">
                          <Text size="md" className="text-typography-950 font-semibold">
                            {course.instructor.name}
                          </Text>
                          <Text size="sm" className="text-typography-600">
                            {course.instructor.title}
                          </Text>
                        </VStack>
                        <Text size="sm" className="text-typography-700">
                          {course.instructor.bio}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Card>
              )}

              {/* Prerequisites */}
              {course.prerequisites.length > 0 && (
                <Card className="p-4">
                  <VStack className="gap-3">
                    <Heading size="md" className="text-typography-950">
                      Prerequisites
                    </Heading>
                    <Text size="sm" className="text-typography-600">
                      Complete these courses first before starting this one
                    </Text>
                  </VStack>
                </Card>
              )}
            </VStack>
          )}

          {activeTab === 'lessons' && (
            <VStack className="gap-3">
              {lessons.map((lesson, index) => (
                <LessonListItem
                  key={lesson.id}
                  lesson={lesson}
                  lessonNumber={index + 1}
                  isCompleted={isLessonCompleted(lesson.id)}
                  isLocked={!enrolled && index > 0}
                />
              ))}
            </VStack>
          )}

          {activeTab === 'reviews' && (
            <VStack className="gap-4">
              {/* Rating Distribution */}
              <Card className="p-4">
                <VStack className="gap-4">
                  <Heading size="md" className="text-typography-950">
                    Rating Breakdown
                  </Heading>
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = ratingDistribution[stars] || 0;
                    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                    return (
                      <HStack key={stars} className="gap-3 items-center">
                        <HStack className="gap-1 items-center w-12">
                          <Text size="sm" className="text-typography-700">
                            {stars}
                          </Text>
                          <Star size={14} color="#F59E0B" fill="#F59E0B" />
                        </HStack>
                        <HStack className="flex-1 bg-outline-200 h-2 rounded-full overflow-hidden">
                          <HStack
                            className="bg-warning-500 h-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </HStack>
                        <Text size="sm" className="text-typography-600 w-10 text-right">
                          {count}
                        </Text>
                      </HStack>
                    );
                  })}
                </VStack>
              </Card>

              {/* Reviews List */}
              <VStack className="gap-3">
                {reviews.map((review) => (
                  <Card key={review.id} className="p-4">
                    <VStack className="gap-3">
                      <HStack className="gap-3 items-start">
                        <Avatar size="md">
                          <AvatarFallbackText>{review.username}</AvatarFallbackText>
                        </Avatar>
                        <VStack className="flex-1 gap-1">
                          <HStack className="justify-between items-start">
                            <Text size="sm" className="text-typography-950 font-semibold">
                              {review.username}
                            </Text>
                            <HStack className="gap-1 items-center">
                              <Star size={14} color="#F59E0B" fill="#F59E0B" />
                              <Text size="sm" className="text-typography-700">
                                {review.rating}
                              </Text>
                            </HStack>
                          </HStack>
                          <Text size="xs" className="text-typography-500">
                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </Text>
                        </VStack>
                      </HStack>
                      <Text size="sm" className="text-typography-700">
                        {review.comment}
                      </Text>
                      <HStack className="gap-2 items-center">
                        <ThumbsUp size={14} color="#6B7280" />
                        <Text size="xs" className="text-typography-500">
                          {review.helpful} found this helpful
                        </Text>
                      </HStack>
                    </VStack>
                  </Card>
                ))}
              </VStack>

              {/* Write Review Button */}
              {enrolled && progress?.progress === 1 && (
                <Button action="secondary">
                  <ButtonText>Write a Review</ButtonText>
                </Button>
              )}
            </VStack>
          )}
        </VStack>
      </ScrollView>

      {/* Bottom CTA */}
      <Box className="bg-white border-t border-outline-200 p-4">
        <SafeAreaView edges={['bottom']}>
          {enrolled ? (
            <Button action="primary" size="lg" onPress={handleContinue}>
              <ButtonText>
                {progress?.progress === 1
                  ? 'Restart Course'
                  : progress?.currentLessonId
                  ? 'Continue Learning'
                  : 'Start Course'}
              </ButtonText>
            </Button>
          ) : (
            <Button action="primary" size="lg" onPress={handleEnroll} isDisabled={isEnrolling}>
              <ButtonText>{isEnrolling ? 'Enrolling...' : 'Enroll in Course'}</ButtonText>
            </Button>
          )}
        </SafeAreaView>
      </Box>

      {/* Prerequisite Modal */}
      <Modal isOpen={showPrereqModal} onClose={() => setShowPrereqModal(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg" className="text-typography-950">
              Prerequisites Required
            </Heading>
          </ModalHeader>
          <ModalBody className="p-6">
            <VStack className="gap-4">
              <Text size="md" className="text-typography-700">
                You need to complete these courses first before enrolling in this course:
              </Text>
              <VStack className="gap-2">
                {course.prerequisites.map((prereqId) => {
                  const prereqCourse = getCourseById(prereqId);
                  if (!prereqCourse) return null;
                  const prereqProgress = courseProgress[prereqId];
                  const isCompleted = prereqProgress && prereqProgress.progress === 1;

                  return (
                    <Card key={prereqId} className="p-3">
                      <HStack className="gap-3 items-center">
                        <Box
                          className={`w-6 h-6 rounded-full ${
                            isCompleted ? 'bg-success-500' : 'bg-outline-300'
                          } items-center justify-center`}
                        >
                          {isCompleted ? (
                            <Text className="text-white font-bold">✓</Text>
                          ) : (
                            <Text className="text-typography-500">!</Text>
                          )}
                        </Box>
                        <Text size="sm" className="text-typography-950 flex-1">
                          {prereqCourse.title}
                        </Text>
                      </HStack>
                    </Card>
                  );
                })}
              </VStack>
              <HStack className="gap-3">
                <Button action="secondary" className="flex-1" onPress={() => setShowPrereqModal(false)}>
                  <ButtonText>Close</ButtonText>
                </Button>
                <Button
                  action="primary"
                  className="flex-1"
                  onPress={() => {
                    const firstIncomplete = course.prerequisites.find((prereqId) => {
                      const prereqProgress = courseProgress[prereqId];
                      return !prereqProgress || prereqProgress.progress !== 1;
                    });
                    if (firstIncomplete) {
                      router.push(`/learn/course/${firstIncomplete}`);
                    }
                  }}
                >
                  <ButtonText>View Course</ButtonText>
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
