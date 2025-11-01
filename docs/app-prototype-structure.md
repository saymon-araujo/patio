# Bottom tabs (5)

1. **Learn**
2. **Marketplace**
3. **Clubs**
4. **Ask (AI)**
5. **Me** (Profile, Wallet, Messages, Feedback)

---

## 1) Learn

Duolingo-style DIY courses and quizzes.

### Primary screens

- **Library (Home of Learn)**

  - Sections: Continue learning, Recommended, New, Categories (Electrical, Plumbing, Woodwork…).
  - Filters: difficulty, time, tool requirements, offline-available.

- **Course Detail**

  - Overview, outcomes, tool list, lessons, estimated time, badges, ratings.

- **Lesson Player**

  - Steps (video/text), quick checks, glossary, downloadable cheat-sheets, tool links.

- **Quiz / Assessment**

  - MCQ, image hotspots, sequence ordering, scenario sims; per-question explanations.

- **Leaderboard & Streaks**

  - Weekly/monthly; friends vs global; streak freeze.

- **Saved / Downloads**

  - Offline lessons, PDFs.

### Key flows

- Start/Resume course → lesson player → inline quiz → results → XP/badge → next lesson.
- Prereq gate (e.g., “Intro to Voltage” before “GFCI install”).
- Tool-aware suggestions: “Don’t own a torque wrench? → Rent nearby” (deep-link to Marketplace).
- Completion share to Clubs; ask follow-ups in **Ask** with context.

---

## 2) Marketplace

P2P rentals + buy/sell for tools and materials.

### Primary screens

- **Browse (Toggle: Rental | Buy/Sell)**

  - Tabs: Nearby (map), Trending, Categories, For You.
  - Filters: distance, price, deposit, availability calendar, condition, verified owners, delivery/pickup.

- **Listing Detail**

  - Photos/video, specs, price/day, deposit, availability, delivery options, owner rating, safety notes, add-ons (bits, blades), insurance.

- **Create Listing (Wizard)**

  - Category → title/description → photos → pricing & deposit → availability → location → delivery/pickup → verification → preview → publish.

- **Booking Flow (Rental)**

  - Dates/time → price breakdown (fees, deposit) → delivery method → payment → confirmation → in-app chat.

- **Checkout (Buy/Sell)**

  - Quantity → shipping/pickup → payment → order confirmation.

- **Orders / Rentals**

  - Upcoming, Active, Past; extend rental; report issue; request return; leave review; receipts.

- **Map**

  - Clustered pins, quick cards, “Request a tool” post.

### Key flows

- Rental with **escrow** (hold deposit) → pickup/delivery tracking → return checklist → release deposit & payout.
- Extensions & late fees.
- **Verification & Trust**: ID/KYC, selfie match, selfie-with-tool step; address verification.
- **Disputes**: photo evidence, repair estimate, partial deposit capture.
- **Messaging**: listing-scoped chat, quick replies, image share.
- **Club overlays**: show tools available within a club inventory.

---

## 3) Clubs

Local DIY communities, tool libraries, events and discussions.

### Primary screens

- **Discover Clubs** (Map + List)

  - Nearby radius, interests, size, public/private.

- **Club Home**

  - Tabs: Feed (posts, tutorials), Inventory (shared tools/materials), Members, Events, Guides, Rules.

- **Post/Thread**

  - Text, images, checklists, “Need a tool” request, polls.

- **Events**

  - Workshops, fix-it days; RSVP, waitlist, calendar add.

- **Club Inventory**

  - Items with checkout policy (hour/day), pickup windows; request → approval → QR pickup.

- **Create Club / Admin**

  - Invite links, roles, moderation, onboarding checklist.

### Key flows

- Join public club or request to join private (questions + mod approval).
- Post “Need a \_\_\_ tomorrow 2–6pm” → offers appear → one-tap book.
- Cross-post a Learn certificate to a club (“I finished GFCI—who can supervise my first install?”).
- **Moderation**: report post/listing/member; automated keyword + image checks.

---

## 4) Ask (AI)

AI-powered DIY search & assistant.

### Primary screens

- **Ask Home**

  - Prompt box, suggested prompts (“Why does my GFCI trip?”), recent chats, pinned answers.

- **Conversation**

  - Streaming answer, source links (video/articles), follow-ups, tool/materials recommendations.

- **Topic Pages**

  - Curated answers + best sources; “Related courses” and “Tools nearby” cards.

### Key flows

- Ask with context injection: from a Learn lesson, a Marketplace listing, or a Club post.
- “Show steps as checklist” → export to Notes/Task.
- “Find a tool nearby for this step” → pre-filtered Marketplace.
- “Explain safety risks for my scenario” → highlights + PPE list.
- Save/share answers to Clubs; convert to guide (admin curated).

---

## 5) Me

Your identity, activity, wallet, feedback, and settings.

### Primary screens

- **Dashboard**

  - Cards: Rentals (current/upcoming), Sales, Orders, Club tasks, Course progress, Streaks.

- **Messages**

  - Threaded chat (rentals, clubs, orders, support).

- **Wallet**

  - Balances, payouts, connected bank; deposits on hold; receipts; tax docs.

- **Verifications**

  - ID, selfie, address, tool-owner verification; status and re-verify flow.

- **Reviews & Reputation**

  - Ratings as renter/owner; badges (Safety-First, On-time).

- **Saved**

  - Saved listings, clubs, courses, Ask answers.

- **Feedback**

  - Feature requests, bug reports, vote on roadmap; announcements.

- **Settings**

  - Profile, notifications, language, location radius, privacy.

### Key flows

- Onboarding (role intent: learner / renter / tool owner / club leader) → tailored home surfaces.
- Payout setup → KYC → test micropayment → enable payouts.
- Export data; delete account; GDPR.

---

## Cross-cutting UX

- **Global Create FAB** (center of tab bar or sticky):

  - _List a tool_, _Post to a club_, _Create event_, _Ask AI_, _Add a course note_.

- **Global Search** with vertical filters (All, Tools, Courses, Clubs, Answers).
- **Notifications**: rentals, returns, bids/offers, club posts, AI answer ready, course streaks.
- **Safety & Trust**: verifications, insurance/coverage screen, safety tips before risky actions.
- **Content moderation**: AI pre-screen + human review queues; appeals.
- **Offline**: lesson downloads; cached chat; read-only Ask history.
- **Deep links**: `patio://listing/123`, `patio://club/abc`, `patio://ask/xyz`.

---

## Navigation model (RN/Expo suggestion)

- **BottomTabNavigator (5 tabs)**

  - Each tab wraps a **Stack** (for detail screens) and may embed a **TopTabs** (e.g., Marketplace Rental | Buy/Sell).
  - Shared **Modal Stack** for Create Listing, Booking, Payment, Report Issue.
  - **Root Sheet** for quick filters and create actions.

---

## Core flows as step lists (ship-ready)

**A) Book a Rental**

1. Marketplace → Listing → Select dates → Availability check
2. Choose pickup/delivery → Price breakdown (rental, fees, deposit)
3. Pay (Apple/Google Pay / card) → Confirmation → Chat opens
4. Pickup: QR scan + photos; in-use timer
5. Return: checklist + photos → deposit released → review both sides

**B) List a Tool**

1. Create → Category → Photos/Video
2. Title/description/specs → Pricing & deposit → Availability
3. Delivery options → Location & radius → Verification check
4. Preview → Publish → Promote to Clubs

**C) Post “Need a Tool”**

1. Clubs → “Need a tool” → item + time window + radius
2. Receive offers → pick one → instant booking template → pay deposit
3. After return → thanks/review

**D) Take a Course & Ask**

1. Learn → Course → Lesson → inline quiz
2. Tap “Ask about this step” → Ask opens with context → answer + sources
3. Save answer → share to Club → get human tips

---

## Data primitives (minimal)

- **User** (id, role flags, verifications, ratings)
- **Listing** (tool, owner, pricing, availability, location)
- **Booking** (listing, renter, dates, status, deposit, payment intents)
- **Order** (buy/sell)
- **Club** (members, posts, events, inventory)
- **Course** → **Lesson** → **Attempt**
- **Message** (thread id + type)
- **Review** (subject user/listing, score, text)
- **Wallet** (balance, payouts, holds)

---

## Analytics (examples)

- `learn_start_course`, `learn_quiz_submit`, `marketplace_view_listing`,
- `marketplace_create_listing_step`, `booking_confirm`, `booking_extend`,
- `club_post_create`, `club_need_tool_create`, `ask_question`, `ask_save_answer`,
- `verify_id_success`, `payout_add_bank_success`.

---

## Why this split works

- **Learn** builds skill & retention.
- **Marketplace** drives revenue (take-rate on rentals/sales + optional insurance).
- **Clubs** compounds supply/demand locally and nurtures trust.
- **Ask** reduces friction & creates value loops into Learn/Marketplace.
- **Me** concentrates identity, money, messages, and feedback.

If you want, I can turn this into:

- a screen map with exact routes (`/learn/library`, `/marketplace/listing/:id`, …),
- a component checklist (cards, chips, calendars, map pins), or
- a skeleton Expo Router + NativeWind project structure to kick off development.
