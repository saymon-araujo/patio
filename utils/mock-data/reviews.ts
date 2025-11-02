/**
 * Mock Review Data
 * Course reviews and ratings
 */

export interface CourseReview {
  id: string;
  courseId: string;
  userId: string;
  username: string;
  avatar: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
  helpful: number; // Helpful vote count
}

export const MOCK_REVIEWS: CourseReview[] = [
  {
    id: 'review-1-1',
    courseId: 'course-1',
    userId: 'user-review-1',
    username: 'JohnDIY',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=John',
    rating: 5,
    comment:
      'Excellent course! Mike explains everything clearly and the step-by-step instructions made installation easy. Installed 3 GFCI outlets in my home after this course.',
    createdAt: new Date('2025-01-20'),
    helpful: 24,
  },
  {
    id: 'review-1-2',
    courseId: 'course-1',
    userId: 'user-review-2',
    username: 'SarahHomeowner',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=SarahR',
    rating: 5,
    comment:
      'As someone with zero electrical experience, this course gave me the confidence to tackle this project. The safety tips were especially helpful!',
    createdAt: new Date('2025-01-18'),
    helpful: 18,
  },
  {
    id: 'review-1-3',
    courseId: 'course-1',
    userId: 'user-review-3',
    username: 'MarkBuilder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Mark',
    rating: 4,
    comment:
      'Good course overall. Would have liked more information on troubleshooting GFCI circuits, but the basics are covered well.',
    createdAt: new Date('2025-01-15'),
    helpful: 12,
  },
  {
    id: 'review-1-4',
    courseId: 'course-1',
    userId: 'user-review-4',
    username: 'LisaRenovator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=LisaR',
    rating: 5,
    comment:
      'Perfect for beginners! The video demonstrations were clear and I appreciated the emphasis on safety throughout the course.',
    createdAt: new Date('2025-01-10'),
    helpful: 31,
  },
];

export const getReviewsByCourseId = (courseId: string): CourseReview[] => {
  return MOCK_REVIEWS.filter((review) => review.courseId === courseId).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
};

export const getRatingDistribution = (courseId: string): { [key: number]: number } => {
  const reviews = getReviewsByCourseId(courseId);
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  reviews.forEach((review) => {
    distribution[review.rating]++;
  });

  return distribution;
};
