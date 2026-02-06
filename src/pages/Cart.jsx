import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Trash2, ShoppingBag, Tag, X, Minus, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useToast } from '../components/Toast';

const Cart = () => {
  const toast = useToast();
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount, applyCoupon, removeCoupon, appliedCoupon, getDiscount, getShipping, getFinalTotal, settings } = useStore();
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    if (applyCoupon(couponCode)) {
      toast.success(`Cupón ${couponCode} aplicado`);
      setCouponCode('');
    } else {
      toast.error('Cupón inválido o monto mínimo no alcanzado');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-dark-gray flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 text-gray-light mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
          <Link to="/shop" className="btn btn-primary">Ir a comprar</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-gray py-6 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-display font-bold mb-6">
          Carrito <span className="neon-text">({getCartCount()})</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Products */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="card p-3 md:p-4">
                <div className="flex gap-3">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0" 
                    onError={(e) => e.target.src = 'https://via.placeholder.com/80'} 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <Link to={`/product/${item.slug}`} className="font-semibold text-sm md:text-base hover:text-primary transition-colors block truncate">
                          {item.name}
                        </Link>
                        <p className="text-xs md:text-sm text-gray-light">
                          {item.size} · {item.color}
                        </p>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.size, item.color)} className="text-gray-light hover:text-danger p-1 flex-shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-gray rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} 
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-light/20 rounded-l-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} 
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-light/20 rounded-r-lg"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bold text-primary">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="card lg:sticky lg:top-20">
              <h3 className="text-lg font-bold mb-4">Resumen</h3>
              
              {/* Coupon */}
              <div className="mb-4 pb-4 border-b border-gray">
                <label className="block text-sm font-semibold mb-2">Cupón</label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 bg-primary/10 rounded-lg border border-primary/30">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-primary" />
                      <span className="text-primary font-semibold text-sm">{appliedCoupon.code}</span>
                    </div>
                    <button onClick={() => { removeCoupon(); toast.info('Cupón removido'); }} className="text-primary p-1"><X className="w-4 h-4" /></button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={couponCode} 
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())} 
                      placeholder="CODIGO" 
                      className="input flex-1 text-sm py-2" 
                    />
                    <button onClick={handleApplyCoupon} className="btn btn-outline text-sm px-3 py-2">Aplicar</button>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-light">Subtotal</span>
                  <span className="font-semibold">${getCartTotal().toLocaleString()}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-primary">
                    <span>Descuento</span>
                    <span className="font-semibold">-${getDiscount().toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-light">Envío</span>
                  <span className="font-semibold">{getShipping() === 0 ? <span className="text-primary">GRATIS</span> : `$${getShipping().toLocaleString()}`}</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg mb-4 pt-4 border-t border-gray">
                <span>Total</span>
                <span className="text-primary">${getFinalTotal().toLocaleString()}</span>
              </div>

              {getShipping() > 0 && getCartTotal() < settings.freeShippingThreshold && (
                <div className="mb-4 p-2 bg-warning/10 rounded-lg border border-warning/30">
                  <p className="text-xs text-warning text-center">
                    Agregá ${(settings.freeShippingThreshold - getCartTotal()).toLocaleString()} más para envío gratis
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Link to="/checkout" className="btn btn-primary w-full text-sm py-3">
                  Finalizar Compra
                </Link>
                <Link to="/shop" className="btn btn-outline w-full text-sm py-3">
                  Seguir Comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
