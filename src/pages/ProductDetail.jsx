import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { useStore } from '../store/useStore';
import { useToast } from '../components/Toast';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { slug } = useParams();
  const toast = useToast();
  const product = products.find(p => p.slug === slug);
  
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-dark-gray flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
          <Link to="/shop" className="btn btn-primary">Volver a Shop</Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Por favor seleccioná un talle');
      return;
    }
    if (!selectedColor) {
      toast.error('Por favor seleccioná un color');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    toast.success(`${quantity}x ${product.name} agregado al carrito`);
  };

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info('Eliminado de favoritos');
    } else {
      addToWishlist(product.id);
      toast.success('Agregado a favoritos ❤️');
    }
  };

  const reviews = [
    { id: 1, user: 'Juan P.', rating: 5, comment: 'Excelente calidad, súper recomendable!', date: '2026-01-20' },
    { id: 2, user: 'María G.', rating: 5, comment: 'Me encantó el fit, muy cómodo', date: '2026-01-18' },
    { id: 3, user: 'Carlos R.', rating: 4, comment: 'Buena calidad, llegó rápido', date: '2026-01-15' },
  ];

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-light">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </div>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-24">
              {/* Main image */}
              <div className="aspect-square bg-dark-gray rounded-2xl overflow-hidden mb-4 border-2 border-primary/20">
                <img
                  src={product.images?.[selectedImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="800"%3E%3Crect fill="%231A1A1A" width="800" height="800"/%3E%3Ctext fill="%23E8D5C4" font-size="40" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EVOLT%3C/text%3E%3C/svg%3E'}
                />
              </div>
              
              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square bg-dark-gray rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" onError={(e) => e.target.src = product.image} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.new && (
                <span className="badge badge-new">NEW</span>
              )}
              {product.sale && (
                <span className="badge badge-sale">SALE</span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-warning text-warning'
                        : 'text-gray'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-light">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-8">
              {product.originalPrice ? (
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-primary">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="text-2xl text-gray-light line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="badge badge-sale">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </div>
              ) : (
                <span className="text-4xl font-bold text-white">
                  ${product.price.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-lg text-gray-light mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Color selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">
                Color {selectedColor && <span className="text-primary">: {selectedColor}</span>}
              </label>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                      selectedColor === color
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray hover:border-gray-light'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-3">
                Talle {selectedSize && <span className="text-primary">: {selectedSize}</span>}
              </label>
              <div className="grid grid-cols-6 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg border-2 font-semibold transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray hover:border-gray-light'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-3">Cantidad</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-dark-gray rounded-lg hover:bg-gray transition-colors flex items-center justify-center border border-gray"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-dark-gray rounded-lg hover:bg-gray transition-colors flex items-center justify-center border border-gray"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn btn-primary text-lg py-4 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al Carrito
              </button>
              <button
                onClick={toggleWishlist}
                className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all border-2 ${
                  inWishlist
                    ? 'bg-primary/20 text-primary border-primary'
                    : 'bg-dark-gray border-gray hover:border-primary'
                }`}
              >
                <Heart className={`w-6 h-6 ${inWishlist ? 'fill-primary' : ''}`} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-dark-gray rounded-lg border border-gray">
              <div className="text-center">
                <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-xs text-gray-light">Envío gratis &gt; $50k</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-xs text-gray-light">Compra protegida</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-xs text-gray-light">30 días cambio</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="mb-20">
          <h2 className="text-3xl font-display font-bold mb-8">
            Reviews <span className="text-primary">({reviews.length})</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map(review => (
              <div key={review.id} className="card">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">{review.user}</span>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-light mb-2">{review.comment}</p>
                <p className="text-xs text-gray-light">{review.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-display font-bold mb-8">
              Productos <span className="text-primary">Relacionados</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
