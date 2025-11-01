import { useAuth } from "@/contexts/auth-context";
import { getOnboardingStatus } from "@/utils/auth-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

/**
 * Root Index - Handles initial navigation
 * Redirects to appropriate route based on auth state
 */
export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const redirect = async () => {
      // Wait for auth to load
      if (isLoading) return;

      const onboardingCompleted = await getOnboardingStatus();

      // Determine where to redirect
      if (!onboardingCompleted) {
        router.replace("/(auth)/onboarding");
      } else if (!isAuthenticated) {
        router.replace("/(auth)/welcome");
      } else {
        router.replace("/(tabs)/learn");
      }
    };

    redirect();
  }, [isAuthenticated, isLoading]);

  // Show loading indicator while determining route
  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}
    >
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}
