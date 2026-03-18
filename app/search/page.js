"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import Link from "next/link";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const filterProducts = () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered);
    };

    const timeoutId = setTimeout(filterProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Search Header */}
      <div className="bg-charcoal text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-8">Search Collection</h1>
            <div className="relative group">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for earrings, necklaces, rings..."
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-5 text-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all text-white placeholder-gray-400 shadow-2xl"
                autoFocus
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            {query && (
              <p className="mt-6 text-gray-400 text-sm animate-fade-up">
                Found {results.length} {results.length === 1 ? "result" : "results"} for &quot;{query}&quot;
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {!query ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6 opacity-20">🔍</div>
            <h2 className="text-2xl font-heading font-bold text-charcoal mb-4">Start your search</h2>
            <p className="text-gray-500 max-w-sm mx-auto">Discover our curated collection of statement jewellery and artisanal pieces.</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6 opacity-20">✨</div>
            <h2 className="text-2xl font-heading font-bold text-charcoal mb-4">No pieces found</h2>
            <p className="text-gray-500 max-w-sm mx-auto mb-8">We couldn&apos;t find anything matching &quot;{query}&quot;. Try searching for &quot;necklace&quot;, &quot;gold&quot;, or &quot;hoops&quot;.</p>
            <Link href="/shop" className="btn-primary inline-flex">
              Explore All Collections
            </Link>
          </div>
        )}
      </div>

      {/* Popular Suggestions */}
      {!query && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <div className="text-center mb-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Popular Searches</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {["Earrings", "Gold Necklace", "Statement Rings", "Bestsellers", "New Arrivals"].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-6 py-2 rounded-full border border-gray-200 text-gray-600 hover:border-secondary hover:text-secondary transition-all text-sm font-medium"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-offwhite flex items-center justify-center"><div className="text-secondary text-xl">Loading...</div></div>}>
      <SearchContent />
    </Suspense>
  );
}
