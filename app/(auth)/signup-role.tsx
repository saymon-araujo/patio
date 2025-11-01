/**
 * Signup Role Selection Screen
 * Allow users to select their role(s) in the platform
 */

import React, { useState } from 'react';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { ScrollView } from '@/components/ui/scroll-view';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { RoleCard } from '@/components/auth/role-card';
import { useAuth } from '@/contexts/auth-context';
import { router } from 'expo-router';
import { BookOpen, ShoppingCart, Hammer, Users } from 'lucide-react-native';
import type { UserRole } from '@/utils/mock-data/auth';

const roles = [
  {
    id: 'learner' as UserRole,
    title: 'Learner',
    description: 'I want to learn DIY skills through interactive courses',
    icon: BookOpen,
  },
  {
    id: 'renter' as UserRole,
    title: 'Renter',
    description: 'I want to borrow tools from my community',
    icon: ShoppingCart,
  },
  {
    id: 'owner' as UserRole,
    title: 'Tool Owner',
    description: 'I want to rent or sell my tools to others',
    icon: Hammer,
  },
  {
    id: 'leader' as UserRole,
    title: 'Club Leader',
    description: 'I want to create and manage DIY clubs',
    icon: Users,
  },
];

export default function SignupRoleScreen() {
  const { updateUserRoles } = useAuth();
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleRole = (roleId: UserRole) => {
    if (selectedRoles.includes(roleId)) {
      setSelectedRoles(selectedRoles.filter((id) => id !== roleId));
    } else {
      setSelectedRoles([...selectedRoles, roleId]);
    }
  };

  const handleContinue = async () => {
    if (selectedRoles.length === 0) {
      alert('Please select at least one role');
      return;
    }

    try {
      setIsLoading(true);
      await updateUserRoles(selectedRoles);

      // Navigate to main app
      router.replace('/(tabs)/learn');
    } catch (error) {
      console.error('Error updating roles:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <VStack className="p-8 gap-6">
          {/* Header */}
          <VStack className="gap-2">
            <Heading size="3xl" className="text-typography-950">
              How will you use Patio?
            </Heading>
            <Text className="text-typography-600">
              Select all that apply. You can change this later in your profile.
            </Text>
          </VStack>

          {/* Role Cards */}
          <VStack className="gap-4">
            {roles.map((role) => (
              <RoleCard
                key={role.id}
                title={role.title}
                description={role.description}
                icon={role.icon}
                selected={selectedRoles.includes(role.id)}
                onPress={() => toggleRole(role.id)}
              />
            ))}
          </VStack>

          {/* Continue Button */}
          <Button
            action="primary"
            size="lg"
            onPress={handleContinue}
            isDisabled={isLoading || selectedRoles.length === 0}
            className="mt-4"
          >
            <ButtonText>
              {isLoading ? 'Setting up...' : `Continue with ${selectedRoles.length} role${selectedRoles.length !== 1 ? 's' : ''}`}
            </ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
