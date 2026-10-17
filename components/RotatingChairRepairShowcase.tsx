'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, Wrench, RotateCw, Play, Pause, CheckCircle2, ChevronRight, MessageCircle } from 'lucide-react';

interface RealChairShowcase {
  id: string;
  name: string;
  category: string;
  image: string;
  repairImage: string;
  technicianAction: string;
  highlightPart: string;
}

export default function RotatingChairRepairShowcase() {
  const [selectedChair, setSelectedChair] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '919772381091';

  const showcaseItems: RealChairShowcase[] = [
    {
      id: 'office-executive',
      name: 'Executive Office Boss Chair',
      category: 'Office Chair Repair',
      image: '/images/office-chair-executive-black.jpg',
      repairImage: '/images/technician-repairing-chair.jpg',
      technicianAction: 'Installing Class-4 BIFMA Certified Gas Lift Cylinder',
      highlightPart: 'Pneumatic 200kg Zero-Sink Lift'
    },
    {
      id: 'recliner-motor',
      name: 'Motorized Electric Recliner',
      category: 'Recliner Repair',
      image: '/images/recliner-chair-black-tufted.jpg',
      repairImage: '/images/recliner-motorized-repair.jpg',
      technicianAction: 'Calibrating German Linear Actuator Motor & Remote Switch',
      highlightPart: 'Whisper-Silent Motorized Recline'
    },
    {
      id: 'office-hydraulic',
      name: 'Chrome 5-Star Base & Gas Cylinder',
      category: 'Office Chair Repair',
      image: '/images/office-chair-broken-base.jpg',
      repairImage: '/images/office-chair-hydraulic-repair.jpg',
      technicianAction: 'Replacing Leaking Nitrogen Cylinder & Silent Polyurethane Casters',
      highlightPart: 'Heavy-Duty 350kg Base + Silent Wheels'
    },
    {
      id: 'salon-hydraulic',
      name: 'Barber & Styling Hydraulic Chair',
      category: 'Salon Chair Repair',
      image: '/images/salon-chair-repair.jpg',
      repairImage: '/images/chair-before-after.jpg',
      technicianAction: 'Rebuilding 250kg High-Pressure Hydraulic Pump & Seals',
      highlightPart: '360° Smooth Swivel & Foot Pump Elevation'
    }
  ];

  const current = showcaseItems[selectedChair];

  // Smooth continuous rotation ticker for the 3D turntable and orbital ring
  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 1) % 360);
    }, 45); // smooth continuous step
    return () => clearInterval(interval);
  }, [isRotating]);

  return (
    <section
      style={{
        padding: '28px 18px 36px',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        {/* ============================================================== */}
        {/* MAIN CINEMATIC DUAL-STAGE: TECHNICIAN + 3D ROTATING CHAIR      */}
        {/* ============================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '20px',
            alignItems: 'center',
            maxWidth: '1040px',
            margin: '0 auto 24px'
          }}
        >
          {/* LEFT: REAL TECHNICIAN AT WORK BENCH (High Definition Photo) */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              background: '#0f172a',
              boxShadow: '0 20px 45px -12px rgba(15, 23, 42, 0.2), 0 0 0 1px rgba(226, 232, 240, 0.8)',
              height: 'clamp(320px, 42vw, 380px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            className="hover-lift"
          >
            <Image
              src={current.repairImage}
              alt={current.technicianAction}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 500px"
              priority
            />

            {/* Cinematic Studio Lighting Vignette */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(15, 23, 42, 0.25) 0%, rgba(15, 23, 42, 0.05) 50%, rgba(15, 23, 42, 0.85) 100%)',
                pointerEvents: 'none'
              }}
            />

            {/* Glowing Laser Scan / Calibration Bar moving up & down */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, #34d399 50%, transparent 100%)',
                boxShadow: '0 0 12px 3px rgba(52, 211, 153, 0.65)',
                top: `${40 + Math.sin(rotationAngle * 0.08) * 35}%`,
                pointerEvents: 'none'
              }}
            />

            {/* Top Left Status Badge */}
            <div style={{ position: 'relative', zIndex: 10, padding: '16px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                <Wrench size={12} color="#fbbf24" />
                <span>MASTER TECHNICIAN AT WORK</span>
              </div>
            </div>

            {/* Bottom Caption Pill */}
            <div style={{ position: 'relative', zIndex: 10, padding: '16px' }}>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '14px',
                  padding: '10px 14px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase' }}>
                  {current.category}
                </div>
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
                  {current.technicianAction}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: REAL CHAIR ON 360° ROTATING TURNTABLE STAGE */}
          <div
            className="turntable-card"
            style={{
              position: 'relative',
              borderRadius: '24px',
              background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #f8fafc 65%, #edf2f7 100%)',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 45px -12px rgba(15, 23, 42, 0.08)',
              height: 'clamp(340px, 45vw, 410px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            {/* Glowing Dotted Orbit Ring */}
            <div
              style={{
                position: 'absolute',
                width: '92%',
                height: '92%',
                borderRadius: '50%',
                border: '2px dashed rgba(217, 119, 6, 0.35)',
                transform: `rotate(${rotationAngle}deg)`,
                pointerEvents: 'none',
                boxShadow: '0 0 25px rgba(245, 158, 11, 0.08)'
              }}
            />

            {/* Circular Base Turntable Pedestal with Chrome Reflection */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                width: '280px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%)',
                boxShadow: '0 12px 25px rgba(15, 23, 42, 0.15)',
                border: '2px solid #ffffff'
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: '36px',
                width: '245px',
                height: '34px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #ffffff 0%, #f1f5f9 80%, #cbd5e1 100%)',
                border: '1px solid #e2e8f0'
              }}
            />

            {/* REAL PHOTOGRAPHIC CHAIR IMAGE SWIVELING IN 3D PERSPECTIVE */}
            <div
              style={{
                position: 'relative',
                width: '88%',
                height: '88%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                // Realistic horizontal swivel rotation using perspective
                transform: `perspective(900px) rotateY(${Math.sin((rotationAngle * Math.PI) / 180) * 22}deg) scale(${1 + Math.cos((rotationAngle * Math.PI) / 180) * 0.03})`,
                transition: 'transform 0.05s linear'
              }}
            >
              <Image
                src={current.image}
                alt={current.name}
                fill
                style={{
                  objectFit: 'contain',
                  padding: '8px',
                  filter: 'drop-shadow(0 14px 22px rgba(15, 23, 42, 0.2))'
                }}
                sizes="(max-width: 768px) 340px, 450px"
                priority
              />

              {/* Dynamic Studio Light Sheen sweep across chair */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.4) 48%, transparent 56%)',
                  transform: `translateX(${(rotationAngle % 120) * 3 - 150}%)`,
                  pointerEvents: 'none'
                }}
              />
            </div>

            {/* Top Right Floating Pill: Part Name */}
            <div
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #fde68a',
                color: '#b45309',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontWeight: 800,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                zIndex: 15
              }}
            >
              <Sparkles size={11} color="#d97706" />
              <span>{current.highlightPart}</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4 REAL CHAIR THUMBNAILS (Clickable Switcher Dots)              */}
        {/* ============================================================== */}
        <div
          className="switcher-buttons-wrap"
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          {showcaseItems.map((item, idx) => {
            const isSelected = selectedChair === idx;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedChair(idx)}
                className="switcher-btn"
                style={{
                  background: isSelected ? '#ffffff' : '#f8fafc',
                  border: isSelected ? '2px solid #d97706' : '1px solid #cbd5e1',
                  borderRadius: '16px',
                  padding: '6px 14px 6px 6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 6px 18px rgba(217, 119, 6, 0.25)' : 'none',
                  transform: isSelected ? 'scale(1.03)' : 'scale(1)'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    flexShrink: 0
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'contain', padding: '4px' }}
                    sizes="50px"
                  />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: isSelected ? '#d97706' : '#64748b', fontWeight: 700 }}>
                    {item.category}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
