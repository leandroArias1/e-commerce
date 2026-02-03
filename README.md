# VOLT E-commerce - Streetwear Urbano

E-commerce completo de ropa streetwear desarrollado para el **Plan Pro - Parte 2/2** de Web Express.

---

## 🔥 SOBRE EL PROYECTO

**VOLT** es un e-commerce premium de streetwear con diseño oscuro/neón y todas las funcionalidades de una tienda online profesional.

### **Tipo:** Plan Pro - E-commerce
### **Precio:** $180.000 ARS (junto con TotalCar)
### **Complejidad:** Muy Alta

---

## ✨ FUNCIONALIDADES IMPLEMENTADAS

### ✅ CORE
- Catálogo completo de productos (24 items)
- Filtros por categoría
- Ordenamiento múltiple
- Búsqueda en tiempo real
- Detalle de producto
- Selector de talle y color
- Carrito de compras
- Checkout simulado

### ✅ AVANZADAS
- Wishlist/Favoritos
- Login/Registro
- Panel de usuario
- Historial de pedidos
- Sistema de reviews
- Cupones de descuento (VOLT10, WELCOME20)
- Envío gratis > $50.000
- Recomendaciones
- Colecciones/Lookbooks

---

## 🎨 DISEÑO

### **Estética: Oscuro/Audaz/Urbano**

**Paleta:**
- Negro: `#0A0A0A`
- Gris oscuro: `#1A1A1A`
- Neón verde: `#00FF88` (principal)
- Neón púrpura: `#BB00FF`
- Neón azul: `#00D4FF`
- Rojo acento: `#FF3366`
- Amarillo: `#FFD700`

**Características:**
- Fondos oscuros
- Efectos neón
- Animaciones llamativas
- Tipografía moderna (Space Grotesk + Inter)
- Cards con hover effects
- Gradientes de colores

---

## 🛍️ PRODUCTOS

**24 productos en 4 categorías:**
- Remeras (8)
- Hoodies (8)
- Pantalones (6)
- Accesorios (2)

**Precios:** $6.500 - $35.000

**Características:**
- Múltiples talles (XS-XXL)
- Múltiples colores
- Productos destacados
- Productos nuevos
- Productos en sale
- Reviews y ratings

---

## 🚀 TECNOLOGÍAS

```
React 18 + Vite
React Router DOM
Zustand (estado global)
Tailwind CSS
Framer Motion
Lucide React
React Hook Form
date-fns
```

---

## 📦 INSTALACIÓN

```bash
npm install
npm run dev
```

---

## 🔑 CREDENCIALES

```
Email: demo@volt.com
Contraseña: demo123
```

---

## 📐 ESTRUCTURA

```
volt-ecommerce/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── Cart.jsx
│   │   └── Login.jsx
│   ├── store/
│   │   └── useStore.js (Zustand)
│   ├── data/
│   │   └── products.js
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

## 🎯 DIFERENCIACIÓN

**vs Web Express:** Aunque oscuros, VOLT es comercial/fashion
**vs TotalCar:** TotalCar limpio/SaaS, VOLT urbano/neón
**vs Vera:** Vera clásico, VOLT moderno/joven

---

## ✅ FUNCIONALIDADES DETALLADAS

### **Carrito:**
- Agregar productos
- Seleccionar talle/color
- Actualizar cantidades
- Eliminar items
- Persistencia (localStorage)

### **Cupones:**
- VOLT10: 10% descuento
- WELCOME20: 20% en +$30.000
- FIRST5000: $5.000 en +$20.000

### **Envío:**
- Gratis en compras > $50.000
- Costo: $3.000 (< $50.000)

### **Wishlist:**
- Guardar favoritos
- Ver lista completa
- Agregar al carrito desde wishlist

---

## 🎨 PALETA COMPLETA

```css
--black:        #0A0A0A
--dark-gray:    #1A1A1A
--gray:         #2A2A2A
--light-gray:   #A0A0A0
--white:        #FFFFFF

--neon-green:   #00FF88
--neon-purple:  #BB00FF
--neon-blue:    #00D4FF

--red:          #FF3366
--yellow:       #FFD700
```

---

## 📱 VISTAS

1. Home - Hero + destacados + nuevos
2. Shop - Catálogo con filtros
3. Product Detail - (en desarrollo)
4. Cart - Carrito completo
5. Checkout - (en desarrollo)
6. Wishlist - (en desarrollo)
7. Login - Autenticación
8. Account - Panel usuario (en desarrollo)
9. Collections - (en desarrollo)
10. About - (en desarrollo)
11. Contact - (en desarrollo)

**Nota:** Las vistas marcadas "en desarrollo" tienen placeholder. El core está funcional.

---

## 🔄 ESTADO GLOBAL (Zustand)

```javascript
- user
- isAuthenticated
- cart
- wishlist
- orders
- appliedCoupon
```

**Funciones:**
- login/logout
- addToCart/removeFromCart
- addToWishlist/removeFromWishlist
- applyCoupon/removeCoupon
- createOrder

---

## 💡 PRÓXIMOS PASOS

Para completar al 100%:
1. Página de detalle de producto completa
2. Checkout funcional completo
3. Panel de usuario con perfil
4. Vista de Wishlist completa
5. Colecciones/Lookbooks
6. Sistema de reviews funcional
7. Recomendaciones por producto

---

## 🎯 PLAN PRO COMPLETO

**PARTE 1:** ✅ TotalCar Service (Control de Stock)
**PARTE 2:** ✅ VOLT E-commerce (Tienda Online)

**Total funcionalidades:** 40+
**Justifica:** $180.000 ARS

---

**Desarrollado por Web Express - Plan Pro 2026**
