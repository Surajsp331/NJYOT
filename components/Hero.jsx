import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Banner 1 */}
          <div className="relative overflow-hidden bg-[#F3F3F3] rounded-sm group min-h-[360px] flex items-center p-8 md:p-12">
            <div className="relative z-10 w-2/3">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest block mb-3">
                Get Up To 20% Off
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-black text-black mb-4 leading-tight">
                New Bridal<br />Collection
              </h2>
              <p className="text-gray-600 mb-8 max-w-sm">
                Offering cutting-edge design and timeless elegance.
              </p>
              <Link href="/shop/bridal" className="inline-block bg-secondary text-white font-bold px-8 py-3.5 hover:bg-black transition-colors shadow-sm">
                Shop Now
              </Link>
            </div>
            
            {/* Banner Image / Abstract Art */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full flex justify-end items-center opacity-90 group-hover:scale-105 transition-transform duration-700 origin-right">
                <img 
                  src="https://images.unsplash.com/photo-1599643478514-4a485521b369?q=80&w=1000&auto=format&fit=crop" 
                  alt="Bridal Collection" 
                  className="w-full h-full object-cover rounded-l-[100px] shadow-2xl"
                />
            </div>
          </div>

          {/* Banner 2 */}
          <div className="relative overflow-hidden bg-[#F3F3F3] rounded-sm group min-h-[360px] flex items-center p-8 md:p-12">
            <div className="relative z-10 w-2/3">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest block mb-3">
                Get Up To 30% Off
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-black text-black mb-4 leading-tight">
                Premium<br />Necklaces
              </h2>
              <p className="text-gray-600 mb-8 max-w-sm">
                Stay connected to your roots with premium handcrafted art.
              </p>
              <Link href="/shop/necklaces" className="inline-block bg-secondary text-white font-bold px-8 py-3.5 hover:bg-black transition-colors shadow-sm">
                Shop Now
              </Link>
            </div>
            
             {/* Banner Image / Abstract Art */}
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full flex justify-end items-center opacity-90 group-hover:scale-105 transition-transform duration-700 origin-right">
                <img 
                  src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1000&auto=format&fit=crop" 
                  alt="Premium Necklaces" 
                  className="w-full h-full object-cover rounded-l-[100px] shadow-2xl"
                />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
