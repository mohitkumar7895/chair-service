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
  Eye,
  Check
} from 'lucide-react';
import TypewriterHeading from './TypewriterHeading';

import { ServiceCategory } from '@/models/types';

interface ProjectWork {
  id: string;
  category: ServiceCategory;
  serviceName: string;
  tag: string;
  heading: string;
  description: string;
  workDone: string[];
  warranty: string;
  image: string;
}

const PROJECTS_DATA: ProjectWork[] = [
  {
    id: 'work-office-hydraulic',
    category: 'office_chair',
    serviceName: 'Class-4 Gas Lift Cylinder & Base Replacement',
    tag: 'OFFICE CHAIR SINKING HYDRAULIC RESTORATION',
    heading: 'Fixed Sinking Office Chair with Class-4 BIFMA Certified Pneumatic Lift',
    description: 'Executive chair continuously sinking to lowest height. Completely overhauled with heavy-duty nitrogen lift on-site.',
    workDone: [
      'Installed Class-4 BIFMA nitrogen gas cylinder rated for 200kg load',
      'Serviced chrome 5-star base & fitted silent anti-scratch wheels',
      'Calibrated tilt lock mechanism and lubricated tension spring'
    ],
    warranty: '2-Year Replacement Warranty on Cylinder',
    image: '/images/office-chair-hydraulic-repair.jpg'
  },
  {
    id: 'work-recliner-motor',
    category: 'recliner_chair',
    serviceName: 'Motorized Electric Recliner Actuator Repair',
    tag: 'ELECTRIC MOTORIZED RECLINER MECHANISM',
    heading: 'Restored Jammed Electric Recliner Actuator Motor & Wireless Remote',
    description: 'Stuck motorized recliner diagnosed and repaired on-site with zero furniture transport hassle.',
    workDone: [
      'Diagnosed 29V DC power supply adapter & hand remote controller',
      'Replaced worn internal drive gears in linear actuator motor',
      'Calibrated auto-stop limit switches and lubricated pivot linkages'
    ],
    warranty: '12 Months Electric Motor Guarantee',
    image: '/images/recliner-motorized-repair.jpg'
  },
  {
    id: 'work-boss-leather',
    category: 'office_chair',
    serviceName: 'Executive Boss High-Back Re-Upholstery',
    tag: 'EXECUTIVE BOSS CHAIR OVERHAUL & 40D FOAM',
    heading: 'Reupholstered Peeling Boss Chair with Breathable Nappa Leatherette',
    description: 'Peeling faux leather stripped down and restored with high-density molded foam and breathable leatherette.',
    workDone: [
      'Stripped peeling outer skin down to ergonomic wooden shell',
      'Injected 40D high-resilience memory foam for lumbar support',
      'Fitted anti-sweat breathable leatherette with reinforced seams'
    ],
    warranty: '3-Year Anti-Peel & Foam Sag Guarantee',
    image: '/images/office-chair-executive-black.jpg'
  },
  {
    id: 'work-manual-recliner',
    category: 'recliner_chair',
    serviceName: 'Manual Recliner Cable & Spring Mechanism',
    tag: 'MANUAL RECLINER PULL HANDLE & FOOTREST',
    heading: 'Replaced Snapped Recliner Pull Cable & Balanced Heavy-Duty Tension Springs',
    description: 'Broken release cable and loose footrest mechanism completely restored on-site.',
    workDone: [
      'Replaced snapped release pull cable with reinforced alloy cable',
      'Re-anchored heavy-gauge high-tension footrest return springs',
      'Cleaned mechanical tracks and applied anti-friction lubricant'
    ],
    warranty: '12 Months Mechanism Warranty',
    image: '/images/recliner-chair-black-tufted.jpg'
  },
  {
    id: 'work-salon-hydraulic',
    category: 'salon_chair',
    serviceName: 'Salon Hydraulic Pump & Base Repair',
    tag: 'SALON HYDRAULIC PUMP & CYLINDER OVERHAUL',
    heading: 'Fixed Sinking Salon Chair & Restored 250kg Smooth Hydraulic Lift',
    description: 'Leaking hydraulic oil and dropping chair height restored with heavy-duty seals on-site.',
    workDone: [
      'Flushed hydraulic cylinder & replaced high-pressure nitrile seals',
      'Re-machined piston rod and calibrated foot pedal lock valve',
      'Load-tested under 250kg weight for rock-solid stability'
    ],
    warranty: '12 Months Written Hydraulic Guarantee',
    image: '/images/salon-chair-repair.jpg'
  },
  {
    id: 'work-sofa-foam',
    category: 'sofa_repair',
    serviceName: 'High-Density Foam & Cushion Padding',
    tag: 'SOFA SAGGING RECONSTRUCTION & 40D FOAM',
    heading: 'Reconstructed Sunken Sofa Cushions with 40-Density Orthopedic Foam',
    description: 'Sagging seat cushions and sunken base completely rebuilt with virgin orthopedic foam.',
    workDone: [
      'Replaced broken zigzag carbon steel springs & reinforced webbing',
      'Custom-cut 40D High-Resilience virgin molded foam for zero sag',
      'Treated upholstery with leather rejuvenation balm'
    ],
    warranty: '3-Year Cushion Sag Guarantee',
    image: '/images/luxury-curved-sofa.jpg'
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

        {/* Doorstep Precision Badge */}
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
          <Wrench size={14} color="#059669" />
          <span>Doorstep Precision Repair</span>
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
