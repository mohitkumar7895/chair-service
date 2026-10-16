'use client';

import React from 'react';
import { Truck, ShieldCheck, Award, Sparkles, Check } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import TypewriterHeading from './TypewriterHeading';

export default function WhyChooseUs() {
  const { openBookingModal } = useBooking();

  const THREE_PILLARS = [
    {
      step: '01',
      title: '100% On-Site Doorstep Workshop',
      tagline: 'Zero Salon Downtime & Direct Transparency',
      description: 'Our mobile workshop vans come directly to your salon, barbershop, or residence. No expensive logistics, no moving damages, and no business interruption. Every repair is performed live in front of your eyes.',
      icon: Truck,
      accentColor: '#2563eb',
      bgGlow: 'rgba(37, 99, 235, 0.06)',
      borderColor: 'rgba(37, 99, 235, 0.2)',
      highlights: [
        'Mobile vans with precision hydraulic & lathe tools',
        'After-hours service with zero lost salon revenue',
        'Free upfront diagnosis and written quote'
      ]
    },
    {
      step: '02',
      title: 'Factory-Grade OEM Spares & Materials',
      tagline: 'Genuine Nitrile Seals, 40D Foam & Italian Leather',
      description: 'We never compromise on cheap aftermarket parts. We stock genuine high-pressure hydraulic cylinders, dual-lip nitrile oil seals, tempered zigzag steel springs, and chemical-resistant salon leather built for heavy commercial traffic.',
      icon: ShieldCheck,
      accentColor: '#d97706',
      bgGlow: 'rgba(217, 119, 6, 0.06)',
      borderColor: 'rgba(217, 119, 6, 0.25)',
      highlights: [
        '100% genuine hydraulic seals & high-viscosity oil',
        'Chemical, bleach & hair dye resistant PU rexine',
        '40-density orthopedic memory foam with zero sag'
      ]
    },
    {
      step: '03',
      title: '15+ Years Master Artisan Craftsmanship',
      tagline: 'Over 15,000 Chairs & Sofas Restored',
      description: 'Our certified master craftsmen combine mechanical hydraulic engineering with bespoke upholstery tailoring. Each chair is load-tested up to 250kg and certified with an official 12-month written guarantee certificate.',
      icon: Award,
      accentColor: '#059669',
      bgGlow: 'rgba(5, 150, 105, 0.06)',
      borderColor: 'rgba(5, 150, 105, 0.2)',
      highlights: [
        'Over 15,000 satisfied salons, barbershops & residences',
        '250kg dynamic weight load certification',
        'Official 12-month written warranty certificate included'
      ]
    }
  ];

  return (
    <section id="why-us" style={{ padding: '32px 18px', background: '#ffffff', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Header - Compact */}
        <div className="scroll-reveal" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 24px' }}>
          <div className="badge-emerald" style={{ marginBottom: '8px', padding: '3px 12px', fontSize: '0.76rem' }}>
            <Sparkles size={13} />
            <span>Why Top Salons & Homeowners Choose Us</span>
          </div>
          <TypewriterHeading
            text="Engineering Excellence in"
            highlightText="Every Stitch & Valve"
            style={{
              fontSize: 'clamp(1.75rem, 2.8vw, 2.3rem)',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '8px'
            }}
          />
          <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.5, margin: 0 }}>
            We understand that a broken salon chair loses clients every hour and a sunken sofa ruins your comfort. Here are the 3 pillars why clients trust our restoration standard.
          </p>
        </div>

        {/* 3 Pillars Compact Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px'
          }}
        >
          {THREE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.step}
                style={{
                  background: '#ffffff',
                  borderRadius: '18px',
                  border: `1px solid ${pillar.borderColor}`,
                  padding: '22px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: '0 6px 20px -6px rgba(15, 23, 42, 0.05)',
                  transition: 'all 0.25s ease'
                }}
                className="hover-lift"
              >
                {/* Step Number Top-Right */}
                <div
                  style={{
                    position: 'absolute',
                    top: '18px',
                    right: '18px',
                    fontFamily: 'monospace',
                    fontSize: '1.4rem',
                    fontWeight: 900,
                    color: '#e2e8f0',
                    lineHeight: 1
                  }}
                >
                  {pillar.step}
                </div>

                {/* Compact Icon */}
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: pillar.bgGlow,
                    border: `1px solid ${pillar.borderColor}`,
                    color: pillar.accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px'
                  }}
                >
                  <Icon size={20} />
                </div>

                {/* Title & Tagline */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px', lineHeight: 1.3 }}>
                  {pillar.title}
                </h3>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: pillar.accentColor, marginBottom: '10px' }}>
                  {pillar.tagline}
                </div>

                {/* Description */}
                <p style={{ color: '#475569', fontSize: '0.86rem', lineHeight: 1.5, marginBottom: '14px' }}>
                  {pillar.description}
                </p>

                {/* Highlights List */}
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                  {pillar.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', fontSize: '0.8rem', color: '#334155' }}>
                      <Check size={13} color={pillar.accentColor} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
