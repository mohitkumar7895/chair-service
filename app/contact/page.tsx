import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { MessageSquare, PhoneCall, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Salon Chair Repair & Sofa Repair Service',
  description: 'Get in touch with our master technicians for same-day salon chair hydraulic repairs and luxury sofa reconditioning. Call hotline or chat on WhatsApp.'
};

export default function ContactPage() {
  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '64px' }}>
      <Navbar />

      {/* Main Contact Section */}

      {/* Main Contact Section */}
      <ContactSection />

      <FAQSection />
      <Footer />
    </main>
  );
}
