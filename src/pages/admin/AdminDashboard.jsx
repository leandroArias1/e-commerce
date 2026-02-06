import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Package, DollarSign, AlertTriangle, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const { orders, products, settings, getCustomers } = useStore();
  const customers = getCustomers();

  // Estadísticas reales
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock < settings.stockThreshold).length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalCustomers = customers.length;

  // Productos con stock bajo
  const lowStockList = products.filter(p => p.stock < settings.stockThreshold).sort((a, b) => a.stock - b.stock).slice(0, 5);

  // Stock por categoría (datos reales)
  const stockByCategory = [
    { name: 'Remeras', stock: products.filter(p => p.category === 1).reduce((sum, p) => sum + p.stock, 0), fill: '#E8D5C4' },
    { name: 'Hoodies', stock: products.filter(p => p.category === 2).reduce((sum, p) => sum + p.stock, 0), fill: '#8B7355' },
    { name: 'Pantalones', stock: products.filter(p => p.category === 3).reduce((sum, p) => sum + p.stock, 0), fill: '#7FA98F' },
    { name: 'Accesorios', stock: products.filter(p => p.category === 4).reduce((sum, p) => sum + p.stock, 0), fill: '#D4A574' },
  ];

  // Ventas por estado (datos reales)
  const ordersByStatus = [
    { name: 'Pendientes', value: orders.filter(o => o.status === 'pending').length, fill: '#FFD700' },
    { name: 'Procesando', value: orders.filter(o => o.status === 'processing').length, fill: '#00D4FF' },
    { name: 'Enviados', value: orders.filter(o => o.status === 'shipped').length, fill: '#BB00FF' },
    { name: 'Entregados', value: orders.filter(o => o.status === 'delivered').length, fill: '#00FF88' },
  ];

  // Ingresos por pedido (últimos 7 pedidos)
  const revenueData = orders.slice(0, 7).reverse().map((order, i) => ({
    name: `#${order.id.toString().slice(-4)}`,
    total: order.total,
    items: order.items?.length || 0,
  }));

  // Top productos vendidos (basado en orders)
  const productSales = {};
  orders.forEach(order => {
    order.items?.forEach(item => {
      productSales[item.name] = (productSales[item.name] || 0) + item.quantity;
    });
  });
  const topProducts = Object.entries(productSales).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, ventas]) => ({ name: name.length > 20 ? name.substring(0, 20) + '...' : name, ventas }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Dashboard</h1>
        <p className="text-gray-light">Datos en tiempo real de la tienda</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-1">{totalProducts}</h3>
          <p className="text-sm text-gray-light">Productos</p>
        </div>

        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-success" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-1">${(totalRevenue / 1000).toFixed(0)}k</h3>
          <p className="text-sm text-gray-light">Ingresos</p>
        </div>

        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-info/20 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-info" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-1">{totalOrders}</h3>
          <p className="text-sm text-gray-light">Pedidos ({pendingOrders} pendientes)</p>
        </div>

        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-warning" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-1">{totalCustomers}</h3>
          <p className="text-sm text-gray-light">Clientes</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Ingresos por pedido */}
        <div className="card">
          <h3 className="text-xl font-bold mb-6">Ingresos por Pedido</h3>
          {revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis dataKey="name" stroke="#A0A0A0" fontSize={12} />
                <YAxis stroke="#A0A0A0" fontSize={12} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }} formatter={(v) => [`$${v.toLocaleString()}`, 'Total']} />
                <Bar dataKey="total" fill="#E8D5C4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-gray-light">No hay datos de pedidos</div>
          )}
        </div>

        {/* Stock por categoría */}
        <div className="card">
          <h3 className="text-xl font-bold mb-6">Stock por Categoría</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={stockByCategory} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} dataKey="stock">
                {stockByCategory.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top productos */}
        <div className="card">
          <h3 className="text-xl font-bold mb-6">Top Productos Vendidos</h3>
          {topProducts.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis type="number" stroke="#A0A0A0" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#A0A0A0" fontSize={11} width={120} />
                <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }} />
                <Bar dataKey="ventas" fill="#8B7355" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-gray-light">No hay datos de ventas</div>
          )}
        </div>

        {/* Alertas de stock bajo */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-danger" />
              Stock Bajo ({lowStockProducts})
            </h3>
            <Link to="/admin/products" className="text-sm text-primary hover:underline">Ver todos</Link>
          </div>
          <div className="space-y-3 max-h-[250px] overflow-y-auto">
            {lowStockList.length > 0 ? (
              lowStockList.map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-danger/10 border border-danger/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt="" className="w-10 h-10 object-cover rounded" />
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-gray-light">{product.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-danger">{product.stock} und.</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-light">
                <AlertTriangle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No hay productos con stock bajo</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pedidos recientes */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Pedidos Recientes</h3>
          <Link to="/admin/orders" className="text-sm text-primary hover:underline">Ver todos</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-light uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-light uppercase">Cliente</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-light uppercase">Total</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-light uppercase">Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} className="border-b border-gray/50">
                  <td className="px-4 py-3 font-semibold">#{order.id}</td>
                  <td className="px-4 py-3">{order.firstName} {order.lastName}</td>
                  <td className="px-4 py-3 font-semibold">${order.total.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${order.status === 'delivered' ? 'bg-success/20 text-success' : order.status === 'shipped' ? 'bg-info/20 text-info' : order.status === 'processing' ? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'}`}>
                      {order.status === 'delivered' ? 'Entregado' : order.status === 'shipped' ? 'Enviado' : order.status === 'processing' ? 'Procesando' : 'Pendiente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
