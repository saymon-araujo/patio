/**
 * Leaderboard Entry Component
 * Displays user ranking with avatar, name, XP, and medals
 */

import React from 'react';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Badge, BadgeText } from '@/components/ui/badge';
import { LeaderboardEntry as LeaderboardEntryType } from '@/utils/mock-data/leaderboard';
import { Crown, Medal, Award } from 'lucide-react-native';

interface LeaderboardEntryProps {
  entry: LeaderboardEntryType;
}

export const LeaderboardEntry = ({ entry }: LeaderboardEntryProps) => {
  const getRankIcon = () => {
    if (entry.rank === 1) {
      return <Crown size={20} color="#F59E0B" fill="#F59E0B" />;
    } else if (entry.rank === 2) {
      return <Medal size={20} color="#9CA3AF" />;
    } else if (entry.rank === 3) {
      return <Award size={20} color="#CD7F32" />;
    }
    return null;
  };

  const getRankBadgeColor = () => {
    if (entry.rank === 1) return '#F59E0B';
    if (entry.rank === 2) return '#9CA3AF';
    if (entry.rank === 3) return '#CD7F32';
    return '#6B7280';
  };

  return (
    <HStack
      className={`p-4 mb-2 rounded-lg ${
        entry.isCurrentUser ? 'bg-primary-50 border-2 border-primary-500' : 'bg-white'
      }`}
    >
      <HStack className="gap-3 items-center flex-1">
        {/* Rank */}
        <HStack className="w-12 items-center justify-center">
          {entry.rank <= 3 ? (
            getRankIcon()
          ) : (
            <Text
              size="lg"
              className="font-bold text-typography-600"
              style={{ color: getRankBadgeColor() }}
            >
              #{entry.rank}
            </Text>
          )}
        </HStack>

        {/* Avatar */}
        <Avatar size="md">
          <AvatarFallbackText>{entry.username}</AvatarFallbackText>
        </Avatar>

        {/* User Info */}
        <VStack className="flex-1 gap-1">
          <Text size="md" className="font-semibold text-typography-950">
            {entry.username}
            {entry.isCurrentUser && (
              <Text size="sm" className="text-primary-500">
                {' '}
                (You)
              </Text>
            )}
          </Text>
          <HStack className="gap-2 items-center">
            <Text size="sm" className="text-typography-600">
              Level {entry.level}
            </Text>
            <Text size="sm" className="text-typography-400">
              •
            </Text>
            <Text size="sm" className="text-typography-600">
              {entry.badges} badges
            </Text>
            {entry.streak > 0 && (
              <>
                <Text size="sm" className="text-typography-400">
                  •
                </Text>
                <Text size="sm" className="text-error-500">
                  🔥 {entry.streak}
                </Text>
              </>
            )}
          </HStack>
        </VStack>

        {/* XP */}
        <VStack className="items-end gap-1">
          <Text size="lg" className="font-bold text-primary-500">
            {entry.xp.toLocaleString()}
          </Text>
          <Text size="xs" className="text-typography-500">
            XP
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
};
