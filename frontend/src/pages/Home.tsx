import Container from "../components/layout/Container";
import ProductCard from "../components/ecommerce/ProductCard";
import ProductGrid from "../components/ecommerce/ProductGrid";
import Hero from "../components/home/Hero";
import { Link } from "react-router-dom";

import { MOCK_PRODUCTS } from "../data/products";

export default function Home() {
  return (
    <>
      <Hero />

      <Container>
        <div className="flex justify-between items-center my-10">
          <h2 className="text-2xl font-bold">
            Productos destacados
          </h2>
          <Link
            to="/products"
            className="text-sm text-green-600 hover:underline"
          >
            Ver todos →
          </Link>
        </div>

        <ProductGrid>
          {MOCK_PRODUCTS.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
            >
              <ProductCard {...product} />
            </Link>
          ))}
        </ProductGrid>
      </Container>
    </>
  );
}
