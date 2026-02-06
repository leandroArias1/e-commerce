import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

const Collections = () => {
  const { slug } = useParams();
  const { collections, products } = useStore();

  // Si hay slug, mostrar colección específica
  if (slug) {
    const collection = collections.find(c => c.slug === slug);
    
    if (!collection) {
      return (
        <div className="min-h-screen bg-dark-gray flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Colección no encontrada</h1>
            <Link to="/collections" className="btn btn-primary">Ver todas las colecciones</Link>
          </div>
        </div>
      );
    }

    const collectionProducts = products.filter(p => collection.productIds.includes(p.id));

    return (
      <div className="min-h-screen bg-dark-gray">
        {/* Header de colección */}
        <section className="relative py-20 bg-black overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${collection.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          <div className="container mx-auto px-4 relative z-10">
            <Link to="/collections" className="inline-flex items-center gap-2 text-gray-light hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Volver a colecciones
            </Link>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-4">{collection.name}</h1>
            <p className="text-xl text-gray-light max-w-2xl">{collection.description}</p>
            <p className="text-primary mt-4">{collectionProducts.length} productos</p>
          </div>
        </section>

        {/* Productos de la colección */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {collectionProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {collectionProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-light">No hay productos en esta colección</p>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Vista de todas las colecciones
  return (
    <div className="min-h-screen bg-dark-gray">
      {/* Hero */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            <span className="gradient-text">Colecciones</span>
          </h1>
          <p className="text-xl text-gray-light max-w-2xl mx-auto">
            Descubrí nuestras colecciones curadas, cada una con un estilo único
          </p>
        </div>
      </section>

      {/* Grid de colecciones */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map(collection => {
              const collectionProducts = products.filter(p => collection.productIds.includes(p.id));
              
              return (
                <Link
                  key={collection.id}
                  to={`/collections/${collection.slug}`}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden"
                >
                  {/* Imagen de fondo */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${collection.image})` }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {/* Contenido */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-3xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-gray-light mb-4">{collection.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary">{collectionProducts.length} productos</span>
                      <span className="flex items-center gap-2 text-white group-hover:text-primary transition-colors">
                        Ver colección
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-6">
            ¿Buscás algo más?
          </h2>
          <Link to="/shop" className="btn btn-primary inline-flex items-center gap-2">
            Ver todos los productos
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Collections;
