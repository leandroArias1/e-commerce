import { useState } from 'react';
import { Search, Mail, Phone, MapPin, ShoppingBag, TrendingUp, User, X, Package } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { users } from '../../data/products';

const AdminCustomers = () => {
  const { orders } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Obtener clientes con sus pedidos reales
  const customers = users.map(user => {
    const userOrders = orders.filter(o => o.email === user.email);
    const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);
    
    return {
      ...user,
      ordersCount: userOrders.length,
      totalSpent,
      orders: userOrders.sort((a, b) => new Date(b.date) - new Date(a.date)),
      lastOrder: userOrders.length > 0 ? userOrders[0].date : null,
    };
  });

  // Filtrar clientes
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estadísticas
  const stats = {
    total: customers.length,
    active: customers.filter(c => c.ordersCount > 0).length,
    totalOrders: orders.length,
    avgOrderValue: orders.length > 0 ? Math.round(orders.reduce((sum, o) => sum + o.total, 0) / orders.length) : 0,
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: { label: 'Pendiente', class: 'badge-new' },
      processing: { label: 'Procesando', class: 'badge-info' },
      shipped: { label: 'Enviado', class: 'badge-info' },
      delivered: { label: 'Entregado', class: 'badge-success' },
      cancelled: { label: 'Cancelado', class: 'badge-sale' },
    };
    return configs[status] || configs.pending;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Gestión de Clientes</h1>
        <p className="text-gray-light">{filteredCustomers.length} clientes registrados</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-light">Total Clientes</span>
            <User className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-light">Clientes Activos</span>
            <ShoppingBag className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold">{stats.active}</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-light">Total Pedidos</span>
            <Package className="w-5 h-5 text-info" />
          </div>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-light">Ticket Promedio</span>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">${(stats.avgOrderValue / 1000).toFixed(0)}k</p>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-light" />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      {/* Customers Grid */}
      {filteredCustomers.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map(customer => (
            <div 
              key={customer.id} 
              className="card hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => setSelectedCustomer(customer)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg truncate">{customer.name}</h3>
                  <p className="text-sm text-gray-light truncate">{customer.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-light">
                  <Phone className="w-4 h-4" />
                  <span>{customer.phone}</span>
                </div>
                {customer.addresses && customer.addresses.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-light">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{customer.addresses[0].city}, {customer.addresses[0].state}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">{customer.ordersCount}</p>
                  <p className="text-xs text-gray-light">Pedidos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">${(customer.totalSpent / 1000).toFixed(0)}k</p>
                  <p className="text-xs text-gray-light">Gastado</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <User className="w-16 h-16 text-gray-light mx-auto mb-4" />
          <p className="text-gray-light">
            {searchTerm ? 'No se encontraron clientes' : 'No hay clientes registrados aún'}
          </p>
        </div>
      )}

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-dark-gray border border-gray rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray sticky top-0 bg-dark-gray z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCustomer.name}</h2>
                    <p className="text-sm text-gray-light">{selectedCustomer.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-gray-light hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Información de Contacto
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray/30 rounded-lg">
                    <p className="text-xs text-gray-light mb-1">Email</p>
                    <p className="text-sm font-medium">{selectedCustomer.email}</p>
                  </div>
                  <div className="p-3 bg-gray/30 rounded-lg">
                    <p className="text-xs text-gray-light mb-1">Teléfono</p>
                    <p className="text-sm font-medium">{selectedCustomer.phone}</p>
                  </div>
                </div>
              </div>

              {/* Addresses */}
              {selectedCustomer.addresses && selectedCustomer.addresses.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Direcciones ({selectedCustomer.addresses.length})
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedCustomer.addresses.map(address => (
                      <div key={address.id} className="p-4 bg-gray/30 rounded-lg border border-gray">
                        <p className="font-medium mb-1">{address.street}</p>
                        <p className="text-sm text-gray-light">{address.city}, {address.state} {address.zipCode}</p>
                        {address.isDefault && (
                          <span className="inline-block mt-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                            Principal
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div>
                <h3 className="font-semibold mb-3">Estadísticas del Cliente</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="card text-center">
                    <p className="text-3xl font-bold text-primary">{selectedCustomer.ordersCount}</p>
                    <p className="text-xs text-gray-light mt-1">Pedidos</p>
                  </div>
                  <div className="card text-center">
                    <p className="text-3xl font-bold text-primary">${selectedCustomer.totalSpent.toLocaleString()}</p>
                    <p className="text-xs text-gray-light mt-1">Total Gastado</p>
                  </div>
                  <div className="card text-center">
                    <p className="text-3xl font-bold text-primary">
                      ${selectedCustomer.ordersCount > 0 ? Math.round(selectedCustomer.totalSpent / selectedCustomer.ordersCount).toLocaleString() : 0}
                    </p>
                    <p className="text-xs text-gray-light mt-1">Ticket Promedio</p>
                  </div>
                </div>
              </div>

              {/* Orders History */}
              {selectedCustomer.orders && selectedCustomer.orders.length > 0 ? (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    Historial de Pedidos ({selectedCustomer.orders.length})
                  </h3>
                  <div className="space-y-4">
                    {selectedCustomer.orders.map(order => {
                      const statusConfig = getStatusConfig(order.status);

                      return (
                        <div key={order.id} className="p-5 bg-gray/30 rounded-lg border border-gray">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <p className="font-bold text-xl text-primary">Pedido #{order.id}</p>
                              <p className="text-sm text-gray-light">
                                {new Date(order.date).toLocaleDateString('es-AR', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                            <span className={`badge ${statusConfig.class}`}>
                              {statusConfig.label}
                            </span>
                          </div>

                          {/* Items del pedido */}
                          <div className="mb-4">
                            <p className="text-sm font-semibold mb-3 text-gray-light uppercase">Productos:</p>
                            <div className="space-y-2">
                              {order.items?.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-dark-gray rounded-lg">
                                  <div className="w-14 h-14 bg-gray rounded overflow-hidden flex-shrink-0">
                                    <img 
                                      src={item.image} 
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%231A1A1A" width="100" height="100"/%3E%3C/svg%3E'}
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold truncate">{item.name}</p>
                                    <p className="text-xs text-gray-light">
                                      Talle: {item.size} | Color: {item.color} | Cantidad: x{item.quantity}
                                    </p>
                                  </div>
                                  <p className="font-bold text-primary whitespace-nowrap">
                                    ${(item.price * item.quantity).toLocaleString()}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Resumen de costos */}
                          <div className="border-t border-gray pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-light">Subtotal:</span>
                              <span className="font-medium">${order.subtotal.toLocaleString()}</span>
                            </div>
                            {order.discount > 0 && (
                              <div className="flex justify-between text-sm text-success">
                                <span>Descuento {order.coupon?.code && `(${order.coupon.code})`}:</span>
                                <span className="font-medium">-${order.discount.toLocaleString()}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-light">Envío:</span>
                              <span className="font-medium">{order.shipping === 0 ? 'GRATIS' : `$${order.shipping.toLocaleString()}`}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray">
                              <span>Total:</span>
                              <span className="text-primary">${order.total.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 card">
                  <Package className="w-12 h-12 text-gray-light mx-auto mb-2" />
                  <p className="text-gray-light">Este cliente aún no tiene pedidos</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;
