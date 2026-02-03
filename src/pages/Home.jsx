import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Star, TrendingUp, Package } from 'lucide-react';
import { products, collections } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const Home = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 8);
  const newProducts = products.filter(p => p.new).slice(0, 4);
  const saleProducts = products.filter(p => p.sale).slice(0, 4);

  return (
    <div className="bg-black">
      {/* Hero mejorado */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-dark-gray to-black"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple rounded-full blur-[120px] animate-pulse delay-700"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-neon-blue rounded-full blur-[120px] animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Zap className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-6 leading-tight"
          >
            <span className="block mb-4">URBAN</span>
            <span className="gradient-text">REVOLUTION</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-light mb-12 max-w-3xl mx-auto"
          >
            Streetwear premium para los que no se conforman con lo común
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/shop" className="btn btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
              Explorar Tienda
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/collections" className="btn btn-outline text-lg px-8 py-4">
              Ver Colecciones
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20"
          >
            <div>
              <div className="text-3xl md:text-4xl font-bold neon-text mb-2">24</div>
              <div className="text-sm text-gray-light">Productos</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold neon-text mb-2">4.8</div>
              <div className="text-sm text-gray-light">Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold neon-text mb-2">500+</div>
              <div className="text-sm text-gray-light">Clientes</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold">LO MÁS POPULAR</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Productos <span className="neon-text">Destacados</span>
            </h2>
            <p className="text-gray-light max-w-2xl mx-auto">
              Los favoritos de la comunidad VOLT
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-warning/10 px-4 py-2 rounded-full mb-4">
              <TrendingUp className="w-4 h-4 text-warning" />
              <span className="text-warning text-sm font-semibold">NEW IN</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Recién <span className="neon-text">Llegados</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="neon-text">Colecciones</span> Exclusivas
            </h2>
            <p className="text-gray-light">Curated styles para tu vibe</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map(collection => (
              <Link
                key={collection.id}
                to={`/collections/${collection.slug}`}
                className="group relative aspect-square rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gray group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-gray-light">{collection.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Banner */}
      {saleProducts.length > 0 && (
        <section className="py-20 bg-gradient-to-r from-danger/20 via-danger/10 to-danger/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">
                SALE <span className="text-danger">UP TO 40% OFF</span>
              </h2>
              <p className="text-gray-light">Ofertas por tiempo limitado</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {saleProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Package className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Primera compra?<br />
              <span className="neon-text">20% OFF</span>
            </h2>
            <p className="text-xl text-gray-light mb-8">
              Usá el código <span className="text-primary font-bold">WELCOME20</span> en compras mayores a $30.000
            </p>
            <Link to="/shop" className="btn btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
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
