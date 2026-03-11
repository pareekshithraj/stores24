"use client";


import { useMemo, useState } from "react";
import Link from "next/link";
import Stores24Shell from "@/components/stores24/Stores24Shell";
import { getLastSaleId, readStores24Data } from "@/lib/stores24/storage";
import type { SaleItem } from "@/lib/stores24/types";

function asCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value);
}

export default function Stores24PrintBillPage() {
  const [data] = useState(() => readStores24Data());
  const [saleId] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    const params = new URLSearchParams(window.location.search);
    return params.get("saleId") || getLastSaleId() || "";
  });

  const sale = useMemo(() => {
    if (!saleId) {
      return null;
    }
    return data.sales.find((entry) => entry.id === saleId) || null;
  }, [data.sales, saleId]);

  const items = useMemo<SaleItem[]>(() => {
    if (!saleId) {
      return [];
    }
    return data.sales_items.filter((entry) => entry.sale_id === saleId);
  }, [data.sales_items, saleId]);

  const billTotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.qty * item.price + item.gst, 0);
  }, [items]);

  return (
    <Stores24Shell title="Print Bill">
      <section style={{ maxWidth: "700px", margin: "0 auto", background: "white", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "1rem" }}>
        {!sale ? (
          <div>
            <p style={{ marginTop: 0 }}>No bill found. Complete a POS sale first.</p>
            <Link href="/stores24/pos">Go to POS</Link>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <h2 style={{ margin: "0 0 0.25rem", fontSize: "1.35rem" }}>{data.settings.storeName || "Stores24"}</h2>
              <div style={{ fontSize: "0.9rem", color: "#64748b" }}>GST Invoice</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Bill ID: {sale.id}</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b" }}>{new Date(sale.date).toLocaleString()}</div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>
                  <th style={{ padding: "0.45rem" }}>Item</th>
                  <th style={{ padding: "0.45rem" }}>Qty</th>
                  <th style={{ padding: "0.45rem" }}>Price</th>
                  <th style={{ padding: "0.45rem" }}>GST</th>
                  <th style={{ padding: "0.45rem" }}>Line Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "0.45rem" }}>{item.name}</td>
                    <td style={{ padding: "0.45rem" }}>{item.qty}</td>
                    <td style={{ padding: "0.45rem" }}>{asCurrency(item.price)}</td>
                    <td style={{ padding: "0.45rem" }}>{asCurrency(item.gst)}</td>
                    <td style={{ padding: "0.45rem", fontWeight: 700 }}>{asCurrency(item.qty * item.price + item.gst)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: "0.9rem", borderTop: "1px dashed #cbd5e1", paddingTop: "0.7rem", fontSize: "0.92rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Subtotal</span><span>{asCurrency(sale.total)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>GST</span><span>{asCurrency(sale.gst)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.35rem", fontWeight: 800 }}><span>Grand Total</span><span>{asCurrency(sale.grandTotal || billTotal)}</span></div>
            </div>

            <div style={{ marginTop: "1rem", display: "flex", gap: "0.6rem" }}>
              <button type="button" onClick={() => window.print()} style={{ border: "none", background: "#1d4ed8", color: "white", borderRadius: "8px", padding: "0.65rem 0.8rem", fontWeight: 700, cursor: "pointer" }}>
                Print Bill
              </button>
              <Link href="/stores24/pos" style={{ border: "1px solid #cbd5e1", borderRadius: "8px", padding: "0.6rem 0.8rem", textDecoration: "none", color: "#0f172a", fontWeight: 600 }}>
                Back to POS
              </Link>
            </div>
          </>
        )}
      </section>
    </Stores24Shell>
  );
}

