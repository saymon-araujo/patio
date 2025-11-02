/**
 * Course Card Component
 * Displays course information in grid or list format
 */

import React from 'react';
import { Pressable } from 'react-native';
import { router } from 'expo-router';
import { Card } from '@/components/ui/card';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Image } from 'expo-image';
import { Course } from '@/utils/mock-data/courses';
import { Star } from 'lucide-react-native';

interface CourseCardProps {
  course: Course;
  variant?: 'grid' | 'list';
  showProgress?: boolean;
}

export const CourseCard = ({ course, variant = 'grid', showProgress = false }: CourseCardProps) => {
  const handlePress = () => {
    router.push(`/learn/course/${course.id}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'muted';
    }
  };

  if (variant === 'list') {
    return (
      <Pressable onPress={handlePress}>
        <Card className="p-4 mb-3 bg-white">
          <HStack className="gap-4">
            <Image
              source={{ uri: course.thumbnail }}
              style={{ width: 120, height: 90, borderRadius: 8 }}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
            <VStack className="flex-1 gap-2">
              {course.isNew && (
                <Badge action="info" className="self-start">
                  <BadgeText>NEW</BadgeText>
                </Badge>
              )}
              <Heading size="md" className="text-typography-950">
                {course.title}
              </Heading>
              <HStack className="gap-2 items-center">
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text size="sm" className="text-typography-600">
                  {course.rating} ({course.reviewCount})
                </Text>
                <Text size="sm" className="text-typography-500">
                  • {course.estimatedTime}min
                </Text>
              </HStack>
              <Badge action={getDifficultyColor(course.difficulty)} className="self-start">
                <BadgeText className="capitalize">{course.difficulty}</BadgeText>
              </Badge>
            </VStack>
          </HStack>
        </Card>
      </Pressable>
    );
  }

  // Grid variant (default)
  return (
    <Pressable onPress={handlePress}>
      <Card className="p-0 mb-4 bg-white" style={{ width: 180 }}>
        <VStack className="gap-3">
          <Image
            source={{ uri: course.thumbnail }}
            style={{ width: '100%', height: 120, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            contentFit="cover"
            cachePolicy="memory-disk"
          />
          <VStack className="px-3 pb-3 gap-2">
            {course.isNew && (
              <Badge action="info" className="self-start">
                <BadgeText>NEW</BadgeText>
              </Badge>
            )}
            <Heading size="sm" className="text-typography-950" numberOfLines={2}>
              {course.title}
            </Heading>
            <HStack className="gap-1 items-center">
              <Star size={12} color="#F59E0B" fill="#F59E0B" />
              <Text size="xs" className="text-typography-600">
                {course.rating}
              </Text>
              <Text size="xs" className="text-typography-500">
                ({course.reviewCount})
              </Text>
            </HStack>
            <Text size="xs" className="text-typography-500">
              {course.estimatedTime} min
            </Text>
            <Badge action={getDifficultyColor(course.difficulty)} className="self-start">
              <BadgeText className="capitalize" style={{ fontSize: 10 }}>
                {course.difficulty}
              </BadgeText>
            </Badge>
            {showProgress && course.progress !== undefined && (
              <VStack className="gap-1 mt-1">
                <HStack className="bg-outline-200 h-1.5 rounded-full overflow-hidden">
                  <HStack
                    className="bg-primary-500 h-full"
                    style={{ width: `${course.progress * 100}%` }}
                  />
                </HStack>
                <Text size="xs" className="text-typography-500">
                  {Math.round(course.progress * 100)}% complete
                </Text>
              </VStack>
            )}
          </VStack>
        </VStack>
      </Card>
    </Pressable>
  );
};
