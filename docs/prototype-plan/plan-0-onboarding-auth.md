# Plan 0: Onboarding, Authentication & Tab Setup

## Overview
Foundation layer for the Patio app. Sets up user onboarding, authentication flow, and the core bottom tab navigation structure.

## 🎨 PROTOTYPE MODE - MOCK DATA ONLY
**This plan is for building a visual prototype with hardcoded mock data. No backend API calls needed yet.**
- Use static data arrays for all content
- Simulate async operations with setTimeout
- Store state in React Context (not persisted)
- Focus on UI/UX demonstration and flow validation

---

## Screens to Implement

### 1. Onboarding Carousel (`/onboarding`)

**Purpose**: First-time user introduction to Patio's value proposition.

**Slides (3-4 screens):**

1. **Slide 1: Welcome**
   - Hero: "Learn, Build, Reuse."
   - Subtitle: "Learn new DIY skills through interactive content"
   - Image: DIY learning illustration
   - Progress dots: 1/4

2. **Slide 2: Share Tools**
   - Title: "Access the perfect tool"
   - Subtitle: "Earn by sharing, save by borrowing from neighbors"
   - Image: Tool sharing illustration
   - Progress dots: 2/4

3. **Slide 3: Join Communities**
   - Title: "Join local DIY clubs"
   - Subtitle: "Connect with nearby makers, share knowledge, collaborate"
   - Image: Community illustration
   - Progress dots: 3/4

4. **Slide 4: Get Started**
   - Title: "Ready to get started?"
   - Subtitle: "Build with purpose, not excess"
   - CTA Button: "Get Started"
   - Progress dots: 4/4

**Components Needed:**
- Carousel component (use `@gorhom/bottom-sheet` or custom with Reanimated)
- Progress dots indicator
- Skip button (top-right)
- Next/Get Started buttons
- Smooth swipe transitions

**State Management:**
- Track current slide index
- Store onboarding completion in AsyncStorage
- Auto-skip if already completed

---

### 2. Welcome/Landing Screen (`/welcome`)

**Purpose**: Entry point for authentication.

**Layout:**
- Patio logo (centered)
- Tagline: "Learn, Build, Reuse."
- Subtitle: "The DIY platform for learning, sharing, and community"
- 2 Primary CTAs:
  - "Sign Up" (blue button, full-width)
  - "Log In" (outline button, full-width)

**Components:**
- Logo image
- Heading, Text components
- 2 Button components (primary + outline variants)

---

### 3. Signup Flow

#### 3.1 **Sign Up Screen** (`/signup`)

**Fields:**
- Name (Input)
- Email (Input with email keyboard)
- Password (Input with secure entry, show/hide toggle)
- Confirm Password (Input with secure entry)
- Terms & Conditions checkbox

**Validation:**
- Email format validation
- Password strength indicator (min 8 chars, uppercase, number)
- Passwords match check
- Terms acceptance required

**CTA:**
- "Create Account" button (disabled until valid)
- "Already have an account? Log in" link

#### 3.2 **Location Permission** (`/signup/location`)

**Purpose**: Request location access for nearby tools/clubs.

**Content:**
- Title: "Enable location access"
- Explanation: "Find tools and clubs near you"
- Permission rationale
- "Allow Location" button
- "Skip for now" link

**Flow:**
- Request permission → success/denied handling
- Store location in user profile

#### 3.3 **Role Selection** (`/signup/role`)

**Purpose**: Tailor experience based on user intent.

**Options (multi-select):**
- Learner (want to learn DIY skills)
- Renter (need to borrow tools)
- Tool Owner (have tools to share)
- Club Leader (want to organize community)

**UI:**
- 4 large cards with icons
- Multi-select checkboxes
- "Continue" button
- "You can change this later" note

**Data:**
- Store roles array in user profile
- Use for dashboard personalization

---

### 4. Login Flow

#### 4.1 **Login Screen** (`/login`)

**Fields:**
- Email (Input)
- Password (Input with secure entry, show/hide toggle)
- "Remember me" checkbox

**CTAs:**
- "Log In" button (primary)
- "Forgot password?" link
- Divider: "Or continue with"
- Social login buttons:
  - Sign in with Google
  - Sign in with Apple

**Validation:**
- Email format check
- Password required
- Error handling (invalid credentials, network errors)

#### 4.2 **Forgot Password** (`/forgot-password`)

**Flow:**
- Enter email
- Send reset link
- Confirmation screen
- Deep link to reset password form

---

### 5. Bottom Tab Navigator Setup

#### File Structure:
```
app/
  (tabs)/
    _layout.tsx           # Tab navigator config
    learn/
      _layout.tsx         # Learn stack
      index.tsx           # Library home
    marketplace/
      _layout.tsx         # Marketplace stack
      index.tsx           # Browse home
    clubs/
      _layout.tsx         # Clubs stack
      index.tsx           # Discover clubs
    ask/
      _layout.tsx         # Ask stack
      index.tsx           # Ask home
    me/
      _layout.tsx         # Me stack
      index.tsx           # Profile dashboard
```

#### Tab Configuration:

**5 Tabs:**
1. **Learn** - Icon: Book/GraduationCap, Label: "Learn"
2. **Marketplace** - Icon: ShoppingBag/Store, Label: "Marketplace"
3. **Clubs** - Icon: Users/Community, Label: "Clubs"
4. **Ask** - Icon: Sparkles/MessageCircle + "BETA" badge, Label: "Ask"
5. **Me** - Icon: User/Profile, Label: "Me"

**Tab Bar Styling:**
- Background: White (`#FFFFFF`)
- Active tab: Primary blue (`#0066FF`)
- Inactive tab: Gray (`#6B7280`)
- Border top: Light gray (`#E5E7EB`)
- Icons: Lucide React Native

**Badge Indicators:**
- Me tab: Show unread message count
- Notifications dot on relevant tabs

---

### 6. Global Create FAB (Floating Action Button)

**Position**: Center of tab bar (elevated above tabs) or sticky bottom-right.

**Options Menu:**
- List a Tool (→ Marketplace create listing)
- Post to Club (→ Clubs create post)
- Create Event (→ Clubs create event)
- Ask AI (→ Ask new conversation)
- Add Course Note (→ Learn add note)

**Components:**
- FAB button (blue circle, + icon)
- Bottom sheet menu with options
- Icons for each action
- Close on selection → navigate to respective screen

---

## Navigation Flow

```
App Launch
  ↓
Check AsyncStorage: onboarding_completed?
  ├─ No → /onboarding → /welcome → /signup or /login
  └─ Yes → Check Auth Token?
       ├─ No → /welcome → /signup or /login
       └─ Yes → /(tabs)/learn (default)
```

---

## State Management

**AsyncStorage Keys:**
- `@patio:onboarding_completed` (boolean)
- `@patio:auth_token` (JWT string)
- `@patio:user_profile` (JSON object)
- `@patio:user_roles` (array: ['learner', 'renter', 'owner', 'leader'])

**Context Providers:**
- AuthContext: user, token, login(), logout(), signup()
- LocationContext: coords, permission status, requestPermission()

---

## Components to Build

### Onboarding Components:
- `OnboardingCarousel` - Swipeable slides
- `OnboardingSlide` - Individual slide layout
- `ProgressDots` - Dot indicator

### Auth Components:
- `AuthInput` - Styled input with validation
- `PasswordInput` - With show/hide toggle
- `SocialLoginButton` - Google/Apple branded buttons
- `RoleCard` - Selectable role option card

### Navigation Components:
- `TabBar` - Custom tab bar with FAB
- `CreateFAB` - Floating action button
- `CreateMenu` - Bottom sheet with options

---

## Mock Data Structure

**For Prototype: Use hardcoded data in `/utils/mock-data/auth.ts`**

```typescript
// Example mock user
export const MOCK_USER = {
  id: 'user-1',
  email: 'demo@patio.so',
  name: 'Alex Martinez',
  username: 'alexdiy',
  avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Alex',
  roles: ['learner', 'renter'],
  onboardingCompleted: false,
};

// Simulate login
export const mockLogin = async (email: string, password: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network
  if (email === 'demo@patio.so' && password === 'password') {
    return { success: true, user: MOCK_USER };
  }
  return { success: false, error: 'Invalid credentials' };
};
```

## API Endpoints (Future Backend - Not Needed for Prototype)

```
POST /auth/signup
POST /auth/login
POST /auth/social-login (Google/Apple)
POST /auth/forgot-password
POST /auth/reset-password
GET  /auth/verify-token
POST /auth/refresh-token
PATCH /users/profile
PATCH /users/roles
PATCH /users/location
```

---

## Dependencies to Install

```bash
pnpm add @react-native-async-storage/async-storage
pnpm add @react-navigation/bottom-tabs
pnpm add react-native-pager-view
pnpm add expo-auth-session
pnpm add expo-crypto
pnpm add expo-location
```

---

## File Structure

```
app/
  _layout.tsx                    # Root with auth check
  (auth)/
    _layout.tsx                  # Auth stack
    onboarding.tsx               # Carousel
    welcome.tsx                  # Landing
    login.tsx                    # Login form
    signup.tsx                   # Signup form
    signup-location.tsx          # Location permission
    signup-role.tsx              # Role selection
    forgot-password.tsx          # Password reset
  (tabs)/
    _layout.tsx                  # Tab navigator
    learn/...
    marketplace/...
    clubs/...
    ask/...
    me/...

components/
  onboarding/
    carousel.tsx
    slide.tsx
    progress-dots.tsx
  auth/
    auth-input.tsx
    password-input.tsx
    social-login-button.tsx
    role-card.tsx
  navigation/
    tab-bar.tsx
    create-fab.tsx
    create-menu.tsx

contexts/
  auth-context.tsx
  location-context.tsx

utils/
  auth-storage.ts               # AsyncStorage helpers
  validation.ts                 # Form validation
```

---

## Testing Checklist

- [ ] Onboarding shows only on first launch
- [ ] Skip button works on carousel
- [ ] Signup validation works (email, password strength)
- [ ] Login with valid credentials works
- [ ] Social login buttons trigger OAuth
- [ ] Location permission request works
- [ ] Role selection saves to profile
- [ ] Tab navigation works between all 5 tabs
- [ ] FAB menu opens and navigates correctly
- [ ] Deep links work (`patio://login`, etc.)
- [ ] Auth token persists across app restarts
- [ ] Logout clears all stored data

---

## Next Steps

After Plan 0 is complete:
1. Plan 1: Learn Tab (courses, quizzes, leaderboard)
2. Plan 2: Marketplace Tab (listings, booking, payments)
3. Plan 3: Clubs Tab (communities, events, inventory)
4. Plan 4: Ask AI Tab (AI assistant, conversations)
5. Plan 5: Me Tab (profile, wallet, settings)
