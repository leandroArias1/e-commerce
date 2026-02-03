import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { isAuthenticated, user, logout, getCartCount, wishlist } = useStore();
  const navigate = useNavigate();
  
  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-black border-b border-gray sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Zap className="w-8 h-8 text-primary group-hover:animate-pulse" />
            <span className="text-2xl font-display font-bold neon-text">VOLT</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/shop" className="text-white hover:text-primary transition-colors">
              Shop
            </Link>
            <Link to="/collections" className="text-white hover:text-primary transition-colors">
              Colecciones
            </Link>
            <Link to="/about" className="text-white hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-white hover:text-primary transition-colors">
              Contacto
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-primary transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative text-white hover:text-primary transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-white hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="text-white hover:text-primary transition-colors">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-dark-gray border border-gray rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    to="/account"
                    className="block px-4 py-2 hover:bg-gray transition-colors"
                  >
                    Mi Cuenta
                  </Link>
                  <Link
                    to="/account/orders"
                    className="block px-4 py-2 hover:bg-gray transition-colors"
                  >
                    Mis Pedidos
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray transition-colors border-t border-gray"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-white hover:text-primary transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="py-4 animate-slide-up">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full input"
              autoFocus
            />
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-slide-up border-t border-gray">
            <Link
              to="/shop"
              className="block py-2 text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/collections"
              className="block py-2 text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Colecciones
            </Link>
            <Link
              to="/about"
              className="block py-2 text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
