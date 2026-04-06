import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

type DeliveryFormSelectOption = {
  value: string;
  label: string;
};

export function DeliveryFormSelect({
  id,
  name,
  label,
  value,
  placeholder,
  options,
  disabled = false,
  required = false,
  error,
  onChange,
  description,
  className,
}: {
  id: string;
  name?: string;
  label: string;
  value: string;
  placeholder: string;
  options: DeliveryFormSelectOption[];
  disabled?: boolean;
  required?: boolean;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("field-stack", className)}>
      <div className="space-y-1.5">
        <Label htmlFor={id}>{label}</Label>
        {description ? (
          <p className="text-xs leading-5 text-slate-500">{description}</p>
        ) : null}
      </div>

      <Select
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        required={required}
        aria-invalid={Boolean(error)}
        onChange={onChange}
        className={
          error
            ? "border-rose-300/60 focus:border-rose-400/60 focus:ring-rose-400/12"
            : ""
        }
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      {error ? <p className="text-xs font-medium text-rose-600">{error}</p> : null}
    </div>
  );
}