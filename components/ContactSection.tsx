'use client';

import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import TypewriterHeading from './TypewriterHeading';

export default function ContactSection() {
  const { showToast } = useBooking();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'salon_chair',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const phone = process.env.NEXT_PUBLIC_PHONE || '+91 97723 81091';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '919772381091';
  const email = process.env.NEXT_PUBLIC_EMAIL || 'support@salonchairrepair.com';
  const address = process.env.NEXT_PUBLIC_ADDRESS || 'Shop No 305, Sector 55, Gurgaon';
  const city = process.env.NEXT_PUBLIC_CITY || 'Gurgaon, Delhi NCR';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      showToast('error', 'Validation Error', 'Please fill in your name, phone number, and message.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry');

      setSubmitted(true);
      showToast('success', 'Inquiry Sent', 'Our service coordinator will call you within 15 minutes.');
      setFormData({ name: '', phone: '', email: '', category: 'salon_chair', message: '' });
    } catch (err: any) {
      showToast('error', 'Error', err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '36px 20px', background: '#f8fafc', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 28px' }}>
          <div className="badge-gold" style={{ marginBottom: '10px' }}>
            <MessageSquare size={14} />
            <span>Connect With Us</span>
          </div>
          <TypewriterHeading
            text="Get In Touch or"
            highlightText="Schedule Inspection"
            style={{
              fontSize: 'clamp(2rem, 3.2vw, 2.7rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '12px',
              color: '#0f172a'
            }}
          />
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.5 }}>
            Have a commercial salon contract or residential sofa inquiry? Speak directly with our master technicians.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Contact Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              className="glass-panel"
              style={{
                padding: '26px',
                borderRadius: '18px',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: '#fef3c7',
                  border: '1px solid #fde68a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#b45309',
                  flexShrink: 0
                }}
              >
                <Phone size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                  Emergency Repair Hotline
                </div>
                <a
                  href={`tel:${phone}`}
                  style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', display: 'block', marginTop: '2px' }}
                >
                  {phone}
                </a>
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '26px',
                borderRadius: '18px',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: '#d1fae5',
                  border: '1px solid #a7f3d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#065f46',
                  flexShrink: 0
                }}
              >
                <Mail size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                  Email Support
                </div>
                <a
                  href={`mailto:${email}`}
                  style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', display: 'block', marginTop: '2px' }}
                >
                  {email}
                </a>
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '26px',
                borderRadius: '18px',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: '#dbeafe',
                  border: '1px solid #bfdbfe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1d4ed8',
                  flexShrink: 0
                }}
              >
                <MapPin size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                  Service Areas & Workshop
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                  {address}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>
                  Active Coverage: {city}
                </div>
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '26px',
                borderRadius: '18px',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: '#f5f3ff',
                  border: '1px solid #ddd6fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7c3aed',
                  flexShrink: 0
                }}
              >
                <Clock size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                  Operational Timings
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                  Monday – Sunday: 8:00 AM – 9:00 PM
                </div>
                <div style={{ fontSize: '0.85rem', color: '#059669', marginTop: '2px', fontWeight: 700 }}>
                  24/7 Emergency Service for Registered Salons
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (Compact & Shorter than Left Column) */}
          <div
            className="glass-panel"
            style={{
              padding: '22px 24px',
              borderRadius: '20px',
              background: '#ffffff',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              border: '1px solid rgba(226, 232, 240, 0.9)'
            }}
          >
            <div style={{ marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                Send an Instant Inquiry
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.84rem', margin: 0, lineHeight: 1.4 }}>
                Describe your chair or sofa issue and we will provide immediate technical advice & price quotation.
              </p>
            </div>

            {submitted ? (
              <div
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '14px',
                  padding: '24px 18px',
                  textAlign: 'center'
                }}
              >
                <CheckCircle2 size={40} color="#059669" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#065f46', marginBottom: '6px' }}>
                  Thank you for reaching out!
                </h4>
                <p style={{ color: '#166534', fontSize: '0.86rem', marginBottom: '16px' }}>
                  Our repair specialist is reviewing your inquiry and will contact you shortly via phone or WhatsApp.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '8px 20px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajesh Kumar (Looks Salon)"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '10px',
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        color: '#0f172a',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 97723 81091"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '10px',
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        color: '#0f172a',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Service Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '10px',
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        color: '#0f172a',
                        fontSize: '0.86rem',
                        outline: 'none'
                      }}
                    >
                      <option value="salon_chair">Salon Chair Repair (Hydraulic, Recliner, Leather)</option>
                      <option value="sofa_repair">Sofa Repair (Foam, Leatherette, Springs)</option>
                      <option value="commercial">Commercial Salon / Barbershop Contract</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '10px',
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        color: '#0f172a',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Describe the Problem or Quantity of Chairs *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the issue (e.g. 3 salon hydraulic chairs sinking down, 5-seater sofa cushions sagging in middle, address/location)..."
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '10px',
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      color: '#0f172a',
                      fontSize: '0.88rem',
                      outline: 'none',
                      resize: 'none',
                      height: '62px'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold"
                  style={{ width: '100%', padding: '11px', fontSize: '0.94rem', marginTop: '4px' }}
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
