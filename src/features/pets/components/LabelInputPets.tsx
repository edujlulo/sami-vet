import type { Pet } from "../../../types/Pet";

interface LabelInputProps {
  label: string;
  petKey?: keyof Pet;
  pet?: Pet;
  disabled?: boolean;
  className?: string;
  type?: string;
  isEditing: boolean;
  isCreating: boolean;
}

export default function LabelInputPets({
  label,
  petKey,
  pet,
  className = "",
  type = "text",
  isEditing,
  isCreating,
}: LabelInputProps) {
  const value = pet && petKey ? String(pet[petKey] ?? "") : "";

  return (
    <div className="flex flex-col gap-1">
      <label className="text-blue-900 font-bold -mb-1 mt-1">{label}</label>
      <input
        type={type}
        value={value}
        disabled={!isEditing && !isCreating}
        className={`bg-amber-50 border border-gray-700 px-1 ${className}`}
      />
    </div>
  );
}
