/**
 * Glossary Panel Component
 * Slide-in panel with term definitions
 */

import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { GlossaryTerm } from '@/utils/mock-data/lessons';

interface GlossaryPanelProps {
  terms: GlossaryTerm[];
}

export const GlossaryPanel = ({ terms }: GlossaryPanelProps) => {
  if (terms.length === 0) return null;

  return (
    <VStack className="gap-3">
      <Heading size="md" className="text-typography-950">
        Glossary
      </Heading>
      <VStack className="gap-2">
        {terms.map((term, index) => (
          <Card key={index} className="p-4 bg-white">
            <VStack className="gap-2">
              <Text size="sm" className="text-primary-500 font-bold">
                {term.term}
              </Text>
              <Text size="sm" className="text-typography-700">
                {term.definition}
              </Text>
            </VStack>
          </Card>
        ))}
      </VStack>
    </VStack>
  );
};
