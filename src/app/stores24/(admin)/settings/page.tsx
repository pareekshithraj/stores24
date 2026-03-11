"use client";

import React from 'react';
import { Settings, Save, MapPin, Building, Printer, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
      <header>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Settings size={28} color="var(--accent)" /> System Settings
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Configure store details, styling, and tax defaults.</p>
      </header>

      <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-main)', boxShadow: 'var(--shadow-md)', overflow: 'hidden' }}>

        {/* Store Profile */}
        <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building size={20} color="var(--text-muted)" /> Store Profile
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Store Name</label>
              <input type="text" defaultValue="Supermarket24 Main Brach" style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>GSTIN Number</label>
              <input type="text" defaultValue="29ABCDE1234F1Z5" style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> Store Address (Prints on Receipt)</label>
              <textarea defaultValue="123 Retail Avenue, Tech Park Building, Bengaluru 560001" rows={3} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none', resize: 'vertical' }} />
            </div>
          </div>
        </div>

        {/* POS Options */}
        <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Printer size={20} color="var(--text-muted)" /> POS & Print Preferences
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--accent)' }} />
              <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Auto-print receipt on transaction completion</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--accent)' }} />
              <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Include GST Breakdown matrix on thermal prints</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--accent)' }} />
              <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Enable dark mode for POS terminal automatically</span>
            </label>
          </div>
        </div>

        {/* Tax Defaults */}
        <div style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CreditCard size={20} color="var(--text-muted)" /> Default Tax Settings
          </h2>
          <div style={{ width: '50%' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Default GST % (When creating new products)</label>
            <select defaultValue="5%" style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }}>
              <option value="0%">0% (Exempt)</option>
              <option value="5%">5%</option>
              <option value="12%">12%</option>
              <option value="18%">18%</option>
              <option value="28%">28%</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div style={{ padding: '1.5rem 2rem', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-main)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button style={{ background: 'transparent', color: 'var(--text-secondary)', border: 'none', padding: '0.8rem 1.5rem', fontWeight: 600, cursor: 'pointer', borderRadius: 'var(--radius-md)' }} className="hover-card">
            Discard Changes
          </button>
          <button style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: 'var(--radius-md)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s' }}>
            <Save size={18} /> Save Preferences
          </button>
        </div>

      </div>
    </div>
  );
}
