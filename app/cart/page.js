"use client";

import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  const shippingThreshold = 999;
  const isFreeShipping = cartTotal >= shippingThreshold;
  const remainingForFreeShipping = shippingThreshold - cartTotal;
  const progressPercent = Math.min(100, (cartTotal / shippingThreshold) * 100);

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/cart`,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL returned:", data);
        alert("Failed to proceed to secure checkout.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-offwhite pb-24">
      {/* Hero */}
      <div className="bg-[#f9f9f9] border-b border-gray-200 py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-[10px] text-secondary font-bold uppercase tracking-[0.4em] mb-4 block animate-fade-up">Bag</span>
          <h1 className="font-heading text-4xl md:text-6xl font-black text-black mb-4">Your Selection</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        {cart.length === 0 ? (
          <div className="bg-white rounded-md p-24 text-center border border-gray-200 shadow-sm">
             <span className="text-6xl mb-8 block">🛒</span>
             <p className="font-heading text-2xl font-bold text-black mb-8">Your cart is currently empty.</p>
             <Link href="/shop" className="bg-primary text-black font-bold uppercase tracking-widest text-xs px-8 py-4 hover:bg-black hover:text-white transition-colors inline-block">
               Continue Shopping
             </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.variant}-${index}`}
                  className="bg-white p-6 shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-6 items-center sm:items-stretch"
                >
                  {/* Image/Emoji */}
                  <div className="w-24 h-24 bg-[#f9f9f9] flex items-center justify-center text-4xl flex-shrink-0 border border-gray-200">
                    {item.emoji}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between w-full">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-heading font-bold text-lg text-black hover:text-secondary transition-colors"
                        >
                          {item.name}
                        </Link>
                        {item.variant && (
                          <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                            Variant: {item.variant}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.variant)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 transition-colors"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center h-10 border border-gray-200 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                          className="w-10 h-full flex items-center justify-center hover:bg-gray-100 transition-colors text-black font-bold"
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-sm font-bold text-black">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                          className="w-10 h-full flex items-center justify-center hover:bg-gray-100 transition-colors text-black font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-lg text-black">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#f9f9f9] p-8 border border-gray-200 sticky top-32">
                <h2 className="font-heading text-xl font-black text-black mb-8 uppercase tracking-wider">Order Summary</h2>

                {/* Free Shipping Progress */}
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      {isFreeShipping ? "Shipping Status" : `₹${remainingForFreeShipping.toLocaleString("en-IN")} Away from Free Delivery`}
                    </p>
                    <span className="text-[10px] font-bold text-black">{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ease-out ${isFreeShipping ? 'bg-black' : 'bg-primary'}`}
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  {isFreeShipping && (
                    <p className="text-[10px] text-black font-bold uppercase tracking-wider mt-2 flex items-center gap-1">
                      <span>✓</span> Free Standard Delivery Unlocked
                    </p>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm font-medium">Subtotal</span>
                    <span className="font-bold text-black">₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm font-medium">Standard Shipping</span>
                    <span className="font-bold text-secondary">
                      {isFreeShipping ? "Free" : "₹99"}
                    </span>
                  </div>
                  <div className="pt-6 border-t border-gray-200 flex justify-between items-end">
                    <div>
                        <span className="font-bold text-xl text-black">Total</span>
                    </div>
                    <span className="font-black text-2xl text-black">₹{(cartTotal + (isFreeShipping ? 0 : 99)).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-secondary text-white font-bold uppercase tracking-widest text-xs hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? "Processing..." : "Secure Checkout"}
                </button>

                {/* Trust indications */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  <div className="flex justify-between"><span>SSL Encrypted</span> <span>✓</span></div>
                  <div className="flex justify-between"><span>Secure Payment</span> <span>✓</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
