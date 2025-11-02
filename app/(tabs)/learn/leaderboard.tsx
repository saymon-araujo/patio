/**
 * Leaderboard & Streaks Screen
 * Shows rankings, XP, levels, and daily streak tracking
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
import { Badge, BadgeText } from '@/components/ui/badge';
import { Header } from '@/components/navigation/header';
import { LeaderboardEntry } from '@/components/learn/gamification/leaderboard-entry';
import { LevelProgress } from '@/components/learn/gamification/level-progress';
import { StreakCounter } from '@/components/learn/gamification/streak-counter';
import { MOCK_LEADERBOARD } from '@/utils/mock-data/leaderboard';
import { useGamification } from '@/contexts/gamification-context';
import { Pressable } from 'react-native';

type LeaderboardPeriod = 'weekly' | 'monthly' | 'all-time';

export default function LeaderboardScreen() {
  const { totalXP, level, levelProgress, xpToNextLevel, currentStreak, longestStreak, badges, useStreakFreeze, canUseStreakFreeze } =
    useGamification();
  const [period, setPeriod] = useState<LeaderboardPeriod>('weekly');
  const [view, setView] = useState<'global' | 'friends'>('global');

  const handleUseFreeze = async () => {
    await useStreakFreeze();
  };

  // Find current user entry
  const currentUserEntry = MOCK_LEADERBOARD.find((e) => e.isCurrentUser);

  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-white">
        <Header variant="navigation" title="Leaderboard" onBack={() => router.back()} />
      </SafeAreaView>
      <ScrollView className="flex-1 bg-background-50">
        <VStack className="pb-8 gap-6">
          {/* Your Stats Card */}
          <Card className="mx-6 mt-4 p-4 bg-gradient-to-br from-primary-50 to-primary-100">
            <VStack className="gap-4">
              <HStack className="justify-between items-center">
                <Heading size="lg" className="text-typography-950">
                  Your Stats
                </Heading>
                {currentUserEntry && (
                  <Badge action="info">
                    <BadgeText>Rank #{currentUserEntry.rank}</BadgeText>
                  </Badge>
                )}
              </HStack>

              <LevelProgress
                level={level}
                progress={levelProgress}
                xpToNext={xpToNextLevel}
                currentXP={totalXP}
              />

              <HStack className="gap-3">
                <StreakCounter
                  currentStreak={currentStreak}
                  longestStreak={longestStreak}
                  variant="compact"
                />
                <HStack className="flex-1 items-center justify-center gap-2 px-3 py-2 bg-success-50 rounded-lg">
                  <Text size="sm" className="text-success-600">
                    🏆 {badges.length} Badges
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </Card>

          {/* Period Tabs */}
          <VStack className="gap-3">
            <HStack className="px-6 gap-2">
              <Pressable onPress={() => setPeriod('weekly')} style={{ flex: 1 }}>
                <Box
                  className={`p-3 rounded-lg ${
                    period === 'weekly' ? 'bg-primary-500' : 'bg-white border border-outline-200'
                  }`}
                >
                  <Text
                    size="sm"
                    className={`text-center font-semibold ${
                      period === 'weekly' ? 'text-white' : 'text-typography-600'
                    }`}
                  >
                    Weekly
                  </Text>
                </Box>
              </Pressable>
              <Pressable onPress={() => setPeriod('monthly')} style={{ flex: 1 }}>
                <Box
                  className={`p-3 rounded-lg ${
                    period === 'monthly' ? 'bg-primary-500' : 'bg-white border border-outline-200'
                  }`}
                >
                  <Text
                    size="sm"
                    className={`text-center font-semibold ${
                      period === 'monthly' ? 'text-white' : 'text-typography-600'
                    }`}
                  >
                    Monthly
                  </Text>
                </Box>
              </Pressable>
              <Pressable onPress={() => setPeriod('all-time')} style={{ flex: 1 }}>
                <Box
                  className={`p-3 rounded-lg ${
                    period === 'all-time' ? 'bg-primary-500' : 'bg-white border border-outline-200'
                  }`}
                >
                  <Text
                    size="sm"
                    className={`text-center font-semibold ${
                      period === 'all-time' ? 'text-white' : 'text-typography-600'
                    }`}
                  >
                    All-Time
                  </Text>
                </Box>
              </Pressable>
            </HStack>

            {/* Global/Friends Toggle */}
            <HStack className="px-6 gap-2 justify-center">
              <Pressable onPress={() => setView('global')}>
                <Badge action={view === 'global' ? 'info' : 'muted'}>
                  <BadgeText>Global</BadgeText>
                </Badge>
              </Pressable>
              <Pressable onPress={() => setView('friends')}>
                <Badge action={view === 'friends' ? 'info' : 'muted'}>
                  <BadgeText>Friends</BadgeText>
                </Badge>
              </Pressable>
            </HStack>
          </VStack>

          {/* Leaderboard Entries */}
          <VStack className="px-6 gap-2">
            <Heading size="lg" className="text-typography-950 mb-2">
              {period === 'weekly'
                ? 'This Week'
                : period === 'monthly'
                ? 'This Month'
                : 'All Time'}{' '}
              Rankings
            </Heading>
            {MOCK_LEADERBOARD.map((entry) => (
              <LeaderboardEntry key={entry.userId} entry={entry} />
            ))}
          </VStack>

          {/* Streak Info */}
          <Card className="mx-6 p-4">
            <VStack className="gap-4">
              <Heading size="lg" className="text-typography-950">
                Keep Your Streak Going!
              </Heading>
              <Text size="sm" className="text-typography-600">
                Complete at least one lesson per day to maintain your streak. Use a streak freeze to
                protect your progress if you need a break.
              </Text>
              <HStack className="gap-3">
                <Button action="secondary" size="sm" className="flex-1">
                  <ButtonText>Learn More</ButtonText>
                </Button>
                <Button
                  action="primary"
                  size="sm"
                  className="flex-1"
                  onPress={handleUseFreeze}
                  isDisabled={!canUseStreakFreeze}
                >
                  <ButtonText>
                    {canUseStreakFreeze ? 'Use Freeze (1)' : 'Freeze Used'}
                  </ButtonText>
                </Button>
              </HStack>
            </VStack>
          </Card>
        </VStack>
      </ScrollView>
    </Box>
  );
}
