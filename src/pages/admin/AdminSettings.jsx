import { useState, useEffect } from 'react';
import { Save, Store, Truck, CreditCard, Bell, Globe, Shield } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useToast } from '../../components/Toast';

const AdminSettings = () => {
  const toast = useToast();
  const { settings, updateSettings } = useStore();
  
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (field, value) => {
    setLocalSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (section) => {
    updateSettings(localSettings);
    toast.success(`Configuración de ${section} guardada correctamente`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Configuración</h1>
        <p className="text-gray-light">Los cambios se guardan en el navegador</p>
      </div>

      {/* General */}
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
            <input type="text" value={localSettings.storeName} onChange={(e) => handleChange('storeName', e.target.value)} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" value={localSettings.storeEmail} onChange={(e) => handleChange('storeEmail', e.target.value)} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Teléfono</label>
            <input type="tel" value={localSettings.storePhone} onChange={(e) => handleChange('storePhone', e.target.value)} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Dirección</label>
            <input type="text" value={localSettings.storeAddress} onChange={(e) => handleChange('storeAddress', e.target.value)} className="input" />
          </div>
        </div>
        <button onClick={() => handleSave('General')} className="btn btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" /> Guardar Cambios
        </button>
      </div>

      {/* Envíos */}
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
              <input type="number" value={localSettings.freeShippingThreshold} onChange={(e) => handleChange('freeShippingThreshold', Number(e.target.value))} className="input pl-8" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Envío Estándar</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-light">$</span>
              <input type="number" value={localSettings.standardShipping} onChange={(e) => handleChange('standardShipping', Number(e.target.value))} className="input pl-8" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Envío Express</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-light">$</span>
              <input type="number" value={localSettings.expressShipping} onChange={(e) => handleChange('expressShipping', Number(e.target.value))} className="input pl-8" />
            </div>
          </div>
        </div>
        <button onClick={() => handleSave('Envíos')} className="btn btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" /> Guardar Cambios
        </button>
      </div>

      {/* Pagos */}
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
            <input type="checkbox" checked={localSettings.acceptCash} onChange={(e) => handleChange('acceptCash', e.target.checked)} className="w-5 h-5 rounded" />
            <span className="font-medium">Efectivo</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={localSettings.acceptCard} onChange={(e) => handleChange('acceptCard', e.target.checked)} className="w-5 h-5 rounded" />
            <span className="font-medium">Tarjeta de Crédito/Débito</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={localSettings.acceptTransfer} onChange={(e) => handleChange('acceptTransfer', e.target.checked)} className="w-5 h-5 rounded" />
            <span className="font-medium">Transferencia Bancaria</span>
          </label>
        </div>
        <button onClick={() => handleSave('Pagos')} className="btn btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" /> Guardar Cambios
        </button>
      </div>

      {/* Notificaciones */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Notificaciones</h2>
            <p className="text-sm text-gray-light">Alertas y notificaciones</p>
          </div>
        </div>
        <div className="space-y-4 mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={localSettings.emailNewOrder} onChange={(e) => handleChange('emailNewOrder', e.target.checked)} className="w-5 h-5 rounded" />
            <div>
              <p className="font-medium">Email por Nuevo Pedido</p>
              <p className="text-sm text-gray-light">Recibir email cada vez que hay un nuevo pedido</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={localSettings.emailLowStock} onChange={(e) => handleChange('emailLowStock', e.target.checked)} className="w-5 h-5 rounded" />
            <div>
              <p className="font-medium">Alerta de Stock Bajo</p>
              <p className="text-sm text-gray-light">Recibir email cuando el stock esté bajo</p>
            </div>
          </label>
          <div>
            <label className="block text-sm font-medium mb-2">Umbral de Stock Bajo</label>
            <input type="number" value={localSettings.stockThreshold} onChange={(e) => handleChange('stockThreshold', Number(e.target.value))} className="input max-w-xs" />
          </div>
        </div>
        <button onClick={() => handleSave('Notificaciones')} className="btn btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" /> Guardar Cambios
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
            <input type="text" value={localSettings.metaTitle} onChange={(e) => handleChange('metaTitle', e.target.value)} className="input" maxLength="60" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Meta Descripción</label>
            <textarea value={localSettings.metaDescription} onChange={(e) => handleChange('metaDescription', e.target.value)} className="input" rows="3" maxLength="160" />
          </div>
        </div>
        <button onClick={() => handleSave('SEO')} className="btn btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" /> Guardar Cambios
        </button>
      </div>

      {/* Redes Sociales */}
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
            <input type="text" value={localSettings.instagram} onChange={(e) => handleChange('instagram', e.target.value)} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Facebook</label>
            <input type="text" value={localSettings.facebook} onChange={(e) => handleChange('facebook', e.target.value)} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Twitter</label>
            <input type="text" value={localSettings.twitter} onChange={(e) => handleChange('twitter', e.target.value)} className="input" />
          </div>
        </div>
        <button onClick={() => handleSave('Redes Sociales')} className="btn btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" /> Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
