import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Search, Plus, Edit2, Trash2, X, Upload, Package } from 'lucide-react';
import ConfirmModal from '../../components/ConfirmModal';
import { useToast } from '../../components/Toast';

const AdminCollections = () => {
  const toast = useToast();
  const { collections, products, addCollection, updateCollection, deleteCollection } = useStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });
  const [imagePreview, setImagePreview] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    productIds: [],
  });

  const filteredCollections = collections.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (collection) => {
    setEditingCollection(collection);
    setFormData({
      name: collection.name,
      description: collection.description,
      image: collection.image || '',
      productIds: collection.productIds || [],
    });
    setImagePreview(collection.image || '');
    setShowModal(true);
  };

  const toggleProduct = (productId) => {
    setFormData(prev => ({
      ...prev,
      productIds: prev.productIds.includes(productId)
        ? prev.productIds.filter(id => id !== productId)
        : [...prev.productIds, productId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('El nombre es requerido');
      return;
    }
    if (editingCollection) {
      updateCollection(editingCollection.id, formData);
      toast.success('Colección actualizada');
    } else {
      addCollection(formData);
      toast.success('Colección creada');
    }
    setShowModal(false);
    setEditingCollection(null);
    setImagePreview('');
    setFormData({ name: '', description: '', image: '', productIds: [] });
  };

  const handleDeleteConfirm = () => {
    deleteCollection(deleteModal.id);
    toast.success('Colección eliminada');
    setDeleteModal({ isOpen: false, id: null, name: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Gestión de Colecciones</h1>
          <p className="text-gray-light">{collections.length} colecciones</p>
        </div>
        <button onClick={() => { setEditingCollection(null); setFormData({ name: '', description: '', image: '', productIds: [] }); setImagePreview(''); setShowModal(true); }} className="btn btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> Nueva Colección
        </button>
      </div>

      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-light" />
          <input type="text" placeholder="Buscar colecciones..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input pl-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCollections.map(collection => {
          const collectionProducts = products.filter(p => collection.productIds?.includes(p.id));
          return (
            <div key={collection.id} className="card p-0 overflow-hidden">
              <div className="aspect-video bg-gray relative">
                {collection.image ? <img src={collection.image} alt={collection.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Package className="w-12 h-12 text-gray-light" /></div>}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                <p className="text-gray-light text-sm mb-4 line-clamp-2">{collection.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary">{collectionProducts.length} productos</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(collection)} className="p-2 hover:bg-primary/20 rounded-lg transition-colors"><Edit2 className="w-4 h-4 text-primary" /></button>
                    <button onClick={() => setDeleteModal({ isOpen: true, id: collection.id, name: collection.name })} className="p-2 hover:bg-danger/20 rounded-lg transition-colors"><Trash2 className="w-4 h-4 text-danger" /></button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCollections.length === 0 && (
        <div className="card text-center py-12">
          <Package className="w-16 h-16 text-gray-light mx-auto mb-4" />
          <p className="text-gray-light">No hay colecciones</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-gray border border-gray rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray flex items-center justify-between">
              <h2 className="text-2xl font-bold">{editingCollection ? 'Editar Colección' : 'Nueva Colección'}</h2>
              <button onClick={() => { setShowModal(false); setEditingCollection(null); setImagePreview(''); }} className="text-gray-light hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Imagen</label>
                {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg mb-4" />}
                <input type="url" value={formData.image} onChange={(e) => { setFormData(prev => ({ ...prev, image: e.target.value })); setImagePreview(e.target.value); }} className="input" placeholder="URL de la imagen" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nombre *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Descripción</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input" rows="3" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Productos ({formData.productIds.length} seleccionados)</label>
                <div className="max-h-60 overflow-y-auto bg-black rounded-lg p-2 space-y-1">
                  {products.map(product => (
                    <label key={product.id} className="flex items-center gap-3 p-2 hover:bg-gray/30 rounded cursor-pointer">
                      <input type="checkbox" checked={formData.productIds.includes(product.id)} onChange={() => toggleProduct(product.id)} className="w-4 h-4 rounded" />
                      <img src={product.image} alt="" className="w-10 h-10 object-cover rounded" />
                      <span className="text-sm">{product.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4 border-t border-gray">
                <button type="button" onClick={() => { setShowModal(false); setEditingCollection(null); }} className="btn btn-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary">{editingCollection ? 'Guardar' : 'Crear'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal isOpen={deleteModal.isOpen} onClose={() => setDeleteModal({ isOpen: false, id: null, name: '' })} onConfirm={handleDeleteConfirm} title="Eliminar Colección" message={`¿Eliminar "${deleteModal.name}"?`} confirmText="Eliminar" type="danger" />
    </div>
  );
};

export default AdminCollections;
