# Plan 2: Marketplace Tab - P2P Rentals + Buy/Sell

## Overview
Peer-to-peer marketplace for tool rentals and buy/sell transactions. Core revenue driver with escrow, verification, and trust & safety features.

## 🎨 PROTOTYPE MODE - MOCK DATA ONLY
**This plan uses hardcoded mock data for visual demonstration.**
- Create `utils/mock-data/listings.ts` with 20-30 sample tool listings
- Create `utils/mock-data/bookings.ts` with sample rental/order data
- Simulate map pins with static coordinates around a central location
- Use setTimeout to simulate booking confirmations, payment processing
- Mock QR codes with static images
- Focus on demonstrating rental flows, booking UX, and marketplace UI

---

## Screens to Implement

### 1. Browse (Home) - `/marketplace` or `/(tabs)/marketplace/index.tsx`

**Toggle Modes:**
- **Rental Mode** (default)
- **Buy/Sell Mode**

**Tabs:**

#### A) Nearby (Map View)
- **Map Component**:
  - Clustered pins for listings
  - User location marker (blue dot)
  - Zoom controls
  - Radius circle overlay
  - Tap pin → quick card preview
  - "View Details" → Listing detail

- **Quick Card**:
  - Tool photo
  - Title
  - Price ($/day or $ one-time)
  - Distance (0.5 mi)
  - Rating
  - "Book" or "Buy" button

#### B) Trending
- **Layout**: Grid or list
- **Sort**: Most viewed/booked in last 7 days
- **Card**: Listing card with trending badge

#### C) Categories
- **Layout**: Grid of category chips
- **Categories**:
  - Power Tools
  - Hand Tools
  - Ladders & Scaffolding
  - Plumbing Tools
  - Electrical Tools
  - Measuring & Testing
  - Safety Equipment
  - Garden & Landscaping
  - Paint & Finishing
  - Heavy Equipment
  - Material Handling
  - Compaction & Excavation
  - Lighting
  - Other

- Tap category → filtered listings

#### D) For You
- **Logic**: Personalized based on:
  - User's Learn course progress (suggest related tools)
  - User's location
  - Past rentals/searches
  - User's role (learner, renter, owner)

**Filter Bar (All Tabs):**
- Distance slider (1-50 mi)
- Price range slider
- Deposit amount
- Availability calendar picker
- Condition: New, Like New, Good, Fair
- Verified owners only (toggle)
- Delivery/Pickup options

**Listing Card:**
- Photo (primary)
- Title
- Price: $/day (rental) or $ (buy)
- Deposit amount (rental only)
- Distance + location
- Owner avatar + rating
- Availability indicator (green dot)
- Heart icon (save listing)

**"Request a Tool" FAB:**
- Sticky button
- Opens bottom sheet
- Post: "I need a [tool] from [date] to [date] in [radius]"
- Matching owners get notification

---

### 2. Listing Detail - `/marketplace/listing/:id`

**Header:**
- **Photo/Video Gallery**:
  - Swipeable carousel
  - Pagination dots
  - Pinch to zoom
  - Video autoplay (muted)
  - "View all X photos" link

**Content:**

#### A) Overview Section
- **Title** (large, bold)
- **Price**:
  - Rental: "$25/day" + "$50 deposit"
  - Buy/Sell: "$250"
- **Badges**:
  - Condition badge (Like New, Good, etc.)
  - Verified owner checkmark
  - "Delivers" badge (if delivery available)
  - "Insurance available" badge

#### B) Description
- Owner's description (expandable)
- Tool specifications:
  - Brand, Model
  - Power (voltage, amps)
  - Weight
  - Dimensions
  - Year purchased
  - Condition notes

#### C) Availability (Rental Only)
- **Calendar Component**:
  - Available dates (white)
  - Booked dates (gray)
  - Selected dates (blue)
  - Swipe months
  - Date range selector

- **Pickup Windows**:
  - "Weekdays 6-8pm"
  - "Weekends 10am-6pm"
  - Owner's custom windows

#### D) Location & Delivery
- Distance from user (0.5 mi away)
- Neighborhood (not full address for privacy)
- Map pin preview
- **Delivery Options**:
  - Pickup only
  - Delivery available (+$10)
  - Meet halfway

#### E) Owner Profile Card
- Avatar, name, rating (4.9 ⭐)
- Joined date
- Response time ("Usually responds in 1 hour")
- "View Profile" link
- "Message Owner" button

#### F) Safety Notes
- Owner's safety instructions
- Required PPE
- Damage policy
- Late return fees

#### G) Add-ons (Optional)
- Extra drill bits (+$5)
- Extra blades (+$10)
- Extension cords
- Checkboxes for selection

#### H) Insurance Option
- "Protect your rental" card
- Coverage details
- Cost: +$3/day
- Checkbox to add

#### I) Reviews Section
- Overall rating (4.8/5.0)
- Review count (42 reviews)
- Recent reviews (3-5 preview)
- "See all reviews" link

**CTA Buttons (Sticky Footer):**
- Rental: "Select Dates" → Booking flow
- Buy/Sell: "Buy Now" → Checkout flow
- Secondary: "Message Owner"

---

### 3. Create Listing Wizard - `/marketplace/create`

**Multi-step wizard with progress indicator (1/9):**

#### Step 1: Category Selection
- Grid of categories with icons
- Single selection
- "Next" button

#### Step 2: Title & Description
- **Fields**:
  - Title (required, 50 char limit)
  - Brand (optional)
  - Model (optional)
  - Description (required, 500 char limit)
  - Condition dropdown (New, Like New, Good, Fair)
- Auto-suggestions based on category
- "Next" button

#### Step 3: Photos & Video
- **Upload**:
  - Primary photo (required)
  - Additional photos (up to 8)
  - Optional 30s video
- Camera or gallery picker
- Crop/rotate tools
- Drag to reorder
- "Next" button

#### Step 4: Pricing & Deposit (Rental)
- **Fields**:
  - Daily rate ($ input)
  - Weekly rate (optional, auto-calculated with discount)
  - Deposit amount ($ input)
  - Suggested pricing (AI-based on similar tools)
- "Next" button

#### Step 4B: Pricing (Buy/Sell)
- **Fields**:
  - Asking price ($ input)
  - Original price (optional)
  - Accept offers (toggle)
  - Minimum offer amount
- "Next" button

#### Step 5: Availability (Rental Only)
- **Calendar Picker**:
  - Select available date ranges
  - Recurring availability (every weekend, weekdays, etc.)
  - Blackout dates
- **Pickup Windows**:
  - Add custom time windows
  - "Flexible" option
- "Next" button

#### Step 6: Location & Radius
- **Fields**:
  - Address (auto-filled from user profile)
  - Edit address button
  - Searchable radius (1-50 mi)
  - "Hide exact address" toggle (show only neighborhood)
- Map preview with radius circle
- "Next" button

#### Step 7: Delivery/Pickup Options
- **Options**:
  - Pickup only (free)
  - Delivery available (set fee)
  - Meet halfway (free)
- Delivery fee input (if selected)
- Delivery radius (if different from search radius)
- "Next" button

#### Step 8: Verification Check
- **Requirements**:
  - ID verified (checkmark or "Verify now" link)
  - Address verified (checkmark or "Verify now" link)
  - Selfie with tool (camera button)
- Skip option (reduces trust score)
- "Next" button

#### Step 9: Preview & Publish
- **Preview Card**: How listing appears to renters
- Edit buttons for each section
- Terms & Conditions checkbox
- "Publish Listing" button
- "Save as Draft" button

**Success Screen:**
- "Listing Published!" message
- Listing URL + share button
- "Promote to Clubs" option
- "View Listing" button
- "Create Another" button

---

### 4. Booking Flow (Rental) - `/marketplace/book/:id`

**Step-by-step modal wizard:**

#### Step 1: Select Dates & Times
- Calendar date range picker
- Start date/time
- End date/time
- Duration summary: "3 days"
- "Continue" button

#### Step 2: Price Breakdown
- **Line Items**:
  - Rental: $25/day × 3 days = $75
  - Service fee (10%): $7.50
  - Deposit (refundable): $50
  - Add-ons (if selected): $15
  - Insurance (optional): $9
  - **Total**: $156.50
  - **Deposit**: $50 (held until return)
  - **Total charged**: $106.50

- "Continue" button

#### Step 3: Delivery Method
- Radio options:
  - Pickup at owner's location (free)
  - Delivery to my address (+$10)
  - Meet halfway (free)
- Address input (if delivery)
- "Continue" button

#### Step 4: Payment
- **Payment Methods**:
  - Credit/Debit card (Stripe)
  - Apple Pay
  - Google Pay
- Saved cards list
- Add new card form
- Billing address
- "Confirm & Pay" button

#### Step 5: Confirmation
- **Success Message**: "Booking confirmed!"
- Booking ID
- QR code (for pickup verification)
- **Details**:
  - Pickup date/time
  - Owner contact (chat button)
  - Location (if pickup)
  - Calendar add button
  - Receipt download

- **Next Steps**:
  - "Chat with Owner"
  - "View Booking" → Order detail
  - "Back to Marketplace"

---

### 5. Checkout (Buy/Sell) - `/marketplace/checkout/:id`

**Steps:**

#### Step 1: Quantity & Details
- Quantity selector (usually 1 for tools)
- Item summary
- "Continue" button

#### Step 2: Shipping/Pickup
- Radio options:
  - Pickup from owner (free)
  - Shipping to my address
- Shipping address form
- Shipping cost calculation
- "Continue" button

#### Step 3: Payment
- Same as rental payment flow
- No deposit (one-time payment)
- "Confirm Purchase" button

#### Step 4: Confirmation
- Order number
- Estimated delivery (if shipping)
- Pickup instructions (if pickup)
- Receipt download
- "Track Order" button
- "Message Seller" button

---

### 6. Orders / Rentals - `/marketplace/orders`

**Tabs:**

#### A) Upcoming
- Rentals starting soon
- Purchases pending delivery
- **Card Info**:
  - Tool name + photo
  - Dates (rental) or delivery estimate (buy)
  - Owner/seller info
  - "View Details" button
  - Quick actions: Message, Cancel

#### B) Active
- **Rentals In-Progress**:
  - Pickup confirmed (QR scanned)
  - Days remaining
  - "Extend Rental" button
  - "Request Early Return" button
  - "Report Issue" button
  - Timer indicator

- **Tracking Deliveries**:
  - Shipment tracking number
  - Carrier + status
  - Estimated arrival

#### C) Past
- Completed rentals
- Delivered purchases
- **Card Info**:
  - Tool name + photo
  - Dates
  - Final price
  - "Leave Review" button (if not reviewed)
  - "Receipt" button
  - "Rebook" button (rentals)
  - "Buy Again" button (purchases)

**Filters:**
- All, Rentals, Purchases
- Date range

---

### 7. Map View - `/marketplace/map`

**Features:**

#### A) Interactive Map
- Full-screen map
- Clustered pins (show count in cluster)
- User location (blue dot)
- Search this area button (on map move)
- Zoom to fit all results

#### B) Pin Types
- Available (blue)
- Booked (gray)
- Verified owner (blue with checkmark)

#### C) Quick Card (Bottom Sheet)
- Swipe up for full details
- Swipe down to dismiss
- Tool photo, title, price
- Distance, rating
- "View Listing" button
- "Get Directions" button

#### D) Search & Filter
- Search bar (top)
- Filter button (opens filter sheet)
- Category chips (scrollable)

---

## Key User Flows

### Flow 1: Book a Rental (Complete Journey)

```
Browse → Listing Detail → Select Dates (calendar)
  → Availability Check (real-time)
  → Choose Delivery Method (pickup/delivery/meet)
  → Price Breakdown (review costs + deposit)
  → Payment (Stripe checkout, escrow deposit)
  → Confirmation (QR code + chat opens)
  → PICKUP:
      - QR Scan by owner
      - Photo of tool (condition check)
      - In-use timer starts
  → RETURN:
      - Return checklist (condition check)
      - Photos of returned tool
      - Owner confirms return
      - Deposit released (auto or manual)
      - Review prompts (both sides)
```

### Flow 2: List a Tool

```
FAB → "List a Tool" → Create Listing Wizard
  → Category → Photos → Title/Description
  → Pricing & Deposit → Availability Calendar
  → Location & Radius → Delivery Options
  → Verification (ID, selfie-with-tool)
  → Preview → Publish
  → Success → Share to Clubs (optional)
```

### Flow 3: Extensions & Late Fees

```
Active Rental → "Extend Rental" button
  → Select new end date
  → Price calculation (additional days × rate)
  → Payment for extension
  → Confirmation

Late Return:
  → Auto-detect if not returned on time
  → Late fee calculation ($10/day after 2-hour grace)
  → Notification to renter
  → Charge late fees to payment method
  → Dispute option
```

### Flow 4: Verification & Trust

```
First-time Listing Creation → Verification Required
  ├─ ID Verification:
  │   - Upload photo ID (front + back)
  │   - Selfie for face match
  │   - AI verification + manual review
  │   - Status: Pending → Verified/Rejected
  │
  ├─ Address Verification:
  │   - Confirm address
  │   - Verification code (email or postcard)
  │   - Enter code → Verified
  │
  └─ Tool Verification (Selfie with Tool):
      - Camera prompt: "Hold tool + ID"
      - Photo capture
      - AI matching: tool in photo = listing photos
      - Reduces fraud, builds trust
```

### Flow 5: Disputes & Issues

```
Active Rental → "Report Issue" button
  → Issue Type:
      - Tool damaged/not working
      - Tool not as described
      - Owner unresponsive
      - Safety concern
      - Other
  → Description (text)
  → Photo Evidence (upload multiple)
  → Submit Report
  → AI Pre-screen → Severity assessment
  → Human Review Queue (if high severity)
  → Resolution:
      - Refund (partial or full)
      - Deposit capture (if damage)
      - Repair estimate request
      - Owner rebuttal
      - Mediation
```

### Flow 6: In-App Messaging

```
Listing Detail → "Message Owner" button
  → Opens chat thread (scoped to listing)
  → Pre-filled templates:
      - "Is this available on [date]?"
      - "Can you deliver to [address]?"
      - "What's the condition?"
  → Send message
  → Push notification to owner
  → Real-time chat
  → Image sharing (tool condition questions)
  → Quick replies:
      - "Yes, available!"
      - "Sorry, booked"
      - "I can deliver"
  → Message history in Me → Messages
```

### Flow 7: Club Inventory Overlay

```
Browse → Filter: "Show club inventory"
  → Displays tools from clubs user is member of
  → Listing card with "Club Inventory" badge
  → Different flow (no payment, just request)
  → Request checkout → Club admin approval
  → QR pickup from club location
```

---

## Data Models

### Listing
```typescript
interface Listing {
  id: string;
  type: 'rental' | 'sale';
  ownerId: string;
  title: string;
  description: string;
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';

  // Media
  photos: string[]; // URLs
  video?: string;

  // Pricing
  dailyRate?: number; // rental
  weeklyRate?: number; // rental
  deposit?: number; // rental
  price?: number; // buy/sell
  acceptOffers?: boolean; // buy/sell
  minOffer?: number; // buy/sell

  // Specifications
  brand?: string;
  model?: string;
  specs: Record<string, string>;

  // Location
  location: {
    lat: number;
    lng: number;
    address: string;
    neighborhood: string;
    hideExactAddress: boolean;
  };
  searchRadius: number; // miles

  // Availability (rental)
  availability?: {
    type: 'calendar' | 'always' | 'recurring';
    dates?: Date[];
    recurring?: {
      days: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
      startTime: string;
      endTime: string;
    };
    blackoutDates?: Date[];
  };

  // Delivery
  deliveryOptions: {
    pickup: boolean;
    delivery: boolean;
    meetHalfway: boolean;
    deliveryFee?: number;
    deliveryRadius?: number;
  };

  // Add-ons
  addons?: {
    id: string;
    name: string;
    price: number;
  }[];

  // Trust & Safety
  verification: {
    idVerified: boolean;
    addressVerified: boolean;
    toolPhotoVerified: boolean;
  };
  insuranceAvailable: boolean;
  safetyNotes: string;

  // Status
  status: 'draft' | 'active' | 'paused' | 'rented' | 'sold';
  views: number;
  saves: number;
  rating: number;
  reviewCount: number;

  createdAt: Date;
  updatedAt: Date;
}
```

### Booking (Rental)
```typescript
interface Booking {
  id: string;
  listingId: string;
  renterId: string;
  ownerId: string;

  // Dates
  startDate: Date;
  endDate: Date;
  duration: number; // days

  // Pricing
  dailyRate: number;
  totalRentalCost: number;
  serviceFee: number;
  deposit: number;
  addons: { id: string; price: number }[];
  insurance?: number;
  totalCharged: number;

  // Delivery
  deliveryMethod: 'pickup' | 'delivery' | 'meet-halfway';
  deliveryAddress?: string;
  deliveryFee?: number;

  // Payment
  paymentIntentId: string; // Stripe
  depositHoldId: string; // Stripe hold

  // Status
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled' | 'disputed';

  // Pickup/Return
  pickupConfirmed: boolean;
  pickupQRScanned: boolean;
  pickupPhotos: string[];
  pickupTimestamp?: Date;

  returnRequested: boolean;
  returnConfirmed: boolean;
  returnQRScanned: boolean;
  returnPhotos: string[];
  returnTimestamp?: Date;

  // Extensions
  extensions: {
    newEndDate: Date;
    additionalCost: number;
    approvedAt: Date;
  }[];

  // Late Fees
  lateFees?: {
    daysLate: number;
    feePerDay: number;
    totalFee: number;
    charged: boolean;
  };

  // Disputes
  dispute?: {
    reportedBy: 'renter' | 'owner';
    type: string;
    description: string;
    photos: string[];
    status: 'open' | 'resolved' | 'escalated';
    resolution?: string;
    refundAmount?: number;
  };

  // Reviews
  renterReviewed: boolean;
  ownerReviewed: boolean;

  createdAt: Date;
  updatedAt: Date;
}
```

### Order (Buy/Sell)
```typescript
interface Order {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;

  // Pricing
  price: number;
  quantity: number;
  totalPrice: number;

  // Shipping
  shippingMethod: 'pickup' | 'shipping';
  shippingAddress?: string;
  shippingCost?: number;
  trackingNumber?: string;
  carrier?: string;

  // Payment
  paymentIntentId: string;

  // Status
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'completed' | 'cancelled';

  // Fulfillment
  shippedAt?: Date;
  deliveredAt?: Date;
  pickedUpAt?: Date;

  // Reviews
  buyerReviewed: boolean;
  sellerReviewed: boolean;

  createdAt: Date;
  updatedAt: Date;
}
```

---

## Components to Build

### Listing Components:
- `ListingCard` - Grid/list card with image, price, distance
- `ListingGallery` - Swipeable photo/video gallery
- `AvailabilityCalendar` - Date range picker with booked dates
- `PriceBreakdown` - Line-item price display
- `OwnerProfileCard` - Owner info card
- `ReviewsList` - Reviews with ratings
- `AddOnSelector` - Checkboxes for add-ons
- `InsuranceCard` - Insurance option card

### Map Components:
- `MapView` - Interactive map with pins (react-native-maps)
- `ClusteredMarkers` - Pin clustering
- `QuickCard` - Bottom sheet preview
- `RadiusCircle` - Overlay showing search radius

### Creation Components:
- `CreateWizard` - Multi-step wizard wrapper
- `StepIndicator` - Progress bar (1/9)
- `CategoryGrid` - Category selection
- `PhotoUploader` - Multi-photo upload
- `PricingInput` - Price + deposit fields
- `CalendarPicker` - Availability selector
- `LocationPicker` - Map + address input
- `VerificationCheck` - Verification status checklist

### Booking Components:
- `BookingWizard` - Modal wizard
- `DateTimePicker` - Rental date range
- `PriceBreakdownCard` - Itemized costs
- `DeliveryMethodSelector` - Pickup/delivery/meet
- `PaymentForm` - Stripe payment
- `ConfirmationScreen` - QR code + details

### Order Management:
- `OrderCard` - Upcoming/Active/Past order
- `OrderTimeline` - Status tracker
- `ExtensionRequest` - Extend rental
- `IssueReport` - Report problem
- `ReviewPrompt` - Leave review

---

## Mock Data Examples

**Create `utils/mock-data/listings.ts`:**
```typescript
export const MOCK_LISTINGS = [
  {
    id: 'listing-1',
    type: 'rental',
    title: 'DeWalt 20V Cordless Drill',
    category: 'Power Tools',
    dailyRate: 15,
    deposit: 50,
    distance: 0.5,
    photos: ['https://picsum.photos/seed/drill1/600/400'],
    rating: 4.9,
    owner: { name: 'John Smith', avatar: '...', rating: 5.0 },
    verified: true,
  },
  // ... 20-30 more listings
];

// Mock booking simulation
export const mockCreateBooking = async (data) => {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate payment
  return { success: true, bookingId: 'booking-123', qrCode: 'mock-qr-url' };
};
```

## API Endpoints (Future Backend - Not Needed for Prototype)

```
GET    /marketplace/listings
GET    /marketplace/listings/:id
POST   /marketplace/listings (create)
PATCH  /marketplace/listings/:id (update)
DELETE /marketplace/listings/:id
POST   /marketplace/listings/:id/publish
GET    /marketplace/categories
GET    /marketplace/search
GET    /marketplace/nearby (lat, lng, radius)

POST   /bookings (create rental booking)
GET    /bookings/:id
PATCH  /bookings/:id/extend
POST   /bookings/:id/pickup-confirm
POST   /bookings/:id/return-request
PATCH  /bookings/:id/return-confirm
POST   /bookings/:id/dispute

POST   /orders (create buy/sell order)
GET    /orders/:id
PATCH  /orders/:id/ship
PATCH  /orders/:id/deliver

POST   /payments/create-intent
POST   /payments/hold-deposit (escrow)
POST   /payments/release-deposit
POST   /payments/capture-deposit (damage)

POST   /messages (send message)
GET    /messages/thread/:listingId
```

---

## Payment Integration (Stripe)

### Rental Payment Flow:
1. Create PaymentIntent for (rental + fees)
2. Create Authorization Hold for deposit (not charged)
3. Charge payment immediately
4. Hold deposit for duration
5. On return:
   - If no damage → Release hold
   - If damage → Capture partial/full deposit

### Escrow Logic:
```typescript
// Hold deposit
const depositHold = await stripe.paymentIntents.create({
  amount: deposit * 100,
  currency: 'usd',
  capture_method: 'manual', // Don't charge yet
  payment_method: savedCard,
});

// On successful return
await stripe.paymentIntents.cancel(depositHold.id);

// On damage
await stripe.paymentIntents.capture(depositHold.id, {
  amount_to_capture: damageAmount * 100,
});
```

---

## Trust & Safety Features

### Verification Levels:
- **Level 0**: Email verified
- **Level 1**: ID verified
- **Level 2**: ID + Address verified
- **Level 3**: ID + Address + Tool photo verified

### Fraud Prevention:
- Selfie-with-tool verification
- Address verification (prevents fake listings)
- Review system (both sides)
- Report system with AI pre-screening
- Unusual activity detection (too many cancellations)

### Insurance:
- Partner with insurance provider
- Coverage: Theft, damage, liability
- Cost: ~10% of rental value
- Claims process:
  - Photo evidence
  - Repair estimate
  - Deductible
  - Payout to owner

### Dispute Resolution:
1. Renter/Owner reports issue
2. AI assesses severity
3. Automated resolution (if < $50)
4. Human mediation (if > $50)
5. Evidence review (photos, messages)
6. Decision: Refund, deposit capture, or split
7. Appeal process

---

## Analytics Events

```typescript
// Browse & Discovery
'marketplace_browse'
'marketplace_search'
'marketplace_filter_apply'
'marketplace_category_select'
'marketplace_listing_view'
'marketplace_listing_save'

// Listing Creation
'marketplace_create_start'
'marketplace_create_step' // { step: 1-9 }
'marketplace_create_publish'
'marketplace_create_abandon' // { step: number }

// Booking Flow
'marketplace_booking_start'
'marketplace_booking_dates_select'
'marketplace_booking_delivery_select'
'marketplace_booking_payment_start'
'marketplace_booking_confirm'
'marketplace_booking_cancel'

// Rental Lifecycle
'marketplace_pickup_confirm'
'marketplace_rental_extend'
'marketplace_return_request'
'marketplace_return_confirm'
'marketplace_review_submit'

// Issues
'marketplace_issue_report'
'marketplace_dispute_open'

// Messaging
'marketplace_message_send'
'marketplace_owner_contact'
```

---

## Testing Checklist

- [ ] Browse listings with filters
- [ ] Map view loads and clusters pins
- [ ] Listing detail shows all info
- [ ] Calendar shows availability correctly
- [ ] Create listing wizard validates all steps
- [ ] Photo upload works (camera + gallery)
- [ ] Pricing calculation is accurate
- [ ] Booking flow creates reservation
- [ ] Payment processes (test mode)
- [ ] Deposit hold works (not charged)
- [ ] QR code generation/scanning
- [ ] Pickup confirmation flow
- [ ] Return checklist workflow
- [ ] Deposit release on return
- [ ] Late fee calculation
- [ ] Extension request and payment
- [ ] Dispute reporting
- [ ] Review submission
- [ ] In-app messaging
- [ ] Push notifications for booking events
- [ ] Deep links to listings work

---

## File Structure

```
app/(tabs)/marketplace/
  _layout.tsx                   # Marketplace stack
  index.tsx                     # Browse home (tabs: Nearby, Trending, Categories, For You)
  listing/
    [id].tsx                    # Listing detail
  create.tsx                    # Create listing wizard
  book/
    [id].tsx                    # Booking flow
  checkout/
    [id].tsx                    # Buy/Sell checkout
  orders.tsx                    # Orders/Rentals (tabs: Upcoming, Active, Past)
  map.tsx                       # Full-screen map view

components/marketplace/
  listing/
    listing-card.tsx
    listing-gallery.tsx
    availability-calendar.tsx
    price-breakdown.tsx
    owner-profile-card.tsx
    reviews-list.tsx
    addon-selector.tsx
    insurance-card.tsx
  map/
    map-view.tsx
    clustered-markers.tsx
    quick-card.tsx
    radius-circle.tsx
  create/
    create-wizard.tsx
    step-indicator.tsx
    category-grid.tsx
    photo-uploader.tsx
    pricing-input.tsx
    calendar-picker.tsx
    location-picker.tsx
    verification-check.tsx
  booking/
    booking-wizard.tsx
    date-time-picker.tsx
    price-breakdown-card.tsx
    delivery-method-selector.tsx
    payment-form.tsx
    confirmation-screen.tsx
  orders/
    order-card.tsx
    order-timeline.tsx
    extension-request.tsx
    issue-report.tsx
    review-prompt.tsx

contexts/
  marketplace-context.tsx       # Listings, filters
  booking-context.tsx           # Active bookings

utils/
  price-calculator.ts           # Rental/deposit calc
  availability-checker.ts       # Date conflict check
  distance-calculator.ts        # Geo distance
```

---

## Dependencies to Install

```bash
pnpm add react-native-maps               # Map view
pnpm add @stripe/stripe-react-native     # Payments
pnpm add react-native-qrcode-svg         # QR generation
pnpm add react-native-qrcode-scanner     # QR scanning
pnpm add expo-image-picker               # Photo upload
pnpm add expo-camera                     # Selfie verification
pnpm add react-native-calendar-picker    # Date selection
pnpm add react-native-gifted-chat        # In-app messaging
```

---

## Revenue Model

**Take Rate:**
- Service fee: 10% of rental value
- Payment processing: ~3% (Stripe)
- Net revenue: ~7% per transaction

**Additional Revenue:**
- Insurance: 30% commission on premiums
- Promoted listings: Featured placement fee
- Verified owner badges: Premium subscription

---

## Next Steps After Implementation

1. Integration with Learn (tool suggestions)
2. Integration with Clubs (club inventory)
3. Payment gateway setup (Stripe Connect for payouts)
4. Background checks for high-value tools
5. Advanced fraud detection
6. Delivery logistics partners
