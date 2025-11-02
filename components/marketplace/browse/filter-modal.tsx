/**
 * Filter Modal Component
 * Comprehensive filtering for marketplace listings
 */

import React, { useState } from 'react';
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from '@/components/ui/checkbox';
import { Radio, RadioGroup, RadioIndicator, RadioIcon, RadioLabel } from '@/components/ui/radio';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@/components/ui/slider';
import { CheckIcon } from 'lucide-react-native';
import type { MarketplaceFilters } from '@/contexts/marketplace-context';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: MarketplaceFilters;
  onApply: (filters: Partial<MarketplaceFilters>) => void;
}

export function FilterModal({ isOpen, onClose, filters, onApply }: FilterModalProps) {
  // Local state for filters (apply on confirm)
  const [localFilters, setLocalFilters] = useState<MarketplaceFilters>(filters);

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    const defaultFilters: MarketplaceFilters = {
      type: 'all',
      category: 'all',
      distance: 25,
      priceRange: { min: 0, max: 500 },
      depositRange: { min: 0, max: 500 },
      condition: 'all',
      verifiedOnly: false,
      deliveryOptions: ['pickup', 'delivery', 'meet-halfway'],
    };
    setLocalFilters(defaultFilters);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalBackdrop />
      <ModalContent className="max-h-[90vh]">
        <ModalHeader className="border-b border-outline-100">
          <Heading size="lg">Filters</Heading>
        </ModalHeader>

        <ModalBody className="max-h-[60vh]">
          <VStack className="gap-6 py-4">
            {/* Listing Type */}
            <VStack className="gap-3">
              <Text className="font-semibold text-typography-950">Listing Type</Text>
              <RadioGroup
                value={localFilters.type}
                onChange={(value) => setLocalFilters({ ...localFilters, type: value as any })}
              >
                <VStack className="gap-2">
                  <Radio value="all">
                    <RadioIndicator><RadioIcon as={CheckIcon} /></RadioIndicator>
                    <RadioLabel><Text>All</Text></RadioLabel>
                  </Radio>
                  <Radio value="rental">
                    <RadioIndicator><RadioIcon as={CheckIcon} /></RadioIndicator>
                    <RadioLabel><Text>Rentals Only</Text></RadioLabel>
                  </Radio>
                  <Radio value="sale">
                    <RadioIndicator><RadioIcon as={CheckIcon} /></RadioIndicator>
                    <RadioLabel><Text>For Sale Only</Text></RadioLabel>
                  </Radio>
                </VStack>
              </RadioGroup>
            </VStack>

            {/* Distance */}
            <VStack className="gap-3">
              <Text className="font-semibold text-typography-950">
                Distance: {localFilters.distance} miles
              </Text>
              <Slider
                value={localFilters.distance}
                onChange={(value) => setLocalFilters({ ...localFilters, distance: value })}
                minValue={1}
                maxValue={50}
                step={1}
              >
                <SliderTrack>
                  <SliderFilledTrack className="bg-primary-500" />
                </SliderTrack>
                <SliderThumb className="bg-white border-2 border-primary-500" />
              </Slider>
              <HStack className="justify-between">
                <Text size="xs" className="text-typography-500">1 mi</Text>
                <Text size="xs" className="text-typography-500">50 mi</Text>
              </HStack>
            </VStack>

            {/* Price Range */}
            <VStack className="gap-3">
              <Text className="font-semibold text-typography-950">
                Price Range: ${localFilters.priceRange.min} - ${localFilters.priceRange.max}
              </Text>
              <HStack className="gap-3">
                <Box className="flex-1">
                  <Slider
                    value={localFilters.priceRange.min}
                    onChange={(value) =>
                      setLocalFilters({
                        ...localFilters,
                        priceRange: { ...localFilters.priceRange, min: value },
                      })
                    }
                    minValue={0}
                    maxValue={500}
                    step={5}
                  >
                    <SliderTrack>
                      <SliderFilledTrack className="bg-primary-500" />
                    </SliderTrack>
                    <SliderThumb className="bg-white border-2 border-primary-500" />
                  </Slider>
                </Box>
                <Text size="sm" className="text-typography-600">to</Text>
                <Box className="flex-1">
                  <Slider
                    value={localFilters.priceRange.max}
                    onChange={(value) =>
                      setLocalFilters({
                        ...localFilters,
                        priceRange: { ...localFilters.priceRange, max: value },
                      })
                    }
                    minValue={0}
                    maxValue={500}
                    step={5}
                  >
                    <SliderTrack>
                      <SliderFilledTrack className="bg-primary-500" />
                    </SliderTrack>
                    <SliderThumb className="bg-white border-2 border-primary-500" />
                  </Slider>
                </Box>
              </HStack>
            </VStack>

            {/* Deposit Range (Rental only) */}
            {localFilters.type !== 'sale' && localFilters.depositRange && (
              <VStack className="gap-3">
                <Text className="font-semibold text-typography-950">
                  Deposit Range: ${localFilters.depositRange.min} - ${localFilters.depositRange.max}
                </Text>
                <HStack className="gap-3">
                  <Box className="flex-1">
                    <Slider
                      value={localFilters.depositRange.min}
                      onChange={(value) =>
                        setLocalFilters({
                          ...localFilters,
                          depositRange: { ...localFilters.depositRange!, min: value },
                        })
                      }
                      minValue={0}
                      maxValue={500}
                      step={10}
                    >
                      <SliderTrack>
                        <SliderFilledTrack className="bg-primary-500" />
                      </SliderTrack>
                      <SliderThumb className="bg-white border-2 border-primary-500" />
                    </Slider>
                  </Box>
                  <Text size="sm" className="text-typography-600">to</Text>
                  <Box className="flex-1">
                    <Slider
                      value={localFilters.depositRange.max}
                      onChange={(value) =>
                        setLocalFilters({
                          ...localFilters,
                          depositRange: { ...localFilters.depositRange!, max: value },
                        })
                      }
                      minValue={0}
                      maxValue={500}
                      step={10}
                    >
                      <SliderTrack>
                        <SliderFilledTrack className="bg-primary-500" />
                      </SliderTrack>
                      <SliderThumb className="bg-white border-2 border-primary-500" />
                    </Slider>
                  </Box>
                </HStack>
              </VStack>
            )}

            {/* Condition */}
            <VStack className="gap-3">
              <Text className="font-semibold text-typography-950">Condition</Text>
              <RadioGroup
                value={localFilters.condition}
                onChange={(value) => setLocalFilters({ ...localFilters, condition: value as any })}
              >
                <VStack className="gap-2">
                  <Radio value="all">
                    <RadioIndicator><RadioIcon as={CheckIcon} /></RadioIndicator>
                    <RadioLabel><Text>All Conditions</Text></RadioLabel>
                  </Radio>
                  <Radio value="new">
                    <RadioIndicator><RadioIcon as={CheckIcon} /></RadioIndicator>
                    <RadioLabel><Text>New</Text></RadioLabel>
                  </Radio>
                  <Radio value="like-new">
                    <RadioIndicator><RadioIcon as={CheckIcon} /></RadioIndicator>
                    <RadioLabel><Text>Like New</Text></RadioLabel>
                  </Radio>
                  <Radio value="good">
                    <RadioIndicator><RadioIcon as={CheckIcon} /></RadioIndicator>
                    <RadioLabel><Text>Good</Text></RadioLabel>
                  </Radio>
                  <Radio value="fair">
                    <RadioIndicator><RadioIcon as={CheckIcon} /></RadioIndicator>
                    <RadioLabel><Text>Fair</Text></RadioLabel>
                  </Radio>
                </VStack>
              </RadioGroup>
            </VStack>

            {/* Delivery Options */}
            <VStack className="gap-3">
              <Text className="font-semibold text-typography-950">Delivery Options</Text>
              <VStack className="gap-2">
                <Checkbox
                  value="pickup"
                  isChecked={localFilters.deliveryOptions.includes('pickup')}
                  onChange={(checked) => {
                    const options = checked
                      ? [...localFilters.deliveryOptions, 'pickup']
                      : localFilters.deliveryOptions.filter((o) => o !== 'pickup');
                    setLocalFilters({ ...localFilters, deliveryOptions: options as any });
                  }}
                >
                  <CheckboxIndicator><CheckboxIcon as={CheckIcon} /></CheckboxIndicator>
                  <CheckboxLabel><Text>Pickup</Text></CheckboxLabel>
                </Checkbox>

                <Checkbox
                  value="delivery"
                  isChecked={localFilters.deliveryOptions.includes('delivery')}
                  onChange={(checked) => {
                    const options = checked
                      ? [...localFilters.deliveryOptions, 'delivery']
                      : localFilters.deliveryOptions.filter((o) => o !== 'delivery');
                    setLocalFilters({ ...localFilters, deliveryOptions: options as any });
                  }}
                >
                  <CheckboxIndicator><CheckboxIcon as={CheckIcon} /></CheckboxIndicator>
                  <CheckboxLabel><Text>Delivery Available</Text></CheckboxLabel>
                </Checkbox>

                <Checkbox
                  value="meet-halfway"
                  isChecked={localFilters.deliveryOptions.includes('meet-halfway')}
                  onChange={(checked) => {
                    const options = checked
                      ? [...localFilters.deliveryOptions, 'meet-halfway']
                      : localFilters.deliveryOptions.filter((o) => o !== 'meet-halfway');
                    setLocalFilters({ ...localFilters, deliveryOptions: options as any });
                  }}
                >
                  <CheckboxIndicator><CheckboxIcon as={CheckIcon} /></CheckboxIndicator>
                  <CheckboxLabel><Text>Meet Halfway</Text></CheckboxLabel>
                </Checkbox>
              </VStack>
            </VStack>

            {/* Verified Owners Only */}
            <Checkbox
              value="verified"
              isChecked={localFilters.verifiedOnly}
              onChange={(checked) => setLocalFilters({ ...localFilters, verifiedOnly: checked })}
            >
              <CheckboxIndicator><CheckboxIcon as={CheckIcon} /></CheckboxIndicator>
              <CheckboxLabel>
                <VStack>
                  <Text className="font-semibold">Verified Owners Only</Text>
                  <Text size="sm" className="text-typography-500">
                    Show only ID-verified listings
                  </Text>
                </VStack>
              </CheckboxLabel>
            </Checkbox>
          </VStack>
        </ModalBody>

        <ModalFooter className="border-t border-outline-100">
          <HStack className="gap-3 w-full">
            <Button variant="outline" className="flex-1" onPress={handleReset}>
              <ButtonText>Reset</ButtonText>
            </Button>
            <Button className="flex-1" onPress={handleApply}>
              <ButtonText>Apply Filters</ButtonText>
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
