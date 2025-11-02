/**
 * Badge Unlock Modal Component
 * Displays modal when user unlocks a new badge
 */

import React from 'react';
import { Modal, ModalBackdrop, ModalContent, ModalBody } from '@/components/ui/modal';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Badge as BadgeType } from '@/utils/mock-data/leaderboard';

interface BadgeUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  badge: BadgeType | null;
}

export const BadgeUnlockModal = ({ isOpen, onClose, badge }: BadgeUnlockModalProps) => {
  if (!badge) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalBody className="p-6">
          <VStack className="gap-6 items-center">
            {/* Badge Icon */}
            <VStack className="w-24 h-24 rounded-full bg-success-50 items-center justify-center">
              <Text style={{ fontSize: 48 }}>{badge.icon}</Text>
            </VStack>

            {/* Badge Info */}
            <VStack className="gap-2 items-center">
              <Heading size="2xl" className="text-typography-950 text-center">
                Badge Unlocked!
              </Heading>
              <Heading size="xl" className="text-success-500 text-center">
                {badge.name}
              </Heading>
              <Text size="md" className="text-typography-600 text-center">
                {badge.description}
              </Text>
            </VStack>

            {/* XP Reward */}
            <VStack className="p-4 bg-primary-50 rounded-lg w-full items-center">
              <Text size="sm" className="text-typography-600">
                Bonus Reward
              </Text>
              <Heading size="xl" className="text-primary-500">
                +{badge.xpReward} XP
              </Heading>
            </VStack>

            {/* Close Button */}
            <Button action="primary" className="w-full" onPress={onClose}>
              <ButtonText>Awesome!</ButtonText>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
