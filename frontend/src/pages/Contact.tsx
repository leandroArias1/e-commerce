import Container from "../components/layout/Container";

export default function Contact() {
  return (
    <Container>
      <div className="max-w-xl my-16">
        <h1 className="text-2xl font-semibold">
          Contacto
        </h1>

        <p className="text-gray-500 mt-2">
          ¿Tenés alguna consulta? Escribinos y te respondemos a la brevedad.
        </p>

        <div className="mt-8 space-y-4">
          <input
            placeholder="Nombre"
            className="w-full h-11 px-4 border rounded-lg"
          />
          <input
            placeholder="Email"
            className="w-full h-11 px-4 border rounded-lg"
          />
          <textarea
            placeholder="Mensaje"
            className="w-full h-28 px-4 py-3 border rounded-lg"
          />
          <button className="h-11 px-6 bg-black text-white rounded-lg">
            Enviar mensaje
          </button>
        </div>
      </div>
    </Container>
  );
}
