type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  label?: string;
  options: Option[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  className?: string;
};

export default function Select({
  label,
  options,
  value,
  onChange,
  error,
  className = "",
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-xs font-medium text-gray-700">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        className={`
          border px-3 py-2 text-sm rounded bg-white
          focus:outline-none focus:border-black
          ${error ? "border-red-500" : "border-gray-300"}
          ${className}
        `}
      >
        <option value="">Seleccionar</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <span className="text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
