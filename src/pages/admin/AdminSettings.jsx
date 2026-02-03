import { useState } from 'react';
import { Save, Store, Truck, CreditCard, Bell, Globe, Shield } from 'lucide-react';
import { useToast } from '../../components/Toast';

const AdminSettings = () => {
  const toast = useToast();
  
  const [settings, setSettings] = useState({
    // General
    storeName: 'VOLT',
    storeEmail: 'info@volt.com',
    storePhone: '+54 11 1234-5678',
    storeAddress: 'Av. Santa Fe 1234, Buenos Aires',
    
    // Envío
    freeShippingThreshold: 50000,
    standardShipping: 3000,
    expressShipping: 5000,
    
    // Pagos
    acceptCash: true,
    acceptCard: true,
    acceptTransfer: true,
    
    // Notificaciones
    emailNewOrder: true,
    emailLowStock: true,
    stockThreshold: 10,
    
    // SEO
    metaTitle: 'VOLT - Streetwear Premium',
    metaDescription: 'Ropa urbana de calidad premium para la cultura street',
    
    // Social
    instagram: '@volt.streetwear',
    facebook: 'volt.streetwear',
    twitter: '@voltstreet',
  });

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (section) => {
    // En producción, aquí se guardaría en BD
    toast.success(`Configuración de ${section} guardada correctamente`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Configuración</h1>
        <p className="text-gray-light">Administrá la configuración de tu tienda</p>
      </div>

      {/* General Settings */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <Store className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Información General</h2>
            <p className="text-sm text-gray-light">Datos básicos de la tienda</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre de la Tienda</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => handleChange('storeName', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={settings.storeEmail}
              onChange={(e) => handleChange('storeEmail', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Teléfono</label>
            <input
              type="tel"
              value={settings.storePhone}
              onChange={(e) => handleChange('storePhone', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Dirección</label>
            <input
              type="text"
              value={settings.storeAddress}
              onChange={(e) => handleChange('storeAddress', e.target.value)}
              className="input"
            />
          </div>
        </div>

        <button onClick={() => handleSave('General')} className="btn btn-primary">
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </button>
      </div>

      {/* Shipping Settings */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-info/20 rounded-lg flex items-center justify-center">
            <Truck className="w-5 h-5 text-info" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Configuración de Envíos</h2>
            <p className="text-sm text-gray-light">Costos y políticas de envío</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Envío Gratis desde</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-light">$</span>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => handleChange('freeShippingThreshold', Number(e.target.value))}
                className="input pl-8"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Envío Estándar</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-light">$</span>
              <input
                type="number"
                value={settings.standardShipping}
                onChange={(e) => handleChange('standardShipping', Number(e.target.value))}
                className="input pl-8"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Envío Express</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-light">$</span>
              <input
                type="number"
                value={settings.expressShipping}
                onChange={(e) => handleChange('expressShipping', Number(e.target.value))}
                className="input pl-8"
              />
            </div>
          </div>
        </div>

        <button onClick={() => handleSave('Envíos')} className="btn btn-primary">
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </button>
      </div>

      {/* Payment Methods */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-success" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Métodos de Pago</h2>
            <p className="text-sm text-gray-light">Formas de pago aceptadas</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.acceptCash}
              onChange={(e) => handleChange('acceptCash', e.target.checked)}
              className="w-5 h-5 rounded border-gray bg-dark-gray checked:bg-primary"
            />
            <span className="font-medium">Efectivo</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.acceptCard}
              onChange={(e) => handleChange('acceptCard', e.target.checked)}
              className="w-5 h-5 rounded border-gray bg-dark-gray checked:bg-primary"
            />
            <span className="font-medium">Tarjeta de Crédito/Débito</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.acceptTransfer}
              onChange={(e) => handleChange('acceptTransfer', e.target.checked)}
              className="w-5 h-5 rounded border-gray bg-dark-gray checked:bg-primary"
            />
            <span className="font-medium">Transferencia Bancaria</span>
          </label>
        </div>

        <button onClick={() => handleSave('Pagos')} className="btn btn-primary">
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </button>
      </div>

      {/* Notifications */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Notificaciones</h2>
            <p className="text-sm text-gray-light">Alertas y notificaciones por email</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailNewOrder}
              onChange={(e) => handleChange('emailNewOrder', e.target.checked)}
              className="w-5 h-5 rounded border-gray bg-dark-gray checked:bg-primary"
            />
            <div>
              <p className="font-medium">Email por Nuevo Pedido</p>
              <p className="text-sm text-gray-light">Recibir email cada vez que hay un nuevo pedido</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailLowStock}
              onChange={(e) => handleChange('emailLowStock', e.target.checked)}
              className="w-5 h-5 rounded border-gray bg-dark-gray checked:bg-primary"
            />
            <div>
              <p className="font-medium">Alerta de Stock Bajo</p>
              <p className="text-sm text-gray-light">Recibir email cuando el stock esté bajo</p>
            </div>
          </label>
          
          <div>
            <label className="block text-sm font-medium mb-2">Umbral de Stock Bajo</label>
            <input
              type="number"
              value={settings.stockThreshold}
              onChange={(e) => handleChange('stockThreshold', Number(e.target.value))}
              className="input max-w-xs"
              placeholder="Cantidad mínima"
            />
            <p className="text-xs text-gray-light mt-1">Se enviará alerta cuando el stock sea menor a este valor</p>
          </div>
        </div>

        <button onClick={() => handleSave('Notificaciones')} className="btn btn-primary">
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </button>
      </div>

      {/* SEO */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">SEO</h2>
            <p className="text-sm text-gray-light">Optimización para motores de búsqueda</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Meta Título</label>
            <input
              type="text"
              value={settings.metaTitle}
              onChange={(e) => handleChange('metaTitle', e.target.value)}
              className="input"
              maxLength="60"
            />
            <p className="text-xs text-gray-light mt-1">Recomendado: 50-60 caracteres</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Meta Descripción</label>
            <textarea
              value={settings.metaDescription}
              onChange={(e) => handleChange('metaDescription', e.target.value)}
              className="input"
              rows="3"
              maxLength="160"
            />
            <p className="text-xs text-gray-light mt-1">Recomendado: 150-160 caracteres</p>
          </div>
        </div>

        <button onClick={() => handleSave('SEO')} className="btn btn-primary">
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </button>
      </div>

      {/* Social Media */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-info/20 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-info" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Redes Sociales</h2>
            <p className="text-sm text-gray-light">Enlaces a redes sociales</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Instagram</label>
            <input
              type="text"
              value={settings.instagram}
              onChange={(e) => handleChange('instagram', e.target.value)}
              className="input"
              placeholder="@usuario"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Facebook</label>
            <input
              type="text"
              value={settings.facebook}
              onChange={(e) => handleChange('facebook', e.target.value)}
              className="input"
              placeholder="usuario"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Twitter</label>
            <input
              type="text"
              value={settings.twitter}
              onChange={(e) => handleChange('twitter', e.target.value)}
              className="input"
              placeholder="@usuario"
            />
          </div>
        </div>

        <button onClick={() => handleSave('Redes Sociales')} className="btn btn-primary">
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
