import { motion } from "framer-motion";
import Button from "../ui/Button";

type CartItemProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  color?: string;
  size?: string;
  quantity: number;
  onRemove: () => void;
  onUpdate: (qty: number) => void;
};

export default function CartItem({
  name,
  price,
  image,
  color,
  size,
  quantity,
  onRemove,
  onUpdate,
}: CartItemProps) {
    return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4 p-4 bg-white rounded-xl shadow-sm"
    >
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-lg object-cover bg-gray-100"
      />

      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">
          {color && `Color: ${color}`} {size && `· Talle: ${size}`}
        </p>

        <div className="flex items-center gap-3 mt-3">
          <button
            disabled={quantity === 1}
            onClick={() => onUpdate(quantity - 1)}
            className="w-8 h-8 border rounded disabled:opacity-40"
          >
            −
          </button>

          <span className="font-medium">{quantity}</span>

          <button
            onClick={() => onUpdate(quantity + 1)}
            className="w-8 h-8 border rounded"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end">
        <span className="font-semibold">
          ${price * quantity}
        </span>

        <button
          onClick={onRemove}
          className="text-sm text-red-500 transition hover:bg-gray-100"
        >
          Quitar
        </button>
      </div>
    </motion.div>
  );
}
