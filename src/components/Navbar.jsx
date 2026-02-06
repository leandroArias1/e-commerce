import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  
  const { isAuthenticated, user, logout, getCartCount, wishlist, products } = useStore();
  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      const results = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, products]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
        setSearchTerm('');
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cerrar menu al hacer scroll
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
      closeSearch();
    }
  };

  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
    closeSearch();
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="bg-black border-b border-gray sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 md:gap-2">
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              <span className="text-xl md:text-2xl font-display font-bold neon-text">VOLT</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/shop" className="text-white hover:text-primary transition-colors">Shop</Link>
              <Link to="/collections" className="text-white hover:text-primary transition-colors">Colecciones</Link>
              <Link to="/about" className="text-white hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="text-white hover:text-primary transition-colors">Contacto</Link>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search */}
              <button onClick={() => setIsSearchOpen(true)} className="text-white hover:text-primary transition-colors p-2">
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative text-white hover:text-primary transition-colors p-2">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative text-white hover:text-primary transition-colors p-2">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="text-white hover:text-primary transition-colors p-2">
                    <User className="w-5 h-5" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-dark-gray border border-gray rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <Link to="/account" className="block px-4 py-2 hover:bg-gray transition-colors text-sm">Mi Cuenta</Link>
                    {user?.isAdmin && <Link to="/admin" className="block px-4 py-2 hover:bg-gray transition-colors text-primary text-sm">Admin Panel</Link>}
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray transition-colors border-t border-gray text-sm">Cerrar Sesión</button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="text-white hover:text-primary transition-colors p-2">
                  <User className="w-5 h-5" />
                </Link>
              )}

              {/* Mobile menu button */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-1 border-t border-gray">
              <Link to="/shop" className="block py-3 text-white hover:text-primary text-lg" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              <Link to="/collections" className="block py-3 text-white hover:text-primary text-lg" onClick={() => setIsMenuOpen(false)}>Colecciones</Link>
              <Link to="/about" className="block py-3 text-white hover:text-primary text-lg" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/contact" className="block py-3 text-white hover:text-primary text-lg" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
              {isAuthenticated && user?.isAdmin && (
                <Link to="/admin" className="block py-3 text-primary text-lg" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Search Overlay - Full screen on mobile */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 md:bg-black/80" ref={searchRef}>
          <div className="container mx-auto px-4 pt-4">
            {/* Search Header */}
            <div className="flex items-center gap-3 mb-4">
              <form onSubmit={handleSearchSubmit} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-light" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="¿Qué estás buscando?"
                    className="w-full bg-dark-gray border border-gray rounded-xl pl-12 pr-4 py-4 text-base focus:outline-none focus:border-primary"
                    autoFocus
                  />
                </div>
              </form>
              <button onClick={closeSearch} className="p-3 text-gray-light hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Results */}
            <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-light mb-3">{searchResults.length} resultados</p>
                  {searchResults.map(product => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.slug)}
                      className="w-full flex items-center gap-4 p-3 bg-dark-gray hover:bg-gray/50 rounded-xl transition-colors text-left"
                    >
                      <img src={product.image} alt="" className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{product.name}</p>
                        <p className="text-primary font-semibold">${product.price.toLocaleString()}</p>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => { navigate(`/shop?search=${encodeURIComponent(searchTerm)}`); closeSearch(); }}
                    className="w-full py-4 text-center text-primary font-semibold hover:bg-gray/30 rounded-xl"
                  >
                    Ver todos los resultados →
                  </button>
                </div>
              )}
              
              {searchTerm.length > 1 && searchResults.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-light mx-auto mb-4" />
                  <p className="text-gray-light">No se encontraron productos para "{searchTerm}"</p>
                </div>
              )}

              {searchTerm.length <= 1 && (
                <div className="text-center py-12">
                  <p className="text-gray-light">Escribí al menos 2 caracteres para buscar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
