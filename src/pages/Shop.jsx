import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import { Filter, X, Search } from 'lucide-react';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories } = useStore();
  
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  // Actualizar búsqueda cuando cambia la URL
  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    if (search) setSearchTerm(search);
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  let filteredProducts = [...products];

  // Filtrar por búsqueda
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filtrar por categoría
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(p => p.category === parseInt(selectedCategory));
  }

  // Ordenar
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      case 'new': return b.new ? 1 : -1;
      default: return b.featured ? 1 : -1;
    }
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSearchParams({});
  };

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId) {
      searchParams.set('category', catId);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-dark-gray py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
            <span className="neon-text">Shop</span> All
          </h1>
          <p className="text-gray-light">{filteredProducts.length} productos</p>
          
          {/* Indicador de búsqueda activa */}
          {searchTerm && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-gray-light">Resultados para:</span>
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                "{searchTerm}"
                <button onClick={clearFilters} className="hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden btn btn-outline flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>

          {/* Desktop categories */}
          <div className="hidden md:flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                !selectedCategory ? 'bg-primary text-black' : 'bg-gray text-white hover:bg-gray/80'
              }`}
            >
              Todos
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id.toString())}
                className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                  selectedCategory === cat.id.toString() ? 'bg-primary text-black' : 'bg-gray text-white hover:bg-gray/80'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input w-full md:w-48"
          >
            <option value="featured">Destacados</option>
            <option value="new">Más nuevos</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="name">Nombre A-Z</option>
          </select>
        </div>

        {/* Mobile filters */}
        {showFilters && (
          <div className="md:hidden mb-8 p-4 bg-gray rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Categorías</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { handleCategoryChange(''); setShowFilters(false); }}
                className={`px-4 py-2 rounded-lg text-sm ${!selectedCategory ? 'bg-primary text-black' : 'bg-dark-gray'}`}
              >
                Todos
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { handleCategoryChange(cat.id.toString()); setShowFilters(false); }}
                  className={`px-4 py-2 rounded-lg text-sm ${selectedCategory === cat.id.toString() ? 'bg-primary text-black' : 'bg-dark-gray'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-light mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No se encontraron productos</h3>
            <p className="text-gray-light mb-4">Probá con otros filtros o términos de búsqueda</p>
            <button onClick={clearFilters} className="btn btn-primary">
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
