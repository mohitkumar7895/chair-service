'use client';

import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { Calculator, ArrowRight, Check } from 'lucide-react';
import { ServiceCategory, RepairUrgency } from '@/models/types';
import TypewriterHeading from './TypewriterHeading';

export default function CostCalculator() {
  const { openBookingModal } = useBooking();

  const [category, setCategory] = useState<ServiceCategory>('salon_chair');
  const [selectedIssue, setSelectedIssue] = useState<string>('hydraulic');
  const [quantity, setQuantity] = useState<number>(2);
  const [urgency, setUrgency] = useState<RepairUrgency>('normal');

  const chairIssues = [
    { id: 'hydraulic', label: 'Hydraulic Pump Sinking / Fluid Leak', basePrice: 999 },
    { id: 'upholstery', label: 'Full Salon Chair Leather Re-Upholstery', basePrice: 1499 },
    { id: 'swivel', label: '360° Swivel Base & Recliner Mechanism', basePrice: 799 },
    { id: 'total_overhaul', label: 'Complete Barber Chair Restoration (Pump + Leather)', basePrice: 2299 }
  ];

  const sofaIssues = [
    { id: 'foam', label: 'High-Density 40D Foam Cushion Refilling', basePrice: 1299 },
    { id: 'upholstery_sofa', label: 'Designer Fabric / Velvet Re-Upholstery', basePrice: 1899 },
    { id: 'leather', label: 'Genuine Leather Crack Repair & Color Match', basePrice: 2699 },
    { id: 'frame_spring', label: 'Broken Frame Joints & Spring Retensioning', basePrice: 899 }
  ];

  const currentIssues = category === 'salon_chair' ? chairIssues : sofaIssues;
  const activeIssueObj = currentIssues.find((i) => i.id === selectedIssue) || currentIssues[0];

  // Calculate pricing
  const baseCost = activeIssueObj.basePrice * quantity;
  const urgencyMultiplier = urgency === 'emergency' ? 1.25 : urgency === 'same_day' ? 1.15 : 1.0;
  const totalEstimated = Math.round(baseCost * urgencyMultiplier);

  const handleBookWithEstimate = () => {
    openBookingModal(null, category);
  };

  return (
    <section id="calculator" style={{ padding: '90px 20px', background: '#f8fafc', position: 'relative' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div className="badge-gold" style={{ marginBottom: '14px' }}>
            <Calculator size={14} />
            <span>Instant Transparent Pricing</span>
          </div>
          <TypewriterHeading
            text="Calculate Your"
            highlightText="Repair Estimate"
            style={{
              fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '14px',
              color: '#0f172a'
            }}
          />
          <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto' }}>
            No hidden fees, no surprises. Select your furniture type, repair requirements, and urgency to see an instant estimate.
          </p>
        </div>

        <div
          className="glass-panel"
          style={{
            padding: '36px',
            borderRadius: '24px',
            background: '#ffffff',
            boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px'
          }}
        >
          {/* Controls Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Step 1: Category */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '10px' }}>
                1. Select Furniture Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setCategory('salon_chair');
                    setSelectedIssue('hydraulic');
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    textAlign: 'center',
                    border: '1px solid',
                    borderColor: category === 'salon_chair' ? '#d97706' : '#e2e8f0',
                    background: category === 'salon_chair' ? '#fef3c7' : '#ffffff',
                    color: category === 'salon_chair' ? '#92400e' : '#475569',
                    boxShadow: category === 'salon_chair' ? '0 4px 12px rgba(217, 119, 6, 0.15)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ✂️ Salon Chair
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCategory('sofa_repair');
                    setSelectedIssue('foam');
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    textAlign: 'center',
                    border: '1px solid',
                    borderColor: category === 'sofa_repair' ? '#d97706' : '#e2e8f0',
                    background: category === 'sofa_repair' ? '#fef3c7' : '#ffffff',
                    color: category === 'sofa_repair' ? '#92400e' : '#475569',
                    boxShadow: category === 'sofa_repair' ? '0 4px 12px rgba(217, 119, 6, 0.15)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  🛋️ Sofa / Couch
                </button>
              </div>
            </div>

            {/* Step 2: Issue */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '10px' }}>
                2. Select Primary Issue / Work Needed
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentIssues.map((issue) => (
                  <div
                    key={issue.id}
                    onClick={() => setSelectedIssue(issue.id)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: selectedIssue === issue.id ? '#d97706' : '#e2e8f0',
                      background: selectedIssue === issue.id ? '#fffbeb' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: selectedIssue === issue.id ? '0 2px 8px rgba(217, 119, 6, 0.1)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ fontSize: '0.92rem', color: selectedIssue === issue.id ? '#92400e' : '#334155', fontWeight: selectedIssue === issue.id ? 700 : 500 }}>
                      {issue.label}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#b45309', fontWeight: 800 }}>
                      ₹{issue.basePrice}/ea
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Quantity */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  3. Quantity / Number of {category === 'salon_chair' ? 'Chairs' : 'Seats'}
                </label>
                <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>
                  {quantity} {quantity === 1 ? 'Unit' : 'Units'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5, 8].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuantity(num)}
                    style={{
                      flex: 1,
                      padding: '10px 0',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      border: '1px solid',
                      borderColor: quantity === num ? '#d97706' : '#e2e8f0',
                      background: quantity === num ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : '#ffffff',
                      color: quantity === num ? '#ffffff' : '#475569',
                      boxShadow: quantity === num ? '0 4px 10px rgba(217, 119, 6, 0.3)' : 'none'
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Urgency */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '10px' }}>
                4. Turnaround Timeline
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  { id: 'normal', label: 'Standard (1-3 Days)', extra: 'Standard' },
                  { id: 'same_day', label: 'Same Day', extra: '+15%' },
                  { id: 'emergency', label: 'Emergency (2-4 hrs)', extra: '+25%' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setUrgency(item.id as RepairUrgency)}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '10px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      textAlign: 'center',
                      border: '1px solid',
                      borderColor: urgency === item.id ? '#059669' : '#e2e8f0',
                      background: urgency === item.id ? '#d1fae5' : '#ffffff',
                      color: urgency === item.id ? '#065f46' : '#64748b'
                    }}
                  >
                    <div>{item.label}</div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.85, marginTop: '2px', fontWeight: 700 }}>{item.extra}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Column */}
          <div
            style={{
              background: 'linear-gradient(145deg, #fffbeb 0%, #fef3c7 100%)',
              border: '1px solid #fde68a',
              borderRadius: '20px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 15px 35px rgba(217, 119, 6, 0.1)'
            }}
          >
            <div>
              <div style={{ fontSize: '0.85rem', color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                Estimated Service Quote
              </div>
              <div
                style={{
                  fontSize: 'clamp(2.5rem, 4vw, 3.2rem)',
                  fontWeight: 800,
                  color: '#b45309',
                  margin: '8px 0 16px',
                  lineHeight: 1
                }}
              >
                ₹{totalEstimated.toLocaleString()}
                <span style={{ fontSize: '1rem', color: '#78350f', fontWeight: 600, marginLeft: '6px' }}>
                  (approx. ${Math.round(totalEstimated / 83)})
                </span>
              </div>

              <div
                style={{
                  background: '#ffffff',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #fde68a',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  fontSize: '0.88rem',
                  color: '#334155',
                  marginBottom: '24px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Service:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{activeIssueObj.label}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Units:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{quantity} Items</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Timeline:</span>
                  <span style={{ fontWeight: 700, color: urgency === 'emergency' ? '#dc2626' : '#059669' }}>
                    {urgency.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Warranty:</span>
                  <span style={{ fontWeight: 700, color: '#b45309' }}>12 Months Written</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: '#78350f' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={15} color="#059669" />
                  <span>Includes all authentic parts, high-density foam & hardware</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={15} color="#059669" />
                  <span>Free doorstep technician visit & inspection</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={15} color="#059669" />
                  <span>On-site service in front of your eyes</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '28px' }}>
              <button
                type="button"
                onClick={handleBookWithEstimate}
                className="btn-gold"
                style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
                id="calculator-book-now-btn"
              >
                <span>Book Repair At This Quote</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
