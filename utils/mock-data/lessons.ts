/**
 * Mock Lesson Data
 * Sample lesson content including videos, text steps, quizzes, and resources
 */

export type LessonType = 'video' | 'text' | 'interactive';

export interface TextStep {
  stepNumber: number;
  title: string;
  content: string;
  imageUrl?: string;
  toolsUsed?: string[];
  safetyNote?: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'checklist';
  url: string;
  fileSize?: string; // For PDFs
}

export interface QuickCheckQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  order: number;
  title: string;
  type: LessonType;
  duration: number; // minutes
  thumbnail?: string;
  // Video lesson
  videoUrl?: string;
  hasSubtitles?: boolean;
  // Text lesson
  steps?: TextStep[];
  // Both
  quickChecks: QuickCheckQuestion[];
  resources: Resource[];
  glossaryTerms: GlossaryTerm[];
  toolsUsed: string[];
  xpReward: number;
  isCompleted?: boolean;
}

// Sample lessons for Course 1 (GFCI Outlets)
export const MOCK_LESSONS: Lesson[] = [
  {
    id: 'lesson-1-1',
    courseId: 'course-1',
    order: 1,
    title: 'What is a GFCI Outlet?',
    type: 'video',
    duration: 8,
    thumbnail: 'https://picsum.photos/seed/gfci-intro/400/225',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    hasSubtitles: true,
    quickChecks: [
      {
        id: 'qc-1-1-1',
        question: 'What does GFCI stand for?',
        options: [
          'Ground Fault Circuit Interrupter',
          'General Fault Circuit Indicator',
          'Ground Flow Control Interface',
          'General Fuse Circuit Interrupter',
        ],
        correctAnswer: 0,
        explanation:
          'GFCI stands for Ground Fault Circuit Interrupter. It detects ground faults and shuts off power to prevent electrocution.',
      },
    ],
    resources: [
      {
        id: 'resource-1-1-1',
        title: 'GFCI Safety Guide',
        type: 'pdf',
        url: 'https://example.com/gfci-safety.pdf',
        fileSize: '2.4 MB',
      },
    ],
    glossaryTerms: [
      {
        term: 'Ground Fault',
        definition:
          'An unintentional electrical path between a power source and a grounded surface.',
      },
      {
        term: 'Circuit Breaker',
        definition: 'A safety device that stops electrical flow when overloaded.',
      },
    ],
    toolsUsed: [],
    xpReward: 50,
    isCompleted: true,
  },
  {
    id: 'lesson-1-2',
    courseId: 'course-1',
    order: 2,
    title: 'Where to Install GFCI Outlets',
    type: 'text',
    duration: 10,
    steps: [
      {
        stepNumber: 1,
        title: 'Identify Required Locations',
        content:
          'GFCI outlets are required in areas where water and electricity may come in contact: bathrooms, kitchens, garages, basements, and outdoor areas.',
        imageUrl: 'https://picsum.photos/seed/gfci-locations/600/400',
      },
      {
        stepNumber: 2,
        title: 'Check Local Building Codes',
        content:
          'Requirements vary by location. Check your local electrical code for specific requirements in your area.',
        safetyNote: 'Always turn off power at the circuit breaker before working with electrical outlets.',
      },
      {
        stepNumber: 3,
        title: 'Map Your Installation Plan',
        content:
          'Create a diagram of your home highlighting which outlets need GFCI protection.',
        toolsUsed: ['Paper and pen', 'Circuit tester'],
      },
    ],
    quickChecks: [
      {
        id: 'qc-1-2-1',
        question: 'Where are GFCI outlets required?',
        options: [
          'Only in bathrooms',
          'In wet or damp locations',
          'Only outdoors',
          'Everywhere in the house',
        ],
        correctAnswer: 1,
        explanation:
          'GFCI outlets are required in wet or damp locations like bathrooms, kitchens, garages, basements, and outdoor areas.',
      },
    ],
    resources: [
      {
        id: 'resource-1-2-1',
        title: 'NEC GFCI Requirements Checklist',
        type: 'checklist',
        url: 'https://example.com/nec-checklist.pdf',
        fileSize: '1.1 MB',
      },
    ],
    glossaryTerms: [
      {
        term: 'NEC',
        definition:
          'National Electrical Code - the standard for safe electrical installations in the USA.',
      },
    ],
    toolsUsed: ['Circuit tester'],
    xpReward: 50,
    isCompleted: true,
  },
  {
    id: 'lesson-1-3',
    courseId: 'course-1',
    order: 3,
    title: 'Tools and Materials Needed',
    type: 'text',
    duration: 7,
    steps: [
      {
        stepNumber: 1,
        title: 'Essential Tools',
        content:
          'You will need: flathead and Phillips screwdrivers, wire strippers, voltage tester, needle-nose pliers, and a flashlight.',
        imageUrl: 'https://picsum.photos/seed/electrical-tools/600/400',
        toolsUsed: [
          'Flathead screwdriver',
          'Phillips screwdriver',
          'Wire strippers',
          'Voltage tester',
          'Needle-nose pliers',
          'Flashlight',
        ],
      },
      {
        stepNumber: 2,
        title: 'Required Materials',
        content:
          'Purchase: GFCI outlet(s), wire nuts, electrical tape, and a face plate.',
      },
      {
        stepNumber: 3,
        title: 'Safety Equipment',
        content: 'Always wear safety glasses and insulated gloves when working with electricity.',
        safetyNote: 'Never work on live circuits. Always verify power is off with a voltage tester.',
      },
    ],
    quickChecks: [],
    resources: [
      {
        id: 'resource-1-3-1',
        title: 'Tool Checklist',
        type: 'pdf',
        url: 'https://example.com/tool-checklist.pdf',
        fileSize: '0.8 MB',
      },
      {
        id: 'resource-1-3-2',
        title: 'Buy Tools on Marketplace',
        type: 'link',
        url: 'patio://marketplace?q=wire+strippers',
      },
    ],
    glossaryTerms: [
      {
        term: 'Wire Strippers',
        definition: 'A tool used to remove insulation from electrical wires.',
      },
      {
        term: 'Voltage Tester',
        definition: 'A device that detects the presence of electrical voltage.',
      },
    ],
    toolsUsed: [
      'Flathead screwdriver',
      'Phillips screwdriver',
      'Wire strippers',
      'Voltage tester',
      'Needle-nose pliers',
      'Flashlight',
    ],
    xpReward: 50,
  },
  {
    id: 'lesson-1-4',
    courseId: 'course-1',
    order: 4,
    title: 'Step-by-Step Installation',
    type: 'video',
    duration: 20,
    thumbnail: 'https://picsum.photos/seed/gfci-install/400/225',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    hasSubtitles: true,
    quickChecks: [
      {
        id: 'qc-1-4-1',
        question: 'What is the first step before installing a GFCI outlet?',
        options: [
          'Remove the old outlet',
          'Turn off power at the circuit breaker',
          'Connect the wires',
          'Screw in the outlet',
        ],
        correctAnswer: 1,
        explanation:
          'Always turn off power at the circuit breaker BEFORE touching any electrical components to prevent electrocution.',
      },
      {
        id: 'qc-1-4-2',
        question: 'Which wire connects to the brass terminal?',
        options: ['White (neutral)', 'Black (hot)', 'Green (ground)', 'Red (hot)'],
        correctAnswer: 1,
        explanation:
          'The black (hot) wire connects to the brass terminal on the outlet.',
      },
    ],
    resources: [
      {
        id: 'resource-1-4-1',
        title: 'Installation Diagram',
        type: 'pdf',
        url: 'https://example.com/gfci-diagram.pdf',
        fileSize: '3.2 MB',
      },
    ],
    glossaryTerms: [
      {
        term: 'Hot Wire',
        definition: 'The wire carrying electrical current from the power source (usually black or red).',
      },
      {
        term: 'Neutral Wire',
        definition: 'The return path for electrical current (usually white).',
      },
      {
        term: 'Ground Wire',
        definition: 'The safety wire that prevents electrical shock (usually green or bare copper).',
      },
    ],
    toolsUsed: [
      'Flathead screwdriver',
      'Phillips screwdriver',
      'Wire strippers',
      'Voltage tester',
      'Needle-nose pliers',
    ],
    xpReward: 100,
  },
];

// Helper functions
export const getLessonById = (id: string): Lesson | undefined => {
  return MOCK_LESSONS.find((lesson) => lesson.id === id);
};

export const getLessonsByCourseId = (courseId: string): Lesson[] => {
  return MOCK_LESSONS.filter((lesson) => lesson.courseId === courseId).sort(
    (a, b) => a.order - b.order
  );
};

export const getNextLesson = (currentLessonId: string, courseId: string): Lesson | undefined => {
  const courseLessons = getLessonsByCourseId(courseId);
  const currentIndex = courseLessons.findIndex((l) => l.id === currentLessonId);
  if (currentIndex >= 0 && currentIndex < courseLessons.length - 1) {
    return courseLessons[currentIndex + 1];
  }
  return undefined;
};

export const getPreviousLesson = (currentLessonId: string, courseId: string): Lesson | undefined => {
  const courseLessons = getLessonsByCourseId(courseId);
  const currentIndex = courseLessons.findIndex((l) => l.id === currentLessonId);
  if (currentIndex > 0) {
    return courseLessons[currentIndex - 1];
  }
  return undefined;
};
