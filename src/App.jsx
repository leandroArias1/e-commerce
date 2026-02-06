import { BrowserRouter, Routes, Route, Navigate, useParams, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Collections from './pages/Collections';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminSettings from './pages/admin/AdminSettings';
import AdminCollections from './pages/admin/AdminCollections';
import { useStore } from './store/useStore';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

const Footer = () => {
  const { settings } = useStore();
  return (
    <footer className="bg-black border-t border-gray py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-display font-bold mb-4 text-primary">{settings.storeName}</h3>
            <p className="text-gray-light text-sm">Streetwear Premium<br />Urban Culture</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/shop?category=1" className="text-gray-light hover:text-primary">Remeras</a></li>
              <li><a href="/shop?category=2" className="text-gray-light hover:text-primary">Hoodies</a></li>
              <li><a href="/shop?category=3" className="text-gray-light hover:text-primary">Pantalones</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Info</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-gray-light hover:text-primary">Sobre {settings.storeName}</a></li>
              <li><a href="/contact" className="text-gray-light hover:text-primary">Contacto</a></li>
              <li><a href="/collections" className="text-gray-light hover:text-primary">Colecciones</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-light">
              <li>{settings.storeEmail}</li>
              <li>{settings.storePhone}</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray text-center">
          <p className="text-gray-light text-sm">© 2026 {settings.storeName}. Desarrollado por Web Express</p>
        </div>
      </div>
    </footer>
  );
};

// Solo admins pueden acceder
const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-dark-gray flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-danger/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-danger" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
          <p className="text-gray-light mb-6">No tenés permisos para acceder al panel de administración.</p>
          <Link to="/" className="btn btn-primary">Volver al inicio</Link>
        </div>
      </div>
    );
  }
  
  return children;
};

const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

// Página de confirmación de pedido
const OrderConfirmation = () => {
  const { id } = useParams();
  const { orders } = useStore();
  const order = orders.find(o => o.id.toString() === id);

  return (
    <div className="min-h-screen bg-dark-gray flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-success" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">¡Pedido Confirmado!</h1>
        <p className="text-gray-light mb-2">Gracias por tu compra</p>
        <p className="text-4xl font-bold text-primary mb-6">#{id}</p>
        
        {order && (
          <div className="card text-left mb-6">
            <h3 className="font-semibold mb-4">Resumen del pedido</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-light">Productos:</span>
                <span>{order.items?.length || 0} items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-light">Subtotal:</span>
                <span>${order.subtotal?.toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Descuento:</span>
                  <span>-${order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-light">Envío:</span>
                <span>{order.shipping === 0 ? 'GRATIS' : `$${order.shipping?.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray">
                <span>Total:</span>
                <span className="text-primary">${order.total?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        <p className="text-gray-light text-sm mb-8">
          Te enviamos un email con los detalles de tu pedido.<br />
          Podés seguir el estado desde tu cuenta.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary inline-flex items-center justify-center gap-2">
            Volver al Inicio
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/account" className="btn btn-outline">Ver mis pedidos</Link>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const { settings } = useStore();
  return (
    <div className="min-h-screen bg-dark-gray py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center">About <span className="text-primary">{settings.storeName}</span></h1>
        <div className="card">
          <p className="text-lg text-gray-light leading-relaxed mb-6">{settings.storeName} es más que ropa. Es una cultura urbana que representa autenticidad y estilo. Nacimos con la visión de crear streetwear premium accesible para todos.</p>
          <p className="text-lg text-gray-light leading-relaxed">Cada prenda está diseñada pensando en la comunidad que nos inspira. Calidad, diseño y actitud son los pilares de nuestra marca.</p>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const { settings } = useStore();
  return (
    <div className="min-h-screen bg-dark-gray py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-display font-bold mb-8 text-center text-primary">Contacto</h1>
        <div className="card mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div><p className="text-sm text-gray-light">Email</p><p className="font-semibold">{settings.storeEmail}</p></div>
            <div><p className="text-sm text-gray-light">Teléfono</p><p className="font-semibold">{settings.storePhone}</p></div>
            <div className="sm:col-span-2"><p className="text-sm text-gray-light">Dirección</p><p className="font-semibold">{settings.storeAddress}</p></div>
          </div>
        </div>
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Envianos un mensaje</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm mb-2">Nombre</label><input type="text" className="input" /></div>
              <div><label className="block text-sm mb-2">Email</label><input type="email" className="input" /></div>
            </div>
            <div><label className="block text-sm mb-2">Mensaje</label><textarea className="input" rows="5"></textarea></div>
            <button type="button" className="btn btn-primary w-full">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/shop" element={<PublicLayout><Shop /></PublicLayout>} />
        <Route path="/product/:slug" element={<PublicLayout><ProductDetail /></PublicLayout>} />
        <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
        <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
        <Route path="/wishlist" element={<PublicLayout><Wishlist /></PublicLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<PublicLayout><Account /></PublicLayout>} />
        <Route path="/account/*" element={<PublicLayout><Account /></PublicLayout>} />
        <Route path="/collections" element={<PublicLayout><Collections /></PublicLayout>} />
        <Route path="/collections/:slug" element={<PublicLayout><Collections /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/order-confirmation/:id" element={<PublicLayout><OrderConfirmation /></PublicLayout>} />
        
        {/* Admin routes - solo para usuarios con isAdmin: true */}
        <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="collections" element={<AdminCollections />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
