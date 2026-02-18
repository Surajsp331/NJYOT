// NJYOT - Featured Products Loader
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/products?featured=true');
    const products = await response.json();

    const container = document.getElementById('featured-products');
    if (!container) return;

    products.forEach(product => {
      const price = product.sale_price || product.price;
      const originalPrice = product.sale_price ? product.price : null;

      const card = document.createElement('div');
      card.className = 'product-card';
      card.dataset.productId = product.id;

      const productJson = JSON.stringify(product).replace(/"/g, '&quot;');

      card.innerHTML = `
        <div class="product-image">
          <img src="${product.image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'}" alt="${product.name}">
          ${product.sale_price ? '<span class="product-badge">Sale</span>' : ''}
          <div class="product-actions">
            <button class="product-action-btn quick-view" title="Quick Shop" onclick="openQuickShop(${productJson})">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            <button class="product-action-btn quick-add" title="Quick Add" onclick="addToCartFromCard(${product.id})">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </div>
        <div class="product-info">
          <p class="product-category">${product.category_name || ''}</p>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-price">
            <span class="current-price">₹${price.toLocaleString('en-IN')}</span>
            ${originalPrice ? `<span class="original-price">₹${originalPrice.toLocaleString('en-IN')}</span>` : ''}
          </div>
          <button class="add-to-cart-btn" onclick="openQuickShop(${productJson})">Quick Shop</button>
        </div>
      `;

      container.appendChild(card);
    });

    // Re-initialize cart functionality
    if (typeof initProductCards === 'function') {
      initProductCards();
    }
  } catch (error) {
    console.error('Error loading products:', error);
  }
});
