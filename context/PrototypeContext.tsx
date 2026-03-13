'use client';

/**
 * Prototype app state: logged-in user, bookings, and reviews.
 * No backend — state lives in memory for the vision prototype.
 */

import React, { createContext, useContext, useCallback, useState, useMemo } from 'react';
import type { MockBooking, BookingStatus, MockReview } from '@/lib/mockData';

interface PrototypeState {
  isLoggedIn: boolean;
  userName: string;
  bookings: MockBooking[];
  reviews: MockReview[];
  recurringProfessionalIds: string[];
}

interface PrototypeContextValue extends PrototypeState {
  login: (email: string) => void;
  logout: () => void;
  addBooking: (booking: Omit<MockBooking, 'id' | 'status'>) => string;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  addReview: (review: Omit<MockReview, 'id'>) => void;
  getBooking: (id: string) => MockBooking | undefined;
  addRecurringProfessional: (professionalId: string) => void;
}

const initialState: PrototypeState = {
  isLoggedIn: false,
  userName: '',
  bookings: [],
  reviews: [],
  recurringProfessionalIds: [],
};

const PrototypeContext = createContext<PrototypeContextValue | null>(null);

function generateId(): string {
  return 'id-' + Math.random().toString(36).slice(2, 11);
}

export function PrototypeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PrototypeState>(initialState);

  const login = useCallback((email: string) => {
    setState((s) => ({
      ...s,
      isLoggedIn: true,
      userName: email.split('@')[0] || 'Usuario',
    }));
  }, []);

  const logout = useCallback(() => {
    setState(initialState);
  }, []);

  const addBooking = useCallback((booking: Omit<MockBooking, 'id' | 'status'>) => {
    const id = generateId();
    const newBooking: MockBooking = {
      ...booking,
      id,
      status: 'pending',
    };
    setState((s) => ({
      ...s,
      bookings: [newBooking, ...s.bookings],
    }));
    return id;
  }, []);

  const updateBookingStatus = useCallback((bookingId: string, status: BookingStatus) => {
    setState((s) => ({
      ...s,
      bookings: s.bookings.map((b) =>
        b.id === bookingId ? { ...b, status } : b
      ),
    }));
  }, []);

  const addReview = useCallback((review: Omit<MockReview, 'id'>) => {
    const id = generateId();
    setState((s) => ({
      ...s,
      reviews: [...s.reviews, { ...review, id }],
    }));
  }, []);

  const getBooking = useCallback(
    (id: string) => state.bookings.find((b) => b.id === id),
    [state.bookings]
  );

  const addRecurringProfessional = useCallback((professionalId: string) => {
    setState((s) => ({
      ...s,
      recurringProfessionalIds: s.recurringProfessionalIds.includes(professionalId)
        ? s.recurringProfessionalIds
        : [...s.recurringProfessionalIds, professionalId],
    }));
  }, []);

  const value = useMemo<PrototypeContextValue>(
    () => ({
      ...state,
      login,
      logout,
      addBooking,
      updateBookingStatus,
      addReview,
      getBooking,
      addRecurringProfessional,
    }),
    [state, login, logout, addBooking, updateBookingStatus, addReview, getBooking, addRecurringProfessional]
  );

  return (
    <PrototypeContext.Provider value={value}>
      {children}
    </PrototypeContext.Provider>
  );
}

export function usePrototype() {
  const ctx = useContext(PrototypeContext);
  if (!ctx) throw new Error('usePrototype must be used within PrototypeProvider');
  return ctx;
}
