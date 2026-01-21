export default function ProductGrid({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="
      grid gap-6
      grid-cols-2
      sm:grid-cols-3
      lg:grid-cols-4
    ">
      {children}
    </div>
  );
}
