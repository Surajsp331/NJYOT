"use client";

import Link from "next/link";

const blogPosts = [
  {
    slug: "caring-for-gold-plated-jewelry",
    title: "The Art of Preservation: Caring for Gold Plated Jewelry",
    excerpt: "Discover the professional secrets to maintaining the brilliance of your high-micron gold plated pieces.",
    date: "March 10, 2026",
    category: "Craftsmanship",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=400&fit=crop"
  },
  {
    slug: "bridal-jewelry-trends-2026",
    title: "Bridal Legacy: Trends Defining the 2026 Wedding Season",
    excerpt: "From statement maang tikkas to layered kundan, explore the heritage looks making a comeback.",
    date: "March 05, 2026",
    category: "Trends",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=400&fit=crop"
  },
  {
    slug: "minimalism-in-modern-fashion",
    title: "Minimalism: The New Statement in Modern Fashion",
    excerpt: "Why clean lines and geometric shapes are dominating the luxury artificial jewelry space.",
    date: "Feb 28, 2026",
    category: "Styling",
    image: "https://images.unsplash.com/photo-1635767798638-3e252a018695?w=800&h=400&fit=crop"
  }
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] text-secondary font-bold uppercase tracking-[0.5em] mb-4 block">LuxeSpark Journal</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary mb-6 text-balance">The Artisan Registry</h1>
          <p className="text-gray-500 max-w-xl mx-auto font-light italic text-lg">
            Insights into craftsmanship, styling, and the heritage of fashion jewelry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group cursor-pointer">
              <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-6 relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {post.category}
                </div>
              </div>
              <p className="text-secondary text-[10px] font-bold uppercase tracking-widest mb-3">{post.date}</p>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <Link href={`/blog/${post.slug}`} className="text-primary font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Read The Entry
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
