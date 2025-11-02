/**
 * Booking Context
 * Manages bookings (rentals) and orders (buy/sell)
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type BookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled' | 'disputed';
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
export type DeliveryMethod = 'pickup' | 'delivery' | 'meet-halfway';
export type ShippingMethod = 'pickup' | 'shipping';

export interface Booking {
  id: string;
  listingId: string;
  renterId: string;
  ownerId: string;

  // Dates
  startDate: Date;
  endDate: Date;
  duration: number; // days

  // Pricing
  dailyRate: number;
  totalRentalCost: number;
  serviceFee: number;
  deposit: number;
  addons: { id: string; name: string; price: number }[];
  insurance?: number;
  totalCharged: number;

  // Delivery
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: string;
  deliveryFee?: number;

  // Status
  status: BookingStatus;

  // Pickup/Return
  pickupConfirmed: boolean;
  pickupQRScanned: boolean;
  pickupTimestamp?: Date;

  returnRequested: boolean;
  returnConfirmed: boolean;
  returnTimestamp?: Date;

  // Extensions
  extensions: {
    newEndDate: Date;
    additionalCost: number;
    approvedAt: Date;
  }[];

  // Late fees
  lateFees?: {
    daysLate: number;
    feePerDay: number;
    totalFee: number;
    charged: boolean;
  };

  // Dispute
  dispute?: {
    reportedBy: 'renter' | 'owner';
    type: string;
    description: string;
    status: 'open' | 'resolved' | 'escalated';
  };

  // Reviews
  renterReviewed: boolean;
  ownerReviewed: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;

  // Pricing
  price: number;
  quantity: number;
  totalPrice: number;

  // Shipping
  shippingMethod: ShippingMethod;
  shippingAddress?: string;
  shippingCost?: number;
  trackingNumber?: string;

  // Status
  status: OrderStatus;

  // Fulfillment
  shippedAt?: Date;
  deliveredAt?: Date;
  pickedUpAt?: Date;

  // Reviews
  buyerReviewed: boolean;
  sellerReviewed: boolean;

  createdAt: Date;
  updatedAt: Date;
}

interface BookingContextValue {
  // Bookings
  bookings: Booking[];
  getBooking: (id: string) => Booking | undefined;
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateBookingStatus: (id: string, status: BookingStatus) => Promise<void>;
  confirmPickup: (id: string) => Promise<void>;
  confirmReturn: (id: string) => Promise<void>;
  requestExtension: (id: string, newEndDate: Date, cost: number) => Promise<void>;
  reportIssue: (id: string, type: string, description: string, reportedBy: 'renter' | 'owner') => Promise<void>;

  // Orders
  orders: Order[];
  getOrder: (id: string) => Order | undefined;
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  markShipped: (id: string, trackingNumber: string) => Promise<void>;
  markDelivered: (id: string) => Promise<void>;

  // Loading
  isLoading: boolean;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [bookingsData, ordersData] = await Promise.all([
        AsyncStorage.getItem('marketplace_bookings'),
        AsyncStorage.getItem('marketplace_orders'),
      ]);

      if (bookingsData) {
        const parsedBookings = JSON.parse(bookingsData).map((b: any) => ({
          ...b,
          startDate: new Date(b.startDate),
          endDate: new Date(b.endDate),
          createdAt: new Date(b.createdAt),
          updatedAt: new Date(b.updatedAt),
          pickupTimestamp: b.pickupTimestamp ? new Date(b.pickupTimestamp) : undefined,
          returnTimestamp: b.returnTimestamp ? new Date(b.returnTimestamp) : undefined,
        }));
        setBookings(parsedBookings);
      }

      if (ordersData) {
        const parsedOrders = JSON.parse(ordersData).map((o: any) => ({
          ...o,
          createdAt: new Date(o.createdAt),
          updatedAt: new Date(o.updatedAt),
          shippedAt: o.shippedAt ? new Date(o.shippedAt) : undefined,
          deliveredAt: o.deliveredAt ? new Date(o.deliveredAt) : undefined,
          pickedUpAt: o.pickedUpAt ? new Date(o.pickedUpAt) : undefined,
        }));
        setOrders(parsedOrders);
      }
    } catch (error) {
      console.error('Error loading bookings/orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBookings = async (newBookings: Booking[]) => {
    try {
      await AsyncStorage.setItem('marketplace_bookings', JSON.stringify(newBookings));
    } catch (error) {
      console.error('Error saving bookings:', error);
    }
  };

  const saveOrders = async (newOrders: Order[]) => {
    try {
      await AsyncStorage.setItem('marketplace_orders', JSON.stringify(newOrders));
    } catch (error) {
      console.error('Error saving orders:', error);
    }
  };

  // Booking functions
  const getBooking = (id: string) => bookings.find((b) => b.id === id);

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    const id = `booking-${Date.now()}`;
    const newBooking: Booking = {
      ...bookingData,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updated = [...bookings, newBooking];
    setBookings(updated);
    await saveBookings(updated);
    return id;
  };

  const updateBookingStatus = async (id: string, status: BookingStatus) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status, updatedAt: new Date() } : b
    );
    setBookings(updated);
    await saveBookings(updated);
  };

  const confirmPickup = async (id: string) => {
    const updated = bookings.map((b) =>
      b.id === id
        ? {
            ...b,
            pickupConfirmed: true,
            pickupQRScanned: true,
            pickupTimestamp: new Date(),
            status: 'active' as BookingStatus,
            updatedAt: new Date(),
          }
        : b
    );
    setBookings(updated);
    await saveBookings(updated);
  };

  const confirmReturn = async (id: string) => {
    const updated = bookings.map((b) =>
      b.id === id
        ? {
            ...b,
            returnConfirmed: true,
            returnTimestamp: new Date(),
            status: 'completed' as BookingStatus,
            updatedAt: new Date(),
          }
        : b
    );
    setBookings(updated);
    await saveBookings(updated);
  };

  const requestExtension = async (id: string, newEndDate: Date, cost: number) => {
    const updated = bookings.map((b) =>
      b.id === id
        ? {
            ...b,
            endDate: newEndDate,
            extensions: [
              ...b.extensions,
              {
                newEndDate,
                additionalCost: cost,
                approvedAt: new Date(),
              },
            ],
            updatedAt: new Date(),
          }
        : b
    );
    setBookings(updated);
    await saveBookings(updated);
  };

  const reportIssue = async (id: string, type: string, description: string, reportedBy: 'renter' | 'owner') => {
    const updated = bookings.map((b) =>
      b.id === id
        ? {
            ...b,
            status: 'disputed' as BookingStatus,
            dispute: {
              reportedBy,
              type,
              description,
              status: 'open' as const,
            },
            updatedAt: new Date(),
          }
        : b
    );
    setBookings(updated);
    await saveBookings(updated);
  };

  // Order functions
  const getOrder = (id: string) => orders.find((o) => o.id === id);

  const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    const id = `order-${Date.now()}`;
    const newOrder: Order = {
      ...orderData,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updated = [...orders, newOrder];
    setOrders(updated);
    await saveOrders(updated);
    return id;
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status, updatedAt: new Date() } : o
    );
    setOrders(updated);
    await saveOrders(updated);
  };

  const markShipped = async (id: string, trackingNumber: string) => {
    const updated = orders.map((o) =>
      o.id === id
        ? {
            ...o,
            status: 'shipped' as OrderStatus,
            trackingNumber,
            shippedAt: new Date(),
            updatedAt: new Date(),
          }
        : o
    );
    setOrders(updated);
    await saveOrders(updated);
  };

  const markDelivered = async (id: string) => {
    const updated = orders.map((o) =>
      o.id === id
        ? {
            ...o,
            status: 'delivered' as OrderStatus,
            deliveredAt: new Date(),
            updatedAt: new Date(),
          }
        : o
    );
    setOrders(updated);
    await saveOrders(updated);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        getBooking,
        createBooking,
        updateBookingStatus,
        confirmPickup,
        confirmReturn,
        requestExtension,
        reportIssue,
        orders,
        getOrder,
        createOrder,
        updateOrderStatus,
        markShipped,
        markDelivered,
        isLoading,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
