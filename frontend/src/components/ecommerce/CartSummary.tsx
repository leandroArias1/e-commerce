import Button from "../ui/Button";

type Props = {
  total: number;
  onCheckout: () => void;
};

export default function CartSummary({ total, onCheckout }: Props) {
  return (
    <div
      className="
        bg-white rounded-xl shadow-md p-6
        md:sticky md:top-24
      "
    >
      <h2 className="text-lg font-semibold mb-4">
        Resumen de compra
      </h2>

      <div className="flex justify-between text-sm mb-2">
        <span>Subtotal</span>
        <span>${total}</span>
      </div>

      <div className="flex justify-between text-sm mb-4">
        <span>Envío</span>
        <span className="text-green-600">Gratis</span>
      </div>

      <div className="flex justify-between font-bold text-lg border-t pt-4">
        <span>Total</span>
        <span>${total}</span>
      </div>

      <Button
        className="w-full mt-6 btn-accent"
        onClick={onCheckout}
      >
        Finalizar compra
      </Button>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Pago seguro · Cambios sin cargo
      </p>
    </div>
  );
}
