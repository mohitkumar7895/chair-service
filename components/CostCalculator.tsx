'use client';

import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { Calculator, ArrowRight, Check, MessageCircle } from 'lucide-react';
import { ServiceCategory, RepairUrgency } from '@/models/types';
import TypewriterHeading from './TypewriterHeading';

export default function CostCalculator() {
  const { openBookingModal } = useBooking();
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '919772381091';

  const [category, setCategory] = useState<ServiceCategory>('office_chair');
  const [selectedIssue, setSelectedIssue] = useState<string>('office_hydraulic');
  const [quantity, setQuantity] = useState<number>(2);
  const [urgency, setUrgency] = useState<RepairUrgency>('normal');

  const officeChairIssues = [
    { id: 'office_hydraulic', label: 'Class-4 Gas Lift Hydraulic Cylinder (Sinking Fix)', basePrice: 699 },
    { id: 'office_executive_leather', label: 'Executive Boss High-Back Leather & 40D Foam', basePrice: 1499 },
    { id: 'office_mesh', label: 'Ergonomic Mesh Restring & Lumbar Spine Fix', basePrice: 899 },
    { id: 'office_base_wheels', label: 'Chrome 5-Star Metal Base & Rollerblade Casters', basePrice: 799 },
    { id: 'office_staff_cushion', label: 'Staff Workstation Chair Fabric & Re-padding', basePrice: 599 }
  ];

  const reclinerIssues = [
    { id: 'recliner_motor', label: 'Motorized Electric Recliner Motor & Remote Fix', basePrice: 1799 },
    { id: 'recliner_cable', label: 'Manual Recliner Release Pull Handle & Cable', basePrice: 899 },
    { id: 'recliner_leather', label: 'Luxury Leather Recliner Re-Upholstery & 40D Foam', basePrice: 2499 },
    { id: 'recliner_barber', label: 'Barber & Salon Reclining Hydraulic Chair Overhaul', basePrice: 1299 }
  ];

  const salonChairIssues = [
    { id: 'salon_hydraulic', label: 'Salon Hydraulic Pump Sinking / Fluid Leak Overhaul', basePrice: 999 },
    { id: 'salon_upholstery', label: 'Chemical-Proof Diamond Leather Reupholstery', basePrice: 1499 },
    { id: 'salon_swivel', label: '360° Swivel Base & Recliner Gas Spring Overhaul', basePrice: 799 },
    { id: 'salon_shampoo', label: 'Shampoo Basin Tilt Mechanism & Anti-Leak Seal', basePrice: 1199 }
  ];

  const sofaIssues = [
    { id: 'sofa_foam', label: 'High-Density 40D Virgin Foam Cushion Refilling', basePrice: 1299 },
    { id: 'sofa_upholstery', label: 'Designer Fabric / Velvet Re-Upholstery', basePrice: 1899 },
    { id: 'sofa_leather', label: 'Genuine Leather Crack Repair & Color Match', basePrice: 2699 },
    { id: 'sofa_frame_spring', label: 'Broken Frame Joints & Spring Retensioning', basePrice: 899 }
  ];

  const getIssuesForCategory = () => {
    switch (category) {
      case 'office_chair': return officeChairIssues;
      case 'recliner_chair': return reclinerIssues;
      case 'salon_chair': return salonChairIssues;
      case 'sofa_repair': return sofaIssues;
    }
  };

  const currentIssues = getIssuesForCategory();
  const activeIssueObj = currentIssues.find((i) => i.id === selectedIssue) || currentIssues[0];

  // Calculate pricing
  const baseCost = activeIssueObj.basePrice * quantity;
  const urgencyMultiplier = urgency === 'emergency' ? 1.25 : urgency === 'same_day' ? 1.15 : 1.0;
  const totalEstimated = Math.round(baseCost * urgencyMultiplier);

  const handleBookWithEstimate = () => {
    openBookingModal(null, category);
  };

  return (
    <section id="calculator" style={{ padding: '80px 20px', background: '#f8fafc', position: 'relative' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge-gold" style={{ marginBottom: '12px' }}>
            <Calculator size={14} />
            <span>Instant Transparent Pricing</span>
          </div>
          <TypewriterHeading
            text="Calculate Your"
            highlightText="Repair Estimate"
            style={{
              fontSize: 'clamp(2rem, 3.2vw, 2.7rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '12px',
              color: '#0f172a'
            }}
          />
          <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '640px', margin: '0 auto' }}>
            Zero hidden fees. Choose your chair or furniture type, select the issue, and get an instant doorstep estimate with 1-year guarantee.
          </p>
        </div>

        <div
          className="glass-panel"
          style={{
            padding: '32px',
            borderRadius: '24px',
            background: '#ffffff',
            boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px'
          }}
        >
          {/* Controls Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Step 1: Category */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '10px' }}>
                1. Select Chair / Furniture Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {[
                  { key: 'office_chair', label: '💺 Office Chair', firstIssue: 'office_hydraulic' },
                  { key: 'recliner_chair', label: '🛋️ Recliner', firstIssue: 'recliner_motor' },
                  { key: 'salon_chair', label: '✂️ Salon Chair', firstIssue: 'salon_hydraulic' },
                  { key: 'sofa_repair', label: '🛋️ Sofa & Couch', firstIssue: 'sofa_foam' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setCategory(item.key as ServiceCategory);
                      setSelectedIssue(item.firstIssue);
                    }}
                    style={{
                      padding: '11px',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      textAlign: 'center',
                      border: '1px solid',
                      borderColor: category === item.key ? '#d97706' : '#e2e8f0',
                      background: category === item.key ? '#fef3c7' : '#ffffff',
                      color: category === item.key ? '#92400e' : '#475569',
                      boxShadow: category === item.key ? '0 4px 12px rgba(217, 119, 6, 0.15)' : 'none',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Issue */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '10px' }}>
                2. Select Repair Requirement
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentIssues.map((issue) => (
                  <button
                    key={issue.id}
                    type="button"
                    onClick={() => setSelectedIssue(issue.id)}
                    style={{
                      padding: '11px 14px',
                      borderRadius: '12px',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      border: '1px solid',
                      borderColor: selectedIssue === issue.id ? '#d97706' : '#e2e8f0',
                      background: selectedIssue === issue.id ? '#fffbeb' : '#f8fafc',
                      color: selectedIssue === issue.id ? '#92400e' : '#334155',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.15s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{issue.label}</span>
                    <span style={{ fontWeight: 800, color: selectedIssue === issue.id ? '#b45309' : '#64748b', fontSize: '0.86rem' }}>
                      From ₹{issue.basePrice}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Quantity */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
                3. Number of Chairs / Items: <strong style={{ color: '#0f172a' }}>{quantity}</strong>
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 4, 8, 12].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuantity(num)}
                    style={{
                      flex: 1,
                      padding: '9px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      border: '1px solid',
                      borderColor: quantity === num ? '#d97706' : '#cbd5e1',
                      background: quantity === num ? '#d97706' : '#ffffff',
                      color: quantity === num ? '#ffffff' : '#475569',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Urgency */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
                4. Visit Urgency
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  { key: 'normal', label: 'Standard Visit', sub: 'Tomorrow' },
                  { key: 'same_day', label: 'Same Day', sub: 'Within 4 hrs' },
                  { key: 'emergency', label: 'Immediate', sub: 'Urgent 2 hrs' }
                ].map((urg) => (
                  <button
                    key={urg.key}
                    type="button"
                    onClick={() => setUrgency(urg.key as RepairUrgency)}
                    style={{
                      padding: '9px 8px',
                      borderRadius: '10px',
                      border: '1px solid',
                      borderColor: urgency === urg.key ? '#d97706' : '#cbd5e1',
                      background: urgency === urg.key ? '#fffbeb' : '#ffffff',
                      color: urgency === urg.key ? '#92400e' : '#475569',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>{urg.label}</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{urg.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card Column */}
          <div
            style={{
              background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
              borderRadius: '20px',
              padding: '28px',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 15px 35px -5px rgba(15, 23, 42, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '6px' }}>
                Estimated Total (Parts & Doorstep Labor)
              </div>
              <div style={{ fontSize: 'clamp(2.4rem, 4vw, 3.2rem)', fontWeight: 900, color: '#fbbf24', letterSpacing: '-0.02em', lineHeight: 1 }}>
                ₹{totalEstimated.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '6px' }}>
                *Free doorstep inspection included with repairs. Genuine OEM spares.
              </div>

              {/* Breakdown summary */}
              <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                  <span style={{ color: '#94a3b8' }}>Service:</span>
                  <span style={{ fontWeight: 700, textAlign: 'right', maxWidth: '200px' }}>{activeIssueObj.label}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                  <span style={{ color: '#94a3b8' }}>Quantity:</span>
                  <span style={{ fontWeight: 700 }}>{quantity} units</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                  <span style={{ color: '#94a3b8' }}>Warranty Included:</span>
                  <span style={{ color: '#34d399', fontWeight: 700 }}>12-Month Written Warranty</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={handleBookWithEstimate}
                className="btn-gold"
                style={{
                  width: '100%',
                  padding: '13px',
                  fontSize: '0.94rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 20px rgba(217, 119, 6, 0.5)'
                }}
              >
                <span>Book Doorstep Visit</span>
                <ArrowRight size={16} />
              </button>

              <a
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                  `Hi, I calculated an estimate of ₹${totalEstimated} for ${quantity} items of ${activeIssueObj.label}. Can I share photos on WhatsApp for verification?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(16, 185, 129, 0.5)',
                  color: '#34d399',
                  borderRadius: '9999px',
                  padding: '11px',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <MessageCircle size={15} />
                <span>WhatsApp Photos for Exact Quote</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
