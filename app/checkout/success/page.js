"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart after successful order
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✓</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-charcoal mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your order! We have sent a confirmation email with your order details.
        </p>
        <div className="space-y-4">
          <Link href="/shop" className="btn-primary block">
            Continue Shopping
          </Link>
          <Link href="/" className="block text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
