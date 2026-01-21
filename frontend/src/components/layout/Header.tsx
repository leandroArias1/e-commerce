import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-lg font-semibold">
          NOVA
        </Link>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link to="/login">👤</Link>
          <Link to="/cart">🛒</Link>
        </div>
      </div>
    </header>
  );
}
