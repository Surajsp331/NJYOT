"use client";

import Link from "next/link";
import QuickShop from "./QuickShop";
import { useWishlist } from "@/lib/wishlist-context";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [showQuickShop, setShowQuickShop] = useState(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isLiked = isInWishlist?.(product?.id) ?? false;
  
  const rating = product?.rating || 5;
  const starsArray = Array(5).fill(false).map((_, i) => i < Math.floor(rating));

  const toggleWishlist = (e) => {
    e.preventDefault();
    if (isLiked) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  if (!product) return null;

  return (
    <>
      <div className="group flex flex-col bg-white rounded-sm border border-gray-100 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden relative w-full animate-fade-up h-full">
        
        {/* Image Area - Light Grey Background */}
        <div className="relative aspect-square bg-[#F9F9F9] w-full overflow-hidden block">
           <Link href={`/product/${product.slug}`} className="w-full h-full block">
              {product.images?.[0] ? (
                <>
                  <img
                    src={product.images[0]}
                    alt={product.title || product.name || 'Product'}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out p-6"
                  />
                  {product.images[1] && (
                    <img
                      src={product.images[1]}
                      alt={product.title || product.name || 'Product'}
                      className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out p-6 bg-[#F9F9F9]"
                    />
                  )}
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">No Image</span>
                </div>
              )}
           </Link>

          {/* Solid Red Badges */}
          {product.badge && (
            <div className={`absolute top-3 left-3 px-3 py-1 font-bold text-[10px] uppercase tracking-wider rounded-sm z-10 ${
              product.badge.toLowerCase() === 'sale' || product.badge.toLowerCase() === 'premium'
                ? "bg-secondary text-white"
                : "bg-black text-white"
            }`}>
              {product.badge}
            </div>
          )}

          {/* Quick Actions overlay sliding from bottom */}
          <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowQuickShop(true);
              }}
              className="flex-1 bg-black text-white text-[11px] font-bold uppercase tracking-wider py-3 hover:bg-secondary transition-colors shadow-sm rounded-sm"
            >
              Add To Cart
            </button>
            <button
               onClick={toggleWishlist}
               className={`w-11 h-11 bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm rounded-sm ${isLiked ? 'text-secondary' : 'text-black'}`}
               aria-label="Wishlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          
        </div>

        {/* Product Details - Clean White Background */}
        <div className="p-5 flex flex-col flex-1 bg-white text-center items-center">
          
          <Link href={`/product/${product.slug}`} className="block mb-1 w-full">
            <h3 className="font-heading font-medium text-[15px] text-gray-600 line-clamp-2 hover:text-black transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 my-2 justify-center">
             <div className="flex text-[#EECE4A] text-sm">
              {starsArray.map((filled, i) => (
                <span key={i}>{filled ? "★" : "☆"}</span>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mt-auto flex items-end justify-center gap-3">
             <span className="font-black text-lg text-black">Rs. {product.price?.toLocaleString("en-IN")}</span>
             {product.originalPrice && (
               <span className="text-sm text-gray-400 line-through font-medium translate-y-[-2px]">Rs. {product.originalPrice.toLocaleString("en-IN")}</span>
             )}
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
