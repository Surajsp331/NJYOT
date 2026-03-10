"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const { cartCount, setIsOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      {/* Free Shipping Banner */}
      <div className="bg-charcoal text-white text-center py-2 text-sm">
        <span className="text-accent">Free shipping</span> on orders above ₹999
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-heading text-2xl font-bold text-charcoal">
            NJYOT
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-charcoal hover:text-primary transition-colors">
              Shop All
            </Link>
            <Link href="/shop/earrings" className="text-charcoal hover:text-primary transition-colors">
              Earrings
            </Link>
            <Link href="/shop/necklaces" className="text-charcoal hover:text-primary transition-colors">
              Necklaces
            </Link>
            <Link href="/shop/rings" className="text-charcoal hover:text-primary transition-colors">
              Rings
            </Link>
            <Link href="/shop/sets" className="text-charcoal hover:text-primary transition-colors">
              Sets
            </Link>
            <Link href="/about" className="text-charcoal hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/faq" className="text-charcoal hover:text-primary transition-colors">
              FAQ
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-charcoal hover:text-primary transition-colors"
              aria-label="Cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-charcoal"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link href="/shop" className="text-charcoal hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Shop All
              </Link>
              <Link href="/shop/earrings" className="text-charcoal hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Earrings
              </Link>
              <Link href="/shop/necklaces" className="text-charcoal hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Necklaces
              </Link>
              <Link href="/shop/rings" className="text-charcoal hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Rings
              </Link>
              <Link href="/shop/sets" className="text-charcoal hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Sets
              </Link>
              <Link href="/about" className="text-charcoal hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link href="/faq" className="text-charcoal hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                FAQ
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
