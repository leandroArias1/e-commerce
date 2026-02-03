import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as allProducts, users, coupons, FREE_SHIPPING_THRESHOLD } from '../data/products';

export const useStore = create(
  persist(
    (set, get) => ({
      // Usuario
      user: null,
      isAuthenticated: false,
      
      login: (email, password) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      // Carrito
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
          set({
            cart: [...cart, { ...product, size, color, quantity }],
          });
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
      
      clearCart: () => {
        set({ cart: [] });
      },
      
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },
      
      // Cupón de descuento
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
      
      removeCoupon: () => {
        set({ appliedCoupon: null });
      },
      
      getDiscount: () => {
        const coupon = get().appliedCoupon;
        const total = get().getCartTotal();
        
        if (!coupon) return 0;
        
        if (coupon.type === 'percentage') {
          return Math.floor(total * (coupon.discount / 100));
        } else {
          return coupon.discount;
        }
      },
      
      getShipping: () => {
        const total = get().getCartTotal();
        return total >= FREE_SHIPPING_THRESHOLD ? 0 : 3000;
      },
      
      getFinalTotal: () => {
        const subtotal = get().getCartTotal();
        const discount = get().getDiscount();
        const shipping = get().getShipping();
        return subtotal - discount + shipping;
      },
      
      // Wishlist / Favoritos
      wishlist: [],
      
      addToWishlist: (productId) => {
        const wishlist = get().wishlist;
        if (!wishlist.includes(productId)) {
          set({ wishlist: [...wishlist, productId] });
        }
      },
      
      removeFromWishlist: (productId) => {
        set({
          wishlist: get().wishlist.filter(id => id !== productId),
        });
      },
      
      isInWishlist: (productId) => {
        return get().wishlist.includes(productId);
      },
      
      // Pedidos
      orders: [
        // Pedidos de ejemplo para testing
        {
          id: 1001,
          date: new Date('2026-01-28').toISOString(),
          email: 'demo@volt.com',
          firstName: 'Juan',
          lastName: 'Pérez',
          phone: '+54 11 1234-5678',
          address: 'Av. Santa Fe 1234',
          city: 'Buenos Aires',
          state: 'CABA',
          zipCode: '1425',
          items: [
            { ...allProducts[0], size: 'L', color: 'Black', quantity: 2 },
            { ...allProducts[8], size: 'XL', color: 'Black', quantity: 1 },
          ],
          subtotal: 52000,
          discount: 0,
          shipping: 3000,
          total: 55000,
          status: 'delivered',
          coupon: null,
        },
        {
          id: 1002,
          date: new Date('2026-01-30').toISOString(),
          email: 'demo@volt.com',
          firstName: 'Juan',
          lastName: 'Pérez',
          phone: '+54 11 1234-5678',
          address: 'Av. Santa Fe 1234',
          city: 'Buenos Aires',
          state: 'CABA',
          zipCode: '1425',
          items: [
            { ...allProducts[4], size: 'M', color: 'White', quantity: 1 },
          ],
          subtotal: 12500,
          discount: 0,
          shipping: 3000,
          total: 15500,
          status: 'pending',
          coupon: null,
        },
        {
          id: 1003,
          date: new Date('2026-01-29').toISOString(),
          email: 'demo@volt.com',
          firstName: 'Juan',
          lastName: 'Pérez',
          phone: '+54 11 1234-5678',
          address: 'Av. Santa Fe 1234',
          city: 'Buenos Aires',
          state: 'CABA',
          zipCode: '1425',
          items: [
            { ...allProducts[16], size: 'L', color: 'Black', quantity: 1 },
            { ...allProducts[17], size: 'M', color: 'Charcoal', quantity: 1 },
          ],
          subtotal: 46000,
          discount: 4600,
          shipping: 0,
          total: 41400,
          status: 'processing',
          coupon: { code: 'VOLT10', discount: 10, type: 'percentage' },
        },
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
        
        set({
          orders: [newOrder, ...get().orders],
        });
        
        get().clearCart();
        get().removeCoupon();
        
        return newOrder;
      },
    }),
    {
      name: 'volt-store',
    }
  )
);
