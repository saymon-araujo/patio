/**
 * Header Component
 * Reusable header for tab screens with logo, title, and action buttons
 */

import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Image } from "expo-image";
import { router } from "expo-router";
import type { LucideIcon } from "lucide-react-native";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { HeaderAction } from "./header-action";

export interface HeaderActionConfig {
  icon: LucideIcon;
  onPress: () => void;
  showBadge?: boolean;
  badgeCount?: number;
}

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  logoSize?: "sm" | "md" | "lg";
  actions?: HeaderActionConfig[];
  variant?: "default" | "greeting" | "minimal" | "navigation";
  onBack?: () => void;
}

export function Header({
  title,
  subtitle,
  showLogo = true,
  logoSize = "sm",
  actions = [],
  variant = "default",
  onBack,
}: HeaderProps) {
  const logoSizes = {
    sm: 40,
    md: 56,
    lg: 64,
  };

  const size = logoSizes[logoSize];

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  // Navigation variant: Back button + Title
  if (variant === "navigation") {
    return (
      <Box className="bg-white border-b border-outline-800 shadow-md px-4 pt-3 pb-3">
        <HStack className="items-center justify-between">
          {/* Left: Back Button */}
          <Pressable
            onPress={handleBack}
            className="w-10 h-10 items-center justify-center rounded-full active:bg-background-100"
          >
            <ChevronLeft size={24} className="text-typography-700" strokeWidth={2} />
          </Pressable>

          {/* Center/Right: Title */}
          <Heading
            size="sm"
            className="text-typography-950 uppercase tracking-wide font-bold flex-1 text-right"
          >
            {title}
          </Heading>
        </HStack>
      </Box>
    );
  }

  // Default variants: Logo + Title + Actions
  return (
    <Box className="bg-white border-b border-outline-100 px-4 pt-3 pb-3">
      <HStack className="items-center justify-between">
        {/* Left side: Logo + Title */}
        <HStack className="items-center gap-3 flex-1">
          {showLogo && (
            <Image
              source={require("@/assets/images/logo.jpg")}
              style={{ width: size, height: size }}
              cachePolicy="memory-disk"
              contentFit="cover"
            />
          )}

          {variant === "greeting" && subtitle ? (
            <VStack className="gap-0.5 flex-1">
              <Text size="sm" className="text-typography-500">
                {title || "Welcome Back"}
              </Text>
              <Heading size="lg" className="text-typography-950">
                {subtitle}
              </Heading>
            </VStack>
          ) : (
            title && (
              <Heading size="xl" className="text-typography-950 flex-1">
                {title}
              </Heading>
            )
          )}
        </HStack>

        {/* Right side: Action Icons */}
        {actions.length > 0 && (
          <HStack className="gap-1">
            {actions.map((action, index) => (
              <HeaderAction
                key={index}
                icon={action.icon}
                onPress={action.onPress}
                showBadge={action.showBadge}
                badgeCount={action.badgeCount}
              />
            ))}
          </HStack>
        )}
      </HStack>
    </Box>
  );
}
