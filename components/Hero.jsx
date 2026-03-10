import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[700px] flex items-center overflow-hidden bg-charcoal">
      {/* Dynamic Background with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb0ce33e?q=80&w=2070')] bg-cover bg-center animate-ken-burns opacity-60"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/40 to-transparent"></div>
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="animate-fade-up [animation-delay:200ms] opacity-0">
            <span className="inline-block px-4 py-1.5 bg-secondary/20 backdrop-blur-md text-secondary border border-secondary/30 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
              Premium Collection 2024
            </span>
          </div>

          <h1 className="animate-fade-up [animation-delay:400ms] opacity-0 font-heading text-5xl md:text-8xl font-bold text-white leading-[1.1] mb-8">
            Impact Without <br />
            <span className="text-secondary italic font-medium">The Weight.</span>
          </h1>

          <p className="animate-fade-up [animation-delay:600ms] opacity-0 text-gray-300 text-lg md:text-xl mb-12 max-w-lg leading-relaxed">
            Runway-inspired jewellery handcrafted for those who command attention. Lightweight, hypoallergenic, and designed to shine.
          </p>

          <div className="animate-fade-up [animation-delay:800ms] opacity-0 flex flex-col sm:flex-row gap-6">
            <Link href="/shop" className="btn-primary group">
              Shop Arrivals
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </Link>
            <Link href="/shop" className="btn-secondary">
              Explore Sets
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-offwhite to-transparent"></div>
    </section>
  );
}
