# Plan 3: Clubs Tab - Local DIY Communities

## Overview
Local community features for tool sharing, events, discussions, and collaborative learning. Builds trust, increases supply/demand density, and creates network effects.

## 🎨 PROTOTYPE MODE - MOCK DATA ONLY
**This plan uses hardcoded mock data for visual demonstration.**
- Create `utils/mock-data/clubs.ts` with 10-15 sample clubs
- Create `utils/mock-data/posts.ts` with sample feed posts and comments
- Create `utils/mock-data/events.ts` with sample club events
- Simulate map locations near user's location
- Use setTimeout to simulate join requests, post submissions
- Mock club inventory with 5-10 items per club
- Focus on demonstrating community features and social interactions

---

## Screens to Implement

### 1. Discover Clubs - `/clubs/discover` or `/(tabs)/clubs/index.tsx`

**View Modes (Toggle):**

#### A) Map View
- **Interactive Map**:
  - Club location pins (different colors by type)
  - User location (blue dot)
  - Radius circle (configurable)
  - Tap pin → Club preview card
  - Cluster pins when zoomed out

- **Club Preview Card** (Bottom Sheet):
  - Club photo
  - Name
  - Member count
  - Distance
  - Public/Private indicator
  - "View Club" button
  - "Join" button (if public)

#### B) List View
- **Club List Card**:
  - Club photo (left)
  - Name, member count, distance
  - Short description (truncated)
  - Tags/interests chips
  - Public/Private badge
  - Join button or "Request to Join"

**Filters:**
- **Nearby Radius**: 1-50 mi slider
- **Interests**: Multi-select (Woodworking, Electrical, etc.)
- **Size**: Small (<50), Medium (50-200), Large (200+)
- **Type**: Public, Private
- **Activity**: Active (posts in last 7 days), All

**Search:**
- Search by club name
- Search by keyword/interest

**"Create Club" FAB:**
- Sticky button
- Opens create club wizard

---

### 2. Club Home - `/clubs/:id`

**Header:**
- **Cover Photo** (banner)
- **Club Logo** (circle, overlapping cover)
- **Name** (large heading)
- **Member Count** + **Location**
- **Join/Leave Button** (context-aware):
  - "Join" (if public, not member)
  - "Request to Join" (if private, not member)
  - "Pending" (if request sent)
  - "Joined" + "Leave" option (if member)
- **Admin Badge** (if user is admin)
- **Share Button** (invite link)

**Navigation Tabs:**

#### Tab 1: Feed
- Posts from club members
- Pinned announcements (top)
- "Need a Tool" requests (highlighted)
- Project showcases
- Discussion threads
- Polls
- Tutorial shares

**Post Types:**
- Text post
- Image post (1-10 images)
- "Need a Tool" request
- Poll
- Event announcement
- Shared Learn course

**Post Card:**
- Author avatar + name + timestamp
- Post content (text + images)
- Like count + "Like" button
- Comment count + "Comment" button
- Share button
- 3-dot menu (report, hide, delete if author/admin)

#### Tab 2: Inventory
- **Club's Shared Tools/Materials**
- **List of Items**:
  - Tool name + photo
  - Availability status (Available, Checked Out, Maintenance)
  - Checkout policy (hour, day, week)
  - Condition
  - Location (club address or member's home)
- **"Request Item" button**
- **Admin**: "Add Item" button

**Checkout Flow** (Club Inventory):
```
Item → Request → Admin Approval
  → Pickup Window Assigned
  → QR Code Generated
  → Pickup (QR scan)
  → Return (QR scan)
  → Review condition
```

#### Tab 3: Members
- **Member List**:
  - Avatar, name, role
  - Joined date
  - Activity level (posts, tools shared)
  - Admin/Moderator badges
- **Invite Members** button
- **Admin**: Manage roles, remove members

#### Tab 4: Events
- **Upcoming Events**:
  - Event banner image
  - Title, date, time
  - Location (address or virtual)
  - RSVP count / capacity
  - "RSVP" button or "Waitlist"
  - Calendar add button

- **Past Events**:
  - Event title + date
  - Attendee count
  - Photo gallery (if shared)

- **Create Event** button (members)

#### Tab 5: Guides
- **Club-Curated Guides**:
  - Written by admins/members
  - Approved tutorials
  - Local resources (hardware stores, etc.)
  - Safety guidelines

#### Tab 6: Rules
- Club rules and guidelines
- Code of conduct
- Posting guidelines
- Tool borrowing policies
- Dispute resolution process

---

### 3. Post/Thread Detail - `/clubs/:id/post/:postId`

**Layout:**
- **Original Post** (expanded):
  - Author info
  - Full text content
  - All images (gallery)
  - Timestamp
  - Like/Comment counts

- **Comments Section**:
  - Nested comments (1 level)
  - Avatar + name + timestamp
  - Comment text
  - Like button
  - Reply button
  - 3-dot menu (report, delete)

- **"Write a Comment" Input**:
  - Text input
  - Image attachment option
  - Submit button

**"Need a Tool" Post (Special):**
- **Request Details**:
  - Tool needed
  - Date/time range
  - Pickup radius
  - "I can help!" button

- **Offers Section**:
  - Member offers (avatar, name, "I have this!")
  - Distance from requester
  - Available dates
  - "Accept Offer" button (requester only)

- **Accept Offer Flow**:
  - Select offer → Creates instant booking
  - Pre-filled from Marketplace listing (if owner has it listed)
  - Or ad-hoc rental agreement
  - Deposit handling
  - Pickup coordination

---

### 4. Create Event - `/clubs/:id/events/create`

**Form Fields:**
- **Event Title** (required)
- **Description** (required)
- **Event Type**: Workshop, Fix-it Day, Social, Meeting, Other
- **Date** (date picker)
- **Start Time** (time picker)
- **End Time** (time picker)
- **Location**:
  - Physical address
  - Virtual (Zoom/Meet link)
- **Capacity**: Max attendees (optional)
- **Cover Photo** (upload)
- **RSVP Required**: Yes/No toggle
- **Waitlist Enabled**: Toggle

**Preview:**
- Show how event appears to members
- Edit button for each section

**Publish Button:**
- Creates event
- Notifies all club members
- Adds to club calendar
- "Share Event" option

---

### 5. Club Inventory Management - `/clubs/:id/inventory`

#### For Members:
- **Browse Inventory**:
  - Grid/List of items
  - Search bar
  - Filter: Available, Checked Out, All
  - Sort: Name, Recently Added, Popularity

- **Item Card**:
  - Photo
  - Name, category
  - Availability badge
  - Checkout policy
  - "Request" button

- **Request Item Flow**:
  - Select dates/time
  - Reason (optional)
  - Submit request
  - Admin approval notification
  - Pickup instructions with QR code

#### For Admins:
- **"Add Item" Button**:
  - Form: Name, description, category
  - Photo upload
  - Checkout policy (hour, day, week, approval-only)
  - Condition
  - Location (club or member storage)
  - Quantity (if multiple)

- **Manage Items**:
  - Edit item details
  - Mark as maintenance
  - Mark as retired/sold
  - View checkout history

- **Approve Requests**:
  - Pending requests list
  - Approve/Deny
  - Set pickup window
  - Send message to requester

---

### 6. Create Club - `/clubs/create`

**Wizard Steps:**

#### Step 1: Basic Info
- **Club Name** (required, unique check)
- **Description** (required)
- **Club Logo** (image upload)
- **Cover Photo** (image upload)
- "Next" button

#### Step 2: Interests & Focus
- **Multi-select Interests**:
  - Woodworking, Electrical, Plumbing, etc.
  - (Same as course categories)
- **Focus Area** (optional):
  - Tool sharing
  - Learning together
  - Events/workshops
  - Project collaboration
- "Next" button

#### Step 3: Privacy & Access
- **Type**:
  - Public (anyone can join)
  - Private (request to join + approval)
- **Member Approval** (if private):
  - Auto-approve
  - Manual approval with questions
- **Screening Questions** (if manual):
  - Add 1-5 custom questions
- "Next" button

#### Step 4: Location
- **Address** (club meeting place or virtual)
- **Radius** (search visibility)
- Map preview
- "Next" button

#### Step 5: Rules & Guidelines
- **Code of Conduct** (pre-filled template, editable)
- **Posting Guidelines**
- **Tool Borrowing Rules** (if applicable)
- "Next" button

#### Step 6: Invite Founding Members
- **Invite via**:
  - Email addresses
  - Phone numbers
  - Share link
- "Skip" option
- "Create Club" button

**Success Screen:**
- "Club Created!" message
- Club URL + share
- "Invite Members" button
- "Go to Club" button

---

### 7. Club Admin Panel - `/clubs/:id/admin`

**Sections:**

#### A) Dashboard
- Member count graph (last 30 days)
- Post activity
- Event RSVPs
- Pending requests
- Reports queue

#### B) Manage Members
- **Member List** (searchable):
  - Avatar, name, joined date
  - Role: Admin, Moderator, Member
  - Activity score
  - "Change Role" dropdown
  - "Remove Member" button

- **Pending Requests**:
  - Requestor info
  - Screening question answers
  - Approve/Deny buttons
  - Send message

#### C) Moderation Queue
- **Reported Posts**:
  - Post content
  - Reporter info
  - Reason
  - AI flagging (if auto-detected)
  - Actions: Delete, Warn, Keep, Ban User

- **Reported Members**:
  - Member info
  - Reason for report
  - Evidence
  - Actions: Warn, Suspend, Ban

#### D) Inventory Management
- Add/edit/remove items
- Approve checkout requests
- View checkout history
- Mark items for maintenance

#### E) Event Management
- Edit upcoming events
- Cancel events
- View attendee lists
- Check-in attendees

#### F) Settings
- Edit club info (name, description, logo)
- Change privacy settings
- Update rules
- Delete club (with confirmation)

---

## Key User Flows

### Flow 1: Join a Public Club
```
Discover Clubs → Browse Map/List
  → Tap Club Card → Club Home Preview
  → "Join" button → Joined!
  → Feed loads → Can post/comment
```

### Flow 2: Request to Join Private Club
```
Discover → Private Club → "Request to Join"
  → Answer Screening Questions (if any)
  → Submit Request → "Request Sent" confirmation
  → Admin Notification → Admin Reviews
  → Approval → User notification → Access granted
  → Denial → User notification with reason
```

### Flow 3: Post "Need a Tool"
```
Club Feed → "Need a Tool" button (in create menu)
  → Form:
      - Tool name
      - When needed (date range)
      - Where (address or "my location")
      - Radius (how far willing to travel)
  → Post to Feed
  → Members with tool get notification
  → Offers appear in thread
  → Select offer → One-tap booking
  → Payment (deposit) → Confirmation
  → Pickup coordination → Return → Review
```

### Flow 4: Cross-Post Learn Certificate
```
Learn Tab → Complete Course → Results Screen
  → "Share to Club" button
  → Select club from list
  → Draft post auto-created:
      "I just completed [Course Name]! 🎉
       Looking for someone to supervise my first [skill] project.
       Who's available this weekend?"
  → Edit if needed → Post
  → Navigate to Clubs tab → Post published
  → Responses from members
```

### Flow 5: Checkout Club Inventory Item
```
Club Inventory Tab → Browse Items → Select Item
  → "Request" button → Select dates
  → Add reason (optional) → Submit
  → Admin notification → Admin approves
  → Pickup window assigned (e.g., "Sat 10am-2pm")
  → QR code generated → Sent to member
  → Member arrives → Admin scans QR
  → Checkout confirmed → Item in use
  → Return → Admin scans QR → Return confirmed
  → Optional: Condition check photos
```

### Flow 6: Create & Host Event
```
Club Home → Events Tab → "Create Event" button
  → Fill form (title, date, location, capacity)
  → Upload cover photo
  → Publish → Notifies all members
  → Members RSVP
  → Waitlist if capacity reached
  → Event day: Check-in attendees
  → Post-event: Share photos
```

---

## Data Models

### Club
```typescript
interface Club {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverPhoto: string;

  // Location
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    state: string;
  };
  searchRadius: number; // visibility radius

  // Privacy
  type: 'public' | 'private';
  approvalRequired: boolean;
  screeningQuestions?: {
    question: string;
    required: boolean;
  }[];

  // Interests
  interests: string[]; // ["Woodworking", "Electrical", ...]
  focusAreas: string[];

  // Stats
  memberCount: number;
  postCount: number;
  eventCount: number;

  // Settings
  rules: string;
  guidelines: string;
  toolBorrowingPolicy?: string;

  // Admins
  createdBy: string;
  admins: string[]; // user IDs
  moderators: string[]; // user IDs

  createdAt: Date;
  updatedAt: Date;
}
```

### ClubMembership
```typescript
interface ClubMembership {
  id: string;
  clubId: string;
  userId: string;
  role: 'admin' | 'moderator' | 'member';
  status: 'active' | 'pending' | 'banned' | 'left';

  // Join Request
  requestedAt?: Date;
  approvedAt?: Date;
  approvedBy?: string;
  screeningAnswers?: Record<string, string>;

  // Activity
  lastActiveAt: Date;
  postCount: number;
  eventAttendance: number;

  joinedAt: Date;
}
```

### ClubPost
```typescript
interface ClubPost {
  id: string;
  clubId: string;
  authorId: string;

  type: 'text' | 'image' | 'need-tool' | 'poll' | 'event' | 'shared-course';

  // Content
  content: string;
  images?: string[];
  video?: string;

  // Need a Tool specific
  toolRequest?: {
    toolName: string;
    neededFrom: Date;
    neededTo: Date;
    location: { lat: number; lng: number };
    radius: number;
    offers: {
      userId: string;
      message: string;
      listingId?: string; // if from Marketplace
      createdAt: Date;
    }[];
    acceptedOffer?: string; // userId
  };

  // Poll specific
  poll?: {
    question: string;
    options: string[];
    votes: Record<string, string[]>; // option -> userIds
    endsAt?: Date;
  };

  // Shared course specific
  sharedCourse?: {
    courseId: string;
    completedAt: Date;
    certificate?: string;
  };

  // Engagement
  likes: string[]; // user IDs
  commentCount: number;
  pinned: boolean;

  // Moderation
  reported: boolean;
  removed: boolean;
  removedBy?: string;
  removedReason?: string;

  createdAt: Date;
  updatedAt: Date;
}
```

### ClubEvent
```typescript
interface ClubEvent {
  id: string;
  clubId: string;
  organizerId: string;

  title: string;
  description: string;
  type: 'workshop' | 'fix-it-day' | 'social' | 'meeting' | 'other';

  // Schedule
  startDate: Date;
  endDate: Date;
  timezone: string;

  // Location
  locationType: 'physical' | 'virtual';
  address?: string;
  virtualLink?: string;

  // Capacity
  capacity?: number;
  rsvps: string[]; // user IDs
  waitlist: string[]; // user IDs

  // Media
  coverPhoto?: string;

  // Attendance
  checkIns: string[]; // user IDs who actually attended

  // Post-Event
  photos?: string[];
  recap?: string;

  createdAt: Date;
  updatedAt: Date;
}
```

### ClubInventoryItem
```typescript
interface ClubInventoryItem {
  id: string;
  clubId: string;
  addedBy: string; // user ID

  // Item Info
  name: string;
  description: string;
  category: string;
  photos: string[];
  condition: 'new' | 'like-new' | 'good' | 'fair';

  // Checkout Policy
  checkoutPolicy: {
    type: 'hour' | 'day' | 'week' | 'approval-only';
    maxDuration?: number; // in hours/days
    requiresApproval: boolean;
  };

  // Location
  location: {
    type: 'club-address' | 'member-home';
    address?: string;
    custodian?: string; // user ID if at member's home
  };

  // Status
  status: 'available' | 'checked-out' | 'maintenance' | 'retired';
  currentCheckout?: {
    userId: string;
    checkoutDate: Date;
    dueDate: Date;
  };

  // History
  checkoutHistory: {
    userId: string;
    checkoutDate: Date;
    returnDate?: Date;
    condition: string;
  }[];

  quantity: number; // usually 1, but could be multiple

  createdAt: Date;
  updatedAt: Date;
}
```

---

## Components to Build

### Discovery Components:
- `ClubCard` - List/grid card
- `ClubMapView` - Map with pins
- `ClubPreviewSheet` - Bottom sheet preview
- `ClubFilterBar` - Multi-filter
- `InterestChips` - Interest tags

### Club Home Components:
- `ClubHeader` - Cover + logo + info
- `ClubTabs` - Tab navigator
- `JoinButton` - Context-aware join/leave
- `InviteSheet` - Invite members modal

### Feed Components:
- `PostCard` - Generic post card
- `PostComposer` - Create post form
- `NeedToolPost` - Special "Need a Tool" card
- `OffersList` - Tool offers
- `PollCard` - Poll with voting
- `ImageGallery` - Post images
- `CommentList` - Comments thread
- `CommentInput` - Add comment

### Inventory Components:
- `InventoryList` - Tool grid/list
- `InventoryItemCard` - Item card
- `CheckoutRequest` - Request form
- `QRCodeDisplay` - Pickup/return QR
- `CheckoutHistory` - Item history

### Event Components:
- `EventCard` - Event list item
- `EventDetail` - Full event screen
- `RSVPButton` - RSVP/Waitlist
- `AttendeeList` - Who's going
- `EventCalendar` - Calendar view
- `CheckInScanner` - QR check-in

### Admin Components:
- `MemberManagement` - Member list + roles
- `ModerationQueue` - Reported content
- `RequestApproval` - Join requests
- `ClubSettings` - Edit club
- `AnalyticsDashboard` - Club stats

---

## Mock Data Examples

**Create `utils/mock-data/clubs.ts`:**
```typescript
export const MOCK_CLUBS = [
  {
    id: 'club-1',
    name: 'Brooklyn DIY Makers',
    description: 'Local community for woodworking and home improvement',
    memberCount: 156,
    distance: 1.2,
    type: 'public',
    logo: 'https://api.dicebear.com/7.x/shapes/png?seed=brooklyn',
    location: { lat: 40.6782, lng: -73.9442 },
    interests: ['Woodworking', 'Electrical', 'General Repair'],
  },
  // ... 10-15 more clubs
];

export const MOCK_POSTS = [
  {
    id: 'post-1',
    clubId: 'club-1',
    author: { name: 'Mike Chen', avatar: '...' },
    type: 'need-tool',
    content: 'Need a miter saw this Saturday 2-6pm for deck project',
    timestamp: new Date(),
    likes: 5,
    commentCount: 3,
    offers: [
      { userId: 'user-2', message: 'I have one! Can drop it off.' },
    ],
  },
  // ... more posts
];
```

## API Endpoints (Future Backend - Not Needed for Prototype)

```
GET    /clubs
GET    /clubs/:id
POST   /clubs (create)
PATCH  /clubs/:id (update)
DELETE /clubs/:id
POST   /clubs/:id/join
POST   /clubs/:id/leave
POST   /clubs/:id/request-join
PATCH  /clubs/:id/approve-member
POST   /clubs/:id/remove-member

GET    /clubs/:id/posts
POST   /clubs/:id/posts
GET    /clubs/:id/posts/:postId
PATCH  /clubs/:id/posts/:postId
DELETE /clubs/:id/posts/:postId
POST   /clubs/:id/posts/:postId/like
POST   /clubs/:id/posts/:postId/comment

POST   /clubs/:id/posts/need-tool (special post type)
POST   /clubs/:id/posts/:postId/offer (offer tool)
POST   /clubs/:id/posts/:postId/accept-offer

GET    /clubs/:id/events
POST   /clubs/:id/events
GET    /clubs/:id/events/:eventId
PATCH  /clubs/:id/events/:eventId
DELETE /clubs/:id/events/:eventId
POST   /clubs/:id/events/:eventId/rsvp
POST   /clubs/:id/events/:eventId/check-in

GET    /clubs/:id/inventory
POST   /clubs/:id/inventory (add item)
GET    /clubs/:id/inventory/:itemId
PATCH  /clubs/:id/inventory/:itemId
DELETE /clubs/:id/inventory/:itemId
POST   /clubs/:id/inventory/:itemId/request
PATCH  /clubs/:id/inventory/:itemId/approve-request
POST   /clubs/:id/inventory/:itemId/checkout
POST   /clubs/:id/inventory/:itemId/return

GET    /clubs/:id/members
POST   /clubs/:id/invite
PATCH  /clubs/:id/members/:userId/role

POST   /clubs/:id/report (report post/member)
GET    /clubs/:id/moderation (admin only)
```

---

## Key Features

### Moderation System

#### Automated Moderation:
- **Keyword Filtering**: Profanity, spam keywords
- **Image Checks**: Inappropriate content (via AI)
- **Spam Detection**: Too many posts in short time
- **Link Scanning**: Suspicious URLs

#### Manual Moderation:
- **Report Options**:
  - Spam
  - Harassment
  - Inappropriate content
  - Scam/fraud
  - Off-topic
  - Other

- **Admin Actions**:
  - Delete post
  - Warn user
  - Suspend user (temp)
  - Ban user (permanent)
  - Appeal process

#### Auto-Actions:
- Hide post if 3+ reports (pending review)
- Flag new members posting external links
- Require approval for first 3 posts (optional club setting)

### Notification System

**Club Notifications:**
- New post in club (configurable)
- Someone responded to your post
- Event reminder (1 day before, 1 hour before)
- Tool request matches your inventory
- Admin actions (post removed, etc.)
- Join request approved/denied

**Settings** (per-club):
- All activity (noisy)
- Important only (events, direct replies)
- Mentions only
- Off

### Deep Linking

```
patio://club/:id
patio://club/:id/post/:postId
patio://club/:id/event/:eventId
patio://club/:id/inventory/:itemId
patio://club/create
```

---

## Analytics Events

```typescript
// Discovery
'club_discover_view'
'club_search'
'club_filter_apply'
'club_preview_view'

// Membership
'club_join'
'club_request_join'
'club_leave'
'club_invite_send'

// Posts
'club_post_create'
'club_post_view'
'club_post_like'
'club_post_comment'
'club_post_share'
'club_need_tool_post'
'club_tool_offer'

// Events
'club_event_create'
'club_event_view'
'club_event_rsvp'
'club_event_check_in'

// Inventory
'club_inventory_view'
'club_inventory_request'
'club_inventory_checkout'
'club_inventory_return'

// Admin
'club_create'
'club_member_approve'
'club_post_moderate'
'club_member_remove'
```

---

## Testing Checklist

- [ ] Discover clubs on map and list
- [ ] Filters work correctly
- [ ] Join public club instantly
- [ ] Request to join private club
- [ ] Screening questions display
- [ ] Admin approves/denies requests
- [ ] Create post with text and images
- [ ] Like and comment on posts
- [ ] "Need a Tool" post creates offers
- [ ] Accept offer creates booking
- [ ] Create event with all fields
- [ ] RSVP to event (with capacity check)
- [ ] Waitlist works when full
- [ ] Calendar integration adds event
- [ ] Check-in QR scanning works
- [ ] Inventory displays items
- [ ] Request item flow works
- [ ] Admin approval sends QR code
- [ ] Checkout/return QR scanning
- [ ] Create club wizard completes
- [ ] Invite members via email/link
- [ ] Admin panel shows all management tools
- [ ] Moderation queue works
- [ ] Reports get flagged
- [ ] Ban/warn actions work
- [ ] Cross-post from Learn works
- [ ] Notifications send properly

---

## File Structure

```
app/(tabs)/clubs/
  _layout.tsx                   # Clubs stack
  index.tsx                     # Discover (map + list)
  [id]/
    _layout.tsx                 # Club tabs
    index.tsx                   # Feed tab (default)
    inventory.tsx               # Inventory tab
    members.tsx                 # Members tab
    events.tsx                  # Events tab
    guides.tsx                  # Guides tab
    rules.tsx                   # Rules tab
    admin.tsx                   # Admin panel (if admin)
  post/
    [postId].tsx                # Post detail
  event/
    [eventId].tsx               # Event detail
  create.tsx                    # Create club wizard
  create-event.tsx              # Create event
  create-post.tsx               # Create post modal

components/clubs/
  discovery/
    club-card.tsx
    club-map-view.tsx
    club-preview-sheet.tsx
    club-filter-bar.tsx
    interest-chips.tsx
  home/
    club-header.tsx
    club-tabs.tsx
    join-button.tsx
    invite-sheet.tsx
  feed/
    post-card.tsx
    post-composer.tsx
    need-tool-post.tsx
    offers-list.tsx
    poll-card.tsx
    image-gallery.tsx
    comment-list.tsx
    comment-input.tsx
  inventory/
    inventory-list.tsx
    inventory-item-card.tsx
    checkout-request.tsx
    qr-code-display.tsx
    checkout-history.tsx
  events/
    event-card.tsx
    event-detail.tsx
    rsvp-button.tsx
    attendee-list.tsx
    event-calendar.tsx
    check-in-scanner.tsx
  admin/
    member-management.tsx
    moderation-queue.tsx
    request-approval.tsx
    club-settings.tsx
    analytics-dashboard.tsx

contexts/
  clubs-context.tsx             # User's clubs, memberships

utils/
  moderation.ts                 # Content filtering
  club-permissions.ts           # Role-based access
```

---

## Dependencies to Install

```bash
pnpm add react-native-maps               # Map view
pnpm add react-native-calendar-events    # Calendar integration
pnpm add react-native-qrcode-svg         # QR generation
pnpm add react-native-qrcode-scanner     # QR scanning
pnpm add expo-calendar                   # Calendar API
pnpm add react-native-image-viewing      # Image gallery
```

---

## Moderation Tools

### AI Pre-screening:
- OpenAI Moderation API for text
- Image classification for photos
- Link safety checking
- Spam pattern detection

### Review Queue UI:
- Flagged content list
- Severity levels (low, medium, high)
- Auto-actions for high severity
- Manual review interface
- Action history log
- Appeal process

### User Reputation:
- Track warnings, suspensions, bans
- Display badges: Trusted Member, Helpful
- Reduce trust score on violations
- Auto-escalate repeated offenders

---

## Cross-Tab Integrations

### With Learn:
- Share course completions to club feed
- Suggest clubs based on course categories
- "Find a study buddy" in clubs for courses

### With Marketplace:
- Tool offers link to Marketplace listings
- Club inventory separate from personal listings
- Club members get priority access to listings

### With Ask:
- Ask questions in club context
- AI suggests asking club for help
- Save AI answers to club guides

### With Me:
- Manage club memberships
- Notification settings per club
- View all club activity feed

---

## Community Guidelines

### Safety Rules:
- No harassment, bullying
- No hate speech
- No spam or self-promotion
- Respect privacy
- Tool borrowing etiquette
- Event attendance expectations

### Content Policies:
- Keep posts relevant to DIY/tools
- No external marketplace links (use Patio)
- No illegal activities
- No dangerous advice without safety warnings

---

## Next Steps After Implementation

1. Advanced search (full-text on posts)
2. Club analytics for admins
3. Suggested clubs (ML-based)
4. Club partnerships (hardware stores sponsoring)
5. Premium club features (larger capacity, custom branding)
6. Regional/national club networks
