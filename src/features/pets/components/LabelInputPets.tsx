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
  const value = pet && petKey ? String(pet[petKey] ?? "") : "";

  return (
    <div className="flex flex-col gap-1">
      <label className="text-blue-900 font-bold -mb-1 mt-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          if (pet && setPet && petKey) {
            setPet({
              ...pet,
              [petKey]: e.target.value.toUpperCase().trim(),
            });
          }
        }}
        disabled={!isEditing && !isCreating}
        ref={inputRef}
        className={`bg-amber-50 border border-gray-700 px-1 ${className}`}
      />
    </div>
  );
}
