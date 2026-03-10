"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-offwhite pb-24">
      {/* Hero Section */}
      <div className="bg-charcoal text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/5 rounded-full blur-[120px] translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-[10px] text-secondary font-bold uppercase tracking-[0.5em] mb-4 block animate-fade-up">Our Legacy</span>
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">Redefining Elegance</h1>
          <div className="w-16 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-lg">
            NJYOT was founded on a singular principle: that bespoke artistry should be accessible to those who celebrate life’s most exquisite moments.
          </p>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white rounded-[4rem] shadow-2xl p-12 md:p-24 border border-gray-50">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-[10px] text-primary font-bold uppercase tracking-[0.4em] mb-6 block">The NJYOT Way</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-8 leading-tight">
                Crafted for Impact, <br /><span className="text-secondary italic">Designed for You.</span>
              </h2>
              <div className="space-y-6 text-gray-500 text-lg leading-relaxed">
                <p>
                  We design statement jewellery for the bold — those who demand impact without the weight of traditional extravagance. Every piece is a testament to the intersection of fashion-forward aesthetics and meticulous craftsmanship.
                </p>
                <p>
                  From our studio to your collection, we ensure every detail is refined. Our metals are hypoallergenic, our plating is ethically sourced, and our designs are forever.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-offwhite rounded-[3rem] overflow-hidden shadow-inner border border-gray-100 flex items-center justify-center relative">
                <span className="text-[12rem] animate-ken-burns opacity-20">💍</span>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12 bg-charcoal/90 backdrop-blur-md p-8 rounded-3xl text-white shadow-2xl">
                  <p className="font-heading text-xl italic mb-4">&quot;Elegance is not about being noticed, it’s about being remembered.&quot;</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">— NJYOT Philosophy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Materials & Excellence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="text-center mb-20">
          <span className="text-[10px] text-secondary font-bold uppercase tracking-[0.5em] mb-4 block">Craftsmanship</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-charcoal">The Pillars of Excellence</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Luxe Materials", desc: "Hypoallergenic, nickel-free brass with authentic 18k gold & rhodium plating.", icon: "✨" },
            { title: "Ethical Sourcing", desc: "Fair wages and sustainable production are at the core of our supply chain.", icon: "🌍" },
            { title: "Refined Luxury", desc: "Every piece is hand-finished and inspected for a mirror-like shine.", icon: "💎" }
          ].map((pill, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-50 hover:shadow-2xl transition-all group">
              <div className="w-16 h-16 bg-offwhite rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-secondary/10 transition-colors">
                {pill.icon}
              </div>
              <h3 className="font-heading text-2xl font-bold text-charcoal mb-4">{pill.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{pill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sustainable Future Section */}
      <section className="bg-charcoal text-white mt-32 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/5 backdrop-blur-xl rounded-[4rem] p-12 md:p-24 border border-white/10">
            <div className="max-w-3xl">
              <h2 className="font-heading text-4xl md:text-6xl font-bold mb-10 leading-tight">
                Conscious Luxury for a <br /> <span className="text-secondary">Brighter Tomorrow.</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-secondary">Zero Waste Goal</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Our packaging is 100% recycled and FSC-certified. We believe beauty shouldn&apos;t cost the Earth.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-secondary">Timeless Design</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">By creating pieces that last locally, we reduce the footprint of fast-fashion consumption.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 text-center pb-24">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-secondary/20 rounded-full blur-2xl animate-pulse"></div>
          <h2 className="font-heading text-4xl font-bold text-charcoal mb-8 relative">Step Into The World of NJYOT</h2>
        </div>
        <p className="text-gray-500 max-w-xl mx-auto mb-12 text-lg">
          Join a community of thousands who define their own standard of luxury.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="btn-primary px-12 py-5">
            Discover The Collection
          </Link>
          <Link href="/faq" className="px-12 py-5 rounded-full border border-gray-200 text-charcoal font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-all">
            Inquiry Lounge
          </Link>
        </div>
      </section>
    </div>
  );
}
