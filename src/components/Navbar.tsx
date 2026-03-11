"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isStores24 = pathname?.startsWith('/stores24');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Close mobile menu when switching to larger screen
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1100 && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mobileMenuOpen]);

    return (
        <header className={`navbar-fixed ${scrolled ? 'scrolled' : ''}`}>
            {/* Top Utility Bar (Enterprise Standard) */}
            <div className="top-utility-bar">
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Globe size={12} /> Global</span>
                    <Link href="/contact" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Contact Sales</Link>
                </div>
            </div>

            {/* Main Navigation Tier */}
            <div className={`navbar-container-inner ${scrolled ? 'bg-scrolled' : ''}`}>
                <Link href="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <Image src="/Assets/BlueVolt.png" alt="BlueVolt Logo" width={380} height={100} style={{ objectFit: 'contain', height: '100px', width: 'auto' }} priority unoptimized />
                </Link>

                {/* Mobile Menu Toggle Button */}
                <button
                    className="mobile-menu-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={`nav-links-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
                    {!isStores24 && (
                        <div className="nav-links">
                            {/* Platform Ecosystem Dropdown */}
                            <div
                                style={{ position: 'relative' }}
                                onMouseEnter={() => window.innerWidth >= 1100 && setActiveDropdown('ecosystem')}
                                onMouseLeave={() => window.innerWidth >= 1100 && setActiveDropdown(null)}
                                onClick={() => window.innerWidth < 1100 && setActiveDropdown(activeDropdown === 'ecosystem' ? null : 'ecosystem')}
                            >
                                <button
                                    className={`nav-dropdown-btn ${activeDropdown === 'ecosystem' ? 'active' : ''}`}
                                    aria-haspopup="true"
                                    aria-expanded={activeDropdown === 'ecosystem'}
                                >
                                    Platform Ecosystem <ChevronDown size={14} style={{ transform: activeDropdown === 'ecosystem' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                                </button>

                                {/* Dropdown Content */}
                                {activeDropdown === 'ecosystem' && (
                                    <div className="nav-dropdown-menu">
                                        <div className="nav-dropdown-header">Core Products</div>
                                        <a href="https://schools24.in" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                                            <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>Schools24</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Institutional Administration Hub</div>
                                        </a>
                                        <Link href="https://stores24.bluevolt.group" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                                            <div style={{ fontWeight: 600, marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>BlueVolt POS</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Retail POS + ERP</div>
                                        </Link>
                                        <Link href="/#ecosystem" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                                            <div style={{ fontWeight: 600, marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Events 24 <span style={{ fontSize: '0.6rem', padding: '0.1rem 0.3rem', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: '4px' }}>Beta</span></div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Complete Event Orchestration</div>
                                        </Link>

                                        <div className="nav-dropdown-divider" />
                                        <div className="nav-dropdown-header">Foundational</div>

                                        <Link href="/lifeos" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                                            <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>Life OS</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Core Operating System</div>
                                        </Link>
                                        <Link href="/vemgalmart" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                                            <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>Vemgal Mart</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Ecosystem Marketplace</div>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link href="/careers" className="nav-link-corporate" onClick={() => setMobileMenuOpen(false)}>
                                Careers
                            </Link>
                            <Link href="/blog" className="nav-link-corporate" onClick={() => setMobileMenuOpen(false)}>
                                Blog
                            </Link>
                            <Link href="/about" className="nav-link-corporate" onClick={() => setMobileMenuOpen(false)}>
                                About
                            </Link>
                        </div>
                    )}

                    <div className="navbar-actions">
                        {isStores24 ? (
                            <Link href="/stores24/login" className="btn-launch" onClick={() => setMobileMenuOpen(false)}>
                                Sign in to BlueVolt POS
                            </Link>
                        ) : (
                            <Link href="/contact" className="btn-launch" onClick={() => setMobileMenuOpen(false)}>
                                Get Started
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
