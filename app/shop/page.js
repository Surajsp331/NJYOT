"use client";

import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import Link from "next/link";

export default function ShopAllPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero / Header */}
      <div className="bg-[#f9f9f9] border-b border-gray-200 pt-[150px] pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-black text-black mb-4">Shop All <span className="text-secondary">Jewelry</span></h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm">
            Explore our complete collection of elegant, timeless, and perfectly crafted pieces designed to elevate your everyday.
          </p>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start border-b border-gray-100 pb-6">
          <Link
            href="/shop"
            className="px-6 py-2 bg-primary text-black text-sm font-bold uppercase tracking-wider"
          >
            All Pieces
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.id}`}
              className="px-6 py-2 border border-gray-200 text-gray-500 hover:border-black hover:text-black transition-colors text-sm font-bold uppercase tracking-wider whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
