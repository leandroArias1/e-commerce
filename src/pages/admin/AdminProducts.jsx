import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import ConfirmModal from '../../components/ConfirmModal';
import { useToast } from '../../components/Toast';

const AdminProducts = () => {
  const toast = useToast();
  const { products, categories, addProduct, updateProduct, deleteProduct } = useStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, productId: null, productName: '' });
  const [imagePreview, setImagePreview] = useState('');
  
  const [formData, setFormData] = useState({
    name: '', price: '', originalPrice: '', category: '', stock: '', description: '',
    sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White'], image: '', featured: false, new: false, sale: false,
  });

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === parseInt(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (catId) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.name : 'Sin categoría';
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name, price: product.price, originalPrice: product.originalPrice || '',
      category: product.category.toString(), stock: product.stock, description: product.description || '',
      sizes: product.sizes || ['S', 'M', 'L', 'XL'], colors: product.colors || ['Black', 'White'],
      image: product.image || '', featured: product.featured || false, new: product.new || false, sale: product.sale || false,
    });
    setImagePreview(product.image || '');
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, image: url }));
    setImagePreview(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      category: Number(formData.category),
      stock: Number(formData.stock),
      description: formData.description,
      sizes: formData.sizes,
      colors: formData.colors,
      image: formData.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      featured: formData.featured,
      new: formData.new,
      sale: formData.originalPrice ? true : formData.sale,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast.success('Producto actualizado');
    } else {
      addProduct(productData);
      toast.success('Producto creado');
    }
    
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setImagePreview('');
    setFormData({ name: '', price: '', originalPrice: '', category: '', stock: '', description: '', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White'], image: '', featured: false, new: false, sale: false });
  };

  const handleDeleteConfirm = () => {
    deleteProduct(deleteModal.productId);
    toast.success('Producto eliminado');
    setDeleteModal({ isOpen: false, productId: null, productName: '' });
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Sin stock', class: 'bg-danger/20 text-danger' };
    if (stock < 10) return { label: 'Stock bajo', class: 'bg-warning/20 text-warning' };
    return { label: 'OK', class: 'bg-success/20 text-success' };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Gestión de Productos</h1>
          <p className="text-gray-light">{filteredProducts.length} productos</p>
        </div>
        <button onClick={() => { setEditingProduct(null); setFormData({ name: '', price: '', originalPrice: '', category: '', stock: '', description: '', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White'], image: '', featured: false, new: false, sale: false }); setImagePreview(''); setShowModal(true); }} className="btn btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> Nuevo Producto
        </button>
      </div>

      <div className="card">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-light" />
            <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input pl-10" />
          </div>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="input">
            <option value="">Todas las categorías</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </div>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-light uppercase">Producto</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-light uppercase">Categoría</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-light uppercase">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-light uppercase">Estado</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-light uppercase">Precio</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-light uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => {
                const status = getStockStatus(product.stock);
                return (
                  <tr key={product.id} className="border-b border-gray hover:bg-dark-gray/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt="" className="w-12 h-12 object-cover rounded" onError={(e) => e.target.src = 'https://via.placeholder.com/48'} />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-gray-light">{product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="badge badge-info">{getCategoryName(product.category)}</span></td>
                    <td className="px-4 py-3"><span className="font-semibold">{product.stock}</span></td>
                    <td className="px-4 py-3"><span className={`badge ${status.class}`}>{status.label}</span></td>
                    <td className="px-4 py-3"><span className="font-semibold">${product.price.toLocaleString()}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(product)} className="p-2 hover:bg-primary/20 rounded-lg"><Edit2 className="w-4 h-4 text-primary" /></button>
                        <button onClick={() => setDeleteModal({ isOpen: true, productId: product.id, productName: product.name })} className="p-2 hover:bg-danger/20 rounded-lg"><Trash2 className="w-4 h-4 text-danger" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-gray border border-gray rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray flex items-center justify-between sticky top-0 bg-dark-gray z-10">
              <h2 className="text-2xl font-bold">{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
              <button onClick={closeModal} className="text-gray-light hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">URL de Imagen</label>
                {imagePreview && <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mb-2" onError={(e) => e.target.style.display = 'none'} />}
                <input type="url" value={formData.image} onChange={handleImageChange} className="input" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nombre *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Precio *</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="input" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Precio Original (oferta)</label>
                  <input type="number" value={formData.originalPrice} onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })} className="input" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Categoría *</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="input" required>
                    <option value="">Seleccionar...</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Stock *</label>
                  <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="input" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Descripción</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input" rows="3" />
              </div>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4 rounded" />
                  <span className="text-sm">Destacado</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.new} onChange={(e) => setFormData({ ...formData, new: e.target.checked })} className="w-4 h-4 rounded" />
                  <span className="text-sm">Nuevo</span>
                </label>
              </div>
              <div className="flex justify-end gap-4 pt-4 border-t border-gray">
                <button type="button" onClick={closeModal} className="btn btn-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary">{editingProduct ? 'Guardar' : 'Crear'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal isOpen={deleteModal.isOpen} onClose={() => setDeleteModal({ isOpen: false, productId: null, productName: '' })} onConfirm={handleDeleteConfirm} title="Eliminar Producto" message={`¿Eliminar "${deleteModal.productName}"?`} confirmText="Eliminar" type="danger" />
    </div>
  );
};

export default AdminProducts;
