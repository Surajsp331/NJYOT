// Order Tracking JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initTracking();
});

function initTracking() {
  const searchForm = document.querySelector('.tracking-search form');
  const orderInput = document.querySelector('.tracking-input input');

  // Check for order in URL
  const urlParams = new URLSearchParams(window.location.search);
  const orderNumber = urlParams.get('order');

  if (orderNumber) {
    orderInput.value = orderNumber;
    searchForm.dispatchEvent(new Event('submit'));
  }

  if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const orderNumber = orderInput.value.trim();

      if (!orderNumber) {
        alert('Please enter your order number');
        return;
      }

      await loadTracking(orderNumber);
    });
  }
}

async function loadTracking(orderNumber) {
  const resultContainer = document.querySelector('.tracking-result');

  if (!resultContainer) return;

  resultContainer.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

  try {
    const response = await fetch(`/api/orders/${orderNumber}`);
    const data = await response.json();

    if (response.status === 404) {
      resultContainer.innerHTML = `
        <div class="alert alert-error">
          Order not found. Please check your order number and try again.
        </div>
      `;
      return;
    }

    const { order, items, tracking } = data;

    // Build tracking timeline
    const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
    const currentStatusIndex = statusOrder.indexOf(order.status);

    let timelineHTML = '';
    tracking.forEach(t => {
      const isActive = statusOrder.indexOf(t.status) <= currentStatusIndex;
      timelineHTML += `
        <div class="timeline-item ${isActive ? 'active' : ''}">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <h4>${t.status.charAt(0).toUpperCase() + t.status.slice(1)}</h4>
            <p>${t.description}</p>
            <div class="timeline-date">${new Date(t.created_at).toLocaleString()}</div>
          </div>
        </div>
      `;
    });

    // Build order items
    let itemsHTML = '';
    items.forEach(item => {
      itemsHTML += `
        <div class="order-item">
          <div class="order-item-info">
            <div class="order-item-name">${item.product_name}</div>
            <div class="order-item-qty">Qty: ${item.quantity}</div>
          </div>
          <div class="order-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
        </div>
      `;
    });

    resultContainer.innerHTML = `
      <div class="tracking-header">
        <div>
          <div class="order-number">Order Number</div>
          <strong>${order.order_number}</strong>
        </div>
        <span class="status-badge ${order.status}">${order.status}</span>
      </div>

      <div class="order-detail-grid">
        <div>
          <div class="order-info-card">
            <h3>Order Items</h3>
            <div class="order-items">${itemsHTML}</div>
          </div>
        </div>
        <div>
          <div class="order-info-card">
            <h3>Shipping Details</h3>
            <div class="info-row">
              <span class="info-label">Name</span>
              <span class="info-value">${order.customer_name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email</span>
              <span class="info-value">${order.customer_email}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Phone</span>
              <span class="info-value">${order.customer_phone || 'N/A'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Address</span>
              <span class="info-value">${order.shipping_address}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Total</span>
              <span class="info-value" style="color: var(--secondary); font-size: 18px;">₹${order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 32px;">
        <h3 style="margin-bottom: 24px;">Order Timeline</h3>
        <div class="tracking-timeline">
          ${timelineHTML}
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error loading tracking:', error);
    resultContainer.innerHTML = `
      <div class="alert alert-error">
        Something went wrong. Please try again.
      </div>
    `;
  }
}
