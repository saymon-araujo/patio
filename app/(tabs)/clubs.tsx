/**
 * Clubs Tab - Placeholder
 * Will be implemented in Plan 3
 */

import { Header } from "@/components/navigation/header";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { MapPin, Search, Users } from "lucide-react-native";
import React from "react";

export default function ClubsScreen() {
  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-white">
        <Header
          title="Clubs"
          showLogo={true}
          actions={[
            {
              icon: Search,
              onPress: () => console.log("Search clubs"),
            },
            {
              icon: MapPin,
              onPress: () => console.log("Map view"),
            },
          ]}
        />
      </SafeAreaView>
      <VStack className="flex-1 justify-center items-center p-8 gap-6 bg-white">
        <Center className="w-32 h-32 rounded-full bg-primary-50">
          <Users size={64} className="text-primary-500" />
        </Center>
        <VStack className="gap-2 items-center">
          <Heading size="3xl" className="text-center text-typography-950">
            Clubs
          </Heading>
          <Text size="lg" className="text-center text-typography-600">
            Connect with local DIY clubs, share inventory, and collaborate on projects
          </Text>
          <Text size="sm" className="text-center text-typography-500 mt-4">
            Coming soon in Plan 3
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
