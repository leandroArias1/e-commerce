import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";

export default function TestUI() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <Input label="Email" placeholder="email@email.com" />
      <Input label="Password" type="password" />

      <Select
        label="Talle"
        options={[
          { value: "s", label: "S" },
          { value: "m", label: "M" },
          { value: "l", label: "L" },
        ]}
      />

      <Button>Continuar</Button>
      <Button variant="secondary">Cancelar</Button>
    </div>
  );
}
