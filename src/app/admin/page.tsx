'use client';

import { useState, useEffect, useCallback } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'craft' | 'clothing' | 'accessory';
  emoji: string;
  stock: number;
}

const BLANK: Omit<Product, 'id'> = {
  name: '', description: '', price: 0, image: '', category: 'craft', emoji: '', stock: 100,
};

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Omit<Product, 'id'>>(BLANK);
  const [newData, setNewData] = useState<Omit<Product, 'id'>>(BLANK);
  const [addingNew, setAddingNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const storedPw = () =>
    typeof window !== 'undefined' ? sessionStorage.getItem('blou_admin_pw') || '' : '';

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchProducts = useCallback(async (pw: string) => {
    setLoading(true);
    const res = await fetch('/api/admin/products', {
      headers: { 'x-admin-password': pw },
    });
    setLoading(false);
    if (!res.ok) return false;
    setProducts(await res.json());
    return true;
  }, []);

  useEffect(() => {
    const pw = storedPw();
    if (pw) {
      fetchProducts(pw).then((ok) => {
        if (ok) setAuthed(true);
      });
    }
  }, [fetchProducts]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError('');
    const ok = await fetchProducts(password);
    if (ok) {
      sessionStorage.setItem('blou_admin_pw', password);
      setAuthed(true);
    } else {
      setAuthError('Wrong password. Try again!');
    }
  }

  function logout() {
    sessionStorage.removeItem('blou_admin_pw');
    setAuthed(false);
    setProducts([]);
    setPassword('');
  }

  async function saveEdit(id: string) {
    setSaving(true);
    const res = await fetch('/api/admin/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': storedPw() },
      body: JSON.stringify({ id, ...editData }),
    });
    setSaving(false);
    if (!res.ok) { showToast('❌ Save failed'); return; }
    setProducts(products.map((p) => (p.id === id ? { id, ...editData } : p)));
    setEditId(null);
    showToast('✅ Product updated!');
  }

  async function deleteProduct(id: string) {
    if (!confirm('Delete this product?')) return;
    const res = await fetch('/api/admin/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': storedPw() },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) { showToast('❌ Delete failed'); return; }
    setProducts(products.filter((p) => p.id !== id));
    showToast('🗑️ Product deleted');
  }

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const id = 'p' + Date.now();
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': storedPw() },
      body: JSON.stringify({ id, ...newData }),
    });
    setSaving(false);
    if (!res.ok) { showToast('❌ Add failed'); return; }
    const created = await res.json();
    setProducts([...products, created]);
    setNewData(BLANK);
    setAddingNew(false);
    showToast('✅ Product added!');
  }

  const CATEGORIES = ['craft', 'clothing', 'accessory'] as const;
  const catColour = { craft: 'bg-purple-100 text-purple-700', clothing: 'bg-yellow-100 text-yellow-700', accessory: 'bg-pink-100 text-pink-700' };

  // ── LOGIN SCREEN ──────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-sm text-center">
          <div className="text-6xl mb-4">🐄</div>
          <h1 className="text-2xl font-black text-blue-900 mb-1">Bloucowlait Admin</h1>
          <p className="text-gray-400 text-sm mb-8">Enter your admin password to continue</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-sky-200 rounded-xl px-4 py-3 text-center text-lg font-bold focus:outline-none focus:border-sky-400"
              autoFocus
            />
            {authError && <p className="text-red-500 text-sm font-bold">{authError}</p>}
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-white font-black text-lg py-3 rounded-xl transition-all"
            >
              Sign in →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── ADMIN PANEL ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 bg-blue-900 text-white px-5 py-3 rounded-xl shadow-xl z-50 font-bold text-sm animate-bounce">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🐄</span>
          <div>
            <h1 className="font-black text-lg leading-none">Bloucowlait Admin</h1>
            <p className="text-blue-300 text-xs">{products.length} products</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="text-blue-300 hover:text-white text-sm transition-colors">
            View site →
          </a>
          <button
            onClick={logout}
            className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Products Table */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-blue-900">Products</h2>
          <button
            onClick={() => { setAddingNew(true); setEditId(null); }}
            className="bg-sky-500 hover:bg-sky-600 text-white font-black px-5 py-2 rounded-xl text-sm transition-all shadow"
          >
            + Add Product
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-400 py-20">Loading…</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Stock</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <>
                    <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{p.emoji}</span>
                          <div>
                            <div className="font-bold text-gray-800">{p.name}</div>
                            <div className="text-gray-400 text-xs line-clamp-1">{p.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${catColour[p.category]}`}>
                          {p.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-pink-500">
                        ${(p.price / 100).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{p.stock}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => { setEditId(p.id); setEditData({ name: p.name, description: p.description, price: p.price, image: p.image, category: p.category, emoji: p.emoji, stock: p.stock }); setAddingNew(false); }}
                          className="text-blue-600 hover:text-blue-800 font-bold mr-4 transition-colors"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="text-red-400 hover:text-red-600 font-bold transition-colors"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>

                    {/* Inline edit row */}
                    {editId === p.id && (
                      <tr key={`edit-${p.id}`} className="bg-sky-50 border-b-2 border-sky-200">
                        <td colSpan={5} className="px-4 py-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                            <div>
                              <label className="text-xs font-bold text-gray-500 block mb-1">Name</label>
                              <input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-gray-500 block mb-1">Emoji</label>
                              <input value={editData.emoji} onChange={(e) => setEditData({ ...editData, emoji: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" maxLength={4} />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-gray-500 block mb-1">Price ($)</label>
                              <input type="number" step="0.01" value={(editData.price / 100).toFixed(2)} onChange={(e) => setEditData({ ...editData, price: Math.round(parseFloat(e.target.value) * 100) })} className="w-full border rounded-lg px-3 py-2 text-sm" />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-gray-500 block mb-1">Stock</label>
                              <input type="number" value={editData.stock} onChange={(e) => setEditData({ ...editData, stock: parseInt(e.target.value) })} className="w-full border rounded-lg px-3 py-2 text-sm" />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-gray-500 block mb-1">Category</label>
                              <select value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value as Product['category'] })} className="w-full border rounded-lg px-3 py-2 text-sm">
                                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </div>
                            <div className="md:col-span-3">
                              <label className="text-xs font-bold text-gray-500 block mb-1">Description</label>
                              <textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} rows={2} className="w-full border rounded-lg px-3 py-2 text-sm resize-none" />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => saveEdit(p.id)} disabled={saving} className="bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-2 rounded-lg text-sm transition-all disabled:opacity-50">
                              {saving ? 'Saving…' : '💾 Save'}
                            </button>
                            <button onClick={() => setEditId(null)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold px-4 py-2 rounded-lg text-sm transition-all">
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add New Product Form */}
        {addingNew && (
          <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-black text-blue-900 text-lg mb-4">➕ New Product</h3>
            <form onSubmit={addProduct}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Name *</label>
                  <input required value={newData.name} onChange={(e) => setNewData({ ...newData, name: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="e.g. Cow Print Mug" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Emoji *</label>
                  <input required value={newData.emoji} onChange={(e) => setNewData({ ...newData, emoji: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="☕" maxLength={4} />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Price ($) *</label>
                  <input required type="number" step="0.01" min="0" value={newData.price ? (newData.price / 100).toFixed(2) : ''} onChange={(e) => setNewData({ ...newData, price: Math.round(parseFloat(e.target.value) * 100) })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="5.00" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Stock *</label>
                  <input required type="number" min="0" value={newData.stock || ''} onChange={(e) => setNewData({ ...newData, stock: parseInt(e.target.value) })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="100" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Category *</label>
                  <select required value={newData.category} onChange={(e) => setNewData({ ...newData, category: e.target.value as Product['category'] })} className="w-full border rounded-lg px-3 py-2 text-sm">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Image path</label>
                  <input value={newData.image} onChange={(e) => setNewData({ ...newData, image: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="/products/mug.jpg" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 block mb-1">Description *</label>
                  <textarea required value={newData.description} onChange={(e) => setNewData({ ...newData, description: e.target.value })} rows={2} className="w-full border rounded-lg px-3 py-2 text-sm resize-none" placeholder="Describe the product…" />
                </div>
              </div>
              <div className="flex gap-2">
                <button type="submit" disabled={saving} className="bg-sky-500 hover:bg-sky-600 text-white font-black px-6 py-2 rounded-xl text-sm transition-all disabled:opacity-50 shadow">
                  {saving ? 'Adding…' : '✅ Add Product'}
                </button>
                <button type="button" onClick={() => setAddingNew(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold px-4 py-2 rounded-xl text-sm transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
