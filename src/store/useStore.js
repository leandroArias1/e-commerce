import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Imágenes placeholder reales de Unsplash para productos
const productImages = {
  1: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
  2: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400',
  3: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400',
  4: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400',
  5: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400',
  6: 'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=400',
  7: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400',
  8: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400',
  9: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
  10: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=400',
  11: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400',
  12: 'https://images.unsplash.com/photo-1542406775-ade58c52d2e4?w=400',
  13: 'https://images.unsplash.com/photo-1609873814058-a8928924184a?w=400',
  14: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
  15: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=400',
  16: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=400',
  17: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400',
  18: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400',
  19: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
  20: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
  21: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=400',
  22: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400',
  23: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400',
  24: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400',
};

const initialCategories = [
  { id: 1, name: 'Remeras', slug: 'remeras' },
  { id: 2, name: 'Hoodies', slug: 'hoodies' },
  { id: 3, name: 'Pantalones', slug: 'pantalones' },
  { id: 4, name: 'Accesorios', slug: 'accesorios' },
];

const initialProducts = [
  { id: 1, name: 'VOLT Logo Tee', slug: 'volt-logo-tee-black', sku: 'TEE-001', category: 1, price: 12000, originalPrice: null, description: 'Remera premium con logo VOLT bordado. Algodón 100% peinado de alta densidad.', image: productImages[1], colors: ['Black', 'White'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], stock: 50, featured: true, new: false, sale: false, rating: 4.8, reviews: 124 },
  { id: 2, name: 'Neon Strike Tee', slug: 'neon-strike-tee', sku: 'TEE-002', category: 1, price: 13500, originalPrice: null, description: 'Diseño exclusivo con estampado neón. Corte regular, 100% algodón.', image: productImages[2], colors: ['White', 'Black'], sizes: ['XS', 'S', 'M', 'L', 'XL'], stock: 35, featured: true, new: true, sale: false, rating: 4.9, reviews: 89 },
  { id: 3, name: 'Urban Lines Tee', slug: 'urban-lines-tee', sku: 'TEE-003', category: 1, price: 11500, originalPrice: 15000, description: 'Remera con gráfica urbana minimalista. Fit moderno.', image: productImages[3], colors: ['Gray', 'Charcoal'], sizes: ['S', 'M', 'L', 'XL'], stock: 28, featured: false, new: false, sale: true, rating: 4.6, reviews: 67 },
  { id: 4, name: 'Oversized Drop Tee', slug: 'oversized-drop-tee', sku: 'TEE-004', category: 1, price: 14000, originalPrice: null, description: 'Corte oversized. Diseño dropped shoulder. Premium cotton.', image: productImages[4], colors: ['Black', 'White', 'Charcoal'], sizes: ['M', 'L', 'XL', 'XXL'], stock: 42, featured: true, new: true, sale: false, rating: 4.9, reviews: 156 },
  { id: 5, name: 'Graphic Wave Tee', slug: 'graphic-wave-tee', sku: 'TEE-005', category: 1, price: 12500, originalPrice: null, description: 'Estampado wave exclusive. Fit regular, cuello reforzado.', image: productImages[5], colors: ['White', 'Black'], sizes: ['S', 'M', 'L', 'XL'], stock: 31, featured: false, new: false, sale: false, rating: 4.7, reviews: 93 },
  { id: 6, name: 'Minimal Logo Tee', slug: 'minimal-logo-tee', sku: 'TEE-006', category: 1, price: 10500, originalPrice: null, description: 'Logo minimalista bordado. Esencial de closet.', image: productImages[6], colors: ['Charcoal', 'Black', 'Navy'], sizes: ['XS', 'S', 'M', 'L', 'XL'], stock: 55, featured: false, new: false, sale: false, rating: 4.8, reviews: 201 },
  { id: 7, name: 'Street Culture Tee', slug: 'street-culture-tee', sku: 'TEE-007', category: 1, price: 13000, originalPrice: null, description: 'Diseño street exclusive. Limited edition.', image: productImages[7], colors: ['Black'], sizes: ['M', 'L', 'XL'], stock: 18, featured: true, new: true, sale: false, rating: 5.0, reviews: 45 },
  { id: 8, name: 'Retro Fade Tee', slug: 'retro-fade-tee', sku: 'TEE-008', category: 1, price: 9500, originalPrice: 13000, description: 'Efecto retro fade. Vintage vibes.', image: productImages[8], colors: ['Navy', 'Charcoal'], sizes: ['S', 'M', 'L', 'XL'], stock: 22, featured: false, new: false, sale: true, rating: 4.5, reviews: 78 },
  { id: 9, name: 'VOLT Essential Hoodie', slug: 'volt-essential-hoodie', sku: 'HOO-001', category: 2, price: 28000, originalPrice: null, description: 'Hoodie esencial con logo bordado. Felpa premium 320gsm.', image: productImages[9], colors: ['Black', 'Charcoal'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], stock: 45, featured: true, new: false, sale: false, rating: 4.9, reviews: 287 },
  { id: 10, name: 'Neon Arc Hoodie', slug: 'neon-arc-hoodie', sku: 'HOO-002', category: 2, price: 32000, originalPrice: null, description: 'Diseño arc exclusive con detalles reflectivos.', image: productImages[10], colors: ['Charcoal', 'Black'], sizes: ['M', 'L', 'XL', 'XXL'], stock: 28, featured: true, new: true, sale: false, rating: 4.8, reviews: 143 },
  { id: 11, name: 'Oversized Hoodie', slug: 'oversized-hoodie', sku: 'HOO-003', category: 2, price: 30000, originalPrice: 38000, description: 'Fit oversized relaxed. Heavy weight fleece.', image: productImages[11], colors: ['White', 'Black', 'Gray'], sizes: ['L', 'XL', 'XXL'], stock: 19, featured: false, new: false, sale: true, rating: 4.7, reviews: 98 },
  { id: 12, name: 'Tech Fleece Hoodie', slug: 'tech-fleece-hoodie', sku: 'HOO-004', category: 2, price: 35000, originalPrice: null, description: 'Tecnología fleece avanzada. Ultra soft.', image: productImages[12], colors: ['Black', 'Navy'], sizes: ['S', 'M', 'L', 'XL'], stock: 33, featured: true, new: true, sale: false, rating: 5.0, reviews: 76 },
  { id: 13, name: 'Quarter Zip Hoodie', slug: 'quarter-zip-hoodie', sku: 'HOO-005', category: 2, price: 29500, originalPrice: null, description: 'Diseño quarter zip. Versátil y moderno.', image: productImages[13], colors: ['Gray', 'Charcoal'], sizes: ['M', 'L', 'XL'], stock: 24, featured: false, new: false, sale: false, rating: 4.6, reviews: 54 },
  { id: 14, name: 'Cropped Hoodie', slug: 'cropped-hoodie', sku: 'HOO-006', category: 2, price: 27000, originalPrice: null, description: 'Corte cropped moderno. Unisex fit.', image: productImages[14], colors: ['Black', 'White'], sizes: ['XS', 'S', 'M', 'L'], stock: 31, featured: false, new: false, sale: false, rating: 4.8, reviews: 112 },
  { id: 15, name: 'Zip-up Hoodie', slug: 'zipup-hoodie', sku: 'HOO-007', category: 2, price: 31000, originalPrice: null, description: 'Full zip con capucha ajustable. Premium quality.', image: productImages[15], colors: ['Navy', 'Black'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], stock: 27, featured: false, new: false, sale: false, rating: 4.7, reviews: 89 },
  { id: 16, name: 'Logo Print Hoodie', slug: 'logo-print-hoodie', sku: 'HOO-008', category: 2, price: 26000, originalPrice: 34000, description: 'Estampado logo all-over. Statement piece.', image: productImages[16], colors: ['Charcoal'], sizes: ['M', 'L', 'XL'], stock: 15, featured: false, new: false, sale: true, rating: 4.5, reviews: 63 },
  { id: 17, name: 'Cargo Pants', slug: 'cargo-pants-black', sku: 'PAN-001', category: 3, price: 24000, originalPrice: null, description: 'Cargo pants con múltiples bolsillos. Tela resistente.', image: productImages[17], colors: ['Black', 'Olive'], sizes: ['S', 'M', 'L', 'XL'], stock: 38, featured: true, new: false, sale: false, rating: 4.8, reviews: 167 },
  { id: 18, name: 'Joggers Premium', slug: 'joggers-premium', sku: 'PAN-002', category: 3, price: 22000, originalPrice: null, description: 'Joggers de felpa premium. Fit tapered.', image: productImages[18], colors: ['Charcoal', 'Black', 'Gray'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], stock: 52, featured: true, new: false, sale: false, rating: 4.9, reviews: 234 },
  { id: 19, name: 'Wide Leg Pants', slug: 'wide-leg-pants', sku: 'PAN-003', category: 3, price: 26000, originalPrice: null, description: 'Corte wide leg moderno. High fashion.', image: productImages[19], colors: ['Black', 'Charcoal'], sizes: ['M', 'L', 'XL'], stock: 21, featured: false, new: true, sale: false, rating: 4.6, reviews: 48 },
  { id: 20, name: 'Track Pants', slug: 'track-pants-white', sku: 'PAN-004', category: 3, price: 20000, originalPrice: 26000, description: 'Track pants con stripe lateral. Athleisure style.', image: productImages[20], colors: ['White', 'Black'], sizes: ['S', 'M', 'L', 'XL'], stock: 29, featured: false, new: false, sale: true, rating: 4.5, reviews: 91 },
  { id: 21, name: 'Utility Cargo', slug: 'utility-cargo-olive', sku: 'PAN-005', category: 3, price: 27000, originalPrice: null, description: 'Cargo utility con detalles técnicos. Urban exploration.', image: productImages[21], colors: ['Olive', 'Black'], sizes: ['M', 'L', 'XL'], stock: 17, featured: true, new: true, sale: false, rating: 4.9, reviews: 72 },
  { id: 22, name: 'Slim Fit Joggers', slug: 'slim-fit-joggers', sku: 'PAN-006', category: 3, price: 19500, originalPrice: null, description: 'Joggers slim fit. Versátil para cualquier ocasión.', image: productImages[22], colors: ['Gray', 'Black', 'Navy'], sizes: ['S', 'M', 'L', 'XL'], stock: 44, featured: false, new: false, sale: false, rating: 4.7, reviews: 128 },
  { id: 23, name: 'VOLT Cap', slug: 'volt-cap-black', sku: 'ACC-001', category: 4, price: 8000, originalPrice: null, description: 'Gorra snapback con logo bordado. Ajustable.', image: productImages[23], colors: ['Black'], sizes: ['Único'], stock: 67, featured: false, new: false, sale: false, rating: 4.8, reviews: 203 },
  { id: 24, name: 'Beanie Essential', slug: 'beanie-essential', sku: 'ACC-002', category: 4, price: 6500, originalPrice: null, description: 'Gorro beanie de punto. Logo patch.', image: productImages[24], colors: ['Black', 'Gray'], sizes: ['Único'], stock: 89, featured: false, new: false, sale: false, rating: 4.6, reviews: 145 },
];

const initialCollections = [
  { id: 1, name: 'Neon Nights', slug: 'neon-nights', description: 'Colección inspirada en la cultura urbana nocturna', image: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=600', productIds: [1, 2, 4, 10, 17] },
  { id: 2, name: 'Essential Pack', slug: 'essential-pack', description: 'Los básicos que no pueden faltar en tu closet', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600', productIds: [6, 9, 18, 23] },
  { id: 3, name: 'Street Elite', slug: 'street-elite', description: 'Premium streetwear para los que marcan tendencia', image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600', productIds: [7, 12, 21] },
];

const initialSettings = {
  storeName: 'VOLT',
  storeEmail: 'info@volt.com',
  storePhone: '+54 11 1234-5678',
  storeAddress: 'Av. Santa Fe 1234, Buenos Aires',
  freeShippingThreshold: 50000,
  standardShipping: 3000,
  expressShipping: 5000,
  acceptCash: true,
  acceptCard: true,
  acceptTransfer: true,
  emailNewOrder: true,
  emailLowStock: true,
  stockThreshold: 10,
  metaTitle: 'VOLT - Streetwear Premium',
  metaDescription: 'Ropa urbana de calidad premium para la cultura street',
  instagram: '@volt.streetwear',
  facebook: 'volt.streetwear',
  twitter: '@voltstreet',
};

const coupons = [
  { code: 'VOLT10', discount: 10, type: 'percentage', minAmount: 0 },
  { code: 'WELCOME20', discount: 20, type: 'percentage', minAmount: 30000 },
  { code: 'FIRST5000', discount: 5000, type: 'fixed', minAmount: 20000 },
];

export const useStore = create(
  persist(
    (set, get) => ({
      // ========== PRODUCTOS ==========
      products: initialProducts,
      categories: initialCategories,
      
      addProduct: (product) => {
        const products = get().products;
        const newProduct = {
          ...product,
          id: Math.max(...products.map(p => p.id), 0) + 1,
          slug: product.name.toLowerCase().replace(/\s+/g, '-'),
          sku: `PROD-${Date.now()}`,
          rating: 0,
          reviews: 0,
        };
        set({ products: [...products, newProduct] });
        return newProduct;
      },
      
      updateProduct: (id, updates) => {
        set({
          products: get().products.map(p => 
            p.id === id ? { ...p, ...updates } : p
          )
        });
      },
      
      deleteProduct: (id) => {
        set({ products: get().products.filter(p => p.id !== id) });
      },

      // ========== COLECCIONES ==========
      collections: initialCollections,
      
      addCollection: (collection) => {
        const collections = get().collections;
        const newCollection = {
          ...collection,
          id: Math.max(...collections.map(c => c.id), 0) + 1,
          slug: collection.name.toLowerCase().replace(/\s+/g, '-'),
        };
        set({ collections: [...collections, newCollection] });
        return newCollection;
      },
      
      updateCollection: (id, updates) => {
        set({
          collections: get().collections.map(c => 
            c.id === id ? { ...c, ...updates } : c
          )
        });
      },
      
      deleteCollection: (id) => {
        set({ collections: get().collections.filter(c => c.id !== id) });
      },

      // ========== USUARIOS Y AUTENTICACIÓN ==========
      users: [
        { id: 1, email: 'demo@volt.com', password: 'demo123', name: 'Juan Pérez', phone: '+54 11 1234-5678', isAdmin: true },
        { id: 2, email: 'admin@volt.com', password: 'admin123', name: 'Admin VOLT', phone: '+54 11 9999-9999', isAdmin: true },
      ],
      user: null,
      isAuthenticated: false,
      
      register: (userData) => {
        const users = get().users;
        if (users.find(u => u.email === userData.email)) {
          return { success: false, error: 'El email ya está registrado' };
        }
        const newUser = {
          id: Math.max(...users.map(u => u.id), 0) + 1,
          ...userData,
          isAdmin: false,
        };
        set({ 
          users: [...users, newUser],
          user: newUser,
          isAuthenticated: true
        });
        return { success: true, user: newUser };
      },
      
      login: (email, password) => {
        const user = get().users.find(u => u.email === email && u.password === password);
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      // ========== CARRITO ==========
      cart: [],
      
      addToCart: (product, size, color, quantity = 1) => {
        const cart = get().cart;
        const existingItem = cart.find(
          item => item.id === product.id && item.size === size && item.color === color
        );
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id && item.size === size && item.color === color
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, size, color, quantity }] });
        }
      },
      
      removeFromCart: (productId, size, color) => {
        set({
          cart: get().cart.filter(
            item => !(item.id === productId && item.size === size && item.color === color)
          ),
        });
      },
      
      updateQuantity: (productId, size, color, quantity) => {
        if (quantity === 0) {
          get().removeFromCart(productId, size, color);
        } else {
          set({
            cart: get().cart.map(item =>
              item.id === productId && item.size === size && item.color === color
                ? { ...item, quantity }
                : item
            ),
          });
        }
      },
      
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
      getCartCount: () => get().cart.reduce((count, item) => count + item.quantity, 0),

      // ========== CUPONES ==========
      appliedCoupon: null,
      
      applyCoupon: (code) => {
        const coupon = coupons.find(c => c.code === code.toUpperCase());
        const total = get().getCartTotal();
        if (coupon && total >= coupon.minAmount) {
          set({ appliedCoupon: coupon });
          return true;
        }
        return false;
      },
      
      removeCoupon: () => set({ appliedCoupon: null }),
      
      getDiscount: () => {
        const coupon = get().appliedCoupon;
        const total = get().getCartTotal();
        if (!coupon) return 0;
        return coupon.type === 'percentage' 
          ? Math.floor(total * (coupon.discount / 100))
          : coupon.discount;
      },
      
      getShipping: () => {
        const settings = get().settings;
        const total = get().getCartTotal();
        return total >= settings.freeShippingThreshold ? 0 : settings.standardShipping;
      },
      
      getFinalTotal: () => get().getCartTotal() - get().getDiscount() + get().getShipping(),

      // ========== WISHLIST ==========
      wishlist: [],
      addToWishlist: (productId) => {
        if (!get().wishlist.includes(productId)) {
          set({ wishlist: [...get().wishlist, productId] });
        }
      },
      removeFromWishlist: (productId) => {
        set({ wishlist: get().wishlist.filter(id => id !== productId) });
      },
      isInWishlist: (productId) => get().wishlist.includes(productId),

      // ========== PEDIDOS ==========
      orders: [
        { id: 1001, date: new Date('2026-02-01T10:30:00').toISOString(), email: 'cliente1@email.com', firstName: 'María', lastName: 'González', phone: '+54 11 5555-1234', address: 'Av. Corrientes 1234', city: 'Buenos Aires', state: 'CABA', zipCode: '1043', items: [{ ...initialProducts[0], size: 'M', color: 'Black', quantity: 2 }, { ...initialProducts[8], size: 'L', color: 'Black', quantity: 1 }], subtotal: 52000, discount: 0, shipping: 0, total: 52000, status: 'delivered', coupon: null },
        { id: 1002, date: new Date('2026-02-03T15:45:00').toISOString(), email: 'cliente2@email.com', firstName: 'Carlos', lastName: 'Rodríguez', phone: '+54 11 4444-5678', address: 'Calle Florida 567', city: 'Buenos Aires', state: 'CABA', zipCode: '1005', items: [{ ...initialProducts[3], size: 'L', color: 'White', quantity: 1 }, { ...initialProducts[16], size: 'M', color: 'Black', quantity: 1 }], subtotal: 38000, discount: 3800, shipping: 0, total: 34200, status: 'shipped', coupon: { code: 'VOLT10', discount: 10, type: 'percentage' } },
        { id: 1003, date: new Date('2026-02-05T09:20:00').toISOString(), email: 'cliente3@email.com', firstName: 'Ana', lastName: 'Martínez', phone: '+54 11 3333-9012', address: 'Av. Cabildo 2345', city: 'Buenos Aires', state: 'CABA', zipCode: '1428', items: [{ ...initialProducts[11], size: 'M', color: 'Black', quantity: 1 }], subtotal: 35000, discount: 0, shipping: 0, total: 35000, status: 'processing', coupon: null },
        { id: 1004, date: new Date('2026-02-06T11:00:00').toISOString(), email: 'cliente4@email.com', firstName: 'Lucas', lastName: 'Fernández', phone: '+54 11 2222-3456', address: 'Av. Santa Fe 4567', city: 'Buenos Aires', state: 'CABA', zipCode: '1425', items: [{ ...initialProducts[1], size: 'S', color: 'White', quantity: 2 }, { ...initialProducts[22], size: 'Único', color: 'Black', quantity: 1 }], subtotal: 35000, discount: 0, shipping: 3000, total: 38000, status: 'pending', coupon: null },
      ],
      
      createOrder: (orderData) => {
        const newOrder = {
          id: Date.now(),
          date: new Date().toISOString(),
          items: get().cart,
          subtotal: get().getCartTotal(),
          discount: get().getDiscount(),
          shipping: get().getShipping(),
          total: get().getFinalTotal(),
          coupon: get().appliedCoupon,
          status: 'pending',
          ...orderData,
        };
        set({ orders: [newOrder, ...get().orders] });
        get().clearCart();
        get().removeCoupon();
        return newOrder;
      },
      
      updateOrderStatus: (orderId, status) => {
        set({ orders: get().orders.map(o => o.id === orderId ? { ...o, status } : o) });
      },

      // ========== CONFIGURACIÓN ==========
      settings: initialSettings,
      updateSettings: (newSettings) => {
        set({ settings: { ...get().settings, ...newSettings } });
      },

      // ========== CLIENTES ==========
      getCustomers: () => {
        const orders = get().orders;
        const customersMap = new Map();
        orders.forEach(order => {
          const key = order.email;
          if (customersMap.has(key)) {
            const existing = customersMap.get(key);
            existing.orders += 1;
            existing.totalSpent += order.total;
            if (new Date(order.date) > new Date(existing.lastOrder)) {
              existing.lastOrder = order.date;
            }
          } else {
            customersMap.set(key, {
              id: customersMap.size + 1,
              email: order.email,
              name: `${order.firstName} ${order.lastName}`,
              phone: order.phone,
              orders: 1,
              totalSpent: order.total,
              lastOrder: order.date,
            });
          }
        });
        return Array.from(customersMap.values());
      },
    }),
    { name: 'volt-store' }
  )
);

export const categories = initialCategories;
export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const colors = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Charcoal', hex: '#36454F' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Olive', hex: '#808000' },
  { name: 'Gray', hex: '#808080' },
];
export const FREE_SHIPPING_THRESHOLD = 50000;
