"use client";

import React, { useState, useEffect } from 'react';
import { CreditCard, Search, Calendar as CalendarIcon, Download, Info, Loader2 } from 'lucide-react';
import { getSalesHistory } from '@/app/actions/sales';

export default function SalesPage() {
  const [sales, setSales] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalToday: 0,
    upiTotal: 0,
    cashTotal: 0,
    cardTotal: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      const result = await getSalesHistory();
      if (result.success && result.sales && result.stats) {
        setSales(result.sales);
        setStats(result.stats);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredSales = sales.filter(s =>
    s.billNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CreditCard size={28} color="var(--accent)" /> Sales Ledger
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>View individual receipts, refunds, and daily totals mapped from Neon Database.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-main)', padding: '0.8rem 1.25rem', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }} className="hover-card">
            <CalendarIcon size={18} /> Today
          </button>
          <button style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-main)', padding: '0.8rem 1.25rem', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }} className="hover-card">
            <Download size={18} /> Export CSV
          </button>
        </div>
      </header>

      {/* Stats Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', borderTop: '4px solid var(--text-primary)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.25rem' }}>Total Sales (Today)</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>₹{stats.totalToday.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</div>
        </div>
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', borderTop: '4px solid #10b981', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.25rem' }}>UPI Payments</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>₹{stats.upiTotal.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</div>
        </div>
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', borderTop: '4px solid #f59e0b', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.25rem' }}>Cash Payments</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>₹{stats.cashTotal.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</div>
        </div>
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', borderTop: '4px solid #3b82f6', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.25rem' }}>Card Payments</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>₹{stats.cardTotal.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ position: 'relative', width: '300px', maxWidth: '100%' }}>
          <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
          <input
            type="text"
            placeholder="Search by Bill #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }}
          />
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto', minHeight: '300px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
              <Loader2 className="animate-spin" size={32} />
              <p style={{ fontWeight: 600 }}>Loading Ledger from Neon...</p>
            </div>
          ) : filteredSales.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
              <CreditCard size={48} opacity={0.5} />
              <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>No sales found.</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Bill #</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Time</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Unique Items</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Method</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Status</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)', textAlign: 'right' }}>Amount</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale) => (
                  <tr key={sale.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{sale.billNumber}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{sale.time}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{sale.items}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{sale.method}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '2rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: sale.status === 'Completed' ? '#d1fae5' : '#fee2e2',
                        color: sale.status === 'Completed' ? '#059669' : '#dc2626'
                      }}>
                        {sale.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 800, color: 'var(--text-primary)', textAlign: 'right' }}>
                      <span style={{ textDecoration: sale.status === 'Refunded' ? 'line-through' : 'none', opacity: sale.status === 'Refunded' ? 0.5 : 1 }}>
                        ₹{sale.amount.toFixed(2)}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 600 }} className="hover-card">
                        <Info size={16} /> Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
