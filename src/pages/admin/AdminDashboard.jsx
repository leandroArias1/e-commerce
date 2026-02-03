import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { products } from '../../data/products';
import { Package, DollarSign, AlertTriangle, TrendingUp, Users, ShoppingCart } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AdminDashboard = () => {
  const { orders } = useStore();

  // Estadísticas
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock < 10).length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  
  // Productos con stock bajo
  const lowStockList = products
    .filter(p => p.stock < 10)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);

  // Stock por categoría
  const stockByCategory = [
    { name: 'Remeras', stock: products.filter(p => p.category === 1).reduce((sum, p) => sum + p.stock, 0) },
    { name: 'Hoodies', stock: products.filter(p => p.category === 2).reduce((sum, p) => sum + p.stock, 0) },
    { name: 'Pantalones', stock: products.filter(p => p.category === 3).reduce((sum, p) => sum + p.stock, 0) },
    { name: 'Accesorios', stock: products.filter(p => p.category === 4).reduce((sum, p) => sum + p.stock, 0) },
  ];

  // Ventas últimos 7 días (simulado)
  const salesData = [
    { date: '25/01', ventas: 15, ingresos: 420000 },
    { date: '26/01', ventas: 23, ingresos: 580000 },
    { date: '27/01', ventas: 18, ingresos: 490000 },
    { date: '28/01', ventas: 31, ingresos: 720000 },
    { date: '29/01', ventas: 27, ingresos: 650000 },
    { date: '30/01', ventas: 35, ingresos: 820000 },
    { date: '31/01', ventas: 29, ingresos: 710000 },
  ];

  // Top productos vendidos
  const topProducts = [
    { name: 'VOLT Essential Hoodie', ventas: 45 },
    { name: 'VOLT Logo Tee', ventas: 38 },
    { name: 'Joggers Premium', ventas: 32 },
    { name: 'Cargo Pants', ventas: 28 },
    { name: 'Oversized Drop Tee', ventas: 25 },
  ];

  const COLORS = ['#E8D5C4', '#8B7355', '#7FA98F', '#D4A574'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Dashboard</h1>
        <p className="text-gray-light">Resumen general de la tienda</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs text-gray-light">Total</span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{totalProducts}</h3>
          <p className="text-sm text-gray-light">Productos</p>
        </div>

        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-success" />
            </div>
            <span className="text-xs text-gray-light">Este mes</span>
          </div>
          <h3 className="text-3xl font-bold mb-1">${(totalRevenue / 1000).toFixed(0)}k</h3>
          <p className="text-sm text-gray-light">Ingresos</p>
        </div>

        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-danger/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-danger" />
            </div>
            <span className="text-xs text-gray-light">Crítico</span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{lowStockProducts}</h3>
          <p className="text-sm text-gray-light">Stock bajo</p>
        </div>

        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-info/20 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-info" />
            </div>
            <span className="text-xs text-gray-light">Total</span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{totalOrders}</h3>
          <p className="text-sm text-gray-light">Pedidos</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Ventas últimos 7 días */}
        <div className="card">
          <h3 className="text-xl font-bold mb-6">Ventas - Últimos 7 Días</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis dataKey="date" stroke="#A0A0A0" fontSize={12} />
              <YAxis stroke="#A0A0A0" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="ventas" stroke="#E8D5C4" strokeWidth={2} name="Ventas" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stock por categoría */}
        <div className="card">
          <h3 className="text-xl font-bold mb-6">Stock por Categoría</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stockByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="stock"
              >
                {stockByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top productos */}
        <div className="card">
          <h3 className="text-xl font-bold mb-6">Top Productos Vendidos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis type="number" stroke="#A0A0A0" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="#A0A0A0" fontSize={12} width={150} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
              />
              <Bar dataKey="ventas" fill="#8B7355" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alertas de stock bajo */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Alertas de Stock Bajo</h3>
            <Link to="/admin/products" className="text-sm text-primary hover:text-primary-dark">
              Ver todos
            </Link>
          </div>
          <div className="space-y-3 max-h-[268px] overflow-y-auto">
            {lowStockList.length > 0 ? (
              lowStockList.map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-danger/10 border border-danger/20 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-gray-light">{product.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-danger">{product.stock} unidades</p>
                    <p className="text-xs text-gray-light">Stock crítico</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <AlertTriangle className="w-12 h-12 text-gray-light mx-auto mb-2" />
                <p className="text-gray-light text-sm">No hay productos con stock bajo</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
