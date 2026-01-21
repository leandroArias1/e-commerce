import { Link } from "react-router-dom";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-24">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              NOVA
            </h3>
            <p className="text-sm text-gray-400 mt-3 max-w-xs">
              Ropa unisex pensada para el día a día.
              Diseño minimal, calidad y comodidad.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-sm font-medium mb-4">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/products" className="hover:text-white">Productos</Link></li>
              <li><Link to="/login" className="hover:text-white">Ingresar</Link></li>
              <li><Link to="/register" className="hover:text-white">Registrarse</Link></li>
              <li><Link to="/cart" className="hover:text-white">Carrito</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-medium mb-4">
              Seguinos
            </h4>
            <div className="flex gap-4">
              <IconButton><InstagramIcon /></IconButton>
              <IconButton><TwitterIcon /></IconButton>
              <IconButton><MailIcon /></IconButton>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-xs text-gray-500 text-center">
          © 2026 NOVA. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <span className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition">
      {children}
    </span>
  );
}

/* ICONOS FINOS */

function InstagramIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.5" y="2.5" width="13" height="13" rx="4" />
      <circle cx="9" cy="9" r="3" />
      <circle cx="12.5" cy="5.5" r="0.5" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 4.5c-.6.3-1.3.4-2 .5a3.4 3.4 0 001.5-1.9c-.6.4-1.4.7-2.2.9A3.3 3.3 0 007.5 7c0 .3 0 .5.1.7A9.3 9.3 0 013 4.2a3.3 3.3 0 001 4.4c-.5 0-1-.2-1.4-.4 0 1.5 1 2.9 2.5 3.2-.3.1-.6.1-1 .1-.2 0-.4 0-.6-.1.4 1.3 1.7 2.3 3.2 2.3A6.7 6.7 0 012 15.2 9.4 9.4 0 007 16.7c6 0 9.3-5 9.3-9.3v-.4c.7-.4 1.3-1 1.7-1.6z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.5" y="4" width="13" height="10" rx="2" />
      <path d="M3 5l6 5 6-5" />
    </svg>
  );
}
