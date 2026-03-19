export const products = [
  {
    id: 1,
    name: "Aurora Hoop Earrings",
    slug: "aurora-hoop-earrings",
    price: 1499,
    originalPrice: 1999,
    rating: 4.8,
    badge: "Bestseller",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800",
    ],
    category: "earrings",
    description: "Stunning gold-plated hoop earrings with intricate detailing.",
  },
  {
    id: 2,
    name: "Luna Drop Necklace",
    slug: "luna-drop-necklace",
    price: 1899,
    originalPrice: 2499,
    rating: 4.9,
    badge: "Premium",
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800",
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=800",
    ],
    category: "necklaces",
    description: "Elegant crescent moon drop necklace with sparkling crystals.",
  },
  {
    id: 3,
    name: "Nova Crystal Ring",
    slug: "nova-crystal-ring",
    price: 899,
    originalPrice: null,
    rating: 4.5,
    badge: null,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800",
    ],
    category: "rings",
    description: "Brilliant crystal statement ring with adjustable band.",
  },
  {
    id: 4,
    name: "Celestial Drop Earrings",
    slug: "celestial-drop-earrings",
    price: 1299,
    originalPrice: 1599,
    rating: 4.7,
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800",
    ],
    category: "earrings",
    description: "Dangle earrings inspired by celestial beauty.",
  },
  {
    id: 5,
    name: "Pearl Essence Set",
    slug: "pearl-essence-set",
    price: 2499,
    originalPrice: 3299,
    rating: 5.0,
    badge: "Sale",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800",
    ],
    category: "sets",
    description: "Complete pearl jewellery set with necklace and earrings.",
  },
  {
    id: 6,
    name: "Gold Twist Bangle",
    slug: "gold-twist-bangle",
    price: 699,
    originalPrice: null,
    rating: 4.4,
    badge: null,
    images: [
      "https://images.unsplash.com/photo-1573408301185-9519f94816b5?q=80&w=800",
    ],
    category: "bracelets",
    description: "Elegant twisted gold bangle with smooth finish.",
  },
  {
    id: 7,
    name: "Minimalist Studs",
    slug: "minimalist-studs",
    price: 499,
    originalPrice: 799,
    rating: 4.6,
    badge: null,
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800",
    ],
    category: "earrings",
    description: "Simple yet elegant minimal stud earrings.",
  },
  {
    id: 8,
    name: "Festival Choker",
    slug: "festival-choker",
    price: 1099,
    originalPrice: 1499,
    rating: 4.8,
    badge: "Trending",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800",
    ],
    category: "necklaces",
    description: "Statement choker perfect for festivals and weddings.",
  },
  {
    id: 9,
    name: "Vintage Brooch",
    slug: "vintage-brooch",
    price: 1599,
    originalPrice: null,
    rating: 4.3,
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800",
    ],
    category: "brooches",
    description: "Antique-inspired brooch with vintage floral motifs.",
  },
  {
    id: 10,
    name: "Stackable Band Set",
    slug: "stackable-band-set",
    price: 1199,
    originalPrice: 1599,
    rating: 4.7,
    badge: null,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800",
    ],
    category: "rings",
    description: "Set of 3 stackable bands with gold and rose gold finish.",
  },
  {
    id: 11,
    name: "Bridal Maang Tikka",
    slug: "bridal-maang-tikka",
    price: 2999,
    originalPrice: 3999,
    rating: 4.9,
    badge: "Bridal",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800",
    ],
    category: "necklaces",
    description: "Grand bridal maang tikka with pearl drops.",
  },
  {
    id: 12,
    name: "Rose Gold Chain",
    slug: "rose-gold-chain",
    price: 899,
    originalPrice: 1199,
    rating: 4.5,
    badge: null,
    images: [
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=800",
    ],
    category: "necklaces",
    description: "Delicate rose gold chain with subtle sparkle.",
  },
];

export async function getFeaturedProducts() {
  return products;
}

export async function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null;
}

export async function getProductsByCategory(category) {
  return products.filter((p) => p.category === category);
}
