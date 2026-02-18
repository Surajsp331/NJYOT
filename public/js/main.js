// Main JavaScript for NJYOT

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  loadSiteSettings();
  initHeader();
  initMobileMenu();
  initCart();
  initNewsletter();

  // Check if we are on the homepage
  if (document.getElementById('featured-products')) {
    loadFeaturedProducts();
  } else {
    initProductCards(); // For other pages that might have static cards
  }
});

// Load Featured Products
async function loadFeaturedProducts() {
  try {
    const response = await fetch('/api/products?featured=true');
    const products = await response.json();
    const container = document.getElementById('featured-products');

    if (!container) return;

    if (products.length === 0) {
      container.innerHTML = '<p class="no-products">No featured products found.</p>';
      return;
    }

    container.innerHTML = products.slice(0, 8).map(product => `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-image">
          <img src="${product.image || 'https://via.placeholder.com/300'}" alt="${product.name}" loading="lazy">
          <span class="product-badge">New</span>
          <div class="product-actions">
            <button class="product-action-btn quick-add" title="Add to Cart">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <a href="/product/${product.slug}" class="product-action-btn" title="View Details">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </a>
          </div>
        </div>
        <div class="product-info">
          <p class="product-category">${product.category_name || 'Jewelry'}</p>
          <h3 class="product-title"><a href="/product/${product.slug}">${product.name}</a></h3>
          <div class="product-price">
            <span class="current-price">₹${product.price.toLocaleString('en-IN')}</span>
            ${product.sale_price ? `<span class="original-price">₹${product.sale_price.toLocaleString('en-IN')}</span>` : ''}
          </div>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    `).join('');

    // Initialize event listeners for the new cards
    initProductCards();

  } catch (error) {
    console.error('Error loading featured products:', error);
  }
}

// Load site settings from server
async function loadSiteSettings() {
  try {
    const response = await fetch('/api/settings');
    const settings = await response.json();

    // Update site name in header
    const siteNameElements = document.querySelectorAll('.site-name');
    siteNameElements.forEach(el => {
      if (settings.site_name) {
        el.textContent = settings.site_name;
      }
    });

    // Update logo span (for backward compatibility)
    const logoSpans = document.querySelectorAll('.logo span');
    logoSpans.forEach(el => {
      if (settings.site_name) {
        el.textContent = settings.site_name;
      }
    });

    // Update contact info in footer
    const phoneElements = document.querySelectorAll('.contact-phone');
    phoneElements.forEach(el => {
      if (settings.contact_phone) {
        // Preserve the label prefix
        const text = el.textContent;
        if (text.includes('Phone:')) {
          el.textContent = 'Phone: ' + settings.contact_phone;
        } else {
          el.textContent = settings.contact_phone;
        }
      }
    });

    const emailElements = document.querySelectorAll('.contact-email');
    emailElements.forEach(el => {
      if (settings.contact_email) {
        const text = el.textContent;
        if (text.includes('Email:')) {
          el.textContent = 'Email: ' + settings.contact_email;
        } else {
          el.textContent = settings.contact_email;
        }
      }
    });

    const addressElements = document.querySelectorAll('.contact-address');
    addressElements.forEach(el => {
      if (settings.contact_address) {
        const text = el.textContent;
        if (text.includes('Address:')) {
          el.textContent = 'Address: ' + settings.contact_address;
        } else {
          el.textContent = settings.contact_address;
        }
      }
    });

  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

// Header Scroll Effect
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile Menu
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuBtn.classList.toggle('active');
    });
  }
}

// Cart Functions
function initCart() {
  updateCartDisplay();
}

async function updateCartDisplay() {
  try {
    const response = await fetch('/api/cart');
    const data = await response.json();

    // Update cart badge
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = data.cartCount || 0;
    });

    // Update cart total display if exists
    const cartTotalEl = document.querySelector('.cart-total-display');
    if (cartTotalEl) {
      cartTotalEl.textContent = `₹${data.cartTotal?.toLocaleString() || 0}`;
    }
  } catch (error) {
    console.error('Error updating cart:', error);
  }
}

async function addToCart(productId, quantity = 1) {
  try {
    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    });

    const data = await response.json();

    if (data.success) {
      // Update cart badges
      const badges = document.querySelectorAll('.cart-badge');
      badges.forEach(badge => {
        badge.textContent = data.cartCount;
      });

      // Show success notification
      showNotification('Product added to cart!', 'success');
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    showNotification('Failed to add to cart', 'error');
  }
}

// Add to cart from product card
async function addToCartFromCard(productId) {
  await addToCart(productId, 1);
}

// Product Cards
function initProductCards() {
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    // Avoid double binding
    if (card.dataset.initialized === 'true') return;
    card.dataset.initialized = 'true';

    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    const quickAddBtn = card.querySelector('.quick-add');

    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', async () => {
        const productId = card.dataset.productId;
        await addToCart(productId);
      });
    }

    if (quickAddBtn) {
      quickAddBtn.addEventListener('click', async () => {
        const productId = card.dataset.productId;
        await addToCart(productId);
      });
    }
  });
}

// Newsletter
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input').value;

    if (email) {
      showNotification('Thank you for subscribing!', 'success');
      form.reset();
    }
  });
}

// Notification
function showNotification(message, type = 'success') {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;

  let actionHtml = '';
  if (type === 'success' && message.toLowerCase().includes('cart')) {
    actionHtml = `<a href="/cart" class="notification-action">Checkout</a>`;
  }

  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      ${actionHtml}
      <button class="notification-close">&times;</button>
    </div>
  `;

  // Add styles dynamically if not in CSS
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    padding: 16px 24px;
    background: ${type === 'success' ? '#0F172A' : '#EF4444'};
    color: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    animation: slideIn 0.3s ease forwards;
    display: flex;
    align-items: center;
    gap: 12px;
    border: 1px solid rgba(255,255,255,0.1);
  `;

  if (type === 'success') {
    notification.style.borderLeft = '4px solid #D4AF37';
  }

  document.body.appendChild(notification);

  // Style the action button
  const actionBtn = notification.querySelector('.notification-action');
  if (actionBtn) {
    actionBtn.style.cssText = `
      background: #D4AF37;
      color: #0F172A;
      padding: 6px 14px;
      border-radius: 20px;
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      margin-left: 10px;
      transition: all 0.2s;
    `;
    actionBtn.onmouseover = () => { actionBtn.style.background = '#F3E5AB'; };
    actionBtn.onmouseout = () => { actionBtn.style.background = '#D4AF37'; };
  }

  // Style close button
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: rgba(255,255,255,0.6);
    cursor: pointer;
    font-size: 20px;
    margin-left: 8px;
    display: flex;
    align-items: center;
  `;
  closeBtn.onmouseover = () => { closeBtn.style.color = '#fff'; };

  // Close button action
  closeBtn.addEventListener('click', () => {
    notification.remove();
  });

  // Auto remove
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Add slideIn animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(style);

// Format Price
function formatPrice(price) {
  return `₹${(price || 0).toLocaleString('en-IN')}`;
}

// URL Params
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    category: params.get('category'),
    search: params.get('search'),
    sort: params.get('sort'),
    page: params.get('page') || 1
  };
}

// Build URL with params
function buildUrl(baseUrl, params) {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
}
