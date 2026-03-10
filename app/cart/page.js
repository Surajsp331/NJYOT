"use client";

import { useCart } from "@/lib/cart-context";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const shippingThreshold = 999;
  const isFreeShipping = cartTotal >= shippingThreshold;
  const remainingForFreeShipping = shippingThreshold - cartTotal;

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Hero */}
      <div className="bg-charcoal text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Your Cart</h1>
          <p className="text-gray-300">{cart.length} item{cart.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
            <Link href="/shop" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.variant}-${index}`}
                  className="bg-white rounded-2xl p-6 shadow-sm flex gap-6"
                >
                  {/* Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                    {item.emoji}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-heading font-semibold text-lg text-charcoal hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        {item.variant && (
                          <p className="text-sm text-gray-500">{item.variant}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.variant)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-lg">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
                <h2 className="font-heading text-xl font-bold mb-6">Order Summary</h2>

                {/* Free Shipping Progress */}
                {!isFreeShipping && (
                  <div className="bg-primary/10 rounded-lg p-4 mb-6">
                    <p className="text-sm text-primary font-medium mb-2">
                      Add ₹{remainingForFreeShipping} more for FREE shipping!
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${(cartTotal / shippingThreshold) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {isFreeShipping && (
                  <div className="bg-green-100 rounded-lg p-4 mb-6">
                    <p className="text-green-700 font-medium">
                      🎉 You have unlocked FREE shipping!
                    </p>
                  </div>
                )}

                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{isFreeShipping ? "FREE" : "₹99"}</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg">₹{cartTotal + (isFreeShipping ? 0 : 99)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full btn-primary mt-6">
                  Proceed to Checkout
                </button>

                {/* Trust badges */}
                <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                  <span>🛡️ Secure</span>
                  <span>↩️ 30-Day Returns</span>
                  <span>✓ Nickel-Free</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
