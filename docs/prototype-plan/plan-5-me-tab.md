# Plan 5: Me Tab - Profile, Wallet, Messages & Settings

## Overview
User's personal hub for identity, activity, finances, communications, and settings. Centralizes all user-related features across the app.

## 🎨 PROTOTYPE MODE - MOCK DATA ONLY
**This plan uses hardcoded mock data for visual demonstration.**
- Create `utils/mock-data/user-profile.ts` with sample user data
- Create `utils/mock-data/wallet.ts` with mock transactions and balances
- Create `utils/mock-data/messages.ts` with sample conversations
- Create `utils/mock-data/reviews.ts` with sample reviews and ratings
- Simulate form submissions with setTimeout (no actual saving)
- Mock wallet operations (no real payment processing)
- Focus on demonstrating profile management, settings UI, and user dashboard

---

## Screens to Implement

### 1. Dashboard - `/me` or `/(tabs)/me/index.tsx`

**Header:**
- **Profile Section**:
  - Avatar (large, circular)
  - Name + username
  - Level badge (from Learn gamification)
  - Edit profile button
  - Settings gear icon

- **Verification Status**:
  - Checkmarks or badges:
    - Email verified ✓
    - ID verified ✓
    - Address verified ✓
    - Tool owner verified ✓
  - "Complete verification" link (if incomplete)

**Activity Cards (Scrollable):**

#### A) Active Rentals Card
- **Title**: "Active Rentals" + count badge
- **Content**:
  - Tool name + photo
  - Days remaining
  - "Due in 2 days" countdown
  - Quick actions: Extend, Return, Message
- **Empty State**: "No active rentals"
- "View All" link → Marketplace Orders

#### B) Upcoming Bookings Card
- **Title**: "Upcoming" + count
- **Content**:
  - Tool name + photo
  - Pickup date
  - Owner name
  - "View Details" button
- "View All" link

#### C) Sales & Orders Card
- **Title**: "Sales & Orders"
- **Content**:
  - Pending sales (if owner)
  - Pending purchases (if buyer)
  - Status badges
- "View All" link

#### D) Club Activity Card
- **Title**: "My Clubs" + count
- **Content**:
  - Club logos (horizontal scroll)
  - Unread posts badge
  - Latest club post preview
- "View All Clubs" link → Clubs tab

#### E) Course Progress Card
- **Title**: "Learning Progress"
- **Content**:
  - Current course with progress bar
  - XP this week
  - Current streak (🔥 X days)
  - Next milestone
- "Continue Learning" button → Learn tab

#### F) Wallet Summary Card
- **Title**: "Wallet"
- **Content**:
  - Available balance: $125.00
  - Pending: $50.00 (deposits on hold)
  - "Add Bank Account" (if not set up)
- "View Wallet" link

**Quick Actions (Horizontal Chips):**
- Messages (with unread badge)
- Wallet
- Saved Items
- Reviews
- Settings

---

### 2. Messages - `/me/messages`

**Categories (Tabs):**

#### A) All Messages
- Combined inbox from all sources

#### B) Rentals
- Conversations about tool rentals
- Sorted by most recent
- Badge: Active rental indicator

#### C) Clubs
- Club discussions
- Direct messages from club members
- Grouped by club

#### D) Orders
- Buy/sell transaction messages
- Shipping updates

#### E) Support
- Messages with Patio support team

**Message List Item:**
- Avatar (other party)
- Name
- Last message preview
- Timestamp
- Unread badge (blue dot + count)
- Context badge: "Rental", "Club", "Order"

**Swipe Actions:**
- Swipe right: Mark as read/unread
- Swipe left: Archive, Delete

**Message Thread** (`/me/messages/:threadId`):
- Full conversation view
- Real-time messaging
- Image attachments
- Quick replies (pre-defined)
- Typing indicator
- Read receipts
- Block user option

---

### 3. Wallet - `/me/wallet`

**Summary Section:**
- **Available Balance**: $125.00 (large, bold)
- **Pending Balance**: $50.00 (deposits on hold)
- **Total Earned**: $1,250.00 (lifetime)

**Quick Actions:**
- "Transfer to Bank" button (if balance > $10)
- "Add Funds" button (for deposits)
- "Payment Methods" link

**Tabs:**

#### A) Transactions
- **List of All Transactions**:
  - Date
  - Description: "Rental: Drill from John"
  - Type: Earned, Spent, Refund, Deposit
  - Amount: +$25.00 or -$25.00
  - Status: Completed, Pending, Failed
  - Receipt download button

- **Filter**: Date range, Type
- **Search**: By description

#### B) Payouts
- **Payout History**:
  - Date
  - Amount
  - Status: Processing, Completed, Failed
  - Bank account (last 4 digits)
  - Retry button (if failed)

- **Scheduled Payouts**:
  - Next payout date
  - Estimated amount

- **Payout Settings**:
  - Frequency: Weekly, Bi-weekly, Monthly
  - Minimum threshold: $10, $25, $50, $100

#### C) Deposits on Hold
- **List of Held Deposits**:
  - Tool name
  - Renter/Owner name
  - Amount: $50
  - Expected release date
  - "View Rental" link

- **Total Held**: $150.00

#### D) Payment Methods
- **Saved Cards**:
  - Card brand + last 4 digits
  - Expiration date
  - Default badge
  - Remove button

- **Bank Accounts** (for payouts):
  - Bank name + last 4 digits
  - Default badge
  - Remove button

- **"Add Card" button**
- **"Add Bank Account" button**

**Payout Setup Flow** (`/me/wallet/setup-payouts`):
1. **Bank Account Info**:
   - Account holder name
   - Routing number
   - Account number
   - Account type: Checking, Savings

2. **Verification**:
   - KYC (Know Your Customer) - SSN (last 4), DOB
   - Micro-deposit verification:
     - Patio sends 2 small deposits (< $1)
     - User confirms amounts
     - Account verified

3. **Confirmation**:
   - Payout enabled
   - Next payout date

**Receipts & Tax Docs:**
- Annual tax summary (1099 form for earners)
- Downloadable receipts (PDF)
- Export transactions (CSV)

---

### 4. Verifications - `/me/verifications`

**Purpose**: Build trust with verification badges.

**Verification Types:**

#### A) Email Verification
- **Status**: Verified / Not Verified
- **Action**: "Resend Email" (if not verified)
- Auto-verified on signup

#### B) ID Verification
- **Status**: Not Started, Pending, Verified, Rejected
- **Flow**:
  1. Upload photo ID (driver's license, passport)
     - Front photo
     - Back photo (if license)
  2. Take selfie (liveness check)
  3. AI face matching
  4. Manual review (if AI uncertain)
  5. Approval (1-24 hours)

- **Benefits**:
  - "Verified" badge on profile
  - List tools (required)
  - Rent high-value tools

#### C) Address Verification
- **Status**: Not Started, Pending, Verified
- **Flow**:
  1. Confirm current address
  2. Verification method:
     - Email code (instant)
     - Postcard with code (3-5 days, more secure)
  3. Enter verification code
  4. Verified

- **Benefits**:
  - Increases trust for local pickups
  - Required for delivery rentals

#### D) Tool Owner Verification (Selfie with Tool)
- **Status**: Per-listing verification
- **Flow**:
  1. When creating listing → Camera prompt
  2. Instructions: "Hold tool + ID together"
  3. Photo capture
  4. AI matching: Tool in photo = listing photos
  5. Verified

- **Benefits**:
  - "Verified Owner" badge on listing
  - Higher search ranking
  - Reduces fraud

**Verification Dashboard:**
- Progress bar (0/4 complete)
- Each verification card:
  - Icon (checkmark if complete)
  - Name
  - Description
  - Status badge
  - "Start" or "View" button

---

### 5. Reviews & Reputation - `/me/reviews`

**Tabs:**

#### A) As Renter
- **Overall Rating**: 4.8 ⭐ (from X reviews)
- **Review Breakdown**:
  - 5 stars: █████████░ 90%
  - 4 stars: ████░░░░░░ 8%
  - 3 stars: █░░░░░░░░░ 2%
  - 2 stars: ░░░░░░░░░░ 0%
  - 1 star: ░░░░░░░░░░ 0%

- **Reviews List**:
  - Reviewer avatar + name
  - Rating (stars)
  - Review text
  - Tool rented
  - Date
  - Response option (if negative)

#### B) As Owner
- **Overall Rating**: 5.0 ⭐ (from Y reviews)
- Review breakdown (same as above)
- Reviews from renters

#### C) Given Reviews
- Reviews you've left for others
- As renter (for tools)
- As owner (for renters)

**Badges Earned:**
- **Safety-First**: No safety incidents
- **On-Time**: 95%+ on-time returns
- **Responsive**: <1 hour avg response time
- **Tool Expert**: 50+ successful rentals
- **Community Hero**: Top contributor in clubs

**Review Details Modal** (`/me/reviews/:id`):
- Full review with all details
- Photos (if included)
- Response from owner/renter
- Report review option (if inappropriate)

**Leave Review Flow** (triggered from Orders):
```
Order/Rental Complete → "Leave Review" prompt
  → Star rating (1-5)
  → Review text (optional)
  → Tags: Clean, Responsive, Easy, Great tool, etc.
  → Photo upload (optional)
  → Submit → Thank you message
  → Review published
```

---

### 6. Saved - `/me/saved`

**Tabs:**

#### A) Saved Listings
- Tools/materials saved from Marketplace
- Grid view with cards
- Remove from saved
- "Book" or "Buy" quick actions

#### B) Saved Clubs
- Clubs user is interested in (not joined)
- "Join" button on each
- Remove from saved

#### C) Saved Courses
- Bookmarked courses from Learn
- "Start" or "Continue" buttons
- Remove from saved

#### D) Saved Answers
- Answers saved from Ask tab
- Question + answer preview
- Tags
- Remove from saved
- Export options

**Search & Filter:**
- Search saved items
- Filter by category/type
- Sort: Recently added, Name, Price

---

### 7. Feedback - `/me/feedback`

**Purpose**: Community-driven product development.

**Tabs:**

#### A) Feature Requests
- **Submit New Request** button
- **Request List**:
  - Title
  - Description (truncated)
  - Upvote count
  - Status: Under Review, Planned, In Progress, Completed
  - Upvote button (👍)
  - Comment count
  - Submitted by (username)
  - Date

- **Sort**: Most upvoted, Recent, My requests

**Request Detail** (`/me/feedback/feature/:id`):
- Full description
- Upvote count (large)
- Upvote button
- Comments section
- Status updates from Patio team
- "Subscribe to updates" toggle

**Submit Feature Request**:
- Title (required)
- Description (required)
- Category dropdown (Learn, Marketplace, Clubs, Ask, General)
- Attach images (optional)
- Submit button

#### B) Course Requests
- Similar to feature requests
- Specific to requesting new DIY courses
- "What course do you want to see?"
- Category, difficulty, specific topics

#### C) Bug Reports
- **Submit Bug** button
- **Report List**:
  - Title
  - Status: Open, In Progress, Fixed, Won't Fix
  - Priority: Low, Medium, High
  - Date

**Submit Bug Report**:
- Title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (optional)
- Device info (auto-filled)
- Submit

#### D) Roadmap
- **Read-only view of Patio's product roadmap**
- **Sections**:
  - Now (in development)
  - Next (planned)
  - Later (backlog)

- **Card Format**:
  - Feature title
  - Description
  - Expected quarter
  - Upvote count (from requests)

#### E) Announcements
- Product updates from Patio team
- New features launched
- Maintenance notices
- Community spotlights
- Blog posts

**Announcement Card:**
- Title
- Date
- Snippet
- "Read More" button
- Share button

---

### 8. Settings - `/me/settings`

**Sections:**

#### A) Profile
- **Edit Profile** → `/me/settings/profile`
  - Avatar upload (crop/resize)
  - Full name
  - Username (unique)
  - Bio (500 chars)
  - Location (city, state)
  - Interests (multi-select)
  - Save button

#### B) Account
- Email (display only)
- Phone number (add/verify)
- Password → Change password flow
- Two-factor authentication (toggle + setup)

#### C) Notifications
- **Push Notifications** (master toggle)

**Per-Category Toggles:**
- **Rentals**:
  - Booking confirmations
  - Pickup reminders
  - Return reminders
  - Messages
  - Late fees

- **Marketplace**:
  - New listings near you
  - Price drops on saved items
  - Listing views/interest

- **Clubs**:
  - New posts
  - Event invites
  - Mentions
  - Tool requests matching inventory

- **Learn**:
  - Course updates
  - Streak reminders
  - Quiz results
  - Leaderboard position changes

- **Ask**:
  - Answer ready
  - Follow-up suggestions

- **General**:
  - Promotional emails (toggle)
  - Product updates
  - Tips & tricks

**Frequency Settings:**
- Email digest: Daily, Weekly, Never
- Push: Instant, Batched, Off
- SMS (optional): On/Off

#### D) Preferences
- **Language**: English, Español, Français, etc.
- **Units**: Imperial, Metric
- **Location Radius**: Default search radius (5-50 mi)
- **Currency**: USD, CAD, EUR, etc.

#### E) Privacy
- **Profile Visibility**:
  - Public (anyone)
  - Clubs only (club members)
  - Private (hidden)

- **Show Location**: Exact, Neighborhood, City, Hidden
- **Show Activity**: Public, Clubs, Private
- **Searchable Profile**: Yes/No

- **Data Sharing**:
  - Analytics opt-out
  - Personalized recommendations

#### F) Security
- **Active Sessions**:
  - Device name + location
  - Last active
  - "Log out" button per session
  - "Log out all devices" button

- **Login History**:
  - Date, time, device, location
  - Flag suspicious activity

#### G) Legal & Support
- Terms of Service (web view)
- Privacy Policy (web view)
- Community Guidelines (web view)
- Licenses & Attributions
- About Patio (version number)

#### H) Danger Zone
- **Export Data** (GDPR):
  - Request data export
  - Generates ZIP with all user data
  - Email when ready (24-48 hours)

- **Delete Account**:
  - Warning: Cannot be undone
  - Confirmation modal
  - Password re-entry
  - "I understand" checkbox
  - Final "Delete Account" button (red)
  - Account deletion + data purge

---

## Key User Flows

### Flow 1: Complete Profile Setup
```
Dashboard → Verification status incomplete
  → "Complete Verification" button
  → ID Verification:
      - Upload ID photos
      - Take selfie
      - Submit → Pending review
  → Address Verification:
      - Confirm address
      - Send verification code (email)
      - Enter code → Verified
  → Profile complete → Trust score increases
```

### Flow 2: Payout Setup (First-Time Seller)
```
Marketplace → First rental completed → Earnings available
  → Wallet notification: "Set up payouts to access $25"
  → Dashboard → Wallet Card → "Add Bank Account"
  → Payout Setup Wizard:
      1. Bank routing + account number
      2. Account holder name
      3. SSN (last 4) + DOB (KYC)
      4. Submit → Micro-deposits sent
      5. Verify amounts (2 deposits < $1 each)
      6. Enter amounts → Bank verified
      7. Payout enabled
  → Next payout: Friday (or threshold reached)
```

### Flow 3: Manage Active Rental
```
Dashboard → Active Rentals Card → Rental item
  → Rental Detail Screen:
      - Tool info
      - Dates, price
      - Owner contact
      - QR code (for return)
      - Actions:
          - Extend Rental → Select new date → Pay extension
          - Request Early Return → Message owner
          - Report Issue → Issue form → Submit
          - Message Owner → Chat thread
```

### Flow 4: Update Notification Preferences
```
Settings → Notifications
  → Turn off "Streak reminders" (annoying)
  → Turn on "New listings near you" (useful)
  → Set email digest to "Weekly"
  → Save → Toast: "Preferences updated"
```

### Flow 5: Export Data (GDPR)
```
Settings → Privacy → Export Data
  → Confirmation: "This will take 24-48 hours"
  → "Request Export" button
  → Email sent when ready
  → Download ZIP:
      - profile.json
      - rentals.json
      - messages/
      - courses.json
      - reviews.json
```

### Flow 6: Delete Account
```
Settings → Danger Zone → Delete Account
  → Warning modal:
      "This cannot be undone. All data will be deleted:
       - Profile, listings, bookings
       - Messages, reviews
       - Wallet balance will be paid out
       - Club memberships removed"
  → "I understand" checkbox
  → Re-enter password
  → "Delete Account" button (red)
  → Confirm again
  → Account deleted → Redirect to login
  → Deletion email sent (confirmation)
```

---

## Data Models

### UserProfile
```typescript
interface UserProfile {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;

  // Location
  location: {
    city: string;
    state: string;
    country: string;
    lat: number;
    lng: number;
  };
  locationPrivacy: 'exact' | 'neighborhood' | 'city' | 'hidden';

  // Roles & Interests
  roles: ('learner' | 'renter' | 'owner' | 'leader')[];
  interests: string[];

  // Verifications
  verifications: {
    email: boolean;
    phone: boolean;
    id: {
      status: 'none' | 'pending' | 'verified' | 'rejected';
      verifiedAt?: Date;
    };
    address: {
      status: 'none' | 'pending' | 'verified';
      verifiedAt?: Date;
    };
  };

  // Reputation
  ratings: {
    asRenter: number; // 0-5
    asOwner: number; // 0-5
    renterReviewCount: number;
    ownerReviewCount: number;
  };
  badges: string[]; // badge IDs
  trustScore: number; // 0-100

  // Learn Gamification
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;

  // Settings
  preferences: {
    language: string;
    units: 'imperial' | 'metric';
    defaultRadius: number;
    currency: string;
  };
  notificationSettings: NotificationSettings;
  privacySettings: PrivacySettings;

  // Status
  status: 'active' | 'suspended' | 'banned' | 'deleted';
  suspendedUntil?: Date;
  suspensionReason?: string;

  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date;
}
```

### Wallet
```typescript
interface Wallet {
  userId: string;

  // Balances
  availableBalance: number; // can withdraw
  pendingBalance: number; // earnings not yet released
  totalEarned: number; // lifetime
  totalSpent: number; // lifetime

  // Payout Settings
  payoutMethod: {
    type: 'bank' | 'paypal' | 'venmo';
    bankAccount?: {
      routingNumber: string; // encrypted
      accountNumber: string; // encrypted, show last 4
      accountType: 'checking' | 'savings';
      verified: boolean;
    };
    paypalEmail?: string;
  };
  payoutSchedule: {
    frequency: 'weekly' | 'biweekly' | 'monthly';
    minimumThreshold: number;
    nextPayoutDate: Date;
  };

  // KYC
  kycVerified: boolean;
  kycData: {
    ssn: string; // encrypted, last 4 only
    dob: Date;
    verifiedAt?: Date;
  };

  // Holds (Deposits)
  holds: {
    bookingId: string;
    amount: number;
    holdAuthorization: string; // Stripe hold ID
    expectedReleaseDate: Date;
  }[];

  createdAt: Date;
  updatedAt: Date;
}
```

### Transaction
```typescript
interface Transaction {
  id: string;
  userId: string;
  walletId: string;

  type: 'rental-earning' | 'rental-expense' | 'sale' | 'purchase' | 'deposit-hold' | 'deposit-release' | 'deposit-capture' | 'payout' | 'refund' | 'late-fee';

  // Amounts
  amount: number; // positive = credit, negative = debit
  fee: number; // platform fee
  netAmount: number; // amount - fee

  // Related Entity
  relatedType: 'booking' | 'order' | 'payout';
  relatedId: string;

  // Payment
  paymentIntentId?: string; // Stripe
  payoutId?: string;

  // Status
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  failureReason?: string;

  // Receipt
  receiptUrl?: string;

  timestamp: Date;
}
```

### Review
```typescript
interface Review {
  id: string;

  // Subject
  subjectType: 'user' | 'listing';
  subjectId: string;

  // Reviewer
  reviewerId: string;

  // Context
  bookingId?: string;
  orderId?: string;

  // Content
  rating: number; // 1-5
  text: string;
  photos?: string[];
  tags: string[]; // "Clean", "Responsive", "Great tool"

  // As Renter or As Owner
  reviewType: 'renter-review' | 'owner-review';

  // Response
  response?: {
    text: string;
    respondedAt: Date;
  };

  // Moderation
  flagged: boolean;
  removed: boolean;

  createdAt: Date;
  updatedAt: Date;
}
```

---

## Components to Build

### Dashboard Components:
- `ProfileHeader` - Avatar + name + level
- `VerificationBadges` - Checkmarks
- `ActivityCard` - Generic card wrapper
- `RentalCard` - Active rental card
- `BookingCard` - Upcoming booking
- `ClubActivityCard` - Club preview
- `CourseProgressCard` - Learning stats
- `WalletSummaryCard` - Balance display
- `QuickActions` - Horizontal chips

### Messages Components:
- `MessageList` - All conversations
- `MessageListItem` - Conversation preview
- `ChatThread` - Full conversation
- `MessageBubble` - Individual message
- `QuickReplies` - Pre-defined replies
- `TypingIndicator` - "..." animation

### Wallet Components:
- `WalletSummary` - Balance cards
- `TransactionList` - Transaction history
- `TransactionItem` - Single transaction
- `PayoutList` - Payout history
- `PaymentMethodCard` - Card/bank display
- `AddPaymentMethod` - Form
- `DepositHoldsList` - Held deposits
- `PayoutSetupWizard` - Multi-step setup

### Verification Components:
- `VerificationDashboard` - Progress overview
- `VerificationCard` - Individual verification
- `IDUploader` - ID photo capture
- `SelfieCapture` - Liveness check camera
- `AddressForm` - Address entry
- `VerificationCodeInput` - 6-digit code

### Review Components:
- `ReviewOverview` - Rating breakdown
- `ReviewCard` - Individual review
- `ReviewForm` - Leave review
- `RatingStars` - Star selector
- `ReviewTags` - Tag chips
- `BadgesList` - Earned badges

### Settings Components:
- `SettingsSection` - Section wrapper
- `SettingsRow` - Individual setting
- `ProfileEditor` - Edit profile form
- `NotificationToggles` - All notification switches
- `PrivacyToggles` - Privacy settings
- `SessionsList` - Active sessions
- `DeleteAccountModal` - Danger zone

---

## Mock Data Examples

**Create `utils/mock-data/user-profile.ts`:**
```typescript
export const MOCK_USER_PROFILE = {
  id: 'user-1',
  name: 'Alex Martinez',
  username: 'alexdiy',
  email: 'demo@patio.so',
  avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Alex',
  bio: 'DIY enthusiast learning electrical and woodworking',
  location: { city: 'Brooklyn', state: 'NY' },
  roles: ['learner', 'renter'],
  xp: 2450,
  level: 5,
  streak: 7,
  ratings: { asRenter: 4.9, asOwner: 5.0 },
  verifications: {
    email: true,
    id: { status: 'verified' },
    address: { status: 'verified' },
  },
};

export const MOCK_WALLET = {
  availableBalance: 125.00,
  pendingBalance: 50.00,
  totalEarned: 1250.00,
};

export const MOCK_TRANSACTIONS = [
  {
    id: 'tx-1',
    type: 'rental-earning',
    amount: 25.00,
    description: 'Rental: Drill from John Doe',
    timestamp: new Date('2025-10-28'),
    status: 'completed',
  },
  // ... more transactions
];
```

## API Endpoints (Future Backend - Not Needed for Prototype)

```
GET    /users/me (current user profile)
PATCH  /users/me (update profile)
DELETE /users/me (delete account)
POST   /users/me/avatar (upload)

POST   /verifications/id (upload ID)
GET    /verifications/id/status
POST   /verifications/address (request code)
POST   /verifications/address/verify (enter code)
POST   /verifications/tool-owner (selfie with tool)

GET    /wallet
GET    /wallet/transactions
GET    /wallet/payouts
POST   /wallet/payout-method (add bank)
PATCH  /wallet/payout-method/verify (micro-deposits)
POST   /wallet/payout-request (manual payout)
GET    /wallet/holds

GET    /reviews/received
GET    /reviews/given
POST   /reviews (submit review)
PATCH  /reviews/:id/respond

GET    /saved/listings
POST   /saved/listings/:id
DELETE /saved/listings/:id
GET    /saved/clubs
GET    /saved/courses
GET    /saved/answers

GET    /feedback/features
POST   /feedback/features (submit)
POST   /feedback/features/:id/upvote
GET    /feedback/bugs
POST   /feedback/bugs
GET    /feedback/roadmap
GET    /feedback/announcements

GET    /messages
GET    /messages/thread/:id
POST   /messages/send
PATCH  /messages/:id/read

PATCH  /settings/notifications
PATCH  /settings/privacy
GET    /settings/sessions
DELETE /settings/sessions/:id (logout session)

POST   /export-data (GDPR export request)
```

---

## Key Features

### Wallet & Payouts

**Payout Flow:**
```
Rental Completed → Earnings added to pending balance
  → Hold period (2-7 days for disputes)
  → Release to available balance
  → Auto-payout based on schedule:
      - Weekly: Every Friday
      - Bi-weekly: 1st and 15th
      - Monthly: 1st of month
  → Payout initiated (Stripe transfer)
  → Processing (1-3 business days)
  → Bank account credited
  → Email confirmation
```

**Deposit Holds:**
```
Booking Created → Deposit authorized (not charged)
  → Hold shown in "Deposits on Hold"
  → Rental Active → Hold maintained
  → Return Confirmed:
      - No damage → Release hold (deposit back to renter)
      - Damage → Capture hold (partial or full)
          → Funds to owner
          → Renter notified with evidence
          → Dispute option
```

### Verification Benefits

**Trust Tiers:**
- **Tier 0** (Email only): Browse only
- **Tier 1** (+ID): Rent tools < $100
- **Tier 2** (+Address): Rent tools < $500, list tools
- **Tier 3** (+Tool photos): Rent any tool, verified badge

**Badge Display:**
- Profile: "Verified" checkmark
- Listings: "Verified Owner" badge
- Search: Filter for verified only

### Review System

**Review Timing:**
- **Auto-prompt** 24 hours after rental/order completion
- **Reminder** at 7 days if not left
- **Blocked** after 30 days (can't review old transactions)

**Mutual Reviews:**
- Both renter and owner review each other
- Reviews release simultaneously (prevents retaliatory reviews)
- Can't see other's review until both submitted

**Review Moderation:**
- AI scans for profanity, personal info
- Flag reviews with threats, discrimination
- Manual review for flagged content
- Appeal process (if review removed)

### Notification Management

**Smart Batching:**
- Group similar notifications
- "3 new club posts" instead of 3 separate
- Digest mode: Once daily at user's preferred time

**Priority Levels:**
- **Critical**: Payment failures, security alerts
- **High**: Rental pickups/returns, event reminders
- **Medium**: Messages, club posts
- **Low**: Recommendations, tips

**Quiet Hours:**
- User sets: 10pm - 8am (no push notifications)
- Exceptions: Critical only

---

## Analytics Events

```typescript
// Dashboard
'me_dashboard_view'
'me_verification_start'
'me_verification_complete'

// Wallet
'me_wallet_view'
'me_payout_setup_start'
'me_payout_setup_complete'
'me_payout_request'
'me_transaction_view'

// Messages
'me_messages_view'
'me_message_send'
'me_message_read'

// Reviews
'me_reviews_view'
'me_review_submit'
'me_badge_earned'

// Settings
'me_settings_view'
'me_profile_update'
'me_notification_toggle'
'me_privacy_update'
'me_password_change'

// Feedback
'me_feature_request_submit'
'me_feature_upvote'
'me_bug_report_submit'

// Account
'me_data_export_request'
'me_account_delete'
```

---

## Testing Checklist

- [ ] Dashboard loads with all activity cards
- [ ] Verification cards show correct status
- [ ] Profile editing saves correctly
- [ ] Avatar upload and crop works
- [ ] Messages list shows conversations
- [ ] Chat threads work in real-time
- [ ] Typing indicator displays
- [ ] Wallet displays correct balances
- [ ] Transaction history loads
- [ ] Payout setup wizard completes
- [ ] Micro-deposit verification works
- [ ] Bank account adds successfully
- [ ] Payout request initiates transfer
- [ ] Deposit holds display correctly
- [ ] Payment methods add/remove
- [ ] ID verification upload works
- [ ] Selfie capture works
- [ ] Address verification code sent
- [ ] Reviews display (received/given)
- [ ] Leave review form submits
- [ ] Review moderation flags inappropriate content
- [ ] Badges display on profile
- [ ] Saved items list works (all types)
- [ ] Feature request submission works
- [ ] Upvoting features works
- [ ] Bug reports submit correctly
- [ ] Roadmap displays
- [ ] Announcements load
- [ ] Notification toggles save
- [ ] Privacy settings update
- [ ] Active sessions list shows devices
- [ ] Logout session works
- [ ] Data export request works
- [ ] Delete account flow completes
- [ ] All push notifications send correctly

---

## File Structure

```
app/(tabs)/me/
  _layout.tsx                   # Me stack
  index.tsx                     # Dashboard
  messages/
    index.tsx                   # Message list
    [threadId].tsx              # Chat thread
  wallet/
    index.tsx                   # Wallet dashboard
    transactions.tsx            # Transaction history
    payouts.tsx                 # Payout history
    setup-payout.tsx            # Payout wizard
    add-payment-method.tsx      # Add card/bank
  verifications/
    index.tsx                   # Verification dashboard
    id.tsx                      # ID verification
    address.tsx                 # Address verification
    tool-owner.tsx              # Tool selfie
  reviews/
    index.tsx                   # Reviews overview
    [id].tsx                    # Review detail
    leave-review.tsx            # Leave review form
  saved/
    index.tsx                   # Saved items (tabs)
  feedback/
    index.tsx                   # Feedback hub (tabs)
    feature-request.tsx         # Submit feature
    bug-report.tsx              # Submit bug
    roadmap.tsx                 # View roadmap
    announcements.tsx           # Announcements
  settings/
    index.tsx                   # Settings hub
    profile.tsx                 # Edit profile
    notifications.tsx           # Notification prefs
    privacy.tsx                 # Privacy settings
    security.tsx                # Security & sessions
    legal.tsx                   # Legal docs
    export-data.tsx             # GDPR export
    delete-account.tsx          # Delete account

components/me/
  dashboard/
    profile-header.tsx
    verification-badges.tsx
    activity-card.tsx
    rental-card.tsx
    booking-card.tsx
    club-activity-card.tsx
    course-progress-card.tsx
    wallet-summary-card.tsx
    quick-actions.tsx
  messages/
    message-list.tsx
    message-list-item.tsx
    chat-thread.tsx
    message-bubble.tsx
    quick-replies.tsx
    typing-indicator.tsx
  wallet/
    wallet-summary.tsx
    transaction-list.tsx
    transaction-item.tsx
    payout-list.tsx
    payment-method-card.tsx
    add-payment-method.tsx
    deposit-holds-list.tsx
    payout-setup-wizard.tsx
  verifications/
    verification-dashboard.tsx
    verification-card.tsx
    id-uploader.tsx
    selfie-capture.tsx
    address-form.tsx
    verification-code-input.tsx
  reviews/
    review-overview.tsx
    review-card.tsx
    review-form.tsx
    rating-stars.tsx
    review-tags.tsx
    badges-list.tsx
  settings/
    settings-section.tsx
    settings-row.tsx
    profile-editor.tsx
    notification-toggles.tsx
    privacy-toggles.tsx
    sessions-list.tsx
    delete-account-modal.tsx

contexts/
  wallet-context.tsx            # Wallet state
  messages-context.tsx          # Unread count

utils/
  wallet-calculator.ts          # Balance calculations
  kyc-validation.ts             # KYC checks
  session-manager.ts            # Session handling
```

---

## Dependencies to Install

```bash
pnpm add @react-native-async-storage/async-storage  # User prefs
pnpm add @stripe/stripe-react-native                # Payments
pnpm add react-native-gifted-chat                   # Messaging
pnpm add expo-image-picker                          # Avatar upload
pnpm add expo-camera                                # ID/selfie capture
pnpm add react-native-image-crop-picker             # Avatar cropping
pnpm add expo-secure-store                          # Sensitive data (tokens)
```

---

## Security Considerations

### Sensitive Data:
- **Encrypt**: SSN, bank account numbers, ID photos
- **Store**: Use expo-secure-store for tokens
- **Transmit**: HTTPS only, no sensitive data in URLs
- **Delete**: Purge on account deletion

### Authentication:
- JWT tokens with expiration
- Refresh token rotation
- Session management (device tracking)
- Force logout on password change

### Privacy Compliance:
- GDPR: Data export, right to deletion
- CCPA: Do not sell data
- Age verification (13+ or 18+)
- Parental consent (if < 18)

---

## Onboarding Role-Based Dashboard

**User selects roles during signup:**

### Learner Role:
- Dashboard emphasizes: Course Progress, Streaks
- Suggested: Beginner courses
- Highlight: Leaderboard position

### Renter Role:
- Dashboard emphasizes: Active Rentals, Saved Listings
- Suggested: Nearby tool availability
- Highlight: Upcoming bookings

### Tool Owner Role:
- Dashboard emphasizes: Earnings, Active Rentals (as owner)
- Suggested: "List your first tool"
- Highlight: Reviews as owner

### Club Leader Role:
- Dashboard emphasizes: Club Activity, Events
- Suggested: "Create a club" or "Invite members"
- Highlight: Club stats

**Dynamic Dashboard:**
- Show relevant cards based on roles
- Hide irrelevant sections
- Customize quick actions

---

## Next Steps After Implementation

1. Advanced analytics dashboard (for owners/leaders)
2. Tax reporting (1099 generation)
3. Multi-currency support
4. Premium subscription tier
5. Referral program (earn credits)
6. Achievements system (beyond badges)
7. Social features (follow users, friends list)
