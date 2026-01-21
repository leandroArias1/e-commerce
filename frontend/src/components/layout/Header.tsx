import { Link } from "react-router-dom";
import Container from "./Container";
import { useCart } from "../../context/CartContext";
import { User, ShoppingBag } from "lucide-react";

export default function Header() {
  const { items } = useCart();

  const totalItems = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <Container className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight">
          NOVA
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          <Link to="/products" className="nav-link">
            Productos
          </Link>
          <Link to="/contact" className="nav-link">
            Contacto
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link to="/login" className="icon-btn" aria-label="Login">
            <User size={20} />
          </Link>

          <Link to="/cart" className="icon-btn relative" aria-label="Carrito">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="cart-badge">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </Container>
    </header>
  );
}
