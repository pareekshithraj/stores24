"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    FileText,
    Settings,
    LogOut,
    Store,
    Menu,
    X,
    CreditCard
} from 'lucide-react';

export default function ERPDashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navLinks = [
        { name: "Dashboard", href: "/stores24/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Products", href: "/stores24/products", icon: <Package size={20} /> },
        { name: "Inventory", href: "/stores24/inventory", icon: <ShoppingCart size={20} /> },
        { name: "Sales", href: "/stores24/sales", icon: <CreditCard size={20} /> },
        { name: "Purchases", href: "/stores24/purchases", icon: <Store size={20} /> },
        { name: "Suppliers", href: "/stores24/suppliers", icon: <Users size={20} /> },
        { name: "Staff", href: "/stores24/staff", icon: <Users size={20} /> },
        { name: "Reports", href: "/stores24/reports", icon: <FileText size={20} /> },
        { name: "Settings", href: "/stores24/settings", icon: <Settings size={20} /> },
    ];

    return (
        <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-secondary)', overflow: 'hidden' }}>

            {/* Mobile Sidebar Toggle */}
            <div style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 50, display: sidebarOpen ? 'none' : 'block' }}>
                <button onClick={() => setSidebarOpen(true)} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-main)', padding: '0.5rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
                    <Menu size={24} color="var(--text-primary)" />
                </button>
            </div>

            {/* Sidebar */}
            <aside style={{ width: '260px', background: 'var(--bg-surface)', borderRight: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)', position: 'absolute', height: '100%', zIndex: 40 }} className="admin-sidebar">
                <div style={{ padding: '1.5rem 1.5rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                        <span style={{ width: '32px', height: '32px', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', boxShadow: '0 2px 10px rgba(37,99,235,0.3)' }}><Store size={18} /></span>
                        BlueVolt POS
                    </div>
                    <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }} className="lg-hidden">

                    </button>
                </div>

                <nav style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', overflowY: 'auto' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>Management Core</div>

                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: isActive ? 600 : 500,
                                    background: isActive ? 'var(--accent-light)' : 'transparent',
                                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                                    transition: 'all 0.2s',
                                    borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent'
                                }}
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        )
                    })}
                </nav>

                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-main)' }}>
                    <Link href="/stores24" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: '#ef4444', fontWeight: 600, padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = '#fef2f2'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                        <LogOut size={20} /> Exit Admin
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto', background: 'var(--bg-secondary)', marginLeft: sidebarOpen ? '260px' : '0', transition: 'margin-left 0.3s' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    {children}
                </div>
            </main>

            {/* Hide Sidebar hack for layout shift */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @media (max-width: 1024px) {
          main { margin-left: 0 !important; }
          .lg-hidden { display: block !important; }
        }
        @media (min-width: 1025px) {
          .lg-hidden { display: none !important; }
          aside.admin-sidebar { position: static !important; transform: none !important; }
          main { margin-left: 0 !important; } /* flex takes care of it when aside is static */
        }
      `}} />
        </div>
    );
}
