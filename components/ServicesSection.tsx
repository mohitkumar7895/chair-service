'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useBooking } from '@/context/BookingContext';
import { ServiceItem, ServiceCategory } from '@/models/types';
import { INITIAL_SERVICES } from '@/lib/initialData';
import { Sparkles, Check, Wrench, ArrowRight, MessageCircle, ShieldCheck, Camera } from 'lucide-react';
import TypewriterHeading from './TypewriterHeading';

interface ServicesSectionProps {
  isHomePage?: boolean;
}

export default function ServicesSection({ isHomePage = false }: ServicesSectionProps) {
  const { openBookingModal, selectedCategoryTab, setSelectedCategoryTab } = useBooking();
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '919772381091';

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.services?.length) {
          setServices(data.services);
        }
      })
      .catch((err) => console.warn('Using default services:', err));
  }, []);

  // Home page: Top 6 featured services covering office, recliner, salon, and sofa
  const homeFeaturedIds = [
    'office-hydraulic-cylinder-lift',
    'office-executive-leather-overhaul',
    'recliner-motorized-electric-repair',
    'recliner-manual-mechanism-cable',
    'salon-hydraulic-pump',
    'sofa-foam-cushion-refill'
  ];

  const displayedServices = isHomePage
    ? services.filter((s) => homeFeaturedIds.includes(s.id)).slice(0, 6)
    : services.filter((s) => s.category === selectedCategoryTab);

  const categoryOptions: { key: ServiceCategory; label: string; icon: string; count: number }[] = [
    { key: 'office_chair', label: 'Office Chairs', icon: '💺', count: services.filter(s => s.category === 'office_chair').length },
    { key: 'recliner_chair', label: 'Recliners', icon: '🛋️', count: services.filter(s => s.category === 'recliner_chair').length },
    { key: 'salon_chair', label: 'Salon Chairs', icon: '✂️', count: services.filter(s => s.category === 'salon_chair').length },
    { key: 'sofa_repair', label: 'Sofa & Couch', icon: '🛋️', count: services.filter(s => s.category === 'sofa_repair').length },
  ];

  return (
    <section id="services" style={{ padding: '34px 18px', background: '#f8fafc', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Header: Compact & Clean */}
        <div className="scroll-reveal" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 20px' }}>
          <div className="badge-gold" style={{ marginBottom: '8px', padding: '3px 12px', fontSize: '0.76rem' }}>
            <Sparkles size={13} />
            <span>{isHomePage ? 'Doorstep Specialist Services' : 'Complete Restoration Catalog'}</span>
          </div>
          <TypewriterHeading
            text="Office Chair, Recliner &"
            highlightText="Furniture Repair"
            style={{
              fontSize: 'clamp(1.7rem, 2.7vw, 2.3rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginBottom: '6px',
              color: '#0f172a',
              lineHeight: 1.2
            }}
          />
          <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.45, margin: '0 auto' }}>
            {isHomePage
              ? 'On-site hydraulic cylinder fixes, motorized & manual recliner repairs, and 40D foam refilling with 1-year warranty.'
              : 'Class-4 gas lifts, ergonomic mesh re-stringing, executive leather upholstery, motorized actuators, and salon equipment overhauls.'}
          </p>
        </div>

        {/* WhatsApp Photo Consultation Callout Banner (Compact) */}
        <div
          style={{
            background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
            border: '1px solid #a7f3d0',
            borderRadius: '14px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '22px',
            boxShadow: '0 3px 10px rgba(16, 185, 129, 0.06)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#10b981',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Camera size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#064e3b' }}>
                Have a broken chair? Send photos on WhatsApp
              </div>
              <div style={{ fontSize: '0.78rem', color: '#047857' }}>
                Instant doorstep estimate in 2 minutes. Free technician consultation.
              </div>
            </div>
          </div>

          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
              'Hi! I need repair service for my chair. Here are the photos of the chair and the issue for a quick quote.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="services-whatsapp-btn"
            style={{
              background: '#059669',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.82rem',
              padding: '8px 16px',
              borderRadius: '9999px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 3px 8px rgba(5, 150, 105, 0.25)'
            }}
          >
            <MessageCircle size={15} />
            <span>Send Photos on WhatsApp</span>
          </a>
        </div>

        {/* Category Switcher Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '22px', width: '100%' }}>
          <div
            className="category-tabs-container"
            style={{
              background: '#ffffff',
              padding: '4px',
              borderRadius: '9999px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px',
              justifyContent: 'center',
              maxWidth: '640px',
              width: '100%',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
            }}
          >
            {categoryOptions.map((cat) => {
              const isSelected = isHomePage ? false : selectedCategoryTab === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setSelectedCategoryTab(cat.key);
                    if (isHomePage) {
                      window.location.href = `/services#services`;
                    }
                  }}
                  className={`tab-btn ${isSelected ? 'is-active' : ''}`}
                  style={{
                    padding: '7px 15px',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    transition: 'all 0.2s ease',
                    background: isSelected ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'transparent',
                    color: isSelected ? '#ffffff' : '#475569',
                    boxShadow: isSelected ? '0 2px 6px rgba(217, 119, 6, 0.25)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid: Compact Cards with Full Uncropped HD Images */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '18px'
          }}
        >
          {displayedServices.map((service) => (
            <div
              key={service.id}
              className="glass-panel"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                boxShadow: '0 3px 14px -3px rgba(15, 23, 42, 0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              {/* IMAGE CONTAINER: Compact Height + 100% Full Uncropped HD View */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '165px',
                  background: 'linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  padding: '6px',
                  borderBottom: '1px solid #f1f5f9'
                }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  style={{
                    objectFit: 'contain',
                    padding: '8px',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.08))'
                  }}
                  className="hover-zoom-img"
                  sizes="(max-width: 768px) 100vw, 360px"
                  priority={isHomePage}
                />

                {/* Badge Top Left */}
                {service.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(4px)',
                      color: '#b45309',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
                    }}
                  >
                    {service.badge}
                  </div>
                )}

                {/* Doorstep Service Pill Bottom Right */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(4px)',
                    color: '#ffffff',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '0.68rem',
                    fontWeight: 700
                  }}
                >
                  <Wrench size={10} color="#34d399" />
                  <span>Doorstep Repair</span>
                </div>
              </div>

              {/* CONTENT BODY: Clean, Km-Km Likha, Highly Readable */}
              <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    lineHeight: 1.3,
                    marginBottom: '4px',
                    minHeight: '40px'
                  }}
                >
                  {service.title}
                </h3>

                {/* Price / Guarantee Strip */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginBottom: '8px',
                    color: '#92400e',
                    fontSize: '0.74rem',
                    fontWeight: 700
                  }}
                >
                  <ShieldCheck size={12} color="#d97706" />
                  <span>{service.priceFormatted}</span>
                </div>

                {/* Short 1-Line Description */}
                <p
                  style={{
                    color: '#64748b',
                    fontSize: '0.8rem',
                    lineHeight: 1.4,
                    marginBottom: '10px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {service.shortDescription}
                </p>

                {/* 2 Tight Feature Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
                  {service.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#334155' }}>
                      <Check size={11} color="#059669" style={{ flexShrink: 0 }} />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Actions: View Link + Book Button + WhatsApp */}
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => openBookingModal(service)}
                      className="btn-gold"
                      style={{ flex: 1, padding: '8px 12px', fontSize: '0.82rem', fontWeight: 700 }}
                    >
                      <span>Book Service</span>
                      <ArrowRight size={13} />
                    </button>

                    <a
                      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                        `Hi! I need repair quote for "${service.title}". Please share details.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: '#d1fae5',
                        border: '1px solid #a7f3d0',
                        color: '#065f46',
                        borderRadius: '9999px',
                        padding: '0 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none'
                      }}
                      title="WhatsApp Inquiry"
                    >
                      <MessageCircle size={15} />
                    </a>
                  </div>

                  <Link
                    href={`/services/${service.id}`}
                    style={{
                      textAlign: 'center',
                      fontSize: '0.74rem',
                      color: '#b45309',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      padding: '2px 0'
                    }}
                    className="hover-link"
                  >
                    <span>View Restoration Steps & Photos</span>
                    <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services CTA Button (Home Page Only) */}
        {isHomePage && (
          <div style={{ textAlign: 'center', marginTop: '26px' }}>
            <Link
              href="/services"
              className="btn-gold"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 26px',
                fontSize: '0.88rem',
                fontWeight: 800,
                boxShadow: '0 3px 12px -2px rgba(217, 119, 6, 0.35)',
                textDecoration: 'none'
              }}
            >
              <span>Explore All {services.length} Specialized Repair Services</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
