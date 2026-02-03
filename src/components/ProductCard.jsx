import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useToast } from './Toast';

const ProductCard = ({ product }) => {
  const toast = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = (e) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info('Eliminado de favoritos');
    } else {
      addToWishlist(product.id);
      toast.success('Agregado a favoritos ❤️');
    }
  };

  return (
    <Link to={`/product/${product.slug}`} className="product-card group">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%231A1A1A" width="400" height="400"/%3E%3Ctext fill="%2300FF88" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EVOLT%3C/text%3E%3C/svg%3E';
          }}
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.new && (
            <span className="bg-warning text-black text-xs font-bold px-2 py-1 rounded">
              NEW
            </span>
          )}
          {product.sale && (
            <span className="bg-danger text-white text-xs font-bold px-2 py-1 rounded">
              SALE
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 w-10 h-10 bg-black/80 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${inWishlist ? 'fill-primary text-primary' : 'text-white'}`}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-white mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div>
            {product.originalPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">
                  ${product.price.toLocaleString()}
                </span>
                <span className="text-gray-light text-sm line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-white font-bold">
                ${product.price.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-light">
            <span>⭐</span>
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
