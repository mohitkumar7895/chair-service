'use client';

import React from 'react';
import Link from 'next/link';
import { Wrench, Phone, Mail, MapPin, ShieldCheck, UserCog, ArrowUpRight, MessageCircle } from 'lucide-react';

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_PHONE || '+91 97723 81091';
  const rawPhone = phone.replace(/[^0-9+]/g, '');
  const email = process.env.NEXT_PUBLIC_EMAIL || 'support@salonchairrepair.com';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || '919772381091';
  const address = process.env.NEXT_PUBLIC_ADDRESS || 'Shop No 305, Sector 55, Gurgaon';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello! I need doorstep Office Chair / Recliner / Salon Chair repair service.'
  )}`;

  return (
    <footer
      className="site-footer"
      style={{
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        padding: 'clamp(28px, 4vw, 42px) 18px 20px',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Main VIP Row */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            marginBottom: '28px'
          }}
        >
          {/* Brand Info */}
          <div className="footer-brand" style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 3px 8px rgba(217, 119, 6, 0.3)'
                }}
              >
                <Wrench size={16} strokeWidth={2.5} />
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>
                Office <span style={{ color: '#d97706' }}>&</span> Recliner Repair
              </div>
            </div>

            <p className="footer-desc" style={{ color: '#64748b', fontSize: '0.84rem', lineHeight: 1.5, margin: '0 0 12px' }}>
              Doorstep repairs for all office chairs (gas lift hydraulic, mesh, wheels), motorized & manual recliners, salon equipment & sofas with 100% genuine spares.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                color: '#166534',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 700
              }}
            >
              <ShieldCheck size={14} color="#16a34a" />
              <span>12-Month Official Warranty Certificate</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-services">
            <h4 style={{ color: '#0f172a', fontWeight: 800, fontSize: '0.85rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Services Catalog
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', fontSize: '0.84rem', color: '#475569' }}>
              <Link href="/services/office-hydraulic-cylinder-lift" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-link">
                Office Chair Gas Lift Repair
              </Link>
              <Link href="/services/recliner-motorized-electric-repair" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-link">
                Motorized Recliner Actuator Fix
              </Link>
              <Link href="/services/office-executive-leather-overhaul" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-link">
                Boss Executive Chair Overhaul
              </Link>
              <Link href="/services/recliner-manual-mechanism-cable" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-link">
                Manual Recliner Cable & Spring
              </Link>
              <Link href="/services/salon-hydraulic-pump" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-link">
                Salon Chair Hydraulic Pump
              </Link>
              <Link href="/services/sofa-foam-cushion-refill" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-link">
                40D Sofa Cushion Refilling
              </Link>
            </div>
          </div>

          {/* Explore Links Column */}
          <div className="footer-company">
            <h4 style={{ color: '#0f172a', fontWeight: 800, fontSize: '0.85rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Company & Results
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', fontSize: '0.84rem', color: '#475569' }}>
              <Link href="/before-after" style={{ color: 'inherit', textDecoration: 'none' }}>Before & After</Link>
              <Link href="/why-choose-us" style={{ color: 'inherit', textDecoration: 'none' }}>Why Choose Us</Link>
              <Link href="/gallery" style={{ color: 'inherit', textDecoration: 'none' }}>Gallery</Link>
              <Link href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link>
              <Link href="/admin" style={{ color: '#d97706', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <UserCog size={13} />
                <span>Admin Portal</span>
              </Link>
            </div>
          </div>

          {/* Direct Contact Helpline */}
          <div className="footer-contact">
            <h4 style={{ color: '#0f172a', fontWeight: 800, fontSize: '0.85rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Doorstep Helpline
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: '#334155' }}>
              <a
                href={`tel:${rawPhone}`}
                style={{
                  color: '#0f172a',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 800,
                  fontSize: '0.94rem'
                }}
              >
                <Phone size={15} color="#d97706" />
                <span>{phone}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#059669',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700
                }}
              >
                <MessageCircle size={15} color="#059669" />
                <span>Instant WhatsApp Support</span>
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                <MapPin size={14} color="#d97706" />
                <span>{address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Bottom Copyright Row */}
        <div
          className="footer-bottom"
          style={{
            borderTop: '1px solid #f1f5f9',
            paddingTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            fontSize: '0.78rem',
            color: '#94a3b8'
          }}
        >
          <div>
            © {new Date().getFullYear()} Salon Chair & Sofa Repair Service.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Same-Day Doorstep Service</span>
            <Link href="/admin" style={{ color: '#64748b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <UserCog size={12} />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
