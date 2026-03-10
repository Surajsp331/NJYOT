"use client";

import { useState } from "react";
import Link from "next/link";
import QuickShop from "./QuickShop";

export default function ProductCard({ product }) {
  const [showQuickShop, setShowQuickShop] = useState(false);

  // Convert rating to array of stars
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(product.rating));

  return (
    <>
      <div className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Image Gallery / Hero Image */}
        <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] bg-offwhite w-full overflow-hidden block">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-5xl bg-gradient-to-br from-primary/10 to-accent/10">
              {product.emoji || "💍"}
            </div>
          )}

          {/* Badges */}
          {product.badge && (
            <div className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold tracking-wider rounded-full shadow-sm ${
              product.isDemo
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse"
                : "bg-accent text-charcoal"
            }`}>
              {product.badge}
            </div>
          )}

          {/* Low Stock Badge */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 px-3 py-1 text-xs font-semibold tracking-wider text-white rounded-full shadow-sm">
              Only {product.stock} left!
            </div>
          )}
        </Link>

        {/* Product Info */}
        <div className="p-5 flex flex-col flex-1">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-accent text-sm">
              {stars.map((filled, i) => (
                <span key={i}>{filled ? "★" : "☆"}</span>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.reviewsCount || product.reviews || 0})</span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block mb-1">
            <h3 className="font-heading font-semibold text-lg text-charcoal truncate hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-sm text-gray-500 mb-4 line-clamp-1">{product.shortDesc}</p>

          {/* Price & Action */}
          <div className="mt-auto flex items-center justify-between">
            <div>
              <span className="font-bold text-lg text-charcoal">₹{product.price.toLocaleString("en-IN")}</span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
              )}
            </div>
            <div className="flex gap-2">
              {/* Quick Shop Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowQuickShop(true);
                }}
                className="h-10 px-4 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shadow-sm text-sm font-medium"
              >
                Quick Shop
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Shop Modal */}
      <QuickShop
        product={product}
        isOpen={showQuickShop}
        onClose={() => setShowQuickShop(false)}
      />
    </>
  );
}
