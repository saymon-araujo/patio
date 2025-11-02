/**
 * Search Modal Component
 * Full-screen search for courses with autocomplete
 */

import React, { useState } from 'react';
import { Modal, ModalBackdrop, ModalContent } from '@/components/ui/modal';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { ScrollView } from '@/components/ui/scroll-view';
import { Pressable } from 'react-native';
import { Course, MOCK_COURSES } from '@/utils/mock-data/courses';
import { CourseCard } from './course-card';
import { Search, X } from 'lucide-react-native';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = searchQuery.trim()
    ? MOCK_COURSES.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalBackdrop />
      <ModalContent className="flex-1">
        <Box className="flex-1 bg-white">
          <SafeAreaView edges={['top']} className="bg-white">
            <HStack className="px-6 py-4 gap-3 items-center border-b border-outline-200">
              <Search size={20} color="#6B7280" />
              <Input className="flex-1 border-0">
                <InputField
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus
                />
              </Input>
              <Pressable onPress={onClose}>
                <X size={24} color="#6B7280" />
              </Pressable>
            </HStack>
          </SafeAreaView>

          <ScrollView className="flex-1 bg-background-50">
            {searchQuery.trim() === '' ? (
              <VStack className="p-6 gap-4">
                <Heading size="md" className="text-typography-600">
                  Popular Searches
                </Heading>
                <VStack className="gap-2">
                  {['electrical', 'plumbing', 'woodworking', 'beginner', 'safety'].map(
                    (term) => (
                      <Pressable key={term} onPress={() => setSearchQuery(term)}>
                        <HStack className="p-3 bg-white rounded-lg">
                          <Text className="text-typography-700 capitalize">{term}</Text>
                        </HStack>
                      </Pressable>
                    )
                  )}
                </VStack>
              </VStack>
            ) : searchResults.length > 0 ? (
              <VStack className="p-6 gap-3">
                <Text size="sm" className="text-typography-500">
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                </Text>
                {searchResults.map((course) => (
                  <CourseCard key={course.id} course={course} variant="list" />
                ))}
              </VStack>
            ) : (
              <VStack className="items-center justify-center py-16 gap-4">
                <Search size={64} color="#9CA3AF" />
                <Heading size="lg" className="text-typography-600">
                  No Results Found
                </Heading>
                <Text size="md" className="text-typography-500 text-center px-8">
                  Try different keywords or browse categories
                </Text>
              </VStack>
            )}
          </ScrollView>
        </Box>
      </ModalContent>
    </Modal>
  );
};
