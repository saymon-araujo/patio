/**
 * Badge Checker Utility
 * Checks conditions for unlocking badges based on user progress
 */

import { getCourseById, MOCK_COURSES } from './mock-data/courses';

export interface BadgeCheckResult {
  badgeId: string;
  shouldUnlock: boolean;
}

/**
 * Check if category-specific badges should be unlocked
 */
export const checkCategoryBadges = (
  completedCourseIds: string[]
): BadgeCheckResult[] => {
  const results: BadgeCheckResult[] = [];
  const completedCourses = completedCourseIds.map((id) => getCourseById(id)).filter(Boolean);

  // Count completed courses by category
  const categoryCounts: Record<string, number> = {};
  completedCourses.forEach((course) => {
    if (course) {
      categoryCounts[course.category] = (categoryCounts[course.category] || 0) + 1;
    }
  });

  // Check electrical badges
  if (categoryCounts['electrical'] >= 1 && !results.find((r) => r.badgeId === 'electrician-novice')) {
    results.push({ badgeId: 'electrician-novice', shouldUnlock: true });
  }
  if (categoryCounts['electrical'] >= 3) {
    results.push({ badgeId: 'electrician-intermediate', shouldUnlock: true });
  }

  // Check plumbing badges
  if (categoryCounts['plumbing'] >= 1) {
    results.push({ badgeId: 'plumber-start', shouldUnlock: true });
  }

  // Check woodworking badges
  if (categoryCounts['woodworking'] >= 1) {
    results.push({ badgeId: 'woodworker-start', shouldUnlock: true });
  }

  // Check painting badges
  if (categoryCounts['painting'] >= 1) {
    results.push({ badgeId: 'painter-start', shouldUnlock: true });
  }

  // Check HVAC badges
  if (categoryCounts['hvac'] >= 1) {
    results.push({ badgeId: 'hvac-novice', shouldUnlock: true });
  }

  // Check handyman badges
  if (categoryCounts['general'] >= 1) {
    results.push({ badgeId: 'handyman-start', shouldUnlock: true });
  }

  // Check outdoor courses (landscaping)
  if (categoryCounts['landscaping'] >= 3) {
    results.push({ badgeId: 'outdoor-master', shouldUnlock: true });
  }

  return results;
};

/**
 * Check for specific course completion badges
 */
export const checkCourseBadges = (courseId: string): string[] => {
  const badgeIds: string[] = [];

  // Safety course
  if (courseId === 'course-10') {
    badgeIds.push('safety-first');
  }

  // Woodworking basics
  if (courseId === 'course-14') {
    badgeIds.push('woodworker-start');
  }

  // Tile course
  if (courseId === 'course-13') {
    badgeIds.push('tile-master');
  }

  // Flooring course
  if (courseId === 'course-11') {
    badgeIds.push('flooring-expert');
  }

  // Advanced landscaping
  if (courseId === 'course-8') {
    badgeIds.push('landscaper-advanced');
  }

  // Eco-friendly plumbing
  if (courseId === 'course-5') {
    badgeIds.push('eco-friendly');
  }

  return badgeIds;
};
