'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GalleryItem } from '@/models/types';
import { INITIAL_GALLERY } from '@/lib/initialData';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// All real high-definition chair and sofa repair images
const ALL_DEFAULT_IMAGES: string[] = [
  '/images/technician-repairing-chair.jpg',
  '/images/office-boss-chair-luxury.jpg',
  '/images/office-chair-hydraulic-repair.jpg',
  '/images/recliner-motorized-repair.jpg',
  '/images/salon-chair-repair.jpg',
  '/images/sofa-repair-service.jpg',
  '/images/chair-before-after.jpg',
  '/images/sofa-before-after.jpg',
  '/images/office-chair-executive-black.jpg',
  '/images/recliner-chair-black-tufted.jpg',
  '/images/luxury-curved-sofa.jpg',
  '/images/vip-salon-atelier.jpg',
  '/images/luxury-barber-chair.jpg',
  '/images/bright-luxury-sofa.jpg',
  '/images/bright-salon-chairs.jpg',
  '/images/office-chair-broken-base.jpg',
  '/images/office-chair-repair-tools.jpg',
  '/images/office-chair-mesh-front.jpg',
  '/images/office-chair-mesh-back.jpg',
  '/images/office-chair-executive-peeling.jpg',
  '/images/recliner-chair-green-barber.jpg',
  '/images/chair-cream-lounge.jpg',
  '/images/chair-tufted-emerald.jpg',
  '/images/shampoo-station-black.jpg',
  '/images/shampoo-station-salmon.jpg',
  '/images/sofa-sectional-l-shape.jpg',
  '/images/hero-restoration.jpg'
];

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>(ALL_DEFAULT_IMAGES);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Touch Swipe for Mobile Lightbox
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        // Swipe Left -> Next Image
        setSelectedIndex((prev) => (prev! + 1) % images.length);
      } else {
        // Swipe Right -> Prev Image
        setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
      }
    }
  };

  // Fetch real-time gallery items (including admin uploaded ones)
  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.gallery) && data.gallery.length > 0) {
          const apiImages = data.gallery.map((item: GalleryItem) => item.imageUrl);
          // Combine uploaded images first, then unique default images
          const combined = Array.from(new Set([...apiImages, ...ALL_DEFAULT_IMAGES]));
          setImages(combined);
        }
      })
      .catch((err) => {
        console.warn('Failed to load gallery from API:', err);
      });
  }, []);

  // Keyboard navigation (ESC to close, Left/Right arrow to navigate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev! + 1) % images.length);
      if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images.length]);

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '74px' }}>
      <Navbar />

      {/* Pure Image Gallery Container */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '24px 16px 70px' }}>
        <div
          className="gallery-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '16px'
          }}
        >
          {images.map((imgSrc, idx) => (
            <div
              key={`${imgSrc}-${idx}`}
              onClick={() => setSelectedIndex(idx)}
              style={{
                position: 'relative',
                height: 'clamp(280px, 32vw, 340px)',
                borderRadius: '18px',
                overflow: 'hidden',
                background: '#ffffff',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(15, 23, 42, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(15, 23, 42, 0.06)';
              }}
            >
              <Image
                src={imgSrc}
                alt="Chair and sofa repair photo"
                fill
                style={{ objectFit: 'contain', padding: '8px' }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Big Enlarged Image Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          onClick={() => setSelectedIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.94)',
            backdropFilter: 'blur(12px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="lightbox-close-btn"
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 1010,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Previous Image Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
            }}
            className="lightbox-arrow-left"
            style={{
              position: 'fixed',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1010,
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Next Image Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev! + 1) % images.length);
            }}
            className="lightbox-arrow-right"
            style={{
              position: 'fixed',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1010,
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>

          {/* Big Image Display Container (No Text) */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '92vw',
              maxWidth: '1100px',
              height: '84vh',
              borderRadius: '16px',
              overflow: 'hidden'
            }}
          >
            <Image
              src={images[selectedIndex]}
              alt="Enlarged chair repair photo"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
