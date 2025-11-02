/**
 * Reviews List Component
 * Display listing reviews with rating distribution
 */

import React from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Star, ThumbsUp } from 'lucide-react-native';
import type { ListingReview } from '@/utils/mock-data/listing-reviews';

interface ReviewsListProps {
  reviews: ListingReview[];
  averageRating: number;
  ratingDistribution: { 5: number; 4: number; 3: number; 2: number; 1: number };
}

export function ReviewsList({ reviews, averageRating, ratingDistribution }: ReviewsListProps) {
  const totalReviews = reviews.length;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderStars = (rating: number) => {
    return (
      <HStack className="gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={star <= rating ? 'text-warning-500' : 'text-typography-300'}
            fill={star <= rating ? '#F97316' : 'transparent'}
          />
        ))}
      </HStack>
    );
  };

  if (totalReviews === 0) {
    return (
      <Box className="p-8 items-center">
        <Text className="text-typography-500 text-center">
          No reviews yet. Be the first to review!
        </Text>
      </Box>
    );
  }

  return (
    <VStack className="gap-6">
      {/* Rating Summary */}
      <HStack className="gap-6">
        <VStack className="items-center gap-1">
          <Text className="text-5xl font-bold text-typography-950">{averageRating}</Text>
          {renderStars(Math.round(averageRating))}
          <Text size="sm" className="text-typography-500">
            {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </Text>
        </VStack>

        {/* Rating Distribution */}
        <VStack className="flex-1 gap-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingDistribution[rating as 1 | 2 | 3 | 4 | 5];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
              <HStack key={rating} className="items-center gap-2">
                <Text size="sm" className="text-typography-600 w-3">
                  {rating}
                </Text>
                <Star size={12} className="text-warning-500" fill="#F97316" />
                <Box className="flex-1 h-2 bg-background-200 rounded-full overflow-hidden">
                  <Box
                    className="h-full bg-warning-500"
                    style={{ width: `${percentage}%` }}
                  />
                </Box>
                <Text size="xs" className="text-typography-500 w-6">
                  {count}
                </Text>
              </HStack>
            );
          })}
        </VStack>
      </HStack>

      {/* Reviews List */}
      <VStack className="gap-4">
        {reviews.map((review) => (
          <Box key={review.id} className="pb-4 border-b border-outline-100">
            <VStack className="gap-3">
              {/* Reviewer Info */}
              <HStack className="items-start gap-3">
                <Avatar size="sm">
                  <AvatarImage source={{ uri: review.userAvatar }} />
                </Avatar>
                <VStack className="flex-1 gap-1">
                  <HStack className="items-center justify-between">
                    <Text className="font-semibold text-typography-950">{review.userName}</Text>
                    <Text size="xs" className="text-typography-500">
                      {formatDate(review.createdAt)}
                    </Text>
                  </HStack>
                  {renderStars(review.rating)}
                </VStack>
              </HStack>

              {/* Review Text */}
              <Text className="text-typography-700 leading-6">{review.comment}</Text>

              {/* Helpful Count */}
              {review.helpful > 0 && (
                <HStack className="items-center gap-1">
                  <ThumbsUp size={14} className="text-typography-400" />
                  <Text size="sm" className="text-typography-500">
                    {review.helpful} found this helpful
                  </Text>
                </HStack>
              )}
            </VStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}
