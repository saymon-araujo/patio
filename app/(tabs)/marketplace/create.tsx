/**
 * Create Listing Screen (Simplified)
 * Multi-step wizard for creating tool listings
 */

import React, { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Box } from '@/components/ui/box';
import { ScrollView } from '@/components/ui/scroll-view';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Radio, RadioGroup, RadioIndicator, RadioIcon, RadioLabel } from '@/components/ui/radio';
import { Header } from '@/components/navigation/header';
import { CheckIcon } from 'lucide-react-native';
import { CATEGORIES } from '@/utils/mock-data/listings';

type Step = 'category' | 'details' | 'pricing' | 'confirmation';
type ListingType = 'rental' | 'sale';

export default function CreateListingScreen() {
  const [currentStep, setCurrentStep] = useState<Step>('category');
  const [listingType, setListingType] = useState<ListingType>('rental');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState<'new' | 'like-new' | 'good' | 'fair'>('good');
  const [dailyRate, setDailyRate] = useState('');
  const [deposit, setDeposit] = useState('');
  const [price, setPrice] = useState('');

  const handleContinue = () => {
    if (currentStep === 'category' && category) {
      setCurrentStep('details');
    } else if (currentStep === 'details' && title && description) {
      setCurrentStep('pricing');
    } else if (currentStep === 'pricing') {
      handlePublish();
    }
  };

  const handlePublish = async () => {
    // Simulate publishing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentStep('confirmation');
  };

  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-white">
        <Header variant="navigation" title="Create Listing" onBack={() => router.back()} />
      </SafeAreaView>

      {currentStep !== 'confirmation' && (
        <Box className="px-4 py-3 bg-background-50 border-b border-outline-100">
          <HStack className="justify-between">
            <VStack className="flex-1">
              <Text size="sm" className="text-typography-500">
                Step{' '}
                {currentStep === 'category' ? '1' : currentStep === 'details' ? '2' : '3'} of 3
              </Text>
              <Text className="font-semibold text-typography-950">
                {currentStep === 'category'
                  ? 'Category & Type'
                  : currentStep === 'details'
                  ? 'Details'
                  : 'Pricing'}
              </Text>
            </VStack>
          </HStack>
        </Box>
      )}

      <ScrollView className="flex-1">
        <VStack className="p-4 gap-6 pb-24">
          {/* Step 1: Category & Type */}
          {currentStep === 'category' && (
            <VStack className="gap-6">
              <VStack className="gap-4">
                <Heading size="lg" className="text-typography-950">
                  Listing Type
                </Heading>

                <RadioGroup value={listingType} onChange={setListingType}>
                  <VStack className="gap-3">
                    <Radio value="rental">
                      <RadioIndicator>
                        <RadioIcon as={CheckIcon} />
                      </RadioIndicator>
                      <RadioLabel>
                        <VStack>
                          <Text className="font-semibold">For Rent</Text>
                          <Text size="sm" className="text-typography-500">
                            Rent out your tool and earn passive income
                          </Text>
                        </VStack>
                      </RadioLabel>
                    </Radio>

                    <Radio value="sale">
                      <RadioIndicator>
                        <RadioIcon as={CheckIcon} />
                      </RadioIndicator>
                      <RadioLabel>
                        <VStack>
                          <Text className="font-semibold">For Sale</Text>
                          <Text size="sm" className="text-typography-500">
                            Sell your tool for a one-time payment
                          </Text>
                        </VStack>
                      </RadioLabel>
                    </Radio>
                  </VStack>
                </RadioGroup>
              </VStack>

              <VStack className="gap-4">
                <Heading size="lg" className="text-typography-950">
                  Category
                </Heading>

                <RadioGroup value={category} onChange={setCategory}>
                  <VStack className="gap-2">
                    {CATEGORIES.slice(0, 6).map((cat) => (
                      <Radio key={cat} value={cat}>
                        <RadioIndicator>
                          <RadioIcon as={CheckIcon} />
                        </RadioIndicator>
                        <RadioLabel>
                          <Text>{cat}</Text>
                        </RadioLabel>
                      </Radio>
                    ))}
                  </VStack>
                </RadioGroup>
              </VStack>
            </VStack>
          )}

          {/* Step 2: Details */}
          {currentStep === 'details' && (
            <VStack className="gap-6">
              <VStack className="gap-3">
                <Heading size="lg" className="text-typography-950">
                  Tool Details
                </Heading>

                <VStack className="gap-2">
                  <Text className="font-semibold text-typography-700">Title *</Text>
                  <Input>
                    <InputField
                      value={title}
                      onChangeText={setTitle}
                      placeholder="e.g., DeWalt 20V Cordless Drill"
                    />
                  </Input>
                </VStack>

                <VStack className="gap-2">
                  <Text className="font-semibold text-typography-700">Description *</Text>
                  <Textarea>
                    <TextareaInput
                      value={description}
                      onChangeText={setDescription}
                      placeholder="Describe your tool, its condition, what's included..."
                    />
                  </Textarea>
                </VStack>

                <VStack className="gap-2">
                  <Text className="font-semibold text-typography-700">Condition</Text>

                  <RadioGroup value={condition} onChange={setCondition}>
                    <VStack className="gap-2">
                      <Radio value="new">
                        <RadioIndicator>
                          <RadioIcon as={CheckIcon} />
                        </RadioIndicator>
                        <RadioLabel>
                          <Text>New</Text>
                        </RadioLabel>
                      </Radio>
                      <Radio value="like-new">
                        <RadioIndicator>
                          <RadioIcon as={CheckIcon} />
                        </RadioIndicator>
                        <RadioLabel>
                          <Text>Like New</Text>
                        </RadioLabel>
                      </Radio>
                      <Radio value="good">
                        <RadioIndicator>
                          <RadioIcon as={CheckIcon} />
                        </RadioIndicator>
                        <RadioLabel>
                          <Text>Good</Text>
                        </RadioLabel>
                      </Radio>
                      <Radio value="fair">
                        <RadioIndicator>
                          <RadioIcon as={CheckIcon} />
                        </RadioIndicator>
                        <RadioLabel>
                          <Text>Fair</Text>
                        </RadioLabel>
                      </Radio>
                    </VStack>
                  </RadioGroup>
                </VStack>
              </VStack>
            </VStack>
          )}

          {/* Step 3: Pricing */}
          {currentStep === 'pricing' && (
            <VStack className="gap-6">
              <Heading size="lg" className="text-typography-950">
                Set Your Price
              </Heading>

              {listingType === 'rental' ? (
                <VStack className="gap-4">
                  <VStack className="gap-2">
                    <Text className="font-semibold text-typography-700">Daily Rate *</Text>
                    <Input>
                      <InputField
                        value={dailyRate}
                        onChangeText={setDailyRate}
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                      />
                    </Input>
                    <Text size="sm" className="text-typography-500">
                      How much per day?
                    </Text>
                  </VStack>

                  <VStack className="gap-2">
                    <Text className="font-semibold text-typography-700">Security Deposit *</Text>
                    <Input>
                      <InputField
                        value={deposit}
                        onChangeText={setDeposit}
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                      />
                    </Input>
                    <Text size="sm" className="text-typography-500">
                      Refundable deposit to protect your tool
                    </Text>
                  </VStack>
                </VStack>
              ) : (
                <VStack className="gap-2">
                  <Text className="font-semibold text-typography-700">Sale Price *</Text>
                  <Input>
                    <InputField
                      value={price}
                      onChangeText={setPrice}
                      placeholder="0.00"
                      keyboardType="decimal-pad"
                    />
                  </Input>
                  <Text size="sm" className="text-typography-500">
                    One-time sale price
                  </Text>
                </VStack>
              )}

              <Box className="bg-info-50 p-3 rounded-lg border border-info-200">
                <Text size="sm" className="text-info-700">
                  A 10% service fee will be deducted from your earnings.
                </Text>
              </Box>
            </VStack>
          )}

          {/* Confirmation */}
          {currentStep === 'confirmation' && (
            <VStack className="gap-6 items-center">
              <Box className="w-20 h-20 bg-success-50 rounded-full items-center justify-center">
                <CheckIcon size={40} className="text-success-600" />
              </Box>

              <VStack className="gap-2 items-center">
                <Heading size="2xl" className="text-typography-950 text-center">
                  Listing Published!
                </Heading>
                <Text className="text-typography-600 text-center">
                  Your {listingType === 'rental' ? 'rental' : 'sale'} listing is now live.
                </Text>
              </VStack>

              <VStack className="gap-2 w-full">
                <Button onPress={() => router.push('/marketplace')}>
                  <ButtonText>View in Marketplace</ButtonText>
                </Button>
                <Button variant="outline" onPress={() => router.push('/marketplace/create')}>
                  <ButtonText>Create Another</ButtonText>
                </Button>
              </VStack>
            </VStack>
          )}
        </VStack>
      </ScrollView>

      {/* CTA Button */}
      {currentStep !== 'confirmation' && (
        <Box className="absolute bottom-0 left-0 right-0 bg-white border-t border-outline-100 p-4">
          <SafeAreaView edges={['bottom']}>
            <Button
              onPress={handleContinue}
              isDisabled={
                (currentStep === 'category' && !category) ||
                (currentStep === 'details' && (!title || !description)) ||
                (currentStep === 'pricing' &&
                  ((listingType === 'rental' && (!dailyRate || !deposit)) ||
                    (listingType === 'sale' && !price)))
              }
            >
              <ButtonText>
                {currentStep === 'category'
                  ? 'Continue'
                  : currentStep === 'details'
                  ? 'Continue'
                  : 'Publish Listing'}
              </ButtonText>
            </Button>
          </SafeAreaView>
        </Box>
      )}
    </Box>
  );
}
