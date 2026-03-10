"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-2xl w-full relative z-10">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-12 md:p-20 text-center shadow-2xl animate-fade-up">
          <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-10 relative">
            <div className="absolute inset-0 bg-secondary rounded-full animate-ping opacity-20"></div>
            <span className="text-4xl">✨</span>
          </div>

          <span className="text-[10px] text-secondary font-bold uppercase tracking-[0.5em] mb-4 block">Gratitude</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">A Masterpiece <br />Is En Route.</h1>
          <div className="w-16 h-1 bg-secondary mx-auto mb-10"></div>

          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            Your selection from NJYOT has been secured. Our curators are now preparing your order for safe passage. A confirmation of your legacy has been sent to your email.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/shop" className="btn-primary w-full py-5">
              Continue Shopping
            </Link>
            <Link href="/" className="px-12 py-5 rounded-full border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-center">
              Return to Manor
            </Link>
          </div>

          <div className="mt-16 pt-12 border-t border-white/5 grid grid-cols-3 gap-8 text-[9px] font-bold text-gray-500 uppercase tracking-widest text-center">
            <div className="space-y-2"><span>📦</span><br />Curating</div>
            <div className="space-y-2"><span>🛡️</span><br />Inspecting</div>
            <div className="space-y-2"><span>✈️</span><br />Dispatch</div>
          </div>
        </div>
      </div>
    </div>
  );
}
