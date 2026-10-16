'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useBooking } from '@/context/BookingContext';
import { Sparkles, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import TypewriterHeading from './TypewriterHeading';

export default function BeforeAfterSection() {
  const { openBookingModal } = useBooking();
  const [activeTab, setActiveTab] = useState<'chair' | 'sofa'>('chair');

  const transformations = {
    chair: {
      title: 'Barber & Styling Hydraulic Chair Restoration',
      subtitle: 'From Rusted, Sinking & Torn to Mirror Chrome & Diamond Leather Upholstery',
      image: '/images/chair-before-after.jpg',
      beforeIssues: [
        'Hydraulic cylinder sinking down under client weight',
        'Cracked, peeling rexine stained by hair dyes & chemicals',
        'Rusted footrest and wobbling 360-degree base',
        'Deflated seat padding causing client discomfort'
      ],
      afterBenefits: [
        'Brand new heavy-duty hydraulic pump (250kg certified)',
        'Chemical-proof, anti-hair luxury black diamond leather',
        'Polished mirror chrome base with anti-wobble precision ring',
        'High-density 40D ergonomic memory foam cushion'
      ],
      client: 'Gentlemen’s Grooming Barbershop, New Delhi',
      serviceType: 'Hydraulic Overhaul + Diamond Stitch Rexine'
    },
    sofa: {
      title: 'Luxury Chesterfield & Sectional Sofa Overhaul',
      subtitle: 'From Sagging Springs & Torn Fabric to Regal Velvet & Plump Orthopedic Support',
      image: '/images/sofa-before-after.jpg',
      beforeIssues: [
        'Sunken middle seat with broken zig-zag steel springs',
        'Faded, threadbare fabric and dirty worn armrests',
        'Loud creaking noises whenever someone sat down',
        'Loss of backrest firmness and sagging fiber padding'
      ],
      afterBenefits: [
        'High-tensile carbon spring webbing reinforcement',
        'Regal deep navy velvet upholstery with hand-tufted brass buttons',
        'Silent frame bracing with solid seasoned Salwood blocks',
        'Zero-sag 40D HR foam core with 5-year resilience guarantee'
      ],
      client: 'Penthouse Residence, Bandra West, Mumbai',
      serviceType: 'Complete Spring Retensioning & Velvet Upholstery'
    }
  };

  const current = transformations[activeTab];

  return (
    <section id="before-after" style={{ padding: '36px 20px', background: '#ffffff', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Header */}
        <div className="scroll-reveal" style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 28px' }}>
          <div className="badge-gold" style={{ marginBottom: '10px' }}>
            <Sparkles size={14} />
            <span>Proven Real Transformations</span>
          </div>
          <TypewriterHeading
            text="See The"
            highlightText="Dramatic Before & After"
            style={{
              fontSize: 'clamp(2rem, 3.2vw, 2.7rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '12px',
              color: '#0f172a'
            }}
          />
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.5 }}>
            Inspect real restoration projects completed by our master technicians. We restore structural integrity, mechanical pumps, and luxury upholstery back to showroom elegance.
          </p>
        </div>

        {/* Tab switch (Responsive Grid) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', width: '100%' }}>
          <div
            style={{
              background: '#f1f5f9',
              padding: '4px',
              borderRadius: '9999px',
              border: '1px solid #e2e8f0',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6px',
              width: '100%',
              maxWidth: '420px'
            }}
          >
            <button
              onClick={() => setActiveTab('chair')}
              style={{
                padding: '9px 14px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.84rem',
                transition: 'all 0.25s ease',
                background: activeTab === 'chair' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'transparent',
                color: activeTab === 'chair' ? '#ffffff' : '#64748b',
                textAlign: 'center',
                whiteSpace: 'nowrap'
              }}
            >
              ✂️ Salon Chairs
            </button>
            <button
              onClick={() => setActiveTab('sofa')}
              style={{
                padding: '9px 14px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.84rem',
                transition: 'all 0.25s ease',
                background: activeTab === 'sofa' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'transparent',
                color: activeTab === 'sofa' ? '#ffffff' : '#64748b',
                textAlign: 'center',
                whiteSpace: 'nowrap'
              }}
            >
              🛋️ Luxury Sofas
            </button>
          </div>
        </div>

        {/* Showcase Box (Responsive Padding & Height) */}
        <div
          className="glass-panel"
          style={{
            padding: 'clamp(16px, 3.5vw, 32px)',
            borderRadius: '20px',
            background: '#ffffff',
            boxShadow: '0 12px 35px -10px rgba(15, 23, 42, 0.08)'
          }}
        >
          {/* Main Visual Image - Responsive Clamp Height */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(220px, 38vw, 420px)',
              borderRadius: '14px',
              overflow: 'hidden',
              marginBottom: '24px',
              boxShadow: '0 6px 20px rgba(15, 23, 42, 0.08)',
              border: '1px solid #e2e8f0'
            }}
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              style={{ objectFit: 'contain', backgroundColor: '#f8fafc' }}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>

          {/* Details & Comparison Breakdown - Responsive Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '18px',
              alignItems: 'start'
            }}
          >
            {/* Before Column */}
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '16px',
                padding: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#b91c1c' }}>
                <AlertTriangle size={20} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Before: Common Damage & Failures</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {current.beforeIssues.map((issue, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#7f1d1d' }}>
                    <span style={{ color: '#dc2626', fontWeight: 800 }}>✕</span>
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After Column */}
            <div
              style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '16px',
                padding: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#15803d' }}>
                <ShieldCheck size={20} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>After: Factory-Grade Restored Quality</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {current.afterBenefits.map((benefit, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#166534' }}>
                    <CheckCircle2 size={16} color="#15803d" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div
            style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Real Project Verification:</div>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.05rem' }}>{current.client}</div>
            </div>

            <button
              onClick={() => openBookingModal(null, activeTab === 'chair' ? 'salon_chair' : 'sofa_repair')}
              className="btn-gold"
              style={{ padding: '12px 28px' }}
            >
              <span>Get Similar Restoration</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
