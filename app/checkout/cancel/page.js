"use client";

import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>

      <div className="max-w-xl w-full relative z-10">
        <div className="bg-white rounded-[4rem] p-12 md:p-20 text-center shadow-xl border border-gray-50 animate-fade-up">
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-10">
            <span className="text-4xl text-orange-400 italic font-heading">!</span>
          </div>

          <span className="text-[10px] text-primary font-bold uppercase tracking-[0.5em] mb-4 block">Paused</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-6">A Moment&apos;s <br />Interruption.</h1>
          <div className="w-16 h-1 bg-primary mx-auto mb-10 opacity-20"></div>

          <p className="text-gray-500 text-lg leading-relaxed mb-12">
            The transaction was not finalized. Your selections remain safe in your cart, waiting for the perfect moment.
          </p>

          <div className="flex flex-col gap-4">
            <Link href="/cart" className="btn-primary w-full py-5">
              Return to Shopping Bag
            </Link>
            <Link href="/shop" className="px-12 py-5 rounded-full border border-gray-100 text-charcoal text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all text-center">
              Revisit The Collections
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
