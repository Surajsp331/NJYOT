import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import Link from "next/link";

export default function Home() {
  const bestsellers = products.filter(p => p.badge === "Bestseller" || p.badge === "Premium");
  const newArrivals = products.slice(0, 8);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Featured Categories */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop/${cat.id}`}
                className="px-6 py-2 rounded-full border border-gray-200 text-charcoal hover:border-primary hover:text-primary transition-colors text-sm font-medium"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-4">Our Bestsellers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most loved pieces. Handcrafted, hypoallergenic, and designed to make a statement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop" className="btn-secondary inline-block">
              View All Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition / About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-primary/10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-primary/10 to-transparent"></div>
              <div className="text-center p-8 z-10 w-full max-w-sm">
                <div className="w-full aspect-[3/4] rounded-2xl bg-white shadow-2xl rotate-3 flex items-center justify-center border-4 border-white">
                   <span className="text-6xl">✨</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">The NJYOT Promise</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-charcoal mb-6">
                Impact Without The Weight.
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We design statement jewellery for people who want impact without the weight of high cost. Every piece is thoughtfully crafted, ethically plated, and tested for long-lasting shine.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Hypoallergenic, nickel-free plating",
                  "Lightweight for all-day comfort",
                  "Ethically made & conscientiously packaged",
                  "30-day easy return policy"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-accent text-xl mr-3 leading-none">✓</span>
                    <span className="text-charcoal font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/about" className="text-primary font-medium hover:underline underline-offset-4 inline-flex items-center">
                Read our brand story
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-4">New Arrivals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fresh styles just dropped. Be the first to wear our latest designs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / UGC Banner */}
      <section className="py-20 bg-charcoal text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-6">
            <div className="flex text-accent text-2xl">
              ★★★★★
            </div>
          </div>
          <blockquote className="text-2xl md:text-3xl font-heading font-medium leading-relaxed mb-8">
             &quot;Honestly the most comfortable statement earrings I have ever worn. They look exactly like designer pieces but cost a fraction. Arrived in 2 days!&quot;
          </blockquote>
          <p className="font-medium text-gray-300 uppercase tracking-widest text-sm">— Priya S., Verified Buyer</p>
        </div>
      </section>
    </>
  );
}
