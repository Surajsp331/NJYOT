"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import Link from "next/link";

export default function AdminProductsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const isAdmin = localStorage.getItem("njyot-admin-auth");
        if (isAdmin !== "true") {
            router.push("/admin/login");
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) return null;

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-offwhite flex">
            {/* Sidebar - Reusing styles from dashboard */}
            <aside className="w-64 bg-charcoal text-white flex flex-col p-8 hidden md:flex h-screen sticky top-0">
                <div className="mb-12">
                    <Link href="/admin/dashboard" className="font-heading text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
                        NJYOT<span className="text-secondary">.</span>
                    </Link>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-2">Vault Manager</p>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-all">
                        <span>📊</span> Dashboard
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-sm font-bold text-secondary">
                        <span>💎</span> Products
                    </Link>
                    <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-all">
                        <span>📦</span> Orders
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-all">
                        <span>⚙️</span> Settings
                    </Link>
                </nav>

                <button
                    onClick={() => { localStorage.removeItem("njyot-admin-auth"); router.push("/admin/login"); }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 rounded-xl text-sm font-bold text-red-400 transition-all mt-auto"
                >
                    <span>🚪</span> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-12">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="font-heading text-3xl font-bold text-charcoal">Boutique Inventory</h1>
                        <p className="text-gray-400 text-sm mt-1">Manage your world-class jewelry collections.</p>
                    </div>
                    <Link href="/admin/products/new" className="px-8 py-4 bg-charcoal text-white rounded-full font-bold uppercase tracking-widest text-[10px] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3">
                        <span className="text-secondary text-lg">+</span> Add New Piece
                    </Link>
                </header>

                {/* Filters & Search */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                        <input
                            type="text"
                            placeholder="Search pieces/categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-14 bg-white border border-gray-100 rounded-2xl px-14 text-sm focus:outline-none focus:border-secondary transition-all shadow-sm"
                        />
                    </div>
                    <div className="flex gap-4">
                        <select className="h-14 bg-white border border-gray-100 rounded-2xl px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 shadow-sm outline-none focus:border-secondary">
                            <option>All Categories</option>
                            <option>Earrings</option>
                            <option>Necklaces</option>
                            <option>Rings</option>
                        </select>
                        <button className="h-14 w-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-sm hover:bg-gray-50">
                            <span>⚡</span>
                        </button>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-gray-100">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Product</th>
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Category</th>
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Price</th>
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Inventory</th>
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Status</th>
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredProducts.map((p) => (
                                <tr key={p.id} className="hover:bg-offwhite/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-offwhite rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                                {p.emoji || "💍"}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-charcoal">{p.name}</p>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{p.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">{p.category}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-charcoal">₹{p.price.toLocaleString("en-IN")}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${p.stock < 10 ? 'bg-orange-500' : 'bg-secondary'}`}
                                                    style={{ width: `${Math.min(100, (p.stock / 50) * 100)}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-[10px] font-bold text-charcoal">{p.stock}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${p.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            {p.stock > 0 ? 'Active' : 'Sold Out'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-100" title="Edit">✏️</button>
                                            <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-100" title="Hide">👁️</button>
                                            <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-400" title="Delete">🗑️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <span className="text-4xl mb-4 block">🔍</span>
                            <p className="text-gray-400 font-heading text-lg">No pieces found matching your search.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
