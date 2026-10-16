'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useBooking } from '@/context/BookingContext';
import { ServiceItem } from '@/models/types';
import { INITIAL_SERVICES } from '@/lib/initialData';
import { Sparkles, Check, Clock, ArrowRight, MessageCircle, ShieldCheck, Eye } from 'lucide-react';
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

  // Home page: Top 3 premier services
  const homeFeaturedIds = ['salon-hydraulic-pump', 'sofa-foam-cushion-refill', 'salon-chair-upholstery'];
  const displayedServices = isHomePage
    ? services.filter((s) => homeFeaturedIds.includes(s.id)).slice(0, 3)
    : services.filter((s) => s.category === selectedCategoryTab);

  return (
    <section id="services" style={{ padding: '32px 18px', background: '#f8fafc', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Header - Concise & Direct */}
        <div className="scroll-reveal" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 20px' }}>
          <div className="badge-gold" style={{ marginBottom: '6px', padding: '3px 12px', fontSize: '0.76rem' }}>
            <Sparkles size={13} />
            <span>{isHomePage ? 'Featured Doorstep Repairs' : 'Specialized Restoration Catalog'}</span>
          </div>
          <TypewriterHeading
            text="Salon Chair &"
            highlightText="Luxury Sofa Restoration"
            style={{
              fontSize: 'clamp(1.75rem, 2.8vw, 2.3rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginBottom: '6px',
              color: '#0f172a',
              lineHeight: 1.2
            }}
          />
          <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.45, margin: '0 auto' }}>
            {isHomePage
              ? 'On-site hydraulic rebuilds, 40D cushion foam refilling, and chemical-proof leather with 1-year warranty.'
              : 'Factory-grade hydraulic cylinder overhauls, chemical-resistant upholstery, and structural timber frame repair.'}
          </p>
        </div>

        {/* Category Switcher Tabs - Shown on /services page (Responsive Grid) */}
        {!isHomePage && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '22px',
              width: '100%'
            }}
          >
            <div
              style={{
                background: '#ffffff',
                padding: '4px',
                borderRadius: '9999px',
                border: '1px solid #e2e8f0',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6px',
                width: '100%',
                maxWidth: '420px',
                boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)'
              }}
            >
              <button
                onClick={() => setSelectedCategoryTab('salon_chair')}
                style={{
                  padding: '9px 12px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  transition: 'all 0.2s ease',
                  background: selectedCategoryTab === 'salon_chair' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'transparent',
                  color: selectedCategoryTab === 'salon_chair' ? '#ffffff' : '#64748b',
                  boxShadow: selectedCategoryTab === 'salon_chair' ? '0 2px 8px rgba(217, 119, 6, 0.3)' : 'none',
                  textAlign: 'center',
                  whiteSpace: 'nowrap'
                }}
              >
                ✂️ Salon Chairs
              </button>

              <button
                onClick={() => setSelectedCategoryTab('sofa_repair')}
                style={{
                  padding: '9px 12px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  transition: 'all 0.2s ease',
                  background: selectedCategoryTab === 'sofa_repair' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'transparent',
                  color: selectedCategoryTab === 'sofa_repair' ? '#ffffff' : '#64748b',
                  boxShadow: selectedCategoryTab === 'sofa_repair' ? '0 2px 8px rgba(217, 119, 6, 0.3)' : 'none',
                  textAlign: 'center',
                  whiteSpace: 'nowrap'
                }}
              >
                🛋️ Sofa & Couch
              </button>
            </div>
          </div>
        )}

        {/* Services Grid (Compact & Responsive) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
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
                position: 'relative',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                boxShadow: '0 4px 18px -4px rgba(15, 23, 42, 0.06)'
              }}
            >
              {/* Image banner - Compact Height (190px) */}
              <div style={{ position: 'relative', width: '100%', height: '190px', overflow: 'hidden' }}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="hover-zoom-img"
                  sizes="(max-width: 768px) 100vw, 380px"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.02) 0%, rgba(15, 23, 42, 0.5) 100%)'
                  }}
                />

                {/* Badge */}
                {service.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: '#ffffff',
                      color: '#b45309',
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                    }}
                  >
                    {service.badge}
                  </div>
                )}

                {/* Turnaround Time Pill */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: '#065f46',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  <Clock size={11} color="#059669" />
                  <span>{service.turnaroundTime}</span>
                </div>
              </div>

              {/* Content body - Compact & Clean */}
              <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.25, marginBottom: '6px' }}>
                  {service.title}
                </h3>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginBottom: '10px',
                    color: '#92400e',
                    background: '#fef3c7',
                    border: '1px solid #fde68a',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    fontSize: '0.76rem',
                    width: 'fit-content'
                  }}
                >
                  <ShieldCheck size={13} color="#d97706" />
                  <span>{service.priceFormatted}</span>
                </div>

                <p style={{ color: '#475569', fontSize: '0.84rem', lineHeight: 1.45, marginBottom: '12px' }}>
                  {service.shortDescription}
                </p>

                {/* Features checklist - Compact */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.8rem', color: '#334155' }}>
                      <Check size={13} color="#059669" style={{ flexShrink: 0 }} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Dedicated Landing Page Link - 100% Pure English */}
                <Link
                  href={`/services/${service.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '9px 12px',
                    background: '#f8fafc',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    color: '#b45309',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    marginBottom: '12px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  className="hover-card"
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Eye size={14} color="#d97706" />
                    <span>View Restoration Process & Photos</span>
                  </span>
                  <ArrowRight size={13} />
                </Link>

                {/* Action Buttons */}
                <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => openBookingModal(service)}
                    className="btn-gold"
                    style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                  >
                    <span>Book Service</span>
                    <ArrowRight size={14} />
                  </button>

                  <a
                    href={`https://wa.me/${whatsapp}?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(service.title)}.%20Please%20share%20details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#d1fae5',
                      border: '1px solid #a7f3d0',
                      color: '#065f46',
                      borderRadius: '9999px',
                      padding: '0 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    title="Ask on WhatsApp"
                  >
                    <MessageCircle size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services CTA Button (Shown on Home Page) */}
        {isHomePage && (
          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <Link
              href="/services"
              className="btn-gold"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                fontSize: '0.92rem',
                fontWeight: 800,
                boxShadow: '0 4px 16px -2px rgba(217, 119, 6, 0.4)'
              }}
            >
              <span>Explore All 8 Specialized Services & Gallery</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
