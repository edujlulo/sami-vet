import type { VisitEntity } from "../../../types/VisitEntity";

interface LabelInputProps {
  label: string;
  visitKey?: keyof VisitEntity;
  visit?: VisitEntity | null;
  setVisit?: React.Dispatch<React.SetStateAction<VisitEntity | null>>;
  className?: string;
  type?: string;
  disable?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: () => void;
}

export default function LabelInputVisits({
  label,
  visitKey,
  visit,
  setVisit,
  className = "",
  type = "text",
  disable = false,
  inputRef,
  onFocus,
  onBlur,
  onChange,
}: LabelInputProps) {
  const value = visit && visitKey ? String(visit[visitKey] ?? "") : "";

  // Fields that should not be normalized:
  const notNormalizedFields: (keyof VisitEntity)[] = [
    "visitDate",
    "weightKg",
    "reasonForVisit",
    "physicalExamination",
    "diagnosis",
    "notes",
    "additionalTests",
    "treatmentGiven",
    "prescribedTreatment",
  ];

  return (
    <div className="flex flex-col gap-1">
      <label className="text-blue-900 font-bold -mb-1 mt-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          if (visit && setVisit && visitKey) {
            setVisit({
              ...visit,
              [visitKey]: notNormalizedFields.includes(visitKey)
                ? e.target.value
                : e.target.value.toUpperCase(),
            });

            if (onChange) onChange();
          }
        }}
        onBlur={() => {
          if (onBlur) onBlur(); // disparas la función desde el formulario
        }}
        disabled={disable}
        ref={inputRef}
        onFocus={onFocus}
        className={`bg-amber-50 border border-gray-700 rounded-xs px-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      />
    </div>
  );
}
