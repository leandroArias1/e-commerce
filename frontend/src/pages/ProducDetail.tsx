import Container from "../components/layout/Container";
import Button from "../components/ui/Button";

export default function ProductDetail() {
  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-12 my-16">
        {/* Image */}
        <div className="bg-gray-100 rounded-2xl aspect-square" />

        {/* Info */}
        <div>
          <h1 className="text-3xl font-semibold">
            Remera Negra
          </h1>

          <p className="text-gray-500 mt-2 max-w-md">
            Remera unisex confeccionada en algodón premium.
            Cómoda, versátil y duradera.
          </p>

          <p className="text-2xl font-bold mt-6">
            $12000
          </p>

          <div className="mt-6 space-y-4">
            <select className="border rounded-lg h-11 w-full px-3">
              <option>Color</option>
            </select>

            <select className="border rounded-lg h-11 w-full px-3">
              <option>Talle</option>
            </select>

            <Button className="w-full h-12 text-base">
              Agregar al carrito
            </Button>
          </div>

          <ul className="mt-6 text-sm text-gray-600 space-y-2">
            <li>✓ Envíos a todo el país</li>
            <li>✓ Cambios sin cargo</li>
            <li>✓ Pago seguro</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
