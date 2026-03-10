"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check if already logged in
        const isAdmin = localStorage.getItem("njyot-admin-auth");
        if (isAdmin === "true") {
            router.push("/admin/dashboard");
        }
    }, [router]);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Simple mock authentication
        // Default password: njyotadmin
        if (password === "njyotadmin") {
            setTimeout(() => {
                localStorage.setItem("njyot-admin-auth", "true");
                router.push("/admin/dashboard");
            }, 1000);
        } else {
            setTimeout(() => {
                setError("Invalid administrative credentials.");
                setLoading(false);
            }, 800);
        }
    };

    return (
        <div className="min-h-screen bg-charcoal flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative Orbs */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <span className="text-secondary font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block animate-fade-up">Vault Access</span>
                    <h1 className="font-heading text-4xl text-white font-bold mb-2">NJYOT Admin</h1>
                    <p className="text-gray-400 text-sm">Enter your master key to manage collections.</p>
                </div>

                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
                                Security Key
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-secondary transition-all"
                            />
                        </div>

                        {error && (
                            <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest text-center animate-fade-up">
                                ⚠️ {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-14 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-3 ${loading
                                    ? "bg-white/10 text-white/50 cursor-wait"
                                    : "bg-secondary text-primary hover:scale-[1.02] hover:shadow-2xl hover:shadow-secondary/20 active:scale-95"
                                }`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Authenticating...
                                </>
                            ) : (
                                "Unlock Dashboard"
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-10 text-center">
                    <Link href="/" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                        ← Return to Boutique
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Minimal Link stub since it's not imported in this specific code block
function Link({ href, children, ...props }) {
    return <a href={href} {...props}>{children}</a>;
}
