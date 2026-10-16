import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceDetailView from '@/components/ServiceDetailView';
import { INITIAL_SERVICES } from '@/lib/initialData';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return INITIAL_SERVICES.map((service) => ({
    id: service.id
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const service = INITIAL_SERVICES.find((s) => s.id === id);

  if (!service) {
    return {
      title: 'Service Not Found | Doorstep Salon Chair & Sofa Repair'
    };
  }

  return {
    title: `${service.title} | Step-by-Step Doorstep Repair & 1-Year Guarantee`,
    description: `${service.shortDescription} Genuine German seals, 40D memory foam, and 2-hour doorstep turnaround.`
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const service = INITIAL_SERVICES.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <Navbar />
      <ServiceDetailView service={service} />
      <Footer />
    </main>
  );
}
