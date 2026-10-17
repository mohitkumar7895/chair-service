'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useBooking } from '@/context/BookingContext';
import { ServiceItem } from '@/models/types';
import { 
  Wrench, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  MessageCircle, 
  Sparkles, 
  ChevronRight,
  Eye,
  Award,
  Zap,
  HelpCircle
} from 'lucide-react';

interface ServiceDetailViewProps {
  service: ServiceItem;
}

export default function ServiceDetailView({ service }: ServiceDetailViewProps) {
  const { openBookingModal } = useBooking();
  const phone = process.env.NEXT_PUBLIC_PHONE || '+91 97723 81091';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '919772381091';
  const [activePhoto, setActivePhoto] = useState<string>(service.image);

  const steps = service.processSteps || [
    {
      step: '01',
      title: 'Doorstep Inspection & Teardown',
      description: 'Our master technician arrives with mobile workshop tools, inspects internal components, and diagnoses root wear points.',
      image: service.galleryImages?.[0] || service.image
    },
    {
      step: '02',
      title: 'Precision OEM Part Installation',
      description: 'Replacing damaged components with 100% factory-grade spares, recalibrating pressure valves, and reinforcing stress points.',
      image: service.galleryImages?.[1] || service.image
    },
    {
      step: '03',
      title: 'Load Resistance Testing & Warranty',
      description: 'Tested under full working weight load for smooth motion, polished clean, and certified with a 1-year written warranty card.',
      image: service.galleryImages?.[2] || service.image
    }
  ];

  const gallery = service.galleryImages || [service.image, '/images/chair-before-after.jpg', '/images/sofa-before-after.jpg'];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Breadcrumb Bar */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '14px 20px', marginTop: '64px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#64748b' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={14} />
          <Link href="/services" style={{ color: '#64748b', textDecoration: 'none' }}>Services</Link>
          <ChevronRight size={14} />
          <span style={{ color: '#0f172a', fontWeight: 700 }}>{service.title}</span>
        </div>
      </div>

      {/* Hero Header for Service */}
      <section style={{ padding: 'clamp(24px, 4vw, 40px) 16px', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', alignItems: 'center' }}>
          {/* Left Column: Details */}
          <div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
              <span className="badge-gold">
                <Sparkles size={13} />
                <span>Specialized Doorstep Service</span>
              </span>
              {service.badge && (
                <span
                  style={{
                    background: '#fef3c7',
                    color: '#92400e',
                    border: '1px solid #fde68a',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.74rem',
                    fontWeight: 700
                  }}
                >
                  {service.badge}
                </span>
              )}
            </div>

            <h1
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.8rem)',
                fontWeight: 900,
                color: '#0f172a',
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                marginBottom: '12px'
              }}
            >
              {service.title}
            </h1>

            <p style={{ fontSize: '0.96rem', color: '#475569', lineHeight: 1.55, marginBottom: '18px' }}>
              {service.detailedDescription || service.shortDescription}
            </p>

            {/* Quick Guarantees Badge Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                background: '#f1f5f9',
                padding: '16px',
                borderRadius: '16px',
                marginBottom: '26px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Wrench size={20} color="#059669" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Service Type</div>
                  <div style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 800 }}>Doorstep Repair</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={20} color="#d97706" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Guarantee</div>
                  <div style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 800 }}>1-Year Written Card</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Zap size={20} color="#2563eb" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Execution</div>
                  <div style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 800 }}>100% On-Site (Doorstep)</div>
                </div>
              </div>
            </div>

            {/* Features list */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginBottom: '28px' }}>
              {service.features.map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', color: '#334155', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0 }} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => openBookingModal(service)}
                className="btn-gold"
                style={{ padding: '16px 36px', fontSize: '1rem', fontWeight: 800 }}
              >
                <Wrench size={18} />
                <span>Book This Doorstep Service</span>
                <ArrowRight size={17} />
              </button>

              <a
                href={`https://wa.me/${whatsapp}?text=Hi%2C%20I%20want%20doorstep%20service%20for%20${encodeURIComponent(service.title)}.%20Please%20confirm%20technician%20availability.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#25D366',
                  color: '#ffffff',
                  padding: '16px 26px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.96rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(37, 211, 102, 0.35)'
                }}
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Image & Gallery Thumbnails */}
          <div>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(220px, 36vw, 400px)',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 12px 35px -10px rgba(15, 23, 42, 0.16)',
                border: '1px solid #e2e8f0',
                marginBottom: '12px'
              }}
            >
              <Image
                src={activePhoto}
                alt={service.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.65) 100%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#ffffff'
                }}
              >
                <span style={{ fontSize: '0.85rem', fontWeight: 700, background: 'rgba(0,0,0,0.6)', padding: '4px 12px', borderRadius: '9999px' }}>
                  Authentic On-Site Workshop Photograph
                </span>
                <span style={{ fontSize: '0.8rem', background: '#d97706', padding: '4px 10px', borderRadius: '9999px', fontWeight: 700 }}>
                  100% Genuine Spares
                </span>
              </div>
            </div>

            {/* 3 Photos Gallery Selector ("ek he cheej ke images ho teen teen") */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {gallery.slice(0, 3).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhoto(img)}
                  style={{
                    position: 'relative',
                    height: '96px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: activePhoto === img ? '3px solid #d97706' : '1px solid #cbd5e1',
                    transform: activePhoto === img ? 'scale(1.03)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
                  }}
                >
                  <Image src={img} alt={`Angle ${idx + 1}`} fill style={{ objectFit: 'cover' }} />
                  <div
                    style={{
                      position: 'absolute',
                      top: '6px',
                      left: '6px',
                      background: 'rgba(15, 23, 42, 0.75)',
                      color: '#ffffff',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                  >
                    View 0{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CORE SHOWCASE: "Kaise Kaam Hota Hai" (How It Works - 3 Step Photos) */}
      <section style={{ padding: '60px 20px', background: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
            <div className="badge-gold" style={{ marginBottom: '8px' }}>
              <Eye size={14} />
              <span>Step-by-Step Workshop Standard</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 800,
                color: '#0f172a',
                lineHeight: 1.2,
                marginBottom: '8px'
              }}
            >
              Step-by-Step Restoration Process <span className="text-gradient-gold">(How We Restore It)</span>
            </h2>
            <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.5, margin: 0 }}>
              Inspect the authentic step-by-step master restoration process executed directly at your salon or residence by our mobile technicians.
            </p>
          </div>

          {/* 3 Master Step Cards with Real Photos (Compact & Responsive) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '20px'
            }}
          >
            {steps.map((st, i) => (
              <div
                key={i}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 6px 20px -6px rgba(15, 23, 42, 0.05)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
                className="hover-card"
              >
                {/* Step Image */}
                <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                  <Image
                    src={st.image}
                    alt={st.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      background: '#d97706',
                      color: '#ffffff',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      padding: '4px 14px',
                      borderRadius: '9999px',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }}
                  >
                    STEP {st.step}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '14px',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      background: 'rgba(0,0,0,0.6)',
                      padding: '3px 10px',
                      borderRadius: '6px'
                    }}
                  >
                    On-Site Doorstep Execution
                  </div>
                </div>

                {/* Step Content */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px', lineHeight: 1.3 }}>
                    {st.title}
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                    {st.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Book Callout */}
          <div
            style={{
              marginTop: '44px',
              background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
              border: '1.5px solid #fde68a',
              borderRadius: '20px',
              padding: '24px 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                Need This Done At Your Salon Or Home Today?
              </h4>
              <p style={{ color: '#78350f', fontSize: '0.92rem', margin: 0 }}>
                Technician arrives equipped with parts, hydraulic oils, and tools for instant doorstep restoration.
              </p>
            </div>

            <button
              onClick={() => openBookingModal(service)}
              className="btn-gold"
              style={{ padding: '14px 28px', fontSize: '0.95rem', fontWeight: 800 }}
            >
              <span>Schedule Inspection</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Engineering Standards & Spares Used */}
      <section style={{ padding: '60px 20px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
            <div className="badge-gold" style={{ marginBottom: '8px' }}>
              <Award size={14} />
              <span>Workshop Precision</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
              Why We Deliver Flawless Results
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309', marginBottom: '14px' }}>
                <ShieldCheck size={22} />
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                German Nitrile O-Rings
              </h4>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                High-pressure dual-lip seals rated for 300+ bar pressure, preventing any fluid leaks or pressure loss.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', marginBottom: '14px' }}>
                <CheckCircle2 size={22} />
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                40D Virgin Memory Foam
              </h4>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                High-resilience foam blocks designed to withstand continuous 250kg weight without any sagging.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', marginBottom: '14px' }}>
                <Zap size={22} />
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Zero Downtime Guarantee
              </h4>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                Restored directly on your premises so you never miss a salon appointment or living room gathering.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fae8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea', marginBottom: '14px' }}>
                <Award size={22} />
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                12-Month Guarantee Card
              </h4>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                Complete coverage against any sinking, stitching failure, or loose parts with free doorstep re-service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions for this Service */}
      <section style={{ padding: '60px 20px', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="badge-gold" style={{ marginBottom: '8px' }}>
              <HelpCircle size={14} />
              <span>Common Questions</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
              Questions About {service.title}?
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#f8fafc', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>
                Do I need to transport my heavy chair or sofa anywhere?
              </h4>
              <p style={{ color: '#475569', fontSize: '0.88rem', margin: 0, lineHeight: 1.55 }}>
                No! 100% of the overhaul is executed right inside your salon or home. Our technician van carries hydraulic fluid, German seals, foam, and pneumatic tools.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>
                How long does the repair work take?
              </h4>
              <p style={{ color: '#475569', fontSize: '0.88rem', margin: 0, lineHeight: 1.55 }}>
                Hydraulic overhauls and base repairs take approximately 2 hours. Full leather reupholstery is completed within 24 to 48 hours.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>
                What does the 1-year guarantee cover?
              </h4>
              <p style={{ color: '#475569', fontSize: '0.88rem', margin: 0, lineHeight: 1.55 }}>
                If your hydraulic cylinder sinks, leaks fluid, or the cushion foam sags within 12 months, our technician visits and fixes it completely free of charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Sticky CTA Bar (Ultra-Compact & Responsive) */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(12px)',
          padding: '9px 16px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          zIndex: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '8px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
            <Image src={service.image} alt={service.title} fill style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{service.title}</div>
            <div style={{ color: '#f59e0b', fontSize: '0.72rem', fontWeight: 600 }} className="hide-mobile">1-Year Guarantee • Free Inspection</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={() => openBookingModal(service)}
            className="btn-gold"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          >
            <span>Book Visit</span>
            <ArrowRight size={13} />
          </button>

          <a
            href={`https://wa.me/${whatsapp}?text=Hi%2C%20I%20want%20to%20book%20${encodeURIComponent(service.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#25D366',
              color: '#ffffff',
              padding: '8px 12px',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              textDecoration: 'none'
            }}
          >
            <MessageCircle size={15} />
            <span className="hide-mobile">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
