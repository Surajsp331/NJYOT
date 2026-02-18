const express = require('express');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { initDatabase, runQuery, getRow, getAll, getSetting, updateSetting, getAllSettings, db } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Session setup
app.use(session({
  secret: 'luxe-adorn-secret-key-2024',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Make cart available to all templates
app.use((req, res, next) => {
  res.locals.cart = req.session.cart || [];
  res.locals.cartTotal = req.session.cart ? req.session.cart.reduce((sum, item) => sum + (item.sale_price || item.price) * item.quantity, 0) : 0;
  res.locals.cartCount = req.session.cart ? req.session.cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
  res.locals.adminUser = req.session.adminUser || null;
  next();
});

// ============ CUSTOMER ROUTES ============

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Products page
app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'products.html'));
});

// Product detail page
app.get('/product/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'product-detail.html'));
});

// Cart page
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'cart.html'));
});

// Checkout page
app.get('/checkout', (req, res) => {
  if (!req.session.cart || req.session.cart.length === 0) {
    return res.redirect('/cart');
  }
  res.sendFile(path.join(__dirname, 'views', 'checkout.html'));
});

// Order tracking page
app.get('/tracking', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'tracking.html'));
});

// ============ API ROUTES ============

// Get cart
app.get('/api/cart', (req, res) => {
  res.json({ cart: req.session.cart || [], total: res.locals.cartTotal });
});

// Add to cart
app.post('/api/cart/add', (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = getRow('SELECT * FROM products WHERE id = ?', [productId]);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existingItem = req.session.cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    req.session.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      sale_price: product.sale_price,
      image: product.image,
      quantity: quantity
    });
  }

  const cartCount = req.session.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = req.session.cart.reduce((sum, item) => sum + (item.sale_price || item.price) * item.quantity, 0);

  res.json({ success: true, cartCount, cartTotal, cart: req.session.cart });
});

// Update cart
app.post('/api/cart/update', (req, res) => {
  const { productId, quantity } = req.body;

  if (!req.session.cart) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const item = req.session.cart.find(item => item.id === productId);
  if (item) {
    if (quantity <= 0) {
      req.session.cart = req.session.cart.filter(item => item.id !== productId);
    } else {
      item.quantity = quantity;
    }
  }

  const cartCount = req.session.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = req.session.cart.reduce((sum, item) => sum + (item.sale_price || item.price) * item.quantity, 0);

  res.json({ success: true, cartCount, cartTotal, cart: req.session.cart });
});

// Remove from cart
app.post('/api/cart/remove', (req, res) => {
  const { productId } = req.body;

  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => item.id !== productId);
  }

  const cartCount = req.session.cart ? req.session.cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const cartTotal = req.session.cart ? req.session.cart.reduce((sum, item) => sum + (item.sale_price || item.price) * item.quantity, 0) : 0;

  res.json({ success: true, cartCount, cartTotal, cart: req.session.cart || [] });
});

// Place order
app.post('/api/orders', (req, res) => {
  const { customer_name, customer_email, customer_phone, shipping_address, payment_method } = req.body;

  if (!req.session.cart || req.session.cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const orderNumber = 'LA' + Date.now() + Math.floor(Math.random() * 1000);
  const total = req.session.cart.reduce((sum, item) => sum + (item.sale_price || item.price) * item.quantity, 0);

  const orderResult = runQuery(
    'INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, shipping_address, total, payment_method, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [orderNumber, customer_name, customer_email, customer_phone, shipping_address, total, payment_method, 'pending']
  );

  const orderId = orderResult.lastInsertRowid;

  // Insert order items
  req.session.cart.forEach(item => {
    runQuery(
      'INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES (?, ?, ?, ?, ?)',
      [orderId, item.id, item.name, item.quantity, item.sale_price || item.price]
    );
  });

  // Insert initial tracking
  runQuery(
    'INSERT INTO order_tracking (order_id, status, description) VALUES (?, ?, ?)',
    [orderId, 'pending', 'Order placed successfully']
  );

  // Clear cart
  req.session.cart = [];

  res.json({ success: true, orderNumber, orderId });
});

// Get order by order number (for tracking)
app.get('/api/orders/:orderNumber', (req, res) => {
  const order = getRow('SELECT * FROM orders WHERE order_number = ?', [req.params.orderNumber]);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const items = getAll('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
  const tracking = getAll('SELECT * FROM order_tracking WHERE order_id = ? ORDER BY created_at ASC', [order.id]);

  res.json({ order, items, tracking });
});

// Get all products (API)
app.get('/api/products', (req, res) => {
  const { category, search, featured } = req.query;
  let query = `
    SELECT p.*, c.name as category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE 1=1
  `;
  const params = [];

  if (category) {
    query += ' AND c.slug = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  if (featured) {
    query += ' AND p.featured = 1';
  }

  query += ' ORDER BY p.created_at DESC';

  const products = getAll(query, params);
  res.json(products);
});

// Get categories (API)
app.get('/api/categories', (req, res) => {
  const categories = getAll('SELECT * FROM categories');
  res.json(categories);
});

// ============ ADMIN ROUTES ============

// Admin login page
app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'login.html'));
});

// Admin login
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  const admin = getRow('SELECT * FROM admin_users WHERE username = ?', [username]);

  if (admin && require('bcryptjs').compareSync(password, admin.password)) {
    req.session.adminUser = admin;
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Admin logout
app.post('/admin/logout', (req, res) => {
  req.session.adminUser = null;
  res.json({ success: true });
});

// Admin middleware
const requireAdmin = (req, res, next) => {
  if (!req.session.adminUser) {
    return res.redirect('/admin/login');
  }
  next();
};

// Admin dashboard
app.get('/admin', requireAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'dashboard.html'));
});

// Admin products
app.get('/admin/products', requireAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'products.html'));
});

// Admin orders
app.get('/admin/orders', requireAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'orders.html'));
});

// Admin settings
app.get('/admin/settings', requireAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'settings.html'));
});

// Admin product form
app.get('/admin/products/new', requireAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'product-form.html'));
});

app.get('/admin/products/:id/edit', requireAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'product-form.html'));
});

// Admin API - Get all products
app.get('/api/admin/products', requireAdmin, (req, res) => {
  const products = getAll(`
    SELECT p.*, c.name as category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.created_at DESC
  `);
  res.json(products);
});

// Admin API - Get single product
app.get('/api/admin/products/:id', requireAdmin, (req, res) => {
  const product = getRow('SELECT * FROM products WHERE id = ?', [req.params.id]);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Admin API - Create product
app.post('/api/admin/products', requireAdmin, upload.single('image'), (req, res) => {
  const { name, description, price, sale_price, category_id, stock, featured } = req.body;

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const image = req.file ? '/uploads/' + req.file.filename : null;

  try {
    const result = runQuery(
      'INSERT INTO products (name, slug, description, price, sale_price, category_id, image, stock, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, slug, description, price, sale_price || null, category_id, image, stock || 0, featured ? 1 : 0]
    );

    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin API - Update product
app.put('/api/admin/products/:id', requireAdmin, upload.single('image'), (req, res) => {
  const { name, description, price, sale_price, category_id, stock, featured } = req.body;

  const product = getRow('SELECT * FROM products WHERE id = ?', [req.params.id]);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const image = req.file ? '/uploads/' + req.file.filename : product.image;

  try {
    runQuery(
      'UPDATE products SET name = ?, slug = ?, description = ?, price = ?, sale_price = ?, category_id = ?, image = ?, stock = ?, featured = ? WHERE id = ?',
      [name, slug, description, price, sale_price || null, category_id, image, stock || 0, featured ? 1 : 0, req.params.id]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin API - Delete product
app.delete('/api/admin/products/:id', requireAdmin, (req, res) => {
  runQuery('DELETE FROM products WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

// Admin API - Get all orders
app.get('/api/admin/orders', requireAdmin, (req, res) => {
  const orders = getAll('SELECT * FROM orders ORDER BY created_at DESC');
  res.json(orders);
});

// Admin API - Get single order
app.get('/api/admin/orders/:id', requireAdmin, (req, res) => {
  const order = getRow('SELECT * FROM orders WHERE id = ?', [req.params.id]);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const items = getAll('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
  const tracking = getAll('SELECT * FROM order_tracking WHERE order_id = ? ORDER BY created_at ASC', [order.id]);

  res.json({ order, items, tracking });
});

// Admin API - Update order status
app.put('/api/admin/orders/:id/status', requireAdmin, (req, res) => {
  const { status } = req.body;

  runQuery('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, req.params.id]);

  // Add tracking entry
  const statusDescriptions = {
    pending: 'Order placed, awaiting processing',
    processing: 'Order is being processed',
    shipped: 'Order has been shipped',
    delivered: 'Order has been delivered',
    cancelled: 'Order has been cancelled'
  };

  runQuery(
    'INSERT INTO order_tracking (order_id, status, description) VALUES (?, ?, ?)',
    [req.params.id, status, statusDescriptions[status] || 'Status updated']
  );

  res.json({ success: true });
});

// Admin API - Dashboard stats
app.get('/api/admin/stats', requireAdmin, (req, res) => {
  const totalOrders = getRow('SELECT COUNT(*) as count FROM orders')?.count || 0;
  const totalProducts = getRow('SELECT COUNT(*) as count FROM products')?.count || 0;
  const revenueResult = getRow("SELECT SUM(total) as sum FROM orders WHERE payment_status = 'paid'");
  const totalRevenue = revenueResult?.sum || 0;
  const pendingOrders = getRow("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'")?.count || 0;

  const recentOrders = getAll('SELECT * FROM orders ORDER BY created_at DESC LIMIT 5');

  res.json({ totalOrders, totalProducts, totalRevenue, pendingOrders, recentOrders });
});

// Admin API - Get categories for form
app.get('/api/admin/categories', requireAdmin, (req, res) => {
  const categories = getAll('SELECT * FROM categories');
  res.json(categories);
});

// Admin API - Get all settings
app.get('/api/admin/settings', requireAdmin, (req, res) => {
  const settings = getAllSettings();
  res.json(settings);
});

// Admin API - Update settings
app.put('/api/admin/settings', requireAdmin, (req, res) => {
  const { key, value } = req.body;
  if (!key) {
    return res.status(400).json({ error: 'Key is required' });
  }
  const success = updateSetting(key, value);
  res.json({ success });
});

// Public API - Get site settings
app.get('/api/settings', (req, res) => {
  const settings = getAllSettings();
  res.json(settings);
});

// Initialize database and start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Admin panel at http://localhost:${PORT}/admin`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
