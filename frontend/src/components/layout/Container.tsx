type Props = {
  children: React.ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {children}
    </div>
  );
}
