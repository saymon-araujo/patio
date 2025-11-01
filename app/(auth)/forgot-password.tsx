/**
 * Forgot Password Screen
 * Password reset flow
 */

import React, { useState } from 'react';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { AuthInput } from '@/components/auth/auth-input';
import { mockForgotPassword } from '@/utils/mock-data/auth';
import { validateEmail } from '@/utils/validation';
import { router } from 'expo-router';
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleEmailBlur = () => {
    const validation = validateEmail(email);
    setEmailError(validation.isValid ? '' : validation.error || '');
  };

  const handleSendReset = async () => {
    const emailValidation = validateEmail(email);
    setEmailError(emailValidation.isValid ? '' : emailValidation.error || '');

    if (!emailValidation.isValid) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await mockForgotPassword(email);

      if (response.success) {
        setResetSent(true);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (resetSent) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <VStack className="flex-1 justify-between p-8">
          <VStack className="flex-1 justify-center gap-6">
            <VStack className="gap-4">
              <Heading size="3xl" className="text-center text-typography-950">
                Check Your Email
              </Heading>
              <Text className="text-center text-typography-600">
                We've sent a password reset link to:
              </Text>
              <Text className="text-center font-semibold text-typography-900">
                {email}
              </Text>
              <Text className="text-center text-typography-600 mt-4">
                Click the link in the email to reset your password. If you don't see it, check your spam folder.
              </Text>
            </VStack>
          </VStack>

          <VStack className="gap-3">
            <Button
              action="primary"
              size="lg"
              onPress={() => router.back()}
            >
              <ButtonText>Back to Login</ButtonText>
            </Button>

            <Button
              variant="link"
              onPress={() => setResetSent(false)}
            >
              <ButtonText>Resend Email</ButtonText>
            </Button>
          </VStack>
        </VStack>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <VStack className="flex-1 justify-between p-8">
          <VStack className="gap-6">
            {/* Header */}
            <VStack className="gap-2">
              <Heading size="3xl" className="text-typography-950">
                Forgot Password
              </Heading>
              <Text className="text-typography-600">
                Enter your email address and we'll send you a link to reset your password.
              </Text>
            </VStack>

            {/* Form */}
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
          </VStack>

          <VStack className="gap-3">
            <Button
              action="primary"
              size="lg"
              onPress={handleSendReset}
              isDisabled={isLoading}
            >
              <ButtonText>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </ButtonText>
            </Button>

            <Button
              variant="link"
              onPress={() => router.back()}
              isDisabled={isLoading}
            >
              <ButtonText>Back to Login</ButtonText>
            </Button>
          </VStack>
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
