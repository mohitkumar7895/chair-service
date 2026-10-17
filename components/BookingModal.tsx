'use client';

import React, { useState, useEffect } from 'react';
import { useBooking } from '@/context/BookingContext';
import { 
  X, 
  Calendar, 
  ShieldCheck, 
  Wrench, 
  Phone, 
  MapPin, 
  User, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { ServiceCategory } from '@/models/types';

export default function BookingModal() {
  const { isModalOpen, closeBookingModal, selectedService, submitBooking } = useBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '919772381091';

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    city: 'New Delhi / NCR',
    category: 'office_chair' as ServiceCategory,
    serviceName: 'Pneumatic Gas Lift & Hydraulic Cylinder Replacement'
  });

  // When selected service changes, prefill
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({
        ...prev,
        category: selectedService.category,
        serviceName: selectedService.title
      }));
    }
  }, [selectedService]);

  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitBooking({
        customerName: formData.customerName,
        phone: formData.phone,
        email: '',
        address: formData.address,
        city: formData.city,
        category: formData.category,
        serviceId: selectedService?.id,
        serviceName: formData.serviceName,
        itemCount: 1,
        issueDescription: `Doorstep service request for ${formData.serviceName}`,
        preferredDate: new Date().toISOString().split('T')[0],
        urgency: 'normal',
        estimatedCost: 0
      });

      closeBookingModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories: { key: ServiceCategory; label: string; defaultService: string }[] = [
    { key: 'office_chair', label: '💺 Office Chair', defaultService: 'Pneumatic Gas Lift & Hydraulic Cylinder Replacement' },
    { key: 'recliner_chair', label: '🛋️ Recliner', defaultService: 'Motorized & Electric Power Recliner Repair' },
    { key: 'salon_chair', label: '✂️ Salon Chair', defaultService: 'Hydraulic Pump & Base Repair' },
    { key: 'sofa_repair', label: '🛋️ Sofa / Couch', defaultService: '40D Sofa Cushion Foam Refilling' }
  ];

  return (
    <div className="modal-backdrop" onClick={closeBookingModal}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '520px',
          borderRadius: '24px',
          padding: '28px 24px',
          background: '#ffffff',
          boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.35)',
          animation: 'fadeInSlideUp 0.25s ease-out'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div className="badge-gold" style={{ marginBottom: '6px', padding: '4px 12px', fontSize: '0.74rem' }}>
              <Wrench size={13} />
              <span>Doorstep Technician Booking</span>
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
              Schedule Doorstep Inspection
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.86rem', margin: 0 }}>
              Certified master technician visit with 1-year written warranty
            </p>
          </div>

          <button
            onClick={closeBookingModal}
            style={{
              background: '#f1f5f9',
              color: '#64748b',
              padding: '6px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Minimal High-Speed Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Category Switcher (4 Categories Grid) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {categories.map((cat) => {
              const isSelected = formData.category === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.key, serviceName: cat.defaultService })}
                  style={{
                    padding: '9px 10px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    border: '1.5px solid',
                    borderColor: isSelected ? '#d97706' : '#e2e8f0',
                    background: isSelected ? '#fffbeb' : '#ffffff',
                    color: isSelected ? '#92400e' : '#64748b',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'center'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Customer Name */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
              Your Name / Office / Salon Name *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="e.g. Rahul Sharma / DLF Cyber Hub"
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 36px',
                  borderRadius: '12px',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <User size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
              Phone Number (For Technician Call) *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 36px',
                  borderRadius: '12px',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <Phone size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
            </div>
          </div>

          {/* Address */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
              Complete Address / Location *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Street address, building, apartment or office floor"
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 36px',
                  borderRadius: '12px',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <MapPin size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
            </div>
          </div>

          {/* Trust Banner */}
          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '12px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#166534',
              fontSize: '0.82rem',
              fontWeight: 700
            }}
          >
            <ShieldCheck size={16} color="#16a34a" />
            <span>Free Doorstep Inspection • 100% Genuine OEM Spares & Warranty</span>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold"
            style={{
              padding: '13px',
              fontSize: '0.94rem',
              fontWeight: 800,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px -4px rgba(217, 119, 6, 0.65)'
            }}
          >
            <Calendar size={17} />
            <span>{isSubmitting ? 'Confirming Visit...' : 'Confirm Doorstep Visit'}</span>
            <ArrowRight size={16} />
          </button>

          {/* Or WhatsApp quick CTA */}
          <div style={{ textAlign: 'center', marginTop: '4px' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>or prefer instant messaging? </span>
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                `Hi, I need doorstep repair for my ${formData.category.replace('_', ' ')}. Please send technician details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#059669',
                fontWeight: 700,
                fontSize: '0.82rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <MessageCircle size={14} />
              <span>Book via WhatsApp</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
