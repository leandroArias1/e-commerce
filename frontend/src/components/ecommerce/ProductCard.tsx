type Props = {
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ name, price, image }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="aspect-square bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col">
        <span className="text-sm">{name}</span>
        <span className="text-sm font-semibold">${price}</span>
      </div>
    </div>
  );
}
