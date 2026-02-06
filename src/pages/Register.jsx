import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useToast } from '../components/Toast';
import { Zap, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { register } = useStore();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nombre requerido';
    if (!formData.email.trim()) newErrors.email = 'Email requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.password) newErrors.password = 'Contraseña requerida';
    else if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    if (result.success) {
      toast.success('¡Cuenta creada exitosamente!');
      navigate('/');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-dark-gray to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Zap className="w-10 h-10 text-primary" />
            <span className="text-3xl font-display font-bold neon-text">VOLT</span>
          </Link>
          <h1 className="text-2xl font-bold">Crear Cuenta</h1>
          <p className="text-gray-light mt-2">Unite a la comunidad VOLT</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Nombre completo *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`input ${errors.name ? 'border-danger' : ''}`}
                placeholder="Tu nombre"
              />
              {errors.name && <p className="text-danger text-xs mt-1">{errors.name}</p>}
            </div>

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
              {errors.email && <p className="text-danger text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm mb-2">Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input"
                placeholder="+54 11 1234-5678"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Contraseña *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input pr-10 ${errors.password ? 'border-danger' : ''}`}
                  placeholder="Mínimo 6 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-light hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-danger text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm mb-2">Confirmar contraseña *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`input ${errors.confirmPassword ? 'border-danger' : ''}`}
                placeholder="Repetí tu contraseña"
              />
              {errors.confirmPassword && <p className="text-danger text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Crear Cuenta
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-light">
            ¿Ya tenés cuenta?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Iniciá sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
