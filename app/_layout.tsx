import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { LocationProvider } from "@/contexts/location-context";
import { LearnProvider } from "@/contexts/learn-context";
import { GamificationProvider } from "@/contexts/gamification-context";
import { MarketplaceProvider } from "@/contexts/marketplace-context";
import { BookingProvider } from "@/contexts/booking-context";
import "@/global.css";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide splash screen once fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <ThemeProvider value={DefaultTheme}>
        <AuthProvider>
          <LocationProvider>
            <LearnProvider>
              <GamificationProvider>
                <MarketplaceProvider>
                  <BookingProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="index" />
                      <Stack.Screen name="(auth)" />
                      <Stack.Screen name="(tabs)" />
                      <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
                    </Stack>
                    <StatusBar style="dark" />
                  </BookingProvider>
                </MarketplaceProvider>
              </GamificationProvider>
            </LearnProvider>
          </LocationProvider>
        </AuthProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
