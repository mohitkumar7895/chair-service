'use client';

import React from 'react';
import { PhoneCall, MessageCircle } from 'lucide-react';

export default function BottomActionBar() {
  const phone = process.env.NEXT_PUBLIC_PHONE || '+91 97723 81091';
  const rawPhone = phone.replace(/[^0-9+]/g, '');
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || '919772381091';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello! I need doorstep Salon Chair Repair / Sofa Repair service. Please provide information.'
  )}`;

  return (
    <div className="floating-action-bar">
      {/* 1. CALL BUTTON */}
      <a
        href={`tel:${rawPhone}`}
        className="fab-item fab-call hover-lift"
        aria-label="Call repair technician"
      >
        <div className="fab-icon-wrap" style={{ background: 'rgba(56, 189, 248, 0.2)' }}>
          <PhoneCall size={14} style={{ color: '#38bdf8' }} />
        </div>
        <span className="fab-label">Call Now</span>
      </a>

      {/* 2. WHATSAPP BUTTON */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fab-item fab-whatsapp hover-lift"
        aria-label="Chat on WhatsApp"
      >
        <div className="fab-icon-wrap" style={{ background: 'rgba(255, 255, 255, 0.25)' }}>
          <MessageCircle size={15} style={{ color: '#ffffff' }} />
        </div>
        <span className="fab-label">WhatsApp</span>
      </a>
    </div>
  );
}
