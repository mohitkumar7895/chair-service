'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Wrench, Clock, Award, CheckCircle2 } from 'lucide-react';

export default function ScrollTicker() {
  const items = [
    { text: '100% ON-SITE DOORSTEP WORKSHOP', icon: Wrench },
    { text: 'HYDRAULIC PUMP 250KG LOAD TESTED', icon: ShieldCheck },
    { text: 'GERMAN NITRILE HIGH-PRESSURE SEALS', icon: Sparkles },
    { text: '40D ZERO-SAG ORTHOPEDIC MEMORY FOAM', icon: Award },
    { text: 'SAME-DAY 2-HOUR RAPID TURNAROUND', icon: Clock },
    { text: 'OFFICIAL 12-MONTH WRITTEN WARRANTY', icon: CheckCircle2 },
    { text: '15,000+ RESTORATIONS COMPLETED', icon: Award },
    { text: 'ZERO SALON DOWNTIME GUARANTEE', icon: ShieldCheck },
  ];

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        color: '#ffffff',
        padding: '12px 0',
        overflow: 'hidden',
        position: 'relative',
        borderTop: '1px solid rgba(245, 158, 11, 0.3)',
        borderBottom: '1px solid rgba(245, 158, 11, 0.3)',
        zIndex: 10
      }}
    >
      <div className="ticker-track">
        {/* Render twice for seamless continuous infinite marquee */}
        {[...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 28px',
                whiteSpace: 'nowrap',
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: idx % 2 === 0 ? '#fbbf24' : '#ffffff',
                textTransform: 'uppercase'
              }}
            >
              <Icon size={14} color="#f59e0b" style={{ flexShrink: 0 }} />
              <span>{item.text}</span>
              <span style={{ color: 'rgba(255,255,255,0.3)', marginLeft: '16px' }}>✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
