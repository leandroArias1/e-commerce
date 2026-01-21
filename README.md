# NOVA – E-commerce Full Stack

NOVA es un e-commerce de ropa unisex desarrollado como producto real, con foco en una experiencia **minimalista, moderna y mobile-first**.  
El proyecto está pensado tanto para **uso comercial** como para **portfolio profesional**, priorizando buenas prácticas, escalabilidad y una arquitectura clara.

---

## 🧾 Descripción

El sistema permite a los usuarios:
- Navegar un catálogo de productos
- Ver el detalle de cada prenda
- Agregar productos al carrito
- Registrarse e iniciar sesión
- Simular un proceso de checkout con confirmación de orden

El backend expone una API REST que gestiona usuarios, productos, carrito y órdenes.  
Los pagos se encuentran simulados en esta versión.

---

## 🛠️ Stack Tecnológico

### Frontend
- React
- Vite
- TypeScript
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT (autenticación)
- bcrypt

---

## 📁 Estructura del proyecto

```bash
ecommerce-nova/
│
├── frontend/        # Aplicación React (cliente)
│
├── backend/         # API REST (servidor)
│
└── README.md
