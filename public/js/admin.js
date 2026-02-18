// Admin Panel JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on admin pages
  if (window.location.pathname.includes('/admin')) {
    checkAuth();
  }

  // Initialize based on current page
  if (document.querySelector('.admin-login')) {
    initLogin();
  } else if (document.querySelector('.dashboard-page')) {
    initDashboard();
  } else if (document.querySelector('.products-page')) {
    initProducts();
  } else if (document.querySelector('.orders-page')) {
    initOrders();
  } else if (document.querySelector('.product-form-page')) {
    initProductForm();
  }
});

// Auth Check
async function checkAuth() {
  // Skip auth check on login page
  if (window.location.pathname === '/admin/login') return;

  try {
    const response = await fetch('/api/admin/stats');
    if (response.status === 401) {
      window.location.href = '/admin/login';
    }
  } catch (error) {
    window.location.href = '/admin/login';
  }
}

// Login
function initLogin() {
  const form = document.querySelector('.login-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.querySelector('[name="username"]').value;
    const password = form.querySelector('[name="password"]').value;

    try {
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = '/admin';
      } else {
        const errorEl = document.querySelector('.login-error');
        if (errorEl) {
          errorEl.textContent = data.error || 'Invalid credentials';
          errorEl.style.display = 'block';
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  });
}

// Logout
async function logout() {
  try {
    await fetch('/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  } catch (error) {
    console.error('Logout error:', error);
  }
}

// Dashboard
async function initDashboard() {
  await loadStats();
}

async function loadStats() {
  try {
    const response = await fetch('/api/admin/stats');
    const stats = await response.json();

    // Update stat cards
    document.querySelector('.stat-orders .stat-value').textContent = stats.totalOrders;
    document.querySelector('.stat-products .stat-value').textContent = stats.totalProducts;
    document.querySelector('.stat-revenue .stat-value').textContent = `₹${(stats.totalRevenue || 0).toLocaleString('en-IN')}`;
    document.querySelector('.stat-pending .stat-value').textContent = stats.pendingOrders;

    // Render recent orders
    const tbody = document.querySelector('.recent-orders tbody');
    if (tbody && stats.recentOrders) {
      tbody.innerHTML = stats.recentOrders.map(order => `
        <tr>
          <td>${order.order_number}</td>
          <td>${order.customer_name}</td>
          <td>₹${order.total.toLocaleString('en-IN')}</td>
          <td><span class="status-badge ${order.status}">${order.status}</span></td>
          <td>${new Date(order.created_at).toLocaleDateString()}</td>
        </tr>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

// Products
async function initProducts() {
  loadProducts();
  setupProductFilters();
}

async function loadProducts() {
  try {
    const response = await fetch('/api/admin/products');
    const products = await response.json();

    const tbody = document.querySelector('.products-table tbody');
    if (!tbody) return;

    if (products.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px;">No products found</td></tr>';
      return;
    }

    tbody.innerHTML = products.map(product => `
      <tr>
        <td>
          <div class="product-cell">
            <img src="${product.image || '/images/placeholder.jpg'}" alt="${product.name}" class="product-thumb">
            <div class="product-info">
              <h4>${product.name}</h4>
              <p>${product.category_name || 'Uncategorized'}</p>
            </div>
          </div>
        </td>
        <td>
          <span style="${product.sale_price ? 'text-decoration: line-through; color: #6B7280;' : ''}">₹${product.price.toLocaleString('en-IN')}</span>
          ${product.sale_price ? `<span style="color: #059669; font-weight: 600; margin-left: 8px;">₹${product.sale_price.toLocaleString('en-IN')}</span>` : ''}
        </td>
        <td>${product.stock || 0}</td>
        <td>${product.featured ? '<span style="color: #059669;">Yes</span>' : 'No'}</td>
        <td>${new Date(product.created_at).toLocaleDateString()}</td>
        <td>
          <div class="action-btns">
            <a href="/admin/products/${product.id}/edit" class="action-btn edit" title="Edit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </a>
            <button class="action-btn delete" onclick="deleteProduct(${product.id})" title="Delete">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

function setupProductFilters() {
  const searchInput = document.querySelector('.products-search input');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(() => {
      loadProducts(searchInput.value);
    }, 300));
  }
}

async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return;

  try {
    const response = await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (data.success) {
      loadProducts();
    } else {
      alert(data.error || 'Failed to delete product');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

// Orders
async function initOrders() {
  loadOrders();
}

async function loadOrders() {
  try {
    const response = await fetch('/api/admin/orders');
    const orders = await response.json();

    const tbody = document.querySelector('.orders-table tbody');
    if (!tbody) return;

    if (orders.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px;">No orders found</td></tr>';
      return;
    }

    tbody.innerHTML = orders.map(order => `
      <tr>
        <td>${order.order_number}</td>
        <td>${order.customer_name}</td>
        <td>${order.customer_email}</td>
        <td>₹${order.total.toLocaleString('en-IN')}</td>
        <td><span class="status-badge ${order.status}">${order.status}</span></td>
        <td>
          <div class="action-btns">
            <button class="action-btn view" onclick="viewOrder(${order.id})" title="View Details">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button class="action-btn edit" onclick="openOrderModal(${order.id})" title="Update Status">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading orders:', error);
  }
}

async function viewOrder(orderId) {
  try {
    const response = await fetch(`/api/admin/orders/${orderId}`);
    const data = await response.json();

    const { order, items, tracking } = data;

    // Build items HTML
    const itemsHTML = items.map(item => `
      <div class="info-row">
        <span>${item.product_name} x ${item.quantity}</span>
        <span>₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
      </div>
    `).join('');

    // Build tracking HTML
    const trackingHTML = tracking.map(t => `
      <div class="info-row">
        <span>${t.status}</span>
        <span>${new Date(t.created_at).toLocaleString()}</span>
      </div>
    `).join('');

    // Show in modal or alert
    alert(`
Order: ${order.order_number}
Customer: ${order.customer_name}
Email: ${order.customer_email}
Address: ${order.shipping_address}
Total: ₹${order.total.toLocaleString('en-IN')}
Status: ${order.status}

Items:
${items.map(i => `- ${i.product_name} x ${i.quantity} = ₹${(i.price * i.quantity).toLocaleString()}`).join('\n')}
    `.trim());
  } catch (error) {
    console.error('Error viewing order:', error);
  }
}

async function openOrderModal(orderId) {
  const modal = document.getElementById('orderModal');
  if (!modal) return;

  // Load order details
  try {
    const response = await fetch(`/api/admin/orders/${orderId}`);
    const data = await response.json();

    const { order } = data;

    // Set current status
    modal.dataset.orderId = orderId;

    // Show modal
    modal.classList.add('active');
  } catch (error) {
    console.error('Error loading order:', error);
  }
}

async function updateOrderStatus(status) {
  const modal = document.getElementById('orderModal');
  if (!modal) return;

  const orderId = modal.dataset.orderId;

  try {
    const response = await fetch(`/api/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    const data = await response.json();

    if (data.success) {
      modal.classList.remove('active');
      loadOrders();
    }
  } catch (error) {
    console.error('Error updating status:', error);
  }
}

// Product Form
async function initProductForm() {
  // Load categories
  await loadCategories();

  // Check if editing
  const path = window.location.pathname;
  const editMatch = path.match(/\/admin\/products\/(\d+)\/edit/);

  if (editMatch) {
    await loadProduct(editMatch[1]);
  }

  // Form submission
  const form = document.querySelector('.product-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const isEdit = form.dataset.editId;

    const url = isEdit ? `/api/admin/products/${isEdit}` : '/api/admin/products';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = '/admin/products';
      } else {
        alert(data.error || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  });

  // Image preview
  const imageInput = form.querySelector('[name="image"]');
  if (imageInput) {
    imageInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          let preview = form.querySelector('.image-preview');
          if (!preview) {
            preview = document.createElement('img');
            preview.className = 'image-preview';
            imageInput.parentElement.appendChild(preview);
          }
          preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

async function loadCategories() {
  try {
    const response = await fetch('/api/admin/categories');
    const categories = await response.json();

    const select = document.querySelector('[name="category_id"]');
    if (!select) return;

    select.innerHTML = categories.map(cat =>
      `<option value="${cat.id}">${cat.name}</option>`
    ).join('');
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

async function loadProduct(id) {
  try {
    const response = await fetch(`/api/admin/products/${id}`);
    const product = await response.json();

    const form = document.querySelector('.product-form');
    if (!form) return;

    form.dataset.editId = id;

    // Fill form
    form.querySelector('[name="name"]').value = product.name;
    form.querySelector('[name="description"]').value = product.description || '';
    form.querySelector('[name="price"]').value = product.price;
    form.querySelector('[name="sale_price"]').value = product.sale_price || '';
    form.querySelector('[name="category_id"]').value = product.category_id;
    form.querySelector('[name="stock"]').value = product.stock || 0;
    form.querySelector('[name="featured"]').checked = product.featured === 1;

    // Show existing image
    if (product.image) {
      const imageContainer = form.querySelector('.image-upload');
      if (imageContainer) {
        let preview = imageContainer.querySelector('.image-preview');
        if (!preview) {
          preview = document.createElement('img');
          preview.className = 'image-preview';
          imageContainer.appendChild(preview);
        }
        preview.src = product.image;
      }
    }
  } catch (error) {
    console.error('Error loading product:', error);
  }
}

// Utilities
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Close modal
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
  if (e.target.classList.contains('modal-close')) {
    e.target.closest('.modal-overlay').classList.remove('active');
  }
});
