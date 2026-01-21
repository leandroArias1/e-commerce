import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative h-[75vh] bg-black overflow-hidden">
      <img
        src="/hero.jpg"
        alt="NOVA"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <h2 className="text-lg font-semibold tracking-tight">
        Productos destacados
      </h2>


      <div className="relative z-10 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="px-6 md:px-16 max-w-xl text-white"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Diseñado para
            <br /> el día a día
          </h1>

          <p className="mt-4 text-gray-200">
            Prendas unisex con diseño minimal y
            materiales premium.
          </p>

          <Link
            to="/products"
            className="inline-block mt-8 btn-accent"
          >
            Ver colección
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
