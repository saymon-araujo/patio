/**
 * Ask AI Tab - Placeholder
 * Will be implemented in Plan 4
 */

import React from 'react';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Center } from '@/components/ui/center';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Header } from '@/components/navigation/header';
import { Sparkles, MessageCircle } from 'lucide-react-native';

export default function AskScreen() {
  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-white">
        <Header
          title="Ask AI"
          showLogo={true}
          actions={[
            {
              icon: MessageCircle,
              onPress: () => console.log('Conversations'),
            },
          ]}
        />
      </SafeAreaView>
      <VStack className="flex-1 justify-center items-center p-8 gap-6 bg-white">
        <Center className="w-32 h-32 rounded-full bg-primary-50">
          <Sparkles size={64} className="text-primary-500" />
        </Center>
        <VStack className="gap-2 items-center">
          <Heading size="3xl" className="text-center text-typography-950">
            Ask AI
            <Badge action="info" className="ml-2">
              <BadgeText>BETA</BadgeText>
            </Badge>
          </Heading>
          <Text size="lg" className="text-center text-typography-600">
            Get instant DIY answers from our AI assistant with personalized recommendations
          </Text>
          <Text size="sm" className="text-center text-typography-500 mt-4">
            Coming soon in Plan 4
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
