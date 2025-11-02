/**
 * Mock Quiz Data
 * Sample quizzes for courses
 */

export type QuestionType = 'mcq' | 'image-hotspot' | 'sequence' | 'scenario';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  imageUrl?: string;
  // MCQ
  options?: string[];
  correctAnswer?: number;
  // Sequence
  items?: string[];
  correctOrder?: number[];
  // Image Hotspot
  hotspots?: { x: number; y: number; radius: number }[];
  correctHotspot?: number;
  // All
  explanation: string;
  points: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  lessonId?: string; // Optional: quiz for specific lesson
  title: string;
  description: string;
  passingScore: number; // Percentage (0-100)
  timeLimit?: number; // minutes
  questions: QuizQuestion[];
  xpReward: number;
}

// Sample Quiz for Course 1 (GFCI Outlets)
export const MOCK_QUIZZES: Quiz[] = [
  {
    id: 'quiz-1',
    courseId: 'course-1',
    title: 'GFCI Outlet Installation Quiz',
    description: 'Test your knowledge on GFCI outlet installation and safety',
    passingScore: 70,
    timeLimit: 10,
    xpReward: 200,
    questions: [
      {
        id: 'q1-1',
        type: 'mcq',
        question: 'What does GFCI stand for?',
        options: [
          'Ground Fault Circuit Interrupter',
          'General Fault Circuit Indicator',
          'Ground Flow Control Interface',
          'General Fuse Circuit Interrupter',
        ],
        correctAnswer: 0,
        explanation:
          'GFCI stands for Ground Fault Circuit Interrupter. It protects against electrical shock by shutting off power when it detects a ground fault.',
        points: 10,
      },
      {
        id: 'q1-2',
        type: 'mcq',
        question: 'Where are GFCI outlets required by code?',
        options: [
          'Only in bathrooms',
          'In all wet or damp locations',
          'Only outdoors',
          'Only in new construction',
        ],
        correctAnswer: 1,
        explanation:
          'GFCI outlets are required in all wet or damp locations including bathrooms, kitchens, garages, basements, and outdoor areas.',
        points: 10,
      },
      {
        id: 'q1-3',
        type: 'mcq',
        question: 'What is the first step before installing a GFCI outlet?',
        options: [
          'Remove the old outlet',
          'Turn off power at the circuit breaker',
          'Connect the wires',
          'Test the outlet',
        ],
        correctAnswer: 1,
        explanation:
          'Always turn off power at the circuit breaker BEFORE working on any electrical component to prevent shock or electrocution.',
        points: 15,
      },
      {
        id: 'q1-4',
        type: 'mcq',
        question: 'Which wire connects to the brass terminal on a GFCI outlet?',
        options: ['White (neutral) wire', 'Black (hot) wire', 'Green (ground) wire', 'Red wire'],
        correctAnswer: 1,
        explanation:
          'The black (hot) wire connects to the brass terminal, while the white (neutral) wire connects to the silver terminal.',
        points: 15,
      },
      {
        id: 'q1-5',
        type: 'mcq',
        question: 'How often should you test a GFCI outlet?',
        options: ['Never', 'Once a year', 'Monthly', 'After every use'],
        correctAnswer: 2,
        explanation:
          'GFCI outlets should be tested monthly using the TEST and RESET buttons to ensure they are functioning properly.',
        points: 10,
      },
      {
        id: 'q1-6',
        type: 'sequence',
        question: 'Put these GFCI installation steps in the correct order:',
        items: [
          'Turn off power at circuit breaker',
          'Remove old outlet',
          'Connect wires to new GFCI',
          'Test GFCI with tester',
          'Turn power back on',
        ],
        correctOrder: [0, 1, 2, 4, 3],
        explanation:
          'The correct order ensures safety by turning off power first, then installing, turning power on, and finally testing.',
        points: 20,
      },
      {
        id: 'q1-7',
        type: 'mcq',
        question: 'What should you do if a GFCI keeps tripping?',
        options: [
          'Replace it immediately',
          'Ignore it - it\'s normal',
          'Investigate for ground faults or moisture',
          'Bypass the GFCI',
        ],
        correctAnswer: 2,
        explanation:
          'If a GFCI keeps tripping, investigate the cause. It could indicate a ground fault, moisture, or a faulty appliance. Never bypass a GFCI.',
        points: 15,
      },
      {
        id: 'q1-8',
        type: 'scenario',
        question:
          'You\'re installing a GFCI in a bathroom. The box has only 2 wires (hot and neutral, no ground). What should you do?',
        options: [
          'Install the GFCI without a ground wire',
          'Call an electrician',
          'Run a new ground wire to the panel',
          'Use the GFCI and label it "No Equipment Ground"',
        ],
        correctAnswer: 3,
        explanation:
          'You can install a GFCI without a ground wire, but it must be labeled "No Equipment Ground" to meet code requirements.',
        points: 15,
      },
    ],
  },
];

export const getQuizById = (id: string): Quiz | undefined => {
  return MOCK_QUIZZES.find((quiz) => quiz.id === id);
};

export const getQuizzesByCourseId = (courseId: string): Quiz[] => {
  return MOCK_QUIZZES.filter((quiz) => quiz.courseId === courseId);
};

export const calculateQuizScore = (
  questions: QuizQuestion[],
  answers: (number | null)[]
): { score: number; correctCount: number } => {
  let correctCount = 0;
  let totalPoints = 0;
  let earnedPoints = 0;

  questions.forEach((question, index) => {
    totalPoints += question.points;
    if (answers[index] === question.correctAnswer) {
      correctCount++;
      earnedPoints += question.points;
    }
  });

  const score = Math.round((earnedPoints / totalPoints) * 100);
  return { score, correctCount };
};
