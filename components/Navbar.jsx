"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const { cartCount, setIsOpen, cartTotal } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full z-50 bg-offwhite border-b border-gray-200">
      {/* Tier 1: Main Header (Logo, Search, Actions) */}
      <div className={`transition-all duration-300 ${isScrolled ? "fixed top-0 left-0 w-full shadow-sm z-50 bg-offwhite py-3" : "py-6"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="font-heading text-4xl font-black tracking-tight text-charcoal">
                NJYOT<span className="text-secondary">.</span>
              </span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 w-full max-w-2xl hidden md:flex">
              <div className="flex w-full rounded-md overflow-hidden bg-accent">
                <div className="pl-4 py-3 flex items-center justify-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Search For Products..." 
                  className="w-full bg-accent text-sm text-charcoal px-3 py-3 focus:outline-none"
                />
                <button className="bg-primary text-black font-bold text-sm px-8 py-3 hover:bg-black hover:text-white transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Actions (Account & Cart) */}
            <div className="flex items-center space-x-6 flex-shrink-0">
              {/* Account */}
              <Link href="/admin/login" className="flex items-center text-charcoal hover:text-secondary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              
              {/* Cart */}
              <button 
                onClick={() => setIsOpen(true)}
                className="flex items-center group transition-colors"
              >
                <div className="relative">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-charcoal group-hover:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="absolute -top-1 -right-2 bg-primary text-black text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                    {cartCount || 0}
                  </span>
                </div>
                <span className="ml-3 font-bold text-sm text-charcoal hidden sm:block">
                  Rs. {(cartTotal || 0).toLocaleString("en-IN")}
                </span>
              </button>

               {/* Mobile Menu Toggle */}
               <button
                className="md:hidden text-charcoal p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Search - Only visible on small screens */}
          <div className="mt-4 flex w-full rounded-md overflow-hidden bg-accent md:hidden">
             <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-accent text-sm text-charcoal px-4 py-3 focus:outline-none"
              />
              <button className="bg-primary text-black font-bold text-sm px-6 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
          </div>
        </div>
      </div>

      {/* Tier 2: Navigation Bar */}
      <nav className={`border-t border-gray-200 bg-offwhite hidden md:block ${isScrolled ? "mt-[88px]" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Primary Nav Links */}
            <div className="flex items-center gap-8">
               {/* All Categories Button */}
              <div className="relative group">
                <button className="bg-primary text-black font-bold text-sm px-8 py-4 flex items-center gap-3 w-64">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                   </svg>
                   All Category
                </button>
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <ul className="py-2">
                    {["Bridal Sets", "Necklaces", "Earrings", "Rings", "Bracelets", "Party Wear"].map((cat) => (
                      <li key={cat}>
                        <Link href={`/shop/${cat.toLowerCase().replace(" ", "-")}`} className="block px-6 py-3 text-sm text-gray-600 hover:text-black hover:bg-gray-50 hover:pl-8 transition-all font-medium border-b border-gray-50 last:border-0">
                          {cat}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Standard Links */}
              {["Shop", "About Us", "Contact Us", "FAQ"].map((item) => (
                <Link
                  key={item}
                  href={item === "Shop" ? "/shop" : `/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-bold text-charcoal hover:text-secondary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Special Offers Tag */}
            <div className="flex items-center text-sm font-bold text-charcoal gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>Special Offers!</span>
            </div>
            
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 md:hidden ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setIsMenuOpen(false)}>
        <div className={`fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`} onClick={e => e.stopPropagation()}>
           <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="font-heading text-2xl font-black tracking-tight text-charcoal">NJYOT.</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-charcoal"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              <ul className="space-y-6">
                {["Shop", "Bridal", "Party Wear", "About Us", "Contact Us"].map((item) => (
                  <li key={item}>
                    <Link href={item === "Shop" ? "/shop" : `/${item.toLowerCase().replace(" ", "-")}`} className="text-lg font-bold text-charcoal block" onClick={() => setIsMenuOpen(false)}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
           </div>
        </div>
      </div>
    </header>
  );
}
