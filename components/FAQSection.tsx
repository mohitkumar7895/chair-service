'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import TypewriterHeading from './TypewriterHeading';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Can you repair salon chairs on-site at our salon or barbershop?',
      a: 'Yes! 95% of hydraulic pump leaks, pedal fixes, and reclining issues are repaired directly on-site at your salon premises with zero business downtime.'
    },
    {
      q: 'Why is my salon chair sinking down under client weight?',
      a: 'This is caused by worn-out pressure seals or oxidized fluid. We flush the cylinder, install heavy-duty nitrile O-rings, and repressurize up to 250kg.'
    },
    {
      q: 'How long does sofa foam cushion replacement take?',
      a: 'Standard sofa cushion foam replacements are usually completed within 24 hours using 40D High Resilience virgin foam with anti-sag guarantee.'
    },
    {
      q: 'What type of leather do you use for salon styling chairs?',
      a: 'We use salon-grade synthetic rexine and Italian PU leather specifically treated to resist chemical hair dyes, bleach, and shampoos.'
    },
    {
      q: 'Do you offer a warranty on your repair work?',
      a: 'Yes, all hydraulic pump overhauls, recliner parts, and structural repairs come with an official 12-month written guarantee certificate.'
    },
    {
      q: 'Do you provide emergency same-day salon technician dispatch?',
      a: 'Yes. We offer priority dispatch within 2 hours for commercial salons and barbershops experiencing chair breakdowns during peak hours.'
    }
  ];

  return (
    <section id="faq" style={{ padding: '28px 20px', background: '#ffffff', position: 'relative' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        {/* Section Header (Compact) */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div className="badge-gold" style={{ marginBottom: '8px', padding: '4px 12px', fontSize: '0.74rem' }}>
            <HelpCircle size={13} />
            <span>FAQs</span>
          </div>
          <TypewriterHeading
            text="Frequently Asked"
            highlightText="Questions"
            style={{
              fontSize: 'clamp(1.7rem, 2.5vw, 2.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '6px',
              color: '#0f172a'
            }}
          />
          <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.4 }}>
            Quick answers about our salon chair and sofa restoration services.
          </p>
        </div>

        {/* Compact FAQ Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: isOpen ? '#fffdf7' : '#ffffff',
                  border: isOpen ? '1px solid #d97706' : '1px solid #e2e8f0',
                  boxShadow: isOpen ? '0 4px 12px rgba(217, 119, 6, 0.08)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '13px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    color: '#0f172a',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    gap: '12px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      color: isOpen ? '#d97706' : '#94a3b8',
                      flexShrink: 0
                    }}
                  >
                    <ChevronDown size={17} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 18px 14px',
                      color: '#475569',
                      fontSize: '0.86rem',
                      lineHeight: 1.55,
                      borderTop: '1px solid rgba(245, 158, 11, 0.15)',
                      paddingTop: '10px'
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
