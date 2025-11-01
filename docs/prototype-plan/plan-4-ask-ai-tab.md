# Plan 4: Ask (AI) Tab - AI-Powered DIY Assistant

## Overview
AI-powered search engine and assistant for DIY questions. Described as "Perplexity for makers" - provides quick, reliable answers with sources, tools, and safety information.

## 🎨 PROTOTYPE MODE - MOCK DATA ONLY
**This plan uses hardcoded mock data for visual demonstration.**
- Create `utils/mock-data/conversations.ts` with 5-10 sample AI conversations
- Create `utils/mock-data/ai-responses.ts` with pre-written answers to common questions
- Simulate streaming text with character-by-character animation (no real AI)
- Mock sources with hardcoded links (YouTube, articles)
- Use setTimeout to simulate "AI thinking" delay (2-3 seconds)
- Focus on demonstrating chat UI, streaming effect, and source citations

---

## Screens to Implement

### 1. Ask Home - `/ask` or `/(tabs)/ask/index.tsx`

**Header:**
- **Greeting**: Dynamic based on time
  - "Good morning, DIYer"
  - "Happy Saturday, DIYer"
  - "Good evening, DIYer"

- **BETA Badge**: Blue pill badge in top-right

**Main Content:**

#### A) Search/Prompt Input
- **Large Search Box**:
  - Placeholder: "Ask any DIY question..."
  - Voice input button (microphone icon)
  - Auto-focus on screen load
  - Autocomplete suggestions as user types

#### B) Suggested Prompts (Scrollable Chips)
- "Why does my GFCI trip?"
- "How to install a ceiling fan?"
- "What size wire for 20A circuit?"
- "How to fix a leaky faucet?"
- "Best way to cut plywood straight?"
- "Difference between drywall screws?"
- Dynamic based on:
  - User's Learn courses
  - Trending questions
  - Seasonal relevance

#### C) Recent Chats
- **List of Previous Conversations**:
  - Question preview (first line)
  - Timestamp
  - Topic icon/category
  - Swipe to delete
  - Tap → Resume conversation

#### D) Pinned Answers
- **User's Saved Answers**:
  - Question title
  - Snippet of answer
  - Pin icon
  - Tap → View full answer

#### E) Topic Shortcuts (Optional)
- **Quick Access Cards**:
  - Electrical
  - Plumbing
  - Woodworking
  - Safety
  - Tap → Topic page with curated content

**Empty State** (No recent chats):
- Illustration
- "Ask anything about DIY"
- Suggested prompts (larger)

---

### 2. Conversation - `/ask/chat/:id`

**Layout**: Full-screen chat interface.

#### A) Header
- Back button
- Question title (truncated)
- Share button
- 3-dot menu:
  - Pin conversation
  - Save answer
  - Share to Club
  - Delete conversation

#### B) Chat Messages

**User Message Bubble:**
- Right-aligned
- Blue background
- White text
- Timestamp

**AI Response Bubble:**
- Left-aligned
- White background (card)
- Black text
- Streaming effect (typewriter)

**Response Structure:**

1. **Main Answer** (Markdown formatted):
   - Headers, lists, bold, code blocks
   - Step-by-step instructions (numbered)
   - Safety warnings (highlighted in red/yellow)
   - Tool mentions (linked to Marketplace)

2. **Sources Section**:
   - "Sources" header
   - **Source Cards** (1-5):
     - Thumbnail (if video/article has image)
     - Source title
     - Source type: Video, Article, Forum, Manual
     - Platform: YouTube, DIY.stackexchange, manufacturer site
     - Tap → Open in browser or in-app viewer

3. **Related Tools/Materials Card** (if applicable):
   - "Tools you'll need" header
   - Tool chips (name + icon)
   - "Find nearby" button → Marketplace search (pre-filtered)

4. **Safety Warnings** (if applicable):
   - Red/yellow alert box
   - PPE required:
     - Safety glasses
     - Gloves
     - Dust mask
     - Ear protection
   - Hazard callouts (electrical, chemical, fall risk)
   - "Read safety guide" link

5. **Related Courses Card** (if applicable):
   - "Want to learn more?" header
   - Course card (from Learn tab)
   - "Start Course" button → Learn tab

6. **Follow-up Suggestions**:
   - 3-5 related question chips
   - "What tools do I need?"
   - "How long will this take?"
   - "What could go wrong?"
   - Tap → Auto-fills input

#### C) Input Bar (Bottom)
- Text input: "Ask a follow-up..."
- Voice button
- Send button (blue, disabled until text entered)

#### D) Loading State
- Skeleton loader for answer
- Pulsing animation
- "Searching trusted sources..." message

#### E) Error State
- "Couldn't find a reliable answer"
- Suggest rephrasing
- "Ask the community" button → Clubs

---

### 3. Topic Pages - `/ask/topic/:slug`

**Purpose**: Curated answers for common topics.

**Header:**
- Topic name (e.g., "Electrical Safety")
- Icon
- Breadcrumb: Ask > Topics > Electrical Safety

**Sections:**

#### A) Featured Answer
- Top curated answer for topic
- "What is a GFCI and why is it important?"
- Full answer with sources
- Save/share buttons

#### B) Common Questions
- List of frequent questions
- "How to wire a 3-way switch?"
- "What gauge wire for outlets?"
- "GFCI vs AFCI - what's the difference?"
- Tap → Full answer

#### C) Related Courses Card
- Courses from Learn tab matching topic
- "Introduction to Electrical" course
- "Start Learning" button

#### D) Tools Nearby Card
- Pre-filtered Marketplace results
- Tools related to topic
- "Voltage tester - 0.5 mi away"
- Quick browse carousel

#### E) Expert Contributors (Optional)
- Users with high ratings in topic
- "Ask an expert" button → Direct message

---

## Context-Aware Ask Integration

### From Learn Tab:
```
Lesson Player → User stuck on a step
  → "Ask about this step" button
  → Opens Ask tab with context:
      "I'm taking the course '[Course Name]', lesson '[Lesson Name]'.
       I'm stuck on: [step description].
       [User's question]"
  → AI has full context
  → Answer references course material
  → Suggest related lessons
```

### From Marketplace Listing:
```
Listing Detail → Tool description unclear
  → "Ask about this tool" button
  → Context: Tool specs, category, photos
  → Question: "What's this tool used for?"
  → AI explains use cases
  → Suggests compatible tools/materials
  → Safety tips for using tool
```

### From Club Post:
```
Club Post → Technical discussion
  → "Ask AI" button in post menu
  → Context: Post content, club topic
  → Question about specific technique
  → Answer posted as comment (optional)
  → Or opened in Ask tab
```

---

## AI Backend Architecture

### AI Provider:
- **Primary**: OpenAI GPT-4 or Claude (Anthropic)
- **Fallback**: Perplexity API or custom RAG

### Prompt Engineering:

```typescript
const systemPrompt = `
You are a DIY assistant for Patio, a platform for learning, sharing, and building.

Guidelines:
- Provide clear, step-by-step answers
- Always prioritize safety (mention PPE, hazards)
- Reference tools/materials from Patio's marketplace
- Suggest relevant courses from Patio's learning platform
- Include trusted sources (videos, articles, manuals)
- Use simple language, avoid jargon unless explained
- Warn about code violations (electrical, plumbing permits)
- Discourage dangerous DIY (structural, gas, high-voltage)

Context: ${context}
User question: ${question}
`;
```

### Response Format:
```json
{
  "answer": "markdown formatted answer",
  "sources": [
    {
      "title": "How to Install a GFCI Outlet",
      "url": "https://...",
      "type": "video",
      "platform": "YouTube",
      "thumbnail": "https://..."
    }
  ],
  "tools": ["Wire stripper", "Voltage tester", "Screwdriver"],
  "safety": {
    "ppe": ["Safety glasses", "Insulated gloves"],
    "hazards": ["Electrical shock", "Arc flash"],
    "warnings": ["Turn off circuit breaker before work"]
  },
  "relatedCourses": ["course-id-1", "course-id-2"],
  "followUps": [
    "What tools do I need?",
    "How long will this take?",
    "Do I need a permit?"
  ]
}
```

### RAG (Retrieval Augmented Generation):
- **Vector Database**: Pinecone or Weaviate
- **Indexed Content**:
  - Patio course transcripts
  - Trusted DIY articles (scraped)
  - Tool manuals (PDFs)
  - Building codes (NEC, UPC, IBC)
  - Safety data sheets

- **Retrieval Flow**:
  1. User question → Embed with OpenAI embeddings
  2. Vector search → Top 5-10 relevant chunks
  3. Pass to LLM with context
  4. Generate answer with citations

---

## Data Models

### Conversation
```typescript
interface Conversation {
  id: string;
  userId: string;
  title: string; // First question, truncated

  // Context (if launched from another tab)
  context?: {
    source: 'learn' | 'marketplace' | 'club';
    sourceId: string; // courseId, listingId, postId
    sourceTitle: string;
    metadata: Record<string, any>;
  };

  messages: Message[];

  // Status
  pinned: boolean;
  archived: boolean;

  createdAt: Date;
  updatedAt: Date;
}
```

### Message
```typescript
interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';

  // Content
  content: string;

  // AI Response specific
  sources?: Source[];
  tools?: string[];
  safety?: SafetyInfo;
  relatedCourses?: string[];
  followUpSuggestions?: string[];

  // Metadata
  model?: string; // "gpt-4", "claude-3"
  tokens?: number;
  latency?: number; // ms

  timestamp: Date;
}
```

### Source
```typescript
interface Source {
  title: string;
  url: string;
  type: 'video' | 'article' | 'forum' | 'manual' | 'code';
  platform?: string; // "YouTube", "Stack Exchange"
  thumbnail?: string;
  snippet?: string; // Text excerpt
  relevanceScore?: number;
}
```

### SavedAnswer
```typescript
interface SavedAnswer {
  id: string;
  userId: string;
  conversationId: string;
  messageId: string; // AI response message

  // Saved content
  question: string;
  answer: string;
  sources: Source[];

  // Organization
  tags: string[]; // user-added tags
  topic?: string; // auto-categorized

  savedAt: Date;
}
```

---

## Components to Build

### Ask Home Components:
- `AskHeader` - Greeting + BETA badge
- `SearchInput` - Large prompt input with voice
- `SuggestedPrompts` - Chip carousel
- `RecentChatsList` - Conversation history
- `PinnedAnswers` - Saved answers
- `TopicShortcuts` - Quick topic access

### Conversation Components:
- `ChatInterface` - Main chat screen
- `MessageBubble` - User/AI message
- `StreamingText` - Typewriter effect
- `SourceCard` - Source with thumbnail
- `ToolsList` - Tools needed chips
- `SafetyAlert` - Safety warnings box
- `RelatedCoursesCard` - Course suggestions
- `FollowUpChips` - Suggested questions
- `ChatInput` - Input with voice
- `LoadingSkeleton` - Answer loading state

### Topic Components:
- `TopicHeader` - Topic name + icon
- `FeaturedAnswer` - Top answer
- `QuestionList` - Common questions
- `ExpertList` - Topic experts (optional)

### Utility Components:
- `MarkdownRenderer` - Render AI markdown
- `ImageViewer` - View source images
- `VideoEmbed` - Embed YouTube videos
- `CodeBlock` - Syntax highlighted code

---

## Mock Data Examples

**Create `utils/mock-data/ai-responses.ts`:**
```typescript
export const MOCK_AI_RESPONSES = {
  'why does my gfci trip': {
    answer: `A GFCI (Ground Fault Circuit Interrupter) trips when it detects a ground fault...`,
    sources: [
      {
        title: 'Understanding GFCI Outlets',
        url: 'https://youtube.com/watch?v=example',
        type: 'video',
        platform: 'YouTube',
        thumbnail: 'https://picsum.photos/seed/gfci/300/200',
      },
    ],
    tools: ['Voltage Tester', 'Multimeter'],
    safety: {
      ppe: ['Safety glasses', 'Insulated gloves'],
      hazards: ['Electrical shock'],
      warnings: ['Turn off circuit breaker before testing'],
    },
  },
  // ... more pre-written answers
};

// Simulate streaming
export const mockStreamResponse = async (question: string, onChunk: (text: string) => void) => {
  const response = MOCK_AI_RESPONSES[question.toLowerCase()] || { answer: 'Mock answer...' };
  const words = response.answer.split(' ');

  for (let i = 0; i < words.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 50));
    onChunk(words.slice(0, i + 1).join(' '));
  }
};
```

## API Endpoints (Future Backend - Not Needed for Prototype)

```
GET    /ask/conversations
POST   /ask/conversations (create new chat)
GET    /ask/conversations/:id
DELETE /ask/conversations/:id
PATCH  /ask/conversations/:id/pin
PATCH  /ask/conversations/:id/archive

POST   /ask/message (send question, stream response)
GET    /ask/message/:id

GET    /ask/topics
GET    /ask/topics/:slug

POST   /ask/save-answer
GET    /ask/saved
DELETE /ask/saved/:id

GET    /ask/suggested-prompts

// AI Backend
POST   /ai/chat (streaming endpoint)
POST   /ai/embed (for vector search)
GET    /ai/search-vectors (RAG retrieval)
```

---

## Key User Flows

### Flow 1: Simple Question
```
Ask Home → Type question → Send
  → Loading animation (3-5 seconds)
  → Streaming answer appears
  → Sources load below
  → Tool suggestions appear
  → Follow-up questions suggested
  → User asks follow-up → Conversation continues
```

### Flow 2: Context-Aware from Learn
```
Learn Lesson → Stuck on step
  → "Ask about this step" button
  → Ask tab opens with pre-filled context
  → Question: "How do I [specific step]?"
  → AI response:
      - Specific to course material
      - References lesson content
      - Suggests rewatching section
      - Provides additional tips
  → "Back to Lesson" quick link
```

### Flow 3: Save & Share Answer
```
AI Response → "Save Answer" button
  → Answer saved to Me → Saved
  → Optional: Add tags
  → "Share to Club" button
  → Select club
  → Post created: "Great answer from Patio AI: [question]"
  → Answer embedded in post
  → Navigate to Clubs → Post published
```

### Flow 4: Tool Discovery
```
Ask: "How to install recessed lighting?"
  → AI Answer:
      - Step-by-step installation
      - Tools needed: Drill, Hole saw, Wire stripper, etc.
  → "Find tools nearby" button
  → Opens Marketplace
  → Pre-filtered search: "Drill" in user's area
  → User can rent tools
  → Back to Ask to continue reading
```

### Flow 5: Safety Risk Assessment
```
Ask: "Can I run a 240V line myself?"
  → AI Response:
      - 🚨 Safety Alert
      - Explains risks (shock, fire, code violations)
      - Recommends hiring licensed electrician
      - PPE required if user proceeds
      - Permit requirements
      - Link to electrical code course
      - "Find an electrician near you" (future feature)
```

### Flow 6: Export as Checklist
```
AI Answer with steps
  → "Export as checklist" button
  → Converts answer to TODO list
  → Options:
      - Save to Notes app
      - Add to Calendar (as event)
      - Share via SMS/Email
      - Print (web)
```

### Flow 7: Topic Exploration
```
Ask Home → Topic Shortcuts → "Plumbing"
  → Topic Page loads
  → Featured: "How to fix common plumbing issues"
  → Common questions list
  → Related courses card
  → Tools nearby card
  → Tap question → Full answer
  → Follow-up question in chat
```

---

## Data Models

### Conversation (Extended from earlier)
```typescript
interface Conversation {
  id: string;
  userId: string;
  title: string; // First question

  // Context
  context?: {
    source: 'learn' | 'marketplace' | 'club';
    sourceId: string;
    sourceTitle: string;
    metadata: Record<string, any>;
  };

  messages: Message[];

  // Organization
  pinned: boolean;
  archived: boolean;
  tags: string[]; // auto-tagged by AI

  // Sharing
  sharedToClubs: string[]; // club IDs

  createdAt: Date;
  updatedAt: Date;
}
```

### Message (Extended)
```typescript
interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';

  content: string; // Markdown for AI, plain text for user

  // AI Response Metadata
  sources?: Source[];
  tools?: {
    name: string;
    category: string;
    marketplaceLink?: string;
  }[];
  materials?: string[];
  safety?: {
    ppe: string[];
    hazards: string[];
    warnings: string[];
    riskLevel: 'low' | 'medium' | 'high' | 'expert-only';
  };
  relatedCourses?: {
    id: string;
    title: string;
    thumbnail: string;
  }[];
  followUpSuggestions?: string[];

  // Technical
  model?: string;
  tokens?: number;
  latency?: number;
  vectorResults?: number; // RAG hits

  // User Actions
  saved: boolean;
  exported: boolean;
  sharedToClub?: string;

  timestamp: Date;
}
```

### Topic
```typescript
interface Topic {
  slug: string;
  name: string;
  icon: string;
  description: string;

  // Curated Content
  featuredAnswer: {
    question: string;
    answer: string;
    sources: Source[];
  };
  commonQuestions: {
    question: string;
    answerId: string;
  }[];

  // Integrations
  relatedCourses: string[]; // course IDs
  relatedTools: string[]; // Marketplace categories

  // Stats
  questionCount: number;
  popularity: number;

  createdAt: Date;
  updatedAt: Date;
}
```

---

## AI Features & Capabilities

### 1. Streaming Responses
- **Server-Sent Events (SSE)** or **WebSockets**
- Stream tokens as they're generated
- Update UI in real-time
- Cancel mid-stream if user navigates away

### 2. Context Injection
- Automatically include context from source (Learn, Marketplace, Clubs)
- User profile context (skill level from completed courses)
- Location context (for local code requirements)
- Previous conversation history (last 5 messages)

### 3. Multi-Modal Understanding
- **Text**: Questions in natural language
- **Voice**: Speech-to-text → Question
- **Images** (Future): Upload photo → "What's wrong with this wiring?"

### 4. Smart Citations
- Prefer trusted sources:
  - Manufacturer manuals
  - Building codes (NEC, IPC, IRC)
  - Educational institutions
  - Verified DIY communities
- Avoid: Random forums, unverified blogs

### 5. Safety Guardrails
- Detect dangerous questions
- Refuse: "How to disable safety features"
- Warn: "This requires professional work"
- Suggest: "Take this course first"
- Legal compliance: Permit requirements

### 6. Answer Quality
- **Confidence Scoring**: AI self-rates answer confidence
- Low confidence → Suggest asking in Clubs
- High confidence → Bold answer
- Include "AI Disclaimer": "Verify with local codes and experts"

---

## Components to Build

### Home Components:
- `AskHeader` - Greeting with dynamic message
- `SearchInput` - Large input with voice
- `SuggestedPrompts` - Chip carousel
- `RecentChats` - Conversation list
- `PinnedAnswers` - Saved answers list
- `TopicShortcuts` - Topic cards

### Conversation Components:
- `ChatInterface` - Full chat UI
- `MessageBubble` - User/AI bubbles
- `StreamingText` - Typewriter effect
- `MarkdownRenderer` - Format AI answers
- `SourcesList` - Source cards
- `SourceCard` - Individual source
- `ToolsCard` - Tools needed
- `SafetyAlert` - Safety warnings
- `RelatedCoursesCard` - Course suggestions
- `FollowUpChips` - Question chips
- `ChatInput` - Input with voice
- `VoiceButton` - Voice recording

### Topic Components:
- `TopicHeader` - Topic banner
- `FeaturedAnswer` - Top answer
- `QuestionList` - Common Q&A
- `TopicCourses` - Related learning
- `TopicTools` - Nearby tools

### Utility Components:
- `LoadingSkeleton` - Answer loading
- `ErrorState` - Error message
- `EmptyState` - No chats yet
- `ExportMenu` - Export options

---

## API Implementation

### Streaming Endpoint:
```typescript
// POST /ai/chat (SSE)
app.post('/ai/chat', async (req, res) => {
  const { conversationId, question, context } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: buildMessages(conversationId, question, context),
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    res.write(`data: ${JSON.stringify({ content })}\n\n`);
  }

  res.write('data: [DONE]\n\n');
  res.end();
});
```

### RAG Search:
```typescript
// Vector search for relevant content
const vectorSearch = async (query: string) => {
  const embedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });

  const results = await pinecone.query({
    vector: embedding.data[0].embedding,
    topK: 10,
    includeMetadata: true,
  });

  return results.matches.map(m => m.metadata);
};
```

---

## Analytics Events

```typescript
// Ask Home
'ask_home_view'
'ask_search_focus'
'ask_suggested_prompt_tap'
'ask_recent_chat_open'
'ask_topic_view'

// Conversation
'ask_question_submit'
'ask_question_voice'
'ask_answer_received'
'ask_source_tap'
'ask_tool_link_tap'
'ask_course_link_tap'
'ask_follow_up_tap'
'ask_save_answer'
'ask_share_answer'
'ask_export_checklist'

// Context Integration
'ask_from_learn' // { courseId, lessonId }
'ask_from_marketplace' // { listingId }
'ask_from_club' // { clubId, postId }

// Quality
'ask_answer_helpful' // thumbs up
'ask_answer_not_helpful' // thumbs down
'ask_report_answer' // incorrect/dangerous
```

---

## Testing Checklist

- [ ] Ask home loads with greeting
- [ ] Suggested prompts display
- [ ] Recent chats list shows history
- [ ] Voice input works (speech-to-text)
- [ ] Question submission creates conversation
- [ ] AI response streams in real-time
- [ ] Markdown renders correctly (headers, lists, bold)
- [ ] Sources display with thumbnails
- [ ] Source links open correctly
- [ ] Tools section shows needed tools
- [ ] "Find nearby" links to Marketplace
- [ ] Safety warnings display prominently
- [ ] Related courses link to Learn tab
- [ ] Follow-up suggestions populate
- [ ] Follow-up tap sends new message
- [ ] Conversation history persists
- [ ] Context from Learn injects correctly
- [ ] Context from Marketplace works
- [ ] Context from Clubs works
- [ ] Save answer works
- [ ] Share to Club creates post
- [ ] Export as checklist works
- [ ] Pin conversation works
- [ ] Delete conversation works
- [ ] Topic pages load curated content
- [ ] Error handling for AI failures
- [ ] Rate limiting prevents abuse

---

## File Structure

```
app/(tabs)/ask/
  _layout.tsx                   # Ask stack
  index.tsx                     # Ask home
  chat/
    [id].tsx                    # Conversation view
  topic/
    [slug].tsx                  # Topic page
  saved.tsx                     # Saved answers

components/ask/
  home/
    ask-header.tsx
    search-input.tsx
    suggested-prompts.tsx
    recent-chats.tsx
    pinned-answers.tsx
    topic-shortcuts.tsx
  chat/
    chat-interface.tsx
    message-bubble.tsx
    streaming-text.tsx
    markdown-renderer.tsx
    sources-list.tsx
    source-card.tsx
    tools-card.tsx
    safety-alert.tsx
    related-courses-card.tsx
    follow-up-chips.tsx
    chat-input.tsx
    voice-button.tsx
  topic/
    topic-header.tsx
    featured-answer.tsx
    question-list.tsx
    topic-courses.tsx
    topic-tools.tsx
  shared/
    loading-skeleton.tsx
    error-state.tsx
    empty-state.tsx
    export-menu.tsx

contexts/
  ask-context.tsx               # Conversations state

utils/
  ai-client.ts                  # OpenAI/Claude SDK
  streaming.ts                  # SSE/WebSocket handling
  markdown-parser.ts            # Parse AI markdown
  voice-to-text.ts              # Speech recognition
```

---

## Dependencies to Install

```bash
pnpm add openai                          # OpenAI SDK
pnpm add @anthropic-ai/sdk               # Claude SDK (alternative)
pnpm add eventsource-parser              # SSE parsing
pnpm add react-native-markdown-display   # Markdown rendering
pnpm add expo-speech                     # Text-to-speech (optional)
pnpm add @react-native-voice/voice       # Speech-to-text
pnpm add react-native-syntax-highlighter # Code blocks
```

---

## Content Moderation

### Input Filtering:
- Block abusive language
- Detect spam patterns
- Rate limiting (10 questions/hour for free tier)
- Premium: Unlimited questions

### Output Filtering:
- Scan AI responses for dangerous advice
- Flag responses that violate platform policy
- Human review queue for flagged answers
- User reporting (thumbs down + reason)

---

## Cost Management

### Token Optimization:
- Truncate conversation history (keep last 5 messages)
- Use cheaper models for simple questions (GPT-3.5)
- Use expensive models for complex/safety-critical (GPT-4)
- Cache common questions (Redis)

### Pricing Tiers:
- Free: 10 questions/day
- Pro: Unlimited questions + priority responses
- Cost per question: ~$0.05-0.20 (GPT-4)

### Monitoring:
- Track token usage per user
- Alert on unusual patterns
- Cost dashboards

---

## Safety & Liability

### Disclaimers:
- "AI-generated answers may not be accurate"
- "Always verify with local building codes"
- "Consult licensed professionals for critical work"
- "Follow all safety precautions"

### Restricted Topics:
- No advice on:
  - Gas line modifications
  - Structural alterations without engineer
  - High-voltage electrical (>240V)
  - Asbestos/lead abatement
  - Well/septic system repairs

- Redirect to: "This requires a licensed professional"

### Legal Protection:
- Terms of Service: User assumes all risk
- No liability for damages from AI advice
- Encourage professional consultation

---

## Future Enhancements

1. **Image Upload**: "What's wrong with this?" + photo
2. **AR Overlay**: Point camera at tool → AI identifies it
3. **Video Analysis**: Upload work video → AI feedback
4. **Expert Network**: Connect with human experts for complex questions
5. **Multi-language**: Translate answers to user's language
6. **Offline Mode**: Cached common answers
7. **Voice Responses**: Text-to-speech AI answers

---

## Next Steps After Implementation

1. Build RAG knowledge base (index content)
2. Fine-tune prompts for DIY domain
3. Partner with content creators for trusted sources
4. Build answer quality feedback loop
5. A/B test different AI models
6. Implement premium tier with GPT-4
7. Analytics on question patterns → inform course creation
