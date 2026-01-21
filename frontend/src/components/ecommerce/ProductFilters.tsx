import Input from "../ui/Input";
import Select from "../ui/Select";

type Filters = {
  search: string;
  category: string;
  color: string;
};

type ProductFiltersProps = {
  filters: Filters;
  onChange: (filters: Filters) => void;
};

export default function ProductFilters({
  filters,
  onChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Search */}
      <Input
        placeholder="Buscar producto"
        value={filters.search}
        onChange={(e) =>
          onChange({ ...filters, search: e.target.value })
        }
      />

      {/* Filters */}
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Categoría"
          value={filters.category}
          onChange={(e) =>
            onChange({ ...filters, category: e.target.value })
          }
          options={[
            { value: "remeras", label: "Remeras" },
            { value: "buzos", label: "Buzos" },
            { value: "pantalones", label: "Pantalones" },
          ]}
        />

        <Select
          label="Color"
          value={filters.color}
          onChange={(e) =>
            onChange({ ...filters, color: e.target.value })
          }
          options={[
            { value: "negro", label: "Negro" },
            { value: "blanco", label: "Blanco" },
            { value: "gris", label: "Gris" },
          ]}
        />
      </div>
    </div>
  );
}
