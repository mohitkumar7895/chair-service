'use client';

import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { INITIAL_REVIEWS } from '@/lib/initialData';
import TypewriterHeading from './TypewriterHeading';

export default function ReviewsSection() {
  return (
    <section id="reviews" style={{ padding: '36px 20px', background: '#f8fafc', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="scroll-reveal" style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 28px' }}>
          <div className="badge-gold" style={{ marginBottom: '10px' }}>
            <Star size={14} fill="#f59e0b" color="#f59e0b" />
            <span>Verified Customer Reviews</span>
          </div>
          <TypewriterHeading
            text="What Our Clients"
            highlightText="Say About Our Work"
            style={{
              fontSize: 'clamp(2rem, 3.2vw, 2.7rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '12px',
              color: '#0f172a'
            }}
          />
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.5 }}>
            Read real feedback from corporate offices, homeowners, and businesses who got their chairs, recliners, and sofas repaired at their doorstep.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '18px'
          }}
        >
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel"
              style={{
                padding: 'clamp(18px, 3.5vw, 28px)',
                borderRadius: '18px',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <Quote
                size={38}
                color="#fde68a"
                style={{ position: 'absolute', top: '24px', right: '24px' }}
              />

              <div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>

                <div
                  style={{
                    display: 'inline-block',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#1d4ed8',
                    background: '#eff6ff',
                    border: '1px solid #dbeafe',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    marginBottom: '14px'
                  }}
                >
                  {rev.serviceType}
                </div>

                <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '24px' }}>
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '18px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    boxShadow: '0 4px 10px rgba(217, 119, 6, 0.25)'
                  }}
                >
                  {(rev.name || (rev as any).customerName || 'C').charAt(0)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>
                      {rev.name || (rev as any).customerName || 'Satisfied Customer'}
                    </span>
                    {rev.verified && (
                      <span title="Verified Customer" style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <ShieldCheck size={15} color="#059669" />
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {rev.role || 'Verified Customer'} {rev.location ? `• ${rev.location}` : ''}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
