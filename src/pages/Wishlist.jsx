import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  const { wishlist } = useStore();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-dark-gray flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-24 h-24 text-gray-light mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Tu lista de favoritos está vacía</h2>
          <Link to="/shop" className="btn btn-primary">
            Ir a comprar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-gray py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold mb-8">
          Mis <span className="neon-text">Favoritos</span> ({wishlist.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
