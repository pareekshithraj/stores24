"use client";

import React, { useState, useEffect } from 'react';
import { Store, Plus, Search, FileText, Loader2, X } from 'lucide-react';
import { getPurchaseOrders, createPurchaseOrder } from '@/app/actions/purchase';
import { getSuppliers } from '@/app/actions/supplier'; // Because we need selecting a supplier

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    po_number: '',
    supplier_id: '',
    items_count: '',
    total_amount: ''
  });

  const loadData = async () => {
    setLoading(true);
    const [poRes, supRes] = await Promise.all([getPurchaseOrders(), getSuppliers()]);

    if (poRes.success && poRes.purchases) {
      setPurchases(poRes.purchases);
    }
    if (supRes.success && supRes.suppliers) {
      setSuppliers(supRes.suppliers);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreatePO = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const poData = {
      po_number: form.po_number,
      supplier_id: parseInt(form.supplier_id),
      items_count: parseInt(form.items_count),
      total_amount: parseFloat(form.total_amount)
    };

    const result = await createPurchaseOrder(poData);
    if (result.success) {
      setIsModalOpen(false);
      setForm({ po_number: '', supplier_id: '', items_count: '', total_amount: '' });
      loadData();
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
            <Store size={28} color="var(--accent)" /> Purchase Orders
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Manage incoming stock shipments and supplier invoices.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="hover-card" style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
          <Plus size={18} /> New Order
        </button>
      </header>

      {/* Toolbar */}
      <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ position: 'relative', width: '300px', maxWidth: '100%' }}>
          <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
          <input
            type="text"
            placeholder="Search PO Number..."
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }}
          />
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto', minHeight: '300px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
              <Loader2 className="animate-spin" size={32} />
              <p style={{ fontWeight: 600 }}>Loading Orders from DB...</p>
            </div>
          ) : purchases.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
              <Store size={48} opacity={0.5} />
              <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>No Purchase Orders found!</p>
              <p>Click "New Order" to create your first PO.</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>PO Number</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Supplier</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Date Created</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Items</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)', textAlign: 'right' }}>Total Cost</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Status</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}></th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((po) => (
                  <tr key={po.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{po.po_number}</td>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{po.supplier?.name || "Unknown"}</td>
                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)' }}>{new Date(po.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)' }}>{po.items_count}</td>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: 'var(--text-primary)', textAlign: 'right' }}>₹{po.total_amount.toLocaleString()}</td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <span style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '2rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: po.status === 'Received' ? '#d1fae5' : '#fef3c7',
                        color: po.status === 'Received' ? '#059669' : '#d97706'
                      }}>
                        {po.status}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 600 }} className="hover-card">
                        <FileText size={16} /> View Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Creation Modal Overlay */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'var(--bg-surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid var(--border-main)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>Create Purchase Order</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={24} /></button>
            </div>

            <form onSubmit={handleCreatePO} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>PO Number</label>
                <input required type="text" value={form.po_number} onChange={e => setForm({ ...form, po_number: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }} placeholder="PO-2026-..." />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Select Supplier</label>
                <select required value={form.supplier_id} onChange={e => setForm({ ...form, supplier_id: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }}>
                  <option value="" disabled>Select a supplier</option>
                  {suppliers.map(sup => (
                    <option key={sup.id} value={sup.id}>{sup.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Items Count</label>
                  <input required type="number" value={form.items_count} onChange={e => setForm({ ...form, items_count: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Cost (₹)</label>
                  <input required type="number" step="0.01" value={form.total_amount} onChange={e => setForm({ ...form, total_amount: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }} />
                </div>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '0.8rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={isSubmitting || suppliers.length === 0} style={{ flex: 1, padding: '0.8rem', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Save Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
