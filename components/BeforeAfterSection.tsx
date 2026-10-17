'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useBooking } from '@/context/BookingContext';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  MessageCircle, 
  SlidersHorizontal,
  Clock,
  Wrench,
  Check
} from 'lucide-react';
import TypewriterHeading from './TypewriterHeading';
import { ServiceCategory } from '@/models/types';

interface TransformationItem {
  id: string;
  category: ServiceCategory;
  title: string;
  subtitle: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  serviceType: string;
  turnaround: string;
  warranty: string;
  client: string;
  savings: string;
  beforeIssues: string[];
  afterBenefits: string[];
}

export default function BeforeAfterSection() {
  const { openBookingModal } = useBooking();
  const [activeTab, setActiveTab] = useState<'office' | 'recliner' | 'salon' | 'sofa'>('office');
  const [viewMode, setViewMode] = useState<'split' | 'before' | 'after'>('split');
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '919772381091';

  const transformations: Record<string, TransformationItem> = {
    office: {
      id: 'tf-office',
      category: 'office_chair',
      title: 'Office Executive Boss & Ergonomic Chair Overhaul',
      subtitle: 'From Peeling Leatherette & Sinking Cylinder to Class-4 Hydraulic BIFMA Certified Comfort',
      beforeImage: '/images/office-chair-executive-peeling.jpg',
      afterImage: '/images/office-chair-executive-black.jpg',
      beforeLabel: 'BEFORE: Peeling Leather & Sinking Lift',
      afterLabel: 'AFTER: Restored 40D Foam & Class-4 Lift',
      serviceType: 'Hydraulic Cylinder + 5-Star Base + Nappa Reupholstery',
      turnaround: 'Same-Day (45 Mins On-Site)',
      warranty: '2-Year Hydraulic Cylinder Guarantee',
      client: 'DLF Cyber City, Gurugram (12 Manager Chairs)',
      savings: 'Saved 75% vs. buying new executive chairs',
      beforeIssues: [
        'Chair automatically sinks down under sitting weight',
        'Peeling, cracked faux leather on armrests and seat',
        'Cracked 5-star base with jammed caster wheels'
      ],
      afterBenefits: [
        'Brand-new Class-4 BIFMA certified gas lift cylinder',
        'Breathable anti-sweat Nappa leatherette upholstery',
        'Heavy-duty chrome steel base with silent wheels'
      ]
    },
    recliner: {
      id: 'tf-recliner',
      category: 'recliner_chair',
      title: 'Motorized Electric & Manual Recliner Overhaul',
      subtitle: 'From Jammed Actuator Motor & Snapped Cable to Silent Zero-Gravity Motion',
      beforeImage: '/images/recliner-chair-green-barber.jpg',
      afterImage: '/images/recliner-motorized-repair.jpg',
      beforeLabel: 'BEFORE: Jammed Motor & Stiff Footrest',
      afterLabel: 'AFTER: Smooth Linear Actuator & Remote',
      serviceType: 'Motor Actuator Diagnostic & Mechanism Calibration',
      turnaround: 'Doorstep Service (1 Hour)',
      warranty: '12 Months Motor & Mechanism Guarantee',
      client: 'Golf Course Road, DLF Magnolias Residence, Gurugram',
      savings: 'Saved ₹85,000 on imported recliner replacement',
      beforeIssues: [
        'Actuator motor making loud noise but not reclining',
        'Snapped internal parachute release pull cable',
        'Sagging lumbar cushion causing lower back pain'
      ],
      afterBenefits: [
        'Replaced German actuator nylon gears & calibrated switch',
        'Installed high-tensile alloy braided release cable',
        '40D high-resilience foam core contour support'
      ]
    },
    salon: {
      id: 'tf-salon',
      category: 'salon_chair',
      title: 'Salon Hydraulic Styling & Barber Chair Restoration',
      subtitle: 'From Leaking Pump & Bleach Stains to 250kg Mirror-Chrome Precision',
      beforeImage: '/images/chair-before-after.jpg',
      afterImage: '/images/salon-chair-repair.jpg',
      beforeLabel: 'BEFORE: Leaking Pump & Worn Upholstery',
      afterLabel: 'AFTER: Rebuilt 250kg Pump & Italian PU Leather',
      serviceType: 'Hydraulic Cylinder Rebuild + Chemical-Proof Vinyl',
      turnaround: 'Overnight Service (Zero Business Downtime)',
      warranty: '12 Months Hydraulic Guarantee',
      client: 'Looks Salon Franchise, South Extension, New Delhi',
      savings: 'Saved ₹1.5 Lakhs across 6 styling chairs',
      beforeIssues: [
        'Hydraulic cylinder sinking down and leaking fluid',
        'Cracked vinyl damaged by bleach and hair dyes',
        'Wobbling chrome base with rusted foot pedal'
      ],
      afterBenefits: [
        'High-pressure nitrile seals & remachined piston',
        'Bleach-proof & chemical-resistant Italian PU leather',
        'Tested 250kg dynamic load capacity with smooth lift'
      ]
    },
    sofa: {
      id: 'tf-sofa',
      category: 'sofa_repair',
      title: 'Luxury Chesterfield & Sectional Sofa Restoration',
      subtitle: 'From Broken Zig-Zag Springs & Sagging Core to Firm 40D Orthopedic Luxury',
      beforeImage: '/images/sofa-before-after.jpg',
      afterImage: '/images/luxury-curved-sofa.jpg',
      beforeLabel: 'BEFORE: Broken Springs & Sunken Foam',
      afterLabel: 'AFTER: Reconstructed 40D Orthopedic Core',
      serviceType: 'Spring Retensioning + 40D Foam Rebuild + Reupholstery',
      turnaround: 'Doorstep Same-Day Service',
      warranty: '3-Year Cushion Sag Guarantee',
      client: 'DLF Phase 5 Luxury Penthouse, Gurugram',
      savings: 'Saved over ₹1.8 Lakhs vs. buying new designer sofa',
      beforeIssues: [
        'Deep sunken hollows in center seat cushions',
        'Snapped zig-zag carbon steel springs sagging down',
        'Faded, soiled upholstery with creaking timber frame'
      ],
      afterBenefits: [
        'Reinforced with 8 high-tensile carbon steel springs',
        'Custom-cut 40D high-resilience virgin molded foam',
        'Tailored luxury stain-resistant upholstery'
      ]
    }
  };

  const current = transformations[activeTab];

  return (
    <section id="before-after" style={{ padding: '38px 20px', background: '#ffffff', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Header */}
        <div className="scroll-reveal" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 26px' }}>
          <div className="badge-gold" style={{ marginBottom: '10px' }}>
            <Sparkles size={14} />
            <span>Proven Real Transformations</span>
          </div>
          <TypewriterHeading
            text="Inspect The"
            highlightText="Real Before & After Results"
            style={{
              fontSize: 'clamp(2rem, 3.4vw, 2.7rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '10px',
              color: '#0f172a'
            }}
          />
          <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.55 }}>
            Don&apos;t throw away expensive chairs or sofas. See authentic photos of damaged units repaired and restored back to factory-grade perfection by our master technicians.
          </p>
        </div>

        {/* Category Tabs Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '22px', width: '100%' }}>
          <div
            className="before-after-tabs"
            style={{
              background: '#f1f5f9',
              padding: '5px',
              borderRadius: '9999px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '680px'
            }}
          >
            {[
              { key: 'office', label: '💺 Office Chairs' },
              { key: 'recliner', label: '🛋️ Recliners' },
              { key: 'salon', label: '✂️ Salon Chairs' },
              { key: 'sofa', label: '🛋️ Sofas & Couches' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`tab-btn ${activeTab === tab.key ? 'is-active' : ''}`}
                style={{
                  padding: '9px 18px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  transition: 'all 0.2s ease',
                  background: activeTab === tab.key ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'transparent',
                  color: activeTab === tab.key ? '#ffffff' : '#475569',
                  boxShadow: activeTab === tab.key ? '0 3px 10px rgba(217, 119, 6, 0.3)' : 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Transformation Showcase Card */}
        <div
          className="glass-panel"
          style={{
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
            background: '#ffffff',
            boxShadow: '0 18px 45px -12px rgba(15, 23, 42, 0.08)',
            padding: 'clamp(20px, 3.5vw, 36px)',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          {/* Header Row: Title, Turnaround & View Switcher */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '14px',
              marginBottom: '20px'
            }}
          >
            <div>
              <h3 style={{ fontSize: 'clamp(1.35rem, 2.4vw, 1.8rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 4px', lineHeight: 1.25 }}>
                {current.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
                {current.subtitle}
              </p>
            </div>

            {/* View Mode Toggle Button Group */}
            <div
              className="view-mode-tabs"
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '3px',
                borderRadius: '12px',
                display: 'inline-flex',
                gap: '4px'
              }}
            >
              {[
                { id: 'split', label: 'Side-by-Side' },
                { id: 'before', label: 'Before Only' },
                { id: 'after', label: 'After Only' }
              ].map((vm) => (
                <button
                  key={vm.id}
                  onClick={() => setViewMode(vm.id as any)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '9px',
                    border: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: viewMode === vm.id ? '#0f172a' : 'transparent',
                    color: viewMode === vm.id ? '#ffffff' : '#64748b',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {vm.label}
                </button>
              ))}
            </div>
          </div>

          {/* DUAL IMAGE VISUAL COMPARISON AREA */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                viewMode === 'split' ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
              gap: '16px',
              marginBottom: '26px'
            }}
          >
            {/* BEFORE IMAGE CARD */}
            {(viewMode === 'split' || viewMode === 'before') && (
              <div
                style={{
                  position: 'relative',
                  height: 'clamp(260px, 36vw, 380px)',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '2px solid #fecaca',
                  boxShadow: '0 8px 24px rgba(239, 68, 68, 0.12)'
                }}
              >
                <Image
                  src={current.beforeImage}
                  alt={current.beforeLabel}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="hover-zoom-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.15) 0%, rgba(15, 23, 42, 0.65) 100%)'
                  }}
                />

                {/* Badge Top Left */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: '#dc2626',
                    color: '#ffffff',
                    padding: '5px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)'
                  }}
                >
                  <AlertTriangle size={13} color="#ffffff" />
                  <span>BEFORE REPAIR</span>
                </div>

                {/* Label Bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '14px',
                    right: '14px',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    textShadow: '0 2px 6px rgba(0,0,0,0.6)'
                  }}
                >
                  {current.beforeLabel}
                </div>
              </div>
            )}

            {/* AFTER IMAGE CARD */}
            {(viewMode === 'split' || viewMode === 'after') && (
              <div
                style={{
                  position: 'relative',
                  height: 'clamp(260px, 36vw, 380px)',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '2px solid #bbf7d0',
                  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.15)'
                }}
              >
                <Image
                  src={current.afterImage}
                  alt={current.afterLabel}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="hover-zoom-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.65) 100%)'
                  }}
                />

                {/* Badge Top Left */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: '#059669',
                    color: '#ffffff',
                    padding: '5px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.4)'
                  }}
                >
                  <CheckCircle2 size={13} color="#ffffff" />
                  <span>AFTER RESTORATION</span>
                </div>

                {/* Guaranteed Sticker Top Right */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    color: '#065f46',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.74rem',
                    fontWeight: 800
                  }}
                >
                  ✓ 100% Factory Quality
                </div>

                {/* Label Bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '14px',
                    right: '14px',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    textShadow: '0 2px 6px rgba(0,0,0,0.6)'
                  }}
                >
                  {current.afterLabel}
                </div>
              </div>
            )}
          </div>

          {/* BEFORE & AFTER SPECIFIC ISSUES VS SOLUTIONS MATRIX */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '18px',
              marginBottom: '22px'
            }}
          >
            {/* Red Box: Damage & Failures */}
            <div
              style={{
                background: '#fff5f5',
                border: '1px solid #fed7d7',
                borderRadius: '16px',
                padding: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#c53030' }}>
                <AlertTriangle size={17} />
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, margin: 0 }}>
                  Before: Structural Damage & Mechanism Failures
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {current.beforeIssues.map((issue, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: '#742a2a' }}>
                    <span style={{ color: '#e53e3e', fontWeight: 800, fontSize: '0.9rem' }}>✕</span>
                    <span style={{ lineHeight: 1.45 }}>{issue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Green Box: Restored Results */}
            <div
              style={{
                background: '#f0fff4',
                border: '1px solid #c6f6d5',
                borderRadius: '16px',
                padding: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#276749' }}>
                <ShieldCheck size={17} />
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, margin: 0 }}>
                  After: Restored Solutions & Genuine Spare Parts
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {current.afterBenefits.map((benefit, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: '#22543d' }}>
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: '#38a169',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      <Check size={11} color="#ffffff" strokeWidth={3} />
                    </div>
                    <span style={{ lineHeight: 1.45 }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row & WhatsApp Booking */}
          <div
            style={{
              paddingTop: '18px',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '14px'
            }}
          >
            <div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                Verified Project Location:
              </div>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>
                {current.client}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>
                🛡️ {current.warranty} • Verified Doorstep Service
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => openBookingModal(null, current.category)}
                className="btn-gold"
                style={{ padding: '10px 22px', fontSize: '0.88rem' }}
              >
                <span>Book Doorstep Repair</span>
                <ArrowRight size={15} />
              </button>

              <a
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                  `Hello! I saw the before & after transformation for "${current.title}". I want a repair quote for my chair. Sending photos now.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#d1fae5',
                  border: '1px solid #a7f3d0',
                  color: '#065f46',
                  borderRadius: '9999px',
                  padding: '10px 18px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none'
                }}
              >
                <MessageCircle size={16} />
                <span>WhatsApp Chair Photo</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4-Card Multi-Transformation Thumbnail Gallery Strip */}
        <div style={{ marginTop: '28px' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', textAlign: 'center', marginBottom: '14px' }}>
            Quick Switch Transformation Gallery
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px'
            }}
          >
            {[
              {
                key: 'office',
                title: 'Office Chair Hydraulic & Leather',
                img: '/images/office-chair-executive-black.jpg',
                badge: 'Office Chair',
                sub: 'Class-4 Gas Lift Replaced'
              },
              {
                key: 'recliner',
                title: 'Motorized Recliner Actuator',
                img: '/images/recliner-motorized-repair.jpg',
                badge: 'Recliner',
                sub: 'Electric Motor Calibrated'
              },
              {
                key: 'salon',
                title: 'Barber Hydraulic Pump & Vinyl',
                img: '/images/salon-chair-repair.jpg',
                badge: 'Salon Chair',
                sub: '250kg Hydraulic Rebuild'
              },
              {
                key: 'sofa',
                title: '40D Foam Cushion Reconstruction',
                img: '/images/luxury-curved-sofa.jpg',
                badge: 'Luxury Sofa',
                sub: 'Zero-Sag Spring Webbing'
              }
            ].map((item) => (
              <div
                key={item.key}
                onClick={() => setActiveTab(item.key as any)}
                style={{
                  background: '#ffffff',
                  border: activeTab === item.key ? '2px solid #d97706' : '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  boxShadow: activeTab === item.key ? '0 6px 18px rgba(217, 119, 6, 0.15)' : 'none'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '56px',
                    height: '56px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}
                >
                  <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} sizes="60px" />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase' }}>
                    {item.badge}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.84rem', color: '#0f172a', lineHeight: 1.25 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                    {item.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
