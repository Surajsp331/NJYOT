// Quick Shop Modal Functionality

// Create modal HTML dynamically
function createQuickShopModal() {
  const modal = document.createElement('div');
  modal.className = 'quick-shop-modal';
  modal.id = 'quickShopModal';
  modal.innerHTML = `
    <div class="quick-shop-content">
      <button class="quick-shop-close" onclick="closeQuickShop()">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="quick-shop-image">
        <img id="quickShopImage" src="" alt="">
      </div>
      <div class="quick-shop-details">
        <span class="quick-shop-category" id="quickShopCategory"></span>
        <h2 class="quick-shop-title" id="quickShopTitle"></h2>
        <div class="quick-shop-price">
          <span class="quick-shop-current-price" id="quickShopPrice"></span>
          <span class="quick-shop-original-price" id="quickShopOriginalPrice"></span>
          <span class="quick-shop-discount" id="quickShopDiscount"></span>
        </div>
        <p class="quick-shop-description" id="quickShopDescription"></p>

        <div class="variant-section">
          <label class="variant-label">Select Color</label>
          <div class="variant-options" id="colorOptions"></div>
        </div>

        <div class="variant-section">
          <label class="variant-label">Select Size</label>
          <div class="variant-options" id="sizeOptions"></div>
        </div>

        <div class="quantity-selector">
          <label class="variant-label" style="margin-bottom: 0;">Quantity</label>
          <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
          <span class="quantity-value" id="quantityValue">1</span>
          <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
        </div>

        <div class="quick-shop-actions">
          <button class="quick-shop-btn quick-shop-add-cart" onclick="addToCartFromModal()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 75 3 75 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            Add to Cart
          </button>
          <button class="quick-shop-btn quick-shop-buy-now" onclick="buyNowFromModal()">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeQuickShop();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuickShop();
    }
  });
}

let currentQuickShopProduct = null;
let selectedColor = null;
let selectedSize = null;
let currentQuantity = 1;

function openQuickShop(product) {
  if (!document.getElementById('quickShopModal')) {
    createQuickShopModal();
  }

  currentQuickShopProduct = product;
  currentQuantity = 1;
  selectedColor = null;
  selectedSize = null;

  // Set product details
  document.getElementById('quickShopImage').src = product.image || '/images/placeholder.jpg';
  document.getElementById('quickShopCategory').textContent = product.category_name || '';
  document.getElementById('quickShopTitle').textContent = product.name;
  document.getElementById('quickShopDescription').textContent = product.description;

  const price = product.sale_price || product.price;
  const originalPrice = product.sale_price ? product.price : null;
  document.getElementById('quickShopPrice').textContent = '₹' + price.toLocaleString('en-IN');

  if (originalPrice) {
    document.getElementById('quickShopOriginalPrice').textContent = '₹' + originalPrice.toLocaleString('en-IN');
    document.getElementById('quickShopOriginalPrice').style.display = 'inline';
    const discount = Math.round((1 - price / originalPrice) * 100);
    document.getElementById('quickShopDiscount').textContent = '-' + discount + '%';
    document.getElementById('quickShopDiscount').style.display = 'inline';
  } else {
    document.getElementById('quickShopOriginalPrice').style.display = 'none';
    document.getElementById('quickShopDiscount').style.display = 'none';
  }

  // Generate color options
  const colors = ['Gold', 'Silver', 'Rose Gold', 'Antique'];
  const colorOptionsHTML = colors.map((color, index) => `
    <div class="color-option ${index === 0 ? 'active' : ''}"
         style="background: ${getColorHex(color)}"
         onclick="selectColor('${color}')"
         title="${color}">
    </div>
  `).join('');
  document.getElementById('colorOptions').innerHTML = colorOptionsHTML;
  selectedColor = colors[0];

  // Generate size options
  const sizes = ['One Size', '6', '7', '8'];
  const sizeOptionsHTML = sizes.map(size => `
    <div class="variant-option ${size === 'One Size' ? 'active' : ''}"
         onclick="selectSize('${size}')">
      ${size}
    </div>
  `).join('');
  document.getElementById('sizeOptions').innerHTML = sizeOptionsHTML;
  selectedSize = 'One Size';

  // Reset quantity
  document.getElementById('quantityValue').textContent = '1';

  // Show modal
  const modal = document.getElementById('quickShopModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function getColorHex(colorName) {
  const colors = {
    'Gold': 'linear-gradient(135deg, #FFD700 0%, #DAA520 100%)',
    'Silver': 'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)',
    'Rose Gold': 'linear-gradient(135deg, #B76E79 0%, #E8B4B8 100%)',
    'Antique': 'linear-gradient(135deg, #8B7355 0%, #C4A77D 100%)'
  };
  return colors[colorName] || '#ccc';
}

function selectColor(color) {
  selectedColor = color;
  document.querySelectorAll('.color-option').forEach(opt => {
    opt.classList.toggle('active', opt.title === color);
  });
}

function selectSize(size) {
  selectedSize = size;
  document.querySelectorAll('#sizeOptions .variant-option').forEach(opt => {
    opt.classList.toggle('active', opt.textContent === size);
  });
}

function changeQuantity(delta) {
  currentQuantity = Math.max(1, currentQuantity + delta);
  document.getElementById('quantityValue').textContent = currentQuantity;
}

function closeQuickShop() {
  const modal = document.getElementById('quickShopModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

async function addToCartFromModal() {
  if (!currentQuickShopProduct) return;

  try {
    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: currentQuickShopProduct.id,
        quantity: currentQuantity,
        color: selectedColor,
        size: selectedSize
      })
    });

    const data = await response.json();

    if (data.success) {
      // Update cart badges
      const badges = document.querySelectorAll('.cart-badge');
      badges.forEach(badge => {
        badge.textContent = data.cartCount;
      });
      showNotification('Product added to cart!', 'success');
      closeQuickShop();
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    showNotification('Failed to add to cart', 'error');
  }
}

async function buyNowFromModal() {
  await addToCartFromModal();
  window.location.href = '/checkout';
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  createQuickShopModal();
});
