/**
 * Create FAB Component
 * Floating Action Button with action menu for creating content
 */

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "@/components/ui/actionsheet";
import { Fab as FAB, FabIcon as FABIcon } from "@/components/ui/fab";
import { router } from "expo-router";
import {
  BookOpen,
  Calendar,
  HelpCircle,
  MessageSquare,
  Plus,
  ShoppingBag,
} from "lucide-react-native";
import React, { useState } from "react";

export function CreateFAB() {
  const [showActionsheet, setShowActionsheet] = useState(false);

  const handleClose = () => setShowActionsheet(false);

  const createActions = [
    {
      id: "listing",
      label: "List a Tool",
      icon: ShoppingBag,
      description: "Rent or sell your tools",
      onPress: () => {
        handleClose();
        // Navigate to create listing (will be implemented in Plan 2)
        // router.push('/(tabs)/marketplace/create');
      },
    },
    {
      id: "event",
      label: "Create Event",
      icon: Calendar,
      description: "Organize a DIY event",
      onPress: () => {
        handleClose();
        // Navigate to create event (will be implemented in Plan 3)
        // router.push('/(tabs)/clubs/create-event');
      },
    },
    {
      id: "post",
      label: "Make a Post",
      icon: MessageSquare,
      description: "Share with your club",
      onPress: () => {
        handleClose();
        // Navigate to create post (will be implemented in Plan 3)
        // router.push('/(tabs)/clubs/create-post');
      },
    },
    {
      id: "guide",
      label: "Write a Guide",
      icon: BookOpen,
      description: "Share your DIY knowledge",
      onPress: () => {
        handleClose();
        // Navigate to create guide (will be implemented in Plan 3)
        // router.push('/(tabs)/clubs/create-guide');
      },
    },
    {
      id: "question",
      label: "Ask a Question",
      icon: HelpCircle,
      description: "Get help from AI or community",
      onPress: () => {
        handleClose();
        // Navigate to Ask tab
        router.push("/(tabs)/ask");
      },
    },
  ];

  return (
    <>
      {/* FAB Button */}
      <FAB size="lg" placement="bottom right" onPress={() => setShowActionsheet(true)}>
        <FABIcon as={Plus} className="text-white" />
      </FAB>

      {/* Action Menu */}
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="pb-6">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          {createActions.map((action) => {
            const Icon = action.icon;
            return (
              <ActionsheetItem key={action.id} onPress={action.onPress}>
                <Icon size={24} className="text-typography-700 mr-3" />
                <ActionsheetItemText className="flex-1">{action.label}</ActionsheetItemText>
              </ActionsheetItem>
            );
          })}
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
}
