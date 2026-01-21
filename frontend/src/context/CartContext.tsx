import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
};


type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (
    id: number,
    color: string,
    size: string,
    quantity: number
  ) => void;
  clearCart: () => void;
};


const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Cargar carrito
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  // Guardar carrito
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

const addItem = (item: CartItem) => {
  setItems((prev) => {
    const existing = prev.find(
      (i) =>
        i.id === item.id &&
        i.color === item.color &&
        i.size === item.size
    );

    if (existing) {
      return prev.map((i) =>
        i === existing
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    }

    return [...prev, item];
  });
};




  const removeItem = (id: number) => {
    setItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const updateQuantity = (
  id: number,
  color: string,
  size: string,
  quantity: number
) => {
  setItems((prev) =>
    prev.map((item) =>
      item.id === id &&
      item.color === color &&
      item.size === size
        ? { ...item, quantity } 
        : item
    )
  );
};

  return (
    <CartContext.Provider
  value={{
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }}
>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be used dentro de CartProvider"
    );
  }
  return context;
}
