import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Trash2, ShoppingBag, Tag, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useToast } from '../components/Toast';

const Cart = () => {
  const toast = useToast();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    getCartCount,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    getDiscount,
    getShipping,
    getFinalTotal
  } = useStore();

  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    if (applyCoupon(couponCode)) {
      toast.success(`Cupón ${couponCode} aplicado correctamente`);
      setCouponCode('');
    } else {
      toast.error('Cupón inválido o monto mínimo no alcanzado');
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast.info('Cupón removido');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-dark-gray flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-light mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
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
          Carrito <span className="neon-text">({getCartCount()})</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Products */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="card">
                <div className="flex gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded-lg" 
                    onError={(e) => e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%231A1A1A" width="100" height="100"/%3E%3C/svg%3E'} 
                  />
                  <div className="flex-1">
                    <Link 
                      to={`/product/${item.slug}`}
                      className="font-semibold text-lg mb-2 hover:text-primary transition-colors block"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-light mb-3">
                      Talle: <span className="font-semibold">{item.size}</span> | 
                      Color: <span className="font-semibold">{item.color}</span>
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          className="w-8 h-8 bg-dark-gray rounded hover:bg-gray transition-colors flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          className="w-8 h-8 bg-dark-gray rounded hover:bg-gray transition-colors flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-lg">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    className="text-gray-light hover:text-danger transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h3 className="text-xl font-bold mb-6">Resumen del Pedido</h3>
              
              {/* Coupon */}
              <div className="mb-6 pb-6 border-b border-gray">
                <label className="block text-sm font-semibold mb-2">Cupón de Descuento</label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/30">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-primary" />
                      <span className="text-primary font-semibold text-sm">{appliedCoupon.code}</span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-primary hover:text-primary/70"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="CODIGO"
                        className="input flex-1"
                      />
                      <button onClick={handleApplyCoupon} className="btn btn-outline">
                        Aplicar
                      </button>
                    </div>
                    <p className="text-xs text-gray-light mt-2">
                      Cupones: VOLT10, WELCOME20
                    </p>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
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
                  <span className="font-semibold">
                    {getShipping() === 0 ? (
                      <span className="text-primary">GRATIS</span>
                    ) : (
                      `$${getShipping().toLocaleString()}`
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-xl mb-6 pt-6 border-t border-gray">
                <span>Total</span>
                <span className="neon-text">${getFinalTotal().toLocaleString()}</span>
              </div>

              {getShipping() > 0 && (
                <div className="mb-6 p-3 bg-warning/10 rounded-lg border border-warning/30">
                  <p className="text-xs text-warning">
                    Agregá ${(50000 - getCartTotal()).toLocaleString()} más para envío gratis
                  </p>
                </div>
              )}

              <Link to="/checkout" className="btn btn-primary w-full mb-4">
                Finalizar Compra
              </Link>
              <Link to="/shop" className="btn btn-outline w-full">
                Seguir Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
