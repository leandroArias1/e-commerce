import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Nueva colección unisex",
    subtitle:
      "Minimalismo, comodidad y estilo para todos los días.",
  },
  {
    title: "Diseños atemporales",
    subtitle:
      "Prendas que combinan con todo tu guardarropa.",
  },
  {
    title: "Calidad que se siente",
    subtitle:
      "Materiales seleccionados y cortes pensados.",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-50 border-b">
      <div className="py-16 md:py-24 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {slides[index].title}
        </h1>

        <p className="text-gray-600 mb-6">
          {slides[index].subtitle}
        </p>

        <Link to="/products">
          <Button>Ver colección</Button>
        </Link>
      </div>
    </section>
  );
}
