# NJYOT - Artificial Jewelry E-Commerce Website

## 1. Project Overview

**Project Name:** NJYOT
**Type:** E-commerce Website with Admin Panel
**Core Functionality:** Premium artificial jewelry online store with product management, cart, checkout, and order tracking
**Target Users:** Fashion-conscious customers seeking elegant artificial jewelry; Store administrators

---

## 2. UI/UX Specification

### Layout Structure

**Customer Website Pages:**
- **Header:** Fixed navigation with logo, menu links, search, cart icon with badge, user account
- **Hero Section:** Full-width banner with featured collection
- **Product Grid:** Responsive grid (4 columns desktop, 2 tablet, 1 mobile)
- **Footer:** Links, newsletter signup, social icons, contact info

**Admin Panel Pages:**
- **Sidebar:** Navigation menu (Dashboard, Products, Orders, Customers)
- **Main Content:** Data tables, forms, statistics cards

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

### Visual Design

**Color Palette:**
- Primary: `#1A1A2E` (Deep Navy)
- Secondary: `#C9A962` (Gold Accent)
- Background: `#FAFAFA` (Off-White)
- Surface: `#FFFFFF` (White)
- Text Primary: `#1A1A2E`
- Text Secondary: `#6B7280`
- Success: `#059669`
- Error: `#DC2626`
- Light Gold: `#F5E6C8`

**Typography:**
- Headings: 'Playfair Display', serif (weights: 400, 600, 700)
- Body: 'Inter', sans-serif (weights: 300, 400, 500, 600)
- Logo: 'Playfair Display', 700
- H1: 48px / H2: 36px / H3: 24px / H4: 20px
- Body: 16px / Small: 14px

**Spacing System:**
- Base unit: 8px
- Section padding: 80px vertical
- Container max-width: 1400px
- Card padding: 24px
- Grid gap: 24px

**Visual Effects:**
- Box shadows: `0 4px 20px rgba(26, 26, 46, 0.08)`
- Hover shadows: `0 12px 40px rgba(26, 26, 46, 0.15)`
- Border radius: 12px (cards), 8px (buttons), 50% (badges)
- Transitions: 0.3s ease for all interactive elements
- Gold gradient accent: `linear-gradient(135deg, #C9A962 0%, #E5D4A1 50%, #C9A962 100%)`

### Components

**Navigation:**
- Logo (left), Menu links (center), Icons (right)
- Mobile: Hamburger menu with slide-out drawer
- Active link: Gold underline

**Buttons:**
- Primary: Gold background, navy text, hover darkens
- Secondary: Transparent with gold border
- Icon buttons: Circular with hover effect

**Product Cards:**
- Image container (aspect-ratio 1:1)
- Hover: Image scale 1.05, quick view button appears
- Title, price (original + sale), category badge
- Add to cart button on hover

**Admin Cards:**
- Statistics cards with icon, number, label
- Table rows with hover highlight
- Action buttons (edit, delete, view)
- Status badges (color-coded)

**Forms:**
- Floating labels
- Gold focus border
- Error states with red border and message

---

## 3. Functionality Specification

### Customer Features

**Homepage:**
- Hero banner with CTA button
- Featured categories (Necklaces, Earrings, Bracelets, Rings)
- New arrivals section (8 products)
- Why choose us section
- Newsletter signup

**Product Listing:**
- Filter by category, price range, sort by (price, name, newest)
- Grid/list view toggle
- Pagination (12 products per page)
- Search functionality

**Product Detail:**
- Image gallery with thumbnails
- Product info (name, price, description)
- Size/variant selector
- Quantity selector
- Add to cart / Buy now buttons
- Related products

**Shopping Cart:**
- Item list with image, name, quantity, price
- Update quantity / remove items
- Subtotal calculation
- Proceed to checkout button

**Checkout:**
- Shipping information form
- Order summary
- Payment method selection (placeholder)
- Place order button

**Order Tracking:**
- Order number input
- Status display with timeline
- Statuses: Pending → Processing → Shipped → Delivered

### Admin Panel Features

**Dashboard:**
- Total orders count
- Total products count
- Total revenue
- Recent orders table

**Product Management:**
- Product list with search, filter
- Add new product form (name, description, price, category, images, stock)
- Edit product
- Delete product (with confirmation)
- Bulk actions

**Order Management:**
- Order list with status filter
- View order details
- Update order status
- Order timeline

**Customer Management:**
- Customer list
- View customer details

---

## 4. Technical Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Node.js with Express
- **Database:** SQLite with better-sqlite3
- **File Uploads:** Multer
- **Session:** Express-session

---

## 5. Acceptance Criteria

### Visual Checkpoints
- [ ] Website loads with premium gold/navy theme
- [ ] All fonts load correctly (Playfair Display, Inter)
- [ ] Product cards display with hover effects
- [ ] Mobile menu works smoothly
- [ ] Admin panel has clean dashboard layout

### Functional Checkpoints
- [ ] Products display in grid from database
- [ ] Add to cart updates cart count
- [ ] Cart persists in session
- [ ] Checkout creates order
- [ ] Order tracking shows status
- [ ] Admin can add/edit/delete products
- [ ] Admin can update order status
- [ ] All pages are responsive

---

## 6. File Structure

```
/luxe-adorn
├── server.js              # Express server
├── database.js            # SQLite setup
├── package.json
├── /public
│   ├── /css
│   │   ├── style.css
│   │   ├── admin.css
│   │   └── responsive.css
│   ├── /js
│   │   ├── main.js
│   │   ├── cart.js
│   │   ├── admin.js
│   │   └── tracking.js
│   ├── /images
│   │   └── (placeholder images)
│   └── /uploads
├── /views
│   ├── index.html
│   ├── products.html
│   ├── product-detail.html
│   ├── cart.html
│   ├── checkout.html
│   ├── tracking.html
│   ├── /admin
│   │   ├── login.html
│   │   ├── dashboard.html
│   │   ├── products.html
│   │   ├── orders.html
│   │   └── product-form.html
└── /routes
    └── api.js             # API endpoints
```
