import { useState } from 'react';
import { Search, Eye, Package, Truck, CheckCircle, XCircle, Clock, Filter, TrendingUp, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useToast } from '../../components/Toast';

const AdminOrders = () => {
  const toast = useToast();
  const { orders, updateOrderStatus } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toString().includes(searchTerm) || order.email?.toLowerCase().includes(searchTerm.toLowerCase()) || order.firstName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'pending', label: 'Pendiente', icon: Clock, class: 'bg-warning/20 text-warning' },
    { value: 'processing', label: 'Procesando', icon: Package, class: 'bg-info/20 text-info' },
    { value: 'shipped', label: 'Enviado', icon: Truck, class: 'bg-purple-500/20 text-purple-400' },
    { value: 'delivered', label: 'Entregado', icon: CheckCircle, class: 'bg-success/20 text-success' },
    { value: 'cancelled', label: 'Cancelado', icon: XCircle, class: 'bg-danger/20 text-danger' },
  ];

  const getStatusConfig = (status) => statusOptions.find(s => s.value === status) || statusOptions[0];

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Estado actualizado a "${getStatusConfig(newStatus).label}"`);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    revenue: orders.reduce((sum, o) => sum + o.total, 0),
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">Gestión de Pedidos</h1>
        <p className="text-gray-light">{filteredOrders.length} pedidos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-light">Total</span>
            <Package className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-light">Pendientes</span>
            <Clock className="w-5 h-5 text-warning" />
          </div>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-light">Entregados</span>
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <p className="text-2xl font-bold">{stats.delivered}</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-light">Ingresos</span>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold">${(stats.revenue / 1000).toFixed(0)}k</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-light" />
            <input type="text" placeholder="Buscar por ID, email o nombre..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input pl-10" />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-light" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input pl-10">
              <option value="">Todos los estados</option>
              {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
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
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-light uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-light uppercase hidden md:table-cell">Fecha</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-light uppercase">Cliente</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-light uppercase">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-light uppercase">Estado</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-light uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => {
                  const statusConfig = getStatusConfig(order.status);
                  return (
                    <tr key={order.id} className="border-b border-gray hover:bg-dark-gray/50">
                      <td className="px-4 py-3 font-semibold">#{order.id.toString().slice(-4)}</td>
                      <td className="px-4 py-3 text-sm text-gray-light hidden md:table-cell">{formatDate(order.date)}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-sm">{order.firstName} {order.lastName}</p>
                        <p className="text-xs text-gray-light hidden md:block">{order.email}</p>
                      </td>
                      <td className="px-4 py-3 font-semibold">${order.total.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`text-xs font-semibold px-2 py-1 rounded-lg border-0 cursor-pointer ${statusConfig.class}`}
                        >
                          {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => setSelectedOrder(order)} className="p-2 hover:bg-primary/20 rounded-lg" title="Ver detalle">
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
          <p className="text-gray-light">{searchTerm || statusFilter ? 'No se encontraron pedidos' : 'No hay pedidos'}</p>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-dark-gray border border-gray rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b border-gray sticky top-0 bg-dark-gray flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold">Pedido #{selectedOrder.id}</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-light hover:text-white p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 md:p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Estado</h3>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                  className={`text-sm font-semibold px-3 py-2 rounded-lg ${getStatusConfig(selectedOrder.status).class}`}
                >
                  {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Cliente</h3>
                <div className="text-sm text-gray-light space-y-1">
                  <p>{selectedOrder.firstName} {selectedOrder.lastName}</p>
                  <p>{selectedOrder.email}</p>
                  <p>{selectedOrder.phone}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dirección</h3>
                <div className="text-sm text-gray-light">
                  <p>{selectedOrder.address}</p>
                  <p>{selectedOrder.city}, {selectedOrder.state} {selectedOrder.zipCode}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Productos</h3>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex gap-3 p-3 bg-gray/30 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" onError={(e) => e.target.src = 'https://via.placeholder.com/56'} />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-light">{item.size} | {item.color} | x{item.quantity}</p>
                      </div>
                      <p className="font-semibold text-sm">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>${selectedOrder.subtotal?.toLocaleString()}</span></div>
                {selectedOrder.discount > 0 && <div className="flex justify-between text-sm text-success"><span>Descuento</span><span>-${selectedOrder.discount.toLocaleString()}</span></div>}
                <div className="flex justify-between text-sm"><span>Envío</span><span>{selectedOrder.shipping === 0 ? 'GRATIS' : `$${selectedOrder.shipping?.toLocaleString()}`}</span></div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray"><span>Total</span><span className="text-primary">${selectedOrder.total.toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
