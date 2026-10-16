'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { BookingRequest, InquiryMessage, AdminStats, ServiceItem } from '@/models/types';
import {
  Lock,
  Wrench,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  Trash2,
  RefreshCw,
  Search,
  DollarSign,
  ArrowLeft,
  LogOut,
  Database,
  LayoutDashboard,
  CalendarCheck,
  Inbox,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function AdminPage() {
  const { isAuthenticated, login, logout, isLoading } = useAuth();

  // Login form state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard state
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [inquiries, setInquiries] = useState<InquiryMessage[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'inquiries' | 'services' | 'database'>('dashboard');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Fetch dashboard data
  const loadDashboardData = async () => {
    setIsDataLoading(true);
    try {
      const [statsRes, bookingsRes, inquiriesRes, servicesRes] = await Promise.all([
        fetch('/api/stats').then((r) => r.json()),
        fetch('/api/bookings').then((r) => r.json()),
        fetch('/api/inquiries').then((r) => r.json()),
        fetch('/api/services').then((r) => r.json())
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (bookingsRes.success) setBookings(bookingsRes.bookings);
      if (inquiriesRes.success) setInquiries(inquiriesRes.inquiries);
      if (servicesRes.success) setServices(servicesRes.services);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    const res = await login(usernameInput, passwordInput);
    setIsLoggingIn(false);
    if (!res.success) {
      setLoginError(res.error || 'Invalid credentials');
    }
  };

  const handleQuickDemoLogin = async () => {
    setIsLoggingIn(true);
    const res = await login('admin', 'admin123');
    setIsLoggingIn(false);
    if (!res.success) {
      setLoginError(res.error || 'Demo login failed');
    }
  };

  const handleStatusChange = async (id: string, newStatus: BookingRequest['status']) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
        loadDashboardData();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm(`Are you sure you want to delete booking ${id}?`)) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        loadDashboardData();
      }
    } catch (err) {
      console.error('Failed to delete booking:', err);
    }
  };

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || b.category === categoryFilter;
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesCategory && matchesSearch;
  });

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <RefreshCw className="animate-spin" size={32} color="#d97706" />
      </div>
    );
  }

  // -------------------------------------------------------------
  // Render: Admin Login Card
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          background: 'radial-gradient(circle at 50% 50%, #fffbeb 0%, #f1f5f9 100%)'
        }}
      >
        <div
          className="glass-panel"
          style={{
            width: '100%',
            maxWidth: '440px',
            padding: '40px 32px',
            borderRadius: '24px',
            background: '#ffffff',
            border: '1px solid #fde68a',
            boxShadow: '0 25px 60px rgba(15, 23, 42, 0.12)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                margin: '0 auto 16px',
                boxShadow: '0 8px 25px rgba(217, 119, 6, 0.3)'
              }}
            >
              <Lock size={26} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Admin Control Panel
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '4px' }}>
              Salon Chair Repair & Sofa Repair Service
            </p>
          </div>

          {loginError && (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '10px',
                padding: '12px',
                color: '#b91c1c',
                fontSize: '0.85rem',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <AlertCircle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                Admin Username
              </label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="admin"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                Password or Security PIN
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="•••••••• (Default: admin123)"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn-gold"
              style={{ width: '100%', padding: '13px', fontSize: '0.95rem', marginTop: '6px' }}
            >
              {isLoggingIn ? 'Verifying...' : 'Sign In as Administrator'}
            </button>

            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="btn-secondary"
              style={{ width: '100%', padding: '11px', fontSize: '0.85rem' }}
            >
              ⚡ 1-Click Demo Login (admin / admin123)
            </button>
          </form>

          <div style={{ marginTop: '28px', textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
            <Link
              href="/"
              style={{
                color: '#64748b',
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ArrowLeft size={14} />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Render: Authenticated VIP Sidebar Admin Dashboard
  // -------------------------------------------------------------
  const navTabs = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'bookings', label: 'Repair Bookings', icon: CalendarCheck, badge: pendingCount > 0 ? `${pendingCount} new` : `${bookings.length}` },
    { id: 'inquiries', label: 'Customer Inquiries', icon: Inbox, badge: inquiries.length > 0 ? `${inquiries.length}` : undefined },
    { id: 'services', label: 'Services Catalog', icon: Wrench, badge: `${services.length}` },
    { id: 'database', label: 'MySQL Database & ENV', icon: Database }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f8fafc' }}>
      {/* Mobile Sidebar Overlay Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 900
          }}
        />
      )}

      {/* VIP Dark Sidebar */}
      <aside
        style={{
          width: '270px',
          background: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 950,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '4px 0 25px rgba(0, 0, 0, 0.2)'
        }}
        className={`admin-sidebar-nav ${mobileSidebarOpen ? 'is-open' : ''}`}
      >
        {/* Brand Area */}
        <div style={{ padding: '22px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 4px 12px rgba(217, 119, 6, 0.4)'
                }}
              >
                <Wrench size={18} strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#ffffff', lineHeight: 1.2 }}>
                  Chair <span style={{ color: '#fbbf24' }}>&</span> Sofa
                </div>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Admin Control Portal
                </div>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="admin-mobile-close"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#ffffff',
                padding: '6px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'none'
              }}
            >
              <X size={18} />
            </button>
          </div>

          <div
            style={{
              marginTop: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34d399',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: '9999px'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
            <span>Database Online • Live Sync</span>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <div style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', padding: '6px 12px 10px' }}>
            Main Menu
          </div>

          {navTabs.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setMobileSidebarOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  transition: 'all 0.2s ease',
                  border: 'none',
                  cursor: 'pointer',
                  background: isActive ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.1) 100%)' : 'transparent',
                  color: isActive ? '#fbbf24' : '#94a3b8',
                  boxShadow: isActive ? 'inset 0 0 0 1px rgba(245, 158, 11, 0.3)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={17} color={isActive ? '#fbbf24' : '#64748b'} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      background: isActive ? '#d97706' : 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={loadDashboardData}
            disabled={isDataLoading}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 12px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#e2e8f0',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={14} className={isDataLoading ? 'animate-spin' : ''} />
            <span>{isDataLoading ? 'Syncing...' : 'Sync & Refresh Data'}</span>
          </button>

          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 12px',
              borderRadius: '10px',
              background: 'transparent',
              color: '#94a3b8',
              fontSize: '0.82rem',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowLeft size={14} />
              <span>Public Website</span>
            </span>
            <ExternalLink size={13} />
          </Link>

          <button
            onClick={logout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 12px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '4px'
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area (Offset by Sidebar Width on Desktop) */}
      <div className="admin-main-wrapper" style={{ flex: 1, marginLeft: '270px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Top Header Bar */}
        <header
          style={{
            background: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '14px 24px',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)'
          }}
        >
          {/* Left: Mobile Toggle & Page Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="admin-hamburger-btn"
              style={{
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                color: '#0f172a',
                padding: '7px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Toggle sidebar menu"
            >
              <Menu size={20} />
            </button>

            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
                {navTabs.find((t) => t.id === activeTab)?.label}
              </h2>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                Manage bookings, inquiries, catalog & live MySQL database
              </div>
            </div>
          </div>

          {/* Right: Quick Search & Admin Chip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }} className="hide-mobile">
              <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '11px', top: '10px' }} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '8px 12px 8px 34px',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#0f172a',
                  fontSize: '0.84rem',
                  outline: 'none',
                  width: '200px'
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 12px',
                borderRadius: '9999px',
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#0f172a'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
              <span>Admin</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main style={{ padding: 'clamp(18px, 3vw, 32px)', flex: 1, maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div>
              {/* KPI Stats Cards */}
              {stats && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                    gap: '16px',
                    marginBottom: '28px'
                  }}
                >
                  <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', background: '#ffffff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.75rem', fontWeight: 700 }}>
                      <span>TOTAL REPAIR JOBS</span>
                      <Users size={16} color="#2563eb" />
                    </div>
                    <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', margin: '6px 0 2px' }}>
                      {stats.totalBookings}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                      {stats.salonChairBookings} Chairs • {stats.sofaBookings} Sofas
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', background: '#ffffff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#92400e', fontSize: '0.75rem', fontWeight: 700 }}>
                      <span>PENDING VISITS</span>
                      <Clock size={16} color="#d97706" />
                    </div>
                    <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#b45309', margin: '6px 0 2px' }}>
                      {stats.pendingRepairs}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#b45309' }}>Immediate technician assignment</div>
                  </div>

                  <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', background: '#ffffff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#065f46', fontSize: '0.75rem', fontWeight: 700 }}>
                      <span>COMPLETED RESTORATIONS</span>
                      <CheckCircle2 size={16} color="#059669" />
                    </div>
                    <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#059669', margin: '6px 0 2px' }}>
                      {stats.completedRepairs}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#059669' }}>100% Quality checked</div>
                  </div>

                  <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', background: '#ffffff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#92400e', fontSize: '0.75rem', fontWeight: 700 }}>
                      <span>ESTIMATED PIPELINE</span>
                      <DollarSign size={16} color="#d97706" />
                    </div>
                    <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#b45309', margin: '6px 0 2px' }}>
                      ₹{stats.estimatedRevenue.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#64748b' }}>Total booking valuation</div>
                  </div>
                </div>
              )}

              {/* Quick Actions & Recent Bookings */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                {/* Recent Bookings Box */}
                <div className="glass-panel" style={{ padding: '24px', borderRadius: '18px', background: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      Recent Repair Requests
                    </h3>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      style={{ fontSize: '0.8rem', color: '#d97706', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      View All →
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {bookings.slice(0, 4).map((b) => (
                      <div
                        key={b.id}
                        style={{
                          padding: '12px',
                          borderRadius: '12px',
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>{b.customerName}</div>
                          <div style={{ fontSize: '0.76rem', color: '#64748b' }}>{b.serviceName} • {b.city}</div>
                        </div>

                        <span
                          style={{
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            background: b.status === 'pending' ? '#fef3c7' : b.status === 'completed' ? '#dcfce7' : '#dbeafe',
                            color: b.status === 'pending' ? '#92400e' : b.status === 'completed' ? '#166534' : '#1e40af'
                          }}
                        >
                          {b.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Inquiries Box */}
                <div className="glass-panel" style={{ padding: '24px', borderRadius: '18px', background: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      Recent Inquiries
                    </h3>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      style={{ fontSize: '0.8rem', color: '#d97706', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      View All →
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {inquiries.slice(0, 4).map((inq) => (
                      <div
                        key={inq.id}
                        style={{
                          padding: '12px',
                          borderRadius: '12px',
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>{inq.name}</div>
                          <div style={{ fontSize: '0.76rem', color: '#64748b' }}>{inq.phone}</div>
                        </div>

                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '5px 12px',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            background: '#d1fae5',
                            color: '#065f46',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <MessageCircle size={13} />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKINGS MANAGEMENT */}
          {activeTab === 'bookings' && (
            <div>
              {/* Filter and Search Bar */}
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginBottom: '20px',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', gap: '10px', flex: 1, minWidth: '260px', maxWidth: '450px', position: 'relative' }}>
                  <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="text"
                    placeholder="Search by customer, phone, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '12px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      color: '#0f172a',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      color: '#0f172a',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  >
                    <option value="all">All Categories</option>
                    <option value="salon_chair">Salon Chairs Only</option>
                    <option value="sofa_repair">Sofas Only</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      color: '#0f172a',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Bookings List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {filteredBookings.length === 0 ? (
                  <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', background: '#ffffff', borderRadius: '18px' }}>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>No bookings found matching filters.</p>
                  </div>
                ) : (
                  filteredBookings.map((b) => (
                    <div
                      key={b.id}
                      className="glass-panel"
                      style={{
                        padding: '20px 22px',
                        borderRadius: '16px',
                        background: '#ffffff',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px',
                        flexWrap: 'wrap'
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '240px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 800, color: '#b45309', fontSize: '0.85rem' }}>{b.id}</span>
                          <span
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '6px',
                              background: b.category === 'salon_chair' ? '#fffbeb' : '#f0fdf4',
                              color: b.category === 'salon_chair' ? '#92400e' : '#166534'
                            }}
                          >
                            {b.category === 'salon_chair' ? '✂️ Salon Chair' : '🛋️ Sofa Repair'}
                          </span>
                        </div>

                        <h4 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
                          {b.customerName}
                        </h4>

                        <div style={{ fontSize: '0.84rem', color: '#475569', marginBottom: '8px' }}>
                          <strong>Service:</strong> {b.serviceName}
                        </div>

                        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', fontSize: '0.82rem', color: '#64748b' }}>
                          <span>📍 {b.address}, {b.city}</span>
                          <span>📞 {b.phone}</span>
                          <span>📅 {b.preferredDate}</span>
                        </div>
                      </div>

                      {/* Status Changer & Quick Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '10px',
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            border: '1px solid #cbd5e1',
                            background:
                              b.status === 'pending'
                                ? '#fef3c7'
                                : b.status === 'completed'
                                ? '#dcfce7'
                                : b.status === 'in_progress'
                                ? '#fae8ff'
                                : '#ffffff',
                            color:
                              b.status === 'pending'
                                ? '#92400e'
                                : b.status === 'completed'
                                ? '#166534'
                                : b.status === 'in_progress'
                                ? '#7e22ce'
                                : '#0f172a',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="pending">🟡 Pending</option>
                          <option value="confirmed">🔵 Confirmed</option>
                          <option value="in_progress">🟣 In Progress</option>
                          <option value="completed">🟢 Completed</option>
                          <option value="cancelled">🔴 Cancelled</option>
                        </select>

                        <a
                          href={`tel:${b.phone}`}
                          style={{
                            background: '#f1f5f9',
                            color: '#0f172a',
                            padding: '8px 12px',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            textDecoration: 'none'
                          }}
                          title="Call Customer"
                        >
                          <Phone size={14} color="#059669" />
                          <span>Call</span>
                        </a>

                        <a
                          href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                            b.customerName
                          )}%2C%20regarding%20your%20doorstep%20service%20booking%20(${b.id})`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: '#d1fae5',
                            color: '#065f46',
                            padding: '8px 12px',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            textDecoration: 'none'
                          }}
                          title="WhatsApp Customer"
                        >
                          <MessageCircle size={14} color="#059669" />
                          <span>WhatsApp</span>
                        </a>

                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          style={{
                            background: '#fee2e2',
                            color: '#b91c1c',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Delete Booking"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {inquiries.length === 0 ? (
                <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', background: '#ffffff', borderRadius: '18px' }}>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>No customer inquiries yet.</p>
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="glass-panel"
                    style={{
                      padding: '22px',
                      borderRadius: '16px',
                      background: '#ffffff',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '16px',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: '260px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ fontWeight: 800, color: '#b45309', fontSize: '0.85rem' }}>{inq.id}</span>
                        <h4 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{inq.name}</h4>
                        <span className="badge-gold" style={{ fontSize: '0.7rem' }}>
                          {inq.category.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>

                      <p style={{ color: '#334155', fontSize: '0.92rem', lineHeight: 1.5, margin: '0 0 10px' }}>
                        &ldquo;{inq.message}&rdquo;
                      </p>

                      <div style={{ display: 'flex', gap: '14px', fontSize: '0.82rem', color: '#64748b', flexWrap: 'wrap' }}>
                        <span>Phone: <strong style={{ color: '#0f172a' }}>{inq.phone}</strong></span>
                        {inq.email && <span>Email: <strong style={{ color: '#0f172a' }}>{inq.email}</strong></span>}
                        <span>Received: {new Date(inq.createdAt).toLocaleString()}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                          inq.name
                        )}%2C%20thank%20you%20for%20contacting%20Salon%20Chair%20%26%20Sofa%20Repair%20Service.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: '#d1fae5',
                          color: '#065f46',
                          padding: '8px 16px',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.84rem',
                          fontWeight: 700,
                          textDecoration: 'none'
                        }}
                      >
                        <MessageCircle size={15} />
                        <span>Reply on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: SERVICES CATALOG */}
          {activeTab === 'services' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '18px'
              }}
            >
              {services.map((s) => (
                <div key={s.id} className="glass-panel" style={{ padding: '22px', borderRadius: '16px', background: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span className="badge-gold" style={{ fontSize: '0.72rem' }}>{s.category.replace('_', ' ').toUpperCase()}</span>
                    <span style={{ fontWeight: 800, color: '#b45309', fontSize: '0.94rem' }}>{s.priceFormatted}</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                    {s.title}
                  </h4>
                  <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.45, marginBottom: '12px' }}>
                    {s.shortDescription}
                  </p>
                  <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>
                    Turnaround: {s.turnaroundTime}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: DATABASE & ENVIRONMENT */}
          {activeTab === 'database' && (
            <div className="glass-panel" style={{ padding: '28px', borderRadius: '18px', background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Database size={24} color="#d97706" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  MySQL Database & Server Configuration
                </h3>
              </div>

              <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.55, marginBottom: '20px' }}>
                This web application connects directly to MySQL using credentials stored in your <code>.env</code> file.
                If MySQL is temporarily offline, the platform seamlessly runs on in-memory storage with zero downtime.
              </p>

              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  padding: '16px',
                  fontFamily: 'monospace',
                  fontSize: '0.84rem',
                  color: '#0f172a',
                  lineHeight: 1.7,
                  marginBottom: '20px'
                }}
              >
                <div>DB_HOST = localhost</div>
                <div>DB_PORT = 3306</div>
                <div>DB_USER = root</div>
                <div>DB_NAME = salon_sofa_repair</div>
                <div>ADMIN_USERNAME = admin</div>
                <div>ADMIN_PASSWORD = admin123</div>
                <div>SCHEMA_FILE = lib/schema.sql (Ready for phpMyAdmin)</div>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href="/lib/schema.sql"
                  download
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '9px 18px' }}
                >
                  📥 Download schema.sql for phpMyAdmin
                </a>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
