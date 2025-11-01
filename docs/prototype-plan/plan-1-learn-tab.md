# Plan 1: Learn Tab - Duolingo for DIY

## Overview
Interactive learning platform with courses, quizzes, leaderboards, and gamification. Modeled after Duolingo's successful learning mechanics.

## 🎨 PROTOTYPE MODE - MOCK DATA ONLY
**This plan uses hardcoded mock data for visual demonstration.**
- Create `utils/mock-data/courses.ts` with 10-15 sample courses
- Create `utils/mock-data/lessons.ts` with sample lesson content
- Simulate progress tracking with React Context (no persistence)
- Use setTimeout to simulate video loading, quiz submissions
- Focus on demonstrating UI/UX flows and interactions

---

## Screens to Implement

### 1. Library (Home) - `/learn/library` or `/(tabs)/learn/index.tsx`

**Purpose**: Main discovery and learning hub.

**Sections:**

#### A) Continue Learning
- **Layout**: Horizontal scrollable cards
- **Data**: User's in-progress courses
- **Card Content**:
  - Course thumbnail/icon
  - Course title
  - Progress bar (% complete)
  - "Continue" button
  - Next lesson preview

#### B) Recommended
- **Layout**: Grid or vertical list
- **Logic**: Based on completed courses, skill level, user roles
- **Card Content**:
  - Course thumbnail
  - Title, category badge
  - Difficulty indicator
  - Estimated time
  - Rating (stars)
  - Prerequisites indicator

#### C) New Courses
- **Layout**: Horizontal carousel
- **Filter**: Recently added courses
- **Badge**: "New" label on cards

#### D) Categories
- **Layout**: Grid of category cards
- **Categories**:
  - Electrical
  - Plumbing
  - Woodworking
  - Carpentry
  - HVAC
  - Masonry
  - Painting
  - Landscaping
  - General Home Repair
  - Safety & Tools

**Category Card:**
- Icon/illustration
- Category name
- Course count
- Tap → filtered course list

#### E) Filters & Search
- **Filter Bar**:
  - Difficulty (Beginner, Intermediate, Advanced)
  - Time (< 30min, 30-60min, 1-2hrs, 2+ hrs)
  - Tools Required (None, Basic, Specialized)
  - Offline Available (toggle)
- **Search**: Global search with autocomplete
- **Sort**: Popular, New, A-Z, Difficulty

---

### 2. Course Detail - `/learn/course/:id`

**Header:**
- Course thumbnail (large)
- Title
- Category badge
- Difficulty level
- Rating (stars + count)
- Bookmark icon (save course)

**Tabs:**

#### A) Overview Tab
- Description (expandable)
- Learning outcomes (bulleted list)
- Estimated time
- Prerequisites (linked courses)
- Tools required (linked to Marketplace)
- Instructor/author info
- Share button

#### B) Lessons Tab
- **Lesson List** (ordered):
  - Lesson number + title
  - Duration
  - Completion checkmark
  - Lock icon (if prerequisite not met)
  - Tap → navigate to lesson player

- **Module Grouping**: Lessons grouped into modules/chapters

#### C) Reviews Tab
- Overall rating breakdown (5-star distribution)
- User reviews (avatar, name, rating, text, date)
- "Write a Review" button (if completed)

**CTA Buttons:**
- "Start Course" (if not started)
- "Continue from Lesson X" (if in-progress)
- "Restart Course" (if completed)

---

### 3. Lesson Player - `/learn/lesson/:id`

**Layout**: Full-screen immersive player.

**Header:**
- Back button
- Lesson title
- Progress: "Lesson 3/12"
- Bookmark icon

**Content Area:**

#### A) Video/Text Steps
- **Video Player** (if video lesson):
  - Play/pause controls
  - Seek bar with thumbnails
  - Speed control (0.5x, 1x, 1.5x, 2x)
  - Fullscreen toggle
  - Caption/subtitles toggle

- **Text Steps** (if text lesson):
  - Step-by-step instructions
  - Numbered list
  - Images/diagrams
  - Expandable details
  - Tool callouts (tap → Marketplace deep-link)

#### B) Quick Checks (Inline Quiz)
- Appears after key sections
- MCQ with 2-4 options
- Immediate feedback (correct/incorrect)
- Explanation on answer
- Must pass to continue (or skip option)

#### C) Sidebar Panels (Swipeable):
- **Glossary**:
  - Tap underlined terms → definition popup
  - Search glossary
  - Alphabetical list

- **Notes**:
  - Add personal notes per lesson
  - Timestamp links to video
  - Export notes as PDF

- **Resources**:
  - Downloadable cheat-sheets (PDF)
  - External links
  - Related courses

**Footer Navigation:**
- "Previous Lesson" button
- Progress dots (lessons in course)
- "Next Lesson" button
- "Mark as Complete" button

**Completion Flow:**
- Mark complete → XP animation (+50 XP)
- Badge unlock (if milestone)
- "Next Lesson" or "Finish Course"

---

### 4. Quiz / Assessment - `/learn/quiz/:id`

**Types of Questions:**

#### A) Multiple Choice (MCQ)
- Question text + optional image
- 4 answer choices
- Single selection
- Submit → immediate feedback
- Explanation panel

#### B) Image Hotspots
- Image with multiple clickable zones
- "Tap the GFCI outlet" → user taps image
- Correct zone → success, incorrect → retry

#### C) Sequence Ordering
- "Put these steps in order"
- Drag-and-drop list items
- Submit → check order

#### D) Scenario Simulations
- "What would you do in this situation?"
- Multiple choice with context
- Safety-focused scenarios

**Quiz UI:**
- Progress: "Question 3/10"
- Timer (optional, for certifications)
- Skip button (loses points)
- Submit button
- Per-question explanations (after answer)

**Results Screen:**
- Score: "8/10 - 80%"
- Pass/Fail indicator (need 70%+ to pass)
- XP earned
- Badges unlocked
- "Review Answers" button
- "Retake Quiz" or "Continue to Next Lesson"

---

### 5. Leaderboard & Streaks - `/learn/leaderboard`

**Tabs:**
- Weekly Leaderboard
- Monthly Leaderboard
- All-Time Leaderboard

**Toggle:**
- Friends view (if connected)
- Global view (all users)

**Leaderboard Entry:**
- Rank (#1, #2, #3 with medals)
- Avatar
- Username
- XP score
- Level indicator

**Your Stats Card:**
- Current rank
- Total XP
- Level progress bar
- Current streak (🔥 7 days)

**Streak Panel:**
- Calendar view showing streak days
- "Freeze Streak" button (1 per month)
- Streak milestones (7, 30, 100, 365 days)
- Reminder settings

---

### 6. Saved / Downloads - `/learn/saved`

**Tabs:**

#### A) Saved Courses
- Bookmarked courses
- Quick access to continue
- Remove from saved

#### B) Downloaded Lessons
- Offline-available lessons
- File size indicator
- Download status
- Delete downloads

#### C) Saved PDFs
- Cheat-sheets
- Certificates
- Notes exports
- Open in external viewer

**Storage Management:**
- Total storage used
- "Clear All Downloads" button

---

## Key User Flows

### Flow 1: Start a New Course
```
Library → Browse/Search → Course Detail → "Start Course"
  → Lesson 1 Player → Complete → Quick Check (quiz)
  → Results (+XP) → Next Lesson or Back to Library
```

### Flow 2: Complete Course with Certification
```
Lesson Player → Last Lesson → Final Quiz/Assessment
  → Pass (70%+) → Certificate Earned → Share to Clubs
  → Download Certificate PDF
```

### Flow 3: Prerequisite Gating
```
Course Detail → "Start Course" → Check Prerequisites
  ├─ Met → Start Lesson 1
  └─ Not Met → Show required courses → "Start [Prereq Course]"
```

### Flow 4: Tool-Aware Suggestions
```
Lesson Player → Tool mentioned ("torque wrench")
  → "Don't own this tool?" banner
  → "Rent nearby" button → Deep-link to Marketplace
  → Pre-filtered search for torque wrenches in user's area
```

### Flow 5: Cross-Tab Integration
```
Complete Course → Results Screen
  → "Share to Club" button → Select club
  → Post: "I just completed [Course]! Who can supervise my first install?"
  → Navigate to Clubs tab with draft post
```

### Flow 6: Ask Integration
```
Lesson Player → Stuck on a step
  → "Ask about this step" button → Opens Ask tab
  → Context injected: "I'm learning [Course] - [Lesson]. [Question]"
  → AI provides answer with sources
  → "Related tools" → Marketplace link
```

---

## Data Models

### Course
```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // minutes
  thumbnail: string;
  instructor: User;
  rating: number;
  reviewCount: number;
  prerequisites: Course[];
  toolsRequired: Tool[];
  badges: Badge[];
  lessons: Lesson[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Lesson
```typescript
interface Lesson {
  id: string;
  courseId: string;
  order: number;
  title: string;
  type: 'video' | 'text' | 'interactive';
  duration: number; // minutes
  content: string | VideoURL;
  steps: Step[];
  quickChecks: QuizQuestion[];
  resources: Resource[];
  glossaryTerms: GlossaryTerm[];
  toolsUsed: Tool[];
}
```

### UserProgress
```typescript
interface UserProgress {
  userId: string;
  courseId: string;
  currentLessonId: string;
  completedLessons: string[];
  quizScores: { lessonId: string; score: number; attempts: number }[];
  xpEarned: number;
  badges: Badge[];
  lastAccessedAt: Date;
  completedAt?: Date;
}
```

### Streak
```typescript
interface Streak {
  userId: string;
  currentStreak: number; // days
  longestStreak: number;
  lastActivityDate: Date;
  freezeAvailable: boolean;
  freezeUsedThisMonth: boolean;
}
```

---

## Gamification Mechanics

### XP System:
- Complete lesson: +50 XP
- Pass quiz (80%+): +100 XP
- Complete course: +500 XP
- First course in category: +100 bonus XP
- Daily streak: +10 XP/day

### Level System:
- Level 1: 0-500 XP
- Level 2: 500-1500 XP
- Level 3: 1500-3000 XP
- ... (exponential scaling)

### Badges:
- "First Steps" - Complete first lesson
- "Course Crusher" - Complete first course
- "Electrician" - Complete all Electrical courses
- "Week Warrior" - 7-day streak
- "Century" - 100-day streak
- "Top 10" - Reach top 10 on leaderboard
- "Quiz Master" - 100% on 10 quizzes

---

## Components to Build

### Course Components:
- `CourseCard` - Grid/list card
- `CourseProgress` - Progress bar with %
- `CategoryCard` - Category tile
- `FilterBar` - Multi-filter selector
- `CourseHeader` - Detail page header
- `LessonListItem` - Lesson with lock/check states

### Lesson Components:
- `LessonPlayer` - Main player wrapper
- `VideoPlayer` - Custom video controls
- `TextStepView` - Text lesson renderer
- `QuickCheck` - Inline quiz popup
- `GlossaryPanel` - Slide-in glossary
- `ResourceList` - Downloadable items

### Quiz Components:
- `QuizQuestion` - Question wrapper
- `MCQOptions` - Radio button choices
- `ImageHotspot` - Tappable image zones
- `SequenceOrderer` - Drag-drop list
- `QuizResults` - Score screen with XP animation

### Gamification Components:
- `XPBadge` - XP counter with animation
- `LevelProgress` - Level progress bar
- `BadgeUnlock` - Badge unlock modal
- `StreakCounter` - Flame icon + days
- `LeaderboardEntry` - Rank list item

---

## Mock Data Examples

**Create `utils/mock-data/courses.ts`:**
```typescript
export const MOCK_COURSES = [
  {
    id: 'course-1',
    title: 'Introduction to GFCIs',
    category: 'Electrical',
    difficulty: 'beginner',
    estimatedTime: 45,
    thumbnail: 'https://picsum.photos/seed/gfci/400/300',
    rating: 4.8,
    reviewCount: 124,
    progress: 0.65, // 65% complete for "Continue Learning"
  },
  // ... 10-15 more courses
];

export const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Sarah Johnson', xp: 12450, avatar: '...' },
  { rank: 2, name: 'Mike Chen', xp: 11200, avatar: '...' },
  // ... more entries
];
```

## API Endpoints (Future Backend - Not Needed for Prototype)

```
GET    /courses
GET    /courses/:id
GET    /courses/category/:category
POST   /courses/:id/enroll
GET    /lessons/:id
POST   /lessons/:id/complete
GET    /quizzes/:id
POST   /quizzes/:id/submit
GET    /user/progress
GET    /user/streak
POST   /user/streak/freeze
GET    /leaderboard
GET    /leaderboard/friends
GET    /badges
```

---

## Offline Support

**Downloadable Content:**
- Lesson videos (compressed)
- Text lessons (cached JSON)
- PDFs (cheat-sheets, certificates)
- Images/diagrams

**Offline Queue:**
- Store quiz answers locally
- Sync when online
- XP/progress updates queued

**Storage Strategy:**
- Use SQLite for lesson data
- File system for videos/PDFs
- Max storage limit warning

---

## Analytics Events

```typescript
// Course Discovery
'learn_browse_library'
'learn_search_courses'
'learn_filter_apply'
'learn_category_select'

// Course Engagement
'learn_course_view'
'learn_course_enroll'
'learn_course_share'
'learn_course_bookmark'

// Lesson Activity
'learn_lesson_start'
'learn_lesson_complete'
'learn_video_play'
'learn_video_seek'
'learn_quick_check_submit'

// Quiz Activity
'learn_quiz_start'
'learn_quiz_submit'
'learn_quiz_pass'
'learn_quiz_fail'
'learn_quiz_retake'

// Gamification
'learn_xp_earned'
'learn_level_up'
'learn_badge_unlock'
'learn_streak_milestone'
'learn_leaderboard_view'

// Cross-Tab
'learn_tool_link_tap' // → Marketplace
'learn_ask_integration' // → Ask
'learn_share_to_club' // → Clubs
```

---

## Testing Checklist

- [ ] Library loads with all sections
- [ ] Continue Learning shows in-progress courses
- [ ] Filters work correctly (difficulty, time, tools)
- [ ] Course detail shows all information
- [ ] "Start Course" enrolls user
- [ ] Lesson player loads video/text content
- [ ] Video controls work (play, pause, seek, speed)
- [ ] Quick checks pause lesson until answered
- [ ] Quiz questions render correctly (MCQ, hotspot, sequence)
- [ ] Quiz results calculate score accurately
- [ ] XP is awarded on completion
- [ ] Badges unlock at milestones
- [ ] Leaderboard updates in real-time
- [ ] Streak counter increments daily
- [ ] Streak freeze works (1 per month)
- [ ] Offline downloads work
- [ ] Downloaded lessons play offline
- [ ] Prerequisite gating blocks locked courses
- [ ] Tool links deep-link to Marketplace
- [ ] Share to Clubs opens post composer

---

## File Structure

```
app/(tabs)/learn/
  _layout.tsx                   # Learn stack navigator
  index.tsx                     # Library home
  course/
    [id].tsx                    # Course detail
  lesson/
    [id].tsx                    # Lesson player
  quiz/
    [id].tsx                    # Quiz screen
  leaderboard.tsx               # Leaderboard & streaks
  saved.tsx                     # Saved/downloads

components/learn/
  course/
    course-card.tsx
    course-header.tsx
    course-progress.tsx
    category-card.tsx
    filter-bar.tsx
    lesson-list-item.tsx
  lesson/
    lesson-player.tsx
    video-player.tsx
    text-step-view.tsx
    quick-check.tsx
    glossary-panel.tsx
    resource-list.tsx
  quiz/
    quiz-question.tsx
    mcq-options.tsx
    image-hotspot.tsx
    sequence-orderer.tsx
    quiz-results.tsx
  gamification/
    xp-badge.tsx
    level-progress.tsx
    badge-unlock-modal.tsx
    streak-counter.tsx
    leaderboard-entry.tsx

contexts/
  learn-context.tsx             # Course progress state
  gamification-context.tsx      # XP, levels, badges

utils/
  learn-storage.ts              # Offline downloads
  xp-calculator.ts              # XP/level logic
  prerequisite-checker.ts       # Course access logic
```

---

## Dependencies to Install

```bash
pnpm add expo-video              # Video player
pnpm add expo-file-system        # Downloads
pnpm add expo-sqlite             # Offline data
pnpm add react-native-draggable-flatlist  # Sequence ordering
pnpm add lottie-react-native     # XP animations
```

---

## Design Specifications

### Colors (Patio Design System):
- Primary CTA buttons: Blue `#0066FF`
- Progress bars: Blue gradient
- Completed: Green `#10B981`
- Locked: Gray `#9CA3AF`
- Error: Red `#EF4444`

### Course Card:
- White background, shadow-md
- Rounded-lg (12px)
- Thumbnail: 16:9 aspect ratio
- Padding: 16px
- Gap between elements: 12px

### Lesson Player:
- Full-screen (no tab bar)
- Video: 16:9 aspect ratio
- Controls: Auto-hide after 3s
- Quick Check: Modal overlay, white card, rounded-2xl

### Quiz Results:
- Score circle: Animated stroke
- XP counter: Count-up animation
- Badge: Scale-in animation from center
- Confetti on pass (use lottie)

---

## Accessibility

- Video captions/subtitles
- Screen reader labels on all interactive elements
- Text contrast meets WCAG AA
- Focus indicators on keyboard navigation
- Adjustable text size
- High contrast mode support

---

## Next Steps After Implementation

1. Integration with Marketplace (tool suggestions)
2. Integration with Ask (AI help on lessons)
3. Integration with Clubs (share completions)
4. Analytics implementation
5. A/B testing on quiz formats
6. Course content creation pipeline
