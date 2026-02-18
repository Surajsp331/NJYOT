// Cart JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initCartPage();
  initCheckout();
});

// Cart Page
function initCartPage() {
  if (!document.querySelector('.cart-items')) return;

  loadCart();
}

async function loadCart() {
  try {
    const response = await fetch('/api/cart');
    const data = await response.json();

    const cartItemsEl = document.querySelector('.cart-items');

    if (!data.cart || data.cart.length === 0) {
      cartItemsEl.innerHTML = `
        <div class="cart-empty">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <a href="/products" class="btn btn-primary">Continue Shopping</a>
        </div>
      `;
      return;
    }

    // Render cart items
    let cartHTML = `
      <div class="cart-header">
        <div>Product</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Total</div>
      </div>
    `;

    data.cart.forEach(item => {
      const itemTotal = (item.sale_price || item.price) * item.quantity;
      cartHTML += `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-product">
            <div class="cart-item-image">
              <img src="${item.image || '/images/placeholder.jpg'}" alt="${item.name}">
            </div>
            <div>
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-category">Qty: ${item.quantity}</div>
            </div>
          </div>
          <div class="cart-item-price">
            ₹${(item.sale_price || item.price).toLocaleString('en-IN')}
          </div>
          <div class="cart-item-quantity">
            <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
          <div>
            <div class="cart-item-total">₹${itemTotal.toLocaleString('en-IN')}</div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
          </div>
        </div>
      `;
    });

    cartItemsEl.innerHTML = cartHTML;

    // Update summary
    const summaryTotal = document.querySelector('.summary-total .amount');
    if (summaryTotal) {
      summaryTotal.textContent = `₹${data.total.toLocaleString('en-IN')}`;
    }
  } catch (error) {
    console.error('Error loading cart:', error);
  }
}

async function updateQuantity(productId, quantity) {
  try {
    const response = await fetch('/api/cart/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    });

    const data = await response.json();

    if (data.success) {
      loadCart();

      // Update badges
      const badges = document.querySelectorAll('.cart-badge');
      badges.forEach(badge => badge.textContent = data.cartCount);
    }
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
}

async function removeFromCart(productId) {
  try {
    const response = await fetch('/api/cart/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });

    const data = await response.json();

    if (data.success) {
      loadCart();

      // Update badges
      const badges = document.querySelectorAll('.cart-badge');
      badges.forEach(badge => badge.textContent = data.cartCount);
    }
  } catch (error) {
    console.error('Error removing item:', error);
  }
}

// Checkout
function initCheckout() {
  const checkoutForm = document.querySelector('.checkout-form');
  if (!checkoutForm) return;

  checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(checkoutForm);
    const orderData = {
      customer_name: formData.get('name'),
      customer_email: formData.get('email'),
      customer_phone: formData.get('phone'),
      shipping_address: formData.get('address'),
      payment_method: formData.get('payment_method') || 'cod'
    };

    // Validation
    if (!orderData.customer_name || !orderData.customer_email || !orderData.shipping_address) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (data.success) {
        // Update cart badges
        const badges = document.querySelectorAll('.cart-badge');
        badges.forEach(badge => badge.textContent = '0');

        // Redirect to tracking
        window.location.href = `/tracking?order=${data.orderNumber}`;
      } else {
        alert(data.error || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  });

  // Load order summary
  loadOrderSummary();
}

async function loadOrderSummary() {
  try {
    const response = await fetch('/api/cart');
    const data = await response.json();

    const orderItemsEl = document.querySelector('.order-items');
    if (!orderItemsEl) return;

    if (!data.cart || data.cart.length === 0) {
      window.location.href = '/cart';
      return;
    }

    let html = '';
    let subtotal = 0;

    data.cart.forEach(item => {
      const itemTotal = (item.sale_price || item.price) * item.quantity;
      subtotal += itemTotal;

      html += `
        <div class="order-item">
          <div class="order-item-image">
            <img src="${item.image || '/images/placeholder.jpg'}" alt="${item.name}">
          </div>
          <div class="order-item-info">
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-qty">Qty: ${item.quantity}</div>
          </div>
          <div class="order-item-price">₹${itemTotal.toLocaleString('en-IN')}</div>
        </div>
      `;
    });

    orderItemsEl.innerHTML = html;

    // Update totals
    const subtotalEl = document.querySelector('.summary-subtotal .amount');
    const totalEl = document.querySelector('.summary-total .amount');

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (totalEl) totalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  } catch (error) {
    console.error('Error loading order summary:', error);
  }
}
