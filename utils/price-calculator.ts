/**
 * Price Calculator Utility
 * Functions for calculating rental prices, deposits, fees, etc.
 */

const SERVICE_FEE_RATE = 0.1; // 10% service fee
const INSURANCE_DAILY_RATE = 3; // $3 per day
const LATE_FEE_PER_DAY = 10; // $10 per day
const GRACE_PERIOD_HOURS = 2; // 2 hour grace period for returns

export interface RentalPriceBreakdown {
  dailyRate: number;
  days: number;
  rentalCost: number;
  weeklyDiscount?: number;
  serviceFee: number;
  deposit: number;
  addonsCost: number;
  insurance?: number;
  deliveryFee?: number;
  subtotal: number;
  totalDue: number;
  totalCharged: number; // Total - deposit (deposit held separately)
}

/**
 * Calculate rental price breakdown
 */
export const calculateRentalPrice = (
  dailyRate: number,
  weeklyRate: number | undefined,
  days: number,
  deposit: number,
  addons: { price: number }[] = [],
  includeInsurance: boolean = false,
  deliveryFee: number = 0
): RentalPriceBreakdown => {
  let rentalCost: number;
  let weeklyDiscount: number | undefined;

  // Apply weekly rate if booking is 7+ days and weekly rate exists
  if (days >= 7 && weeklyRate) {
    const weeks = Math.floor(days / 7);
    const extraDays = days % 7;
    rentalCost = weeks * weeklyRate + extraDays * dailyRate;
    const fullPriceCost = days * dailyRate;
    weeklyDiscount = fullPriceCost - rentalCost;
  } else {
    rentalCost = dailyRate * days;
  }

  const serviceFee = rentalCost * SERVICE_FEE_RATE;
  const addonsCost = addons.reduce((sum, addon) => sum + addon.price, 0);
  const insurance = includeInsurance ? days * INSURANCE_DAILY_RATE : undefined;

  const subtotal = rentalCost + serviceFee + addonsCost + (insurance || 0) + deliveryFee;
  const totalDue = subtotal + deposit;
  const totalCharged = subtotal; // Deposit held separately via payment auth

  return {
    dailyRate,
    days,
    rentalCost,
    weeklyDiscount,
    serviceFee,
    deposit,
    addonsCost,
    insurance,
    deliveryFee: deliveryFee > 0 ? deliveryFee : undefined,
    subtotal,
    totalDue,
    totalCharged,
  };
};

/**
 * Calculate extension cost
 */
export const calculateExtensionCost = (dailyRate: number, additionalDays: number): number => {
  const rentalCost = dailyRate * additionalDays;
  const serviceFee = rentalCost * SERVICE_FEE_RATE;
  return rentalCost + serviceFee;
};

/**
 * Calculate late fees
 */
export const calculateLateFees = (
  expectedReturnDate: Date,
  actualReturnDate: Date = new Date()
): { daysLate: number; totalFee: number } | null => {
  const graceMs = GRACE_PERIOD_HOURS * 60 * 60 * 1000;
  const lateMs = actualReturnDate.getTime() - expectedReturnDate.getTime() - graceMs;

  if (lateMs <= 0) {
    return null; // Not late or within grace period
  }

  const daysLate = Math.ceil(lateMs / (24 * 60 * 60 * 1000));
  const totalFee = daysLate * LATE_FEE_PER_DAY;

  return { daysLate, totalFee };
};

/**
 * Format price as currency
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

/**
 * Format daily rate display
 */
export const formatDailyRate = (rate: number): string => {
  return `$${rate}/day`;
};

/**
 * Format weekly rate display
 */
export const formatWeeklyRate = (rate: number): string => {
  return `$${rate}/week`;
};

/**
 * Calculate weekly rate from daily rate with discount
 */
export const calculateWeeklyRate = (dailyRate: number, discountPercent: number = 15): number => {
  const fullWeekCost = dailyRate * 7;
  return fullWeekCost * (1 - discountPercent / 100);
};

/**
 * Calculate suggested deposit based on daily rate
 */
export const calculateSuggestedDeposit = (dailyRate: number): number => {
  // Suggest 2-3x daily rate as deposit
  return Math.round(dailyRate * 2.5);
};

/**
 * Calculate days between dates
 */
export const calculateDaysBetween = (startDate: Date, endDate: Date): number => {
  const diffMs = endDate.getTime() - startDate.getTime();
  return Math.ceil(diffMs / (24 * 60 * 60 * 1000));
};
