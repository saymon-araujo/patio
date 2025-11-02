/**
 * Add-On Selector Component
 * Checkboxes for selecting listing add-ons
 */

import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from '@/components/ui/checkbox';
import { CheckIcon } from 'lucide-react-native';

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

interface AddOnSelectorProps {
  addons: AddOn[];
  selectedAddonIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export function AddOnSelector({ addons, selectedAddonIds, onSelectionChange }: AddOnSelectorProps) {
  const handleToggle = (addonId: string, isChecked: boolean) => {
    if (isChecked) {
      onSelectionChange([...selectedAddonIds, addonId]);
    } else {
      onSelectionChange(selectedAddonIds.filter((id) => id !== addonId));
    }
  };

  if (addons.length === 0) {
    return null;
  }

  const totalAddonsCost = addons
    .filter((addon) => selectedAddonIds.includes(addon.id))
    .reduce((sum, addon) => sum + addon.price, 0);

  return (
    <VStack className="gap-3">
      {addons.map((addon) => (
        <Checkbox
          key={addon.id}
          value={addon.id}
          isChecked={selectedAddonIds.includes(addon.id)}
          onChange={(checked) => handleToggle(addon.id, checked)}
        >
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>
            <HStack className="justify-between flex-1">
              <Text className="text-typography-950">{addon.name}</Text>
              <Text className="font-semibold text-primary-600">+${addon.price}</Text>
            </HStack>
          </CheckboxLabel>
        </Checkbox>
      ))}

      {totalAddonsCost > 0 && (
        <HStack className="justify-between px-4 py-2 bg-primary-50 rounded-lg">
          <Text className="font-semibold text-typography-700">Add-ons Total</Text>
          <Text className="font-bold text-primary-600">+${totalAddonsCost.toFixed(2)}</Text>
        </HStack>
      )}
    </VStack>
  );
}
