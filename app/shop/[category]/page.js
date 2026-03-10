import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, categories } from "@/data/products";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const category = categories.find(c => c.id === params.category);
  if (!category) return { title: "Shop | NJYOT" };

  return {
    title: `${category.name} | NJYOT`,
    description: `Shop our ${category.name.toLowerCase()} collection - handcrafted artificial jewellery.`,
  };
}

export default function CategoryPage({ params }) {
  const category = categories.find(c => c.id === params.category);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(params.category);

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Hero */}
      <div className="bg-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {params.category === 'earrings' && "From everyday studs to celebration chandeliers — find your signature pair."}
            {params.category === 'necklaces' && "Elegant necklaces for every occasion."}
            {params.category === 'rings' && "Statement rings that sparkle and shine."}
            {params.category === 'sets' && "Perfectly matched sets for special occasions."}
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/shop" className="text-gray-500 hover:text-primary text-sm">
          ← Back to Shop
        </Link>
      </div>

      {/* Category Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex flex-wrap gap-4">
          <Link
            href="/shop"
            className="px-4 py-2 rounded-full border border-gray-300 text-charcoal hover:border-primary transition-colors text-sm"
          >
            All
          </Link>
          {categories.filter(c => c.id !== params.category).map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.id}`}
              className="px-4 py-2 rounded-full border border-gray-300 text-charcoal hover:border-primary transition-colors text-sm"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">No products found in this category.</p>
            <Link href="/shop" className="text-primary hover:underline mt-4 inline-block">
              Browse all products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
