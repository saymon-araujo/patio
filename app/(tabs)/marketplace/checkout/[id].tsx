/**
 * Checkout Flow Screen (Buy/Sell)
 * Simplified checkout for purchasing tools
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
import { Spinner } from '@/components/ui/spinner';
import { Header } from '@/components/navigation/header';
import { CheckIcon } from 'lucide-react-native';
import { getListingById } from '@/utils/mock-data/listings';
import { useBooking } from '@/contexts/booking-context';

type Step = 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlowScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const listing = getListingById(id!);
  const { createOrder } = useBooking();

  const [currentStep, setCurrentStep] = useState<Step>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  // Checkout data
  const [shippingMethod, setShippingMethod] = useState<'pickup' | 'shipping'>('pickup');
  const [shippingAddress, setShippingAddress] = useState('');

  // Confirmation data
  const [orderId, setOrderId] = useState('');

  if (!listing || listing.type !== 'sale') {
    return (
      <Box className="flex-1 bg-white items-center justify-center">
        <Text>Listing not available for purchase</Text>
      </Box>
    );
  }

  const shippingCost = shippingMethod === 'shipping' ? 12 : 0;
  const totalPrice = (listing.price || 0) + shippingCost;

  const handleContinue = () => {
    if (currentStep === 'shipping') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      handleConfirmPurchase();
    }
  };

  const handleConfirmPurchase = async () => {
    setIsProcessing(true);

    try {
      // Create order via context
      const newOrderId = await createOrder({
        listingId: listing.id,
        buyerId: 'current-user',
        sellerId: listing.ownerId,
        price: listing.price!,
        quantity: 1,
        totalPrice,
        shippingMethod,
        shippingAddress: shippingMethod === 'shipping' ? shippingAddress : undefined,
        shippingCost: shippingMethod === 'shipping' ? shippingCost : undefined,
        status: 'paid',
        buyerReviewed: false,
        sellerReviewed: false,
      });

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setOrderId(newOrderId);
      setCurrentStep('confirmation');
    } catch (error) {
      console.error('Order error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-white">
        <Header variant="navigation" title="Checkout" onBack={() => router.back()} />
      </SafeAreaView>

      {currentStep !== 'confirmation' && (
        <Box className="px-4 py-3 bg-background-50 border-b border-outline-100">
          <HStack className="justify-between">
            <VStack className="flex-1">
              <Text size="sm" className="text-typography-500">
                Step {currentStep === 'shipping' ? '1' : '2'} of 2
              </Text>
              <Text className="font-semibold text-typography-950">
                {currentStep === 'shipping' ? 'Shipping Method' : 'Payment'}
              </Text>
            </VStack>
          </HStack>
        </Box>
      )}

      <ScrollView className="flex-1">
        <VStack className="p-4 gap-6 pb-24">
          {/* Step 1: Shipping */}
          {currentStep === 'shipping' && (
            <VStack className="gap-6">
              <VStack className="gap-4">
                <Heading size="lg" className="text-typography-950">
                  How would you like to receive this item?
                </Heading>

                <RadioGroup value={shippingMethod} onChange={setShippingMethod}>
                  <VStack className="gap-3">
                    <Radio value="pickup">
                      <RadioIndicator>
                        <RadioIcon as={CheckIcon} />
                      </RadioIndicator>
                      <RadioLabel>
                        <VStack>
                          <Text className="font-semibold">Local Pickup</Text>
                          <Text size="sm" className="text-typography-500">
                            Free - Arrange pickup with seller
                          </Text>
                        </VStack>
                      </RadioLabel>
                    </Radio>

                    <Radio value="shipping">
                      <RadioIndicator>
                        <RadioIcon as={CheckIcon} />
                      </RadioIndicator>
                      <RadioLabel>
                        <VStack>
                          <Text className="font-semibold">Shipping</Text>
                          <Text size="sm" className="text-typography-500">
                            +${shippingCost} - 3-5 business days
                          </Text>
                        </VStack>
                      </RadioLabel>
                    </Radio>
                  </VStack>
                </RadioGroup>

                {shippingMethod === 'shipping' && (
                  <VStack className="gap-2 mt-2">
                    <Text className="font-semibold text-typography-700">Shipping Address</Text>
                    <Input>
                      <InputField
                        value={shippingAddress}
                        onChangeText={setShippingAddress}
                        placeholder="Enter your shipping address"
                        multiline
                      />
                    </Input>
                  </VStack>
                )}
              </VStack>

              {/* Item Summary */}
              <VStack className="gap-3">
                <Heading size="md" className="text-typography-950">
                  Item Summary
                </Heading>
                <Box className="bg-background-50 p-4 rounded-lg">
                  <HStack className="gap-3">
                    <Box className="w-16 h-16 bg-background-100 rounded-lg" />
                    <VStack className="flex-1 gap-1">
                      <Text className="font-semibold text-typography-950">{listing.title}</Text>
                      <Text size="sm" className="text-typography-600">
                        Condition: {listing.condition}
                      </Text>
                      <Text className="font-bold text-primary-600">${listing.price}</Text>
                    </VStack>
                  </HStack>
                </Box>
              </VStack>
            </VStack>
          )}

          {/* Step 2: Payment Summary */}
          {currentStep === 'payment' && (
            <VStack className="gap-6">
              <Heading size="lg" className="text-typography-950">
                Payment Summary
              </Heading>

              <VStack className="bg-background-50 p-4 rounded-lg gap-3">
                <HStack className="justify-between">
                  <Text className="text-typography-600">Item price</Text>
                  <Text className="font-semibold text-typography-950">
                    ${listing.price?.toFixed(2)}
                  </Text>
                </HStack>

                {shippingCost > 0 && (
                  <HStack className="justify-between">
                    <Text className="text-typography-600">Shipping</Text>
                    <Text className="font-semibold text-typography-950">
                      ${shippingCost.toFixed(2)}
                    </Text>
                  </HStack>
                )}

                <Box className="h-px bg-outline-200 my-1" />

                <HStack className="justify-between">
                  <Text className="font-semibold text-typography-950">Total</Text>
                  <Text className="font-bold text-primary-600 text-lg">
                    ${totalPrice.toFixed(2)}
                  </Text>
                </HStack>
              </VStack>

              <Box className="bg-info-50 p-3 rounded-lg border border-info-200">
                <Text size="sm" className="text-info-700">
                  Payment will be processed securely. Funds are held in escrow until you confirm
                  receipt.
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
                  Purchase Complete!
                </Heading>
                <Text className="text-typography-600 text-center">
                  {shippingMethod === 'pickup'
                    ? 'Contact the seller to arrange pickup.'
                    : 'Your order will ship within 1-2 business days.'}
                </Text>
              </VStack>

              <Box className="bg-background-50 p-4 rounded-lg w-full">
                <VStack className="gap-2">
                  <HStack className="justify-between">
                    <Text className="text-typography-600">Order ID</Text>
                    <Text className="font-mono text-sm">{orderId}</Text>
                  </HStack>
                  {shippingMethod === 'shipping' && (
                    <HStack className="justify-between">
                      <Text className="text-typography-600">Tracking</Text>
                      <Text className="font-semibold text-primary-600">Coming soon</Text>
                    </HStack>
                  )}
                </VStack>
              </Box>

              <VStack className="gap-2 w-full">
                <Button onPress={() => router.push('/marketplace/orders')}>
                  <ButtonText>View My Orders</ButtonText>
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
                (currentStep === 'shipping' &&
                  shippingMethod === 'shipping' &&
                  !shippingAddress) ||
                (currentStep === 'payment' && isProcessing)
              }
            >
              {isProcessing ? (
                <Spinner size="small" color="#FFFFFF" />
              ) : (
                <ButtonText>
                  {currentStep === 'shipping' ? 'Continue to Payment' : 'Confirm Purchase'}
                </ButtonText>
              )}
            </Button>
          </SafeAreaView>
        </Box>
      )}
    </Box>
  );
}
