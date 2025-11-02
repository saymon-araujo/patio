/**
 * Insurance Card Component
 * Protection option for rentals
 */

import React from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from '@/components/ui/checkbox';
import { Shield, CheckIcon } from 'lucide-react-native';

interface InsuranceCardProps {
  isSelected: boolean;
  onToggle: (selected: boolean) => void;
  dailyRate?: number;
  days?: number;
}

const INSURANCE_DAILY_RATE = 3;

export function InsuranceCard({ isSelected, onToggle, dailyRate = 3, days = 1 }: InsuranceCardProps) {
  const totalCost = INSURANCE_DAILY_RATE * days;

  return (
    <Box className="bg-info-50 border border-info-200 rounded-lg p-4">
      <VStack className="gap-3">
        <HStack className="items-start gap-3">
          <Box className="w-12 h-12 bg-info-100 rounded-full items-center justify-center">
            <Shield size={24} className="text-info-600" />
          </Box>
          <VStack className="flex-1 gap-1">
            <Text className="font-semibold text-typography-950 text-lg">
              Protect Your Rental
            </Text>
            <Text size="sm" className="text-typography-700">
              Coverage for damage, theft, and liability
            </Text>
          </VStack>
        </HStack>

        {/* Coverage Details */}
        <VStack className="gap-1 px-2">
          <HStack className="items-center gap-2">
            <CheckIcon size={16} className="text-info-600" />
            <Text size="sm" className="text-typography-700">
              Up to $5,000 damage coverage
            </Text>
          </HStack>
          <HStack className="items-center gap-2">
            <CheckIcon size={16} className="text-info-600" />
            <Text size="sm" className="text-typography-700">
              Theft protection
            </Text>
          </HStack>
          <HStack className="items-center gap-2">
            <CheckIcon size={16} className="text-info-600" />
            <Text size="sm" className="text-typography-700">
              $0 deductible for claims
            </Text>
          </HStack>
        </VStack>

        {/* Pricing */}
        <HStack className="items-center justify-between px-2">
          <Text size="sm" className="text-typography-600">
            ${INSURANCE_DAILY_RATE}/day × {days} {days === 1 ? 'day' : 'days'}
          </Text>
          <Text className="font-bold text-info-600 text-lg">+${totalCost.toFixed(2)}</Text>
        </HStack>

        {/* Checkbox */}
        <Checkbox value="insurance" isChecked={isSelected} onChange={onToggle}>
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>
            <Text className="font-semibold text-typography-950">
              Add Insurance Protection
            </Text>
          </CheckboxLabel>
        </Checkbox>
      </VStack>
    </Box>
  );
}
