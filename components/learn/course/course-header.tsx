/**
 * Course Header Component
 * Hero section for course detail page
 */

import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Image } from 'expo-image';
import { Course } from '@/utils/mock-data/courses';
import { Star, Clock, Users } from 'lucide-react-native';

interface CourseHeaderProps {
  course: Course;
}

export const CourseHeader = ({ course }: CourseHeaderProps) => {
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

  return (
    <VStack className="gap-4">
      <Image
        source={{ uri: course.thumbnail }}
        style={{ width: '100%', height: 200, borderRadius: 12 }}
        contentFit="cover"
        cachePolicy="memory-disk"
      />
      <VStack className="gap-3">
        <HStack className="gap-2 items-center flex-wrap">
          <Badge action={getDifficultyColor(course.difficulty)}>
            <BadgeText className="capitalize">{course.difficulty}</BadgeText>
          </Badge>
          <Badge action="muted">
            <BadgeText className="capitalize">{course.category}</BadgeText>
          </Badge>
          {course.isNew && (
            <Badge action="info">
              <BadgeText>NEW</BadgeText>
            </Badge>
          )}
        </HStack>

        <Heading size="3xl" className="text-typography-950">
          {course.title}
        </Heading>

        <HStack className="gap-4 items-center flex-wrap">
          <HStack className="gap-1 items-center">
            <Star size={16} color="#F59E0B" fill="#F59E0B" />
            <Text size="sm" className="text-typography-700 font-semibold">
              {course.rating}
            </Text>
            <Text size="sm" className="text-typography-500">
              ({course.reviewCount} reviews)
            </Text>
          </HStack>

          <HStack className="gap-1 items-center">
            <Clock size={16} color="#6B7280" />
            <Text size="sm" className="text-typography-600">
              {course.estimatedTime} min
            </Text>
          </HStack>

          <HStack className="gap-1 items-center">
            <Users size={16} color="#6B7280" />
            <Text size="sm" className="text-typography-600">
              {course.enrollmentCount.toLocaleString()} enrolled
            </Text>
          </HStack>
        </HStack>

        <HStack className="gap-3 items-center mt-2">
          <Avatar size="md">
            <AvatarFallbackText>{course.instructor.name}</AvatarFallbackText>
          </Avatar>
          <VStack className="gap-0">
            <Text size="sm" className="text-typography-700 font-semibold">
              {course.instructor.name}
            </Text>
            <Text size="xs" className="text-typography-500">
              {course.instructor.title}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};
