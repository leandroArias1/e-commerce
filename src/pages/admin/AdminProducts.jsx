import { useState } from 'react';
import { products as initialProducts, categories } from '../../data/products';
import { Search, Plus, Edit2, Trash2, Upload, X } from 'lucide-react';
import ConfirmModal from '../../components/ConfirmModal';
import { useToast } from '../../components/Toast';

const AdminProducts = () => {
  const toast = useToast();
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, productId: null, productName: '' });
  const [imagePreview, setImagePreview] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    stock: '',
    description: '',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White'],
    image: '',
  });

  // Filtrar productos
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === parseInt(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || '',
      category: product.category,
      stock: product.stock,
      description: product.description,
      sizes: product.sizes || ['S', 'M', 'L', 'XL'],
      colors: product.colors || ['Black', 'White'],
      image: product.image || '',
    });
    setImagePreview(product.image || '');
    setShowModal(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor seleccioná una imagen válida');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La imagen no debe pesar más de 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        setFormData(prev => ({ 
          ...prev, 
          image: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteClick = (product) => {
    setDeleteModal({
      isOpen: true,
      productId: product.id,
      productName: product.name
    });
  };

  const handleDeleteConfirm = () => {
    setProducts(products.filter(p => p.id !== deleteModal.productId));
    toast.success(`Producto "${deleteModal.productName}" eliminado correctamente`);
    setDeleteModal({ isOpen: false, productId: null, productName: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Editar producto existente
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { 
              ...p, 
              name: formData.name,
              price: Number(formData.price), 
              stock: Number(formData.stock),
              category: Number(formData.category),
              originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
              description: formData.description,
              sizes: formData.sizes,
              colors: formData.colors,
              image: formData.image || p.image,
              images: formData.image ? [formData.image] : p.images,
            }
          : p
      ));
      toast.success(`Producto "${formData.name}" actualizado correctamente`);
    } else {
      // Crear nuevo producto
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        sku: `PROD-${Math.floor(Math.random() * 10000)}`,
        name: formData.name,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: Number(formData.category),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        description: formData.description,
        sizes: formData.sizes,
        colors: formData.colors,
        image: formData.image || '/products/placeholder.jpg',
        images: formData.image ? [formData.image] : ['/products/placeholder.jpg'],
        featured: false,
        new: true,
        sale: formData.originalPrice ? true : false,
        rating: 0,
        reviews: 0,
      };
      setProducts([...products, newProduct]);
      toast.success(`Producto "${formData.name}" creado correctamente`);
    }
    
    setShowModal(false);
    setEditingProduct(null);
    setImagePreview('');
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      category: '',
      stock: '',
      description: '',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'White'],
      image: '',
    });
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Sin stock', class: 'bg-danger/20 text-danger' };
    if (stock < 10) return { label: 'Stock bajo', class: 'bg-warning/20 text-warning' };
    return { label: 'OK', class: 'bg-success/20 text-success' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Gestión de Productos</h1>
          <p className="text-gray-light">{filteredProducts.length} productos encontrados</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setImagePreview('');
            setFormData({
              name: '',
              price: '',
              originalPrice: '',
              category: '',
              stock: '',
              description: '',
              sizes: ['S', 'M', 'L', 'XL'],
              colors: ['Black', 'White'],
              image: '',
            });
            setShowModal(true);
          }}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nuevo Producto
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-light" />
              <input
                type="text"
                placeholder="Buscar por nombre o SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
            >
              <option value="">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-light uppercase">Producto</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-light uppercase">Categoría</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-light uppercase">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-light uppercase">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-light uppercase">Precio</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-light uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => {
                const status = getStockStatus(product.stock);
                const category = categories.find(c => c.id === product.category);
                
                return (
                  <tr key={product.id} className="border-b border-gray hover:bg-dark-gray/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover"
                          onError={(e) => e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%231A1A1A" width="100" height="100"/%3E%3C/svg%3E'}
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-gray-light">{product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="badge badge-info">{category?.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold">{product.stock}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${status.class}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold">${product.price.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4 text-primary" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product)}
                          className="p-2 hover:bg-danger/20 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4 text-danger" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-gray border border-gray rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingProduct(null);
                  setImagePreview('');
                }}
                className="text-gray-light hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Upload de imagen */}
              <div>
                <label className="block text-sm font-medium mb-2">Imagen del Producto</label>
                
                {imagePreview ? (
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover rounded-lg border-2 border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setFormData(prev => ({ ...prev, image: '' }));
                      }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-danger rounded-full flex items-center justify-center hover:bg-danger/80 transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : null}

                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-gray-light mb-2" />
                    <p className="text-sm text-gray-light">
                      <span className="font-semibold">Click para subir</span> o arrastrá una imagen
                    </p>
                    <p className="text-xs text-gray-light mt-1">PNG, JPG o WEBP (máx. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Nombre *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Precio *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Precio Original</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Categoría *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input"
                    required
                  >
                    <option value="">Seleccionar...</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Stock *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input"
                  rows="3"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-gray">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProduct(null);
                    setImagePreview('');
                  }}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmación para Eliminar */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, productId: null, productName: '' })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Producto"
        message={`¿Estás seguro que querés eliminar "${deleteModal.productName}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};

export default AdminProducts;
