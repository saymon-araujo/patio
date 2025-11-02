/**
 * Booking Flow Screen (Rental)
 * Multi-step booking process for tool rentals
 */

import React, { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Box } from '@/components/ui/box';
import { ScrollView } from '@/components/ui/scroll-view';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Radio, RadioGroup, RadioIndicator, RadioIcon, RadioLabel } from '@/components/ui/radio';
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from '@/components/ui/checkbox';
import { Spinner } from '@/components/ui/spinner';
import { Pressable } from '@/components/ui/pressable';
import { Header } from '@/components/navigation/header';
import { CheckIcon } from 'lucide-react-native';
import { getListingById } from '@/utils/mock-data/listings';
import { calculateRentalPrice, calculateDaysBetween } from '@/utils/price-calculator';
import { mockCreateBooking, generateMockQRCode } from '@/utils/mock-data/bookings';
import { useBooking } from '@/contexts/booking-context';

type Step = 'dates' | 'options' | 'payment' | 'confirmation';

export default function BookingFlowScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const listing = getListingById(id!);
  const { createBooking } = useBooking();

  const [currentStep, setCurrentStep] = useState<Step>('dates');
  const [isProcessing, setIsProcessing] = useState(false);

  // Booking data
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery' | 'meet-halfway'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [includeInsurance, setIncludeInsurance] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Confirmation data
  const [bookingId, setBookingId] = useState('');
  const [qrCode, setQrCode] = useState('');

  if (!listing || listing.type !== 'rental') {
    return (
      <Box className="flex-1 bg-white items-center justify-center">
        <Text>Listing not available for rental</Text>
      </Box>
    );
  }

  const days = startDate && endDate ? calculateDaysBetween(new Date(startDate), new Date(endDate)) : 0;

  const selectedAddonsData = (listing.addons || []).filter((addon) =>
    selectedAddons.includes(addon.id)
  );

  const deliveryFee =
    deliveryMethod === 'delivery' && listing.deliveryOptions.deliveryFee
      ? listing.deliveryOptions.deliveryFee
      : 0;

  const priceBreakdown =
    days > 0
      ? calculateRentalPrice(
          listing.dailyRate!,
          listing.weeklyRate,
          days,
          listing.deposit!,
          selectedAddonsData,
          includeInsurance,
          deliveryFee
        )
      : null;

  const handleContinue = () => {
    if (currentStep === 'dates' && startDate && endDate && days > 0) {
      setCurrentStep('options');
    } else if (currentStep === 'options') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      handleConfirmBooking();
    }
  };

  const handleConfirmBooking = async () => {
    if (!priceBreakdown) return;

    setIsProcessing(true);

    try {
      // Create booking via context
      const newBookingId = await createBooking({
        listingId: listing.id,
        renterId: 'current-user',
        ownerId: listing.ownerId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        duration: days,
        dailyRate: listing.dailyRate!,
        totalRentalCost: priceBreakdown.rentalCost,
        serviceFee: priceBreakdown.serviceFee,
        deposit: priceBreakdown.deposit,
        addons: selectedAddonsData,
        insurance: priceBreakdown.insurance,
        totalCharged: priceBreakdown.totalCharged,
        deliveryMethod,
        deliveryAddress: deliveryMethod === 'delivery' ? deliveryAddress : undefined,
        deliveryFee: priceBreakdown.deliveryFee,
        status: 'confirmed',
        pickupConfirmed: false,
        pickupQRScanned: false,
        returnRequested: false,
        returnConfirmed: false,
        extensions: [],
        renterReviewed: false,
        ownerReviewed: false,
      });

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setBookingId(newBookingId);
      setQrCode(generateMockQRCode(newBookingId));
      setCurrentStep('confirmation');
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-white">
        <Header variant="navigation" title="Book Rental" onBack={() => router.back()} />
      </SafeAreaView>

      {currentStep !== 'confirmation' && (
        <Box className="px-4 py-3 bg-background-50 border-b border-outline-100">
          <HStack className="justify-between">
            <VStack className="flex-1">
              <Text size="sm" className="text-typography-500">
                Step {currentStep === 'dates' ? '1' : currentStep === 'options' ? '2' : '3'} of 3
              </Text>
              <Text className="font-semibold text-typography-950">
                {currentStep === 'dates'
                  ? 'Select Dates'
                  : currentStep === 'options'
                  ? 'Options & Delivery'
                  : 'Payment'}
              </Text>
            </VStack>
          </HStack>
        </Box>
      )}

      <ScrollView className="flex-1">
        <VStack className="p-4 gap-6 pb-24">
          {/* Step 1: Dates */}
          {currentStep === 'dates' && (
            <VStack className="gap-4">
              <Heading size="lg" className="text-typography-950">
                When do you need this tool?
              </Heading>

              <VStack className="gap-3">
                <VStack className="gap-1">
                  <Text className="font-semibold text-typography-700">Start Date</Text>
                  <Input>
                    <InputField
                      value={startDate}
                      onChangeText={setStartDate}
                      placeholder="YYYY-MM-DD"
                    />
                  </Input>
                </VStack>

                <VStack className="gap-1">
                  <Text className="font-semibold text-typography-700">End Date</Text>
                  <Input>
                    <InputField
                      value={endDate}
                      onChangeText={setEndDate}
                      placeholder="YYYY-MM-DD"
                    />
                  </Input>
                </VStack>

                {days > 0 && (
                  <Box className="bg-primary-50 p-3 rounded-lg">
                    <Text className="text-primary-700">
                      Rental duration: <Text className="font-bold">{days} days</Text>
                    </Text>
                  </Box>
                )}
              </VStack>
            </VStack>
          )}

          {/* Step 2: Options & Delivery */}
          {currentStep === 'options' && (
            <VStack className="gap-6">
              <VStack className="gap-4">
                <Heading size="lg" className="text-typography-950">
                  Delivery Method
                </Heading>

                <RadioGroup value={deliveryMethod} onChange={setDeliveryMethod}>
                  <VStack className="gap-3">
                    <Radio value="pickup">
                      <RadioIndicator>
                        <RadioIcon as={CheckIcon} />
                      </RadioIndicator>
                      <RadioLabel>
                        <VStack>
                          <Text className="font-semibold">Pickup</Text>
                          <Text size="sm" className="text-typography-500">
                            Free - Pick up from owner's location
                          </Text>
                        </VStack>
                      </RadioLabel>
                    </Radio>

                    {listing.deliveryOptions.delivery && (
                      <Radio value="delivery">
                        <RadioIndicator>
                          <RadioIcon as={CheckIcon} />
                        </RadioIndicator>
                        <RadioLabel>
                          <VStack>
                            <Text className="font-semibold">Delivery</Text>
                            <Text size="sm" className="text-typography-500">
                              +${listing.deliveryOptions.deliveryFee} delivery fee
                            </Text>
                          </VStack>
                        </RadioLabel>
                      </Radio>
                    )}

                    {listing.deliveryOptions.meetHalfway && (
                      <Radio value="meet-halfway">
                        <RadioIndicator>
                          <RadioIcon as={CheckIcon} />
                        </RadioIndicator>
                        <RadioLabel>
                          <VStack>
                            <Text className="font-semibold">Meet Halfway</Text>
                            <Text size="sm" className="text-typography-500">
                              Free - Coordinate meeting point
                            </Text>
                          </VStack>
                        </RadioLabel>
                      </Radio>
                    )}
                  </VStack>
                </RadioGroup>

                {deliveryMethod === 'delivery' && (
                  <Input>
                    <InputField
                      value={deliveryAddress}
                      onChangeText={setDeliveryAddress}
                      placeholder="Delivery address"
                    />
                  </Input>
                )}
              </VStack>

              {listing.insuranceAvailable && (
                <VStack className="gap-3">
                  <Heading size="lg" className="text-typography-950">
                    Protection
                  </Heading>
                  <Checkbox
                    value="insurance"
                    isChecked={includeInsurance}
                    onChange={setIncludeInsurance}
                  >
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>
                      <VStack>
                        <Text className="font-semibold">Add Insurance</Text>
                        <Text size="sm" className="text-typography-500">
                          $3/day - Covers damage and theft
                        </Text>
                      </VStack>
                    </CheckboxLabel>
                  </Checkbox>
                </VStack>
              )}

              {listing.addons && listing.addons.length > 0 && (
                <VStack className="gap-3">
                  <Heading size="lg" className="text-typography-950">
                    Add-ons
                  </Heading>
                  <VStack className="gap-2">
                    {listing.addons.map((addon) => (
                      <Checkbox
                        key={addon.id}
                        value={addon.id}
                        isChecked={selectedAddons.includes(addon.id)}
                        onChange={(checked) => {
                          if (checked) {
                            setSelectedAddons([...selectedAddons, addon.id]);
                          } else {
                            setSelectedAddons(selectedAddons.filter((id) => id !== addon.id));
                          }
                        }}
                      >
                        <CheckboxIndicator>
                          <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                        <CheckboxLabel>
                          <HStack className="justify-between flex-1">
                            <Text>{addon.name}</Text>
                            <Text className="font-semibold text-primary-600">
                              +${addon.price}
                            </Text>
                          </HStack>
                        </CheckboxLabel>
                      </Checkbox>
                    ))}
                  </VStack>
                </VStack>
              )}
            </VStack>
          )}

          {/* Step 3: Payment Summary */}
          {currentStep === 'payment' && priceBreakdown && (
            <VStack className="gap-6">
              <Heading size="lg" className="text-typography-950">
                Payment Summary
              </Heading>

              <VStack className="bg-background-50 p-4 rounded-lg gap-3">
                <HStack className="justify-between">
                  <Text className="text-typography-600">
                    Rental ({days} {days === 1 ? 'day' : 'days'})
                  </Text>
                  <Text className="font-semibold text-typography-950">
                    ${priceBreakdown.rentalCost.toFixed(2)}
                  </Text>
                </HStack>

                <HStack className="justify-between">
                  <Text className="text-typography-600">Service fee</Text>
                  <Text className="font-semibold text-typography-950">
                    ${priceBreakdown.serviceFee.toFixed(2)}
                  </Text>
                </HStack>

                {priceBreakdown.addonsCost > 0 && (
                  <HStack className="justify-between">
                    <Text className="text-typography-600">Add-ons</Text>
                    <Text className="font-semibold text-typography-950">
                      ${priceBreakdown.addonsCost.toFixed(2)}
                    </Text>
                  </HStack>
                )}

                {priceBreakdown.insurance && (
                  <HStack className="justify-between">
                    <Text className="text-typography-600">Insurance</Text>
                    <Text className="font-semibold text-typography-950">
                      ${priceBreakdown.insurance.toFixed(2)}
                    </Text>
                  </HStack>
                )}

                {priceBreakdown.deliveryFee && (
                  <HStack className="justify-between">
                    <Text className="text-typography-600">Delivery</Text>
                    <Text className="font-semibold text-typography-950">
                      ${priceBreakdown.deliveryFee.toFixed(2)}
                    </Text>
                  </HStack>
                )}

                <Box className="h-px bg-outline-200 my-1" />

                <HStack className="justify-between">
                  <Text className="font-semibold text-typography-950">Total Charged</Text>
                  <Text className="font-bold text-primary-600 text-lg">
                    ${priceBreakdown.totalCharged.toFixed(2)}
                  </Text>
                </HStack>

                <HStack className="justify-between">
                  <Text className="text-typography-600">Deposit (held)</Text>
                  <Text className="font-semibold text-typography-700">
                    ${priceBreakdown.deposit.toFixed(2)}
                  </Text>
                </HStack>
              </VStack>

              <Box className="bg-info-50 p-3 rounded-lg border border-info-200">
                <Text size="sm" className="text-info-700">
                  The deposit will be held on your card but not charged. It will be released after
                  successful return.
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
                  Booking Confirmed!
                </Heading>
                <Text className="text-typography-600 text-center">
                  Your rental has been confirmed. Show this QR code at pickup.
                </Text>
              </VStack>

              {/* QR Code Placeholder */}
              <Box className="w-64 h-64 bg-background-100 rounded-lg items-center justify-center">
                <Text className="text-typography-500">QR Code</Text>
                <Text size="xs" className="text-typography-400 mt-2">
                  {bookingId}
                </Text>
              </Box>

              <VStack className="gap-2 w-full">
                <Button onPress={() => router.push('/marketplace/orders')}>
                  <ButtonText>View My Bookings</ButtonText>
                </Button>
                <Button variant="outline" onPress={() => router.push('/marketplace')}>
                  <ButtonText>Back to Marketplace</ButtonText>
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
                (currentStep === 'dates' && (!startDate || !endDate || days <= 0)) ||
                (currentStep === 'payment' && isProcessing)
              }
            >
              {isProcessing ? (
                <Spinner size="small" color="#FFFFFF" />
              ) : (
                <ButtonText>
                  {currentStep === 'dates'
                    ? 'Continue'
                    : currentStep === 'options'
                    ? 'Continue to Payment'
                    : 'Confirm & Pay'}
                </ButtonText>
              )}
            </Button>
          </SafeAreaView>
        </Box>
      )}
    </Box>
  );
}
