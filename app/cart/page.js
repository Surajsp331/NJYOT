"use client";

import { useCart } from "@/lib/cart-context";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const shippingThreshold = 999;
  const isFreeShipping = cartTotal >= shippingThreshold;
  const remainingForFreeShipping = shippingThreshold - cartTotal;
  const progressPercent = Math.min(100, (cartTotal / shippingThreshold) * 100);

  return (
    <div className="min-h-screen bg-offwhite pb-24">
      {/* Hero */}
      <div className="bg-charcoal text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-[10px] text-secondary font-bold uppercase tracking-[0.4em] mb-4 block animate-fade-up">Bag</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">Your Selection</h1>
          <div className="w-12 h-1 bg-secondary mx-auto"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {cart.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-24 text-center shadow-xl border border-gray-100">
            <span className="text-6xl mb-8 block">✨</span>
            <p className="font-heading text-2xl text-charcoal mb-8">Your collection is currently empty.</p>
            <Link href="/shop" className="btn-primary inline-flex">
              Explore The Boutique
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.variant}-${index}`}
                  className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 flex flex-col sm:flex-row gap-8 hover:shadow-xl transition-all"
                >
                  {/* Image/Emoji */}
                  <div className="w-32 h-32 bg-offwhite rounded-[2rem] flex items-center justify-center text-5xl flex-shrink-0 border border-gray-100 shadow-inner">
                    {item.emoji}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-heading font-bold text-xl text-charcoal hover:text-secondary transition-colors"
                        >
                          {item.name}
                        </Link>
                        {item.variant && (
                          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                            Selected: {item.variant}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.variant)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <div className="flex items-center h-12 bg-offwhite rounded-full px-4 shadow-inner">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition-colors font-bold"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition-colors font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-xl text-charcoal tracking-tight">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-charcoal rounded-[3rem] p-10 shadow-2xl sticky top-32 text-white border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                <h2 className="font-heading text-2xl font-bold mb-8 relative z-10">Boutique Summary</h2>

                {/* Free Shipping Progress */}
                <div className="mb-10 relative z-10">
                  <div className="flex justify-between items-end mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      {isFreeShipping ? "Shipping Status" : `₹${remainingForFreeShipping.toLocaleString("en-IN")} To Complimentary Delivery`}
                    </p>
                    <span className="text-[10px] font-bold text-secondary uppercase">{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ease-out rounded-full ${isFreeShipping ? 'bg-green-400' : 'bg-secondary'}`}
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  {isFreeShipping && (
                    <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                      <span>✨</span> Complimentary Express Shipping Applied
                    </p>
                  )}
                </div>

                <div className="space-y-4 mb-10 relative z-10">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm font-medium">Subtotal</span>
                    <span className="font-bold">₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm font-medium">Luxe Delivery</span>
                    <span className="font-bold text-secondary">
                      {isFreeShipping ? "Complimentary" : "₹99"}
                    </span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] block mb-1">Total Pieces</span>
                      <span className="font-bold text-3xl">₹{(cartTotal + (isFreeShipping ? 0 : 99)).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full py-5 rounded-full bg-secondary text-primary font-bold uppercase tracking-[0.2em] text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-secondary/20 relative z-10">
                  Proceed To Secure Vault
                </button>

                {/* Trust indications */}
                <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-4 text-[9px] font-bold uppercase tracking-widest text-gray-600 relative z-10">
                  <div className="flex items-center gap-2"><span>🛡️</span> SSL Encrypted</div>
                  <div className="flex items-center gap-2"><span>↩️</span> Easy Returns</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
