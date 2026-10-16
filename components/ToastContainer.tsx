'use client';

import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useBooking();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let borderClass = 'toast-success';
        let iconColor = '#10b981';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = 'toast-error';
          iconColor = '#ef4444';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderClass = 'toast-info';
          iconColor = '#f59e0b';
        }

        return (
          <div key={toast.id} className={`toast-item ${borderClass}`}>
            <Icon size={22} color={iconColor} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff', marginBottom: '2px' }}>
                {toast.title}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.4 }}>
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ color: '#64748b', background: 'transparent', padding: '2px', cursor: 'pointer' }}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
