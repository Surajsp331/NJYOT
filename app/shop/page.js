import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import Link from "next/link";

export const metadata = {
  title: "Shop All | NJYOT",
  description: "Browse our complete collection of handcrafted artificial jewellery.",
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-offwhite">
      {/* Hero */}
      <div className="bg-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Shop All</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            From everyday studs to celebration chandeliers — find your signature piece.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/shop"
            className="px-6 py-2 rounded-full bg-primary text-white font-medium"
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.id}`}
              className="px-6 py-2 rounded-full border border-gray-300 text-charcoal hover:border-primary hover:text-primary transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
