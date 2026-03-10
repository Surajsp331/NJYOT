"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isAdmin = localStorage.getItem("njyot-admin-auth");
        if (isAdmin !== "true") {
            router.push("/admin/login");
        } else {
            setLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("njyot-admin-auth");
        router.push("/admin/login");
    };

    if (loading) return null;

    const stats = [
        { label: "Total Revenue", value: "₹1,24,500", change: "+12.5%", icon: "💰" },
        { label: "Active Orders", value: "18", change: "4 pending", icon: "📦" },
        { label: "Inventory Pieces", value: "342", change: "5 low stock", icon: "💎" },
        { label: "Store Visits", value: "2.4k", change: "+18%", icon: "✨" },
    ];

    return (
        <div className="min-h-screen bg-offwhite flex">
            {/* Sidebar */}
            <aside className="w-64 bg-charcoal text-white flex flex-col p-8 hidden md:flex">
                <div className="mb-12">
                    <h2 className="font-heading text-2xl font-bold tracking-tighter">NJYOT<span className="text-secondary">.</span></h2>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-2">Admin Panel</p>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-sm font-bold text-secondary">
                        <span>📊</span> Dashboard
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-all">
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
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 rounded-xl text-sm font-bold text-red-400 transition-all mt-auto"
                >
                    <span>🚪</span> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="font-heading text-3xl font-bold text-charcoal">Control Center</h1>
                        <p className="text-gray-400 text-sm mt-1">Gilding your business with intelligence.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">🔔</button>
                        <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center font-bold">A</div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-2xl h-12 w-12 bg-offwhite rounded-2xl flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                                    {stat.icon}
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${stat.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
                            <p className="text-2xl font-bold text-charcoal">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Activity / Action Cards */}
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-heading text-xl font-bold text-charcoal">Recent Inventory</h3>
                            <Link href="/admin/products" className="text-[10px] font-bold uppercase tracking-widest text-secondary border-b-2 border-secondary/20 pb-1">View All</Link>
                        </div>

                        <div className="space-y-4">
                            {/* Mock recent products */}
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex items-center justify-between p-4 hover:bg-offwhite rounded-2xl transition-colors border border-transparent hover:border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl">💍</div>
                                        <div>
                                            <h4 className="text-sm font-bold text-charcoal">Celestial Ring Set</h4>
                                            <p className="text-[10px] text-gray-400">SKU: NJ-CR-00{item}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-charcoal">₹1,299</p>
                                        <p className="text-[10px] text-green-500 font-bold uppercase">In Stock</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-charcoal rounded-[3rem] p-8 shadow-2xl relative overflow-hidden text-white flex flex-col">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <h3 className="font-heading text-xl font-bold mb-6 relative z-10">Quick Actions</h3>
                        <div className="space-y-4 flex-1 relative z-10">
                            <Link href="/admin/products/new" className="block w-full py-4 text-center rounded-2xl bg-secondary text-primary font-bold text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-transform">
                                + Add Piece
                            </Link>
                            <button className="w-full py-4 text-center rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                                Generate Report
                            </button>
                            <button className="w-full py-4 text-center rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                                Manage Coupes
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-8">System Status: <span className="text-green-500 font-bold uppercase">Operational</span></p>
                    </div>
                </div>
            </main>
        </div>
    );
}
