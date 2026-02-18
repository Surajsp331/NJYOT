// Main JavaScript for NJYOT

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  loadSiteSettings();
  initHeader();
  initMobileMenu();
  initCart();
  initNewsletter();
  initProductCards();
});

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

// Product Cards
function initProductCards() {
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
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
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 9999;
    padding: 16px 24px;
    background: ${type === 'success' ? '#059669' : '#DC2626'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Close button
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.remove();
  });

  // Auto remove
  setTimeout(() => {
    notification.remove();
  }, 3000);
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
