/**
 * Image Uploader Component
 * Photo upload with camera or gallery picker
 */

import React, { useState } from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Pressable } from '@/components/ui/pressable';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Camera, ImageIcon, X } from 'lucide-react-native';

interface ImageUploaderProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
  required?: boolean;
}

export function ImageUploader({
  photos,
  onPhotosChange,
  maxPhotos = 8,
  required = false,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const pickFromGallery = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        alert('Permission to access gallery is required!');
        return;
      }

      setIsUploading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        quality: 0.8,
        allowsEditing: false,
      });

      if (!result.canceled && result.assets) {
        const newPhotos = result.assets.map((asset) => asset.uri);
        const combined = [...photos, ...newPhotos].slice(0, maxPhotos);
        onPhotosChange(combined);
      }
    } catch (error) {
      console.error('Error picking images:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const takePhoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        alert('Permission to use camera is required!');
        return;
      }

      setIsUploading(true);
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsEditing: true,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const newPhoto = result.assets[0].uri;
        onPhotosChange([...photos, newPhoto]);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const removePhoto = (index: number) => {
    onPhotosChange(photos.filter((_, i) => i !== index));
  };

  const canAddMore = photos.length < maxPhotos;

  return (
    <VStack className="gap-4">
      {/* Photos Grid */}
      {photos.length > 0 && (
        <VStack className="gap-2">
          <HStack className="flex-wrap gap-2">
            {photos.map((photo, index) => (
              <Box key={index} className="relative">
                <Box className="w-24 h-24 rounded-lg overflow-hidden border border-outline-200">
                  <Image
                    source={{ uri: photo }}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                  />
                </Box>

                {/* Remove Button */}
                <Pressable
                  onPress={() => removePhoto(index)}
                  className="absolute -top-2 -right-2"
                >
                  <Box className="w-6 h-6 bg-error-500 rounded-full items-center justify-center border-2 border-white">
                    <X size={14} color="#FFFFFF" />
                  </Box>
                </Pressable>

                {/* Primary Badge */}
                {index === 0 && (
                  <Box className="absolute bottom-1 left-1 px-2 py-0.5 bg-primary-500 rounded">
                    <Text size="xs" className="text-white font-semibold">
                      Primary
                    </Text>
                  </Box>
                )}
              </Box>
            ))}
          </HStack>
          <Text size="sm" className="text-typography-500">
            {photos.length} / {maxPhotos} photos {photos.length === 0 && required && '(required)'}
          </Text>
        </VStack>
      )}

      {/* Upload Buttons */}
      {canAddMore && (
        <HStack className="gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onPress={takePhoto}
            isDisabled={isUploading}
          >
            <Camera size={18} className="text-primary-600 mr-2" />
            <ButtonText>Camera</ButtonText>
          </Button>

          <Button
            variant="outline"
            className="flex-1"
            onPress={pickFromGallery}
            isDisabled={isUploading}
          >
            <ImageIcon size={18} className="text-primary-600 mr-2" />
            <ButtonText>Gallery</ButtonText>
          </Button>
        </HStack>
      )}

      {photos.length === 0 && (
        <Box className="border-2 border-dashed border-outline-300 rounded-lg p-8 items-center">
          <ImageIcon size={48} className="text-typography-300 mb-3" />
          <Text className="text-typography-600 text-center font-semibold">
            Add photos of your tool
          </Text>
          <Text size="sm" className="text-typography-500 text-center mt-1">
            First photo will be the primary image
          </Text>
        </Box>
      )}
    </VStack>
  );
}
