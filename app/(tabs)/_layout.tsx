import { Tabs, usePathname } from "expo-router";
import { BookOpen, ShoppingBag, Sparkles, User, Users } from "lucide-react-native";
import React from "react";
import { Platform } from "react-native";

// Wrapper components to ensure proper rendering
const TabIcon = ({
  IconComponent,
  color,
  focused,
}: {
  IconComponent: any;
  color: string;
  focused: boolean;
}) => <IconComponent color={color} size={22} strokeWidth={focused ? 2.5 : 2} />;

export default function TabLayout() {
  const pathname = usePathname();

  // Hide tab bar on nested routes
  const shouldHideTabBar =
    pathname.includes('/course/') ||
    pathname.includes('/lesson/') ||
    pathname.includes('/quiz/') ||
    pathname.includes('/leaderboard') ||
    pathname.includes('/saved');

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#0066FF", // primary-500
          tabBarInactiveTintColor: "#9CA3AF", // lighter gray for better contrast
          headerShown: false,
          tabBarStyle: shouldHideTabBar ? { display: 'none' } : {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#F3F4F6", // subtle border
            paddingBottom: Platform.OS === "ios" ? 20 : 8, // iOS safe area
            height: Platform.OS === "ios" ? 88 : 65,
            elevation: 8, // Android shadow
            shadowColor: "#000", // iOS shadow
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
            letterSpacing: 0.3,
            marginTop: 4,
            fontFamily: "Inter_600SemiBold",
          },
          tabBarIconStyle: {
            marginTop: 2,
          },
        }}
      >
        <Tabs.Screen
          name="learn"
          options={{
            title: "Learn",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon IconComponent={BookOpen} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="marketplace"
          options={{
            title: "Browse",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon IconComponent={ShoppingBag} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="clubs"
          options={{
            title: "Clubs",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon IconComponent={Users} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="ask"
          options={{
            title: "Ask",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon IconComponent={Sparkles} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="me"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon IconComponent={User} color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
