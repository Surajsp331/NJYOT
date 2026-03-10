"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const { cartCount, setIsOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "glass" : "bg-transparent py-4"}`}>
      {/* Top Banner */}
      {!isScrolled && (
        <div className="bg-primary text-white text-center py-2 text-[10px] uppercase font-bold tracking-[0.3em]">
          Free shipping on all orders over ₹999
        </div>
      )}

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-500 ${isScrolled ? "h-16" : "h-20"}`}>
          {/* Logo */}
          <Link href="/" className="group flex flex-col">
            <span className={`font-heading text-2xl md:text-3xl font-bold tracking-tighter ${isScrolled ? "text-charcoal" : "text-white"}`}>
              NJYOT
            </span>
            <span className={`text-[8px] font-bold uppercase tracking-[0.5em] -mt-1 ${isScrolled ? "text-primary/40" : "text-white/40"}`}>
              Est. 2024
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {["Shop All", "Earrings", "Necklaces", "Rings", "Sets"].map((item) => (
              <Link
                key={item}
                href={item === "Shop All" ? "/shop" : `/shop/${item.toLowerCase()}`}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-secondary ${isScrolled ? "text-charcoal" : "text-white"}`}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Link href="/search" className={`p-2 transition-transform hover:scale-110 ${isScrolled ? "text-charcoal" : "text-white"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className={`relative p-2 transition-transform hover:scale-110 ${isScrolled ? "text-charcoal" : "text-white"}`}
              aria-label="Cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-secondary text-primary text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                <span className={`block w-6 h-0.5 bg-current transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""} ${isScrolled ? "text-charcoal" : "text-white"}`}></span>
                <span className={`block w-4 h-0.5 bg-current transition-all ${isMenuOpen ? "opacity-0" : ""} ${isScrolled ? "text-charcoal" : "text-white"}`}></span>
                <span className={`block w-6 h-0.5 bg-current transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""} ${isScrolled ? "text-charcoal" : "text-white"}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-charcoal/95 backdrop-blur-xl z-[-1] transition-all duration-700 md:hidden flex flex-col items-center justify-center ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
          <div className="flex flex-col items-center space-y-8">
            {["Shop All", "Earrings", "Necklaces", "Rings", "Sets", "About", "FAQ"].map((item, i) => (
              <Link
                key={item}
                href={item === "Shop All" ? "/shop" : `/${item.toLowerCase()}`}
                className={`text-2xl font-heading font-medium text-white transition-all hover:text-secondary ${isMenuOpen ? "animate-fade-up" : ""}`}
                style={{ animationDelay: `${i * 100}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
