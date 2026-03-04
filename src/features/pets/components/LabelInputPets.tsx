import { useTranslation } from "react-i18next";
import type { Pet } from "../../../types/Pet";

interface LabelInputProps {
  label: string;
  petKey?: keyof Pet;
  pet?: Pet;
  setPet?: React.Dispatch<React.SetStateAction<Pet | null>>;
  disabled?: boolean;
  className?: string;
  type?: string;
  isEditing: boolean;
  isCreating: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}

export default function LabelInputPets({
  label,
  petKey,
  pet,
  setPet,
  className = "",
  type = "text",
  isEditing,
  isCreating,
  inputRef,
}: LabelInputProps) {
  const { t } = useTranslation("pets");

  const value = pet && petKey ? String(pet[petKey] ?? "") : "";

  // Campos select fijo
  const petSelectOptions: Record<string, string[]> = {
    sex: t("sexOptions", { returnObjects: true }) as string[],
    species: t("speciesOptions", { returnObjects: true }) as string[],
  };

  // Opciones para input editable (breed)
  const breedOptions: string[] = t("breedOptions", {
    returnObjects: true,
  }) as string[];

  // Si es breed usamos input list, si es otro campo con select, usamos select normal
  if (petKey === "breed") {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-blue-900 font-bold -mb-1 mt-1">{label}</label>
        <input
          list="breed-list"
          value={value}
          onChange={(e) => {
            if (pet && setPet && petKey) {
              setPet({ ...pet, [petKey]: e.target.value.toUpperCase() });
            }
          }}
          disabled={!isEditing && !isCreating}
          ref={inputRef}
          className={`bg-amber-50 rounded-xs border border-gray-700 px-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        />
        <datalist id="breed-list">
          {breedOptions.map((opt) => (
            <option key={opt} value={opt} />
          ))}
        </datalist>
      </div>
    );
  }

  // Campos con select fijo (sex, species)
  const options = petKey ? petSelectOptions[petKey] : undefined;
  if (options && options.length > 0) {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-blue-900 font-bold -mb-1 mt-1">{label}</label>
        <select
          value={value}
          onChange={(e) => {
            if (pet && setPet && petKey) {
              setPet({ ...pet, [petKey]: e.target.value });
            }
          }}
          disabled={!isEditing && !isCreating}
          ref={inputRef as React.Ref<HTMLSelectElement>}
          className={`bg-amber-50 rounded-xs border border-gray-700 px-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        >
          <option value="">Seleccione...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Input normal para otros campos
  return (
    <div className="flex flex-col gap-1">
      <label className="text-blue-900 font-bold -mb-1 mt-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          if (pet && setPet && petKey) {
            const newValue =
              type === "date" ? e.target.value : e.target.value.toUpperCase();
            setPet({ ...pet, [petKey]: newValue });
          }
        }}
        disabled={!isEditing && !isCreating}
        ref={inputRef}
        className={`bg-amber-50 rounded-xs border border-gray-700 px-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      />
    </div>
  );
}
