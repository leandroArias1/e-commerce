import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <Container>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div
          className="
            w-full max-w-md p-8
            rounded-2xl
            bg-white/80 backdrop-blur
            shadow-xl
          "
        >
          <h1 className="text-2xl font-semibold text-center">
            Crear cuenta
          </h1>
          <p className="text-sm text-gray-500 text-center mt-1">
            Registrate para comprar más rápido
          </p>

          <div className="mt-8 space-y-4">
            <input
              placeholder="Nombre"
              className="w-full h-11 px-4 rounded-lg border"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full h-11 px-4 rounded-lg border"
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="w-full h-11 px-4 rounded-lg border"
            />

            <Button className="btn-primary w-full">
              Crear cuenta
            </Button>
          </div>

          <p className="text-sm text-center text-gray-600 mt-6">
            ¿Ya tenés cuenta?{" "}
            <Link to="/login" className="underline">
              Ingresá
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}
