"use client";

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  PackageSearch,
  ShoppingCart,
  Users,
  Loader2
} from 'lucide-react';
import { getDashboardStats } from '@/app/actions/dashboard';

export default function ERPDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenue: 0,
    bills: 0,
    lowStock: 0,
    cashiers: 0
  });
  const [recentSales, setRecentSales] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getDashboardStats();
      if (data.success && data.stats) {
        setStats(data.stats);
        if (data.recentSales) setRecentSales(data.recentSales);
      }
      setLoading(false);
    }
    loadData();

    // Auto-refresh every 30 seconds to simulate real-time POS syncing
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    { title: "Today's Revenue", value: `₹${stats.revenue.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`, icon: <TrendingUp size={24} />, color: "#10b981", bg: "#d1fae5" },
    { title: "Total Bills Today", value: stats.bills, icon: <ShoppingCart size={24} />, color: "#3b82f6", bg: "#dbeafe" },
    { title: "Low Stock Items", value: stats.lowStock, icon: <PackageSearch size={24} />, color: "#f59e0b", bg: "#fef3c7" },
    { title: "Active Cashiers", value: stats.cashiers, icon: <Users size={24} />, color: "#8b5cf6", bg: "#ede9fe" },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Welcome back, Admin. Here's your supermarket performance at a glance.</p>
      </header>

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {loading ? (
          [1, 2, 3, 4].map(i => (
            <div key={i} style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '1.5rem', boxShadow: 'var(--shadow-sm)', opacity: 0.5 }}>
              <Loader2 className="animate-spin" size={24} /> Loading...
            </div>
          ))
        ) : (
          statCards.map((stat, idx) => (
            <div key={idx} style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.25rem' }}>{stat.title}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{stat.value}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Placeholder for Main Graph */}
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={20} color="var(--accent)" /> Revenue vs Stock Velocity
          </h2>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-main)', color: 'var(--text-muted)' }}>
            [Analytics Chart Component Renders Here]
          </div>
        </div>

        {/* Real-time sync stream */}
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Live POS Feed
            {loading && <Loader2 className="animate-spin" size={16} color="var(--text-muted)" />}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            {recentSales.length === 0 && !loading ? (
              <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>No sales recorded yet.</div>
            ) : (
              recentSales.map((log, idx) => (
                <div key={log.id} style={{ display: 'flex', gap: '1rem', borderBottom: idx === 4 ? 'none' : '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', minWidth: '60px', paddingTop: '0.2rem' }}>{log.time}</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    Bill {log.billNumber} - <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>₹{log.amount.toFixed(2)}</span> <span style={{ fontSize: '0.8rem' }}>({log.method})</span>
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
