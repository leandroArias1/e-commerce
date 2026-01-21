import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AnimatedLayout from "./AnimatedLayout";

// pages
import Home from "../../pages/Home";
import Products from "../../pages/Products";
import ProductDetail from "../../pages/ProducDetail";
import Cart from "../../pages/Cart";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Checkout from "../../pages/Checkout";

export default function AnimatedPages() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedLayout><Home /></AnimatedLayout>} />
        <Route path="/products" element={<AnimatedLayout><Products /></AnimatedLayout>} />
        <Route path="/products/:id" element={<AnimatedLayout><ProductDetail /></AnimatedLayout>} />
        <Route path="/cart" element={<AnimatedLayout><Cart /></AnimatedLayout>} />
        <Route path="/login" element={<AnimatedLayout><Login /></AnimatedLayout>} />
        <Route path="/register" element={<AnimatedLayout><Register /></AnimatedLayout>} />
        <Route path="/checkout" element={<AnimatedLayout><Checkout /></AnimatedLayout>} />
      </Routes>
    </AnimatePresence>
  );
}
