'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useBooking } from '@/context/BookingContext';
import { Phone, Wrench, Menu, X, ArrowRight, UserCog } from 'lucide-react';

export default function Navbar() {
  const { openBookingModal } = useBooking();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('scroll-hero');
      const threshold = heroEl ? heroEl.offsetHeight - 90 : 40;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Before & After', href: '/before-after' },
    { label: 'Why Choose Us', href: '/why-choose-us' },
    { label: 'Contact', href: '/contact' }
  ];

  const phone = process.env.NEXT_PUBLIC_PHONE || '+91 97723 81091';
  const rawPhone = phone.replace(/[^0-9+]/g, '');

  return (
    <>
      {/* Sleek, Compact & Transparent Navbar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 950,
          background: isScrolled
            ? 'rgba(10, 10, 15, 0.92)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: isScrolled ? '0 8px 25px rgba(0, 0, 0, 0.4)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '9px 24px', // Compact height
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          {/* Brand Logo (Compact & Crisp) */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none'
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '9px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 3px 10px rgba(217, 119, 6, 0.4)'
              }}
            >
              <Wrench size={17} strokeWidth={2.5} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 'clamp(0.88rem, 3.8vw, 1.05rem)',
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  lineHeight: 1.15,
                  textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                Salon Chair <span style={{ color: '#fbbf24' }}>&</span> Sofa
              </div>
              <div
                style={{
                  fontSize: '0.62rem',
                  color: 'rgba(255, 255, 255, 0.65)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}
                className="hide-mobile"
              >
                Doorstep Master Workshop
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links (Always Visible on Desktop, Sleek & Compact) */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  padding: '4px 2px',
                  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  letterSpacing: '0.01em'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fbbf24')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)')}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/admin"
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                padding: '3px 9px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                textDecoration: 'none',
                fontWeight: 600
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)')}
            >
              <UserCog size={12} color="#fbbf24" />
              <span>Admin</span>
            </Link>
          </nav>

          {/* Action Header Items */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Direct Phone Dial (Desktop Only) */}
            <a
              href={`tel:${rawPhone}`}
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
              className="hide-mobile"
            >
              <Phone size={13} color="#38bdf8" />
              <span>{phone}</span>
            </a>

            {/* Book Repair Button (Compact & Responsive) */}
            <button
              onClick={() => openBookingModal()}
              className="btn-gold"
              id="header-book-repair-btn"
              style={{
                padding: '7px 14px',
                fontSize: '0.8rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 4px 14px -2px rgba(217, 119, 6, 0.6)'
              }}
            >
              <span>Book</span>
              <ArrowRight size={13} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                color: '#ffffff',
                padding: '6px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer'
              }}
              className="mobile-hamburger-btn"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              background: '#0f172a',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)'
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  padding: '6px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '0.86rem',
                fontWeight: 600,
                color: '#fbbf24',
                textDecoration: 'none',
                padding: '6px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <UserCog size={15} />
              <span>Admin Management Portal</span>
            </Link>

            <a
              href={`tel:${rawPhone}`}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.86rem',
                marginTop: '4px'
              }}
            >
              <Phone size={15} color="#38bdf8" />
              <span>Call Hotline: {phone}</span>
            </a>
          </div>
        )}
      </header>
    </>
  );
}
