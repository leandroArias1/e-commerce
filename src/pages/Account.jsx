import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { User, Package, Heart, MapPin, LogOut } from 'lucide-react';

const Account = () => {
  const { user, isAuthenticated, logout, orders } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'profile', label: 'Mi Perfil', icon: User },
    { id: 'orders', label: 'Mis Pedidos', icon: Package },
    { id: 'wishlist', label: 'Favoritos', icon: Heart },
    { id: 'addresses', label: 'Direcciones', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-dark-gray py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold mb-8">
          Mi <span className="neon-text">Cuenta</span>
        </h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card space-y-2">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-light hover:bg-gray/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-danger hover:bg-danger/10 transition-all mt-4"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Información Personal</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Nombre</label>
                    <input type="text" value={user?.name || ''} className="input" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Email</label>
                    <input type="email" value={user?.email || ''} className="input" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Teléfono</label>
                    <input type="tel" value={user?.phone || ''} className="input" readOnly />
                  </div>
                  <button className="btn btn-primary mt-4">Editar Información</button>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Mis Pedidos</h2>
                {orders.length > 0 ? (
                  orders.map(order => (
                    <div key={order.id} className="card">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-bold">Pedido #{order.id}</p>
                          <p className="text-sm text-gray-light">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                          {order.status === 'pending' ? 'Pendiente' : 'Completado'}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        {order.items.slice(0, 2).map((item, idx) => (
                          <p key={idx} className="text-sm text-gray-light">
                            {item.name} x{item.quantity}
                          </p>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray">
                        <span className="font-bold">Total: ${order.total.toLocaleString()}</span>
                        <button className="btn btn-outline btn-sm">Ver Detalle</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="card text-center py-12">
                    <Package className="w-16 h-16 text-gray-light mx-auto mb-4" />
                    <p className="text-gray-light">No tenés pedidos aún</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Favoritos</h2>
                <p className="text-gray-light">Ver en <a href="/wishlist" className="text-primary hover:underline">tu lista de favoritos</a></p>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Mis Direcciones</h2>
                {user?.addresses?.map(addr => (
                  <div key={addr.id} className="p-4 bg-dark-gray rounded-lg mb-4">
                    <p className="font-semibold mb-2">{addr.street}</p>
                    <p className="text-sm text-gray-light">{addr.city}, {addr.state} {addr.zipCode}</p>
                    {addr.isDefault && (
                      <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        Principal
                      </span>
                    )}
                  </div>
                ))}
                <button className="btn btn-outline mt-4">+ Agregar Dirección</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
