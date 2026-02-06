import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Star, TrendingUp, Package } from 'lucide-react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { products, collections } = useStore();
  
  const featuredProducts = products.filter(p => p.featured).slice(0, 8);
  const newProducts = products.filter(p => p.new).slice(0, 4);
  const saleProducts = products.filter(p => p.sale).slice(0, 4);

  return (
    <div className="bg-black">
      {/* Hero */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-dark-gray to-black"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary rounded-full blur-[120px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-neon-purple rounded-full blur-[120px]"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center py-12 md:py-20">
          <Zap className="w-12 md:w-16 h-12 md:h-16 text-primary mx-auto mb-6" />

          <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-bold mb-6 leading-tight">
            <span className="block mb-2 md:mb-4">URBAN</span>
            <span className="gradient-text">REVOLUTION</span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-light mb-8 md:mb-12 max-w-3xl mx-auto">
            Streetwear premium para los que no se conforman con lo común
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="btn btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 inline-flex items-center justify-center gap-2">
              Explorar Tienda
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/collections" className="btn btn-outline text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
              Ver Colecciones
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mt-12 md:mt-20">
            <div>
              <div className="text-2xl md:text-4xl font-bold neon-text mb-1 md:mb-2">{products.length}</div>
              <div className="text-xs md:text-sm text-gray-light">Productos</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold neon-text mb-1 md:mb-2">4.8</div>
              <div className="text-xs md:text-sm text-gray-light">Rating</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold neon-text mb-1 md:mb-2">500+</div>
              <div className="text-xs md:text-sm text-gray-light">Clientes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold">LO MÁS POPULAR</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Productos <span className="neon-text">Destacados</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/shop" className="btn btn-outline inline-flex items-center gap-2">
              Ver Todos los Productos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 md:py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-warning/10 px-4 py-2 rounded-full mb-4">
              <TrendingUp className="w-4 h-4 text-warning" />
              <span className="text-warning text-sm font-semibold">NEW IN</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Recién <span className="neon-text">Llegados</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {newProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-12 md:py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              <span className="neon-text">Colecciones</span> Exclusivas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map(collection => (
              <Link key={collection.id} to={`/collections/${collection.slug}`} className="group relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                <img src={collection.image} alt={collection.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                  <h3 className="text-xl md:text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{collection.name}</h3>
                  <p className="text-sm text-gray-light">{collection.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sale */}
      {saleProducts.length > 0 && (
        <section className="py-12 md:py-20 bg-gradient-to-r from-danger/20 via-danger/10 to-danger/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
                SALE <span className="text-danger">UP TO 40% OFF</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {saleProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 md:py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Package className="w-12 md:w-16 h-12 md:h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-6xl font-display font-bold mb-6">
              Primera compra?<br />
              <span className="neon-text">20% OFF</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-light mb-8">
              Usá el código <span className="text-primary font-bold">WELCOME20</span> en compras mayores a $30.000
            </p>
            <Link to="/shop" className="btn btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 inline-flex items-center gap-2">
              Empezar a Comprar
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
