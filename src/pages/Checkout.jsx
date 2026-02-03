import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useToast } from '../components/Toast';
import { CheckCircle, CreditCard, MapPin, Package, ArrowRight, ArrowLeft } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { cart, getCartTotal, getDiscount, getShipping, getFinalTotal, appliedCoupon, createOrder } = useStore();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Datos personales
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    // Dirección
    address: '',
    city: '',
    state: '',
    zipCode: '',
    // Pago
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [errors, setErrors] = useState({});

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Requerido';
    if (!formData.firstName) newErrors.firstName = 'Requerido';
    if (!formData.lastName) newErrors.lastName = 'Requerido';
    if (!formData.phone) newErrors.phone = 'Requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.address) newErrors.address = 'Requerido';
    if (!formData.city) newErrors.city = 'Requerido';
    if (!formData.state) newErrors.state = 'Requerido';
    if (!formData.zipCode) newErrors.zipCode = 'Requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleFinishOrder = () => {
    const order = createOrder(formData);
    toast.success('¡Pedido realizado con éxito!');
    navigate(`/order-confirmation/${order.id}`);
  };

  const steps = [
    { num: 1, label: 'Datos', icon: Package },
    { num: 2, label: 'Envío', icon: MapPin },
    { num: 3, label: 'Pago', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-dark-gray py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold mb-8 text-center">
          <span className="neon-text">Checkout</span>
        </h1>

        {/* Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isActive = step === s.num;
              const isCompleted = step > s.num;
              
              return (
                <div key={s.num} className="flex items-center flex-1">
                  <div className={`flex flex-col items-center ${idx !== steps.length - 1 ? 'flex-1' : ''}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? 'bg-primary border-primary'
                        : isActive
                        ? 'bg-primary/20 border-primary'
                        : 'bg-dark-gray border-gray'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-black" />
                      ) : (
                        <Icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-gray-light'}`} />
                      )}
                    </div>
                    <span className={`text-sm mt-2 ${isActive ? 'text-primary font-semibold' : 'text-gray-light'}`}>
                      {s.label}
                    </span>
                  </div>
                  {idx !== steps.length - 1 && (
                    <div className={`h-px flex-1 mx-4 ${isCompleted ? 'bg-primary' : 'bg-gray'}`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card">
              {/* Step 1: Datos Personales */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Datos Personales</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`input ${errors.email ? 'border-danger' : ''}`}
                        placeholder="tu@email.com"
                      />
                      {errors.email && <p className="text-danger text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2">Nombre *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`input ${errors.firstName ? 'border-danger' : ''}`}
                        />
                        {errors.firstName && <p className="text-danger text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Apellido *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`input ${errors.lastName ? 'border-danger' : ''}`}
                        />
                        {errors.lastName && <p className="text-danger text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Teléfono *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`input ${errors.phone ? 'border-danger' : ''}`}
                        placeholder="+54 11 1234-5678"
                      />
                      {errors.phone && <p className="text-danger text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Dirección */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Dirección de Envío</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">Dirección *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`input ${errors.address ? 'border-danger' : ''}`}
                        placeholder="Calle y número"
                      />
                      {errors.address && <p className="text-danger text-sm mt-1">{errors.address}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2">Ciudad *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`input ${errors.city ? 'border-danger' : ''}`}
                        />
                        {errors.city && <p className="text-danger text-sm mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Provincia *</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className={`input ${errors.state ? 'border-danger' : ''}`}
                        />
                        {errors.state && <p className="text-danger text-sm mt-1">{errors.state}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Código Postal *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`input ${errors.zipCode ? 'border-danger' : ''}`}
                      />
                      {errors.zipCode && <p className="text-danger text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Pago */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Método de Pago</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">Número de Tarjeta</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="input"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Titular de la Tarjeta</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className="input"
                        placeholder="NOMBRE APELLIDO"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2">Vencimiento</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          className="input"
                          placeholder="MM/AA"
                          maxLength="5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">CVV</label>
                        <input
                          type="text"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleChange}
                          className="input"
                          placeholder="123"
                          maxLength="3"
                        />
                      </div>
                    </div>
                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mt-6">
                      <p className="text-sm text-primary">
                        <strong>Checkout simulado:</strong> Este es un pago de prueba. No se realizarán cargos reales.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="btn btn-outline flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Atrás
                  </button>
                )}
                <div className={step === 1 ? 'ml-auto' : ''}>
                  {step < 3 ? (
                    <button onClick={handleNextStep} className="btn btn-primary flex items-center gap-2">
                      Continuar
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button onClick={handleFinishOrder} className="btn btn-primary">
                      Finalizar Pedido
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="card sticky top-24">
              <h3 className="text-xl font-bold mb-4">Resumen del Pedido</h3>
              <div className="space-y-3 mb-6">
                {cart.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" onError={(e) => e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%231A1A1A" width="100" height="100"/%3E%3C/svg%3E'} />
                    <div className="flex-1 text-sm">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-light">
                        {item.size} | {item.color} | x{item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
                {cart.length > 3 && (
                  <p className="text-sm text-gray-light">+{cart.length - 3} productos más</p>
                )}
              </div>
              <div className="space-y-2 pt-4 border-t border-gray">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toLocaleString()}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-primary">
                    <span>Descuento ({appliedCoupon.code})</span>
                    <span>-${getDiscount().toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Envío</span>
                  <span>{getShipping() === 0 ? 'GRATIS' : `$${getShipping().toLocaleString()}`}</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray">
                <span>Total</span>
                <span className="neon-text">${getFinalTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
