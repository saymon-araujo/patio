/**
 * Gamification Context
 * Manages XP, levels, badges, streaks, and leaderboard data
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Badge,
  UserStats,
  MOCK_USER_STATS,
  ALL_BADGES,
  getLevelFromXP,
  getLevelProgress,
  getBadgeById,
} from '@/utils/mock-data/leaderboard';
import { checkCourseBadges } from '@/utils/badge-checker';

const STORAGE_KEYS = {
  USER_STATS: '@patio:user_stats',
  XP_HISTORY: '@patio:xp_history',
  STREAK_DATA: '@patio:streak_data',
};

interface GamificationContextValue {
  // User stats
  userStats: UserStats;
  totalXP: number;
  level: number;
  levelProgress: number; // 0-1
  xpToNextLevel: number;
  currentStreak: number;
  longestStreak: number;
  badges: Badge[];
  isLoading: boolean;

  // XP actions
  addXP: (amount: number, source: string) => Promise<void>;

  // Badge actions
  unlockBadge: (badgeId: string) => Promise<void>;
  hasBadge: (badgeId: string) => boolean;

  // Streak actions
  updateStreak: () => Promise<void>;
  useStreakFreeze: () => Promise<void>;
  canUseStreakFreeze: boolean;

  // Stats
  incrementLessonsCompleted: () => Promise<void>;
  incrementCoursesCompleted: (courseId: string) => Promise<void>;
  incrementQuizzesPassed: () => Promise<void>;

  // Badge checking
  checkAndUnlockCourseBadges: (courseId: string) => Promise<void>;
}

const GamificationContext = createContext<GamificationContextValue | undefined>(undefined);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within GamificationProvider');
  }
  return context;
};

interface GamificationProviderProps {
  children: ReactNode;
}

export const GamificationProvider = ({ children }: GamificationProviderProps) => {
  const [userStats, setUserStats] = useState<UserStats>(MOCK_USER_STATS);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  // Update streak daily
  useEffect(() => {
    checkDailyStreak();
  }, []);

  const loadData = async () => {
    try {
      const storedStats = await AsyncStorage.getItem(STORAGE_KEYS.USER_STATS);

      if (storedStats) {
        const parsed = JSON.parse(storedStats);
        // Convert date strings back to Date objects
        parsed.lastActivityDate = new Date(parsed.lastActivityDate);
        parsed.badges = parsed.badges.map((b: Badge) => ({
          ...b,
          unlockedAt: b.unlockedAt ? new Date(b.unlockedAt) : undefined,
        }));
        setUserStats(parsed);
      } else {
        // Initialize with mock data
        await AsyncStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(MOCK_USER_STATS));
      }
    } catch (error) {
      console.error('Error loading gamification data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserStats = async (stats: UserStats) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
      setUserStats(stats);
    } catch (error) {
      console.error('Error saving user stats:', error);
    }
  };

  // Check if it's a new day and update streak
  const checkDailyStreak = async () => {
    const today = new Date();
    const lastActivity = new Date(userStats.lastActivityDate);

    const isToday =
      today.getDate() === lastActivity.getDate() &&
      today.getMonth() === lastActivity.getMonth() &&
      today.getFullYear() === lastActivity.getFullYear();

    if (!isToday) {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const isYesterday =
        yesterday.getDate() === lastActivity.getDate() &&
        yesterday.getMonth() === lastActivity.getMonth() &&
        yesterday.getFullYear() === lastActivity.getFullYear();

      // If last activity was not yesterday, reset streak (unless freeze is used)
      if (!isYesterday && !userStats.freezeUsedThisMonth) {
        const updatedStats: UserStats = {
          ...userStats,
          currentStreak: 0,
        };
        await saveUserStats(updatedStats);
      }
    }
  };

  // Add XP
  const addXP = async (amount: number, source: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      const newXP = userStats.totalXP + amount;
      const newLevel = getLevelFromXP(newXP);
      const { progress, xpToNext } = getLevelProgress(newXP);

      const updatedStats: UserStats = {
        ...userStats,
        totalXP: newXP,
        level: newLevel,
        levelProgress: progress,
        xpToNextLevel: xpToNext,
        lastActivityDate: new Date(),
      };

      await saveUserStats(updatedStats);

      // Log XP gain (for history tracking)
      console.log(`+${amount} XP from ${source}`);
    } catch (error) {
      console.error('Error adding XP:', error);
    }
  };

  // Unlock a badge
  const unlockBadge = async (badgeId: string) => {
    try {
      // Check if already unlocked
      if (userStats.badges.some((b) => b.id === badgeId)) {
        return;
      }

      const badge = getBadgeById(badgeId);
      if (!badge) return;

      const unlockedBadge: Badge = {
        ...badge,
        unlockedAt: new Date(),
      };

      const updatedStats: UserStats = {
        ...userStats,
        badges: [...userStats.badges, unlockedBadge],
        totalXP: userStats.totalXP + badge.xpReward,
      };

      const newLevel = getLevelFromXP(updatedStats.totalXP);
      const { progress, xpToNext } = getLevelProgress(updatedStats.totalXP);

      updatedStats.level = newLevel;
      updatedStats.levelProgress = progress;
      updatedStats.xpToNextLevel = xpToNext;

      await saveUserStats(updatedStats);

      console.log(`Badge unlocked: ${badge.name} (+${badge.xpReward} XP)`);
    } catch (error) {
      console.error('Error unlocking badge:', error);
    }
  };

  // Check if user has a badge
  const hasBadge = (badgeId: string): boolean => {
    return userStats.badges.some((b) => b.id === badgeId);
  };

  // Update daily streak
  const updateStreak = async () => {
    try {
      const today = new Date();
      const lastActivity = new Date(userStats.lastActivityDate);

      const isToday =
        today.getDate() === lastActivity.getDate() &&
        today.getMonth() === lastActivity.getMonth() &&
        today.getFullYear() === lastActivity.getFullYear();

      // Only update if not already updated today
      if (isToday) return;

      const newStreak = userStats.currentStreak + 1;
      const newLongestStreak = Math.max(newStreak, userStats.longestStreak);

      const updatedStats: UserStats = {
        ...userStats,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastActivityDate: today,
        totalXP: userStats.totalXP + 10, // Daily streak bonus
      };

      const newLevel = getLevelFromXP(updatedStats.totalXP);
      const { progress, xpToNext } = getLevelProgress(updatedStats.totalXP);

      updatedStats.level = newLevel;
      updatedStats.levelProgress = progress;
      updatedStats.xpToNextLevel = xpToNext;

      await saveUserStats(updatedStats);

      // Check for streak badges
      if (newStreak === 7) {
        await unlockBadge('week-warrior');
      } else if (newStreak === 100) {
        await unlockBadge('century');
      }
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  // Use streak freeze
  const useStreakFreeze = async () => {
    try {
      if (!userStats.freezeAvailable || userStats.freezeUsedThisMonth) {
        return;
      }

      const updatedStats: UserStats = {
        ...userStats,
        freezeUsedThisMonth: true,
        freezeAvailable: false,
      };

      await saveUserStats(updatedStats);
    } catch (error) {
      console.error('Error using streak freeze:', error);
    }
  };

  // Increment counters
  const incrementLessonsCompleted = async () => {
    try {
      const updatedStats: UserStats = {
        ...userStats,
        lessonsCompleted: userStats.lessonsCompleted + 1,
      };
      await saveUserStats(updatedStats);

      // Check for first lesson badge
      if (updatedStats.lessonsCompleted === 1) {
        await unlockBadge('first-steps');
      }
    } catch (error) {
      console.error('Error incrementing lessons completed:', error);
    }
  };

  const incrementCoursesCompleted = async (courseId: string) => {
    try {
      const updatedStats: UserStats = {
        ...userStats,
        coursesCompleted: userStats.coursesCompleted + 1,
      };
      await saveUserStats(updatedStats);

      // Check for first course badge
      if (updatedStats.coursesCompleted === 1) {
        await unlockBadge('course-crusher');
      }

      // Check for course-specific badges
      await checkAndUnlockCourseBadges(courseId);
    } catch (error) {
      console.error('Error incrementing courses completed:', error);
    }
  };

  // Check and unlock course-specific badges
  const checkAndUnlockCourseBadges = async (courseId: string) => {
    try {
      const badgeIds = checkCourseBadges(courseId);

      for (const badgeId of badgeIds) {
        if (!hasBadge(badgeId)) {
          await unlockBadge(badgeId);
        }
      }
    } catch (error) {
      console.error('Error checking course badges:', error);
    }
  };

  const incrementQuizzesPassed = async () => {
    try {
      const updatedStats: UserStats = {
        ...userStats,
        quizzesPassed: userStats.quizzesPassed + 1,
      };
      await saveUserStats(updatedStats);

      // Check for quiz master badge (10 perfect scores)
      if (updatedStats.quizzesPassed === 10) {
        await unlockBadge('quiz-master');
      }
    } catch (error) {
      console.error('Error incrementing quizzes passed:', error);
    }
  };

  const value: GamificationContextValue = {
    userStats,
    totalXP: userStats.totalXP,
    level: userStats.level,
    levelProgress: userStats.levelProgress,
    xpToNextLevel: userStats.xpToNextLevel,
    currentStreak: userStats.currentStreak,
    longestStreak: userStats.longestStreak,
    badges: userStats.badges,
    isLoading,
    addXP,
    unlockBadge,
    hasBadge,
    updateStreak,
    useStreakFreeze,
    canUseStreakFreeze: userStats.freezeAvailable && !userStats.freezeUsedThisMonth,
    incrementLessonsCompleted,
    incrementCoursesCompleted,
    incrementQuizzesPassed,
    checkAndUnlockCourseBadges,
  };

  return <GamificationContext.Provider value={value}>{children}</GamificationContext.Provider>;
};
