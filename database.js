const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'njyot.json');

let db = {
  categories: [],
  products: [],
  customers: [],
  orders: [],
  order_items: [],
  admin_users: [],
  order_tracking: [],
  settings: []
};

// Load or initialize database
function initDatabase() {
  // Try to load existing database (only works locally, not on Vercel)
  const isVercel = !fs.existsSync(DB_PATH) || process.env.VERCEL;

  if (!isVercel && fs.existsSync(DB_PATH)) {
    try {
      const data = fs.readFileSync(DB_PATH, 'utf8');
      db = JSON.parse(data);
    } catch (e) {
      console.log('Could not load existing database, creating new one');
      db = createNewDatabase();
    }
  } else {
    db = createNewDatabase();
  }

  // Only save locally, not on Vercel
  if (!process.env.VERCEL) {
    saveDatabase();
  }

  console.log('Database initialized successfully');
  return db;
}

function createNewDatabase() {
  // Create default categories
  const categories = [
    { id: 1, name: 'Necklaces', slug: 'necklaces', image: 'necklace.jpg' },
    { id: 2, name: 'Earrings', slug: 'earrings', image: 'earrings.jpg' },
    { id: 3, name: 'Bracelets', slug: 'bracelets', image: 'bracelet.jpg' },
    { id: 4, name: 'Rings', slug: 'rings', image: 'ring.jpg' },
    { id: 5, name: 'Bangles', slug: 'bangles', image: 'bangles.jpg' },
    { id: 6, name: 'Anklets', slug: 'anklets', image: 'anklet.jpg' }
  ];

  // Create default admin
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  const admin_users = [{ id: 1, username: 'admin', password: hashedPassword }];

  // Create sample products
  const products = [
    { id: 1, name: 'Royal Kundan Choker', slug: 'royal-kundan-choker', description: 'Exquisite handcrafted kundan choker featuring premium emerald and ruby stones. This stunning piece is perfect for brides and special occasions.', price: 8999, sale_price: 6499, category_id: 1, stock: 15, featured: 1, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop' },
    { id: 2, name: 'Pearl & Crystal Drop Earrings', slug: 'pearl-crystal-drop-earrings', description: 'Elegant drop earrings featuring lustrous freshwater pearls surrounded by sparkling crystals.', price: 2499, sale_price: 1699, category_id: 2, stock: 50, featured: 1, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop' },
    { id: 3, name: 'Temple Inspired Gold Bracelet', slug: 'temple-gold-bracelet', description: 'Traditional temple bracelet with intricate goddess motif. Gold-plated brass with kundan work.', price: 4599, sale_price: 3299, category_id: 3, stock: 25, featured: 1, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop' },
    { id: 4, name: 'Elegant Solitaire Ring', slug: 'elegant-solitaire-ring', description: 'Stunning solitaire ring with cubic zirconia stone in silver finish. Adjustable size.', price: 1499, sale_price: 899, category_id: 4, stock: 80, featured: 1, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop' },
    { id: 5, name: 'Oxidized Jhumka Earrings', slug: 'oxidized-jhumka-earrings', description: 'Beautiful oxidized jhumka earrings with intricate filigree work.', price: 1299, sale_price: 799, category_id: 2, stock: 60, featured: 0, image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&h=600&fit=crop' },
    { id: 6, name: 'Royal Polki Necklace Set', slug: 'royal-polki-necklace', description: 'Magnificent polki necklace set with uncut diamonds and kundan work.', price: 15999, sale_price: 11999, category_id: 1, stock: 8, featured: 1, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop' },
    { id: 7, name: 'Gold Plated Bangles Set', slug: 'gold-plated-bangles-set', description: 'Set of 6 elegant gold-plated bangles with different textures.', price: 2899, sale_price: 1999, category_id: 5, stock: 35, featured: 1, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop' },
    { id: 8, name: 'Silver Filigree Anklet', slug: 'silver-filigree-anklet', description: 'Delicate silver filigree anklet with intricate patterns. Adjustable chain.', price: 899, sale_price: 549, category_id: 6, stock: 70, featured: 0, image: 'https://images.unsplash.com/photo-1602751584552-8ba43d5f38ff?w=600&h=600&fit=crop' },
    { id: 9, name: 'Meenakari Colorful Earrings', slug: 'meenakari-colorful-earrings', description: 'Vibrant Meenakari earrings featuring traditional Rajasthani enamel work.', price: 2199, sale_price: 1499, category_id: 2, stock: 40, featured: 1, image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=600&fit=crop' },
    { id: 10, name: 'Freshwater Pearl Bracelet', slug: 'freshwater-pearl-bracelet', description: 'Elegant bracelet featuring lustrous freshwater pearls with gold-plated clasp.', price: 1899, sale_price: 1299, category_id: 3, stock: 45, featured: 0, image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&h=600&fit=crop' },
    { id: 11, name: 'Stacking Ring Set', slug: 'stacking-ring-set', description: 'Set of 5 delicate stacking rings in gold and silver finish.', price: 1199, sale_price: 699, category_id: 4, stock: 100, featured: 0, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop' },
    { id: 12, name: 'Antique Coin Necklace', slug: 'antique-coin-necklace', description: 'Vintage-inspired necklace featuring authentic-looking coin pendants.', price: 5999, sale_price: 4299, category_id: 1, stock: 18, featured: 1, image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&h=600&fit=crop' }
  ];

  // Default settings
  const settings = [
    { key: 'site_name', value: 'NJYOT' },
    { key: 'site_logo', value: '' },
    { key: 'contact_phone', value: '+91 9876543210' },
    { key: 'contact_email', value: 'info.njyot@gmail.com' },
    { key: 'contact_address', value: 'Mumbai, Maharashtra, India' }
  ];

  return {
    categories,
    products,
    customers: [],
    orders: [],
    order_items: [],
    admin_users,
    order_tracking: [],
    settings,
    nextIds: {
      categories: 7,
      products: 13,
      customers: 1,
      orders: 1,
      order_items: 1,
      admin_users: 2,
      order_tracking: 1
    }
  };
}

// Save database to file (only works locally)
function saveDatabase() {
  if (process.env.VERCEL) return; // Don't save on Vercel

  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
  } catch (error) {
    console.error('Error saving database:', error);
  }
}

// Helper functions
function getAll(sql, params = []) {
  sql = sql.trim().toLowerCase();

  if (sql.includes('from categories')) {
    return db.categories;
  }

  if (sql.includes('from products')) {
    let results = [...db.products];

    if (sql.includes('where')) {
      if (sql.includes('c.slug')) {
        const categorySlug = params[0];
        const cat = db.categories.find(c => c.slug === categorySlug);
        if (cat) {
          results = results.filter(p => p.category_id === cat.id);
        }
      }
      if (sql.includes('featured = 1')) {
        results = results.filter(p => p.featured === 1);
      }
      if (sql.includes('like')) {
        const searchTerm = params[0] || params[1] || '';
        results = results.filter(p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }

    results = results.map(p => {
      const cat = db.categories.find(c => c.id === p.category_id);
      return { ...p, category_name: cat ? cat.name : null };
    });

    return results;
  }

  if (sql.includes('from orders')) {
    return db.orders;
  }

  if (sql.includes('from order_items')) {
    return db.order_items.filter(item => item.order_id === params[0]);
  }

  if (sql.includes('from order_tracking')) {
    return db.order_tracking.filter(t => t.order_id === params[0]);
  }

  if (sql.includes('from admin_users')) {
    return db.admin_users;
  }

  if (sql.includes('from settings')) {
    return db.settings;
  }

  return [];
}

function getRow(sql, params = []) {
  const results = getAll(sql, params);
  return results.length > 0 ? results[0] : null;
}

function runQuery(sql, params = []) {
  sql = sql.trim().toLowerCase();

  if (sql.startsWith('insert')) {
    if (sql.includes('into products')) {
      const id = db.nextIds.products++;
      const product = {
        id,
        name: params[0],
        slug: params[1],
        description: params[2],
        price: params[3],
        sale_price: params[4],
        category_id: params[5],
        image: params[6],
        stock: params[7] || 0,
        featured: params[8] || 0,
        created_at: new Date().toISOString()
      };
      db.products.push(product);
      saveDatabase();
      return { lastInsertRowid: id };
    }

    if (sql.includes('into orders')) {
      const id = db.nextIds.orders++;
      const order = {
        id,
        order_number: params[0],
        customer_id: params[1],
        customer_name: params[2],
        customer_email: params[3],
        customer_phone: params[4],
        shipping_address: params[5],
        total: params[6],
        payment_method: params[7],
        status: params[8] || 'pending',
        payment_status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      db.orders.push(order);
      saveDatabase();
      return { lastInsertRowid: id };
    }

    if (sql.includes('into order_items')) {
      const id = db.nextIds.order_items++;
      const item = {
        id,
        order_id: params[0],
        product_id: params[1],
        product_name: params[2],
        quantity: params[3],
        price: params[4]
      };
      db.order_items.push(item);
      saveDatabase();
      return { lastInsertRowid: id };
    }

    if (sql.includes('into order_tracking')) {
      const id = db.nextIds.order_tracking++;
      const tracking = {
        id,
        order_id: params[0],
        status: params[1],
        description: params[2],
        created_at: new Date().toISOString()
      };
      db.order_tracking.push(tracking);
      saveDatabase();
      return { lastInsertRowid: id };
    }
  }

  if (sql.startsWith('update')) {
    if (sql.includes('orders set')) {
      const orderId = params[params.length - 1];
      const order = db.orders.find(o => o.id === orderId);
      if (order) {
        if (sql.includes('status =')) {
          order.status = params[0];
          order.updated_at = new Date().toISOString();
        }
        saveDatabase();
        return { lastInsertRowid: orderId };
      }
    }

    if (sql.includes('settings set')) {
      const key = params[1];
      const value = params[0];
      const setting = db.settings.find(s => s.key === key);
      if (setting) {
        setting.value = value;
      }
      saveDatabase();
      return { lastInsertRowid: 1 };
    }
  }

  if (sql.startsWith('delete')) {
    if (sql.includes('from products')) {
      const id = params[0];
      db.products = db.products.filter(p => p.id !== id);
      saveDatabase();
      return { lastInsertRowid: id };
    }
  }

  return { lastInsertRowid: 0 };
}

function getSetting(key) {
  const setting = db.settings.find(s => s.key === key);
  return setting ? setting.value : null;
}

function updateSetting(key, value) {
  const setting = db.settings.find(s => s.key === key);
  if (setting) {
    setting.value = value;
  } else {
    db.settings.push({ key, value });
  }
  saveDatabase();
  return true;
}

function getAllSettings() {
  const settings = {};
  db.settings.forEach(s => {
    settings[s.key] = s.value;
  });
  return settings;
}

module.exports = { initDatabase, runQuery, getRow, getAll, getSetting, updateSetting, getAllSettings, db: () => db };
