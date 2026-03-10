"use client";

import { useState } from "react";
import { getProductBySlug, products } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Get related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/shop" className="text-gray-500 hover:text-primary text-sm">
          ← Back to Shop
        </Link>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <span className="text-9xl">{product.emoji}</span>
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-primary font-medium mb-2">{product.category}</p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < product.rating ? "★" : "☆"}</span>
                ))}
              </div>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-charcoal">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>

            {/* Stock indicator */}
            {product.stock <= 10 && (
              <p className="text-red-500 text-sm mb-4">
                🔥 Only {product.stock} left in stock!
              </p>
            )}

            {/* Description */}
            <p className="text-gray-600 mb-6">{product.longDescription}</p>

            {/* Variants */}
            {product.variants && product.variants.length > 1 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Select {product.category === "Rings" ? "Size" : "Finish"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-full border-2 transition-colors ${
                        selectedVariant === variant
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-gray-300 text-charcoal hover:border-primary"
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
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-xl font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={`w-full btn-primary text-lg mb-4 ${added ? "bg-green-500" : ""}`}
            >
              {added ? "✓ Added to Cart!" : "Add to Cart"}
            </button>

            {/* Features */}
            <div className="border-t pt-6 mt-6">
              <h3 className="font-medium text-charcoal mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-600">
                    <span className="text-primary mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Materials & Care */}
            <div className="border-t pt-6 mt-6 space-y-4">
              <div>
                <h3 className="font-medium text-charcoal mb-1">Materials</h3>
                <p className="text-sm text-gray-600">{product.materials}</p>
              </div>
              <div>
                <h3 className="font-medium text-charcoal mb-1">Care Instructions</h3>
                <p className="text-sm text-gray-600">{product.care}</p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>🛡️</span> Secure Checkout
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>↩️</span> 30-Day Returns
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>✨</span> Nickel-Free
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} className="card group">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <span className="text-5xl">{p.emoji}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-charcoal group-hover:text-primary">{p.name}</h3>
                  <p className="text-primary font-bold">₹{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
