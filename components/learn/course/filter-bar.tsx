/**
 * Filter Bar Component
 * Multi-filter selector for courses (difficulty, time, tools)
 */

import React, { useState } from 'react';
import { HStack } from '@/components/ui/hstack';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Pressable } from 'react-native';
import { ScrollView } from '@/components/ui/scroll-view';

export type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';
export type TimeFilter = 'all' | 'short' | 'medium' | 'long';
export type ToolsFilter = 'all' | 'none' | 'basic' | 'specialized';

interface FilterBarProps {
  onDifficultyChange?: (filter: DifficultyFilter) => void;
  onTimeChange?: (filter: TimeFilter) => void;
  onToolsChange?: (filter: ToolsFilter) => void;
}

export const FilterBar = ({
  onDifficultyChange,
  onTimeChange,
  onToolsChange,
}: FilterBarProps) => {
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all');
  const [time, setTime] = useState<TimeFilter>('all');
  const [tools, setTools] = useState<ToolsFilter>('all');

  const handleDifficultyPress = (filter: DifficultyFilter) => {
    setDifficulty(filter);
    onDifficultyChange?.(filter);
  };

  const handleTimePress = (filter: TimeFilter) => {
    setTime(filter);
    onTimeChange?.(filter);
  };

  const handleToolsPress = (filter: ToolsFilter) => {
    setTools(filter);
    onToolsChange?.(filter);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-2">
      <HStack className="gap-2 px-6">
        {/* Difficulty Filters */}
        <Pressable onPress={() => handleDifficultyPress('all')}>
          <Badge action={difficulty === 'all' ? 'info' : 'muted'}>
            <BadgeText>All Levels</BadgeText>
          </Badge>
        </Pressable>
        <Pressable onPress={() => handleDifficultyPress('beginner')}>
          <Badge action={difficulty === 'beginner' ? 'success' : 'muted'}>
            <BadgeText>Beginner</BadgeText>
          </Badge>
        </Pressable>
        <Pressable onPress={() => handleDifficultyPress('intermediate')}>
          <Badge action={difficulty === 'intermediate' ? 'warning' : 'muted'}>
            <BadgeText>Intermediate</BadgeText>
          </Badge>
        </Pressable>
        <Pressable onPress={() => handleDifficultyPress('advanced')}>
          <Badge action={difficulty === 'advanced' ? 'error' : 'muted'}>
            <BadgeText>Advanced</BadgeText>
          </Badge>
        </Pressable>

        {/* Time Filters */}
        <Pressable onPress={() => handleTimePress('short')}>
          <Badge action={time === 'short' ? 'info' : 'muted'}>
            <BadgeText>&lt; 30min</BadgeText>
          </Badge>
        </Pressable>
        <Pressable onPress={() => handleTimePress('medium')}>
          <Badge action={time === 'medium' ? 'info' : 'muted'}>
            <BadgeText>30-60min</BadgeText>
          </Badge>
        </Pressable>
        <Pressable onPress={() => handleTimePress('long')}>
          <Badge action={time === 'long' ? 'info' : 'muted'}>
            <BadgeText>60+ min</BadgeText>
          </Badge>
        </Pressable>

        {/* Tools Filters */}
        <Pressable onPress={() => handleToolsPress('none')}>
          <Badge action={tools === 'none' ? 'success' : 'muted'}>
            <BadgeText>No Tools</BadgeText>
          </Badge>
        </Pressable>
        <Pressable onPress={() => handleToolsPress('basic')}>
          <Badge action={tools === 'basic' ? 'info' : 'muted'}>
            <BadgeText>Basic Tools</BadgeText>
          </Badge>
        </Pressable>
        <Pressable onPress={() => handleToolsPress('specialized')}>
          <Badge action={tools === 'specialized' ? 'warning' : 'muted'}>
            <BadgeText>Specialized</BadgeText>
          </Badge>
        </Pressable>
      </HStack>
    </ScrollView>
  );
};
