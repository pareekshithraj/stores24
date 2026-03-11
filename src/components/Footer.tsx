import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Mail, Globe } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="contact" className="footer-section">
            <div className="footer-container">

                {/* Main Footer Grid */}
                <div className="footer-grid">

                    {/* Brand Column */}
                    <div>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', marginBottom: '1.5rem' }}>
                            <Image src="/Assets/BlueVolt.png" alt="BlueVolt Logo" width={32} height={32} style={{ objectFit: 'contain' }} unoptimized />
                            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>BlueVolt</span>
                        </Link>
                        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '350px' }}>
                            Powering the digital transformation of global education through an interconnected ecosystem of administration, orchestration, and operational software.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a
                                href="https://www.linkedin.com/company/bluevolt-groups"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#94a3b8', transition: 'color 0.2s' }}
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="mailto:contact@bluevolt.in"
                                style={{ color: '#94a3b8', transition: 'color 0.2s' }}
                                aria-label="Email"
                            >
                                <Mail size={20} />
                            </a>
                            <a
                                href="/blog"
                                style={{ color: '#94a3b8', transition: 'color 0.2s' }}
                                aria-label="Blog"
                            >
                                <Globe size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Products Column */}
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '1.5rem', fontSize: '1.05rem' }}>Ecosystem</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link href="https://schools24.in" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Schools24</Link></li>
                            <li><Link href="/#ecosystem" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Events 24 <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', background: 'rgba(37,99,235,0.1)', color: 'var(--accent)', borderRadius: '100px', marginLeft: '0.5rem' }}>Beta</span></Link></li>
                            <li><Link href="/lifeos" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Life OS</Link></li>
                            <li><Link href="/vemgalmart" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Vemgal Mart</Link></li>
                        </ul>
                    </div>

                    {/* Solutions Column */}
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '1.5rem', fontSize: '1.05rem' }}>Solutions</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link href="/#about" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Institutional Administration</Link></li>
                            <li><Link href="/#about" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Student Management</Link></li>
                            <li><Link href="/#about" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Event Orchestration</Link></li>
                            <li><Link href="/#about" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Digital Campus Consulting</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '1.5rem', fontSize: '1.05rem' }}>Company</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link href="/about" className="footer-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Company</Link></li>
                            <li><Link href="/about" className="footer-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Leadership</Link></li>
                            <li><Link href="/careers" className="footer-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Careers</Link></li>
                            <li><Link href="/contact" className="footer-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Contact Global Sales</Link></li>
                            <li><a href="mailto:contact@bluevolt.in" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={14} /> contact@bluevolt.in</a></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Legal Bar */}
                <div className="footer-bottom">
                    <div className="footer-bottom-info">
                        <span>&copy; {new Date().getFullYear()} BlueVolt Groups Private Limited. All Rights Reserved.</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}><Globe size={12} /> Global</span>
                    </div>

                    <div className="footer-bottom-links">
                        <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Privacy Policy</Link>
                        <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Terms of Service</Link>
                        <Link href="/cookies" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Cookie Preferences</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
