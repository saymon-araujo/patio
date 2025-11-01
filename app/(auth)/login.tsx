/**
 * Login Screen
 * User authentication with email/password and social login
 */

import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { ScrollView } from '@/components/ui/scroll-view';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from '@/components/ui/checkbox';
import { Divider } from '@/components/ui/divider';
import { AuthInput } from '@/components/auth/auth-input';
import { PasswordInput } from '@/components/auth/password-input';
import { SocialLoginButton } from '@/components/auth/social-login-button';
import { useAuth } from '@/contexts/auth-context';
import { validateEmail } from '@/utils/validation';
import { router } from 'expo-router';
import { Check } from 'lucide-react-native';

export default function LoginScreen() {
  const { login, socialLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailBlur = () => {
    const validation = validateEmail(email);
    setEmailError(validation.isValid ? '' : validation.error || '');
  };

  const handleLogin = async () => {
    // Basic validation
    const emailValidation = validateEmail(email);
    setEmailError(emailValidation.isValid ? '' : emailValidation.error || '');

    if (!password) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }

    if (!emailValidation.isValid || !password) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await login(email, password);

      if (response.success) {
        // Navigate to main app
        router.replace('/(tabs)/learn');
      } else {
        alert(response.error || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      setIsLoading(true);
      const response = await socialLogin(provider);

      if (response.success) {
        // Check if user needs to complete onboarding (role selection)
        if (response.user && response.user.roles.length === 0) {
          router.push('/(auth)/signup-role');
        } else {
          router.replace('/(tabs)/learn');
        }
      } else {
        alert(response.error || 'Social login failed. Please try again.');
      }
    } catch (error) {
      console.error('Social login error:', error);
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
                Welcome Back
              </Heading>
              <Text className="text-typography-600">
                Log in to continue your DIY journey
              </Text>
            </VStack>

            {/* Form */}
            <VStack className="gap-4">
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
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                onBlur={() => password && setPasswordError('')}
                error={passwordError}
                required
              />

              {/* Remember Me & Forgot Password */}
              <HStack className="justify-between items-center">
                <Checkbox
                  value="remember"
                  isChecked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={Check} />
                  </CheckboxIndicator>
                  <CheckboxLabel>Remember me</CheckboxLabel>
                </Checkbox>

                <Text
                  className="text-primary-500 font-medium"
                  onPress={() => router.push('/(auth)/forgot-password')}
                >
                  Forgot password?
                </Text>
              </HStack>
            </VStack>

            {/* Login Button */}
            <Button
              action="primary"
              size="lg"
              onPress={handleLogin}
              isDisabled={isLoading}
            >
              <ButtonText>{isLoading ? 'Logging in...' : 'Log In'}</ButtonText>
            </Button>

            {/* Divider */}
            <HStack className="items-center gap-4">
              <Divider className="flex-1 bg-outline-200" />
              <Text className="text-typography-500">or</Text>
              <Divider className="flex-1 bg-outline-200" />
            </HStack>

            {/* Social Login */}
            <VStack className="gap-3">
              <SocialLoginButton
                provider="google"
                onPress={() => handleSocialLogin('google')}
                isLoading={isLoading}
              />
              <SocialLoginButton
                provider="apple"
                onPress={() => handleSocialLogin('apple')}
                isLoading={isLoading}
              />
            </VStack>

            {/* Signup Link */}
            <Text className="text-center text-typography-600">
              Don't have an account?{' '}
              <Text
                className="text-primary-500 font-medium"
                onPress={() => router.push('/(auth)/signup')}
              >
                Sign Up
              </Text>
            </Text>

            {/* Demo Credentials */}
            <VStack className="mt-4 p-4 bg-background-50 rounded-lg gap-1">
              <Text className="text-xs font-semibold text-typography-700">Demo Credentials:</Text>
              <Text className="text-xs text-typography-600">Email: demo@patio.so</Text>
              <Text className="text-xs text-typography-600">Password: password</Text>
            </VStack>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
