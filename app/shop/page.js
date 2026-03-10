"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import QuickShopModal from "@/components/QuickShopModal";
import { products, categories } from "@/data/products";
import Link from "next/link";

export default function ShopAllPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickShop = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-offwhite">
      <QuickShopModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Hero */}
      <div className="bg-charcoal text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-[10px] text-secondary font-bold uppercase tracking-[0.4em] mb-4 block animate-fade-up">Collection</span>
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">Shop All</h1>
          <div className="w-12 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            From everyday studs to celebration chandeliers — discover pieces crafted for those who command attention.
          </p>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-100 bg-white">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/shop"
            className="px-8 py-3 rounded-full bg-charcoal text-white text-xs font-bold uppercase tracking-widest shadow-xl"
          >
            All Pieces
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.id}`}
              className="px-8 py-3 rounded-full border border-gray-100 text-charcoal hover:border-secondary hover:text-secondary transition-all text-xs font-bold uppercase tracking-widest whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onQuickShop={handleQuickShop} />
          ))}
        </div>
      </div>
    </div>
  );
}
