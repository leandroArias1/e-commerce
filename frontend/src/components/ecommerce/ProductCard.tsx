type Props = {
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ name, price, image }: Props) {
  return (
    <div
      className="
        group rounded-2xl overflow-hidden
        bg-white shadow-sm
        hover:shadow-xl
        transition-all duration-300
      "
    >
      <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="
            w-full h-full object-cover
            group-hover:scale-105
            transition-transform duration-500
          "
        />
      </div>

      <div className="p-4">
        <span className="text-xs text-gray-500">Unisex</span>
        <h3 className="font-medium mt-1">{name}</h3>
        <p className="font-semibold mt-1">${price}</p>
      </div>
    </div>
  );
}
