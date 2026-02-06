import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  const { wishlist, products } = useStore();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-dark-gray flex items-center justify-center px-4">
        <div className="text-center">
          <Heart className="w-20 h-20 text-gray-light mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Tu lista de favoritos está vacía</h2>
          <p className="text-gray-light mb-6">Agregá productos que te gusten para verlos acá</p>
          <Link to="/shop" className="btn btn-primary">
            Explorar productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-gray py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-6 md:mb-8">
          Mis <span className="neon-text">Favoritos</span> ({wishlistProducts.length})
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
