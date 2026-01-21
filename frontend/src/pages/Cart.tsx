import Container from "../components/layout/Container";
import CartItem from "../components/ecommerce/CartItem";
import CartSummary from "../components/ecommerce/CartSummary";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity } = useCart();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <Container className="mt-20 text-center">
        <h1 className="text-2xl font-bold">
          Tu carrito está vacío
        </h1>
        <p className="text-gray-600 mt-2">
          Agregá productos para comenzar tu compra
        </p>

        <button
          onClick={() => navigate("/products")}
          className="btn-accent mt-6"
        >
          Ver productos
        </button>
      </Container>
    );
  }

  return (
    <Container className="mt-10">
      <h1 className="text-2xl font-bold mb-8">
        Carrito
      </h1>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Items */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={`${item.id}-${item.color}-${item.size}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <CartItem
                  {...item}
                  onRemove={() => removeItem(item.id)}
                  onUpdate={(qty) =>
                    updateQuantity(item.id, item.color, item.size, qty)
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <CartSummary
          total={total}
          onCheckout={() => navigate("/checkout")}
        />
      </div>
    </Container>
  );
}
