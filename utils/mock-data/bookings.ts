/**
 * Mock Data: Bookings & Orders
 * Sample bookings/orders and simulation functions
 */

import type { Booking, Order } from '@/contexts/booking-context';

// Mock QR code URLs (would be dynamically generated in real app)
export const generateMockQRCode = (bookingId: string): string => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${bookingId}`;
};

// Simulate booking creation with payment processing
export const mockCreateBooking = async (
  bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>
): Promise<{ success: boolean; bookingId: string; qrCode: string }> => {
  // Simulate payment processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const bookingId = `booking-${Date.now()}`;
  const qrCode = generateMockQRCode(bookingId);

  return {
    success: true,
    bookingId,
    qrCode,
  };
};

// Simulate order creation with payment processing
export const mockCreateOrder = async (
  orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>
): Promise<{ success: boolean; orderId: string; trackingNumber?: string }> => {
  // Simulate payment processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const orderId = `order-${Date.now()}`;
  const trackingNumber = orderData.shippingMethod === 'shipping' ? `TRACK${Date.now()}` : undefined;

  return {
    success: true,
    orderId,
    trackingNumber,
  };
};

// Sample bookings (rental)
export const SAMPLE_BOOKINGS: Omit<Booking, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'booking-sample-1',
    listingId: 'listing-1', // DeWalt Drill
    renterId: 'current-user',
    ownerId: 'user-1',
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    duration: 3,
    dailyRate: 15,
    totalRentalCost: 45,
    serviceFee: 4.5,
    deposit: 50,
    addons: [{ id: 'addon-1', name: 'Extra drill bits set', price: 5 }],
    insurance: 9,
    totalCharged: 63.5,
    deliveryMethod: 'delivery',
    deliveryAddress: '123 Your Street, San Francisco, CA 94102',
    deliveryFee: 10,
    status: 'confirmed',
    pickupConfirmed: false,
    pickupQRScanned: false,
    returnRequested: false,
    returnConfirmed: false,
    extensions: [],
    renterReviewed: false,
    ownerReviewed: false,
  },
  {
    id: 'booking-sample-2',
    listingId: 'listing-4', // Pressure Washer
    renterId: 'current-user',
    ownerId: 'user-4',
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Started yesterday
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Ends tomorrow
    duration: 2,
    dailyRate: 40,
    totalRentalCost: 80,
    serviceFee: 8,
    deposit: 150,
    addons: [],
    totalCharged: 88,
    deliveryMethod: 'pickup',
    status: 'active',
    pickupConfirmed: true,
    pickupQRScanned: true,
    pickupTimestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    returnRequested: false,
    returnConfirmed: false,
    extensions: [],
    renterReviewed: false,
    ownerReviewed: false,
  },
  {
    id: 'booking-sample-3',
    listingId: 'listing-19', // Miter Saw
    renterId: 'current-user',
    ownerId: 'user-19',
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    duration: 5,
    dailyRate: 28,
    totalRentalCost: 140,
    serviceFee: 14,
    deposit: 110,
    addons: [{ id: 'addon-8', name: 'Saw stand', price: 12 }],
    insurance: 15,
    totalCharged: 181,
    deliveryMethod: 'pickup',
    status: 'completed',
    pickupConfirmed: true,
    pickupQRScanned: true,
    pickupTimestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    returnRequested: true,
    returnConfirmed: true,
    returnTimestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    extensions: [],
    renterReviewed: false,
    ownerReviewed: false,
  },
];

// Sample orders (buy/sell)
export const SAMPLE_ORDERS: Omit<Order, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'order-sample-1',
    listingId: 'listing-3', // Craftsman Tool Set
    buyerId: 'current-user',
    sellerId: 'user-3',
    price: 150,
    quantity: 1,
    totalPrice: 150,
    shippingMethod: 'pickup',
    status: 'paid',
    buyerReviewed: false,
    sellerReviewed: false,
  },
  {
    id: 'order-sample-2',
    listingId: 'listing-9', // Paint Sprayer
    buyerId: 'current-user',
    sellerId: 'user-9',
    price: 200,
    quantity: 1,
    totalPrice: 212,
    shippingMethod: 'shipping',
    shippingAddress: '123 Your Street, San Francisco, CA 94102',
    shippingCost: 12,
    trackingNumber: 'TRACK1234567890',
    status: 'shipped',
    shippedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    buyerReviewed: false,
    sellerReviewed: false,
  },
  {
    id: 'order-sample-3',
    listingId: 'listing-15', // Laser Level
    buyerId: 'current-user',
    sellerId: 'user-15',
    price: 250,
    quantity: 1,
    totalPrice: 265,
    shippingMethod: 'shipping',
    shippingAddress: '123 Your Street, San Francisco, CA 94102',
    shippingCost: 15,
    trackingNumber: 'TRACK0987654321',
    status: 'delivered',
    shippedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    deliveredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    buyerReviewed: false,
    sellerReviewed: false,
  },
];

// Calculate price breakdown for a rental
export interface PriceBreakdown {
  rentalCost: number;
  serviceFee: number;
  deposit: number;
  addonsCost: number;
  insurance?: number;
  deliveryFee?: number;
  totalDue: number;
  totalCharged: number; // Total - deposit (deposit held separately)
}

export const calculateRentalPrice = (
  dailyRate: number,
  days: number,
  addons: { price: number }[] = [],
  includeInsurance: boolean = false,
  deliveryFee: number = 0,
  deposit: number = 0
): PriceBreakdown => {
  const rentalCost = dailyRate * days;
  const serviceFee = rentalCost * 0.1; // 10% service fee
  const addonsCost = addons.reduce((sum, addon) => sum + addon.price, 0);
  const insurance = includeInsurance ? days * 3 : undefined; // $3/day for insurance

  const subtotal = rentalCost + serviceFee + addonsCost + (insurance || 0) + deliveryFee;
  const totalDue = subtotal + deposit;
  const totalCharged = subtotal; // Deposit held separately

  return {
    rentalCost,
    serviceFee,
    deposit,
    addonsCost,
    insurance,
    deliveryFee: deliveryFee > 0 ? deliveryFee : undefined,
    totalDue,
    totalCharged,
  };
};

// Calculate late fees
export const calculateLateFees = (
  expectedReturnDate: Date,
  actualReturnDate: Date,
  dailyRate: number,
  gracePeriodHours: number = 2
): { daysLate: number; totalFee: number } | null => {
  const graceMs = gracePeriodHours * 60 * 60 * 1000;
  const lateMs = actualReturnDate.getTime() - expectedReturnDate.getTime() - graceMs;

  if (lateMs <= 0) {
    return null; // Not late
  }

  const daysLate = Math.ceil(lateMs / (24 * 60 * 60 * 1000));
  const feePerDay = 10; // $10 per day late fee
  const totalFee = daysLate * feePerDay;

  return { daysLate, totalFee };
};
