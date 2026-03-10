import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-offwhite to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center md:text-left">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              New Collection Available
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-charcoal leading-tight mb-6">
              Statement Jewellery — <span className="text-primary">Lightweight.</span> Hypoallergenic. <span className="text-accent">Impossible to Ignore.</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto md:mx-0">
              Hand-finished artificial jewellery that looks designer — delivered in 2-4 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/shop" className="btn-primary text-center">
                Shop New Arrivals
              </Link>
              <Link href="/shop" className="btn-secondary text-center">
                Explore Bestsellers
              </Link>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-white shadow-xl flex items-center justify-center">
                  <span className="text-6xl">💎</span>
                </div>
                <p className="text-charcoal font-heading text-xl">Featured Product</p>
                <p className="text-gray-500">Aurora Hoop Earrings</p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
