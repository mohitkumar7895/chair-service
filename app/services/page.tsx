import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import ServicesSection from '@/components/ServicesSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { Wrench, ShieldCheck, CheckCircle2, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Repair Services | Salon Chair Hydraulic & Luxury Sofa Overhaul',
  description: 'Explore full salon chair repair services including hydraulic pump rebuilds, re-upholstery, 360 swivel repairs, and luxury sofa foam refilling with 12 months warranty.'
};

export default function ServicesPage() {
  const phone = process.env.NEXT_PUBLIC_PHONE || '+91 97723 81091';

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Navbar />

      {/* Main Services Section */}
      <ServicesSection />

      {/* Service Guarantee Banner */}
      <section style={{ padding: '40px 20px 80px', background: '#f8fafc' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
            border: '1px solid #fde68a',
            borderRadius: '24px',
            padding: '40px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309', fontWeight: 800, fontSize: '0.9rem', marginBottom: '8px' }}>
              <ShieldCheck size={20} />
              <span>OFFICIAL 1-YEAR GUARANTEE CERTIFICATE</span>
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Have Custom Salon Equipment or Bulk Orders?
            </h3>
            <p style={{ color: '#78350f', fontSize: '0.95rem', maxWidth: '650px' }}>
              We service salon chains, luxury barbershops, hotels, and luxury apartments with tailored commercial maintenance contracts and zero downtime.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-gold" style={{ padding: '14px 28px' }}>
              <span>Request Custom Quote</span>
            </Link>
            <a href={`tel:${phone}`} className="btn-secondary" style={{ padding: '14px 24px' }}>
              <PhoneCall size={16} color="#059669" />
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
