/**
 * Social Login Button Component
 * Button for Google/Apple authentication
 */

import { Button, ButtonText } from "@/components/ui/button";
import React from "react";
import Svg, { Path } from "react-native-svg";

interface SocialLoginButtonProps {
  provider: "google" | "apple";
  onPress: () => void;
  isLoading?: boolean;
}

// Simple SVG icons as components since we're using lucide which doesn't have brand icons
function GoogleIcon() {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z"
        fill="#4285F4"
      />
      <Path
        d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z"
        fill="#34A853"
      />
      <Path
        d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z"
        fill="#FBBC04"
      />
      <Path
        d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z"
        fill="#EA4335"
      />
    </Svg>
  );
}

function AppleIcon() {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <Path d="M15.526 17.967c-.728.693-1.527.605-2.285.303-.797-.316-1.527-.329-2.364 0-.105 8.421-.592 1.027-1.527.25-.25-.934-.013-1.816.25-2.538.605-.211.987-.434 1.38-1.21.303-1.592.395-3.09.355-4.612-.026-.934-.487-1.71-1.275-2.142-.776-.421-1.566-.447-2.377-.09-.842.368-1.276 1.11-1.29 2.012-.013.868.291 1.631.921 2.195.316.276.658.513 1.04.658.25.092.513.158.776.184.921.092 1.764-.184 2.511-.79.355-.29.645-.645.868-1.053.395-.71.473-1.461.29-2.25-.211-.882-.75-1.5-1.567-1.842-.658-.276-1.342-.316-2.039-.145-1.276.316-2.206 1.118-2.75 2.285-.487 1.053-.592 2.18-.395 3.342.25 1.461.895 2.671 2.012 3.605.75.618 1.606.987 2.552 1.132.987.158 1.921.026 2.776-.487.526-.316 1-.711 1.408-1.184.25-.276.461-.592.632-.934.25-.5.395-1.027.487-1.58.145-.868.118-1.724-.053-2.577-.21-1.066-.697-1.974-1.474-2.671-.25-.224-.526-.421-.828-.592-.658-.382-1.382-.566-2.142-.566-.053 0-.105 0-.158.013h-.053c.026-.276.092-.539.21-.79.25-.5.658-.842 1.184-1.04.316-.118.645-.184.987-.197.987-.04 1.895.21 2.724.75 1.21.79 1.987 1.895 2.364 3.29.25.934.29 1.882.145 2.842-.197 1.315-.71 2.472-1.58 3.447z" />
    </Svg>
  );
}

export function SocialLoginButton({
  provider,
  onPress,
  isLoading = false,
}: SocialLoginButtonProps) {
  const config = {
    google: {
      label: "Continue with Google",
      bgColor: "bg-white",
      textColor: "text-typography-700",
      borderColor: "border-outline-200",
    },
    apple: {
      label: "Continue with Apple",
      bgColor: "bg-typography-950",
      textColor: "text-white",
      borderColor: "border-typography-950",
    },
  };

  const { label, bgColor, textColor, borderColor } = config[provider];

  return (
    <Button
      onPress={onPress}
      isDisabled={isLoading}
      variant="outline"
      size="lg"
      className={`${bgColor} ${borderColor}`}
    >
      {provider === "google" ? <GoogleIcon /> : <AppleIcon />}
      <ButtonText className={`${textColor} ml-2`}>{label}</ButtonText>
    </Button>
  );
}
