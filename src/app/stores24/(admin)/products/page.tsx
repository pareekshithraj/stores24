"use client";

import React, { useState, useEffect } from 'react';
import { PackageSearch, Search, Plus, MoreHorizontal, Edit, Trash, X, Loader2 } from 'lucide-react';
import { getProducts, createProduct, deleteProduct } from '@/app/actions/product';

export default function ProductsManagementPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Product Form State
  const [form, setForm] = useState({
    name: '',
    barcode: '',
    price: '',
    gst_percentage: '5',
    stock: ''
  });

  const loadProducts = async () => {
    setLoading(true);
    const result = await getProducts();
    if (result.success && result.products) {
      setProducts(result.products);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Convert strings to numbers for Prisma
    const productData = {
      name: form.name,
      barcode: form.barcode,
      price: parseFloat(form.price),
      gst_percentage: parseFloat(form.gst_percentage),
      stock: parseInt(form.stock)
    };

    const result = await createProduct(productData);

    if (result.success) {
      setIsModalOpen(false);
      setForm({ name: '', barcode: '', price: '', gst_percentage: '5', stock: '' });
      loadProducts();
    } else {
      alert("Error: " + result.error);
    }
    setIsSubmitting(false);
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <PackageSearch size={28} color="var(--accent)" /> Product Catalog
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Manage inventory, pricing, and barcodes directly on Neon Database.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="hover-card" style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s' }}>
          <Plus size={18} /> Add Product
        </button>
      </header>

      {/* Toolbar */}
      <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ position: 'relative', width: '350px', maxWidth: '100%' }}>
          <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
          <input
            type="text"
            placeholder="Search products by name or barcode..."
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }}
          />
        </div>
      </div>

      {/* Data Table */}
      <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto', minHeight: '300px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
              <Loader2 className="animate-spin" size={32} />
              <p style={{ fontWeight: 600 }}>Loading Products from Neon Database...</p>
            </div>
          ) : products.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
              <PackageSearch size={48} opacity={0.5} />
              <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>No products found!</p>
              <p>Click "Add Product" to create your first item.</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Product Name</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Barcode</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Price</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>GST</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Stock</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)' }}>Status</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border-main)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const status = product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock';

                  return (
                    <tr key={product.id} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>{product.name}</td>
                      <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '0.9rem' }}>{product.barcode}</td>
                      <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-primary)', fontWeight: 600 }}>₹{product.price.toFixed(2)}</td>
                      <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)' }}>{product.gst_percentage}%</td>
                      <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-primary)', fontWeight: 600 }}>{product.stock}</td>
                      <td style={{ padding: '1.25rem 1.5rem' }}>
                        <span style={{
                          padding: '0.35rem 0.75rem',
                          borderRadius: '2rem',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          background: status === 'In Stock' ? '#d1fae5' : status === 'Low Stock' ? '#fef3c7' : '#fee2e2',
                          color: status === 'In Stock' ? '#059669' : status === 'Low Stock' ? '#d97706' : '#dc2626'
                        }}>
                          {status}
                        </span>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button onClick={() => handleDeleteProduct(product.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '0.4rem', borderRadius: '4px', transition: 'background 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.color = '#ef4444' }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' }}><Trash size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
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
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={24} /></button>
            </div>

            <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Product Name</label>
                <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Organic Cow Milk 2L" style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Scan Barcode</label>
                <input required type="text" value={form.barcode} onChange={e => setForm({ ...form, barcode: e.target.value })} placeholder="0123456789" style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Price (₹)</label>
                  <input required type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="0.00" style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Stock Quantity</label>
                  <input required type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} placeholder="0" style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Applicable GST</label>
                <select value={form.gst_percentage} onChange={e => setForm({ ...form, gst_percentage: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none', cursor: 'pointer' }}>
                  <option value="0">0% (Exempt)</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '0.8rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={isSubmitting} style={{ flex: 1, padding: '0.8rem', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
