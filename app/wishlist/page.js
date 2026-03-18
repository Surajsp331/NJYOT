"use client";

import Link from "next/link";
import { useWishlist } from "@/lib/wishlist-context";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] text-secondary font-bold uppercase tracking-[0.5em] mb-4 block">Personal Selection</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary mb-6">Your Wishlist</h1>
          <p className="text-gray-500 max-w-xl mx-auto font-light italic text-lg">
            A curated collection of your most desired LuxeSpark pieces.
          </p>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-t border-gray-100">
            <div className="text-6xl mb-8 opacity-20">💍</div>
            <p className="text-2xl text-primary font-heading mb-8 italic">Your collection is currently empty.</p>
            <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
              Browse The Collection
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
