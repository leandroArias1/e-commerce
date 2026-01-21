import Container from "../components/layout/Container";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate("/");
  };

  return (
    <div className="bg-gray-100 min-h-[80vh] flex items-center">
      <Container>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-2">
            Ingresar
          </h1>

          <p className="text-sm text-gray-600 mb-6">
            Accedé a tu cuenta para continuar
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <Input className="input" label="Email" />
            <Input className="input" label="Contraseña" type="password" />

            <Button className="btn-primary w-full" type="submit">
              Ingresar
            </Button>
          </form>

          <p className="text-sm text-gray-600 mt-4">
            ¿No tenés cuenta?{" "}
            <Link to="/register" className="underline">
              Registrate
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
