"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

export default function QuickShopModal({ product, isOpen, onClose }) {
    const { addToCart } = useCart();
    const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || "");
    const [quantity, setQuantity] = useState(1);

    if (!isOpen || !product) return null;

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedVariant);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-charcoal/60 backdrop-blur-md animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fade-up">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-charcoal hover:bg-secondary transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {/* Product Image */}
                <div className="md:w-1/2 relative aspect-square md:aspect-auto bg-offwhite">
                    {product.images?.[0] ? (
                        <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-8xl bg-gradient-to-br from-primary/5 to-accent/5">
                            {product.icon || "💍"}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
                    <span className="text-[10px] text-primary/50 font-bold uppercase tracking-[0.3em] mb-4">
                        {product.category}
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-4">
                        {product.title}
                    </h2>

                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-heading font-bold text-2xl text-charcoal pr-4 border-r border-gray-100">
                            ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        <div className="flex text-secondary text-sm">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i}>{i < Math.floor(product.rating) ? "★" : "☆"}</span>
                            ))}
                        </div>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                        {product.shortDesc}
                    </p>

                    {/* Variants */}
                    {product.variants && product.variants.length > 0 && (
                        <div className="mb-8">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                                Select Style
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {product.variants.map((variant) => (
                                    <button
                                        key={variant}
                                        onClick={() => setSelectedVariant(variant)}
                                        className={`px-6 py-2 rounded-full border text-xs font-semibold transition-all ${selectedVariant === variant
                                                ? "bg-charcoal text-white border-charcoal"
                                                : "bg-white text-gray-400 border-gray-100 hover:border-primary"
                                            }`}
                                    >
                                        {variant}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity & Add to Cart */}
                    <div className="mt-auto flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center h-14 bg-offwhite rounded-full px-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 flex items-center justify-center text-charcoal hover:bg-white rounded-full transition-colors"
                            >-</button>
                            <span className="w-12 text-center font-bold">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 flex items-center justify-center text-charcoal hover:bg-white rounded-full transition-colors"
                            >+</button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="flex-1 btn-primary whitespace-nowrap"
                        >
                            Add To Cart
                        </button>
                    </div>

                    <span className="mt-6 text-[10px] text-gray-400 text-center md:text-left">
                        Estimated Delivery: <span className="text-charcoal font-bold">2-4 Business Days</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
