import { Header } from "@/components/navigation/header";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from "@/components/ui/checkbox";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from "@/components/ui/radio";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { AlertTriangle, Bell, Check, CircleAlert, Info, Settings } from "lucide-react-native";
import React, { useState } from "react";

export default function HomeScreen() {
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-white">
        <Header
          showLogo={true}
          actions={[
            {
              icon: Bell,
              onPress: () => console.log("Notifications"),
              showBadge: true,
            },
            {
              icon: Settings,
              onPress: () => console.log("Settings"),
            },
          ]}
        />
      </SafeAreaView>
      <ScrollView className="flex-1 bg-background-50">
        <VStack className="p-6 gap-6">
          {/* Header */}
          <VStack className="gap-2">
            <Heading size="4xl" className="text-typography-950">
              Patio Design System
            </Heading>
            <Text size="lg" className="text-typography-500">
              Gluestack UI Components • Clean & Modern
            </Text>
          </VStack>

          <Divider className="bg-outline-200" />

          {/* Typography Section */}
          <VStack className="gap-4">
            <Heading size="2xl" className="text-typography-950">
              Typography
            </Heading>
            <Card>
              <VStack className="gap-3">
                <Heading size="5xl" className="text-typography-950">
                  Heading 5XL
                </Heading>
                <Heading size="4xl" className="text-typography-950">
                  Heading 4XL
                </Heading>
                <Heading size="3xl" className="text-typography-950">
                  Heading 3XL
                </Heading>
                <Heading size="2xl" className="text-typography-950">
                  Heading 2XL
                </Heading>
                <Heading size="xl" className="text-typography-900">
                  Heading XL
                </Heading>
                <Heading size="lg" className="text-typography-900">
                  Heading LG
                </Heading>
                <Divider className="my-2 bg-outline-200" />
                <Text size="2xl" className="text-typography-900">
                  Text 2XL - Regular body text
                </Text>
                <Text size="xl" className="text-typography-700">
                  Text XL - Regular body text
                </Text>
                <Text size="lg" className="text-typography-700">
                  Text LG - Regular body text
                </Text>
                <Text size="md" className="text-typography-600">
                  Text MD - Regular body text
                </Text>
                <Text size="sm" className="text-typography-500">
                  Text SM - Regular body text
                </Text>
                <Text size="xs" className="text-typography-500">
                  Text XS - Regular body text
                </Text>
                <Divider className="my-2 bg-outline-200" />
                <Text className="font-bold text-typography-900">Bold Text</Text>
                <Text className="italic text-typography-700">Italic Text</Text>
                <Text className="underline text-primary-500">Underlined Text</Text>
                <Text className="line-through text-typography-400">Strikethrough Text</Text>
              </VStack>
            </Card>
          </VStack>

          {/* Buttons Section */}
          <VStack className="gap-4">
            <Heading size="2xl" className="text-typography-950">
              Buttons
            </Heading>
            <Card>
              <VStack className="gap-3">
                <Button action="primary">
                  <ButtonText>Primary Button (Blue)</ButtonText>
                </Button>
                <Button action="secondary">
                  <ButtonText>Secondary Button (Black)</ButtonText>
                </Button>
                <Button action="positive">
                  <ButtonText>Success Button</ButtonText>
                </Button>
                <Button action="negative">
                  <ButtonText>Error Button</ButtonText>
                </Button>
                <Divider className="my-1 bg-outline-200" />
                <Text className="font-semibold text-typography-700">Button Sizes</Text>
                <HStack className="gap-3">
                  <Button size="xs" className="flex-1" action="primary">
                    <ButtonText>XS</ButtonText>
                  </Button>
                  <Button size="sm" className="flex-1" action="primary">
                    <ButtonText>SM</ButtonText>
                  </Button>
                  <Button size="md" className="flex-1" action="primary">
                    <ButtonText>MD</ButtonText>
                  </Button>
                  <Button size="lg" className="flex-1" action="primary">
                    <ButtonText>LG</ButtonText>
                  </Button>
                </HStack>
                <Divider className="my-1 bg-outline-200" />
                <Text className="font-semibold text-typography-700">Button Variants</Text>
                <Button variant="outline" action="primary">
                  <ButtonText>Outline Button</ButtonText>
                </Button>
                <Button variant="link" action="primary">
                  <ButtonText>Link Button</ButtonText>
                </Button>
                <Button isDisabled action="primary">
                  <ButtonText>Disabled Button</ButtonText>
                </Button>
              </VStack>
            </Card>
          </VStack>

          {/* Form Inputs Section */}
          <VStack className="gap-4">
            <Heading size="2xl" className="text-typography-950">
              Form Inputs
            </Heading>
            <Card>
              <VStack className="gap-4">
                <VStack className="gap-2">
                  <Text className="font-semibold text-typography-700">Input Field</Text>
                  <Input>
                    <InputField placeholder="Enter your name..." />
                  </Input>
                </VStack>
                <VStack className="gap-2">
                  <Text className="font-semibold text-typography-700">Input Disabled</Text>
                  <Input isDisabled>
                    <InputField placeholder="Disabled input" />
                  </Input>
                </VStack>
                <VStack className="gap-2">
                  <Text className="font-semibold text-typography-700">Textarea</Text>
                  <Textarea>
                    <TextareaInput placeholder="Enter your message..." />
                  </Textarea>
                </VStack>
              </VStack>
            </Card>
          </VStack>

          {/* Selection Controls Section */}
          <VStack className="gap-4">
            <Heading size="2xl" className="text-typography-900">
              Selection Controls
            </Heading>
            <Card className="p-4">
              <VStack className="gap-4">
                <HStack className="gap-3 items-center">
                  <Switch value={switchValue} onToggle={() => setSwitchValue(!switchValue)} />
                  <Text>Switch: {switchValue ? "ON" : "OFF"}</Text>
                </HStack>

                <Checkbox
                  value={checkboxValue.toString()}
                  isChecked={checkboxValue}
                  onChange={() => setCheckboxValue(!checkboxValue)}
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={Check} />
                  </CheckboxIndicator>
                  <CheckboxLabel>Accept terms and conditions</CheckboxLabel>
                </Checkbox>

                <VStack className="gap-2">
                  <Text className="font-semibold">Radio Group</Text>
                  <RadioGroup value={radioValue} onChange={setRadioValue}>
                    <VStack className="gap-2">
                      <Radio value="option1">
                        <RadioIndicator>
                          <RadioIcon as={CircleAlert} />
                        </RadioIndicator>
                        <RadioLabel>Option 1</RadioLabel>
                      </Radio>
                      <Radio value="option2">
                        <RadioIndicator>
                          <RadioIcon as={CircleAlert} />
                        </RadioIndicator>
                        <RadioLabel>Option 2</RadioLabel>
                      </Radio>
                      <Radio value="option3">
                        <RadioIndicator>
                          <RadioIcon as={CircleAlert} />
                        </RadioIndicator>
                        <RadioLabel>Option 3</RadioLabel>
                      </Radio>
                    </VStack>
                  </RadioGroup>
                </VStack>

                <VStack className="gap-2">
                  <Text className="font-semibold">Slider: {sliderValue}</Text>
                  <Slider value={sliderValue} onChange={setSliderValue} minValue={0} maxValue={100}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </VStack>
              </VStack>
            </Card>
          </VStack>

          {/* Badges & Avatars Section */}
          <VStack className="gap-4">
            <Heading size="2xl" className="text-typography-900">
              Badges & Avatars
            </Heading>
            <Card className="p-4">
              <VStack className="gap-4">
                <VStack className="gap-2">
                  <Text className="font-semibold">Badges</Text>
                  <HStack className="gap-2 flex-wrap">
                    <Badge action="success">
                      <BadgeText>Success</BadgeText>
                    </Badge>
                    <Badge action="error">
                      <BadgeText>Error</BadgeText>
                    </Badge>
                    <Badge action="warning">
                      <BadgeText>Warning</BadgeText>
                    </Badge>
                    <Badge action="info">
                      <BadgeText>Info</BadgeText>
                    </Badge>
                    <Badge action="muted">
                      <BadgeText>Muted</BadgeText>
                    </Badge>
                  </HStack>
                </VStack>

                <VStack className="gap-2">
                  <Text className="font-semibold">Avatars</Text>
                  <HStack className="gap-3">
                    <Avatar size="xs">
                      <AvatarFallbackText>XS</AvatarFallbackText>
                    </Avatar>
                    <Avatar size="sm">
                      <AvatarFallbackText>SM</AvatarFallbackText>
                    </Avatar>
                    <Avatar size="md">
                      <AvatarFallbackText>MD</AvatarFallbackText>
                    </Avatar>
                    <Avatar size="lg">
                      <AvatarFallbackText>LG</AvatarFallbackText>
                    </Avatar>
                    <Avatar size="xl">
                      <AvatarFallbackText>XL</AvatarFallbackText>
                    </Avatar>
                  </HStack>
                </VStack>
              </VStack>
            </Card>
          </VStack>

          {/* Feedback Section */}
          <VStack className="gap-4">
            <Heading size="2xl" className="text-typography-900">
              Feedback Components
            </Heading>
            <Card className="p-4">
              <VStack className="gap-4">
                <VStack className="gap-2">
                  <Text className="font-semibold">Progress Bar</Text>
                  <Progress value={65} size="md">
                    <ProgressFilledTrack />
                  </Progress>
                  <Progress value={35} size="sm">
                    <ProgressFilledTrack />
                  </Progress>
                </VStack>

                <VStack className="gap-2">
                  <Text className="font-semibold">Spinners</Text>
                  <HStack className="gap-4">
                    <Spinner size="small" />
                    <Spinner size="large" />
                  </HStack>
                </VStack>

                <VStack className="gap-2">
                  <Text className="font-semibold">Alerts</Text>
                  <Alert action="success">
                    <AlertIcon as={Info} />
                    <AlertText>Success! Your action was completed.</AlertText>
                  </Alert>
                  <Alert action="error">
                    <AlertIcon as={CircleAlert} />
                    <AlertText>Error! Something went wrong.</AlertText>
                  </Alert>
                  <Alert action="warning">
                    <AlertIcon as={AlertTriangle} />
                    <AlertText>Warning! Please check your input.</AlertText>
                  </Alert>
                  <Alert action="info">
                    <AlertIcon as={Info} />
                    <AlertText>Info: Here&apos;s some helpful information.</AlertText>
                  </Alert>
                </VStack>
              </VStack>
            </Card>
          </VStack>

          {/* Layout Section */}
          <VStack className="gap-4">
            <Heading size="2xl" className="text-typography-950">
              Layout Components
            </Heading>
            <Card>
              <VStack className="gap-4">
                <VStack className="gap-2">
                  <Text className="font-semibold text-typography-700">Box with HStack</Text>
                  <Box className="bg-background-100 p-4 rounded-lg">
                    <HStack className="gap-3">
                      <Box className="bg-primary-500 p-4 rounded-lg flex-1">
                        <Text className="text-center text-white font-semibold">Primary</Text>
                      </Box>
                      <Box className="bg-typography-950 p-4 rounded-lg flex-1">
                        <Text className="text-center text-white font-semibold">Black</Text>
                      </Box>
                      <Box className="bg-success-500 p-4 rounded-lg flex-1">
                        <Text className="text-center text-white font-semibold">Success</Text>
                      </Box>
                    </HStack>
                  </Box>
                </VStack>

                <VStack className="gap-2">
                  <Text className="font-semibold text-typography-700">Nested Cards</Text>
                  <Card variant="filled">
                    <VStack className="gap-3">
                      <Heading size="md" className="text-typography-950">
                        Parent Card
                      </Heading>
                      <Card variant="elevated">
                        <Text className="text-typography-700">Nested white card with shadow</Text>
                      </Card>
                    </VStack>
                  </Card>
                </VStack>
              </VStack>
            </Card>
          </VStack>

          {/* Footer */}
          <Box className="pb-8">
            <Divider className="mb-4 bg-outline-200" />
            <VStack className="gap-2 items-center">
              <Text className="text-center text-typography-950 font-bold" size="md">
                Patio Design System
              </Text>
              <Text className="text-center text-typography-500" size="sm">
                Clean, Modern UI • Gluestack + NativeWind + Inter Font
              </Text>
            </VStack>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
}
