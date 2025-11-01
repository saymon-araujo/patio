/**
 * Signup Screen
 * User registration with form validation
 */

import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { ScrollView } from '@/components/ui/scroll-view';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from '@/components/ui/checkbox';
import { AuthInput } from '@/components/auth/auth-input';
import { PasswordInput } from '@/components/auth/password-input';
import { useAuth } from '@/contexts/auth-context';
import { validateEmail, validateName, validatePassword, validatePasswordsMatch } from '@/utils/validation';
import { router } from 'expo-router';
import { Check } from 'lucide-react-native';

export default function SignupScreen() {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Error states
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleNameBlur = () => {
    const validation = validateName(name);
    setNameError(validation.isValid ? '' : validation.error || '');
  };

  const handleEmailBlur = () => {
    const validation = validateEmail(email);
    setEmailError(validation.isValid ? '' : validation.error || '');
  };

  const handlePasswordBlur = () => {
    const validation = validatePassword(password);
    setPasswordError(validation.isValid ? '' : validation.error || '');
  };

  const handleConfirmPasswordBlur = () => {
    const validation = validatePasswordsMatch(password, confirmPassword);
    setConfirmPasswordError(validation.isValid ? '' : validation.error || '');
  };

  const handleSignup = async () => {
    // Validate all fields
    const nameValidation = validateName(name);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validatePasswordsMatch(password, confirmPassword);

    setNameError(nameValidation.isValid ? '' : nameValidation.error || '');
    setEmailError(emailValidation.isValid ? '' : emailValidation.error || '');
    setPasswordError(passwordValidation.isValid ? '' : passwordValidation.error || '');
    setConfirmPasswordError(confirmPasswordValidation.isValid ? '' : confirmPasswordValidation.error || '');

    if (
      !nameValidation.isValid ||
      !emailValidation.isValid ||
      !passwordValidation.isValid ||
      !confirmPasswordValidation.isValid
    ) {
      return;
    }

    if (!termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }

    try {
      setIsLoading(true);
      const response = await signup(name, email, password);

      if (response.success) {
        // Navigate to location permission screen
        router.push('/(auth)/signup-location');
      } else {
        alert(response.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          <VStack className="p-8 gap-6">
            {/* Header */}
            <VStack className="gap-2">
              <Heading size="3xl" className="text-typography-950">
                Create Account
              </Heading>
              <Text className="text-typography-600">
                Join the Patio community and start your DIY journey
              </Text>
            </VStack>

            {/* Form */}
            <VStack className="gap-4">
              <AuthInput
                label="Full Name"
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                onBlur={handleNameBlur}
                error={nameError}
                required
              />

              <AuthInput
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                onBlur={handleEmailBlur}
                error={emailError}
                keyboardType="email-address"
                autoCapitalize="none"
                required
              />

              <PasswordInput
                label="Password"
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                onBlur={handlePasswordBlur}
                error={passwordError}
                required
              />

              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onBlur={handleConfirmPasswordBlur}
                error={confirmPasswordError}
                required
              />

              {/* Terms and Conditions */}
              <Checkbox
                value="terms"
                isChecked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="mt-2"
              >
                <CheckboxIndicator>
                  <CheckboxIcon as={Check} />
                </CheckboxIndicator>
                <CheckboxLabel className="text-typography-700">
                  I accept the Terms of Service and Privacy Policy
                </CheckboxLabel>
              </Checkbox>
            </VStack>

            {/* Submit Button */}
            <Button
              action="primary"
              size="lg"
              onPress={handleSignup}
              isDisabled={isLoading}
              className="mt-2"
            >
              <ButtonText>{isLoading ? 'Creating Account...' : 'Create Account'}</ButtonText>
            </Button>

            {/* Login Link */}
            <Text className="text-center text-typography-600">
              Already have an account?{' '}
              <Text
                className="text-primary-500 font-medium"
                onPress={() => router.push('/(auth)/login')}
              >
                Log In
              </Text>
            </Text>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
