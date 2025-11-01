# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Patio is a React Native mobile application built with Expo that serves as a community-driven DIY (do-it-yourself) platform. The app combines peer-to-peer tool marketplace, interactive learning (Duolingo-style for DIY), local clubs/communities, and an AI-powered search assistant to make home improvement more accessible, affordable, and sustainable.

## Technology Stack

- **Framework**: Expo SDK ~54.0 with Expo Router for file-based routing
- **Runtime**: React 19.1.0 + React Native 0.81.5
- **Styling**: NativeWind 4.x (TailwindCSS for React Native) + Gluestack UI v3
- **Navigation**: Expo Router v6 (file-based) with React Navigation v7
- **Animation**: React Native Reanimated v4 + Legend App Motion
- **Language**: TypeScript with strict mode enabled
- **Package Manager**: pnpm 10.12.1

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (provides QR code for device testing)
pnpm start

# Platform-specific development
pnpm ios        # Launch iOS simulator
pnpm android    # Launch Android emulator
pnpm web        # Launch web version

# Linting
pnpm lint       # Run ESLint with expo config
```

## Architecture

### Navigation Structure

The app uses Expo Router's file-based routing with a bottom tab navigation pattern:

- **Root Layout** (`app/_layout.tsx`): Wraps app in GluestackUIProvider (dark mode) and ThemeProvider
- **Tabs Layout** (`app/(tabs)/_layout.tsx`): Defines 5-tab bottom navigation
- **Anchor**: Set to `(tabs)` via `unstable_settings` in root layout

**Planned 5 tabs** (see `docs/app-prototype-structure.md`):
1. **Learn**: Duolingo-style DIY courses with quizzes, leaderboards, and streaks
2. **Marketplace**: P2P tool rental and buy/sell with escrow, verification, and messaging
3. **Clubs**: Local DIY communities with shared inventory, events, and discussions
4. **Ask (AI)**: AI-powered search engine for DIY questions with contextual answers
5. **Me**: Profile, wallet, messages, feedback, and settings

### Styling Architecture

The project uses a **dual styling system**:

1. **NativeWind (Primary)**: TailwindCSS utility classes for React Native
   - Global styles in `global.css`
   - Configuration in `tailwind.config.js` with extensive color system
   - Metro integration via `metro.config.js` and `nativewind/babel` preset

2. **Gluestack UI (Component Library)**: Pre-built accessible components
   - Located in `components/ui/`
   - Custom theme configuration in `components/ui/gluestack-ui-provider/config.ts`
   - Supports both light/dark modes with CSS variables (RGB format)
   - Components use `tailwind-variants` for variant-based styling

**Color System**: Uses CSS custom properties with RGB values for alpha channel support:
- Primary (grayscale), Secondary, Tertiary, Error, Success, Warning, Info
- Typography (0-950 + white/gray/black)
- Background, Outline, Indicator
- All defined in 50-950 scales

### Path Aliases

Configured in `tsconfig.json` and `babel.config.js`:
- `@/*` → Root directory (`./`)
- `tailwind.config` → `./tailwind.config.js`

Use `@/` prefix for all imports:
```tsx
import { Button } from '@/components/ui/button';
import { useColorScheme } from '@/hooks/use-color-scheme';
```

### UI Components

**Location**: `components/ui/`

Gluestack UI components are organized by component type with platform-specific variants:
- Most components have `index.tsx` (mobile) and `index.web.tsx` (web)
- Shared styles in `styles.tsx` (for layout primitives like Box, Card, Grid, etc.)
- Components use `@gluestack-ui/core` primitives and custom variants

**Key Component Categories**:
- Layout: Box, Center, HStack, VStack, Grid
- Containers: Card, Skeleton, Table
- Forms: Input, Textarea, Select, Checkbox, Radio, Switch, Slider
- Navigation: Tabs, Drawer, Bottomsheet
- Feedback: Alert, AlertDialog, Toast, Spinner, Progress
- Overlay: Modal, Popover, Tooltip, Actionsheet
- Data: FlatList, SectionList, VirtualizedList

### Key Features & Data Model

See `docs/patio-overview.md` and `docs/app-prototype-structure.md` for detailed specifications.

**Core Data Primitives**:
- User (verifications, ratings, role flags)
- Listing (tool/material with pricing, availability, location)
- Booking (rental with dates, status, deposit, escrow)
- Order (buy/sell transactions)
- Club (members, posts, events, shared inventory)
- Course → Lesson → Attempt (learning progress)
- Message (threaded by context: rental, club, order)
- Review (for users and listings)
- Wallet (balance, payouts, deposit holds)

**Critical Flows**:
1. **Rental Booking**: Browse → Listing Detail → Select dates → Payment (with deposit escrow) → Pickup/Delivery → Return checklist → Review
2. **Tool Listing**: Create → Photos → Pricing → Availability → Verification → Publish
3. **Learning**: Course Library → Lesson Player → Quiz → XP/Badges → Leaderboard
4. **Club Tools**: Post "Need a tool" → Community offers → Book → Return → Review

## Web vs Native Considerations

Components may have different implementations for web vs native:
- Check for `.web.tsx` variants (e.g., `box/index.web.tsx`)
- Web uses HTML elements via `@expo/html-elements`
- Native uses React Native primitives
- Styling must work across platforms (NativeWind handles this)

## Configuration Files

- `babel.config.js`: Module resolver for `@` alias, NativeWind preset, worklets plugin
- `metro.config.js`: NativeWind integration with `global.css` input
- `tailwind.config.js`: Extensive color system, font families, custom shadows
- `tsconfig.json`: Strict mode enabled, path aliases
- `nativewind-env.d.ts`: Type definitions for NativeWind

## Design Patterns

**Color Mode**:
- App currently defaults to dark mode (see `app/_layout.tsx:20`)
- Uses `useColorScheme` hook for theme detection
- Both Gluestack and React Navigation themes are synchronized

**Component Structure**:
- Favor Gluestack UI components from `@/components/ui/` for consistency
- Extend with NativeWind classes for custom styling
- Keep platform-specific code in `.web.tsx` files

**Animations**:
- Use `react-native-reanimated` for complex animations
- Use `@legendapp/motion` for declarative animations
- Worklets enabled via Babel plugin for high-performance animations

## Business Context

Patio aims to:
- Reduce waste through peer-to-peer tool sharing (circular economy)
- Make DIY accessible via interactive education (gamified learning)
- Build local communities around home improvement
- Provide quick, reliable DIY answers via AI search

**Potential Revenue Streams** (see `docs/patio-overview.md`):
- Transaction fees on rentals/sales
- Premium memberships for advanced features
- Advertising/partnerships with tool manufacturers
- Insurance/protection plans for rentals
- Anonymized data insights

## Important Notes

- This is an early-stage project (public launch 2025)
- Focus is on product development and community building
- Security features (user verification, insurance) are in development
- See `docs/` for detailed feature specifications and user flows
