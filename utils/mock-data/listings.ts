/**
 * Mock Data: Tool Listings
 * Sample listings for marketplace (rentals and buy/sell)
 */

export type ListingType = 'rental' | 'sale';
export type ListingCondition = 'new' | 'like-new' | 'good' | 'fair';
export type ToolsRequired = 'none' | 'basic' | 'advanced';

export interface Listing {
  id: string;
  type: ListingType;
  ownerId: string;
  title: string;
  description: string;
  category: string;
  condition: ListingCondition;

  // Media
  photos: string[];
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
    blackoutDates?: string[]; // ISO date strings
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

  // Status & Metrics
  status: 'active' | 'paused' | 'rented' | 'sold';
  views: number;
  saves: number;
  rating: number;
  reviewCount: number;

  // Owner Info
  owner: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    responseTime: string;
    joinedDate: string;
  };

  createdAt: Date;
  updatedAt: Date;
  isNew: boolean;
}

// Central location: San Francisco, CA
const BASE_LAT = 37.7749;
const BASE_LNG = -122.4194;

// Helper to generate nearby coordinates
const nearbyCoord = (offset: number): { lat: number; lng: number } => ({
  lat: BASE_LAT + (Math.random() - 0.5) * offset,
  lng: BASE_LNG + (Math.random() - 0.5) * offset,
});

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'listing-1',
    type: 'rental',
    ownerId: 'user-1',
    title: 'DeWalt 20V Cordless Drill Kit',
    description: 'Powerful cordless drill with 2 batteries, charger, and carrying case. Perfect for DIY projects and home repairs. Recently serviced and in excellent condition.',
    category: 'Power Tools',
    condition: 'like-new',
    photos: ['https://picsum.photos/seed/drill1/600/400', 'https://picsum.photos/seed/drill2/600/400'],
    dailyRate: 15,
    weeklyRate: 75,
    deposit: 50,
    brand: 'DeWalt',
    model: 'DCD771C2',
    specs: {
      voltage: '20V',
      torque: '300 in-lbs',
      speed: 'Variable (0-450/1500 RPM)',
      weight: '3.6 lbs',
    },
    location: {
      ...nearbyCoord(0.05),
      address: '123 Market St',
      neighborhood: 'SOMA',
      hideExactAddress: true,
    },
    searchRadius: 10,
    availability: {
      type: 'calendar',
      blackoutDates: [],
    },
    deliveryOptions: {
      pickup: true,
      delivery: true,
      meetHalfway: false,
      deliveryFee: 10,
      deliveryRadius: 15,
    },
    addons: [
      { id: 'addon-1', name: 'Extra drill bits set', price: 5 },
      { id: 'addon-2', name: 'Carrying case upgrade', price: 8 },
    ],
    verification: {
      idVerified: true,
      addressVerified: true,
      toolPhotoVerified: true,
    },
    insuranceAvailable: true,
    safetyNotes: 'Wear safety glasses. Check battery charge before use.',
    status: 'active',
    views: 245,
    saves: 32,
    rating: 4.9,
    reviewCount: 18,
    owner: {
      id: 'user-1',
      name: 'John Smith',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 5.0,
      responseTime: 'Usually responds in 1 hour',
      joinedDate: '2023-01-15',
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    isNew: false,
  },
  {
    id: 'listing-2',
    type: 'rental',
    ownerId: 'user-2',
    title: '24ft Extension Ladder - Little Giant',
    description: 'Professional-grade extension ladder. Extends up to 24 feet. Perfect for painting, roof access, and high work. Safety stabilizers included.',
    category: 'Ladders & Scaffolding',
    condition: 'good',
    photos: ['https://picsum.photos/seed/ladder1/600/400'],
    dailyRate: 25,
    weeklyRate: 120,
    deposit: 100,
    brand: 'Little Giant',
    model: 'M24',
    specs: {
      maxHeight: '24 feet',
      weightCapacity: '300 lbs',
      material: 'Aluminum',
      weight: '45 lbs',
    },
    location: {
      ...nearbyCoord(0.08),
      address: '456 Valencia St',
      neighborhood: 'Mission',
      hideExactAddress: true,
    },
    searchRadius: 15,
    availability: {
      type: 'calendar',
      blackoutDates: [],
    },
    deliveryOptions: {
      pickup: true,
      delivery: false,
      meetHalfway: true,
    },
    verification: {
      idVerified: true,
      addressVerified: true,
      toolPhotoVerified: false,
    },
    insuranceAvailable: true,
    safetyNotes: 'Always maintain 3 points of contact. Do not exceed weight capacity. Use on stable, level ground only.',
    status: 'active',
    views: 180,
    saves: 24,
    rating: 4.7,
    reviewCount: 12,
    owner: {
      id: 'user-2',
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 4.8,
      responseTime: 'Usually responds in 2 hours',
      joinedDate: '2023-03-20',
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isNew: false,
  },
  {
    id: 'listing-3',
    type: 'sale',
    ownerId: 'user-3',
    title: 'Craftsman Tool Set - 230 Pieces',
    description: 'Complete mechanics tool set with ratchets, sockets, wrenches, and more. Barely used, comes with original case. Great for beginners or pros.',
    category: 'Hand Tools',
    condition: 'like-new',
    photos: ['https://picsum.photos/seed/toolset1/600/400', 'https://picsum.photos/seed/toolset2/600/400'],
    price: 150,
    acceptOffers: true,
    minOffer: 120,
    brand: 'Craftsman',
    model: '230PC',
    specs: {
      pieces: '230',
      driveSize: '1/4", 3/8", 1/2"',
      caseIncluded: 'Yes',
      warranty: 'Lifetime',
    },
    location: {
      ...nearbyCoord(0.03),
      address: '789 Castro St',
      neighborhood: 'Castro',
      hideExactAddress: false,
    },
    searchRadius: 25,
    deliveryOptions: {
      pickup: true,
      delivery: true,
      meetHalfway: false,
      deliveryFee: 15,
    },
    verification: {
      idVerified: true,
      addressVerified: true,
      toolPhotoVerified: true,
    },
    insuranceAvailable: false,
    safetyNotes: 'N/A - New owner responsible for safe use',
    status: 'active',
    views: 320,
    saves: 45,
    rating: 5.0,
    reviewCount: 8,
    owner: {
      id: 'user-3',
      name: 'Mike Chen',
      avatar: 'https://i.pravatar.cc/150?img=15',
      rating: 4.9,
      responseTime: 'Usually responds in 30 minutes',
      joinedDate: '2022-11-10',
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    isNew: true,
  },
  {
    id: 'listing-4',
    type: 'rental',
    ownerId: 'user-4',
    title: 'Gas-Powered Pressure Washer - 3000 PSI',
    description: 'Heavy-duty pressure washer for driveways, decks, and siding. Includes multiple nozzles and detergent tank. Easy to use.',
    category: 'Garden & Landscaping',
    condition: 'good',
    photos: ['https://picsum.photos/seed/washer1/600/400'],
    dailyRate: 40,
    weeklyRate: 180,
    deposit: 150,
    brand: 'Simpson',
    model: 'MSH3125',
    specs: {
      psi: '3000',
      gpm: '2.5',
      engine: 'Honda GC190',
      fuelType: 'Gasoline',
    },
    location: {
      ...nearbyCoord(0.06),
      address: '321 Divisadero St',
      neighborhood: 'NoPa',
      hideExactAddress: true,
    },
    searchRadius: 20,
    availability: {
      type: 'calendar',
      blackoutDates: [],
    },
    deliveryOptions: {
      pickup: true,
      delivery: true,
      meetHalfway: true,
      deliveryFee: 20,
      deliveryRadius: 10,
    },
    addons: [
      { id: 'addon-3', name: 'Surface cleaner attachment', price: 15 },
      { id: 'addon-4', name: 'Detergent bundle', price: 10 },
    ],
    verification: {
      idVerified: true,
      addressVerified: false,
      toolPhotoVerified: true,
    },
    insuranceAvailable: true,
    safetyNotes: 'Wear protective clothing and eye protection. Never point at people or pets. Fill with gas before pickup.',
    status: 'active',
    views: 198,
    saves: 28,
    rating: 4.6,
    reviewCount: 14,
    owner: {
      id: 'user-4',
      name: 'Emily Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=9',
      rating: 4.7,
      responseTime: 'Usually responds in 3 hours',
      joinedDate: '2023-06-05',
    },
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    isNew: false,
  },
  {
    id: 'listing-5',
    type: 'rental',
    ownerId: 'user-5',
    title: 'Tile Saw - 10 inch with Stand',
    description: 'Professional tile saw with laser guide and water pump. Ideal for bathroom or kitchen remodels. Clean and well-maintained.',
    category: 'Power Tools',
    condition: 'like-new',
    photos: ['https://picsum.photos/seed/tilesaw1/600/400', 'https://picsum.photos/seed/tilesaw2/600/400'],
    dailyRate: 35,
    weeklyRate: 160,
    deposit: 120,
    brand: 'DEWALT',
    model: 'D24000',
    specs: {
      bladeSize: '10 inch',
      cutCapacity: '24 inches',
      motor: '1.5 HP',
      standIncluded: 'Yes',
    },
    location: {
      ...nearbyCoord(0.04),
      address: '555 Haight St',
      neighborhood: 'Haight-Ashbury',
      hideExactAddress: true,
    },
    searchRadius: 12,
    availability: {
      type: 'calendar',
      blackoutDates: [],
    },
    deliveryOptions: {
      pickup: true,
      delivery: false,
      meetHalfway: false,
    },
    addons: [
      { id: 'addon-5', name: 'Diamond blade upgrade', price: 20 },
    ],
    verification: {
      idVerified: true,
      addressVerified: true,
      toolPhotoVerified: true,
    },
    insuranceAvailable: true,
    safetyNotes: 'Wear safety glasses and hearing protection. Keep hands away from blade. Ensure water reservoir is full.',
    status: 'active',
    views: 156,
    saves: 19,
    rating: 4.8,
    reviewCount: 11,
    owner: {
      id: 'user-5',
      name: 'David Park',
      avatar: 'https://i.pravatar.cc/150?img=33',
      rating: 4.9,
      responseTime: 'Usually responds in 1 hour',
      joinedDate: '2023-02-28',
    },
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
    isNew: true,
  },
  {
    id: 'listing-6',
    type: 'sale',
    ownerId: 'user-6',
    title: 'Milwaukee M18 Impact Driver',
    description: 'Cordless impact driver, battery and charger included. Used for one project, like new condition. Very powerful.',
    category: 'Power Tools',
    condition: 'like-new',
    photos: ['https://picsum.photos/seed/impact1/600/400'],
    price: 120,
    acceptOffers: false,
    brand: 'Milwaukee',
    model: 'M18',
    specs: {
      voltage: '18V',
      torque: '1500 in-lbs',
      speed: '0-3200 RPM',
      batteryIncluded: 'Yes',
    },
    location: {
      ...nearbyCoord(0.07),
      address: '888 Polk St',
      neighborhood: 'Polk Gulch',
      hideExactAddress: false,
    },
    searchRadius: 30,
    deliveryOptions: {
      pickup: true,
      delivery: true,
      meetHalfway: true,
      deliveryFee: 10,
    },
    verification: {
      idVerified: true,
      addressVerified: true,
      toolPhotoVerified: false,
    },
    insuranceAvailable: false,
    safetyNotes: 'N/A',
    status: 'active',
    views: 267,
    saves: 38,
    rating: 4.9,
    reviewCount: 6,
    owner: {
      id: 'user-6',
      name: 'Lisa Wong',
      avatar: 'https://i.pravatar.cc/150?img=10',
      rating: 5.0,
      responseTime: 'Usually responds in 45 minutes',
      joinedDate: '2023-09-14',
    },
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
    isNew: true,
  },
  {
    id: 'listing-7',
    type: 'rental',
    ownerId: 'user-7',
    title: 'Scaffolding Set - 5ft x 7ft Platform',
    description: 'Complete scaffolding system with wheels and locking mechanisms. Safe and stable for indoor and outdoor projects.',
    category: 'Ladders & Scaffolding',
    condition: 'good',
    photos: ['https://picsum.photos/seed/scaffold1/600/400'],
    dailyRate: 45,
    weeklyRate: 200,
    deposit: 200,
    brand: 'Werner',
    model: 'PS-48',
    specs: {
      platform: '5ft x 7ft',
      height: '6ft working height',
      capacity: '1000 lbs',
      wheels: 'Yes, with locks',
    },
    location: {
      ...nearbyCoord(0.09),
      address: '234 Clement St',
      neighborhood: 'Richmond',
      hideExactAddress: true,
    },
    searchRadius: 8,
    availability: {
      type: 'calendar',
      blackoutDates: [],
    },
    deliveryOptions: {
      pickup: true,
      delivery: true,
      meetHalfway: false,
      deliveryFee: 30,
      deliveryRadius: 12,
    },
    verification: {
      idVerified: false,
      addressVerified: true,
      toolPhotoVerified: true,
    },
    insuranceAvailable: true,
    safetyNotes: 'Lock all wheels before climbing. Do not exceed weight capacity. Assemble on level surface.',
    status: 'active',
    views: 134,
    saves: 17,
    rating: 4.5,
    reviewCount: 9,
    owner: {
      id: 'user-7',
      name: 'Tom Anderson',
      avatar: 'https://i.pravatar.cc/150?img=13',
      rating: 4.6,
      responseTime: 'Usually responds in 4 hours',
      joinedDate: '2023-07-22',
    },
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    isNew: false,
  },
  {
    id: 'listing-8',
    type: 'rental',
    ownerId: 'user-8',
    title: 'Circular Saw - 7.25 inch Makita',
    description: 'Reliable circular saw for cutting lumber, plywood, and more. Includes laser guide. Great for framing and general construction.',
    category: 'Power Tools',
    condition: 'good',
    photos: ['https://picsum.photos/seed/circsaw1/600/400'],
    dailyRate: 18,
    weeklyRate: 85,
    deposit: 60,
    brand: 'Makita',
    model: '5007MG',
    specs: {
      bladeSize: '7.25 inch',
      motor: '15 Amp',
      speed: '5800 RPM',
      laserGuide: 'Yes',
    },
    location: {
      ...nearbyCoord(0.05),
      address: '777 Geary Blvd',
      neighborhood: 'Tenderloin',
      hideExactAddress: true,
    },
    searchRadius: 15,
    availability: {
      type: 'always',
    },
    deliveryOptions: {
      pickup: true,
      delivery: false,
      meetHalfway: true,
    },
    verification: {
      idVerified: true,
      addressVerified: true,
      toolPhotoVerified: true,
    },
    insuranceAvailable: true,
    safetyNotes: 'Always wear safety glasses. Unplug when changing blades. Check blade guard before use.',
    status: 'active',
    views: 289,
    saves: 41,
    rating: 4.8,
    reviewCount: 22,
    owner: {
      id: 'user-8',
      name: 'Rachel Green',
      avatar: 'https://i.pravatar.cc/150?img=20',
      rating: 4.9,
      responseTime: 'Usually responds in 2 hours',
      joinedDate: '2022-12-03',
    },
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    isNew: false,
  },
  {
    id: 'listing-9',
    type: 'sale',
    ownerId: 'user-9',
    title: 'Paint Sprayer - Graco TrueCoat',
    description: 'Airless paint sprayer. Used once for interior painting. Saves tons of time compared to brushes and rollers.',
    category: 'Paint & Finishing',
    condition: 'like-new',
    photos: ['https://picsum.photos/seed/sprayer1/600/400', 'https://picsum.photos/seed/sprayer2/600/400'],
    price: 200,
    acceptOffers: true,
    minOffer: 170,
    brand: 'Graco',
    model: '17N166',
    specs: {
      type: 'Airless',
      coverage: '55 gallons per year',
      tipSize: '515 Included',
      hoseLength: '25 feet',
    },
    location: {
      ...nearbyCoord(0.06),
      address: '432 Fillmore St',
      neighborhood: 'Western Addition',
      hideExactAddress: false,
    },
    searchRadius: 20,
    deliveryOptions: {
      pickup: true,
      delivery: true,
      meetHalfway: false,
      deliveryFee: 12,
    },
    verification: {
      idVerified: true,
      addressVerified: false,
      toolPhotoVerified: true,
    },
    insuranceAvailable: false,
    safetyNotes: 'N/A',
    status: 'active',
    views: 211,
    saves: 29,
    rating: 4.7,
    reviewCount: 5,
    owner: {
      id: 'user-9',
      name: 'Chris Martinez',
      avatar: 'https://i.pravatar.cc/150?img=14',
      rating: 4.8,
      responseTime: 'Usually responds in 1 hour',
      joinedDate: '2023-10-18',
    },
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19'),
    isNew: true,
  },
  {
    id: 'listing-10',
    type: 'rental',
    ownerId: 'user-10',
    title: 'Jigsaw - Bosch Orbital',
    description: 'Versatile jigsaw for curved and straight cuts. Variable speed control. Includes several blade types.',
    category: 'Power Tools',
    condition: 'good',
    photos: ['https://picsum.photos/seed/jigsaw1/600/400'],
    dailyRate: 12,
    weeklyRate: 55,
    deposit: 40,
    brand: 'Bosch',
    model: 'JS470E',
    specs: {
      motor: '7.0 Amp',
      stroke: '1 inch',
      speed: 'Variable 500-3100 SPM',
      orbital: 'Yes',
    },
    location: {
      ...nearbyCoord(0.04),
      address: '999 Irving St',
      neighborhood: 'Inner Sunset',
      hideExactAddress: true,
    },
    searchRadius: 10,
    availability: {
      type: 'calendar',
      blackoutDates: [],
    },
    deliveryOptions: {
      pickup: true,
      delivery: true,
      meetHalfway: true,
      deliveryFee: 8,
      deliveryRadius: 10,
    },
    addons: [
      { id: 'addon-6', name: 'Extra blade pack', price: 5 },
    ],
    verification: {
      idVerified: true,
      addressVerified: true,
      toolPhotoVerified: false,
    },
    insuranceAvailable: true,
    safetyNotes: 'Wear eye protection. Clamp workpiece securely. Use correct blade for material.',
    status: 'active',
    views: 167,
    saves: 22,
    rating: 4.6,
    reviewCount: 13,
    owner: {
      id: 'user-10',
      name: 'Amanda Lee',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 4.7,
      responseTime: 'Usually responds in 3 hours',
      joinedDate: '2023-04-11',
    },
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    isNew: false,
  },
  // Continue with more listings...
  {
    id: 'listing-11',
    type: 'rental',
    ownerId: 'user-11',
    title: 'Electric Lawn Mower - Self Propelled',
    description: 'Easy-to-use electric lawn mower. Self-propelled, adjustable height, rear bag included. Perfect for small to medium yards.',
    category: 'Garden & Landscaping',
    condition: 'good',
    photos: ['https://picsum.photos/seed/mower1/600/400'],
    dailyRate: 30,
    weeklyRate: 140,
    deposit: 100,
    brand: 'Greenworks',
    model: 'MO40L410',
    specs: {
      type: 'Electric/Corded',
      cuttingWidth: '20 inch',
      heightAdjustment: '5 positions',
      bagCapacity: '2.5 bushel',
    },
    location: {
      ...nearbyCoord(0.08),
      address: '654 Noriega St',
      neighborhood: 'Outer Sunset',
      hideExactAddress: true,
    },
    searchRadius: 18,
    availability: {
      type: 'calendar',
      blackoutDates: [],
    },
    deliveryOptions: {
      pickup: true,
      delivery: false,
      meetHalfway: true,
    },
    verification: {
      idVerified: true,
      addressVerified: true,
      toolPhotoVerified: true,
    },
    insuranceAvailable: true,
    safetyNotes: 'Clear yard of debris before mowing. Keep children and pets away. Do not mow wet grass.',
    status: 'active',
    views: 145,
    saves: 18,
    rating: 4.4,
    reviewCount: 10,
    owner: {
      id: 'user-11',
      name: 'James Wilson',
      avatar: 'https://i.pravatar.cc/150?img=52',
      rating: 4.5,
      responseTime: 'Usually responds in 5 hours',
      joinedDate: '2023-05-30',
    },
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11'),
    isNew: false,
  },
  {
    id: 'listing-12',
    type: 'sale',
    ownerId: 'user-12',
    title: 'Shop Vac - 6 Gallon Wet/Dry',
    description: 'Powerful shop vacuum for wet and dry messes. Includes multiple attachments. Moving, must sell.',
    category: 'Material Handling',
    condition: 'good',
    photos: ['https://picsum.photos/seed/shopvac1/600/400'],
    price: 60,
    acceptOffers: true,
    minOffer: 45,
    brand: 'Shop-Vac',
    model: '5989300',
    specs: {
      capacity: '6 gallons',
      hp: '3.0 Peak HP',
      hoseLength: '7 feet',
      type: 'Wet/Dry',
    },
    location: {
      ...nearbyCoord(0.05),
      address: '321 Bryant St',
      neighborhood: 'Potrero Hill',
      hideExactAddress: false,
    },
    searchRadius: 25,
    deliveryOptions: {
      pickup: true,
      delivery: false,
      meetHalfway: true,
    },
    verification: {
      idVerified: false,
      addressVerified: true,
      toolPhotoVerified: false,
    },
    insuranceAvailable: false,
    safetyNotes: 'N/A',
    status: 'active',
    views: 98,
    saves: 12,
    rating: 4.3,
    reviewCount: 4,
    owner: {
      id: 'user-12',
      name: 'Nicole Brown',
      avatar: 'https://i.pravatar.cc/150?img=27',
      rating: 4.4,
      responseTime: 'Usually responds in 6 hours',
      joinedDate: '2023-11-08',
    },
    createdAt: new Date('2024-01-23'),
    updatedAt: new Date('2024-01-23'),
    isNew: true,
  },
  {
    id: 'listing-13',
    type: 'rental',
    ownerId: 'user-13',
    title: 'Orbital Sander - Random Orbit',
    description: 'Smooth finishing sander for wood projects. Variable speed, dust collection bag included. Leaves no swirl marks.',
    category: 'Power Tools',
    condition: 'like-new',
    photos: ['https://picsum.photos/seed/sander1/600/400'],
    dailyRate: 14,
    weeklyRate: 65,
    deposit: 45,
    brand: 'DEWALT',
    model: 'DWE6423K',
    specs: {
      padSize: '5 inch',
      motor: '3.0 Amp',
      speed: '8000-12000 OPM',
      dustCollection: 'Yes',
    },
    location: {
      ...nearbyCoord(0.03),
      address: '876 Columbus Ave',
      neighborhood: 'North Beach',
      hideExactAddress: true,
    },
    searchRadius: 12,
    availability: {
      type: 'always',
    },
    deliveryOptions: {
      pickup: true,
      delivery: true,
      meetHalfway: false,
      deliveryFee: 10,
      deliveryRadius: 15,
    },
    addons: [
      { id: 'addon-7', name: 'Sandpaper variety pack', price: 8 },
    ],
    verification: {
      idVerified: true,
      addressVerified: true,
      toolPhotoVerified: true,
    },
    insuranceAvailable: true,
    safetyNotes: 'Wear dust mask. Secure workpiece. Move in direction of wood grain.',
    status: 'active',
    views: 203,
    saves: 27,
    rating: 4.9,
    reviewCount: 16,
    owner: {
      id: 'user-13',
      name: 'Kevin Patel',
      avatar: 'https://i.pravatar.cc/150?img=60',
      rating: 5.0,
      responseTime: 'Usually responds in 30 minutes',
      joinedDate: '2022-10-25',
    },
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-09'),
    isNew: false,
  },
  {
    id: 'listing-14',
    type: 'rental',
    ownerId: 'user-14',
    title: 'Reciprocating Saw - Corded Sawzall',
    description: 'Heavy-duty reciprocating saw for demolition and rough cuts. Includes metal and wood blades.',
    category: 'Power Tools',
    condition: 'good',
    photos: ['https://picsum.photos/seed/sawzall1/600/400'],
    dailyRate: 20,
    weeklyRate: 90,
    deposit: 70,
    brand: 'Milwaukee',
    model: '6519-31',
    specs: {
      motor: '12 Amp',
      stroke: '1-1/8 inch',
      speed: 'Variable 0-3000 SPM',
      corded: 'Yes',
    },
    location: {
      ...nearbyCoord(0.07),
      address: '543 Lombard St',
      neighborhood: 'Marina',
      hideExactAddress: true,
    },
    searchRadius: 15,
    availability: {
      type: 'calendar',
      blackoutDates: [],
    },
    deliveryOptions: {
      pickup: true,
      delivery: false,
      meetHalfway: true,
    },
    verification: {
      idVerified: true,
      addressVerified: false,
      toolPhotoVerified: true,
    },
    insuranceAvailable: true,
    safetyNotes: 'Wear gloves and eye protection. Support workpiece properly. Keep fingers clear of blade.',
    status: 'active',
    views: 176,
    saves: 23,
    rating: 4.7,
    reviewCount: 15,
    owner: {
      id: 'user-14',
      name: 'Sophia Garcia',
      avatar: 'https://i.pravatar.cc/150?img=48',
      rating: 4.8,
      responseTime: 'Usually responds in 2 hours',
      joinedDate: '2023-08-16',
    },
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
    isNew: false,
  },
  {
    id: 'listing-15',
    type: 'sale',
    ownerId: 'user-15',
    title: 'Laser Level - Self-Leveling Rotary',
    description: 'Professional-grade laser level for accurate leveling. Indoor and outdoor use. Comes with tripod and case.',
    category: 'Measuring & Testing',
    condition: 'like-new',
    photos: ['https://picsum.photos/seed/laser1/600/400', 'https://picsum.photos/seed/laser2/600/400'],
    price: 250,
    acceptOffers: false,
    brand: 'Bosch',
    model: 'GRL300HVG',
    specs: {
      range: '1000 feet diameter',
      accuracy: '±1/8 inch at 100 feet',
      selfLeveling: 'Yes',
      tripodIncluded: 'Yes',
    },
    location: {
      ...nearbyCoord(0.06),
      address: '210 Embarcadero',
      neighborhood: 'Embarcadero',
      hideExactAddress: false,
    },
    searchRadius: 30,
    deliveryOptions: {
      pickup: true,
      delivery: true,
      meetHalfway: false,
      deliveryFee: 15,
    },
    verification: {
      idVerified: true,
      addressVerified: true,
      toolPhotoVerified: true,
    },
    insuranceAvailable: false,
    safetyNotes: 'N/A',
    status: 'active',
    views: 134,
    saves: 16,
    rating: 4.8,
    reviewCount: 7,
    owner: {
      id: 'user-15',
      name: 'Daniel Kim',
      avatar: 'https://i.pravatar.cc/150?img=68',
      rating: 4.9,
      responseTime: 'Usually responds in 1 hour',
      joinedDate: '2023-03-09',
    },
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21'),
    isNew: true,
  },
  {
    id: 'listing-16',
    type: 'rental',
    ownerId: 'user-16',
    title: 'Air Compressor - 6 Gallon Pancake',
    description: 'Portable air compressor for nail guns, inflating tires, and air tools. Quiet operation, oil-free pump.',
    category: 'Power Tools',
    condition: 'good',
    photos: ['https://picsum.photos/seed/compressor1/600/400'],
    dailyRate: 22,
    weeklyRate: 100,
    deposit: 80,
    brand: 'Porter-Cable',
    model: 'C2002',
    specs: {
      tankSize: '6 gallons',
      psi: '150 max',
      cfm: '2.6 at 90 PSI',
      noise: '75.5 dB',
    },
    location: {
      ...nearbyCoord(0.05),
      address: '432 Bay St',
      neighborhood: 'Fisherman\'s Wharf',
      hideExactAddress: true,
    },
    searchRadius: 10,
    availability: {
      type: 'calendar',
      blackoutDates: [],
    },
    deliveryOptions: {
      pickup: true,
      delivery: true,
      meetHalfway: true,
      deliveryFee: 12,
      deliveryRadius: 12,
    },
    verification: {
      idVerified: true,
      addressVerified: true,
      toolPhotoVerified: true,
    },
    insuranceAvailable: true,
    safetyNotes: 'Release pressure before disconnecting. Wear ear protection. Use in ventilated area.',
    status: 'active',
    views: 189,
    saves: 25,
    rating: 4.6,
    reviewCount: 14,
    owner: {
      id: 'user-16',
      name: 'Jessica Taylor',
      avatar: 'https://i.pravatar.cc/150?img=16',
      rating: 4.7,
      responseTime: 'Usually responds in 3 hours',
      joinedDate: '2023-06-14',
    },
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
    isNew: false,
  },
  {
    id: 'listing-17',
    type: 'rental',
    ownerId: 'user-17',
    title: 'Belt Sander - 3x21 inch Heavy Duty',
    description: 'Powerful belt sander for heavy material removal. Perfect for floors, decks, and large surface prep.',
    category: 'Power Tools',
    condition: 'good',
    photos: ['https://picsum.photos/seed/beltsander1/600/400'],
    dailyRate: 24,
    weeklyRate: 110,
    deposit: 90,
    brand: 'Makita',
    model: '9403',
    specs: {
      beltSize: '3 x 21 inch',
      motor: '11 Amp',
      speed: '1640 ft/min',
      weight: '13.2 lbs',
    },
    location: {
      ...nearbyCoord(0.06),
      address: '765 Union St',
      neighborhood: 'Russian Hill',
      hideExactAddress: true,
    },
    searchRadius: 14,
    availability: {
      type: 'always',
    },
    deliveryOptions: {
      pickup: true,
      delivery: false,
      meetHalfway: false,
    },
    verification: {
      idVerified: false,
      addressVerified: true,
      toolPhotoVerified: false,
    },
    insuranceAvailable: true,
    safetyNotes: 'Always wear dust mask and eye protection. Move with grain. Never set down while running.',
    status: 'active',
    views: 112,
    saves: 14,
    rating: 4.5,
    reviewCount: 9,
    owner: {
      id: 'user-17',
      name: 'Brian Foster',
      avatar: 'https://i.pravatar.cc/150?img=57',
      rating: 4.6,
      responseTime: 'Usually responds in 4 hours',
      joinedDate: '2023-09-22',
    },
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-07'),
    isNew: false,
  },
  {
    id: 'listing-18',
    type: 'sale',
    ownerId: 'user-18',
    title: 'Cordless Hedge Trimmer - 22 inch',
    description: 'Battery-powered hedge trimmer, barely used. Includes battery and charger. Great for yard maintenance.',
    category: 'Garden & Landscaping',
    condition: 'like-new',
    photos: ['https://picsum.photos/seed/hedgetrimmer1/600/400'],
    price: 140,
    acceptOffers: true,
    minOffer: 115,
    brand: 'Black+Decker',
    model: 'LHT321FF',
    specs: {
      bladeLength: '22 inch',
      voltage: '20V MAX',
      gapCapacity: '3/4 inch',
      batteryIncluded: 'Yes',
    },
    location: {
      ...nearbyCoord(0.07),
      address: '987 Chestnut St',
      neighborhood: 'Cow Hollow',
      hideExactAddress: false,
    },
    searchRadius: 20,
    deliveryOptions: {
      pickup: true,
      delivery: false,
      meetHalfway: true,
    },
    verification: {
      idVerified: true,
      addressVerified: true,
      toolPhotoVerified: true,
    },
    insuranceAvailable: false,
    safetyNotes: 'N/A',
    status: 'active',
    views: 87,
    saves: 11,
    rating: 4.6,
    reviewCount: 3,
    owner: {
      id: 'user-18',
      name: 'Angela White',
      avatar: 'https://i.pravatar.cc/150?img=38',
      rating: 4.7,
      responseTime: 'Usually responds in 2 hours',
      joinedDate: '2023-12-01',
    },
    createdAt: new Date('2024-01-24'),
    updatedAt: new Date('2024-01-24'),
    isNew: true,
  },
  {
    id: 'listing-19',
    type: 'rental',
    ownerId: 'user-19',
    title: 'Miter Saw - 10 inch Sliding Compound',
    description: 'Precision miter saw for trim work and crosscuts. Laser guide, dust bag included. Perfect for crown molding.',
    category: 'Power Tools',
    condition: 'like-new',
    photos: ['https://picsum.photos/seed/mitersaw1/600/400', 'https://picsum.photos/seed/mitersaw2/600/400'],
    dailyRate: 28,
    weeklyRate: 130,
    deposit: 110,
    brand: 'DEWALT',
    model: 'DWS779',
    specs: {
      bladeSize: '10 inch',
      miterRange: '0°-60° left & right',
      bevelRange: '0°-49° left, 0°-49° right',
      crosscutCapacity: '2 x 14 inch',
    },
    location: {
      ...nearbyCoord(0.04),
      address: '543 Pacific Ave',
      neighborhood: 'Jackson Square',
      hideExactAddress: true,
    },
    searchRadius: 12,
    availability: {
      type: 'calendar',
      blackoutDates: [],
    },
    deliveryOptions: {
      pickup: true,
      delivery: true,
      meetHalfway: false,
      deliveryFee: 15,
      deliveryRadius: 18,
    },
    addons: [
      { id: 'addon-8', name: 'Saw stand', price: 12 },
    ],
    verification: {
      idVerified: true,
      addressVerified: true,
      toolPhotoVerified: true,
    },
    insuranceAvailable: true,
    safetyNotes: 'Always wear safety glasses. Wait for blade to stop before lifting. Secure workpiece.',
    status: 'active',
    views: 221,
    saves: 31,
    rating: 4.9,
    reviewCount: 19,
    owner: {
      id: 'user-19',
      name: 'Marcus Johnson',
      avatar: 'https://i.pravatar.cc/150?img=11',
      rating: 5.0,
      responseTime: 'Usually responds in 1 hour',
      joinedDate: '2022-09-17',
    },
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-06'),
    isNew: false,
  },
  {
    id: 'listing-20',
    type: 'sale',
    ownerId: 'user-20',
    title: 'Router - Plunge and Fixed Base Kit',
    description: 'Versatile router with both plunge and fixed bases. Variable speed. Includes several bits. Great for edge work.',
    category: 'Power Tools',
    condition: 'good',
    photos: ['https://picsum.photos/seed/router1/600/400'],
    price: 175,
    acceptOffers: true,
    minOffer: 150,
    brand: 'Bosch',
    model: '1617EVSPK',
    specs: {
      motor: '2.25 HP',
      speed: '8000-25000 RPM',
      bases: 'Plunge & Fixed',
      collet: '1/4" & 1/2"',
    },
    location: {
      ...nearbyCoord(0.05),
      address: '234 Greenwich St',
      neighborhood: 'Telegraph Hill',
      hideExactAddress: false,
    },
    searchRadius: 25,
    deliveryOptions: {
      pickup: true,
      delivery: true,
      meetHalfway: false,
      deliveryFee: 10,
    },
    verification: {
      idVerified: true,
      addressVerified: true,
      toolPhotoVerified: false,
    },
    insuranceAvailable: false,
    safetyNotes: 'N/A',
    status: 'active',
    views: 156,
    saves: 20,
    rating: 4.7,
    reviewCount: 8,
    owner: {
      id: 'user-20',
      name: 'Laura Davis',
      avatar: 'https://i.pravatar.cc/150?img=23',
      rating: 4.8,
      responseTime: 'Usually responds in 2 hours',
      joinedDate: '2023-07-29',
    },
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
    isNew: false,
  },
];

// Helper functions
export const getListingById = (id: string): Listing | undefined => {
  return MOCK_LISTINGS.find((listing) => listing.id === id);
};

export const getListingsByCategory = (category: string): Listing[] => {
  if (category === 'all') return MOCK_LISTINGS;
  return MOCK_LISTINGS.filter((listing) => listing.category === category);
};

export const getListingsByType = (type: 'rental' | 'sale' | 'all'): Listing[] => {
  if (type === 'all') return MOCK_LISTINGS;
  return MOCK_LISTINGS.filter((listing) => listing.type === type);
};

export const getTrendingListings = (): Listing[] => {
  // Sort by views
  return [...MOCK_LISTINGS].sort((a, b) => b.views - a.views).slice(0, 10);
};

export const getNewListings = (): Listing[] => {
  return MOCK_LISTINGS.filter((listing) => listing.isNew);
};

export const CATEGORIES = [
  'Power Tools',
  'Hand Tools',
  'Ladders & Scaffolding',
  'Plumbing Tools',
  'Electrical Tools',
  'Measuring & Testing',
  'Safety Equipment',
  'Garden & Landscaping',
  'Paint & Finishing',
  'Heavy Equipment',
  'Material Handling',
  'Compaction & Excavation',
  'Lighting',
  'Other',
];
