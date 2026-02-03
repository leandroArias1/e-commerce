import { useState } from 'react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Filter, X } from 'lucide-react';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  let filteredProducts = [...products];

  // Filtrar por categoría
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(p => p.category === parseInt(selectedCategory));
  }

  // Ordenar
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return b.featured ? 1 : -1;
    }
  });

  return (
    <div className="min-h-screen bg-dark-gray py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
            <span className="neon-text">Shop</span> All
          </h1>
          <p className="text-gray-light">{filteredProducts.length} productos</p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden btn btn-outline flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !selectedCategory
                  ? 'bg-primary text-black'
                  : 'bg-gray text-white hover:bg-gray/80'
              }`}
            >
              Todos
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id.toString())}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === cat.id.toString()
                    ? 'bg-primary text-black'
                    : 'bg-gray text-white hover:bg-gray/80'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input w-48"
          >
            <option value="featured">Destacados</option>
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
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-lg ${
                  !selectedCategory ? 'bg-primary text-black' : 'bg-dark-gray'
                }`}
              >
                Todos
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id.toString())}
                  className={`px-4 py-2 rounded-lg ${
                    selectedCategory === cat.id.toString()
                      ? 'bg-primary text-black'
                      : 'bg-dark-gray'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
