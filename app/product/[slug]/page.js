"use client";

import { useState } from "react";
import { getProductBySlug, products } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import ProductCard from "@/components/ProductCard";
import QuickShopModal from "@/components/QuickShopModal";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) {
    notFound();
  }

  const handleQuickShop = (p) => {
    setSelectedProductForModal(p);
    setIsModalOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-offwhite pb-24">
      <QuickShopModal
        product={selectedProductForModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
          <Link href="/" className="text-gray-400 hover:text-secondary transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/shop" className="text-gray-400 hover:text-secondary transition-colors">Shop</Link>
          <span className="text-gray-300">/</span>
          <Link href={`/shop/${product.category.toLowerCase()}`} className="text-gray-400 hover:text-secondary transition-colors">{product.category}</Link>
          <span className="text-gray-300">/</span>
          <span className="text-charcoal">{product.title || product.name}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Visuals Column */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-white shadow-2xl group">
              {product.images?.[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[10rem] bg-gradient-to-br from-primary/5 to-accent/5">
                  {product.icon || product.emoji || "💍"}
                </div>
              )}

              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-8 left-8 bg-charcoal/90 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] text-white uppercase rounded-sm z-10 shadow-xl">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Gallery Thumbnails (if any) */}
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-secondary transition-all shadow-md">
                    <Image src={img} alt={`${product.title} thumbnail ${i}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100">
            <span className="text-[10px] text-primary/40 font-bold uppercase tracking-[0.4em] mb-4 block">
              NJYOT Luxe Series
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight">
              {product.title || product.name}
            </h1>

            <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <span className="font-heading font-bold text-3xl text-charcoal">₹{product.price.toLocaleString("en-IN")}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-300 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-secondary text-sm">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>{i < Math.floor(product.rating) ? "★" : "☆"}</span>
                  ))}
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">({product.reviewsCount || product.reviews} reviews)</span>
              </div>
            </div>

            <p className="text-gray-500 leading-relaxed mb-10 italic border-l-4 border-secondary/30 pl-8">
              {product.description || product.shortDesc}
            </p>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-10">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Selection / Style
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-8 py-3 rounded-full border text-xs font-bold transition-all ${selectedVariant === v
                          ? "bg-charcoal text-white border-charcoal shadow-lg"
                          : "bg-white text-gray-400 border-gray-100 hover:border-secondary hover:text-charcoal"
                        }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-10 flex items-center gap-6">
              <div className="flex items-center h-14 bg-offwhite rounded-full px-6 shadow-inner">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-charcoal hover:bg-white rounded-full transition-colors font-bold"
                >-</button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-charcoal hover:bg-white rounded-full transition-colors font-bold"
                >+</button>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {product.stock <= 10 ? <span className="text-red-500">Only {product.stock} available</span> : "In Stock & Ready"}
              </p>
            </div>

            {/* Actions */}
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`w-full py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 overflow-hidden group relative ${added ? "bg-green-500 text-white" : "bg-secondary text-primary hover:scale-[1.02] hover:shadow-2xl hover:shadow-secondary/30 active:scale-95"
                }`}
            >
              <span className={`transition-all duration-300 ${added ? "scale-0" : "scale-100"}`}>
                {added ? "" : "Add To Collection"}
              </span>
              {added && <span className="absolute inset-0 flex items-center justify-center animate-fade-up">✓ Item Added</span>}
            </button>

            {/* Features Dropdown/Info */}
            <div className="mt-12 grid grid-cols-2 gap-6 pt-12 border-t border-gray-50">
              <div className="flex items-start gap-4">
                <span className="text-xl bg-offwhite w-10 h-10 rounded-xl flex items-center justify-center">✨</span>
                <div>
                  <h4 className="text-[10px] font-bold text-charcoal uppercase tracking-widest mb-1">Authentic</h4>
                  <p className="text-[10px] text-gray-400 leading-tight">Handcrafted with precision</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xl bg-offwhite w-10 h-10 rounded-xl flex items-center justify-center">💎</span>
                <div>
                  <h4 className="text-[10px] font-bold text-charcoal uppercase tracking-widest mb-1">Premium</h4>
                  <p className="text-[10px] text-gray-400 leading-tight">18k Gold Plated finish</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Narrative / Long Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-charcoal text-white rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="max-w-3xl relative z-10">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-10 leading-tight italic">
              &quot;Jewellery that tells your story without weighing you down.&quot;
            </h2>
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
              <p>{product.longDescription || product.description}</p>
              <div className="grid md:grid-cols-2 gap-10 mt-12 py-10 border-y border-white/10">
                <div>
                  <h4 className="text-secondary font-bold uppercase tracking-widest text-[10px] mb-4">Materials & Origin</h4>
                  <p className="text-sm">{product.materials || "Premium metals, Hypoallergenic plating"}</p>
                </div>
                <div>
                  <h4 className="text-secondary font-bold uppercase tracking-widest text-[10px] mb-4">Luxe Care</h4>
                  <p className="text-sm">{product.care || "Store in provided pouch. Avoid direct moisture."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Pieces */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[10px] text-secondary font-bold uppercase tracking-[0.4em] mb-4 block">Discovery</span>
              <h2 className="font-heading text-4xl font-bold text-charcoal">Complete The Look</h2>
            </div>
            <Link href="/shop" className="text-xs font-bold uppercase tracking-widest border-b-2 border-secondary pb-1 hover:border-charcoal transition-all">
              Shop All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onQuickShop={handleQuickShop} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
