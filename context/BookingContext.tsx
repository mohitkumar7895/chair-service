'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ServiceCategory, RepairUrgency, BookingRequest, ServiceItem } from '@/models/types';

interface BookingFormData {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  category: ServiceCategory;
  serviceId?: string;
  serviceName: string;
  itemCount: number;
  issueDescription: string;
  preferredDate: string;
  urgency: RepairUrgency;
  estimatedCost: number;
}

interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

interface BookingContextType {
  isModalOpen: boolean;
  selectedService: ServiceItem | null;
  openBookingModal: (service?: ServiceItem | null, prefilledCategory?: ServiceCategory) => void;
  closeBookingModal: () => void;
  submitBooking: (data: BookingFormData) => Promise<{ success: boolean; booking?: BookingRequest; error?: string }>;
  toasts: ToastNotification[];
  showToast: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
  removeToast: (id: string) => void;
  selectedCategoryTab: ServiceCategory;
  setSelectedCategoryTab: (cat: ServiceCategory) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<ServiceCategory>('salon_chair');
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openBookingModal = (service?: ServiceItem | null, prefilledCategory?: ServiceCategory) => {
    if (service) {
      setSelectedService(service);
      setSelectedCategoryTab(service.category);
    } else if (prefilledCategory) {
      setSelectedCategoryTab(prefilledCategory);
      setSelectedService(null);
    } else {
      setSelectedService(null);
    }
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const submitBooking = async (formData: BookingFormData) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit booking request');
      }

      showToast(
        'success',
        'Repair Request Confirmed!',
        `Your booking ID is ${result.booking.id}. Our master technician will contact you shortly.`
      );
      closeBookingModal();
      return { success: true, booking: result.booking };
    } catch (err: any) {
      showToast('error', 'Booking Submission Error', err.message || 'Something went wrong. Please try calling directly.');
      return { success: false, error: err.message };
    }
  };

  return (
    <BookingContext.Provider
      value={{
        isModalOpen,
        selectedService,
        openBookingModal,
        closeBookingModal,
        submitBooking,
        toasts,
        showToast,
        removeToast,
        selectedCategoryTab,
        setSelectedCategoryTab
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
