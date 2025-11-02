/**
 * Mock Course Data
 * Sample courses for the Learn tab prototype
 */

import { MockUser } from './auth';

export type CourseCategory =
  | 'electrical'
  | 'plumbing'
  | 'woodworking'
  | 'carpentry'
  | 'hvac'
  | 'masonry'
  | 'painting'
  | 'landscaping'
  | 'general'
  | 'safety';

export type CourseDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type ToolsRequired = 'none' | 'basic' | 'specialized';

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  difficulty: CourseDifficulty;
  estimatedTime: number; // minutes
  thumbnail: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
    title: string;
    bio?: string;
  };
  rating: number;
  reviewCount: number;
  enrollmentCount: number;
  prerequisites: string[]; // Course IDs
  toolsRequired: ToolsRequired;
  toolsList?: string[]; // Specific tools needed
  learningOutcomes?: string[]; // What you'll learn
  badges: string[]; // Badge IDs awarded on completion
  lessons: string[]; // Lesson IDs
  createdAt: Date;
  updatedAt: Date;
  isNew: boolean;
  offlineAvailable: boolean;
  // Progress tracking (for "Continue Learning")
  progress?: number; // 0-1 (0% to 100%)
  currentLessonId?: string;
}

export interface Category {
  id: CourseCategory;
  name: string;
  description: string;
  icon: string; // Icon name from lucide-react-native
  courseCount: number;
  color: string;
}

// Mock Instructor Data
const MOCK_INSTRUCTORS = [
  {
    id: 'instructor-1',
    name: 'Mike Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Mike',
    title: 'Licensed Electrician',
    bio: '15+ years of experience in residential and commercial electrical work. Certified Master Electrician and passionate about teaching electrical safety.',
  },
  {
    id: 'instructor-2',
    name: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Sarah',
    title: 'Master Plumber',
    bio: 'Master Plumber with 12 years in the field. Specializes in eco-friendly plumbing solutions and water conservation.',
  },
  {
    id: 'instructor-3',
    name: 'David Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=David',
    title: 'Carpenter & Woodworker',
    bio: 'Professional carpenter and woodworker for 20+ years. Builds custom furniture and teaches traditional woodworking techniques.',
  },
  {
    id: 'instructor-4',
    name: 'Emma Thompson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Emma',
    title: 'HVAC Specialist',
    bio: 'HVAC technician with expertise in modern smart home climate systems. 10 years of experience in residential installations.',
  },
  {
    id: 'instructor-5',
    name: 'James Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=James',
    title: 'Safety Instructor',
    bio: 'OSHA-certified safety instructor dedicated to preventing DIY injuries. Former construction site supervisor with 18 years of experience.',
  },
];

// Mock Courses (15 courses across categories)
export const MOCK_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Introduction to GFCI Outlets',
    description:
      'Learn how to safely install and test Ground Fault Circuit Interrupter outlets to protect your home from electrical hazards.',
    category: 'electrical',
    difficulty: 'beginner',
    estimatedTime: 45,
    thumbnail: 'https://picsum.photos/seed/gfci/400/300',
    instructor: MOCK_INSTRUCTORS[0],
    rating: 4.8,
    reviewCount: 124,
    enrollmentCount: 2847,
    prerequisites: [],
    toolsRequired: 'basic',
    toolsList: [
      'Flathead screwdriver',
      'Phillips screwdriver',
      'Wire strippers',
      'Voltage tester',
      'Needle-nose pliers',
      'GFCI outlet',
      'Wire nuts',
      'Electrical tape',
    ],
    learningOutcomes: [
      'Understand what GFCI outlets are and why they\'re important',
      'Identify locations where GFCI protection is required',
      'Safely install a GFCI outlet following electrical codes',
      'Test GFCI outlets to ensure proper functionality',
      'Troubleshoot common GFCI issues',
    ],
    badges: ['first-steps', 'electrician-novice'],
    lessons: ['lesson-1-1', 'lesson-1-2', 'lesson-1-3', 'lesson-1-4'],
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date('2025-01-05'),
    isNew: false,
    offlineAvailable: true,
    progress: 0.65,
    currentLessonId: 'lesson-1-3',
  },
  {
    id: 'course-2',
    title: 'Fix a Leaky Faucet',
    description:
      'Step-by-step guide to diagnosing and repairing common faucet leaks in your kitchen or bathroom.',
    category: 'plumbing',
    difficulty: 'beginner',
    estimatedTime: 30,
    thumbnail: 'https://picsum.photos/seed/faucet/400/300',
    instructor: MOCK_INSTRUCTORS[1],
    rating: 4.6,
    reviewCount: 89,
    enrollmentCount: 1923,
    prerequisites: [],
    toolsRequired: 'basic',
    badges: ['plumber-start'],
    lessons: ['lesson-2-1', 'lesson-2-2', 'lesson-2-3'],
    createdAt: new Date('2024-09-20'),
    updatedAt: new Date('2024-12-10'),
    isNew: false,
    offlineAvailable: true,
  },
  {
    id: 'course-3',
    title: 'Build a Simple Bookshelf',
    description:
      'Create a sturdy and stylish bookshelf from scratch using basic woodworking techniques and tools.',
    category: 'woodworking',
    difficulty: 'intermediate',
    estimatedTime: 120,
    thumbnail: 'https://picsum.photos/seed/bookshelf/400/300',
    instructor: MOCK_INSTRUCTORS[2],
    rating: 4.9,
    reviewCount: 203,
    enrollmentCount: 3421,
    prerequisites: ['course-14'], // Woodworking basics
    toolsRequired: 'specialized',
    badges: ['woodworker-novice', 'first-build'],
    lessons: [
      'lesson-3-1',
      'lesson-3-2',
      'lesson-3-3',
      'lesson-3-4',
      'lesson-3-5',
      'lesson-3-6',
    ],
    createdAt: new Date('2024-08-10'),
    updatedAt: new Date('2024-11-22'),
    isNew: false,
    offlineAvailable: true,
    progress: 0.33,
    currentLessonId: 'lesson-3-2',
  },
  {
    id: 'course-4',
    title: 'Replace a Ceiling Fan',
    description:
      'Safely remove an old ceiling fan and install a new one, including electrical wiring and balancing.',
    category: 'electrical',
    difficulty: 'intermediate',
    estimatedTime: 90,
    thumbnail: 'https://picsum.photos/seed/ceilingfan/400/300',
    instructor: MOCK_INSTRUCTORS[0],
    rating: 4.7,
    reviewCount: 156,
    enrollmentCount: 2134,
    prerequisites: ['course-1'], // GFCI Outlets
    toolsRequired: 'basic',
    badges: ['electrician-intermediate'],
    lessons: ['lesson-4-1', 'lesson-4-2', 'lesson-4-3', 'lesson-4-4', 'lesson-4-5'],
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2025-01-08'),
    isNew: true,
    offlineAvailable: true,
  },
  {
    id: 'course-5',
    title: 'Unclog a Drain Naturally',
    description:
      'Learn eco-friendly methods to clear clogged drains without harsh chemicals.',
    category: 'plumbing',
    difficulty: 'beginner',
    estimatedTime: 25,
    thumbnail: 'https://picsum.photos/seed/drain/400/300',
    instructor: MOCK_INSTRUCTORS[1],
    rating: 4.5,
    reviewCount: 67,
    enrollmentCount: 1456,
    prerequisites: [],
    toolsRequired: 'none',
    badges: ['eco-friendly'],
    lessons: ['lesson-5-1', 'lesson-5-2', 'lesson-5-3'],
    createdAt: new Date('2024-07-15'),
    updatedAt: new Date('2024-09-30'),
    isNew: false,
    offlineAvailable: true,
  },
  {
    id: 'course-6',
    title: 'Paint a Room Like a Pro',
    description:
      'Master the art of interior painting, from prep work to finishing touches for a professional result.',
    category: 'painting',
    difficulty: 'beginner',
    estimatedTime: 60,
    thumbnail: 'https://picsum.photos/seed/painting/400/300',
    instructor: MOCK_INSTRUCTORS[2],
    rating: 4.8,
    reviewCount: 298,
    enrollmentCount: 4521,
    prerequisites: [],
    toolsRequired: 'basic',
    badges: ['painter-start'],
    lessons: ['lesson-6-1', 'lesson-6-2', 'lesson-6-3', 'lesson-6-4'],
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-10-05'),
    isNew: false,
    offlineAvailable: true,
    progress: 0.25,
    currentLessonId: 'lesson-6-1',
  },
  {
    id: 'course-7',
    title: 'Install a Thermostat',
    description:
      'Upgrade your home with a programmable or smart thermostat installation.',
    category: 'hvac',
    difficulty: 'intermediate',
    estimatedTime: 50,
    thumbnail: 'https://picsum.photos/seed/thermostat/400/300',
    instructor: MOCK_INSTRUCTORS[3],
    rating: 4.6,
    reviewCount: 112,
    enrollmentCount: 1876,
    prerequisites: ['course-1'], // Electrical basics
    toolsRequired: 'basic',
    badges: ['hvac-novice'],
    lessons: ['lesson-7-1', 'lesson-7-2', 'lesson-7-3'],
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2025-01-10'),
    isNew: true,
    offlineAvailable: false,
  },
  {
    id: 'course-8',
    title: 'Lay Paver Patio',
    description:
      'Design and build a beautiful outdoor paver patio, including base preparation and finishing.',
    category: 'landscaping',
    difficulty: 'advanced',
    estimatedTime: 180,
    thumbnail: 'https://picsum.photos/seed/patio/400/300',
    instructor: MOCK_INSTRUCTORS[2],
    rating: 4.9,
    reviewCount: 87,
    enrollmentCount: 1234,
    prerequisites: [],
    toolsRequired: 'specialized',
    badges: ['landscaper-advanced', 'outdoor-master'],
    lessons: [
      'lesson-8-1',
      'lesson-8-2',
      'lesson-8-3',
      'lesson-8-4',
      'lesson-8-5',
      'lesson-8-6',
      'lesson-8-7',
    ],
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-08-15'),
    isNew: false,
    offlineAvailable: true,
  },
  {
    id: 'course-9',
    title: 'Repair Drywall Holes',
    description:
      'Fix small and large holes in drywall with professional techniques.',
    category: 'general',
    difficulty: 'beginner',
    estimatedTime: 35,
    thumbnail: 'https://picsum.photos/seed/drywall/400/300',
    instructor: MOCK_INSTRUCTORS[2],
    rating: 4.7,
    reviewCount: 176,
    enrollmentCount: 3254,
    prerequisites: [],
    toolsRequired: 'basic',
    badges: ['handyman-start'],
    lessons: ['lesson-9-1', 'lesson-9-2', 'lesson-9-3'],
    createdAt: new Date('2024-04-20'),
    updatedAt: new Date('2024-07-10'),
    isNew: false,
    offlineAvailable: true,
  },
  {
    id: 'course-10',
    title: 'Basic Power Tool Safety',
    description:
      'Essential safety practices for using common power tools safely and effectively.',
    category: 'safety',
    difficulty: 'beginner',
    estimatedTime: 40,
    thumbnail: 'https://picsum.photos/seed/safety/400/300',
    instructor: MOCK_INSTRUCTORS[4],
    rating: 5.0,
    reviewCount: 412,
    enrollmentCount: 8921,
    prerequisites: [],
    toolsRequired: 'none',
    badges: ['safety-first', 'responsible-diyer'],
    lessons: ['lesson-10-1', 'lesson-10-2', 'lesson-10-3', 'lesson-10-4'],
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-11-15'),
    isNew: false,
    offlineAvailable: true,
  },
  {
    id: 'course-11',
    title: 'Install Laminate Flooring',
    description:
      'Complete guide to installing click-lock laminate flooring in any room.',
    category: 'carpentry',
    difficulty: 'intermediate',
    estimatedTime: 150,
    thumbnail: 'https://picsum.photos/seed/flooring/400/300',
    instructor: MOCK_INSTRUCTORS[2],
    rating: 4.8,
    reviewCount: 234,
    enrollmentCount: 2987,
    prerequisites: [],
    toolsRequired: 'basic',
    badges: ['flooring-expert'],
    lessons: ['lesson-11-1', 'lesson-11-2', 'lesson-11-3', 'lesson-11-4', 'lesson-11-5'],
    createdAt: new Date('2024-10-05'),
    updatedAt: new Date('2024-12-28'),
    isNew: false,
    offlineAvailable: true,
  },
  {
    id: 'course-12',
    title: 'Build a Raised Garden Bed',
    description:
      'Construct a durable raised garden bed for vegetables and flowers.',
    category: 'woodworking',
    difficulty: 'beginner',
    estimatedTime: 90,
    thumbnail: 'https://picsum.photos/seed/garden/400/300',
    instructor: MOCK_INSTRUCTORS[2],
    rating: 4.9,
    reviewCount: 189,
    enrollmentCount: 3876,
    prerequisites: [],
    toolsRequired: 'basic',
    badges: ['gardener-builder'],
    lessons: ['lesson-12-1', 'lesson-12-2', 'lesson-12-3', 'lesson-12-4'],
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-05-20'),
    isNew: false,
    offlineAvailable: true,
  },
  {
    id: 'course-13',
    title: 'Tile a Bathroom Floor',
    description:
      'Learn proper tile setting techniques for a beautiful, waterproof bathroom floor.',
    category: 'masonry',
    difficulty: 'advanced',
    estimatedTime: 200,
    thumbnail: 'https://picsum.photos/seed/tile/400/300',
    instructor: MOCK_INSTRUCTORS[1],
    rating: 4.7,
    reviewCount: 145,
    enrollmentCount: 1654,
    prerequisites: [],
    toolsRequired: 'specialized',
    badges: ['tile-master'],
    lessons: [
      'lesson-13-1',
      'lesson-13-2',
      'lesson-13-3',
      'lesson-13-4',
      'lesson-13-5',
      'lesson-13-6',
    ],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-06-25'),
    isNew: false,
    offlineAvailable: false,
  },
  {
    id: 'course-14',
    title: 'Woodworking Basics',
    description:
      'Introduction to essential woodworking skills, tools, and safety practices.',
    category: 'woodworking',
    difficulty: 'beginner',
    estimatedTime: 75,
    thumbnail: 'https://picsum.photos/seed/woodbasics/400/300',
    instructor: MOCK_INSTRUCTORS[2],
    rating: 4.9,
    reviewCount: 567,
    enrollmentCount: 9834,
    prerequisites: ['course-10'], // Safety first
    toolsRequired: 'basic',
    badges: ['woodworker-start'],
    lessons: ['lesson-14-1', 'lesson-14-2', 'lesson-14-3', 'lesson-14-4', 'lesson-14-5'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-09-12'),
    isNew: false,
    offlineAvailable: true,
  },
  {
    id: 'course-15',
    title: 'Install Outdoor Lighting',
    description:
      'Design and install low-voltage landscape lighting to enhance your outdoor spaces.',
    category: 'electrical',
    difficulty: 'intermediate',
    estimatedTime: 110,
    thumbnail: 'https://picsum.photos/seed/landscape-light/400/300',
    instructor: MOCK_INSTRUCTORS[0],
    rating: 4.6,
    reviewCount: 98,
    enrollmentCount: 1432,
    prerequisites: ['course-1'], // Electrical basics
    toolsRequired: 'basic',
    badges: ['outdoor-electrician'],
    lessons: ['lesson-15-1', 'lesson-15-2', 'lesson-15-3', 'lesson-15-4'],
    createdAt: new Date('2024-12-15'),
    updatedAt: new Date('2025-01-09'),
    isNew: true,
    offlineAvailable: false,
  },
];

// Categories with metadata
export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'electrical',
    name: 'Electrical',
    description: 'Wiring, outlets, switches, and lighting',
    icon: 'Zap',
    courseCount: 4,
    color: '#F59E0B', // Amber
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    description: 'Pipes, faucets, drains, and fixtures',
    icon: 'Droplet',
    courseCount: 2,
    color: '#3B82F6', // Blue
  },
  {
    id: 'woodworking',
    name: 'Woodworking',
    description: 'Cutting, joining, and finishing wood',
    icon: 'Hammer',
    courseCount: 3,
    color: '#92400E', // Brown
  },
  {
    id: 'carpentry',
    name: 'Carpentry',
    description: 'Framing, flooring, and structural work',
    icon: 'Triangle',
    courseCount: 1,
    color: '#EF4444', // Red
  },
  {
    id: 'hvac',
    name: 'HVAC',
    description: 'Heating, cooling, and ventilation',
    icon: 'Wind',
    courseCount: 1,
    color: '#06B6D4', // Cyan
  },
  {
    id: 'masonry',
    name: 'Masonry',
    description: 'Bricks, tiles, concrete, and stone',
    icon: 'Boxes',
    courseCount: 1,
    color: '#6B7280', // Gray
  },
  {
    id: 'painting',
    name: 'Painting',
    description: 'Interior and exterior painting',
    icon: 'Paintbrush',
    courseCount: 1,
    color: '#EC4899', // Pink
  },
  {
    id: 'landscaping',
    name: 'Landscaping',
    description: 'Outdoor design and hardscaping',
    icon: 'Trees',
    courseCount: 1,
    color: '#10B981', // Green
  },
  {
    id: 'general',
    name: 'General Repair',
    description: 'Common home maintenance tasks',
    icon: 'Wrench',
    courseCount: 1,
    color: '#8B5CF6', // Purple
  },
  {
    id: 'safety',
    name: 'Safety & Tools',
    description: 'Safe practices and tool usage',
    icon: 'Shield',
    courseCount: 1,
    color: '#EF4444', // Red
  },
];

// Helper functions for filtering and sorting
export const getCourseById = (id: string): Course | undefined => {
  return MOCK_COURSES.find((course) => course.id === id);
};

export const getCoursesByCategory = (category: CourseCategory): Course[] => {
  return MOCK_COURSES.filter((course) => course.category === category);
};

export const getInProgressCourses = (): Course[] => {
  return MOCK_COURSES.filter((course) => course.progress && course.progress > 0 && course.progress < 1);
};

export const getNewCourses = (): Course[] => {
  return MOCK_COURSES.filter((course) => course.isNew);
};

export const getRecommendedCourses = (): Course[] => {
  // Mock recommendation logic: highest rated + most enrollments
  return MOCK_COURSES.filter((course) => !course.progress).sort(
    (a, b) => b.rating * b.enrollmentCount - a.rating * a.enrollmentCount
  );
};
