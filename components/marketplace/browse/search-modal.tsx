/**
 * Search Modal Component
 * Full-screen search with autocomplete for marketplace
 */

import React, { useState, useMemo } from 'react';
import { router } from 'expo-router';
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody } from '@/components/ui/modal';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable';
import { ScrollView } from '@/components/ui/scroll-view';
import { Search, X, Clock } from 'lucide-react-native';
import { MOCK_LISTINGS } from '@/utils/mock-data/listings';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'drill',
  'ladder',
  'saw',
  'pressure washer',
  'miter saw',
  'sander',
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  // Filter listings based on search query
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return MOCK_LISTINGS.filter(
      (listing) =>
        listing.title.toLowerCase().includes(lowerQuery) ||
        listing.description.toLowerCase().includes(lowerQuery) ||
        listing.category.toLowerCase().includes(lowerQuery) ||
        listing.brand?.toLowerCase().includes(lowerQuery) ||
        listing.model?.toLowerCase().includes(lowerQuery)
    ).slice(0, 10); // Limit to 10 results
  }, [query]);

  const handleSelectListing = (listingId: string) => {
    onClose();
    router.push(`/marketplace/listing/${listingId}`);
  };

  const handlePopularSearch = (searchTerm: string) => {
    setQuery(searchTerm);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader className="border-b border-outline-100">
          <HStack className="items-center gap-3 w-full">
            <Box className="flex-1">
              <Input>
                <InputSlot>
                  <InputIcon as={Search} className="ml-3" />
                </InputSlot>
                <InputField
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Search tools..."
                  autoFocus
                />
                {query.length > 0 && (
                  <InputSlot className="pr-3">
                    <Pressable onPress={() => setQuery('')}>
                      <X size={20} className="text-typography-400" />
                    </Pressable>
                  </InputSlot>
                )}
              </Input>
            </Box>
            <Pressable onPress={onClose}>
              <Text className="text-primary-600 font-semibold">Cancel</Text>
            </Pressable>
          </HStack>
        </ModalHeader>

        <ModalBody>
          <ScrollView className="flex-1">
            {query.trim() === '' ? (
              /* Popular Searches */
              <VStack className="gap-4 p-4">
                <Text className="font-semibold text-typography-700">Popular Searches</Text>
                <VStack className="gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <Pressable key={term} onPress={() => handlePopularSearch(term)}>
                      <HStack className="items-center gap-3 p-3 bg-background-50 rounded-lg">
                        <Clock size={18} className="text-typography-400" />
                        <Text className="text-typography-950">{term}</Text>
                      </HStack>
                    </Pressable>
                  ))}
                </VStack>
              </VStack>
            ) : searchResults.length > 0 ? (
              /* Search Results */
              <VStack className="gap-2 p-4">
                <Text size="sm" className="text-typography-500 mb-2">
                  {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                </Text>
                {searchResults.map((listing) => (
                  <Pressable key={listing.id} onPress={() => handleSelectListing(listing.id)}>
                    <Box className="bg-white rounded-lg p-3 border border-outline-200">
                      <HStack className="gap-3 items-center">
                        <Box className="w-16 h-16 bg-background-100 rounded-lg" />
                        <VStack className="flex-1 gap-1">
                          <Text className="font-semibold text-typography-950">
                            {listing.title}
                          </Text>
                          <Text size="sm" className="text-typography-600">
                            {listing.category}
                          </Text>
                          <Text className="font-bold text-primary-600">
                            {listing.type === 'rental'
                              ? `$${listing.dailyRate}/day`
                              : `$${listing.price}`}
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </Pressable>
                ))}
              </VStack>
            ) : (
              /* No Results */
              <Box className="p-12 items-center">
                <Search size={48} className="text-typography-300 mb-4" />
                <Text className="text-typography-500 text-center">
                  No results found for "{query}"
                </Text>
                <Text size="sm" className="text-typography-400 text-center mt-2">
                  Try a different search term
                </Text>
              </Box>
            )}
          </ScrollView>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
