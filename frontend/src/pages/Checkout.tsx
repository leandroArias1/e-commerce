import { useNavigate } from "react-router-dom";
import Container from "../components/layout/Container";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import Toast from "../components/ui/Toast";
import { useAuth } from "../context/AuthContext";


export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const { isAuthenticated } = useAuth();

if (!isAuthenticated) {
  navigate("/login");
  return null;
}

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  clearCart();
  setShowToast(true);

  setTimeout(() => {
    setShowToast(false);
    navigate("/");
  }, 2000);
};

  if (items.length === 0) {
    return (
      <Container>
        <p className="mt-6 text-sm">
          No hay productos en el carrito.
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-xl font-semibold my-6">
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md"
      >
        <Input label="Nombre" />
        <Input label="Email" type="email" />
        <Input label="Dirección" />
        <Input label="Ciudad" />

        <Button type="submit">
          Confirmar compra
        </Button>
      </form>

      <Toast
        message="Orden completada con éxito"
        show={showToast}
      />
    </Container>
  );
}
