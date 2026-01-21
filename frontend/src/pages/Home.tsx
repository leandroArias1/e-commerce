import Container from "../components/layout/Container";
import ProductCard from "../components/ecommerce/ProductCard";

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Remera Negra",
    price: 12000,
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    name: "Buzo Oversize",
    price: 25000,
    image: "https://via.placeholder.com/300",
  },
];

export default function Home() {
  return (
    <Container>
      <h1 className="text-xl font-semibold my-6">
        Productos destacados
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {MOCK_PRODUCTS.map((p) => (
          <ProductCard
            key={p.id}
            name={p.name}
            price={p.price}
            image={p.image}
          />
        ))}
      </div>
    </Container>
  );
}
