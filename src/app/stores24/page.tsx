"use client";

import React from 'react';
import Reveal from '@/components/Reveal';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Boxes,
  CreditCard,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
  Users,
  CheckCircle2,
} from 'lucide-react';

const posModules = [
  { title: "Fast Barcode Billing", desc: "Scan items, search by name, and edit quantity on a high-speed cashier interface.", icon: <ShoppingCart size={28} /> },
  { title: "Auto GST & Discounts", desc: "Automatic tax calculation, percentage discounts, and real-time total updates.", icon: <BarChart3 size={28} /> },
  { title: "Thermal Printing", desc: "Built-in support for generating bills on standard receipt printers instantaneously.", icon: <Store size={28} /> },
  { title: "Multiple Payments", desc: "Accept and track payments flexibly using Cash, UPI, and Counter Cards.", icon: <CreditCard size={28} /> },
];

const erpModules = [
  { title: "Product Management", desc: "Catalog setup with barcodes, pricing, and exact GST percentage controls.", icon: <Boxes size={28} /> },
  { title: "Live Inventory", desc: "Automatic stock deduction upon sale and low-stock threshold visibility.", icon: <CheckCircle2 size={28} /> },
  { title: "Sales Insights", desc: "Generate daily and monthly revenue reports to track top-performing items.", icon: <BarChart3 size={28} /> },
  { title: "Staff & Suppliers", desc: "Role-aware cashier logins and purchase tracking from regional suppliers.", icon: <Users size={28} /> },
];

const trustStats = [
  { label: "Counter-ready in", value: "< 10 min" },
  { label: "Core modules", value: "10" },
  { label: "Billing flow", value: "Realtime" },
  { label: "Print support", value: "Built-in" },
];

export default function Stores24HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column' }}>

      {/* Hero Section */}
      <section className="product-hero-section" style={{ position: 'relative', overflow: 'hidden', padding: '10rem 2rem 8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Modern Rich Background Effects */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 0%, var(--accent-light) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(220, 38, 38, 0.05) 0%, transparent 50%)', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(var(--border-main) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3, zIndex: 0 }} />

        <div className="product-hero-content text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <Reveal delay={0.2} width="100%">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: 700, marginBottom: '2.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', backdropFilter: 'blur(12px)', border: '1px solid var(--accent-light)', color: 'var(--accent)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}></span>
              Next-Gen POS & ERP
            </div>

            <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '2rem', color: 'var(--text-primary)' }}>
              Modern Retail Ops,<br />
              Built To <span style={{ background: 'linear-gradient(135deg, var(--accent), #f43f5e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', paddingRight: '0.1em' }}>Convert More Sales</span>
            </h1>

            <p className="product-hero-desc" style={{ marginInline: 'auto', textAlign: 'center', fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '750px', marginBottom: '3rem', lineHeight: 1.6 }}>
              BlueVolt POS gives supermarket owners complete control from billing counters to stock movement and daily revenue analytics. Replace fragmented tools with one high-speed platform your cashiers and managers can trust.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/stores24/login" className="btn-launch" style={{ padding: '1.1rem 2.5rem', fontSize: '1.05rem', boxShadow: '0 10px 25px rgba(37,99,235,0.2)' }}>
                Launch Platform <ArrowRight size={18} />
              </Link>
              <Link href="/stores24/dashboard" style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)', padding: '1.1rem 2.5rem', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontWeight: 600, transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }} className="hover-card">
                View Dashboard
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust Stats & Live Bill Experience */}
      <section style={{ padding: '6rem 2rem', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="product-split-section" style={{ maxWidth: '1200px', margin: '0 auto', gap: '4rem', alignItems: 'center' }}>
          <Reveal delay={0.2}>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>High-Speed Counter Operations</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Engineered for speed and reliability, ensuring your queues keep moving even during peak hours. Fully offline-capable billing with real-time cloud sync.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
                {trustStats.map((stat) => (
                  <div key={stat.label} style={{ border: "1px solid var(--border-main)", borderRadius: "var(--radius-md)", padding: "1rem", background: "var(--bg-surface)", boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>{stat.value}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4} width="100%">
            <div style={{ background: 'linear-gradient(145deg, var(--bg-surface) 0%, var(--bg-base) 100%)', border: '1px solid var(--border-subtle)', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', position: 'relative', overflow: 'hidden', maxWidth: '450px', margin: '0 auto', backdropFilter: 'blur(20px)' }}>
              {/* Dynamic Animated Glows */}
              <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', opacity: 0.15, pointerEvents: 'none', mixBlendMode: 'screen' }} />
              <div style={{ position: 'absolute', bottom: '-20%', left: '-20%', width: '300px', height: '300px', background: 'radial-gradient(circle, #f43f5e 0%, transparent 70%)', opacity: 0.1, pointerEvents: 'none', mixBlendMode: 'screen' }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} /> Live System
                </div>
                <div style={{ padding: '0.2rem 0.6rem', background: 'var(--accent-light)', color: 'var(--accent)', fontSize: '0.7rem', fontWeight: 700, borderRadius: '4px' }}>POS-01</div>
              </div>

              {/* Receipt Wrapper */}
              <div style={{ background: "white", borderRadius: "12px", padding: "1.75rem", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.95rem", lineHeight: 1.8, color: "#1e293b", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", position: 'relative' }}>
                {/* Header inside receipt */}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem', borderBottom: '2px dashed #cbd5e1', paddingBottom: '1rem' }}>
                  <Store size={28} color="#0f172a" style={{ margin: '0 auto 0.5rem' }} />
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#0f172a' }}>SUPERMARKET24</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Tax Invoice</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: '#334155', marginBottom: '0.5rem', fontSize: '0.85rem' }}><span>Item</span><span>Amount</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Rice 5kg</span><span style={{ fontWeight: 600 }}>₹450</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Milk 2</span><span style={{ fontWeight: 600 }}>₹120</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Sugar 1kg</span><span style={{ fontWeight: 600 }}>₹50</span></div>

                <div style={{ borderTop: "2px solid #e2e8f0", marginTop: "1.2rem", paddingTop: "1rem" }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: "#64748b", fontSize: '0.9rem' }}><span>Subtotal</span><span>₹620</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: "#64748b", fontSize: '0.9rem' }}><span>CGST/SGST (5%)</span><span>₹20</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: "#0f172a", fontWeight: 900, fontSize: "1.2rem", marginTop: "0.75rem" }}><span>Total Paid</span><span>₹640</span></div>
                </div>
              </div>

              {/* Payment Methods */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginTop: "1.5rem" }}>
                {[
                  { label: "Cash", icon: <CreditCard size={16} /> },
                  { label: "UPI Code", icon: <Store size={16} /> },
                  { label: "Tap Card", icon: <CreditCard size={16} /> },
                ].map((pay, i) => (
                  <div key={pay.label} style={{ background: i === 1 ? 'var(--accent)' : 'var(--bg-base)', border: `1px solid ${i === 1 ? 'var(--accent)' : 'var(--border-subtle)'}`, color: i === 1 ? 'white' : 'var(--text-secondary)', borderRadius: "var(--radius-md)", fontSize: "0.8rem", padding: "0.75rem 0.5rem", display: "flex", flexDirection: "column", gap: "0.3rem", alignItems: "center", justifyContent: "center", fontWeight: 700, transition: 'all 0.2s', cursor: 'pointer' }} className="hover-card">
                    {pay.icon}
                    {pay.label}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Comprehensive Modules Grid */}
      <section id="modules" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal delay={0.2} width="100%">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Complete Retail Management</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                A powerful two-part system giving cashiers high-speed reliability and owners full administrative control.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3} width="100%">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Store size={24} color="var(--accent)" /> 1. POS Billing Screen (Counter Operations)
            </h3>
          </Reveal>
          <div className="product-features-grid" style={{ marginBottom: '4rem' }}>
            {posModules.map((module, idx) => (
              <Reveal delay={0.2 + (idx * 0.1)} key={idx} width="100%">
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderTop: '2px solid var(--border-main)', padding: '2rem', borderRadius: 'var(--radius-lg)', height: '100%', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', alignItems: 'flex-start', gap: '1.5rem', position: 'relative', overflow: 'hidden' }} className="hover-card glossy-card">
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0, transition: 'opacity 0.3s' }} className="card-top-glow" />
                  <div style={{ width: '60px', height: '60px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'inset 0 0 0 1px rgba(37,99,235,0.2)' }}>
                    {module.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.6rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{module.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>{module.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} width="100%">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={24} color="var(--accent)" /> 2. ERP Admin Dashboard (Owner Operations)
            </h3>
          </Reveal>
          <div className="product-features-grid">
            {erpModules.map((module, idx) => (
              <Reveal delay={0.2 + (idx * 0.1)} key={idx} width="100%">
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderTop: '2px solid var(--border-main)', padding: '2rem', borderRadius: 'var(--radius-lg)', height: '100%', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', alignItems: 'flex-start', gap: '1.5rem', position: 'relative', overflow: 'hidden' }} className="hover-card glossy-card">
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0, transition: 'opacity 0.3s' }} className="card-top-glow" />
                  <div style={{ width: '60px', height: '60px', background: 'var(--bg-base)', color: 'var(--text-primary)', borderRadius: '14px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {module.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.6rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{module.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>{module.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '6rem 2rem', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Reveal delay={0.2} width="100%">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Ready to run your store on one system?</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2rem' }}>
              Start billing in minutes, then expand into inventory, reports, and supplier workflows without changing platforms.
            </p>

            <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", color: "var(--text-primary)", fontSize: "1rem", marginBottom: "3rem" }}>
              {[
                "GST-ready billing",
                "Stock deduction on sale",
                "Daily revenue tracking",
              ].map((point) => (
                <span key={point} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontWeight: 500 }}>
                  <CheckCircle2 size={18} color="var(--accent)" /> {point}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link href="/stores24/login" style={{ display: 'inline-flex', background: 'var(--accent)', color: 'white', borderRadius: 'var(--radius-md)', padding: '1rem 3rem', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none', boxShadow: 'var(--shadow-md)', transition: 'transform 0.2s', margin: '0 auto' }}>
                Get Started Now
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
