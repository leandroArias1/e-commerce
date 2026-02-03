import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Home } from 'lucide-react';
import { useStore } from '../store/useStore';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Productos' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Pedidos' },
    { path: '/admin/customers', icon: Users, label: 'Clientes' },
    { path: '/admin/settings', icon: Settings, label: 'Configuración' },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-gray border-r border-gray fixed left-0 top-0 h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-primary">V</span>
            </div>
            <div>
              <h2 className="font-bold text-lg">VOLT Admin</h2>
              <p className="text-xs text-gray-light">Panel de Control</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
                            (item.path === '/admin' && location.pathname === '/admin/');
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-gray-light hover:bg-gray/50 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 space-y-2 border-t border-gray">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-light hover:bg-gray/50 hover:text-white transition-all"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Volver a la Tienda</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-danger hover:bg-danger/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
