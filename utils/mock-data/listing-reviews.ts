/**
 * Mock Data: Listing Reviews
 * Sample reviews for marketplace listings
 */

export interface ListingReview {
  id: string;
  listingId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
  helpful: number;
}

export const MOCK_REVIEWS: ListingReview[] = [
  {
    id: 'review-1',
    listingId: 'listing-1',
    userId: 'user-100',
    userName: 'Alex Thompson',
    userAvatar: 'https://i.pravatar.cc/150?img=31',
    rating: 5,
    comment:
      'Excellent drill! Worked perfectly for my deck project. Owner was very responsive and the tool was exactly as described. Would definitely rent again.',
    createdAt: new Date('2024-01-20'),
    helpful: 12,
  },
  {
    id: 'review-2',
    listingId: 'listing-1',
    userId: 'user-101',
    userName: 'Maria Garcia',
    userAvatar: 'https://i.pravatar.cc/150?img=44',
    rating: 5,
    comment:
      'Great tool and super easy pickup. The drill had plenty of battery life and the extra bits were very helpful. Highly recommend!',
    createdAt: new Date('2024-01-15'),
    helpful: 8,
  },
  {
    id: 'review-3',
    listingId: 'listing-1',
    userId: 'user-102',
    userName: 'James Wilson',
    userAvatar: 'https://i.pravatar.cc/150?img=67',
    rating: 4,
    comment:
      "Tool worked great, though one of the batteries didn't hold charge as long as expected. Overall still a good value for the rental price.",
    createdAt: new Date('2024-01-08'),
    helpful: 3,
  },
  {
    id: 'review-4',
    listingId: 'listing-1',
    userId: 'user-103',
    userName: 'Sophie Chen',
    userAvatar: 'https://i.pravatar.cc/150?img=25',
    rating: 5,
    comment:
      'Perfect for my furniture assembly project. Owner was flexible with pickup time. Clean and well-maintained tool.',
    createdAt: new Date('2024-01-03'),
    helpful: 5,
  },
];

export const getReviewsByListingId = (listingId: string): ListingReview[] => {
  return MOCK_REVIEWS.filter((review) => review.listingId === listingId).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
};

export const calculateAverageRating = (listingId: string): number => {
  const reviews = getReviewsByListingId(listingId);
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

export const getRatingDistribution = (
  listingId: string
): { 5: number; 4: number; 3: number; 2: number; 1: number } => {
  const reviews = getReviewsByListingId(listingId);
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  reviews.forEach((review) => {
    distribution[review.rating as 1 | 2 | 3 | 4 | 5]++;
  });

  return distribution;
};
