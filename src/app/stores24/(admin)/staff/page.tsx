"use client";

import React, { useState, useEffect } from 'react';
import { Users, Shield, Plus, Lock, Loader2, X } from 'lucide-react';
import { getStaff, createStaff } from '@/app/actions/staff';

export default function StaffPage() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    username: '',
    role: 'Cashier',
    password: ''
  });

  const loadStaff = async () => {
    setLoading(true);
    const result = await getStaff();
    if (result.success && result.staff) {
      setStaff(result.staff);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await createStaff(form);
    if (result.success) {
      setIsModalOpen(false);
      setForm({ name: '', username: '', role: 'Cashier', password: '' });
      loadStaff();
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
            <Users size={28} color="var(--accent)" /> Staff Management
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Manage cashier and management accounts with RBAC access.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="hover-card" style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
          <Plus size={18} /> Add User
        </button>
      </header>

      <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
            <Loader2 className="animate-spin" size={32} />
            <p style={{ fontWeight: 600 }}>Loading Staff from DB...</p>
          </div>
        ) : staff.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
            <Users size={48} opacity={0.5} />
            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>No staff found!</p>
            <p>Click "Add User" to create the first account.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', minHeight: '300px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Name</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Username</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Role</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Status</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{user.name}</td>
                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{user.username}</td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600,
                        background: user.role === 'Administrator' ? 'var(--accent-light)' : 'var(--bg-secondary)',
                        color: user.role === 'Administrator' ? 'var(--accent)' : 'var(--text-primary)'
                      }}>
                        {user.role === 'Administrator' ? <Shield size={14} /> : null} {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <span style={{
                        padding: '0.3rem 0.6rem',
                        borderRadius: '2rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: user.status === 'Active' ? '#d1fae5' : '#f1f5f9',
                        color: user.status === 'Active' ? '#059669' : '#64748b'
                      }}>
                        {user.status}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                      <button style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-main)', color: 'var(--text-primary)', padding: '0.5rem 0.75rem', borderRadius: '4px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }} className="hover-card">
                        <Lock size={14} /> Reset Password
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Creation Modal Overlay */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'var(--bg-surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid var(--border-main)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>Add Staff Member</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={24} /></button>
            </div>

            <form onSubmit={handleCreateStaff} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Full Name</label>
                <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Username</label>
                <input required type="text" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Role</label>
                <select required value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }}>
                  <option value="Cashier">Cashier</option>
                  <option value="Inventory Manager">Inventory Manager</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Password</label>
                <input required type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }} />
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '0.8rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={isSubmitting} style={{ flex: 1, padding: '0.8rem', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Save Staff'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
