/**
 * Availability Checker Utility
 * Functions for checking rental availability and date conflicts
 */

import type { Booking } from '@/contexts/booking-context';

/**
 * Check if two date ranges overlap
 */
export const datesOverlap = (
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean => {
  return start1 <= end2 && end1 >= start2;
};

/**
 * Check if a date is within a blackout period
 */
export const isDateBlackedOut = (date: Date, blackoutDates: string[]): boolean => {
  const dateStr = date.toISOString().split('T')[0];
  return blackoutDates.includes(dateStr);
};

/**
 * Check if a date range contains any blackout dates
 */
export const hasBlackoutDates = (
  startDate: Date,
  endDate: Date,
  blackoutDates: string[]
): boolean => {
  const current = new Date(startDate);
  while (current <= endDate) {
    if (isDateBlackedOut(current, blackoutDates)) {
      return true;
    }
    current.setDate(current.getDate() + 1);
  }
  return false;
};

/**
 * Check if listing is available for given dates
 */
export const isAvailableForDates = (
  startDate: Date,
  endDate: Date,
  existingBookings: Booking[],
  blackoutDates: string[] = []
): { available: boolean; reason?: string } => {
  // Check blackout dates
  if (hasBlackoutDates(startDate, endDate, blackoutDates)) {
    return {
      available: false,
      reason: 'Selected dates include blackout periods',
    };
  }

  // Check for conflicts with existing bookings
  for (const booking of existingBookings) {
    // Only check active/confirmed bookings
    if (booking.status !== 'active' && booking.status !== 'confirmed') {
      continue;
    }

    if (datesOverlap(startDate, endDate, booking.startDate, booking.endDate)) {
      return {
        available: false,
        reason: 'Already booked for these dates',
      };
    }
  }

  return { available: true };
};

/**
 * Get all booked dates for a listing
 */
export const getBookedDates = (bookings: Booking[]): string[] => {
  const bookedDates: Set<string> = new Set();

  for (const booking of bookings) {
    // Only include active/confirmed bookings
    if (booking.status !== 'active' && booking.status !== 'confirmed') {
      continue;
    }

    const current = new Date(booking.startDate);
    const end = new Date(booking.endDate);

    while (current <= end) {
      bookedDates.add(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
  }

  return Array.from(bookedDates);
};

/**
 * Get next available date for a listing
 */
export const getNextAvailableDate = (
  bookings: Booking[],
  blackoutDates: string[] = []
): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bookedDates = getBookedDates(bookings);
  let current = new Date(today);

  // Check next 90 days
  for (let i = 0; i < 90; i++) {
    const dateStr = current.toISOString().split('T')[0];

    if (!bookedDates.includes(dateStr) && !blackoutDates.includes(dateStr)) {
      return current;
    }

    current.setDate(current.getDate() + 1);
  }

  // If no availability in next 90 days, return 90 days from now
  return current;
};

/**
 * Find available date ranges within a period
 */
export const findAvailableRanges = (
  startSearchDate: Date,
  endSearchDate: Date,
  bookings: Booking[],
  blackoutDates: string[] = [],
  minDays: number = 1
): { start: Date; end: Date }[] => {
  const bookedDates = new Set([...getBookedDates(bookings), ...blackoutDates]);
  const availableRanges: { start: Date; end: Date }[] = [];

  let rangeStart: Date | null = null;
  const current = new Date(startSearchDate);

  while (current <= endSearchDate) {
    const dateStr = current.toISOString().split('T')[0];
    const isBooked = bookedDates.has(dateStr);

    if (!isBooked) {
      if (!rangeStart) {
        rangeStart = new Date(current);
      }
    } else {
      if (rangeStart) {
        const rangeEnd = new Date(current);
        rangeEnd.setDate(rangeEnd.getDate() - 1);

        const days = Math.ceil(
          (rangeEnd.getTime() - rangeStart.getTime()) / (24 * 60 * 60 * 1000)
        ) + 1;

        if (days >= minDays) {
          availableRanges.push({ start: rangeStart, end: rangeEnd });
        }

        rangeStart = null;
      }
    }

    current.setDate(current.getDate() + 1);
  }

  // Handle case where range extends to end date
  if (rangeStart) {
    const days = Math.ceil(
      (endSearchDate.getTime() - rangeStart.getTime()) / (24 * 60 * 60 * 1000)
    ) + 1;

    if (days >= minDays) {
      availableRanges.push({ start: rangeStart, end: endSearchDate });
    }
  }

  return availableRanges;
};

/**
 * Validate booking dates
 */
export const validateBookingDates = (
  startDate: Date,
  endDate: Date
): { valid: boolean; error?: string } => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (startDate < today) {
    return {
      valid: false,
      error: 'Start date cannot be in the past',
    };
  }

  if (endDate < startDate) {
    return {
      valid: false,
      error: 'End date must be after start date',
    };
  }

  if (startDate.getTime() === endDate.getTime()) {
    return {
      valid: false,
      error: 'Rental must be at least 1 day',
    };
  }

  // Check if booking is too far in advance (e.g., 1 year)
  const oneYearFromNow = new Date(today);
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  if (startDate > oneYearFromNow) {
    return {
      valid: false,
      error: 'Cannot book more than 1 year in advance',
    };
  }

  return { valid: true };
};
