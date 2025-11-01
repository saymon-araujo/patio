/**
 * Onboarding Screen
 * 4-slide carousel introducing the app
 */

import React, { useRef, useState } from 'react';
import { View, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { OnboardingSlide } from '@/components/onboarding/onboarding-slide';
import { ProgressDots } from '@/components/onboarding/progress-dots';
import { router } from 'expo-router';
import { setOnboardingCompleted } from '@/utils/auth-storage';
import { BookOpen, ShoppingBag, Users, Sparkles } from 'lucide-react-native';
import { Center } from '@/components/ui/center';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: 'Learn DIY Skills',
    subtitle: 'Master home improvement through interactive, gamified lessons. Earn XP, unlock badges, and climb the leaderboard.',
    icon: BookOpen,
  },
  {
    title: 'Share Tools Locally',
    subtitle: 'Rent or buy tools from neighbors. Save money, reduce waste, and build community connections.',
    icon: ShoppingBag,
  },
  {
    title: 'Join DIY Clubs',
    subtitle: 'Connect with local makers. Share inventory, attend workshops, and collaborate on projects.',
    icon: Users,
  },
  {
    title: 'Get Instant Answers',
    subtitle: 'Ask our AI assistant anything about DIY. Get personalized recommendations and step-by-step guidance.',
    icon: Sparkles,
  },
];

export default function OnboardingScreen() {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const isLastSlide = currentPage === slides.length - 1;

  const handleSkip = async () => {
    await setOnboardingCompleted();
    router.replace('/(auth)/welcome');
  };

  const handleNext = () => {
    if (isLastSlide) {
      handleSkip();
    } else {
      pagerRef.current?.setPage(currentPage + 1);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <VStack className="flex-1">
        {/* Skip Button */}
        {!isLastSlide && (
          <HStack className="justify-end p-4">
            <Pressable onPress={handleSkip}>
              <Text className="text-primary-500 font-medium">Skip</Text>
            </Pressable>
          </HStack>
        )}

        {/* Carousel */}
        <PagerView
          ref={pagerRef}
          style={{ flex: 1 }}
          initialPage={0}
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        >
          {slides.map((slide, index) => {
            const IconComponent = slide.icon;
            return (
              <View key={index} style={{ width }}>
                <OnboardingSlide
                  title={slide.title}
                  subtitle={slide.subtitle}
                  imagePlaceholder={
                    <Center className="w-full h-full bg-primary-50 rounded-xl">
                      <IconComponent size={80} className="text-primary-500" />
                    </Center>
                  }
                />
              </View>
            );
          })}
        </PagerView>

        {/* Bottom Section */}
        <VStack className="p-8 gap-6">
          {/* Progress Dots */}
          <Center>
            <ProgressDots total={slides.length} current={currentPage} />
          </Center>

          {/* CTA Button */}
          <Button
            action="primary"
            size="lg"
            onPress={handleNext}
          >
            <ButtonText>
              {isLastSlide ? 'Get Started' : 'Next'}
            </ButtonText>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
