/**
 * Resource List Component
 * Displays downloadable resources and links
 */

import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Pressable } from 'react-native';
import { Resource } from '@/utils/mock-data/lessons';
import { FileText, Link as LinkIcon, Download, CheckSquare } from 'lucide-react-native';

interface ResourceListProps {
  resources: Resource[];
  onResourcePress?: (resource: Resource) => void;
}

export const ResourceList = ({ resources, onResourcePress }: ResourceListProps) => {
  if (resources.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText size={20} color="#EF4444" />;
      case 'link':
        return <LinkIcon size={20} color="#0066FF" />;
      case 'checklist':
        return <CheckSquare size={20} color="#10B981" />;
      default:
        return <FileText size={20} color="#6B7280" />;
    }
  };

  return (
    <VStack className="gap-2">
      <Text size="sm" className="text-typography-600 font-semibold">
        Resources
      </Text>
      <VStack className="gap-2">
        {resources.map((resource) => (
          <Pressable
            key={resource.id}
            onPress={() => onResourcePress?.(resource)}
          >
            <Card className="p-3 bg-white">
              <HStack className="gap-3 items-center">
                {getIcon(resource.type)}
                <VStack className="flex-1 gap-0">
                  <Text size="sm" className="text-typography-950 font-semibold">
                    {resource.title}
                  </Text>
                  {resource.fileSize && (
                    <Text size="xs" className="text-typography-500">
                      {resource.fileSize}
                    </Text>
                  )}
                </VStack>
                <Download size={18} color="#6B7280" />
              </HStack>
            </Card>
          </Pressable>
        ))}
      </VStack>
    </VStack>
  );
};
