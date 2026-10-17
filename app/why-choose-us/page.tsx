import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import WhyChooseUs from '@/components/WhyChooseUs';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { Award, ShieldCheck, CheckCircle2, Truck, Hammer, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Why Choose Us | Certified Salon Chair & Sofa Repair Specialists',
  description: 'Discover why top salon chains, barbershops, and homeowners trust us. 100% on-site repair, 1-year written warranty, certified master technicians, and genuine OEM parts.'
};

export default function WhyChooseUsPage() {
  const phone = process.env.NEXT_PUBLIC_PHONE || '+91 97723 81091';

  const steps = [
    {
      step: '01',
      title: 'Free On-Site Inspection',
      desc: 'Our technician inspects hydraulic cylinders, seals, foam density, and structural frame joints at your premises.'
    },
    {
      step: '02',
      title: 'Transparent Pricing & Spares Approval',
      desc: 'We explain the exact mechanical fault and provide written pricing before touching a single screw.'
    },
    {
      step: '03',
      title: 'Precision Master Craftsmanship',
      desc: 'High-pressure hydraulic flushing, diamond tufting, and zero-creak spring re-tensioning executed in front of your eyes.'
    },
    {
      step: '04',
      title: 'Load Testing & 12-Month Warranty',
      desc: 'We weight-test up to 250kg on hydraulic chairs, issue an official 1-year warranty card, and ensure 100% customer satisfaction.'
    }
  ];

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '64px' }}>
      <Navbar />

      {/* Why Choose Us Perks Grid */}

      {/* Why Choose Us Perks Grid */}
      <WhyChooseUs />

      {/* 4-Step Process Section */}
      <section style={{ padding: '70px 20px 80px', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="badge-gold" style={{ marginBottom: '14px' }}>
              <Hammer size={14} />
              <span>Our Restoration Workflow</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>
              How We Restore Your Furniture to Factory Condition
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            {steps.map((st) => (
              <div
                key={st.step}
                className="glass-panel"
                style={{
                  padding: '30px',
                  borderRadius: '20px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    fontSize: '2.4rem',
                    fontWeight: 900,
                    color: '#d97706',
                    opacity: 0.35,
                    marginBottom: '10px',
                    lineHeight: 1
                  }}
                >
                  {st.step}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                  {st.title}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
