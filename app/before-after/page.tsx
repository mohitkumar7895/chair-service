import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import BeforeAfterSection from '@/components/BeforeAfterSection';
import ReviewsSection from '@/components/ReviewsSection';
import Footer from '@/components/Footer';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Before & After Restoration Results | Salon Chair and Sofa Repair',
  description: 'See verified before and after restoration results for hydraulic salon styling chairs, vintage barber recliners, and luxury Chesterfield sofas.'
};

export default function BeforeAfterPage() {
  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Navbar />

      {/* Main Before After Component */}

      {/* Main Before After Component */}
      <BeforeAfterSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Action CTA */}
      <section style={{ padding: '60px 20px 90px', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '24px',
            padding: '44px 32px',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)'
          }}
        >
          <div className="badge-emerald" style={{ marginBottom: '16px' }}>
            <ShieldCheck size={14} />
            <span>Restore Your Own Furniture</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
            Ready to give your chairs or sofas a showroom transformation?
          </h2>
          <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 28px' }}>
            Save 70% compared to buying replacement units. Book an on-site master technician inspection today!
          </p>
          <Link href="/contact" className="btn-gold" style={{ padding: '14px 32px', fontSize: '1rem' }}>
            <span>Schedule Free Inspection</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
