import { useState } from "react";
import Select from "../ui/Select";
import Button from "../ui/Button";

type ProductInfoProps = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  colors: string[];
  sizes: string[];
  onAddToCart: (item: {
    id: number;
    name: string;
    price: number;
    image: string;
    color: string;
    size: string;
    quantity: number;
  }) => void;
};

export default function ProductInfo({
  id,
  name,
  price,
  description,
  image,
  colors,
  sizes,
  onAddToCart,
}: ProductInfoProps) {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const handleAdd = () => {
    if (!color || !size) return;

    onAddToCart({
      id,
      name,
      price,
      image,
      color,
      size,
      quantity: 1,
    });
  };

  return (
    <div className="flex flex-col gap-4 md:max-w-md">
      <div>
        <h1 className="text-lg font-semibold">{name}</h1>
        <p className="text-base font-medium">${price}</p>
      </div>

      <p className="text-sm text-gray-700">
        {description}
      </p>

      <Select
        label="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        options={colors.map((c) => ({
          value: c,
          label: c,
        }))}
      />

      <Select
        label="Talle"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        options={sizes.map((s) => ({
          value: s,
          label: s,
        }))}
      />

      <Button
        onClick={handleAdd}
        disabled={!color || !size}
      >
        Agregar al carrito
      </Button>
    </div>
  );
}
