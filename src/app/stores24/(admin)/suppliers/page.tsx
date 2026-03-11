"use client";

import React, { useState, useEffect } from 'react';
import { Users, Search, Mail, Phone, ExternalLink, Plus, Loader2, X } from 'lucide-react';
import { getSuppliers, createSupplier } from '@/app/actions/supplier';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    contact: '',
    phone: '',
    email: '',
    category: ''
  });

  const loadSuppliers = async () => {
    setLoading(true);
    const result = await getSuppliers();
    if (result.success && result.suppliers) {
      setSuppliers(result.suppliers);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleCreateSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await createSupplier(form);
    if (result.success) {
      setIsModalOpen(false);
      setForm({ name: '', contact: '', phone: '', email: '', category: '' });
      loadSuppliers();
    } else {
      alert("Error: " + result.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Users size={28} color="var(--accent)" /> Supplier Directory
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Manage vendor contacts and procurement relationships.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="hover-card" style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
          <Plus size={18} /> Add Supplier
        </button>
      </header>

      {/* Toolbar */}
      <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ position: 'relative', width: '300px', maxWidth: '100%' }}>
          <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
          <input
            type="text"
            placeholder="Search suppliers..."
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
          <Loader2 className="animate-spin" size={32} />
          <p style={{ fontWeight: 600 }}>Loading Suppliers from DB...</p>
        </div>
      ) : suppliers.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
          <Users size={48} opacity={0.5} />
          <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>No suppliers found!</p>
          <p>Click "Add Supplier" to register your first partner.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {suppliers.map((supplier) => (
            <div key={supplier.id} style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '1.25rem', opacity: supplier.active ? 1 : 0.6 }} className="hover-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{supplier.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600, background: 'var(--accent-light)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{supplier.category}</span>
                </div>
                {!supplier.active && (
                  <span style={{ fontSize: '0.7rem', color: '#dc2626', fontWeight: 800, background: '#fee2e2', padding: '0.2rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase' }}>Inactive</span>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={16} color="var(--text-muted)" /> {supplier.contact}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={16} color="var(--text-muted)" /> {supplier.phone}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16} color="var(--text-muted)" /> {supplier.email}</div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <button style={{ flex: 1, padding: '0.6rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-sm)', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }} className="hover-card">
                  Edit Profile
                </button>
                <button style={{ flex: 1, padding: '0.6rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-sm)', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }} className="hover-card">
                  <ExternalLink size={16} /> History
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Creation Modal Overlay */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'var(--bg-surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid var(--border-main)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>Add New Supplier</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={24} /></button>
            </div>

            <form onSubmit={handleCreateSupplier} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Company Name</label>
                <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Contact Person</label>
                <input required type="text" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Phone</label>
                  <input required type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Email</label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Category</label>
                <input required type="text" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }} />
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '0.8rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={isSubmitting} style={{ flex: 1, padding: '0.8rem', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Save Supplier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
