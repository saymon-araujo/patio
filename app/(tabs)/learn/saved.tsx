/**
 * Saved & Downloads Screen
 * Displays saved courses, downloaded lessons, and PDFs
 */

import React, { useState } from 'react';
import { router } from 'expo-router';
import { Box } from '@/components/ui/box';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { ScrollView } from '@/components/ui/scroll-view';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Button, ButtonText } from '@/components/ui/button';
import { Header } from '@/components/navigation/header';
import { CourseCard } from '@/components/learn/course/course-card';
import { useLearn } from '@/contexts/learn-context';
import { getCourseById } from '@/utils/mock-data/courses';
import { Pressable } from 'react-native';
import { Bookmark, Download, FileText, Trash2 } from 'lucide-react-native';

type SavedTab = 'courses' | 'downloads' | 'pdfs';

export default function SavedScreen() {
  const { savedCourses } = useLearn();
  const [activeTab, setActiveTab] = useState<SavedTab>('courses');

  const savedCoursesData = savedCourses.map((id) => getCourseById(id)).filter(Boolean);

  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-white">
        <Header variant="navigation" title="Saved" onBack={() => router.back()} />
      </SafeAreaView>

      <VStack className="flex-1 bg-background-50">
        {/* Tab Navigation */}
        <HStack className="px-6 pt-4 gap-2">
          <Pressable onPress={() => setActiveTab('courses')} style={{ flex: 1 }}>
            <Box
              className={`p-3 rounded-lg ${
                activeTab === 'courses' ? 'bg-primary-500' : 'bg-white border border-outline-200'
              }`}
            >
              <Text
                size="sm"
                className={`text-center font-semibold ${
                  activeTab === 'courses' ? 'text-white' : 'text-typography-600'
                }`}
              >
                Saved
              </Text>
            </Box>
          </Pressable>
          <Pressable onPress={() => setActiveTab('downloads')} style={{ flex: 1 }}>
            <Box
              className={`p-3 rounded-lg ${
                activeTab === 'downloads'
                  ? 'bg-primary-500'
                  : 'bg-white border border-outline-200'
              }`}
            >
              <Text
                size="sm"
                className={`text-center font-semibold ${
                  activeTab === 'downloads' ? 'text-white' : 'text-typography-600'
                }`}
              >
                Downloads
              </Text>
            </Box>
          </Pressable>
          <Pressable onPress={() => setActiveTab('pdfs')} style={{ flex: 1 }}>
            <Box
              className={`p-3 rounded-lg ${
                activeTab === 'pdfs' ? 'bg-primary-500' : 'bg-white border border-outline-200'
              }`}
            >
              <Text
                size="sm"
                className={`text-center font-semibold ${
                  activeTab === 'pdfs' ? 'text-white' : 'text-typography-600'
                }`}
              >
                PDFs
              </Text>
            </Box>
          </Pressable>
        </HStack>

        <ScrollView className="flex-1">
          <VStack className="p-6 gap-4">
            {/* Saved Courses Tab */}
            {activeTab === 'courses' && (
              <>
                {savedCoursesData.length > 0 ? (
                  savedCoursesData.map((course) => (
                    <CourseCard key={course.id} course={course} variant="list" />
                  ))
                ) : (
                  <VStack className="items-center justify-center py-16 gap-4">
                    <Bookmark size={64} color="#9CA3AF" />
                    <Heading size="lg" className="text-typography-600 text-center">
                      No Saved Courses
                    </Heading>
                    <Text size="md" className="text-typography-500 text-center">
                      Bookmark courses to access them quickly later
                    </Text>
                  </VStack>
                )}
              </>
            )}

            {/* Downloads Tab */}
            {activeTab === 'downloads' && (
              <VStack className="gap-4">
                <Card className="p-4">
                  <VStack className="gap-3">
                    <HStack className="justify-between items-center">
                      <Heading size="md" className="text-typography-950">
                        Storage Used
                      </Heading>
                      <Text size="sm" className="text-typography-600">
                        0 MB / 500 MB
                      </Text>
                    </HStack>
                    <HStack className="bg-outline-200 h-2 rounded-full overflow-hidden">
                      <HStack className="bg-primary-500 h-full" style={{ width: '0%' }} />
                    </HStack>
                  </VStack>
                </Card>

                <VStack className="items-center justify-center py-16 gap-4">
                  <Download size={64} color="#9CA3AF" />
                  <Heading size="lg" className="text-typography-600 text-center">
                    No Downloaded Lessons
                  </Heading>
                  <Text size="md" className="text-typography-500 text-center">
                    Download lessons to watch offline
                  </Text>
                </VStack>
              </VStack>
            )}

            {/* PDFs Tab */}
            {activeTab === 'pdfs' && (
              <VStack className="items-center justify-center py-16 gap-4">
                <FileText size={64} color="#9CA3AF" />
                <Heading size="lg" className="text-typography-600 text-center">
                  No Saved PDFs
                </Heading>
                <Text size="md" className="text-typography-500 text-center">
                  Save cheat-sheets and certificates here
                </Text>
              </VStack>
            )}
          </VStack>
        </ScrollView>
      </VStack>
    </Box>
  );
}
