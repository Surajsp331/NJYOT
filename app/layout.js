import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { UserProvider } from "@/lib/user-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import AuthModal from "@/components/AuthModal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "NJYOT Jewelry | Premium Artificial & Fashion Jewelry",
  description: "Discover NJYOT Jewelry: Modern, artisanal fashion jewelry. Handcrafted, hypoallergenic, and elegantly designed for your most exquisite moments.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-body antialiased`}>
        <CartProvider>
          <WishlistProvider>
            <UserProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <CartSidebar />
                <AuthModal />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </UserProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
