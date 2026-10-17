import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import ServicesSection from '@/components/ServicesSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { Wrench, ShieldCheck, CheckCircle2, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Doorstep Chair Repair Services | Office Chair, Recliner & Salon Chair Overhaul',
  description: 'Doorstep repair for all office chairs (gas lift, base, mesh, boss leather), motorized & manual recliners, salon hydraulic chairs, and sofa foam refilling with 12 months warranty.'
};

export default function ServicesPage() {
  const phone = process.env.NEXT_PUBLIC_PHONE || '+91 97723 81091';

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '64px' }}>
      <Navbar />

      {/* Main Services Section */}
      <ServicesSection />

      {/* Service Guarantee Banner - Concise & Clean */}
      <section style={{ padding: '24px 16px 50px', background: '#f8fafc' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
            border: '1px solid #fde68a',
            borderRadius: '18px',
            padding: '24px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b45309', fontWeight: 800, fontSize: '0.78rem', marginBottom: '4px' }}>
              <ShieldCheck size={16} />
              <span>1-YEAR OFFICIAL WARRANTY</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
              Office, Home or Salon Bulk Repair?
            </h3>
            <p style={{ color: '#78350f', fontSize: '0.86rem', margin: 0, maxWidth: '560px' }}>
              Same-day doorstep service with genuine Class-4 spares and zero downtime.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/contact" className="btn-gold" style={{ padding: '9px 18px', fontSize: '0.84rem' }}>
              <span>Get Quote</span>
            </Link>
            <a href={`tel:${phone}`} className="btn-secondary" style={{ padding: '9px 16px', fontSize: '0.84rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <PhoneCall size={14} color="#059669" />
              <span>{phone}</span>
            </a>
          </div>
        </div>
      </section>

      <FAQSection />
      <Footer />
    </main>
  );
}
