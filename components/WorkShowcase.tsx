'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useBooking } from '@/context/BookingContext';
import { 
  CheckCircle2, 
  Wrench, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Eye,
  Check
} from 'lucide-react';
import TypewriterHeading from './TypewriterHeading';

interface ProjectWork {
  id: string;
  category: 'salon_chair' | 'sofa_repair';
  serviceName: string;
  tag: string;
  heading: string;
  description: string;
  workDone: string[];
  turnaround: string;
  warranty: string;
  image: string;
}

const PROJECTS_DATA: ProjectWork[] = [
  {
    id: 'work-1',
    category: 'salon_chair',
    serviceName: 'Hydraulic Pump & Base Repair',
    tag: 'HYDRAULIC PUMP & CYLINDER OVERHAUL',
    heading: 'Fixed Sinking Salon Chair & Restored 250kg Smooth Hydraulic Lift',
    description: 'A busy salon styling chair was sinking down under client weight and leaking hydraulic fluid on the salon tile floor. Our technician completed the full rebuild on-site.',
    workDone: [
      'Dismantled failing hydraulic cylinder and flushed contaminated fluid',
      'Installed high-pressure nitrile rubber O-rings & dual anti-leak oil seals',
      'Re-machined piston rod and adjusted foot pedal locking valve',
      'Weight-tested under 250kg load with 100% stable height holding'
    ],
    turnaround: 'Completed in 2 Hours On-Site',
    warranty: '12 Months Written Hydraulic Guarantee',
    image: '/images/salon-chair-repair.jpg'
  },
  {
    id: 'work-2',
    category: 'sofa_repair',
    serviceName: 'High-Density Foam & Cushion Padding',
    tag: 'SOFA SAGGING RECONSTRUCTION & 40D FOAM',
    heading: 'Reconstructed Sunken Sofa Cushions with 40-Density Orthopedic Foam',
    description: 'A 5-seater luxury curved couch suffered from sagging seat cushions and snapped support springs. We opened the base and reconstructed the entire seating core.',
    workDone: [
      'Stripped sunken base and replaced 8 broken zigzag carbon steel springs',
      'Installed high-tensile elastic webbing with soundproof insulation lining',
      'Custom-cut 40D High-Resilience virgin molded foam for zero sag',
      'Deep leather rejuvenation treatment with anti-crack protective balm'
    ],
    turnaround: 'Doorstep Service (Same Day)',
    warranty: '3-Year Cushion Sag Guarantee',
    image: '/images/luxury-curved-sofa.jpg'
  },
  {
    id: 'work-3',
    category: 'salon_chair',
    serviceName: 'Reclining Mechanism & 360 Swivel Fix',
    tag: 'BARBER RECLINER & CHEMICAL-PROOF UPHOLSTERY',
    heading: 'Repaired Jammed Reclining Lever & Chemical-Resistant Salon Leather',
    description: 'A vintage heavy-duty barber chair had a jammed reclining mechanism and hair bleach stains. We restored full smooth reclining and brand-new diamond stitched upholstery.',
    workDone: [
      'Replaced exhausted gas-spring shock absorber for multi-angle locking',
      'Serviced 360-degree silent ball-bearing swivel rotation plate',
      'Re-upholstered in chemical-proof, bleach-resistant Italian PU leather',
      'Mirror buffing of chrome footrest and cast-iron circular base'
    ],
    turnaround: 'Completed in 24 Hours',
    warranty: '12 Months Full Mechanism Warranty',
    image: '/images/luxury-barber-chair.jpg'
  },
  {
    id: 'work-4',
    category: 'salon_chair',
    serviceName: 'Salon Chair Leather Upholstery',
    tag: 'COMMERCIAL SALON FLEET ATELIER',
    heading: 'Overnight Fleet Maintenance of 12 Salon Chairs with Zero Downtime',
    description: 'A flagship unisex luxury salon needed 12 styling chairs restored without losing a single hour of business. Our mobile workshop team arrived after closing hours.',
    workDone: [
      'Hydraulic pressure calibration and fluid top-up across all 12 chairs',
      'Replaced loose armrest fittings and anti-scratch chrome floor rings',
      'Repaired micro-tears in vinyl upholstery with seamless bonding',
      'Certified each chair with official inspection compliance stickers'
    ],
    turnaround: 'Overnight Doorstep Service',
    warranty: '12-Month Fleet Maintenance Contract',
    image: '/images/bright-salon-chairs.jpg'
  }
];

// Single Project Card with Typing Animation on Scroll
function ProjectCard({ project, index }: { project: ProjectWork; index: number }) {
  const { openBookingModal } = useBooking();
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [typedLength, setTypedLength] = useState(0);

  // Intersection Observer to trigger typing animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Typing animation effect for the heading
  useEffect(() => {
    if (!hasAnimated) return;

    const fullText = project.heading;
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setTypedLength(current);
      if (current >= fullText.length) {
        clearInterval(interval);
      }
    }, 25); // fast typing speed for smooth UX

    return () => clearInterval(interval);
  }, [hasAnimated, project.heading]);

  const isEven = index % 2 === 0;
  const displayedHeading = hasAnimated ? project.heading.slice(0, typedLength) : '';
  const isTypingDone = typedLength >= project.heading.length;

  return (
    <div
      ref={cardRef}
      style={{
        background: '#ffffff',
        borderRadius: '28px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 20px 45px -15px rgba(15, 23, 42, 0.08)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: isEven ? '1.1fr 0.9fr' : '0.9fr 1.1fr',
        gap: '0',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
      className="project-showcase-grid hover-lift"
    >
      {/* Visual Image Side */}
      <div
        style={{
          position: 'relative',
          minHeight: '360px',
          overflow: 'hidden',
          order: isEven ? 1 : 2
        }}
      >
        <Image
          src={project.image}
          alt={project.heading}
          fill
          style={{ objectFit: 'cover' }}
          className="hover-zoom-img"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.6) 100%)'
          }}
        />

        {/* Turnaround Badge */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            color: '#065f46',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <Clock size={14} color="#059669" />
          <span>{project.turnaround}</span>
        </div>

        {/* Project Number */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            fontFamily: 'monospace',
            fontSize: '2rem',
            fontWeight: 800,
            color: 'rgba(255, 255, 255, 0.75)',
            textShadow: '0 2px 8px rgba(0,0,0,0.4)'
          }}
        >
          0{index + 1}
        </div>
      </div>

      {/* Content & Work Description Side */}
      <div
        style={{
          padding: '38px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          order: isEven ? 2 : 1,
          background: '#ffffff'
        }}
      >
        {/* Sub-tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#b45309',
            fontWeight: 800,
            fontSize: '0.76rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '12px'
          }}
        >
          <Sparkles size={14} color="#d97706" />
          <span>{project.tag}</span>
        </div>

        {/* Animated Typewriter Heading (Scroll Ke Sath Likhtey Huwe Animation) */}
        <h3
          style={{
            fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
            marginBottom: '14px',
            minHeight: '70px'
          }}
        >
          <span>{displayedHeading}</span>
          {!isTypingDone && (
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: '1.2em',
                background: '#d97706',
                marginLeft: '4px',
                verticalAlign: 'text-bottom',
                animation: 'blinkCursor 0.8s infinite'
              }}
            />
          )}
        </h3>

        {/* Brief problem context */}
        <p
          style={{
            color: '#475569',
            fontSize: '0.94rem',
            lineHeight: 1.6,
            marginBottom: '20px'
          }}
        >
          {project.description}
        </p>

        {/* Detailed Work Done Checklist ("Ye Ye Kaam Kiya Hai Maine") */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              fontSize: '0.82rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#0f172a',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Wrench size={14} color="#d97706" />
            <span>Comprehensive Work Executed:</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {project.workDone.map((step, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontSize: '0.87rem',
                  color: '#334155',
                  lineHeight: 1.5
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#dcfce7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}
                >
                  <Check size={12} color="#16a34a" />
                </div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Guarantee & Direct Book Service Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            paddingTop: '20px',
            borderTop: '1px solid #f1f5f9'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#065f46',
              fontSize: '0.82rem',
              fontWeight: 700
            }}
          >
            <ShieldCheck size={16} color="#059669" />
            <span>{project.warranty}</span>
          </div>

          {/* Book Service Button */}
          <button
            onClick={() => openBookingModal(null, project.category)}
            className="btn-gold"
            style={{
              padding: '11px 24px',
              fontSize: '0.88rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Calendar size={15} />
            <span>Book Service</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WorkShowcase() {
  return (
    <section
      id="work-showcase"
      style={{
        padding: '36px 20px',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 28px' }}>
          <div className="badge-gold" style={{ marginBottom: '10px' }}>
            <Sparkles size={14} />
            <span>Proven Craftsmanship Portfolio</span>
          </div>
          <TypewriterHeading
            text="Real Work Executed:"
            highlightText="Before & After Results"
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 2.7rem)',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '12px'
            }}
          />
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.5 }}>
            Scroll below to inspect authentic restoration projects completed by our master technicians. We fix hydraulic sinkings, cushion sagging, torn leather, and creaks right at your doorstep.
          </p>
        </div>

        {/* 4 Showcase Projects Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {PROJECTS_DATA.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
