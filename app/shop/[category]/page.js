"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import QuickShopModal from "@/components/QuickShopModal";
import { getProductsByCategory, categories } from "@/data/products";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function CategoryPage({ params }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickShop = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const category = categories.find(c => c.id === params.category);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(params.category);

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
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">{category.name}</h1>
          <div className="w-12 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {params.category === 'earrings' && "From everyday studs to celebration chandeliers — find your signature pair."}
            {params.category === 'necklaces' && "Elegant necklaces handcrafted for those who command attention."}
            {params.category === 'rings' && "Statement rings that sparkle and define your unique style."}
            {params.category === 'sets' && "Perfectly matched sets for life's most elevated occasions."}
          </p>
        </div>
      </div>

      {/* Navigation & Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Link href="/shop" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-secondary transition-colors">
            Shop
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-xs font-bold uppercase tracking-widest text-charcoal">{category.name}</span>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="px-6 py-2 rounded-full border border-gray-100 text-charcoal hover:border-secondary hover:text-secondary transition-all text-[10px] font-bold uppercase tracking-[0.1em]"
          >
            All
          </Link>
          {categories.filter(c => c.id !== params.category).map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.id}`}
              className="px-6 py-2 rounded-full border border-gray-100 text-charcoal hover:border-secondary hover:text-secondary transition-all text-[10px] font-bold uppercase tracking-[0.1em]"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onQuickShop={handleQuickShop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border-2 border-dashed border-gray-100 rounded-[2rem]">
            <span className="text-4xl mb-6 block">✨</span>
            <p className="text-gray-500 font-heading text-xl">New arrivals coming soon to this collection.</p>
            <Link href="/shop" className="btn-primary inline-flex mt-8">
              Explore All Collections
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
