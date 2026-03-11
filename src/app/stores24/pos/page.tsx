"use client";

import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Plus, Minus, X, CreditCard, Store, Printer, Loader2, CheckCircle } from 'lucide-react';
import { getProducts } from '@/app/actions/product';
import { processCheckout } from '@/app/actions/pos';
import { lookupCustomer, registerCustomer } from '@/app/actions/crm';

export default function POSBillingScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [cart, setCart] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'UPI' | 'Cash'>('Card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccessData, setPaymentSuccessData] = useState<{ bill: string, points: number } | null>(null);

  // CRM State
  const [phoneSearch, setPhoneSearch] = useState('');
  const [activeCustomer, setActiveCustomer] = useState<any | null>(null);
  const [isCustomerLoading, setIsCustomerLoading] = useState(false);

  useEffect(() => {
    async function fetchInventory() {
      const res = await getProducts();
      if (res.success && res.products) {
        setProducts(res.products);
      }
      setLoadingProducts(false);
    }
    fetchInventory();
  }, []);

  const addToCart = (product: any) => {
    // If out of stock, optionally block it or warn (for now allow it)
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) => prev.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalGst = cart.reduce((acc, item) => acc + (item.price * item.quantity * (item.gst_percentage / 100)), 0);
  const grandTotal = subtotal + totalGst;

  const handleCollectPayment = async () => {
    if (cart.length === 0) return;
    setIsProcessing(true);

    const payload = {
      paymentMethod,
      totalAmount: grandTotal,
      items: cart.map(item => ({ id: item.id, quantity: item.quantity, price: item.price })),
      customerId: activeCustomer ? activeCustomer.id : undefined
    };

    const result = await processCheckout(payload);

    if (result && result.success) {
      setPaymentSuccessData({ bill: result.billNumber || "N/A", points: result.pointsEarned || 0 });
      setCart([]);
      setActiveCustomer(null);
      setPhoneSearch('');

      // Reload inventory behind the scenes so new stock matches deduction
      getProducts().then(res => { if (res.success) setProducts(res.products || []) });

      // Clear success message after 4 seconds
      setTimeout(() => setPaymentSuccessData(null), 4000);
    } else {
      alert("Billing Error: " + result?.error);
    }

    setIsProcessing(false);
  };

  const handleCustomerLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneSearch.length < 10) return;
    setIsCustomerLoading(true);

    const res = await lookupCustomer(phoneSearch);
    if (res.success && res.customer) {
      setActiveCustomer(res.customer);
    } else {
      // Auto register them as an anonymous customer for this number
      const createRes = await registerCustomer(phoneSearch);
      if (createRes.success && createRes.customer) {
        setActiveCustomer(createRes.customer);
      }
    }
    setIsCustomerLoading(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
      {/* Left: Product Search & Catalog */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1.5rem', borderRight: '1px solid var(--border-main)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Store size={24} color="var(--accent)" /> POS Terminal
        </h2>

        {/* CRM Hookup */}
        <div style={{ marginBottom: '1.5rem', background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-main)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {activeCustomer ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Customer Linked</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>{activeCustomer.phone} • {activeCustomer.total_points} Points</div>
              </div>
              <button onClick={() => { setActiveCustomer(null); setPhoneSearch(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
          ) : (
            <form onSubmit={handleCustomerLookup} style={{ display: 'flex', width: '100%', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Enter Phone Number for Points..."
                value={phoneSearch}
                onChange={e => setPhoneSearch(e.target.value)}
                style={{ flex: 1, padding: '0.75rem 1rem', fontSize: '0.9rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', outline: 'none' }}
              />
              <button type="submit" disabled={isCustomerLoading} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-main)', padding: '0 1rem', borderRadius: 'var(--radius-md)', fontWeight: 600, color: 'var(--text-primary)', cursor: isCustomerLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {isCustomerLoading ? <Loader2 size={16} className="animate-spin" /> : 'Link'}
              </button>
            </form>
          )}
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
          <input
            type="text"
            placeholder="Search products by Name or Barcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', fontSize: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', boxShadow: 'var(--shadow-sm)', outline: 'none' }}
          />
        </div>

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
          {loadingProducts ? (
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: 'var(--text-muted)' }}>
              <Loader2 className="animate-spin" size={32} />
            </div>
          ) : products.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: 'var(--text-muted)', flexDirection: 'column', gap: '1rem' }}>
              <Store size={48} opacity={0.5} />
              <p>No products in database. Add them in the ERP Dashboard first!</p>
            </div>
          ) : products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.barcode.includes(searchQuery)).map((product) => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'left', cursor: product.stock <= 0 ? 'not-allowed' : 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', opacity: product.stock <= 0 ? 0.5 : 1 }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = product.stock > 0 ? 'var(--accent)' : 'var(--border-main)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-main)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{product.name}</span>
                {product.stock <= 0 && <span style={{ fontSize: '0.65rem', background: '#fee2e2', color: '#dc2626', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>Out</span>}
              </div>
              <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '1.1rem' }}>₹{product.price.toFixed(2)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Cart & Billing */}
      <div style={{ width: '400px', background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 15px rgba(0,0,0,0.03)' }}>

        {paymentSuccessData ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem', textAlign: 'center', animation: 'fadeIn 0.3s ease-out' }}>
            <CheckCircle size={64} color="#10b981" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>Payment Successful!</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Transaction successfully securely logged to Neon Database.</p>
            <div style={{ background: 'var(--bg-base)', padding: '1rem', borderRadius: 'var(--radius-md)', width: '100%', fontFamily: 'monospace', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Bill ID: {paymentSuccessData.bill}
            </div>
            {paymentSuccessData.points > 0 && (
              <div style={{ background: '#fef3c7', color: '#d97706', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.9rem', fontWeight: 700, display: 'inline-block' }}>
                🎉 Customer Earned {paymentSuccessData.points} Points!
              </div>
            )}
          </div>
        ) : (
          <>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-base)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShoppingCart size={20} /> Current Bill</h3>
            </div>

            {/* Cart Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
              {cart.length === 0 ? (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                  Scan an item to start billing
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px dashed var(--border-main)' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{item.name}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>₹{item.price.toFixed(2)} each</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-main)', borderRadius: '6px', overflow: 'hidden' }}>
                          <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '0.25rem', background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer' }}><Minus size={16} /></button>
                          <span style={{ padding: '0 0.75rem', fontSize: '0.9rem', fontWeight: 600 }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '0.25rem', background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer' }}><Plus size={16} /></button>
                        </div>
                        <button onClick={() => removeItem(item.id)} style={{ padding: '0.25rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><X size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Totals & Payment */}
            <div style={{ padding: '1.5rem', background: 'var(--bg-base)', borderTop: '1px solid var(--border-main)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                <span>GST Amount</span>
                <span>₹{totalGst.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                <span>Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                {['Card', 'UPI', 'Cash'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method as any)}
                    style={{ padding: '0.8rem', background: paymentMethod === method ? 'var(--accent-light)' : 'var(--bg-secondary)', border: `1px solid ${paymentMethod === method ? 'var(--accent)' : 'var(--border-main)'}`, color: paymentMethod === method ? 'var(--accent)' : 'var(--text-primary)', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {method === 'Card' ? <CreditCard size={16} /> : <Store size={16} />}
                    {method}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCollectPayment}
                disabled={cart.length === 0 || isProcessing}
                style={{ width: '100%', padding: '1.25rem', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: '1.1rem', cursor: (cart.length === 0 || isProcessing) ? 'not-allowed' : 'pointer', opacity: (cart.length === 0 || isProcessing) ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: 'var(--shadow-md)', transition: 'transform 0.2s' }}
                onMouseDown={(e) => { if (cart.length > 0) e.currentTarget.style.transform = 'scale(0.98)' }}
                onMouseUp={(e) => { if (cart.length > 0) e.currentTarget.style.transform = 'scale(1)' }}
              >
                {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <><Printer size={20} /> Collect ₹{grandTotal.toFixed(2)}</>}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
