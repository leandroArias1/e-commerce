import { useState } from 'react';
import { Search, Eye, Package, Truck, CheckCircle, XCircle, Clock, Filter } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const AdminOrders = () => {
  const { orders } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filtrar pedidos
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toString().includes(searchTerm) ||
      order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.firstName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status) => {
    const configs = {
      pending: { label: 'Pendiente', icon: Clock, class: 'badge-new' },
      processing: { label: 'Procesando', icon: Package, class: 'badge-info' },
      shipped: { label: 'Enviado', icon: Truck, class: 'badge-info' },
      delivered: { label: 'Entregado', icon: CheckCircle, class: 'badge-success' },
      cancelled: { label: 'Cancelado', icon: XCircle, class: 'badge-sale' },
    };
    return configs[status] || configs.pending;
  };

  // Estadísticas
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    revenue: orders.reduce((sum, o) => sum + o.total, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Gestión de Pedidos</h1>
        <p className="text-gray-light">{filteredOrders.length} pedidos encontrados</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-light">Total Pedidos</span>
            <Package className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-light">Pendientes</span>
            <Clock className="w-5 h-5 text-warning" />
          </div>
          <p className="text-3xl font-bold">{stats.pending}</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-light">Entregados</span>
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold">{stats.delivered}</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-light">Ingresos</span>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">${(stats.revenue / 1000).toFixed(0)}k</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-light" />
              <input
                type="text"
                placeholder="Buscar por ID, email o nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-light" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input pl-10"
              >
                <option value="">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="processing">Procesando</option>
                <option value="shipped">Enviado</option>
                <option value="delivered">Entregado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      {filteredOrders.length > 0 ? (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-light uppercase">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-light uppercase">Fecha</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-light uppercase">Cliente</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-light uppercase">Items</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-light uppercase">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-light uppercase">Estado</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-light uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => {
                  const statusConfig = getStatusConfig(order.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <tr key={order.id} className="border-b border-gray hover:bg-dark-gray/50">
                      <td className="px-6 py-4">
                        <span className="font-semibold">#{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-light">
                          {format(new Date(order.date), 'dd/MM/yyyy HH:mm', { locale: es })}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{order.firstName} {order.lastName}</p>
                          <p className="text-xs text-gray-light">{order.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm">{order.items?.length || 0} productos</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold">${order.total.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`badge ${statusConfig.class} flex items-center gap-1 w-fit`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
                          title="Ver detalle"
                        >
                          <Eye className="w-4 h-4 text-primary" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card text-center py-12">
          <Package className="w-16 h-16 text-gray-light mx-auto mb-4" />
          <p className="text-gray-light">
            {searchTerm || statusFilter ? 'No se encontraron pedidos con esos filtros' : 'No hay pedidos aún'}
          </p>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-dark-gray border border-gray rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray sticky top-0 bg-dark-gray">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Pedido #{selectedOrder.id}</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-light hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div>
                <h3 className="font-semibold mb-2">Estado</h3>
                <span className={`badge ${getStatusConfig(selectedOrder.status).class}`}>
                  {getStatusConfig(selectedOrder.status).label}
                </span>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-2">Cliente</h3>
                <div className="text-sm space-y-1 text-gray-light">
                  <p>{selectedOrder.firstName} {selectedOrder.lastName}</p>
                  <p>{selectedOrder.email}</p>
                  <p>{selectedOrder.phone}</p>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold mb-2">Dirección de Envío</h3>
                <div className="text-sm text-gray-light">
                  <p>{selectedOrder.address}</p>
                  <p>{selectedOrder.city}, {selectedOrder.state} {selectedOrder.zipCode}</p>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-semibold mb-2">Productos</h3>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex gap-3 p-3 bg-gray/30 rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%231A1A1A" width="100" height="100"/%3E%3C/svg%3E'}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-light">
                          Talle: {item.size} | Color: {item.color} | Cantidad: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="border-t border-gray pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${selectedOrder.subtotal.toLocaleString()}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-sm text-success">
                    <span>Descuento {selectedOrder.coupon?.code && `(${selectedOrder.coupon.code})`}</span>
                    <span>-${selectedOrder.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Envío</span>
                  <span>{selectedOrder.shipping === 0 ? 'GRATIS' : `$${selectedOrder.shipping.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray">
                  <span>Total</span>
                  <span className="text-primary">${selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
