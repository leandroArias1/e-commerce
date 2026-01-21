type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  onClick,
  variant = "primary",
}: Props) {
  const base =
    "w-full py-3 text-sm font-medium transition rounded";
  const styles = {
    primary: "bg-black text-white hover:bg-gray-900",
    secondary: "border border-black text-black",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}
