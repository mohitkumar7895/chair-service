import type { Metadata } from 'next';
import './globals.css';
import { BookingProvider } from '@/context/BookingContext';
import { AuthProvider } from '@/context/AuthContext';
import ToastContainer from '@/components/ToastContainer';
import BookingModal from '@/components/BookingModal';
import BottomActionBar from '@/components/BottomActionBar';

export const metadata: Metadata = {
  title: 'Salon Chair Repair and Sofa Repair Service | On-Site Hydraulic & Upholstery Specialists',
  description:
    '#1 Certified Salon Chair Repair and Sofa Repair Service. Specialist hydraulic pump rebuilds, 40D foam refilling, chemical-resistant rexine upholstery, and 360 swivel repairs. Same-day doorstep service with 12-month warranty.',
  keywords: [
    'salon chair repair',
    'sofa repair service',
    'salon chair hydraulic repair',
    'barber chair restoration',
    'sofa cushion foam replacement',
    'leather sofa repair',
    'salon chair upholstery',
    'hydraulic pump repair'
  ],
  authors: [{ name: 'Salon Chair Repair and Sofa Repair Service' }],
  openGraph: {
    title: 'Salon Chair Repair and Sofa Repair Service | Hydraulic & Leather Specialists',
    description: 'Restore your salon styling chairs and luxury sofas at 70% lower cost than buying new. Same-day on-site service with 12 months warranty.',
    images: ['/images/hero-restoration.jpg'],
    type: 'website'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <BookingProvider>
            {children}
            <BookingModal />
            <ToastContainer />
            <BottomActionBar />
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
