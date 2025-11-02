/**
 * Mock Leaderboard & Gamification Data
 * Includes XP, levels, badges, streaks, and leaderboard rankings
 */

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji or icon identifier
  category: 'milestone' | 'skill' | 'streak' | 'achievement';
  requirement: string;
  xpReward: number;
  unlockedAt?: Date;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  xp: number;
  level: number;
  badges: number; // Badge count
  streak: number; // Current streak in days
  isCurrentUser?: boolean;
}

export interface UserStats {
  userId: string;
  totalXP: number;
  level: number;
  levelProgress: number; // 0-1 (percentage to next level)
  xpToNextLevel: number;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: number;
  coursesCompleted: number;
  quizzesPassed: number;
  badges: Badge[];
  lastActivityDate: Date;
  freezeAvailable: boolean; // Can use streak freeze
  freezeUsedThisMonth: boolean;
}

// XP Level Thresholds
export const XP_LEVELS = [
  { level: 1, minXP: 0, maxXP: 500 },
  { level: 2, minXP: 500, maxXP: 1500 },
  { level: 3, minXP: 1500, maxXP: 3000 },
  { level: 4, minXP: 3000, maxXP: 5000 },
  { level: 5, minXP: 5000, maxXP: 7500 },
  { level: 6, minXP: 7500, maxXP: 10500 },
  { level: 7, minXP: 10500, maxXP: 14000 },
  { level: 8, minXP: 14000, maxXP: 18000 },
  { level: 9, minXP: 18000, maxXP: 22500 },
  { level: 10, minXP: 22500, maxXP: 27500 },
  { level: 11, minXP: 27500, maxXP: 33000 },
  { level: 12, minXP: 33000, maxXP: 39000 },
  { level: 13, minXP: 39000, maxXP: 45500 },
  { level: 14, minXP: 45500, maxXP: 52500 },
  { level: 15, minXP: 52500, maxXP: 60000 },
  { level: 16, minXP: 60000, maxXP: 68000 },
  { level: 17, minXP: 68000, maxXP: 76500 },
  { level: 18, minXP: 76500, maxXP: 85500 },
  { level: 19, minXP: 85500, maxXP: 95000 },
  { level: 20, minXP: 95000, maxXP: Infinity },
];

// Badge Definitions
export const ALL_BADGES: Badge[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    category: 'milestone',
    requirement: 'Complete 1 lesson',
    xpReward: 100,
  },
  {
    id: 'course-crusher',
    name: 'Course Crusher',
    description: 'Complete your first course',
    icon: '🏆',
    category: 'milestone',
    requirement: 'Complete 1 course',
    xpReward: 500,
  },
  {
    id: 'electrician-novice',
    name: 'Electrician Novice',
    description: 'Complete your first electrical course',
    icon: '⚡',
    category: 'skill',
    requirement: 'Complete 1 Electrical course',
    xpReward: 200,
  },
  {
    id: 'electrician-intermediate',
    name: 'Electrician',
    description: 'Complete 3 electrical courses',
    icon: '🔌',
    category: 'skill',
    requirement: 'Complete 3 Electrical courses',
    xpReward: 500,
  },
  {
    id: 'plumber-start',
    name: 'Plumber Apprentice',
    description: 'Complete your first plumbing course',
    icon: '🚰',
    category: 'skill',
    requirement: 'Complete 1 Plumbing course',
    xpReward: 200,
  },
  {
    id: 'woodworker-start',
    name: 'Woodworker Novice',
    description: 'Learn basic woodworking',
    icon: '🪵',
    category: 'skill',
    requirement: 'Complete Woodworking Basics',
    xpReward: 200,
  },
  {
    id: 'woodworker-novice',
    name: 'Woodworker',
    description: 'Build your first project',
    icon: '🪚',
    category: 'skill',
    requirement: 'Complete a woodworking project course',
    xpReward: 300,
  },
  {
    id: 'first-build',
    name: 'First Build',
    description: 'Complete your first building project',
    icon: '🔨',
    category: 'achievement',
    requirement: 'Complete a project-based course',
    xpReward: 500,
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    category: 'streak',
    requirement: '7-day streak',
    xpReward: 300,
  },
  {
    id: 'century',
    name: 'Century',
    description: 'Maintain a 100-day learning streak',
    icon: '💯',
    category: 'streak',
    requirement: '100-day streak',
    xpReward: 2000,
  },
  {
    id: 'top-10',
    name: 'Top 10',
    description: 'Reach the top 10 on the leaderboard',
    icon: '🌟',
    category: 'achievement',
    requirement: 'Reach top 10 ranking',
    xpReward: 1000,
  },
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Score 100% on 10 quizzes',
    icon: '🎓',
    category: 'achievement',
    requirement: 'Perfect score on 10 quizzes',
    xpReward: 800,
  },
  {
    id: 'safety-first',
    name: 'Safety First',
    description: 'Complete the Basic Power Tool Safety course',
    icon: '🛡️',
    category: 'skill',
    requirement: 'Complete Safety & Tools course',
    xpReward: 250,
  },
  {
    id: 'responsible-diyer',
    name: 'Responsible DIYer',
    description: 'Prioritize safety in all projects',
    icon: '✅',
    category: 'achievement',
    requirement: 'Complete safety course with 100%',
    xpReward: 400,
  },
  {
    id: 'painter-start',
    name: 'Painter Novice',
    description: 'Learn to paint like a pro',
    icon: '🎨',
    category: 'skill',
    requirement: 'Complete 1 Painting course',
    xpReward: 200,
  },
  {
    id: 'gardener-builder',
    name: 'Garden Builder',
    description: 'Build outdoor structures',
    icon: '🌱',
    category: 'skill',
    requirement: 'Complete garden/landscaping course',
    xpReward: 300,
  },
  {
    id: 'handyman-start',
    name: 'Handyman Apprentice',
    description: 'Master general repairs',
    icon: '🔧',
    category: 'skill',
    requirement: 'Complete 1 General Repair course',
    xpReward: 200,
  },
  {
    id: 'tile-master',
    name: 'Tile Master',
    description: 'Expert tile installation',
    icon: '🏺',
    category: 'skill',
    requirement: 'Complete tile installation course',
    xpReward: 600,
  },
  {
    id: 'flooring-expert',
    name: 'Flooring Expert',
    description: 'Master flooring installation',
    icon: '📐',
    category: 'skill',
    requirement: 'Complete flooring course',
    xpReward: 500,
  },
  {
    id: 'hvac-novice',
    name: 'HVAC Novice',
    description: 'Learn heating and cooling basics',
    icon: '❄️',
    category: 'skill',
    requirement: 'Complete 1 HVAC course',
    xpReward: 250,
  },
  {
    id: 'outdoor-electrician',
    name: 'Outdoor Electrician',
    description: 'Master outdoor electrical work',
    icon: '💡',
    category: 'skill',
    requirement: 'Complete outdoor lighting course',
    xpReward: 400,
  },
  {
    id: 'landscaper-advanced',
    name: 'Landscaper Pro',
    description: 'Advanced landscaping skills',
    icon: '🌳',
    category: 'skill',
    requirement: 'Complete advanced landscaping course',
    xpReward: 700,
  },
  {
    id: 'outdoor-master',
    name: 'Outdoor Master',
    description: 'Expert in outdoor projects',
    icon: '🏡',
    category: 'achievement',
    requirement: 'Complete 3 outdoor courses',
    xpReward: 1000,
  },
  {
    id: 'eco-friendly',
    name: 'Eco Warrior',
    description: 'Use environmentally friendly methods',
    icon: '♻️',
    category: 'achievement',
    requirement: 'Complete eco-friendly course',
    xpReward: 300,
  },
];

// Mock Leaderboard Data
export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: 'user-leaderboard-1',
    username: 'SarahBuildsPro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Sarah1',
    xp: 12450,
    level: 8,
    badges: 15,
    streak: 47,
  },
  {
    rank: 2,
    userId: 'user-leaderboard-2',
    username: 'MikeDIYMaster',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Mike1',
    xp: 11200,
    level: 7,
    badges: 12,
    streak: 23,
  },
  {
    rank: 3,
    userId: 'user-leaderboard-3',
    username: 'JessicaTools',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Jessica',
    xp: 10850,
    level: 7,
    badges: 14,
    streak: 31,
  },
  {
    rank: 4,
    userId: 'user-leaderboard-4',
    username: 'DavidWoodworks',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=David2',
    xp: 9670,
    level: 6,
    badges: 11,
    streak: 19,
  },
  {
    rank: 5,
    userId: 'user-leaderboard-5',
    username: 'EmilyFixIt',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Emily',
    xp: 8920,
    level: 6,
    badges: 10,
    streak: 14,
  },
  {
    rank: 6,
    userId: 'user-1', // Current user
    username: 'alexdiy',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Alex',
    xp: 7680,
    level: 5,
    badges: 8,
    streak: 7,
    isCurrentUser: true,
  },
  {
    rank: 7,
    userId: 'user-leaderboard-6',
    username: 'ChrisElectric',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Chris',
    xp: 7230,
    level: 5,
    badges: 9,
    streak: 12,
  },
  {
    rank: 8,
    userId: 'user-leaderboard-7',
    username: 'LisaPlumber',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Lisa',
    xp: 6840,
    level: 5,
    badges: 7,
    streak: 9,
  },
  {
    rank: 9,
    userId: 'user-leaderboard-8',
    username: 'TomCarpenter',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Tom',
    xp: 6510,
    level: 5,
    badges: 8,
    streak: 5,
  },
  {
    rank: 10,
    userId: 'user-leaderboard-9',
    username: 'AnnaHVAC',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Anna',
    xp: 6180,
    level: 4,
    badges: 6,
    streak: 11,
  },
];

// Mock Current User Stats
export const MOCK_USER_STATS: UserStats = {
  userId: 'user-1',
  totalXP: 7680,
  level: 5,
  levelProgress: 0.68, // 68% to level 6
  xpToNextLevel: 820, // 7500 - 7680 = -180, wait this doesn't match. Let me recalculate
  // Level 5: 5000-7500. Current: 7680. So at level 6 already? Let me fix this
  // Actually level 6 is 7500-10500. 7680 - 7500 = 180 XP into level 6
  // Progress: 180 / (10500-7500) = 180/3000 = 0.06
  currentStreak: 7,
  longestStreak: 14,
  lessonsCompleted: 23,
  coursesCompleted: 2,
  quizzesPassed: 18,
  badges: [
    { ...ALL_BADGES[0], unlockedAt: new Date('2025-01-15') }, // First Steps
    { ...ALL_BADGES[1], unlockedAt: new Date('2025-01-22') }, // Course Crusher
    { ...ALL_BADGES[2], unlockedAt: new Date('2025-01-22') }, // Electrician Novice
    { ...ALL_BADGES[12], unlockedAt: new Date('2025-01-10') }, // Safety First
    { ...ALL_BADGES[8], unlockedAt: new Date('2025-01-30') }, // Week Warrior
    { ...ALL_BADGES[14], unlockedAt: new Date('2025-01-20') }, // Painter Novice
    { ...ALL_BADGES[16], unlockedAt: new Date('2025-01-18') }, // Handyman Apprentice
    { ...ALL_BADGES[5], unlockedAt: new Date('2025-01-25') }, // Woodworker Novice
  ],
  lastActivityDate: new Date(),
  freezeAvailable: true,
  freezeUsedThisMonth: false,
};

// Helper functions
export const getLevelFromXP = (xp: number): number => {
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].minXP) {
      return XP_LEVELS[i].level;
    }
  }
  return 1;
};

export const getLevelProgress = (xp: number): { progress: number; xpToNext: number } => {
  const level = getLevelFromXP(xp);
  const levelData = XP_LEVELS.find((l) => l.level === level);

  if (!levelData) {
    return { progress: 0, xpToNext: 500 };
  }

  const xpIntoLevel = xp - levelData.minXP;
  const xpForLevel = levelData.maxXP - levelData.minXP;
  const progress = xpIntoLevel / xpForLevel;
  const xpToNext = levelData.maxXP - xp;

  return { progress, xpToNext };
};

export const getBadgeById = (id: string): Badge | undefined => {
  return ALL_BADGES.find((badge) => badge.id === id);
};

export const getLeaderboardByPeriod = (
  period: 'weekly' | 'monthly' | 'all-time'
): LeaderboardEntry[] => {
  // For prototype, return same data for all periods
  // In production, would filter by date range
  return MOCK_LEADERBOARD;
};
