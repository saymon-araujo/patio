/**
 * Auth Input Component
 * Reusable form input with label and error states
 */

import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { AlertCircle } from 'lucide-react-native';
import type { TextInputProps } from 'react-native';

interface AuthInputProps extends Omit<TextInputProps, 'onChange'> {
  label: string;
  error?: string;
  value: string;
  onChangeText: (text: string) => void;
  required?: boolean;
}

export function AuthInput({
  label,
  error,
  value,
  onChangeText,
  required = false,
  ...inputProps
}: AuthInputProps) {
  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      <FormControlLabel>
        <FormControlLabelText className="text-typography-700 font-medium">
          {label}
        </FormControlLabelText>
      </FormControlLabel>
      <Input variant="outline" size="lg">
        <InputField
          value={value}
          onChangeText={onChangeText}
          {...inputProps}
        />
      </Input>
      {error && (
        <FormControlError>
          <FormControlErrorIcon as={AlertCircle} />
          <FormControlErrorText>{error}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
}
