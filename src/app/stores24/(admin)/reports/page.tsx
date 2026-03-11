"use client";

import React, { useState } from 'react';
import { FileText, Download, BarChart2, PieChart, TrendingUp, Filter, Loader2 } from 'lucide-react';
import { getFinancialReport, getStockValuationReport, getLowStockReport, getTaxReport } from '@/app/actions/reports';

export default function ReportsPage() {
  const [downloadingIdx, setDownloadingIdx] = useState<number | null>(null);

  const reports = [
    { title: "Daily Sales Report", description: "Comprehensive breakdown of today's sales, payment methods, and GST collected.", icon: <BarChart2 size={24} />, category: "Financial", action: getFinancialReport },
    { title: "Inventory Valuation", description: "Current value of all stock on hand, categorized by product types.", icon: <PieChart size={24} />, category: "Stock", action: getStockValuationReport },
    { title: "Low Stock Critical", description: "List of all items currently below their defined alert thresholds.", icon: <TrendingUp size={24} />, category: "Stock", action: getLowStockReport },
    { title: "GST Liability (Monthly)", description: "Total tax collected pending remittance to the government for the current month.", icon: <FileText size={24} />, category: "Tax", action: getTaxReport },
  ];

  const handleDownload = async (idx: number, actionFunc: any, fileName: string) => {
    setDownloadingIdx(idx);
    try {
      const response = await actionFunc();

      if (response.success && response.data && response.data.length > 0) {
        // Convert JSON to CSV
        const headers = Object.keys(response.data[0]).join(',');
        const rows = response.data.map((row: any) => Object.values(row).map(val => `"${val}"`).join(','));
        const csvContent = [headers, ...rows].join('\n');

        // Trigger DL blob
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `${fileName.replace(/ /g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("No data available for this report.");
      }
    } catch (error) {
      alert("Failed to generate report.");
    }
    setDownloadingIdx(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText size={28} color="var(--accent)" /> Detailed Reports
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Generate and export real-time Data CSV reports for your accounting.</p>
        </div>
      </header>

      {/* Toolbar */}
      <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button style={{ padding: '0.75rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <Filter size={18} /> Financial
        </button>
        <button style={{ padding: '0.75rem 1rem', background: 'transparent', border: '1px solid transparent', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer' }}>Stock</button>
        <button style={{ padding: '0.75rem 1rem', background: 'transparent', border: '1px solid transparent', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer' }}>Tax</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {reports.map((report, idx) => (
          <div key={idx} style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '1rem' }} className="hover-card">
            <div style={{ width: '48px', height: '48px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {report.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{report.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, minHeight: '3rem' }}>{report.description}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>

              <button
                onClick={() => handleDownload(idx, report.action, report.title)}
                disabled={downloadingIdx === idx}
                style={{ flex: 1, padding: '0.85rem', background: 'var(--accent)', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: downloadingIdx === idx ? 'not-allowed' : 'pointer', boxShadow: 'var(--shadow-sm)', opacity: downloadingIdx === idx ? 0.7 : 1 }}>
                {downloadingIdx === idx ? <Loader2 size={18} className="animate-spin" /> : <><Download size={18} /> Download CSV</>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
