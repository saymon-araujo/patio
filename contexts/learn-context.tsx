/**
 * Learn Context
 * Manages course enrollment, progress tracking, and lesson completion
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Course, MOCK_COURSES, getCourseById } from '@/utils/mock-data/courses';
import { Lesson, getLessonById } from '@/utils/mock-data/lessons';

const STORAGE_KEYS = {
  ENROLLED_COURSES: '@patio:enrolled_courses',
  COURSE_PROGRESS: '@patio:course_progress',
  COMPLETED_LESSONS: '@patio:completed_lessons',
  SAVED_COURSES: '@patio:saved_courses',
};

export interface CourseProgress {
  courseId: string;
  currentLessonId: string;
  completedLessons: string[];
  lastAccessedAt: Date;
  progress: number; // 0-1
  quizScores: { lessonId: string; score: number; attempts: number }[];
  completedAt?: Date;
}

interface LearnContextValue {
  enrolledCourses: string[]; // Course IDs
  courseProgress: Record<string, CourseProgress>; // courseId -> progress
  completedLessons: Set<string>; // Lesson IDs
  savedCourses: string[]; // Course IDs
  isLoading: boolean;

  // Course actions
  enrollCourse: (courseId: string) => Promise<void>;
  unenrollCourse: (courseId: string) => Promise<void>;
  isEnrolled: (courseId: string) => boolean;
  getCourseProgress: (courseId: string) => CourseProgress | undefined;

  // Lesson actions
  completeLesson: (lessonId: string, courseId: string) => Promise<void>;
  isLessonCompleted: (lessonId: string) => boolean;
  updateCurrentLesson: (courseId: string, lessonId: string) => Promise<void>;

  // Quiz actions
  submitQuizScore: (courseId: string, lessonId: string, score: number) => Promise<void>;
  getQuizScore: (courseId: string, lessonId: string) => number | undefined;

  // Saved courses
  saveCourse: (courseId: string) => Promise<void>;
  unsaveCourse: (courseId: string) => Promise<void>;
  isSaved: (courseId: string) => boolean;

  // Completion
  completeCourse: (courseId: string) => Promise<void>;
}

const LearnContext = createContext<LearnContextValue | undefined>(undefined);

export const useLearn = () => {
  const context = useContext(LearnContext);
  if (!context) {
    throw new Error('useLearn must be used within LearnProvider');
  }
  return context;
};

interface LearnProviderProps {
  children: ReactNode;
}

export const LearnProvider = ({ children }: LearnProviderProps) => {
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [courseProgress, setCourseProgress] = useState<Record<string, CourseProgress>>({});
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [savedCourses, setSavedCourses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [enrolled, progress, completed, saved] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.ENROLLED_COURSES),
        AsyncStorage.getItem(STORAGE_KEYS.COURSE_PROGRESS),
        AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS),
        AsyncStorage.getItem(STORAGE_KEYS.SAVED_COURSES),
      ]);

      if (enrolled) setEnrolledCourses(JSON.parse(enrolled));
      if (progress) setCourseProgress(JSON.parse(progress));
      if (completed) setCompletedLessons(new Set(JSON.parse(completed)));
      if (saved) setSavedCourses(JSON.parse(saved));
    } catch (error) {
      console.error('Error loading learn data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Enroll in a course
  const enrollCourse = async (courseId: string) => {
    try {
      const course = getCourseById(courseId);
      if (!course) return;

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      const newEnrolled = [...enrolledCourses, courseId];
      setEnrolledCourses(newEnrolled);
      await AsyncStorage.setItem(STORAGE_KEYS.ENROLLED_COURSES, JSON.stringify(newEnrolled));

      // Initialize progress
      const initialProgress: CourseProgress = {
        courseId,
        currentLessonId: course.lessons[0],
        completedLessons: [],
        lastAccessedAt: new Date(),
        progress: 0,
        quizScores: [],
      };

      const newProgress = { ...courseProgress, [courseId]: initialProgress };
      setCourseProgress(newProgress);
      await AsyncStorage.setItem(STORAGE_KEYS.COURSE_PROGRESS, JSON.stringify(newProgress));
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  // Unenroll from a course
  const unenrollCourse = async (courseId: string) => {
    try {
      const newEnrolled = enrolledCourses.filter((id) => id !== courseId);
      setEnrolledCourses(newEnrolled);
      await AsyncStorage.setItem(STORAGE_KEYS.ENROLLED_COURSES, JSON.stringify(newEnrolled));

      // Remove progress
      const newProgress = { ...courseProgress };
      delete newProgress[courseId];
      setCourseProgress(newProgress);
      await AsyncStorage.setItem(STORAGE_KEYS.COURSE_PROGRESS, JSON.stringify(newProgress));
    } catch (error) {
      console.error('Error unenrolling from course:', error);
    }
  };

  // Check if enrolled
  const isEnrolled = (courseId: string): boolean => {
    return enrolledCourses.includes(courseId);
  };

  // Get course progress
  const getCourseProgress = (courseId: string): CourseProgress | undefined => {
    return courseProgress[courseId];
  };

  // Complete a lesson
  const completeLesson = async (lessonId: string, courseId: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Add to completed lessons
      const newCompleted = new Set(completedLessons);
      newCompleted.add(lessonId);
      setCompletedLessons(newCompleted);
      await AsyncStorage.setItem(
        STORAGE_KEYS.COMPLETED_LESSONS,
        JSON.stringify(Array.from(newCompleted))
      );

      // Update course progress
      const progress = courseProgress[courseId];
      if (progress) {
        const course = getCourseById(courseId);
        if (!course) return;

        const completedLessonIds = [...new Set([...progress.completedLessons, lessonId])];
        const newProgress = completedLessonIds.length / course.lessons.length;

        const updatedProgress: CourseProgress = {
          ...progress,
          completedLessons: completedLessonIds,
          progress: newProgress,
          lastAccessedAt: new Date(),
        };

        const newCourseProgress = { ...courseProgress, [courseId]: updatedProgress };
        setCourseProgress(newCourseProgress);
        await AsyncStorage.setItem(
          STORAGE_KEYS.COURSE_PROGRESS,
          JSON.stringify(newCourseProgress)
        );
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  // Check if lesson is completed
  const isLessonCompleted = (lessonId: string): boolean => {
    return completedLessons.has(lessonId);
  };

  // Update current lesson
  const updateCurrentLesson = async (courseId: string, lessonId: string) => {
    try {
      const progress = courseProgress[courseId];
      if (!progress) return;

      const updatedProgress: CourseProgress = {
        ...progress,
        currentLessonId: lessonId,
        lastAccessedAt: new Date(),
      };

      const newCourseProgress = { ...courseProgress, [courseId]: updatedProgress };
      setCourseProgress(newCourseProgress);
      await AsyncStorage.setItem(STORAGE_KEYS.COURSE_PROGRESS, JSON.stringify(newCourseProgress));
    } catch (error) {
      console.error('Error updating current lesson:', error);
    }
  };

  // Submit quiz score
  const submitQuizScore = async (courseId: string, lessonId: string, score: number) => {
    try {
      const progress = courseProgress[courseId];
      if (!progress) return;

      const existingScore = progress.quizScores.find((q) => q.lessonId === lessonId);
      let newQuizScores;

      if (existingScore) {
        newQuizScores = progress.quizScores.map((q) =>
          q.lessonId === lessonId
            ? { ...q, score: Math.max(q.score, score), attempts: q.attempts + 1 }
            : q
        );
      } else {
        newQuizScores = [...progress.quizScores, { lessonId, score, attempts: 1 }];
      }

      const updatedProgress: CourseProgress = {
        ...progress,
        quizScores: newQuizScores,
      };

      const newCourseProgress = { ...courseProgress, [courseId]: updatedProgress };
      setCourseProgress(newCourseProgress);
      await AsyncStorage.setItem(STORAGE_KEYS.COURSE_PROGRESS, JSON.stringify(newCourseProgress));
    } catch (error) {
      console.error('Error submitting quiz score:', error);
    }
  };

  // Get quiz score
  const getQuizScore = (courseId: string, lessonId: string): number | undefined => {
    const progress = courseProgress[courseId];
    if (!progress) return undefined;

    const quizScore = progress.quizScores.find((q) => q.lessonId === lessonId);
    return quizScore?.score;
  };

  // Save/bookmark a course
  const saveCourse = async (courseId: string) => {
    try {
      const newSaved = [...savedCourses, courseId];
      setSavedCourses(newSaved);
      await AsyncStorage.setItem(STORAGE_KEYS.SAVED_COURSES, JSON.stringify(newSaved));
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  // Unsave/unbookmark a course
  const unsaveCourse = async (courseId: string) => {
    try {
      const newSaved = savedCourses.filter((id) => id !== courseId);
      setSavedCourses(newSaved);
      await AsyncStorage.setItem(STORAGE_KEYS.SAVED_COURSES, JSON.stringify(newSaved));
    } catch (error) {
      console.error('Error unsaving course:', error);
    }
  };

  // Check if course is saved
  const isSaved = (courseId: string): boolean => {
    return savedCourses.includes(courseId);
  };

  // Complete a course
  const completeCourse = async (courseId: string) => {
    try {
      const progress = courseProgress[courseId];
      if (!progress) return;

      const updatedProgress: CourseProgress = {
        ...progress,
        progress: 1,
        completedAt: new Date(),
      };

      const newCourseProgress = { ...courseProgress, [courseId]: updatedProgress };
      setCourseProgress(newCourseProgress);
      await AsyncStorage.setItem(STORAGE_KEYS.COURSE_PROGRESS, JSON.stringify(newCourseProgress));
    } catch (error) {
      console.error('Error completing course:', error);
    }
  };

  const value: LearnContextValue = {
    enrolledCourses,
    courseProgress,
    completedLessons,
    savedCourses,
    isLoading,
    enrollCourse,
    unenrollCourse,
    isEnrolled,
    getCourseProgress,
    completeLesson,
    isLessonCompleted,
    updateCurrentLesson,
    submitQuizScore,
    getQuizScore,
    saveCourse,
    unsaveCourse,
    isSaved,
    completeCourse,
  };

  return <LearnContext.Provider value={value}>{children}</LearnContext.Provider>;
};
