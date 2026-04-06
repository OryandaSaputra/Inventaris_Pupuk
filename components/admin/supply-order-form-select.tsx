import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

type SelectOption = string | { value: string; label: string };

function normalizeOption(option: SelectOption) {
  if (typeof option === "string") {
    return {
      value: option,
      label: option,
    };
  }

  return option;
}

export function SupplyOrderFormSelect({
  id,
  name,
  label,
  placeholder,
  options,
  defaultValue,
  error,
  description,
  className,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  options: SelectOption[];
  defaultValue?: string;
  error?: string;
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
        defaultValue={defaultValue ?? ""}
        required
        aria-invalid={Boolean(error)}
        className={cn(
          error
            ? "border-rose-300/60 focus:border-rose-400/60 focus:ring-rose-400/12"
            : "",
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => {
          const normalized = normalizeOption(option);

          return (
            <option key={normalized.value} value={normalized.value}>
              {normalized.label}
            </option>
          );
        })}
      </Select>

      {error ? <p className="text-xs font-medium text-rose-600">{error}</p> : null}
    </div>
  );
}