/**
 * Create Listing Screen
 * Complete 9-step wizard for creating tool listings
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
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from '@/components/ui/checkbox';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@/components/ui/slider';
import { Header } from '@/components/navigation/header';
import { CheckIcon, Upload, MapPin } from 'lucide-react-native';
import { CATEGORIES } from '@/utils/mock-data/listings';
import { ImageUploader } from '@/components/marketplace/create/image-uploader';
import { CalendarPickerComponent } from '@/components/marketplace/shared/calendar-picker';
import { calculateSuggestedDeposit } from '@/utils/price-calculator';

type Step =
  | 'category'
  | 'details'
  | 'photos'
  | 'pricing'
  | 'availability'
  | 'location'
  | 'delivery'
  | 'verification'
  | 'preview'
  | 'confirmation';

type ListingType = 'rental' | 'sale';
type Condition = 'new' | 'like-new' | 'good' | 'fair';

export default function CreateListingScreen() {
  // Navigation
  const [currentStep, setCurrentStep] = useState<Step>('category');

  // Step 1: Category & Type
  const [listingType, setListingType] = useState<ListingType>('rental');
  const [category, setCategory] = useState('');

  // Step 2: Details
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState<Condition>('good');

  // Step 3: Photos
  const [photos, setPhotos] = useState<string[]>([]);

  // Step 4: Pricing
  const [dailyRate, setDailyRate] = useState('');
  const [deposit, setDeposit] = useState('');
  const [price, setPrice] = useState('');
  const [acceptOffers, setAcceptOffers] = useState(false);

  // Step 5: Availability (rental only)
  const [availabilityStart, setAvailabilityStart] = useState<Date | null>(null);
  const [availabilityEnd, setAvailabilityEnd] = useState<Date | null>(null);

  // Step 6: Location
  const [address, setAddress] = useState('');
  const [searchRadius, setSearchRadius] = useState([15]); // miles

  // Step 7: Delivery
  const [allowPickup, setAllowPickup] = useState(true);
  const [allowDelivery, setAllowDelivery] = useState(false);
  const [allowMeetHalfway, setAllowMeetHalfway] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState('');

  // Step 8: Verification
  const [idVerified, setIdVerified] = useState(false);
  const [addressVerified, setAddressVerified] = useState(false);
  const [toolPhotoVerified, setToolPhotoVerified] = useState(false);

  const getStepNumber = () => {
    const steps: Step[] = [
      'category',
      'details',
      'photos',
      'pricing',
      ...(listingType === 'rental' ? ['availability' as Step] : []),
      'location',
      'delivery',
      'verification',
      'preview',
    ];
    return steps.indexOf(currentStep) + 1;
  };

  const getTotalSteps = () => {
    return listingType === 'rental' ? 9 : 8;
  };

  const handleContinue = () => {
    switch (currentStep) {
      case 'category':
        if (category) setCurrentStep('details');
        break;
      case 'details':
        if (title && description) setCurrentStep('photos');
        break;
      case 'photos':
        if (photos.length > 0) setCurrentStep('pricing');
        break;
      case 'pricing':
        if (
          (listingType === 'rental' && dailyRate && deposit) ||
          (listingType === 'sale' && price)
        ) {
          setCurrentStep(listingType === 'rental' ? 'availability' : 'location');
        }
        break;
      case 'availability':
        if (availabilityStart && availabilityEnd) setCurrentStep('location');
        break;
      case 'location':
        if (address) setCurrentStep('delivery');
        break;
      case 'delivery':
        setCurrentStep('verification');
        break;
      case 'verification':
        setCurrentStep('preview');
        break;
      case 'preview':
        handlePublish();
        break;
    }
  };

  const handleBack = () => {
    const stepOrder: Step[] = [
      'category',
      'details',
      'photos',
      'pricing',
      ...(listingType === 'rental' ? ['availability' as Step] : []),
      'location',
      'delivery',
      'verification',
      'preview',
    ];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    } else {
      router.back();
    }
  };

  const handlePublish = async () => {
    // Simulate publishing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setCurrentStep('confirmation');
  };

  const suggestedDeposit = dailyRate ? calculateSuggestedDeposit(parseFloat(dailyRate)) : 0;

  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-white">
        <Header
          variant="navigation"
          title="Create Listing"
          onBack={currentStep === 'confirmation' ? undefined : handleBack}
        />
      </SafeAreaView>

      {/* Progress Indicator */}
      {currentStep !== 'confirmation' && (
        <Box className="px-4 py-3 bg-background-50 border-b border-outline-100">
          <VStack className="gap-2">
            <HStack className="justify-between items-center">
              <Text size="sm" className="text-typography-600">
                Step {getStepNumber()} of {getTotalSteps()}
              </Text>
              <Text size="sm" className="text-primary-600 font-semibold">
                {Math.round((getStepNumber() / getTotalSteps()) * 100)}%
              </Text>
            </HStack>
            <Box className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden">
              <Box
                className="h-full bg-primary-500"
                style={{ width: `${(getStepNumber() / getTotalSteps()) * 100}%` }}
              />
            </Box>
          </VStack>
        </Box>
      )}

      <ScrollView className="flex-1">
        <VStack className="p-4 gap-6 pb-32">
          {/* Step 1: Category & Type */}
          {currentStep === 'category' && (
            <VStack className="gap-6">
              <VStack className="gap-4">
                <Heading size="xl" className="text-typography-950">
                  What type of listing?
                </Heading>

                <RadioGroup value={listingType} onChange={setListingType}>
                  <VStack className="gap-3">
                    <Radio value="rental">
                      <RadioIndicator><RadioIcon as={CheckIcon} /></RadioIndicator>
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
                      <RadioIndicator><RadioIcon as={CheckIcon} /></RadioIndicator>
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
                <Heading size="xl" className="text-typography-950">
                  Select category
                </Heading>

                <RadioGroup value={category} onChange={setCategory}>
                  <VStack className="gap-2">
                    {CATEGORIES.map((cat) => (
                      <Radio key={cat} value={cat}>
                        <RadioIndicator><RadioIcon as={CheckIcon} /></RadioIndicator>
                        <RadioLabel><Text>{cat}</Text></RadioLabel>
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
              <Heading size="xl" className="text-typography-950">
                Tell us about your tool
              </Heading>

              <VStack className="gap-4">
                <VStack className="gap-2">
                  <Text className="font-semibold text-typography-700">Title *</Text>
                  <Input>
                    <InputField
                      value={title}
                      onChangeText={setTitle}
                      placeholder="e.g., DeWalt 20V Cordless Drill Kit"
                      maxLength={50}
                    />
                  </Input>
                  <Text size="xs" className="text-typography-500">{title.length}/50</Text>
                </VStack>

                <VStack className="gap-2">
                  <Text className="font-semibold text-typography-700">Brand (Optional)</Text>
                  <Input>
                    <InputField value={brand} onChangeText={setBrand} placeholder="e.g., DeWalt" />
                  </Input>
                </VStack>

                <VStack className="gap-2">
                  <Text className="font-semibold text-typography-700">Model (Optional)</Text>
                  <Input>
                    <InputField
                      value={model}
                      onChangeText={setModel}
                      placeholder="e.g., DCD771C2"
                    />
                  </Input>
                </VStack>

                <VStack className="gap-2">
                  <Text className="font-semibold text-typography-700">Description *</Text>
                  <Textarea>
                    <TextareaInput
                      value={description}
                      onChangeText={setDescription}
                      placeholder="Describe condition, what's included, any special features..."
                      maxLength={500}
                    />
                  </Textarea>
                  <Text size="xs" className="text-typography-500">{description.length}/500</Text>
                </VStack>

                <VStack className="gap-2">
                  <Text className="font-semibold text-typography-700">Condition</Text>
                  <RadioGroup value={condition} onChange={setCondition}>
                    <VStack className="gap-2">
                      <Radio value="new">
                        <RadioIndicator><RadioIcon as={CheckIcon} /></RadioIndicator>
                        <RadioLabel><Text>New - Unused, in original packaging</Text></RadioLabel>
                      </Radio>
                      <Radio value="like-new">
                        <RadioIndicator><RadioIcon as={CheckIcon} /></RadioIndicator>
                        <RadioLabel><Text>Like New - Used once or twice</Text></RadioLabel>
                      </Radio>
                      <Radio value="good">
                        <RadioIndicator><RadioIcon as={CheckIcon} /></RadioIndicator>
                        <RadioLabel><Text>Good - Normal wear, fully functional</Text></RadioLabel>
                      </Radio>
                      <Radio value="fair">
                        <RadioIndicator><RadioIcon as={CheckIcon} /></RadioIndicator>
                        <RadioLabel><Text>Fair - Shows wear, works as expected</Text></RadioLabel>
                      </Radio>
                    </VStack>
                  </RadioGroup>
                </VStack>
              </VStack>
            </VStack>
          )}

          {/* Step 3: Photos & Video */}
          {currentStep === 'photos' && (
            <VStack className="gap-6">
              <VStack className="gap-2">
                <Heading size="xl" className="text-typography-950">
                  Add photos
                </Heading>
                <Text className="text-typography-600">
                  Upload up to 8 photos. First photo will be the primary image.
                </Text>
              </VStack>

              <ImageUploader photos={photos} onPhotosChange={setPhotos} maxPhotos={8} required />

              <Box className="bg-info-50 p-3 rounded-lg border border-info-200">
                <Text size="sm" className="text-info-700">
                  Clear, well-lit photos get 3x more views. Show the tool from multiple angles.
                </Text>
              </Box>
            </VStack>
          )}

          {/* Step 4: Pricing */}
          {currentStep === 'pricing' && (
            <VStack className="gap-6">
              <Heading size="xl" className="text-typography-950">
                Set your pricing
              </Heading>

              {listingType === 'rental' ? (
                <VStack className="gap-4">
                  <VStack className="gap-2">
                    <Text className="font-semibold text-typography-700">Daily Rate *</Text>
                    <Input>
                      <InputField
                        value={dailyRate}
                        onChangeText={(val) => {
                          setDailyRate(val);
                          if (val && !deposit) {
                            setDeposit(suggestedDeposit.toString());
                          }
                        }}
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                      />
                    </Input>
                    <Text size="sm" className="text-typography-500">
                      Similar tools rent for $15-40/day
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
                      Suggested: ${suggestedDeposit} (refundable after return)
                    </Text>
                  </VStack>
                </VStack>
              ) : (
                <VStack className="gap-4">
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
                      One-time purchase price
                    </Text>
                  </VStack>

                  <Checkbox value="offers" isChecked={acceptOffers} onChange={setAcceptOffers}>
                    <CheckboxIndicator><CheckboxIcon as={CheckIcon} /></CheckboxIndicator>
                    <CheckboxLabel>
                      <Text>Accept offers below asking price</Text>
                    </CheckboxLabel>
                  </Checkbox>
                </VStack>
              )}

              <Box className="bg-warning-50 p-3 rounded-lg border border-warning-200">
                <Text size="sm" className="text-warning-700">
                  A 10% service fee will be deducted from your earnings to cover platform costs.
                </Text>
              </Box>
            </VStack>
          )}

          {/* Step 5: Availability (Rental Only) */}
          {currentStep === 'availability' && listingType === 'rental' && (
            <VStack className="gap-6">
              <VStack className="gap-2">
                <Heading size="xl" className="text-typography-950">
                  When is this tool available?
                </Heading>
                <Text className="text-typography-600">
                  Select the date range when renters can book your tool.
                </Text>
              </VStack>

              <CalendarPickerComponent
                startDate={availabilityStart}
                endDate={availabilityEnd}
                onDateChange={(start, end) => {
                  setAvailabilityStart(start);
                  setAvailabilityEnd(end);
                }}
                allowRangeSelection={true}
                minDate={new Date()}
              />

              <Box className="bg-info-50 p-3 rounded-lg border border-info-200">
                <Text size="sm" className="text-info-700">
                  You can update availability anytime. Start with a range and adjust as needed.
                </Text>
              </Box>
            </VStack>
          )}

          {/* Step 6: Location & Radius */}
          {currentStep === 'location' && (
            <VStack className="gap-6">
              <VStack className="gap-2">
                <Heading size="xl" className="text-typography-950">
                  Where is your tool located?
                </Heading>
                <Text className="text-typography-600">
                  Your exact address won't be shared until booking is confirmed.
                </Text>
              </VStack>

              <VStack className="gap-2">
                <Text className="font-semibold text-typography-700">Address *</Text>
                <Input>
                  <InputField
                    value={address}
                    onChangeText={setAddress}
                    placeholder="123 Main St, San Francisco, CA"
                  />
                </Input>
              </VStack>

              <VStack className="gap-3">
                <Text className="font-semibold text-typography-700">Search Radius</Text>
                <Text size="sm" className="text-typography-600">
                  How far are you willing to let renters search? {searchRadius[0]} miles
                </Text>
                <Slider
                  value={searchRadius[0]}
                  onChange={(value) => setSearchRadius([value])}
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
                  <Text size="xs" className="text-typography-500">
                    1 mi
                  </Text>
                  <Text size="xs" className="text-typography-500">
                    50 mi
                  </Text>
                </HStack>
              </VStack>

              <Box className="h-48 bg-background-100 rounded-lg items-center justify-center">
                <MapPin size={32} className="text-typography-300" />
                <Text size="sm" className="text-typography-500 mt-2">
                  Map preview
                </Text>
              </Box>
            </VStack>
          )}

          {/* Step 7: Delivery Options */}
          {currentStep === 'delivery' && (
            <VStack className="gap-6">
              <Heading size="xl" className="text-typography-950">
                How can renters receive this tool?
              </Heading>

              <VStack className="gap-3">
                <Checkbox value="pickup" isChecked={allowPickup} onChange={setAllowPickup}>
                  <CheckboxIndicator><CheckboxIcon as={CheckIcon} /></CheckboxIndicator>
                  <CheckboxLabel>
                    <VStack>
                      <Text className="font-semibold">Pickup (Free)</Text>
                      <Text size="sm" className="text-typography-500">
                        Renters pick up from your location
                      </Text>
                    </VStack>
                  </CheckboxLabel>
                </Checkbox>

                <Checkbox value="delivery" isChecked={allowDelivery} onChange={setAllowDelivery}>
                  <CheckboxIndicator><CheckboxIcon as={CheckIcon} /></CheckboxIndicator>
                  <CheckboxLabel>
                    <VStack>
                      <Text className="font-semibold">Delivery</Text>
                      <Text size="sm" className="text-typography-500">
                        You'll deliver to renter's address
                      </Text>
                    </VStack>
                  </CheckboxLabel>
                </Checkbox>

                {allowDelivery && (
                  <VStack className="gap-2 ml-8">
                    <Text className="font-semibold text-typography-700">Delivery Fee</Text>
                    <Input>
                      <InputField
                        value={deliveryFee}
                        onChangeText={setDeliveryFee}
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                      />
                    </Input>
                  </VStack>
                )}

                <Checkbox
                  value="meet-halfway"
                  isChecked={allowMeetHalfway}
                  onChange={setAllowMeetHalfway}
                >
                  <CheckboxIndicator><CheckboxIcon as={CheckIcon} /></CheckboxIndicator>
                  <CheckboxLabel>
                    <VStack>
                      <Text className="font-semibold">Meet Halfway (Free)</Text>
                      <Text size="sm" className="text-typography-500">
                        Coordinate a meeting point
                      </Text>
                    </VStack>
                  </CheckboxLabel>
                </Checkbox>
              </VStack>

              {!allowPickup && !allowDelivery && !allowMeetHalfway && (
                <Box className="bg-error-50 p-3 rounded-lg border border-error-200">
                  <Text size="sm" className="text-error-700">
                    Please select at least one delivery option
                  </Text>
                </Box>
              )}
            </VStack>
          )}

          {/* Step 8: Verification */}
          {currentStep === 'verification' && (
            <VStack className="gap-6">
              <VStack className="gap-2">
                <Heading size="xl" className="text-typography-950">
                  Verification
                </Heading>
                <Text className="text-typography-600">
                  Build trust with renters by verifying your identity and tool.
                </Text>
              </VStack>

              <VStack className="gap-4">
                <HStack className="items-center justify-between p-4 bg-background-50 rounded-lg">
                  <VStack className="flex-1">
                    <Text className="font-semibold text-typography-950">ID Verified</Text>
                    <Text size="sm" className="text-typography-500">
                      Upload a photo ID
                    </Text>
                  </VStack>
                  {idVerified ? (
                    <CheckIcon size={24} className="text-success-500" />
                  ) : (
                    <Button size="sm" onPress={() => setIdVerified(true)}>
                      <ButtonText>Verify</ButtonText>
                    </Button>
                  )}
                </HStack>

                <HStack className="items-center justify-between p-4 bg-background-50 rounded-lg">
                  <VStack className="flex-1">
                    <Text className="font-semibold text-typography-950">Address Verified</Text>
                    <Text size="sm" className="text-typography-500">
                      Confirm your address
                    </Text>
                  </VStack>
                  {addressVerified ? (
                    <CheckIcon size={24} className="text-success-500" />
                  ) : (
                    <Button size="sm" onPress={() => setAddressVerified(true)}>
                      <ButtonText>Verify</ButtonText>
                    </Button>
                  )}
                </HStack>

                <HStack className="items-center justify-between p-4 bg-background-50 rounded-lg">
                  <VStack className="flex-1">
                    <Text className="font-semibold text-typography-950">Tool Photo</Text>
                    <Text size="sm" className="text-typography-500">
                      Selfie holding the tool
                    </Text>
                  </VStack>
                  {toolPhotoVerified ? (
                    <CheckIcon size={24} className="text-success-500" />
                  ) : (
                    <Button size="sm" onPress={() => setToolPhotoVerified(true)}>
                      <ButtonText>Take Photo</ButtonText>
                    </Button>
                  )}
                </HStack>
              </VStack>

              <Box className="bg-warning-50 p-3 rounded-lg border border-warning-200">
                <Text size="sm" className="text-warning-700">
                  Verification is optional but increases trust and booking rates by up to 3x.
                </Text>
              </Box>
            </VStack>
          )}

          {/* Step 9: Preview & Publish */}
          {currentStep === 'preview' && (
            <VStack className="gap-6">
              <Heading size="xl" className="text-typography-950">
                Preview your listing
              </Heading>

              {/* Preview Card */}
              <Box className="bg-white border border-outline-200 rounded-lg overflow-hidden">
                <Box className="w-full h-48 bg-background-100" />
                <VStack className="p-4 gap-3">
                  <VStack className="gap-1">
                    <Text className="font-bold text-typography-950 text-lg">{title}</Text>
                    <Text size="sm" className="text-typography-600">{category}</Text>
                  </VStack>

                  <HStack className="items-center gap-2">
                    <Text className="font-bold text-primary-600 text-xl">
                      {listingType === 'rental'
                        ? `$${dailyRate}/day`
                        : `$${price}`}
                    </Text>
                    {listingType === 'rental' && deposit && (
                      <Text size="sm" className="text-typography-500">
                        + ${deposit} deposit
                      </Text>
                    )}
                  </HStack>

                  <Text className="text-typography-700">{description}</Text>

                  <HStack className="gap-2">
                    {idVerified && (
                      <Box className="px-2 py-1 bg-success-50 rounded">
                        <Text size="xs" className="text-success-700 font-semibold">
                          ID Verified
                        </Text>
                      </Box>
                    )}
                    {condition && (
                      <Box className="px-2 py-1 bg-info-50 rounded">
                        <Text size="xs" className="text-info-700 font-semibold">
                          {condition}
                        </Text>
                      </Box>
                    )}
                  </HStack>
                </VStack>
              </Box>

              <Box className="bg-primary-50 p-4 rounded-lg border border-primary-200">
                <VStack className="gap-2">
                  <Text className="font-semibold text-typography-950">
                    Ready to publish?
                  </Text>
                  <Text size="sm" className="text-typography-700">
                    Your listing will be live immediately and visible to renters in your area.
                  </Text>
                </VStack>
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
                  Your {listingType === 'rental' ? 'rental' : 'sale'} listing is now live and
                  visible to the community.
                </Text>
              </VStack>

              <VStack className="gap-2 w-full">
                <Button onPress={() => router.push('/marketplace')}>
                  <ButtonText>View in Marketplace</ButtonText>
                </Button>
                <Button variant="outline" onPress={() => router.push('/marketplace/create')}>
                  <ButtonText>Create Another Listing</ButtonText>
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
                (currentStep === 'photos' && photos.length === 0) ||
                (currentStep === 'pricing' &&
                  ((listingType === 'rental' && (!dailyRate || !deposit)) ||
                    (listingType === 'sale' && !price))) ||
                (currentStep === 'availability' && (!availabilityStart || !availabilityEnd)) ||
                (currentStep === 'location' && !address) ||
                (currentStep === 'delivery' &&
                  !allowPickup &&
                  !allowDelivery &&
                  !allowMeetHalfway)
              }
            >
              <ButtonText>
                {currentStep === 'preview' ? 'Publish Listing' : 'Continue'}
              </ButtonText>
            </Button>
          </SafeAreaView>
        </Box>
      )}
    </Box>
  );
}
