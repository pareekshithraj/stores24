"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, AlertTriangle, ArrowUpDown, History, Loader2, PackageSearch } from 'lucide-react';
import { getInventoryData } from '@/app/actions/inventory';

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState('stock');
  const [loading, setLoading] = useState(true);

  const [stockAlerts, setStockAlerts] = useState<any[]>([]);
  const [recentHistory, setRecentHistory] = useState<any[]>([]);

  useEffect(() => {
    async function fetchInventory() {
      const data = await getInventoryData();
      if (data.success && data.stockAlerts && data.recentHistory) {
        setStockAlerts(data.stockAlerts);
        setRecentHistory(data.recentHistory);
      }
      setLoading(false);
    }
    fetchInventory();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShoppingCart size={28} color="var(--accent)" /> Live Inventory
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Monitor real-time stock levels and track automated checkout deductions.</p>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border-main)' }}>
        <button
          onClick={() => setActiveTab('stock')}
          style={{ padding: '0.75rem 0', fontWeight: 600, fontSize: '1.05rem', color: activeTab === 'stock' ? 'var(--accent)' : 'var(--text-secondary)', borderBottom: activeTab === 'stock' ? '2px solid var(--accent)' : '2px solid transparent', background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
        >
          <AlertTriangle size={18} /> Stock Alerts
        </button>
        <button
          onClick={() => setActiveTab('history')}
          style={{ padding: '0.75rem 0', fontWeight: 600, fontSize: '1.05rem', color: activeTab === 'history' ? 'var(--accent)' : 'var(--text-secondary)', borderBottom: activeTab === 'history' ? '2px solid var(--accent)' : '2px solid transparent', background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
        >
          <History size={18} /> Movement History
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
          <Loader2 className="animate-spin" size={32} />
          <p style={{ fontWeight: 600 }}>Loading live inventory from Neon Database...</p>
        </div>
      ) : activeTab === 'stock' ? (
        stockAlerts.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
            <AlertTriangle size={48} opacity={0.3} color="var(--text-muted)" />
            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>No active stock alerts!</p>
            <p>All items have sufficient inventory quantities.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {stockAlerts.map((alert) => (
              <div key={alert.id} style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-main)', borderLeft: `4px solid ${alert.status === 'Depleted' ? '#ef4444' : alert.status === 'Critical' ? '#f97316' : '#f59e0b'}`, boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '1rem' }} className="hover-card glossy-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{alert.name}</h3>
                  <span style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: '2rem',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    background: alert.status === 'Depleted' ? '#fee2e2' : alert.status === 'Critical' ? '#ffedd5' : '#fef3c7',
                    color: alert.status === 'Depleted' ? '#dc2626' : alert.status === 'Critical' ? '#c2410c' : '#d97706'
                  }}>
                    {alert.status}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Current Stock</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{alert.current}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Threshold</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-muted)' }}>{alert.threshold}</div>
                  </div>
                </div>
                <button style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-base)'} onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}>
                  Create Purchase Order
                </button>
              </div>
            ))}
          </div>
        )
      ) : activeTab === 'history' ? (
        recentHistory.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
            <History size={48} opacity={0.3} color="var(--text-muted)" />
            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>No movement history yet.</p>
            <p>Perform sales in the POS to see auto-deductions.</p>
          </div>
        ) : (
          <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Direction</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Product Name</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Qty Out</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Reason</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>User</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentHistory.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.35rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700,
                          background: item.type === 'IN' ? '#d1fae5' : '#fee2e2',
                          color: item.type === 'IN' ? '#059669' : '#dc2626'
                        }}>
                          <ArrowUpDown size={14} style={{ transform: item.type === 'IN' ? 'rotate(180deg)' : 'none' }} /> {item.type}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.product}</td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{item.qty}</td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.reason}</td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.user}</td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}
