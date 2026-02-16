interface LabelInputProps {
  label: string;
  disabled?: boolean;
  className?: string;
  type?: string;
  isEditing: boolean;
  isCreating: boolean;
}

export default function LabelInputPets({
  label,
  className = "",
  type = "text",
  isEditing,
  isCreating,
}: LabelInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-blue-900 font-bold -mb-1 mt-1">{label}</label>
      <input
        type={type}
        disabled={!isEditing && !isCreating}
        className={`bg-amber-50 border border-gray-700 ${className}`}
      />
    </div>
  );
}
