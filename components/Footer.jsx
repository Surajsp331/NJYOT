import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f9f9f9] border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Contact */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="font-heading text-3xl font-black tracking-tight text-charcoal">
                NJYOT<span className="text-secondary">.</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed pr-4">
              Discover elegant and timeless artificial jewelry handcrafted for every occasion.
            </p>
            <div className="space-y-3 text-sm text-gray-600">
               <p className="flex items-center gap-3">
                  <span className="text-gray-400">📍</span> 123 Fashion Street, Mumbai, India
               </p>
               <p className="flex items-center gap-3">
                  <span className="text-gray-400">✉️</span> support@njyot.com
               </p>
               <p className="flex items-center gap-3">
                  <span className="text-gray-400">📞</span> +91 98765 43210
               </p>
            </div>
          </div>

          {/* Column 2: Informations */}
          <div>
            <h3 className="text-lg font-bold text-black mb-6 uppercase tracking-wider">Informations</h3>
            <ul className="space-y-3">
              {['About Us', 'Delivery Information', 'Privacy Policy', 'Terms & Conditions', 'Contact Us'].map(link => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="text-sm text-gray-500 hover:text-secondary transition-colors inline-block relative group">
                    <span className="group-hover:translate-x-2 inline-block transition-transform duration-300">
                      {link}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Let Us Help You */}
          <div>
            <h3 className="text-lg font-bold text-black mb-6 uppercase tracking-wider">Help & Support</h3>
            <ul className="space-y-3">
              {['My Account', 'Order History', 'Track Order', 'Wishlist', 'Returns'].map(link => (
                <li key={link}>
                   <Link href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="text-sm text-gray-500 hover:text-secondary transition-colors inline-block relative group">
                    <span className="group-hover:translate-x-2 inline-block transition-transform duration-300">
                      {link}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-black mb-6 uppercase tracking-wider">Our Newsletter</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Subscribe to our newsletter and get updates on latest products and special offers.
            </p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email address..." 
                className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
                required
              />
              <button 
                type="submit" 
                className="bg-primary text-black font-bold uppercase tracking-widest text-xs px-6 py-3.5 hover:bg-black hover:text-white transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} <span className="text-black font-bold">NJYOT</span>. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            {/* Social Icons mock */}
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-secondary hover:text-white transition-colors cursor-pointer flex justify-center items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
