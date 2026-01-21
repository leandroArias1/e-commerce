import Container from "../components/layout/Container";
import ProductGrid from "../components/ecommerce/ProductGrid";
import ProductCard from "../components/ecommerce/ProductCard";
import { Link } from "react-router-dom";

const MOCK_PRODUCTS = [
  { id: 1, name: "Remera Negra", price: 12000, image: "/mock.jpg" },
  { id: 2, name: "Buzo Oversize", price: 25000, image: "/mock.jpg" },
  { id: 3, name: "Campera Unisex", price: 42000, image: "/mock.jpg" },
  { id: 4, name: "Pantalón Relax", price: 31000, image: "/mock.jpg" },
];

export default function Products() {
  return (
    <Container>
      <div className="my-10">
        <h1 className="text-2xl font-semibold">
          Productos
        </h1>
        <p className="text-gray-500 mt-1">
          Colección unisex
        </p>
      </div>

      <ProductGrid>
        {MOCK_PRODUCTS.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
          >
            <ProductCard
              name={product.name}
              price={product.price}
              image={product.image}
            />
          </Link>
        ))}
      </ProductGrid>
    </Container>
  );
}
