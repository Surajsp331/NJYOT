const initSqlJs = require('sql.js');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'njyot.db');

let db = null;

// Initialize database
async function initDatabase() {
  const SQL = await initSqlJs();

  // Try to load existing database
  let data = null;
  if (fs.existsSync(DB_PATH)) {
    data = fs.readFileSync(DB_PATH);
  }

  db = new SQL.Database(data);

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      image TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      price REAL NOT NULL,
      sale_price REAL,
      category_id INTEGER,
      image TEXT,
      images TEXT,
      stock INTEGER DEFAULT 0,
      featured INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      address TEXT,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT NOT NULL UNIQUE,
      customer_id INTEGER,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT,
      shipping_address TEXT,
      total REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      payment_method TEXT,
      payment_status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      product_name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS order_tracking (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      status TEXT NOT NULL,
      location TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL UNIQUE,
      value TEXT
    )
  `);

  // Insert default settings if not exists
  const settingsExist = db.exec("SELECT id FROM settings WHERE key = 'site_name'");
  if (settingsExist.length === 0 || settingsExist[0].values.length === 0) {
    const defaultSettings = [
      { key: 'site_name', value: 'NJYOT' },
      { key: 'site_logo', value: '' },
      { key: 'contact_phone', value: '+91 9876543210' },
      { key: 'contact_email', value: 'info.njyot@gmail.com' },
      { key: 'contact_address', value: 'Mumbai, Maharashtra, India' }
    ];
    defaultSettings.forEach(setting => {
      db.run('INSERT INTO settings (key, value) VALUES (?, ?)', [setting.key, setting.value]);
    });
  }

  // Insert default admin user if not exists
  const adminExists = db.exec("SELECT id FROM admin_users WHERE username = 'admin'");
  if (adminExists.length === 0 || adminExists[0].values.length === 0) {
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    db.run('INSERT INTO admin_users (username, password) VALUES (?, ?)', ['admin', hashedPassword]);
    console.log('Default admin created: admin / admin123');
  }

  // Insert default categories if not exists
  const categoryExists = db.exec("SELECT id FROM categories WHERE slug = 'necklaces'");
  if (categoryExists.length === 0 || categoryExists[0].values.length === 0) {
    const categories = [
      { name: 'Necklaces', slug: 'necklaces', image: 'necklace.jpg' },
      { name: 'Earrings', slug: 'earrings', image: 'earrings.jpg' },
      { name: 'Bracelets', slug: 'bracelets', image: 'bracelet.jpg' },
      { name: 'Rings', slug: 'rings', image: 'ring.jpg' },
      { name: 'Bangles', slug: 'bangles', image: 'bangles.jpg' },
      { name: 'Anklets', slug: 'anklets', image: 'anklet.jpg' }
    ];
    categories.forEach(cat => {
      db.run('INSERT INTO categories (name, slug, image) VALUES (?, ?, ?)', [cat.name, cat.slug, cat.image]);
    });
  }

  // Insert sample products if not exists
  const productExists = db.exec("SELECT id FROM products WHERE slug = 'royal-kundan-choker'");
  if (productExists.length === 0 || productExists[0].values.length === 0) {
    const sampleProducts = [
      { name: 'Royal Kundan Choker', slug: 'royal-kundan-choker', description: 'Exquisite handcrafted kundan choker featuring premium emerald and ruby stones. This stunning piece is perfect for brides and special occasions, crafted with meticulous attention to detail.', price: 8999, sale_price: 6499, category_id: 1, stock: 15, featured: 1, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop' },
      { name: 'Pearl & Crystal Drop Earrings', slug: 'pearl-crystal-drop-earrings', description: 'Elegant drop earrings featuring lustrous freshwater pearls surrounded by sparkling crystals. Lightweight design for comfortable all-day wear.', price: 2499, sale_price: 1699, category_id: 2, stock: 50, featured: 1, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop' },
      { name: 'Temple Inspired Gold Bracelet', slug: 'temple-gold-bracelet', description: 'Traditional temple bracelet with intricate goddess motif. Gold-plated brass with kundan work. A timeless piece for festive celebrations.', price: 4599, sale_price: 3299, category_id: 3, stock: 25, featured: 1, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop' },
      { name: 'Elegant Solitaire Ring', slug: 'elegant-solitaire-ring', description: 'Stunning solitaire ring with cubic zirconia stone in silver finish. Adjustable size for perfect fit. Perfect for engagements and parties.', price: 1499, sale_price: 899, category_id: 4, stock: 80, featured: 1, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop' },
      { name: 'Oxidized Jhumka Earrings', slug: 'oxidized-jhumka-earrings', description: 'Beautiful oxidized jhumka earrings with intricate filigree work. Lightweight yet grand. Perfect for traditional wear.', price: 1299, sale_price: 799, category_id: 2, stock: 60, featured: 0, image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&h=600&fit=crop' },
      { name: 'Royal Polki Necklace Set', slug: 'royal-polki-necklace', description: 'Magnificent polki necklace set with uncut diamonds and kundan work. Includes matching earrings. A royal piece for grand weddings.', price: 15999, sale_price: 11999, category_id: 1, stock: 8, featured: 1, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop' },
      { name: 'Gold Plated Bangles Set', slug: 'gold-plated-bangles-set', description: 'Set of 6 elegant gold-plated bangles with different textures and designs. Complete bridal styling solution.', price: 2899, sale_price: 1999, category_id: 5, stock: 35, featured: 1, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop' },
      { name: 'Silver Filigree Anklet', slug: 'silver-filigree-anklet', description: 'Delicate silver filigree anklet with intricate patterns. Adjustable chain for perfect fit. Elegant for both traditional and western wear.', price: 899, sale_price: 549, category_id: 6, stock: 70, featured: 0, image: 'https://images.unsplash.com/photo-1602751584552-8ba43d5f38ff?w=600&h=600&fit=crop' },
      { name: 'Meenakari Colorful Earrings', slug: 'meenakari-colorful-earrings', description: 'Vibrant Meenakari earrings featuring traditional Rajasthani enamel work. Each piece is a unique work of art with beautiful color combinations.', price: 2199, sale_price: 1499, category_id: 2, stock: 40, featured: 1, image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=600&fit=crop' },
      { name: 'Freshwater Pearl Bracelet', slug: 'freshwater-pearl-bracelet', description: 'Elegant bracelet featuring lustrous freshwater pearls with gold-plated clasp. Adjustable length for comfortable wear.', price: 1899, sale_price: 1299, category_id: 3, stock: 45, featured: 0, image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&h=600&fit=crop' },
      { name: 'Stacking Ring Set', slug: 'stacking-ring-set', description: 'Set of 5 delicate stacking rings in gold and silver finish. Mix and match to create your own unique look.', price: 1199, sale_price: 699, category_id: 4, stock: 100, featured: 0, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop' },
      { name: 'Antique Coin Necklace', slug: 'antique-coin-necklace', description: 'Vintage-inspired necklace featuring authentic-looking coin pendants. Heavy ethnic look with modern craftsmanship.', price: 5999, sale_price: 4299, category_id: 1, stock: 18, featured: 1, image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&h=600&fit=crop' },
      { name: 'CZ Stone Pendant Set', slug: 'cz-stone-pendant-set', description: 'Beautiful cubic zirconia pendant with matching earrings. Brilliant sparkle at an affordable price. Perfect for parties.', price: 1799, sale_price: 1199, category_id: 1, stock: 55, featured: 0, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop' },
      { name: 'Kundan Maang Tikka', slug: 'kundan-maang-tikka', description: 'Traditional Kundan maang tikka/headpiece with emerald and ruby stones. Essential bridal accessory for complete wedding look.', price: 3499, sale_price: 2499, category_id: 1, stock: 22, featured: 0, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop' },
      { name: 'Pearl Jhumka Earrings', slug: 'pearl-jhumka-earrings', description: 'Elegant jhumka earrings featuring a combination of pearls and kundan work. Traditional yet contemporary design.', price: 1999, sale_price: 1399, category_id: 2, stock: 38, featured: 1, image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&h=600&fit=crop' },
      { name: 'Brass Temple Armlet', slug: 'brass-temple-armlet', description: 'Classic brass armlet with temple design. Perfect for classical dance performances and traditional ceremonies.', price: 1599, sale_price: 999, category_id: 3, stock: 30, featured: 0, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop' }
    ];

    sampleProducts.forEach(prod => {
      db.run(
        'INSERT INTO products (name, slug, description, price, sale_price, category_id, stock, featured, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [prod.name, prod.slug, prod.description, prod.price, prod.sale_price, prod.category_id, prod.stock, prod.featured, prod.image]
      );
    });
  }

  // Save database
  saveDatabase();

  return db;
}

// Save database to file
function saveDatabase() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  }
}

// Helper function to run queries
function runQuery(sql, params = []) {
  try {
    db.run(sql, params);
    saveDatabase();
    return { lastInsertRowid: db.exec("SELECT last_insert_rowid()")[0]?.values[0]?.[0] };
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
}

// Helper function to get single row
function getRow(sql, params = []) {
  try {
    const result = db.exec(sql, params);
    if (result.length === 0 || result[0].values.length === 0) return null;

    const columns = result[0].columns;
    const values = result[0].values[0];
    const row = {};
    columns.forEach((col, i) => row[col] = values[i]);
    return row;
  } catch (error) {
    console.error('Query error:', error);
    return null;
  }
}

// Helper function to get all rows
function getAll(sql, params = []) {
  try {
    const result = db.exec(sql, params);
    if (result.length === 0) return [];

    const columns = result[0].columns;
    return result[0].values.map(values => {
      const row = {};
      columns.forEach((col, i) => row[col] = values[i]);
      return row;
    });
  } catch (error) {
    console.error('Query error:', error);
    return [];
  }
}

// Settings functions
function getSetting(key) {
  const result = db.exec('SELECT value FROM settings WHERE key = ?', [key]);
  if (result.length === 0 || result[0].values.length === 0) return null;
  return result[0].values[0][0];
}

function updateSetting(key, value) {
  try {
    const exists = db.exec('SELECT id FROM settings WHERE key = ?', [key]);
    if (exists.length > 0 && exists[0].values.length > 0) {
      db.run('UPDATE settings SET value = ? WHERE key = ?', [value, key]);
    } else {
      db.run('INSERT INTO settings (key, value) VALUES (?, ?)', [key, value]);
    }
    saveDatabase();
    return true;
  } catch (error) {
    console.error('Setting update error:', error);
    return false;
  }
}

function getAllSettings() {
  const result = db.exec('SELECT key, value FROM settings');
  if (result.length === 0) return {};

  const settings = {};
  result[0].values.forEach(row => {
    settings[row[0]] = row[1];
  });
  return settings;
}

module.exports = { initDatabase, runQuery, getRow, getAll, getSetting, updateSetting, getAllSettings, db: () => db };
