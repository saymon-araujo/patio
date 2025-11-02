/**
 * Learn Tab Stack Navigator
 * Handles nested navigation within the Learn tab
 */

import { Stack } from 'expo-router';

export default function LearnLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Learn',
        }}
      />
      <Stack.Screen
        name="course/[id]"
        options={{
          title: 'Course Detail',
        }}
      />
      <Stack.Screen
        name="lesson/[id]"
        options={{
          title: 'Lesson',
        }}
      />
      <Stack.Screen
        name="quiz/[id]"
        options={{
          title: 'Quiz',
        }}
      />
      <Stack.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
        }}
      />
      <Stack.Screen
        name="saved"
        options={{
          title: 'Saved',
        }}
      />
    </Stack>
  );
}
