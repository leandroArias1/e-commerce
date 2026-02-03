import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Account from './pages/Account';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminSettings from './pages/admin/AdminSettings';
import { useStore } from './store/useStore';

// Footer
const Footer = () => (
  <footer className="bg-black border-t border-gray py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-display font-bold mb-4 text-primary">VOLT</h3>
          <p className="text-gray-light text-sm mb-4">
            Streetwear Premium<br />Urban Culture
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/shop" className="text-gray-light hover:text-primary transition-colors">Remeras</a></li>
            <li><a href="/shop" className="text-gray-light hover:text-primary transition-colors">Hoodies</a></li>
            <li><a href="/shop" className="text-gray-light hover:text-primary transition-colors">Pantalones</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Info</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="text-gray-light hover:text-primary transition-colors">Sobre VOLT</a></li>
            <li><a href="/contact" className="text-gray-light hover:text-primary transition-colors">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Newsletter</h4>
          <div className="flex gap-2">
            <input type="email" placeholder="Email" className="input flex-1" />
            <button className="btn btn-primary px-4">→</button>
          </div>
        </div>
      </div>
      <div className="pt-8 border-t border-gray text-center">
        <p className="text-gray-light text-sm">
          © 2026 VOLT. Desarrollado por Web Express - Plan Pro
        </p>
      </div>
    </div>
  </footer>
);

// Protected Admin Route
const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated } = useStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Placeholder pages
const Collections = () => (
  <div className="min-h-screen bg-dark-gray py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-display font-bold mb-8 text-center">
        <span className="text-primary">Colecciones</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {['Neon Nights', 'Essential Pack', 'Street Elite'].map((col, i) => (
          <div key={i} className="card hover:shadow-xl transition-all cursor-pointer">
            <div className="aspect-square bg-gray rounded-lg mb-4"></div>
            <h3 className="text-xl font-bold mb-2 text-primary">{col}</h3>
            <p className="text-gray-light text-sm">Ver colección →</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const About = () => (
  <div className="min-h-screen bg-dark-gray py-12">
    <div className="container mx-auto px-4 max-w-4xl">
      <h1 className="text-5xl font-display font-bold mb-8 text-center">
        About <span className="text-primary">VOLT</span>
      </h1>
      <div className="card text-center">
        <p className="text-lg text-gray-light leading-relaxed">
          VOLT es más que ropa. Es una cultura urbana que representa autenticidad y estilo.
        </p>
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="min-h-screen bg-dark-gray py-12">
    <div className="container mx-auto px-4 max-w-2xl">
      <h1 className="text-4xl font-display font-bold mb-8 text-center text-primary">
        Contacto
      </h1>
      <div className="card">
        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Nombre</label>
            <input type="text" className="input" />
          </div>
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input type="email" className="input" />
          </div>
          <div>
            <label className="block text-sm mb-2">Mensaje</label>
            <textarea className="input" rows="5"></textarea>
          </div>
          <button className="btn btn-primary w-full">Enviar</button>
        </form>
      </div>
    </div>
  </div>
);

const OrderConfirmation = () => {
  const orderId = window.location.pathname.split('/').pop();
  return (
    <div className="min-h-screen bg-dark-gray flex items-center justify-center">
      <div className="text-center card max-w-md">
        <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">¡Pedido Confirmado!</h1>
        <p className="text-gray-light mb-2">Número de orden</p>
        <p className="text-2xl font-bold text-primary mb-6">#{orderId}</p>
        <div className="flex gap-4">
          <a href="/" className="btn btn-primary flex-1">Volver</a>
          <a href="/account" className="btn btn-secondary flex-1">Ver pedidos</a>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1"><Home /></main>
            <Footer />
          </div>
        } />
        <Route path="/shop" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1"><Shop /></main>
            <Footer />
          </div>
        } />
        <Route path="/product/:slug" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1"><ProductDetail /></main>
            <Footer />
          </div>
        } />
        <Route path="/cart" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1"><Cart /></main>
            <Footer />
          </div>
        } />
        <Route path="/checkout" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1"><Checkout /></main>
            <Footer />
          </div>
        } />
        <Route path="/wishlist" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1"><Wishlist /></main>
            <Footer />
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1"><Account /></main>
            <Footer />
          </div>
        } />
        <Route path="/collections" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1"><Collections /></main>
            <Footer />
          </div>
        } />
        <Route path="/about" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1"><About /></main>
            <Footer />
          </div>
        } />
        <Route path="/contact" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1"><Contact /></main>
            <Footer />
          </div>
        } />
        <Route path="/order-confirmation/:id" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1"><OrderConfirmation /></main>
            <Footer />
          </div>
        } />

        {/* Admin routes */}
        <Route path="/admin" element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
