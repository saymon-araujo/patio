/**
 * Password Input Component
 * Input field with show/hide password toggle
 */

import React, { useState } from 'react';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { AlertCircle, Eye, EyeOff } from 'lucide-react-native';
import { Pressable } from 'react-native';
import type { TextInputProps } from 'react-native';

interface PasswordInputProps extends Omit<TextInputProps, 'onChange' | 'secureTextEntry'> {
  label: string;
  error?: string;
  value: string;
  onChangeText: (text: string) => void;
  required?: boolean;
}

export function PasswordInput({
  label,
  error,
  value,
  onChangeText,
  required = false,
  ...inputProps
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

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
          secureTextEntry={!showPassword}
          {...inputProps}
        />
        <InputSlot onPress={() => setShowPassword(!showPassword)} className="pr-3">
          <InputIcon as={showPassword ? EyeOff : Eye} className="text-typography-400" />
        </InputSlot>
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
