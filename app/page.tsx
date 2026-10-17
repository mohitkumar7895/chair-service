import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import RotatingChairRepairShowcase from '@/components/RotatingChairRepairShowcase';
import ScrollRevealInit from '@/components/ScrollRevealInit';
import ServicesSection from '@/components/ServicesSection';
import BeforeAfterSection from '@/components/BeforeAfterSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <ScrollRevealInit />
      <Navbar />
      <Hero />
      <RotatingChairRepairShowcase />
      <ServicesSection isHomePage={true} />
      <BeforeAfterSection />
      <WhyChooseUs />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
