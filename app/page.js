"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import QuickShopModal from "@/components/QuickShopModal";
import { products, categories } from "@/data/products";
import Link from "next/link";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickShop = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const bestsellers = products.filter(p => p.badge === "Bestseller" || p.badge === "Premium");
  const newArrivals = products.slice(0, 4);

  return (
    <>
      <QuickShopModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Hero Section */}
      <Hero />

      {/* Featured Categories */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar">
          <div className="flex justify-center gap-4 md:gap-8 min-w-max">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop/${cat.id}`}
                className="px-8 py-3 rounded-full border border-gray-100 text-charcoal hover:border-secondary hover:text-secondary hover:shadow-lg transition-all text-xs font-bold uppercase tracking-widest whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="section-padding bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] text-secondary font-bold uppercase tracking-[0.4em] mb-4 block animate-fade-up">Curation</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-6">Our Bestsellers</h2>
            <div className="w-12 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Discover our most loved pieces. Handcrafted, hypoallergenic, and designed to make a statement without the designer price tag.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} onQuickShop={handleQuickShop} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/shop" className="inline-flex items-center gap-2 group text-charcoal font-bold text-xs uppercase tracking-[0.2em] border-b-2 border-secondary pb-1 hover:border-charcoal transition-all">
              View All Collections
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition / About Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Decorative background shape */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-offwhite skew-x-12 translate-x-1/2 -z-10 opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="relative aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden bg-primary/5 transition-transform duration-700 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-primary/5 to-transparent"></div>
                {/* Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[80%] aspect-[3/4] rounded-2xl bg-white shadow-[0_40px_100px_rgba(0,0,0,0.1)] flex items-center justify-center border-[12px] border-white transition-transform duration-700 hover:rotate-2">
                    <span className="text-8xl animate-pulse">✨</span>
                  </div>
                </div>
              </div>
              {/* Floating element */}
              <div className="absolute -bottom-10 -right-10 glass p-8 rounded-3xl hidden md:block animate-bounce shadow-2xl">
                <p className="text-charcoal font-heading text-xl font-bold italic">NJYOT Excellence</p>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Certified Craftsmanship</p>
              </div>
            </div>

            <div>
              <span className="text-primary/50 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">The NJYOT Promise</span>
              <h2 className="font-heading text-4xl md:text-6xl font-bold leading-tight text-charcoal mb-8">
                Impact Without <br />
                <span className="text-secondary">The Weight.</span>
              </h2>
              <p className="text-lg text-gray-500 mb-10 leading-relaxed italic border-l-4 border-secondary/30 pl-8">
                &quot;We design statement jewellery for people who want impact without the weight of high cost. Every piece is thoughtfully crafted, ethically plated, and tested for long-lasting shine.&quot;
              </p>

              <div className="grid grid-cols-2 gap-6 mb-12">
                {[
                  { title: "Hypoallergenic", icon: "💎" },
                  { title: "Ultra-Lightweight", icon: "🪶" },
                  { title: "Ethically Plated", icon: "✨" },
                  { title: "Easy Returns", icon: "↺" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-charcoal font-bold text-xs uppercase tracking-widest">{item.title}</span>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn-primary">
                Explore Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-padding bg-offwhite border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-[10px] text-secondary font-bold uppercase tracking-[0.4em] mb-4 block">New Drops</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-charcoal">Just Landed</h2>
            </div>
            <Link href="/shop" className="btn-secondary !bg-charcoal !text-white !border-charcoal hover:!bg-primary">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} onQuickShop={handleQuickShop} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / banner */}
      <section className="py-32 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex justify-center mb-10">
            <div className="flex text-secondary text-2xl gap-2 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">
              ★★★★★
            </div>
          </div>
          <blockquote className="text-3xl md:text-5xl font-heading font-bold leading-tight text-white mb-10 italic">
            &quot;Honestly the most comfortable statement earrings I have ever worn. They look designer but cost like high-street.&quot;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-white/20"></div>
            <p className="font-bold text-secondary uppercase tracking-[0.3em] text-[10px]">Priya S., Verified Buyer</p>
            <div className="w-12 h-[1px] bg-white/20"></div>
          </div>
        </div>
      </section>
    </>
  );
}
