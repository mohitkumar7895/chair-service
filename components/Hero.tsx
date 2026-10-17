'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useBooking } from '@/context/BookingContext';
import { 
  ArrowRight, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MessageCircle
} from 'lucide-react';
import { ServiceCategory } from '@/models/types';

interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  category: ServiceCategory;
}

const FOUR_VIP_SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: 'CLASS-4 BIFMA HYDRAULICS',
    title: 'OFFICE CHAIR REPAIR',
    subtitle: 'On-site sinking gas lift cylinder replacement, executive boss leather & wheels.',
    image: '/images/office-chair-hydraulic-repair.jpg',
    ctaText: 'Book Office Chair Fix',
    category: 'office_chair'
  },
  {
    id: 2,
    badge: 'MOTORIZED & MANUAL ATELIER',
    title: 'RECLINER CHAIR REPAIR',
    subtitle: 'Electric actuator motor fix, snapped release cable & luxury leather refilling.',
    image: '/images/recliner-motorized-repair.jpg',
    ctaText: 'Book Recliner Service',
    category: 'recliner_chair'
  },
  {
    id: 3,
    badge: 'HYDRAULIC RESTORATION',
    title: 'SALON CHAIR REPAIR',
    subtitle: 'Same-day salon hydraulic cylinder rebuilds, 250kg load tested & chemical-proof leather.',
    image: '/images/vip-salon-atelier.jpg',
    ctaText: 'Book Salon Chair Service',
    category: 'salon_chair'
  },
  {
    id: 4,
    badge: '40D ORTHOPEDIC MEMORY FOAM',
    title: 'SOFA & CUSHION RESTORATION',
    subtitle: '40D virgin molded foam core refilling, snapped spring repair & 3-year zero-sag guarantee.',
    image: '/images/luxury-curved-sofa.jpg',
    ctaText: 'Book Sofa Service',
    category: 'sofa_repair'
  }
];

export default function Hero() {
  const { openBookingModal } = useBooking();
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '919772381091';
  const [activeIndex, setActiveIndex] = useState(0);
  const total = FOUR_VIP_SLIDES.length;

  // Auto-advance through 4 VIP slides every 3.5s automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3500);

    return () => clearInterval(timer);
  }, [total]);

  // Touch Swipe for Mobile (100% Passive, Never Blocks Normal Vertical Scrolling)
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        setActiveIndex((prev) => (prev + 1) % total);
      } else {
        setActiveIndex((prev) => (prev - 1 + total) % total);
      }
    }
  };

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % total);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  const slide = FOUR_VIP_SLIDES[activeIndex];

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        height: '90vh',
        minHeight: '520px',
        maxHeight: '840px',
        overflow: 'hidden',
        background: '#0a0a0c',
        color: '#ffffff'
      }}
      id="scroll-hero"
    >
      {/* 4 VIP Background Images with Silky Crossfade */}
      {FOUR_VIP_SLIDES.map((s, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'scale(1.02)' : 'scale(1.05)',
              transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 5s ease-out',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            {/* Ambient soft glow backdrop for full uncropped image fill */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.45,
                filter: 'blur(22px)',
                transform: 'scale(1.12)',
                pointerEvents: 'none'
              }}
              className="hero-ambient-glow"
            >
              <Image
                src={s.image}
                alt=""
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Main Uncropped Sharp Image */}
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={idx <= 1}
              className="hero-bg-img"
              style={{ objectPosition: 'center' }}
            />
            {/* Subtle corner gradient so text is readable while center remains completely open */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(10, 10, 15, 0.75) 0%, rgba(10, 10, 15, 0.35) 45%, rgba(10, 10, 15, 0.1) 100%)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '140px',
                background: 'linear-gradient(to top, rgba(10, 10, 15, 0.9), transparent)'
              }}
            />
          </div>
        );
      })}

      {/* CORNER-SIDE CONTENT (Bottom-Left Corner, Clean & Minimal) */}
      <div
        style={{
          position: 'absolute',
          bottom: '50px',
          left: '48px',
          zIndex: 25,
          maxWidth: '560px',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
        className="hero-corner-content"
      >
        {/* Minimal Badge */}
        <div
          key={`badge-${activeIndex}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: '9999px',
            background: 'rgba(217, 119, 6, 0.22)',
            border: '1px solid rgba(245, 158, 11, 0.55)',
            backdropFilter: 'blur(8px)',
            marginBottom: '14px',
            animation: 'heroTextReveal 0.35s ease both'
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#fbbf24',
              boxShadow: '0 0 6px #f59e0b'
            }}
          />
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#fef3c7'
            }}
          >
            {slide.badge}
          </span>
        </div>

        {/* Punchy Main Title (Fluid Responsive) */}
        <h1
          key={`title-${activeIndex}`}
          style={{
            fontSize: 'clamp(1.8rem, 4.2vw, 3.6rem)',
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            textTransform: 'uppercase',
            color: '#ffffff',
            margin: '0 0 8px',
            textShadow: '0 4px 25px rgba(0, 0, 0, 0.8)',
            animation: 'heroTextReveal 0.35s ease both 0.06s'
          }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #ffffff 40%, #fde68a 80%, #d97706 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {slide.title}
          </span>
        </h1>

        {/* Short 1-Line Minimal Subtitle */}
        <p
          key={`sub-${activeIndex}`}
          style={{
            fontSize: 'clamp(0.86rem, 1.2vw, 1.02rem)',
            lineHeight: 1.45,
            color: 'rgba(241, 245, 249, 0.92)',
            margin: '0 0 16px',
            fontWeight: 400,
            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
            animation: 'heroTextReveal 0.35s ease both 0.12s'
          }}
        >
          {slide.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="hero-btn-group" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => openBookingModal(null, slide.category)}
            style={{
              padding: '11px 22px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.88rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px -4px rgba(217, 119, 6, 0.65)'
            }}
            className="hover-lift"
          >
            <Calendar size={15} />
            <span>{slide.ctaText}</span>
            <ArrowRight size={14} />
          </button>

          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
              `Hi, I saw your ${slide.title} on the website. I have photos of my chair/sofa and need a quick repair quotation.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '11px 20px',
              borderRadius: '9999px',
              background: 'rgba(16, 185, 129, 0.9)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontWeight: 800,
              fontSize: '0.86rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              boxShadow: '0 8px 20px -4px rgba(16, 185, 129, 0.5)',
              backdropFilter: 'blur(8px)'
            }}
            className="hover-lift"
          >
            <MessageCircle size={15} />
            <span>WhatsApp Photos</span>
          </a>
        </div>
      </div>

      {/* CORNER-SIDE CONTROLS (Bottom-Right Corner) */}
      <div
        style={{
          position: 'absolute',
          bottom: '50px',
          right: '48px',
          zIndex: 25,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
        className="hero-corner-controls"
      >
        {/* Numeric Indicator */}
        <span
          style={{
            fontSize: '0.85rem',
            fontFamily: 'monospace',
            letterSpacing: '0.15em',
            color: '#fbbf24',
            fontWeight: 800,
            marginRight: '6px'
          }}
        >
          0{activeIndex + 1} / 0{total}
        </span>

        {/* 4 Slide Selectors */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {FOUR_VIP_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                width: i === activeIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '9999px',
                background: i === activeIndex ? '#f59e0b' : 'rgba(255, 255, 255, 0.35)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          aria-label="Previous image"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          aria-label="Next image"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <a
        href="#services"
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.72rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.55)',
          textDecoration: 'none'
        }}
        className="hide-mobile"
      >
        <span>Scroll Down</span>
        <ChevronDown size={13} style={{ animation: 'bounce 1.5s infinite' }} />
      </a>
    </div>
  );
}
