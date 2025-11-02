/**
 * Learn Tab - Library/Home Screen
 * Main discovery and learning hub with course recommendations
 */

import { CategoryCard } from "@/components/learn/course/category-card";
import { CourseCard } from "@/components/learn/course/course-card";
import {
  DifficultyFilter,
  FilterBar,
  TimeFilter,
  ToolsFilter,
} from "@/components/learn/course/filter-bar";
import { SearchModal } from "@/components/learn/course/search-modal";
import { Header } from "@/components/navigation/header";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useGamification } from "@/contexts/gamification-context";
import {
  CourseCategory,
  MOCK_CATEGORIES,
  getInProgressCourses,
  getNewCourses,
  getRecommendedCourses,
} from "@/utils/mock-data/courses";
import { router } from "expo-router";
import { Bell, Search } from "lucide-react-native";
import React, { useState } from "react";

export default function LearnLibraryScreen() {
  const { totalXP, level, currentStreak } = useGamification();
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [toolsFilter, setToolsFilter] = useState<ToolsFilter>("all");
  const [showSearch, setShowSearch] = useState(false);

  const inProgressCourses = getInProgressCourses();
  const newCourses = getNewCourses();
  const recommendedCourses = getRecommendedCourses().slice(0, 6);

  // Apply all filters
  const filteredRecommended = recommendedCourses.filter((course) => {
    // Difficulty filter
    if (difficultyFilter !== "all" && course.difficulty !== difficultyFilter) {
      return false;
    }

    // Time filter
    if (timeFilter !== "all") {
      if (timeFilter === "short" && course.estimatedTime >= 30) return false;
      if (timeFilter === "medium" && (course.estimatedTime < 30 || course.estimatedTime >= 60))
        return false;
      if (timeFilter === "long" && course.estimatedTime < 60) return false;
    }

    // Tools filter
    if (toolsFilter !== "all" && course.toolsRequired !== toolsFilter) {
      return false;
    }

    return true;
  });

  const handleCategoryPress = (categoryId: CourseCategory) => {
    // In a real app, this would navigate to a filtered course list
    console.log("Category pressed:", categoryId);
  };

  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={["top"]} className="bg-white">
        <Header
          title="Learn"
          showLogo={true}
          actions={[
            {
              icon: Search,
              onPress: () => setShowSearch(true),
            },
            {
              icon: Bell,
              onPress: () => console.log("Notifications"),
              showBadge: true,
            },
          ]}
        />
      </SafeAreaView>

      <ScrollView className="flex-1 bg-background-50">
        <VStack className="gap-6 pb-8">
          {/* User Stats Banner */}
          {/* <HStack className="px-6 pt-4 gap-4 items-center bg-primary-50 py-4">
            <VStack className="flex-1 gap-1">
              <Text size="sm" className="text-typography-600">
                Level {level}
              </Text>
              <Heading size="xl" className="text-typography-950">
                {totalXP.toLocaleString()} XP
              </Heading>
            </VStack>
            <VStack className="items-center gap-1 px-4 py-2 bg-white rounded-lg">
              <Text size="xs" className="text-typography-500">
                🔥 Streak
              </Text>
              <Heading size="lg" className="text-primary-500">
                {currentStreak}
              </Heading>
            </VStack>
            <VStack className="items-center">
              <TrendingUp size={32} className="text-success-500" />
            </VStack>
          </HStack> */}

          {/* Continue Learning Section */}
          {inProgressCourses.length > 0 && (
            <VStack className="gap-3">
              <HStack className="px-6 pt-4 justify-between items-center">
                <Heading size="xl" className="text-typography-950">
                  Continue Learning
                </Heading>
                <Text size="sm" className="text-primary-500 font-semibold">
                  See All
                </Text>
              </HStack>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
                <HStack className="gap-3 pr-6">
                  {inProgressCourses.map((course) => (
                    <CourseCard key={course.id} course={course} showProgress={true} />
                  ))}
                </HStack>
              </ScrollView>
            </VStack>
          )}

          {/* New Courses Section */}
          {newCourses.length > 0 && (
            <VStack className="gap-3">
              <HStack className="px-6 justify-between items-center">
                <Heading size="xl" className="text-typography-950">
                  New Courses
                </Heading>
                <Text size="sm" className="text-primary-500 font-semibold">
                  See All
                </Text>
              </HStack>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
                <HStack className="gap-3 pr-6">
                  {newCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </HStack>
              </ScrollView>
            </VStack>
          )}

          {/* Categories Section */}
          <VStack className="gap-3">
            <HStack className="px-6 justify-between items-center">
              <Heading size="xl" className="text-typography-950">
                Categories
              </Heading>
            </HStack>
            <HStack className="px-6 gap-3 flex-wrap">
              {MOCK_CATEGORIES.map((category) => (
                <Box key={category.id} style={{ width: "47%" }}>
                  <CategoryCard
                    category={category}
                    onPress={() => handleCategoryPress(category.id)}
                  />
                </Box>
              ))}
            </HStack>
          </VStack>

          {/* Recommended Courses Section */}
          <VStack className="gap-3">
            <HStack className="px-6 justify-between items-center">
              <Heading size="xl" className="text-typography-950">
                Recommended for You
              </Heading>
            </HStack>

            {/* Filter Bar */}
            <FilterBar
              onDifficultyChange={setDifficultyFilter}
              onTimeChange={setTimeFilter}
              onToolsChange={setToolsFilter}
            />

            <VStack className="px-6 gap-3">
              {filteredRecommended.map((course) => (
                <CourseCard key={course.id} course={course} variant="list" />
              ))}
              {filteredRecommended.length === 0 && (
                <Text className="text-center text-typography-500 py-8">
                  No courses match your filters
                </Text>
              )}
            </VStack>
          </VStack>

          {/* Quick Access Buttons */}
          <VStack className="px-6 gap-3">
            <HStack className="gap-3">
              <Box
                className="flex-1 p-4 bg-white rounded-lg border border-outline-200"
                onTouchEnd={() => router.push("/learn/leaderboard")}
              >
                <Text className="text-center text-typography-700 font-semibold">
                  🏆 Leaderboard
                </Text>
              </Box>
              <Box
                className="flex-1 p-4 bg-white rounded-lg border border-outline-200"
                onTouchEnd={() => router.push("/learn/saved")}
              >
                <Text className="text-center text-typography-700 font-semibold">📚 Saved</Text>
              </Box>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>

      {/* Search Modal */}
      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </Box>
  );
}
