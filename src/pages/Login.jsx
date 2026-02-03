import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useToast } from '../components/Toast';
import { Zap } from 'lucide-react';

const Login = () => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      toast.success('Sesión iniciada correctamente');
      navigate('/');
    } else {
      toast.error('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-dark-gray to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Zap className="w-10 h-10 text-primary" />
            <span className="text-3xl font-display font-bold neon-text">VOLT</span>
          </div>
          <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Ingresar
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray rounded-lg">
            <p className="text-xs text-gray-light mb-2">Credenciales de prueba:</p>
            <p className="text-sm">Email: demo@volt.com</p>
            <p className="text-sm">Contraseña: demo123</p>
          </div>

          <p className="mt-6 text-center text-sm text-gray-light">
            ¿No tenés cuenta?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
