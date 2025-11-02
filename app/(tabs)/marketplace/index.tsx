/**
 * Marketplace Browse Screen
 * Main marketplace screen with 4 tabs: Nearby (Map), Trending, Categories, For You
 */

import { Header } from "@/components/navigation/header";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useLocation } from "@/contexts/location-context";
import { useMarketplace } from "@/contexts/marketplace-context";
import { filterByRadius } from "@/utils/distance-calculator";
import {
  CATEGORIES,
  MOCK_LISTINGS,
  getNewListings,
  getTrendingListings,
} from "@/utils/mock-data/listings";
import { router } from "expo-router";
import { Filter, Map as MapIcon, Plus, Search } from "lucide-react-native";
import React, { useState } from "react";
import { FilterModal } from "@/components/marketplace/browse/filter-modal";
import { SearchModal } from "@/components/marketplace/browse/search-modal";
import { ListingCard } from "@/components/marketplace/listing/listing-card";

type TabType = "nearby" | "trending" | "categories" | "for-you";

export default function MarketplaceBrowseScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("nearby");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const { filters, updateFilters } = useMarketplace();
  const { userLocation } = useLocation();

  const handleSearch = () => {
    setShowSearchModal(true);
  };

  const handleFilter = () => {
    setShowFilterModal(true);
  };

  const handleCreateListing = () => {
    router.push("/marketplace/create");
  };

  // Get listings based on active tab
  const getDisplayedListings = () => {
    switch (activeTab) {
      case "nearby":
        if (userLocation) {
          return filterByRadius(MOCK_LISTINGS, userLocation, filters.distance);
        }
        return MOCK_LISTINGS.slice(0, 10);

      case "trending":
        return getTrendingListings();

      case "categories":
        return []; // Categories view doesn't show listings directly

      case "for-you":
        // Personalized recommendations (mock)
        return getNewListings();

      default:
        return MOCK_LISTINGS;
    }
  };

  const displayedListings = getDisplayedListings();

  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={["top"]} className="bg-white">
        <Header
          title="Marketplace"
          showLogo={true}
          actions={[
            {
              icon: Search,
              onPress: handleSearch,
            },
            {
              icon: Filter,
              onPress: handleFilter,
            },
          ]}
        />
      </SafeAreaView>

      {/* Tab Navigation */}
      <HStack className="px-4 py-3 bg-white border-b border-outline-100 gap-2">
        <Pressable onPress={() => setActiveTab("nearby")} style={{ flex: 1 }}>
          <Box
            className={`px-3 py-2 rounded-lg ${
              activeTab === "nearby" ? "bg-primary-500" : "bg-background-50"
            }`}
          >
            <Text
              size="sm"
              className={`text-center font-semibold ${
                activeTab === "nearby" ? "text-white" : "text-typography-600"
              }`}
            >
              Nearby
            </Text>
          </Box>
        </Pressable>

        <Pressable onPress={() => setActiveTab("trending")} style={{ flex: 1 }}>
          <Box
            className={`px-3 py-2 rounded-lg ${
              activeTab === "trending" ? "bg-primary-500" : "bg-background-50"
            }`}
          >
            <Text
              size="sm"
              className={`text-center font-semibold ${
                activeTab === "trending" ? "text-white" : "text-typography-600"
              }`}
            >
              Trending
            </Text>
          </Box>
        </Pressable>

        <Pressable onPress={() => setActiveTab("categories")} style={{ flex: 1 }}>
          <Box
            className={`px-3 py-2 rounded-lg ${
              activeTab === "categories" ? "bg-primary-500" : "bg-background-50"
            }`}
          >
            <Text
              size="sm"
              className={`text-center font-semibold ${
                activeTab === "categories" ? "text-white" : "text-typography-600"
              }`}
            >
              Categories
            </Text>
          </Box>
        </Pressable>

        <Pressable onPress={() => setActiveTab("for-you")} style={{ flex: 1 }}>
          <Box
            className={`px-3 py-2 rounded-lg ${
              activeTab === "for-you" ? "bg-primary-500" : "bg-background-50"
            }`}
          >
            <Text
              size="sm"
              className={`text-center font-semibold ${
                activeTab === "for-you" ? "text-white" : "text-typography-600"
              }`}
            >
              For You
            </Text>
          </Box>
        </Pressable>
      </HStack>

      <ScrollView className="flex-1 bg-background-50">
        <VStack className="pb-20">
          {/* Nearby Tab - Map View Teaser */}
          {activeTab === "nearby" && (
            <VStack className="gap-4">
              {/* Map Teaser */}
              <Pressable onPress={() => router.push("/marketplace/map")}>
                <Box className="mx-4 mt-4 bg-primary-50 rounded-lg p-6 border border-primary-200">
                  <HStack className="items-center justify-between">
                    <VStack className="flex-1 gap-1">
                      <Heading size="md" className="text-typography-950">
                        View on Map
                      </Heading>
                      <Text size="sm" className="text-typography-600">
                        {displayedListings.length} tools nearby
                      </Text>
                    </VStack>
                    <MapIcon size={32} className="text-primary-500" />
                  </HStack>
                </Box>
              </Pressable>

              {/* Nearby Listings */}
              <VStack className="px-4 gap-3">
                <Heading size="lg" className="text-typography-950">
                  Tools Near You
                </Heading>
                {displayedListings.length === 0 ? (
                  <Box className="p-8 items-center">
                    <Text className="text-typography-500 text-center">
                      No tools found in your area. Try expanding your search radius.
                    </Text>
                  </Box>
                ) : (
                  displayedListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))
                )}
              </VStack>
            </VStack>
          )}

          {/* Trending Tab */}
          {activeTab === "trending" && (
            <VStack className="px-4 gap-3 mt-4">
              <Heading size="lg" className="text-typography-950">
                Trending This Week
              </Heading>
              {displayedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </VStack>
          )}

          {/* Categories Tab */}
          {activeTab === "categories" && (
            <VStack className="px-4 gap-3 mt-4">
              <Heading size="lg" className="text-typography-950">
                Browse by Category
              </Heading>
              <VStack className="gap-2">
                {CATEGORIES.map((category) => (
                  <Pressable key={category} onPress={() => console.log("Category:", category)}>
                    <Box className="bg-white rounded-lg p-4 border border-outline-200">
                      <HStack className="items-center justify-between">
                        <Text className="font-semibold text-typography-950">{category}</Text>
                        <Text size="sm" className="text-typography-500">
                          {MOCK_LISTINGS.filter((l) => l.category === category).length} items
                        </Text>
                      </HStack>
                    </Box>
                  </Pressable>
                ))}
              </VStack>
            </VStack>
          )}

          {/* For You Tab */}
          {activeTab === "for-you" && (
            <VStack className="px-4 gap-3 mt-4">
              <Heading size="lg" className="text-typography-950">
                Recommended for You
              </Heading>
              <Text size="sm" className="text-typography-600 mb-2">
                Based on your learning progress and interests
              </Text>
              {displayedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </VStack>
          )}
        </VStack>
      </ScrollView>

      {/* FAB - Create Listing */}
      <Box className="absolute bottom-6 right-6">
        <Pressable onPress={handleCreateListing}>
          <Box className="w-14 h-14 bg-primary-500 rounded-full items-center justify-center shadow-lg">
            <Plus size={28} color="#FFFFFF" strokeWidth={2.5} />
          </Box>
        </Pressable>
      </Box>

      {/* Modals */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        onApply={updateFilters}
      />

      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />
    </Box>
  );
}
