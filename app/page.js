import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/data";

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <div className="flex flex-col min-h-screen pt-[130px] md:pt-[150px]">
      <Hero />

      {/* Top Collections section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-10 border-b border-gray-100 pb-4">
             <h2 className="text-2xl md:text-3xl font-black text-black">
                Top Collections
             </h2>
             <div className="flex gap-6 text-sm font-bold uppercase tracking-wider text-gray-400 mt-4 md:mt-0 overflow-x-auto w-full md:w-auto overflow-y-hidden pb-2 md:pb-0 hide-scrollbar whitespace-nowrap">
                <button className="text-secondary border-b-2 border-secondary pb-1">All</button>
                <button className="hover:text-black transition-colors pb-1 border-b-2 border-transparent hover:border-black">Bridal</button>
                <button className="hover:text-black transition-colors pb-1 border-b-2 border-transparent hover:border-black">Necklaces</button>
                <button className="hover:text-black transition-colors pb-1 border-b-2 border-transparent hover:border-black">Earrings</button>
             </div>
          </div>

          <div className="product-grid">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* Featured Banner Middle */}
      <section className="py-8 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full bg-[#f4f4f4] rounded-sm min-h-[300px] flex items-center justify-center p-8 relative overflow-hidden group border-t-4 border-primary">
               <div className="relative z-10 text-center">
                 <span className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase mb-4 block">Summer Edit • Flat 50% Off</span>
                 <h2 className="text-3xl md:text-5xl font-black text-black mb-6">Bridal Collection</h2>
                 <button className="bg-secondary text-white font-bold px-8 py-3.5 hover:bg-black transition-colors shadow-sm">
                   Shop Now
                 </button>
               </div>
               {/* Abstract decorative elements simulating images */}
               <div className="absolute top-0 right-0 w-1/3 h-full mix-blend-multiply opacity-50 bg-[url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600')] bg-cover bg-center pointer-events-none rounded-l-full"></div>
            </div>
         </div>
      </section>

      {/* New Arrivals section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-10 border-b border-gray-100 pb-4">
             <h2 className="text-2xl md:text-3xl font-black text-black">
                New Arrivals
             </h2>
          </div>

          <div className="product-grid">
            {products.slice(8, 12).map((product) => (
               <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
