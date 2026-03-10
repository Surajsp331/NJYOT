"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";

export default function QuickShop({ product, isOpen, onClose }) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Product Image */}
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center rounded-t-2xl">
          <span className="text-8xl">{product.emoji}</span>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs text-gray-500 uppercase">{product.category}</p>
              <h3 className="font-heading text-xl font-bold text-charcoal">{product.name}</h3>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-charcoal">₹{product.price}</span>
              {product.originalPrice && (
                <p className="text-sm text-gray-400 line-through">₹{product.originalPrice}</p>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            <div className="flex text-accent text-sm">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < product.rating ? "★" : "☆"}</span>
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
          </div>

          {/* Short description */}
          <p className="text-sm text-gray-600 mb-6">{product.shortDesc}</p>

          {/* Variants */}
          {product.variants && product.variants.length > 1 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Select {product.category === "Rings" ? "Size" : "Option"}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-full border-2 text-sm transition-all ${
                      selectedVariant === variant
                        ? "border-primary bg-primary/10 text-primary font-medium"
                        : "border-gray-200 text-charcoal hover:border-primary"
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-charcoal mb-2">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Stock indicator */}
          {product.stock <= 10 && (
            <p className="text-red-500 text-sm mb-4">
              🔥 Only {product.stock} left in stock!
            </p>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 rounded-full font-medium text-lg transition-all ${
              added
                ? "bg-green-500 text-white"
                : "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl"
            }`}
          >
            {added ? "✓ Added to Cart!" : `Add to Cart — ₹${product.price * quantity}`}
          </button>

          {/* Quick links */}
          <div className="mt-4 text-center">
            <a
              href={`/product/${product.slug}`}
              className="text-sm text-primary hover:underline"
              onClick={onClose}
            >
              View Full Details →
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
